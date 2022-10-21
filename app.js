const urlBase ="https://rickandmortyapi.com/api/character/";

fetch(urlBase)
.then(respuesta => {
return respuesta.json();

}).then(resJson => {
console.log(resJson);
const info = resJson.info;
const personajes=resJson.results;
console.log(info);
console.log(personajes);

showCharacters(personajes);
})

const showCharacters = (personajes) => {

    const listadoPersonajes = document.querySelector("ul");
    personajes.forEach(personaje => {
        const li = document.createElement ("li");
        li.innerText = `personaje ${personaje.name}`;
        listadoPersonajes.appendChild(li);
    })
}
