`use strict`;

let form = document.getElementById('form');
let table = document.getElementById('table');
let objArray = [];
let clearButton = document.getElementById('clearButton');
let data


function CreateTask(taskName, date, urgency, status = 'x') {

    this.taskName = taskName;
    this.date = date;
    this.urgency = urgency;
    this.status = status;
    objArray.push(this);
}

form.addEventListener('submit', submitHandler);
function submitHandler(event) {

    event.preventDefault();
    let taskName = event.target.task.value;
    let date = event.target.date.value;
    let urgency = event.target.urgency.value;
    new CreateTask(taskName, date, urgency);
    localStorage.data = JSON.stringify(objArray);

    clearTable();
    render();
}

function render() {

    for (let i = 0; i < objArray.length; i++) {

        let trElement = document.createElement('tr');
        table.appendChild(trElement);

        let td1Element = document.createElement('td');
        trElement.appendChild(td1Element);
        td1Element.textContent = objArray[i].taskName;

        let td2Element = document.createElement('td');
        trElement.appendChild(td2Element);
        td2Element.textContent = objArray[i].date;

        let td3Element = document.createElement('td');
        trElement.appendChild(td3Element);
        td3Element.textContent = objArray[i].urgency;
        if (td3Element.textContent === 'low') { td3Element.setAttribute('style', 'color:rgb(74, 181, 74)') };
        if (td3Element.textContent === 'medium') { td3Element.setAttribute('style', 'color:yellow') };
        if (td3Element.textContent === 'high') { td3Element.setAttribute('style', 'color:red') };

        let td4Element = document.createElement('td');
        trElement.appendChild(td4Element);
        let spanElement = document.createElement('span');
        td4Element.appendChild(spanElement);
        spanElement.textContent = objArray[i].status;
        spanElement.id = i;
    }
}
getData();
render();

function clearTable() {

    let tableLength = table.rows.length;
    for (let i = 1; i < tableLength; i++) {
        table.deleteRow(1);
    }
}

function getData() {
    if (localStorage.data) {
        data = JSON.parse(localStorage.data);

        for (let i = 0; i < data.length; i++) {
            new CreateTask(data[i].taskName, data[i].date, data[i].urgency, data[i].status)
        }
    }
}

clearButton.addEventListener('click', clearHandler);

function clearHandler() {
    window.localStorage.removeItem('data');
    clearTable();
    objArray = [];
    render();
}

table.addEventListener('click', deleteTask);
function deleteTask(event) {
    if (event.target.id) {
        objArray.splice(event.target.id, 1);
        localStorage.data = JSON.stringify(objArray);
        clearTable();
        render();
    }
}