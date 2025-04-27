document.addEventListener('DOMContentLoaded', () => {
  const userName = localStorage.getItem('userName') || 'Usuário';
  const userEmail = localStorage.getItem('userEmail') || '';

  document.getElementById('userName').textContent = userName;
document.getElementById('welcomeMessage').textContent = `Bom trabalho, ${userName.split(' ')[0]}! Organize suas tarefas abaixo.`;


  const taskForm = document.getElementById('taskForm');
  const taskInput = document.getElementById('taskInput');
  const taskList = document.getElementById('taskList');

  // Função para gerar chave de armazenamento
  function getStorageKey(email) {
    return `tasks_${email}`;
  }

  const storageKey = getStorageKey(userEmail);
  let tasks = JSON.parse(localStorage.getItem(storageKey)) || [];

  function renderTasks() {
    taskList.innerHTML = '';
    const taskSubtitle = document.getElementById('taskSubtitle');
    if (tasks.length > 0) {
    taskSubtitle.style.display = 'block';
    } else {
      taskSubtitle.style.display = 'none';
    }

    tasks.forEach((task, index) => {
      const li = document.createElement('li');
      
      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.checked = task.completed;
      checkbox.addEventListener('change', () => {
        tasks[index].completed = checkbox.checked;
        saveTasks();
        renderTasks();
      });
  
      const taskText = document.createElement('span');
      taskText.textContent = task.text;
      taskText.style.flex = '1';
      if (task.completed) {
        taskText.classList.add('completed');
      }
  
      const removeBtn = document.createElement('button');
      removeBtn.textContent = 'Remover';
      removeBtn.addEventListener('click', () => {
        tasks.splice(index, 1);
        saveTasks();
        renderTasks();
      });
  
      li.appendChild(checkbox);
      li.appendChild(taskText);
      li.appendChild(removeBtn);
      taskList.appendChild(li);
    });
  }
  

  function saveTasks() {
    localStorage.setItem(storageKey, JSON.stringify(tasks));
  }

  taskForm.addEventListener('submit', e => {
    e.preventDefault();
    const text = taskInput.value.trim();
    if (text) {
      tasks.push({ text, completed: false });
      taskInput.value = '';
      saveTasks();
      renderTasks();
    }
  });

  renderTasks();
});
