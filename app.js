document.addEventListener('DOMContentLoaded', loadTasks);

function addTask() {
    const input = document.getElementById('taskInput');
    if (!input.value.trim()) return;
    const task = { text: input.value, done: false };
    const tasks = getTasks();
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    input.value = '';
    renderTasks();
}

function getTasks() { return JSON.parse(localStorage.getItem('tasks')) || []; }

function renderTasks() {
    const list = document.getElementById('taskList');
    list.innerHTML = '';
    getTasks().forEach((task, index) => {
        const li = document.createElement('li');
        if (task.done) li.classList.add('completed');
        li.innerHTML = `
            <span onclick="toggleTask(${index})">${task.text}</span>
            <button class="delete-btn" onclick="deleteTask(${index})">XÓA</button>
        `;
        list.appendChild(li);
    });
}

function toggleTask(index) {
    const tasks = getTasks();
    tasks[index].done = !tasks[index].done;
    localStorage.setItem('tasks', JSON.stringify(tasks));
    renderTasks();
}

function deleteTask(index) {
    const tasks = getTasks();
    tasks.splice(index, 1);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    renderTasks();
}

function loadTasks() { renderTasks(); }

if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw.js');
}
