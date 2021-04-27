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

function saveFinished(){
    localStorage.setItem(FINISHED_LS, JSON.stringify(finished))
}

function deletePend (event){
    const pendBtn = event.target;
    const li = pendBtn.parentNode;
    pendingList.removeChild(li);
    const cleanPend =  pending.filter(function(toDo){
        return toDo.id !== parseInt(li.id);
    });
    pending = cleanPend
    savePending();
}

function pushPend (event) {
    const pendBtn = event.target;
    const parent = pendBtn.parentNode;
    const addId = parent.id;
    const br = pendBtn.previousSibling;
    const addspan = br.previousSibling;
    const spanText = addspan.innerHTML;
    const li = document.createElement("li");
    const span = document.createElement("span")
    span.innerText = spanText;
    const obj = {
        text: spanText,
        id: addId
    };
    li.append(span);
    finishedList.appendChild(li);
    finished.push(obj);
    savePending();
    saveFinished();
}

function paintToDo(text){
    const li = document.createElement("li");
    const span = document.createElement("span");
    const delPend = document.createElement("button")
    const pushPendBtn = document.createElement("button")
    const newId = pending.length + 1;
    delPend.innerText = "❌";
    delPend.addEventListener("click", deletePend)
    pushPendBtn.innerText = "✔";
    pushPendBtn.addEventListener("click",pushPend)
    span.innerText = text;
    li.appendChild(span);
    li.appendChild(delPend);
    li.appendChild(pushPendBtn);
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

function loadList (){
    const loadedPending = localStorage.getItem(PENDING_LS);
    const loadedFinished = localStorage.getItem(FINISHED_LS);
    if (loadedPending !== null) {
        const parsedPending = JSON.parse(loadedPending);
        parsedPending.forEach (function(toDo){
            paintToDo(toDo.text);
        })
    }
}

function init (){
    loadList();
    form.addEventListener("submit", handleSubmit);
}

init();