;(function(){

const leitorDeArquivos = new FileReader(),
    formulario = document.querySelector('.upload-imagem'),
    previaDaImagem = document.querySelector('.imagem'),
    inputArquivo = document.querySelector('.upload'),
    btnAtualiza = document.querySelector('.btnAtualiza');

  
function leEAtualiza(){
    let imagemEnviada = inputArquivo.files[0];

    leitorDeArquivos.readAsDataURL(imagemEnviada);
      
    leitorDeArquivos.addEventListener('loadend', function(load){
          
    previaDaImagem.src = load.target.result
    })
  }

  formulario.addEventListener('submit', function(submit){
      submit.preventDefault();

      leEAtualiza();
  })

  btnAtualiza.addEventListener('click', function(){
      leEAtualiza();
  })
  

})()

let container = true;
const ContainerMain = document.querySelector(".porcoes--medidasCaseiras .micronutrientes-main")
const ContainerSecd = document.querySelector(".porcoes--medidasCaseiras .micronutrientes-secd")

const ingredientesList = document.querySelector(".ingredienteList")

function addNewItem(event) {
    const inputValue = event.target.value;
    const lastChild = ingredientesList.lastElementChild;

    if(!inputValue) {
      event.target.parentElement.remove();
      updateSpanIndexes();
    }
    if (lastChild !== event.target.parentElement) return;
    addNewIgrediente();
}

function addNewIgrediente() {
    const childsLength = ingredientesList.childElementCount;

    const firstChild = ingredientesList.firstElementChild;
    if(!firstChild.querySelector('button')) {
    firstChild.insertAdjacentHTML("beforeend", `
    <button onclick="deleteIngrediente(this)">
      <svg stroke="currentColor"
        fill="currentColor" 
        stroke-width="0" 
        viewBox="0 0 24 24" 
        height="1em" 
        width="1em" 
        xmlns="http://www.w3.org/2000/svg">
        <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"></path>
      </svg>
    </button>
  `);
}
    const listItem = document.createElement('li');
    listItem.innerHTML = `
        <span>${childsLength+1}.</span>
        <input type="text" id="newList" oninput="addNewItem(event)" />
        <button onclick="deleteIngrediente(this)">
            <svg stroke="currentColor"
                fill="currentColor" 
                stroke-width="0" 
                viewBox="0 0 24 24" 
                height="1em" 
                width="1em" 
                xmlns="http://www.w3.org/2000/svg">
                <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"></path>
            </svg>
        </button>
    `;
    ingredientesList.appendChild(listItem);
}

function deleteIngrediente(button) {
	button.parentElement.remove();
	updateSpanIndexes();

  const childsLength = ingredientesList.childElementCount;
  if (childsLength === 1) {
    const ingredienteField = ingredientesList.firstElementChild;
    const ingredienteButton = ingredienteField.lastElementChild;
    ingredienteButton.remove();
  }
}

function updateSpanIndexes() {
    const allSpans = [...document.querySelectorAll('.ingredienteList li > span')];
    allSpans.map((span, index) => span.innerText = `${index+1}.`);
}


function handleContainer(){

    if(container === true){
        ContainerMain.style.display = "none"
        ContainerSecd.style.display = "flex"

    }
    else{
        ContainerMain.style.display = "grid"
        ContainerSecd.style.display = "none"
}
    container = !container;
}

function ValueNumPocoes(){
  
  const Numero_de_porcoes = document.getElementById('num-porcoes').value;
  const N_porcoes_medida_caseira = document.getElementById('numb-porcoes');

    N_porcoes_medida_caseira.value = Numero_de_porcoes;
    TitleMicro(Numero_de_porcoes)

}

function PesoMedioReceita(){
  
  const PesodaReceita = document.getElementById('peso').value
  const Numero_de_porcoes = document.getElementById('num-porcoes').value;
  const Media_peso = document.getElementById('peso-porcao')

    if(PesodaReceita > 0 && Numero_de_porcoes > 0){
    Media_peso.value = (PesodaReceita / Numero_de_porcoes)
    }
    else{
      Media_peso.value = ''
    }
}

function TitleMicro(num){

  const nome_porcao = document.getElementById('name-porcao').value
  const nome_porcoes = document.getElementById('name-porcoes').value

  const title = document.getElementById('title-micro-main')
  const titleSecd = document.getElementById('title-micro-secd')
  if(num < 0){
    title.value = `Micronutrientes por ${nome_porcao}`  
    titleSecd.value = `Micronutrientes por ${nome_porcao}`
  }
  else if(num <= 1){
    title.value = `Micronutrientes por ${num} ${nome_porcao}`
    titleSecd.value = `Micronutrientes por ${num} ${nome_porcao}`
  
  }else{
    title.value = `Micronutrientes por ${num} ${nome_porcoes}`
    titleSecd.value = `Micronutrientes por ${num} ${nome_porcoes}`

  }
}

