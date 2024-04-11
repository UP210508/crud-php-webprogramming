import { getAllUsers, getAllTasks } from './petitions.js';

const tableBody = document.querySelector('#table-body');
const form = document.querySelector('#form');
const inputSelect = document.querySelector('#input-select');
const inputTitle = document.querySelector('#input-title');
const inputTextarea = document.querySelector('#input-textarea');
const formTitle = document.querySelector('#form-title');
const formButton = document.querySelector('#form-button');
const inputTaskId = document.querySelector('#task-id');

let edition = false;

const renderUsers = async () => {
  const users = await getAllUsers();

  users.forEach((user) => {
    const { id, name } = user;
    const option = document.createElement('option');
    option.value = id;
    option.dataset.user = name;
    option.textContent = name;
    inputSelect.appendChild(option);
  });
};

const fillForm = ( taskID, title = '', description = '', user_name = '' ) => {
  
  inputTaskId.value = taskID; 
  const userOptionElement = inputSelect.querySelectorAll('option');

  userOptionElement.forEach( option => {
    if ( user_name === option.dataset.user) {
      option.selected = true;
    }
  })

  inputTitle.value = title;
  inputTextarea.value = description;

  formTitle.textContent = 'Editar Tarea';
  formButton.textContent = 'Editar Tarea';

  edition = true;
}

const editTask = ( e ) => { 

  e.preventDefault();

  if ( edition ) {
    form.action = `./api/updateTask.php`
  } else {
    form.action = "./api/createTask.php";
  }
  
  form.submit();
}

const renderTasks = async () => {
  const tasks = await getAllTasks();

  tasks.forEach((task) => {

    const { id, user_name, title, description } = task;

    const trTable = document.createElement('tr');
    trTable.classList.add('table-tr');

    trTable.innerHTML = `
      <td class="table-td">${id}</td>
      <td class="table-td">${user_name}</td>
      <td class="table-td">${title}</td>
      <td class="table-td">${description}</td>
    `;

    const tdButtons = document.createElement('td');
    tdButtons.classList.add('table-td');

    const anchorToDeleteTask = document.createElement('a');
    anchorToDeleteTask.classList.add('btn', 'btn--delete');
    anchorToDeleteTask.href = `/crud/api/deleteTask.php?id=${id}`;
    anchorToDeleteTask.textContent = 'Eliminar';
    
    const anchorToUpdateTask = document.createElement('button');
    anchorToUpdateTask.classList.add('btn', 'btn--edit');
    anchorToUpdateTask.textContent = 'Actualizar';
    anchorToUpdateTask.onclick = () => fillForm( id, title, description, user_name );

    tdButtons.append( anchorToDeleteTask, anchorToUpdateTask );
    trTable.appendChild( tdButtons );
    tableBody.appendChild( trTable ) ;

  });
};

formButton.addEventListener('click', editTask );

window.addEventListener('DOMContentLoaded', () => {
  renderUsers();
  renderTasks();
});
