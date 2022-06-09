// Define UI vars
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

// function to load all eventListeners

LoadEventListeners();
function LoadEventListeners() {

    // DOM load event
    document.addEventListener('DOMContentLoaded', getTasks);
    // Add task event
    form.addEventListener('submit',addTask);

    //Remove task event
    taskList.addEventListener('click', removeTask);

    //clear task event
    clearBtn.addEventListener('click', clearTasks);

    //filter task event
    filter.addEventListener('keyup', filterTasks)
 
}

//Get tasks from LS
function getTasks() {
    let tasks;
    if(localStorage.getItem('tasks') === null) {
        tasks = [];
    }else {
        tasks = JSON.parse(localStorage.getItem('tasks')) ;
    }
    tasks.forEach (function(task) {
    const li = document.createElement('li');
    li.className = 'collection-item';
    li.appendChild(document.createTextNode(task));

    // create new link element
    const link = document.createElement('a');
    link.className = 'delete-item secondary-content';
    link.innerHTML = '<i class="fa fa-remove"></i>';
    li.appendChild(link)
    taskList.appendChild(li);
    })
}
    
// Add task 
function addTask(e) {
    if(taskInput.value === ''){
        alert('Add a task')
    }else {
    // create li element

    const li = document.createElement('li');
    li.className = 'collection-item';
    li.appendChild(document.createTextNode(taskInput.value));

    // create new link element
    const link = document.createElement('a');
    link.className = 'delete-item secondary-content';
    link.innerHTML = '<i class="fa fa-remove"></i>';
    li.appendChild(link)
    taskList.appendChild(li);

   
    // localStorage
    // let storeValues;
    // if(localStorage.getItem('storeDatas') === null) {
    //     storeValues = [];

    // } else {

    //    storeValues = JSON.parse(localStorage.getItem('storeDatas'));
    // }
        
    // storeValues.push(taskInput.value);
    // localStorage.setItem('storeDatas',JSON.stringify(storeValues));

    
    storeTaskInLocalStorage(taskInput.value);
    // //clear input
    taskInput.value = '';
    e.preventDefault();
    }
}

function storeTaskInLocalStorage(task) {
    let tasks;
    if(localStorage.getItem('tasks') === null) {
        tasks = [];
    }else {
        tasks = JSON.parse(localStorage.getItem('tasks')) ;
    }
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks))
}
 
function removeTask(e) {
    if(e.target.parentElement.classList.contains('delete-item')){

    if(confirm('Are you sure ?')) {
    // e.target.parentElement.parentElement.remove();

    removeTaskFromLocalStorage(e.target.parentElement.parentElement);

     }
   
    }
    e.preventDefault();
}


// function remove from LS

function removeTaskFromLocalStorage(taskItem) {
    if(localStorage.getItem('tasks') === null) {
        tasks = [];
    }else {
        tasks = JSON.parse(localStorage.getItem('tasks')) ;
    }
   tasks.forEach(function(task , index){
       if(taskItem.textContent === task){
           tasks.splice(index , 1);
       }
   })
   localStorage.setItem('tasks', JSON.stringify(tasks))
}
//clear tasks function
function clearTasks() {
    // taskList.innerHTML = '';

//faster
    while(taskList.firstChild) {
        taskList.removeChild(taskList.firstChild);
    }

    clearTaskFromLocalStorage();
    
}
// clear task from LS
function clearTaskFromLocalStorage() {
    localStorage.clear();
}

// Filter task function
function filterTasks(e) {
    const text = e.target.value;
    // console.log(text.toLowerCase());
    document.querySelectorAll('.collection-item').forEach(function(task){
        const item = task.firstChild.textContent;
    if(item.toLowerCase().indexOf(text) != -1) {
        task.style.display = 'block';
    } else {
        task.style.display = 'none';
    }
    }) 
    e.preventDefault();
}