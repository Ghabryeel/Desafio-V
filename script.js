document.addEventListener('DOMContentLoaded', () => {
    const taskTitleInput = document.getElementById('taskTitleInput');
    const taskDescriptionInput = document.getElementById('taskDescriptionInput');
    const addTaskButton = document.getElementById('addTaskButton');
    const taskList = document.getElementById('taskList');
    const startButton = document.getElementById('startButton');
    const taskManagerContainer = document.getElementById('taskManagerContainer');

    startButton.addEventListener('click', () => {
        document.querySelector('.container').classList.add('hidden');
        taskManagerContainer.classList.remove('hidden');
    });

    addTaskButton.addEventListener('click', addTask);
    taskTitleInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            addTask();
        }
    });
    taskDescriptionInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && e.shiftKey === false) {
            addTask();
            e.preventDefault();
        }
    });

    function addTask() {
        const taskTitle = taskTitleInput.value.trim();
        const taskDescription = taskDescriptionInput.value.trim();
        if (taskTitle !== '' && taskDescription !== '') {
            const taskItem = document.createElement('li');
            taskItem.className = 'task-item';
            taskItem.innerHTML = `
                <div class="task-header">
                    <div class="task-actions-container">
                        <span onclick="toggleComplete(this)">${taskTitle}</span>
                        <div id="task-actions">
                            <button class="edit" onclick="editTask(this)">Editar</button>
                            <button class="edit" onclick="toggleComplete(this)">Marcar como Feita</button>
                            <button onclick="removeTask(this)">Remover</button>
                        </div>    
                    </div>
                </div>
                <p>${taskDescription}</p>
            `;
            taskList.appendChild(taskItem);
            taskTitleInput.value = '';
            taskDescriptionInput.value = '';
        }
    }
});

function toggleComplete(span) {
    const taskItem = span.closest('.task-item');
    span.classList.toggle('completed');
    taskItem.classList.toggle('completed');
}

function editTask(button) {
    const taskItem = button.closest('.task-item');
    const taskHeader = taskItem.querySelector('.task-header span');
    const taskDescription = taskItem.querySelector('p');
    const newTaskTitle = prompt('Editar título da tarefa:', taskHeader.textContent);
    const newTaskDescription = prompt('Editar descrição da tarefa:', taskDescription.textContent);
    if (newTaskTitle !== null && newTaskTitle.trim() !== '') {
        taskHeader.textContent = newTaskTitle.trim();
    }
    if (newTaskDescription !== null && newTaskDescription.trim() !== '') {
        taskDescription.textContent = newTaskDescription.trim();
    }
}

function removeTask(button) {
    const taskItem = button.closest('.task-item');
    taskItem.remove();
}