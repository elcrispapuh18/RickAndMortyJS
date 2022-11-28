import { modalBody,spinner,creaCard } from "./ui.js";
const urlBase= 'https://rickandmortyapi.com/api/character/';

const loadData=(urlBase, page=1)=>{
    const url=`${urlBase}?page=${page}`;
 fetch(url)
.then(respuesta =>{
    return respuesta.json();
}).then(respJson =>{
    console.log(respJson);
    const info=respJson.info;
    const personajes=respJson.results;
    console.log(info);
    //validacion
    const btnPrev =document.querySelector('#prev');
    const btnNext =document.querySelector('#next');
    if(!info.prev){
        btnPrev.classList.add('disabled');

    }else {
        btnPrev.classList.remove('disabled');
        btnPrev.setAttribute('data-id', Number(page) -1);
    }
    if(!info.next){
        btnNext.classList.add('disabled');

    }else {
        btnNext.classList.remove('disabled');
        btnNext.setAttribute('data-id', Number(page) +1);
    }
    showCharacters(personajes);
})
}
const showCharacters=(personajes)=> {
    const ListaPersonajes = document.querySelector('#characters');
    //limpiar-
    while(ListaPersonajes.firstChild){
        ListaPersonajes.removeChild(ListaPersonajes.firstChild);
    }
    personajes.forEach(personaje => {
        const div =document.createElement('div');
        div.classList.add('col');
        div.classList.add('m-2');;
        div.innerHTML = creaCard(personaje);
       ListaPersonajes.appendChild(div);
        
    });
}
const navegacion=(e)=>{

    
    if(e.target.classList.contains('btn')){
        const id=e.target.getAttribute('data-id');
        loadData(urlBase, id);
    }
}
const showCharacterById=(id)=>{
    const urlId=`${urlBase}${id}`; 
    fetch(urlId)
    .then(result=>result.json())
    .then(character => {
        const modalContent=document.querySelector('.modal-body');
      document.querySelector('.modal-title').innerText= character.name;
        modalContent.appendChild(modalBody(character));
    });
}

const loadInfo=(e)=>{
    e.preventDefault();
    if(e.target.classList.contains('btn')){
        const modalContent=document.querySelector('.modal-body');
        modalContent.removeChild(modalContent.firstChild);
        modalContent.appendChild(spinner());
        setTimeout(()=>{
            modalContent.removeChild(modalContent.firstChild);
            //const content=document.createElement('div');
            const id=e.target.getAttribute('data-id');
            //content.innerHTML=`<h2>Id ${id}</h2>`;
            const content= showCharacterById(id);
        modalContent.appendChild(content);
        }, 3000);
    }
}
document.querySelector('#botones').addEventListener('click', navegacion);
document.querySelector('#characters').addEventListener('click', loadInfo);

loadData(urlBase);