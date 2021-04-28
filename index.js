const form = document.querySelector(".js-form"),
    input = form.querySelector("input"),
    pendingList = document.querySelector(".js-pending"),
    finishedList = document.querySelector(".js-finished"),
    list = document.querySelector("list");

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
    const parent = li.parentNode;
    finishedList.removeChild(li);
    const cleanPend =  pending.filter(function(toDo){
        return toDo.id !== parseInt(li.id);
    });
    pending = cleanPend
    savePending();
}
function deletefinish (event){
    const pendBtn = event.target;
    const li = pendBtn.parentNode;
    const parent = li.parentNode;
    finishedList.removeChild(li);
    const cleanFinish =  finished.filter(function(toDo){
        return toDo.id !== parseInt(li.id);
    });
    finished = cleanFinish
    saveFinished();
}

function pushPend (event) {
    const pendBtn = event.target;
    const parent = pendBtn.parentNode;
    const ulParent = parent.parentNode;
    const addId = parent.id;
    const br = pendBtn.previousSibling;
    const addSpan = br.previousSibling;
    const spanText = addSpan.innerHTML;
    const obj = {
        text: spanText,
        id: addId
    };
    if (pendingList.className == ulParent.className){
        finishedList.append(parent);
        const cleanPend =  pending.filter(function(toDo){
            return toDo.id !== parseInt(parent.id);
        });
        finished.push(obj);
        pending = cleanPend
    } else {
        pendingList.append(parent)
        const cleanFinish =  finished.filter(function(toDo){
            return toDo.id !== parseInt(parent.id);
        });
        pending.push(obj);
        
        finished = cleanFinish
    };
    
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
    if (loadedPending !== null) {
        const parsedPending = JSON.parse(loadedPending);
        parsedPending.forEach (function(toDo){
            paintToDo(toDo.text);
        });
    }
}
function loadFinish (){
    const loadedFinish = localStorage.getItem(FINISHED_LS);
    if (loadedFinish !== null) {
        const parsedFinish = JSON.parse(loadedFinish);
        parsedFinish.forEach (function(toDo){
            paintToDo(toDo.text);
        });
    }
}


function init (){
    loadList();
    loadFinish();
    form.addEventListener("submit", handleSubmit);
}

init();