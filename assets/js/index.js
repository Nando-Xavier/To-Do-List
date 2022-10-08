// Selecionar input, butão e ULs
const input = document.querySelector("#myinput");
const btn = document.querySelector("#addBtn");
const uL = document.querySelector("#myUL");
const span = document.querySelectorAll(".close");

// Funções usadas durante o programa

// Criadora de tarefa
function criaTarefa(textoInput) {
  const li = criaLI();
  li.innerText = textoInput;
  uL.appendChild(li);
  btnApagar(li);
  marcarComoFeita(li);
  saveList();
}

// Criadora de li
function criaLI() {
  const li = document.createElement("li");
  return li;
}

// Limpando imput
function limpaInput() {
  input.value = "";
  input.focus();
}

//Apando uma tarefa
function btnApagar(li) {
  const apagar = document.createElement("span");
  const icone = document.createTextNode("\u00D7");
  apagar.setAttribute("class", "close");
  apagar.appendChild(icone);
  li.appendChild(apagar);
}

//marcando tarefa como feita
function marcarComoFeita(li) {
  const feita = document.createElement("span");
  const icone = document.createTextNode("\u2714");
  feita.setAttribute("class", "completed");
  feita.appendChild(icone);
  li.appendChild(feita);
}

//Salvando o texto da Tarefa em um array
function saveList(params) {
  const tarefas = uL.querySelectorAll("li");
  const lista = [];
  for (let tarefa of tarefas) {
    let textoTarefa = tarefa.innerText;
    textoTarefa = textoTarefa.replace("\u00D7", "");
    textoTarefa = textoTarefa.replace("\u2714", "").trim();
    lista.push(textoTarefa);
  }
  //transformando em JSON
  const tarefasJSON = JSON.stringify(lista);
  localStorage.setItem("tarefas", tarefasJSON);
}

// Recuperando as tarefas salvas
function recuperandoTarefasSalvas() {
  const tarefas = localStorage.getItem("tarefas");
  const list = JSON.parse(tarefas);
  for (let tarefa of list) {
    criaTarefa(tarefa);
  }
}
recuperandoTarefasSalvas();
//####################################################



//Capturar o evento de click do mouse no butão de criar tarefa
btn.addEventListener("click", () => {
  if (!input.value) {
    alert('"Você deve digitar algum texto para adicionar!"');
    limpaInput();
    return;
  }
  criaTarefa(input.value);
  limpaInput();
});

//Capiturar o evento de Apertat ENTER
input.addEventListener("keypress", (ev) => {
  if (!input.value && ev.keyCode == 13) {
    alert('"Você deve digitar algum texto para adicionar!"');
    limpaInput();
    return;
  }
  if (ev.keyCode == 13) {
    criaTarefa(input.value);
    limpaInput();
  }
});

//apagando uma tarefa
uL.addEventListener("click", (ev) => {
  const el = ev.target;
  if (el.classList.contains("close")) {
    el.parentElement.remove();
    saveList();
  }
});

//marcando ou desmarcando uma tarefa feita
uL.addEventListener("click", (ev) => {
  const el = ev.target;
  const li = el.parentElement;
  if (li.classList.contains("checked")) {
    li.classList.remove("checked");
    return;
  }
  if (el.classList.contains("completed")) {
    li.setAttribute("class", "checked");
  }
});
