const form = document.querySelector(".js-form"),
    input = form.querySelector("input"),
    pendingList = document.querySelector(".js-pending"),
    finishedList = document.querySelector(".js-finished");

const PENDING_LS = "pending",
    FINISHED_LS = "finished";

let pending = [],
    finished = [];

function savePending (){
    localStorage.setItem(PENDING_LS, JSON.stringify(pending))
}

function paintToDo(text){
    const li = document.createElement("li");
    const span = document.createElement("span");
    const newId = pending.length + 1;
    span.innerText = text;
    li.appendChild(span);
    li.id = newId;
    pendingList.appendChild(li);
    const obj = {
        text: text,
        id: newId
    };
    pending.push(obj);
    savePending();
}

function handleSubmit (event) {
    event.preventDefault();
    const currentValue = input.value;
    paintToDo(currentValue);
    input.value = "";
}

function init (){
    form.addEventListener("submit", handleSubmit);
}

init();