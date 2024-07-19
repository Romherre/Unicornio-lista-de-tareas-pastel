document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('todo-form');
    const todoInput = document.getElementById('todo-input');
    const todoList = document.getElementById('todo-list');
    const progressBar = document.getElementById('progress-bar');
    const congratulationsMessage = document.getElementById('congratulations-message');

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const task = todoInput.value.trim();

        if (task) {
            addTask(task);
            todoInput.value = '';
        }
    });

    function addTask(task) {
        const li = document.createElement('li');
        li.textContent = task;

        li.addEventListener('click', () => {
            li.classList.toggle('completed');
            updateProgress();
        });

        const removeBtn = document.createElement('button');
        removeBtn.textContent = 'Remove';
        removeBtn.classList.add('remove-btn');

        removeBtn.addEventListener('click', () => {
            todoList.removeChild(li);
            updateProgress();
        });

        li.appendChild(removeBtn);
        todoList.appendChild(li);
        updateProgress();
    }

    function updateProgress() {
        const tasks = document.querySelectorAll('li');
        const completedTasks = document.querySelectorAll('li.completed');
        const progress = tasks.length ? (completedTasks.length / tasks.length) * 100 : 0;
        progressBar.style.width = `${progress}%`;

        if (tasks.length > 0 && tasks.length === completedTasks.length) {
            showCongratulations();
        } else {
            hideCongratulations();
        }
    }

    function showCongratulations() {
        congratulationsMessage.style.display = 'block';
        confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 }
        });
    }

    function hideCongratulations() {
        congratulationsMessage.style.display = 'none';
    }
});

