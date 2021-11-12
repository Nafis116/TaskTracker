'use strict'

let btnAdd = document.querySelector('.btn__add');
let myDiv = document.querySelector('#myDiv');
let btnInput = document.querySelector('#btnInput');
let inputTask = document.querySelector('.input__task');
let btnSort = document.querySelector('.sort');
let ul = document.querySelector('.list__task');
let arrTasks = [];

btnAdd.addEventListener('click', function() {
  var inputValue = document.querySelector('input');
  var task = inputValue.value;
  inputValue.value = '';

  if (task.length > 0) {
    arrTasks.push(task);
    document.querySelector('ul').innerHTML = '';
    createTasks();
    inputTask.style.display = 'none';
  }
  
  localStorage.setItem('arrTasks', JSON.stringify(arrTasks));
})

myDiv.addEventListener('click', (e) => {
  if (localStorage.getItem('arrTasks')) {
    arrTasks = JSON.parse(localStorage.getItem('arrTasks'))
  }
  if (e.target.classList.contains('btn__delete')) {
    let spanDelete = e.target.previousElementSibling.innerHTML;
    deleteTask(spanDelete);
  } 
})

btnInput.addEventListener('click', () => {
  inputTask.style.display = 'block';
})

btnSort.addEventListener('click', sort);
btnSort.addEventListener('mouseleave', changeImg);
btnSort.addEventListener('mouseenter', changeImg2);

function changeImg() {
  let img = document.querySelector('.sort1');
  if (flagSort == false) {
    img.setAttribute('src','/images/sortAl.svg')
  } else if (flagSort == true){
    img.setAttribute('src','/images/sort.svg')
  }
}

function changeImg2() {
  let img = document.querySelector('.sort1');
  if (flagSort == false) {
    img.setAttribute('src','/images/sortAlHover.svg')
  } else if (flagSort == true){
    img.setAttribute('src','/images/sortHover.svg')
  }
}

function deleteTask(spanDelete) {
  for (let i = 0; i < arrTasks.length; i++) {
    if (spanDelete === arrTasks[i]) {
        arrTasks.splice(i,1);
        document.querySelector('ul').innerHTML = '';
        createTasks()
    }
    if (arrTasks.length === 0) {
        document.querySelector('#myDiv').classList.remove('taskDiv');
    }
    localStorage.setItem('arrTasks', JSON.stringify(arrTasks));
  }
}

function createTasks() {
  for (let i = 0; i < arrTasks.length; i++) {
  let li = document.createElement('li');
      li.classList.add('item__task')
      li.draggable = true;
  let span = document.createElement('span');
      myDiv.append(ul);
      myDiv.classList.add('taskDiv');
      ul.append(li);
      li.append(span);
      span.innerHTML = arrTasks[i];

  var btnDelete = document.createElement('button');
      btnDelete.classList = 'btn__delete';
      btnDelete.innerText = 'X';
      li.append(btnDelete);
  }
}

function showTasks() {
  if (localStorage.getItem('arrTasks')) {
    arrTasks = JSON.parse(localStorage.getItem('arrTasks'))
  }
  createTasks();
  inputTask.style.display = 'block';
  localStorage.setItem('arrTasks', JSON.stringify(arrTasks));
}


let flagSort = true;
let newArr = [];
function sort() {
  if (localStorage.getItem('arrTasks')) {
    newArr = JSON.parse(localStorage.getItem('arrTasks'))
  }
  let img = document.querySelector('.sort1');
  if (flagSort === true) {
    img.setAttribute('src','/images/sortAlHover.svg');
    newArr.sort((a, b) => a > b ? 1 : -1);
    flagSort = false;
  } else {
    img.setAttribute('src','/images/sortHover.svg');
    newArr.sort((a, b) => a > b ? -1 : 1);
    flagSort = true;
  } 
  arrTasks = [...newArr];
  localStorage.setItem('arrTasks', JSON.stringify(arrTasks));
  ul.innerHTML = '';
  showTasks();
}
function dnd() {
  const taskList = document.querySelector('.list__task');
  const taskElements = taskList.querySelectorAll('.item__task');
  
  taskList.addEventListener(`dragstart`, (evt) => {
    evt.target.classList.add(`selected`);
  });
  
  taskList.addEventListener(`dragend`, (evt) => {
    evt.target.classList.remove(`selected`);
  });

  taskList.addEventListener(`dragover`, (evt) => {
    evt.preventDefault();
  
    const activeElement = taskList.querySelector(`.selected`);
    const currentElement = evt.target;
    const isMoveable = activeElement !== currentElement &&
      currentElement.classList.contains(`item__task`);
  
    if (!isMoveable) {
      return;
    }
  
    const nextElement = getNextElement(evt.clientY, currentElement);

    if (
      nextElement && 
      activeElement === nextElement.previousElementSibling ||
      activeElement === nextElement
    ) {
      return;
    }
  
    taskList.insertBefore(activeElement, nextElement);
  });
}

let getNextElement = (cursorPosition, currentElement) => {
  let currentElementCoord = currentElement.getBoundingClientRect();
  const currentElementCenter = currentElementCoord.y + currentElementCoord.height / 2;
  const nextElement = (cursorPosition < currentElementCenter) ?
      currentElement :
      currentElement.nextElementSibling;

  return nextElement;
}

dnd();
showTasks();





