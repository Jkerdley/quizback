async function remove(id) {
    await fetch(`/${id}`, {
        method: "DELETE",
    });
}

async function edit(id, title) {
    const res = await fetch(`/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ title }),
    });

    if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
    }
    return res.json();
}

document.addEventListener("click", async (event) => {
    const li = event.target.closest("li");
    const target = event.target;

    if (target.dataset.type === "remove") {
        const id = target.dataset.id;
        await remove(id);
        li.remove();
    } else if (target.classList.contains("edit-btn")) {
        enterEditMode(li);
    } else if (target.classList.contains("save-btn")) {
        await saveChanges(li);
    } else if (target.classList.contains("cancel-btn")) {
        cancelEdit(li);
    }
});

function enterEditMode(li) {
    const viewMode = li.querySelector(".view-mode");
    const editMode = li.querySelector(".edit-mode");
    const input = li.querySelector(".edit-input");

    viewMode.classList.add("d-none");
    editMode.classList.remove("d-none");
    input.focus();
}

function cancelEdit(li) {
    const viewMode = li.querySelector(".view-mode");
    const editMode = li.querySelector(".edit-mode");

    viewMode.classList.remove("d-none");
    editMode.classList.add("d-none");
}

async function saveChanges(li) {
    const input = li.querySelector(".edit-input");
    const id = li.querySelector(".edit-btn").dataset.id;
    const newTitle = input.value.trim();

    if (!newTitle) {
        alert("Поле не может быть пустым");
        return input.focus();
    }

    try {
        await edit(id, newTitle);
        li.querySelector(".note-title").textContent = newTitle;
        cancelEdit(li);
    } catch (error) {
        alert("Ошибка при сохранении изменений");
        console.error(error);
    }
}

document.addEventListener("keypress", async (e) => {
    if (e.key === "Enter" && e.target.classList.contains("edit-input")) {
        await saveChanges(e.target.closest("li"));
    }
});

document.addEventListener("keyup", (e) => {
    if (e.key === "Escape" && e.target.classList.contains("edit-input")) {
        cancelEdit(e.target.closest("li"));
    }
});
