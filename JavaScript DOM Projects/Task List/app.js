const taskForm = document.querySelector('#task-form');
const taskInput = document.querySelector('#task');
const filter = document.querySelector('#filter');
const taskList = document.querySelector('.collection');

loadEventListener();
function loadEventListener() {
  taskForm.addEventListener('submit', addTask);
}

function addTask(e) {
  if (taskInput.value === '') alert('Please add a task');
  const li = document.createElement('li');
  li.className = 'collection-item';
  li.appendChild(document.createTextNode(taskInput.value));
  const link = document.createElement('a');
  link.className = 'delete-item secondary-content';
  link.innerHTML = '<i class="fa fa-remove"></i>';
  li.appendChild(link);
  taskList.appendChild(li);
  taskInput.value = '';
  e.preventDefault();
}
