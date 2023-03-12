const preguntas = document.querySelector("#preguntas");
const respuestas = document.querySelector("#respuestas");
const container = document.querySelector(".container");
const buttonCreator = document.querySelector(".buttonCreator");
const divCreador=document.querySelector(".creador");
const form=document.querySelector(".form");
buttonCreator.addEventListener("click", creador);

function creador(event) {
    event.preventDefault();
    divCreador.classList.add("remover")
    for (let i = 0; i < preguntas.value; i++) {
        let containerQuestions = document.createElement("div");
        containerQuestions.classList.add("main__container__trivia");
        container.appendChild(containerQuestions);
        const h2 = document.createElement("h2");
        const nameInput = (h2.innerText = prompt("Inserta la pregunta"));
        h2.classList.add("main__list__tittle");
        containerQuestions.appendChild(h2);
        for (let o = 0; o < respuestas.value; o++) {
            let ul = document.createElement("ul");
            ul.classList.add("main__container__list");
            let li = document.createElement("li");
            li.classList.add("main__element_list");
            let label = document.createElement("label");
            label.classList.add("main__checkbox__label");
            label.for = nameInput;
            let input = document.createElement("input");
            input.classList.add("main__input__radio");
            input.type = "radio";
            input.name = nameInput;
            const containers = document.querySelectorAll(
                ".main__container__trivia"
            );
            label.innerText = prompt("Inserta las posibles respuestas");
            for (let cadaPregunta of containers) {
                cadaPregunta.appendChild(ul);
                ul.appendChild(li);
                li.appendChild(input);
                li.appendChild(label);
            }
        }
    }
    function seleccion() {
      const li = document.querySelectorAll("li");
      li.forEach((a) => {
          a.querySelectorAll("input").forEach((b) => {
              a.addEventListener("click", () => {
                  b.checked = true;
              });
          });
      });
  }
  
  seleccion();
  const buttonReiniciar=document.createElement("button");
  buttonReiniciar.classList.add("buttonReiniciar");
  buttonReiniciar.innerText="Reiniciar";
  container.appendChild(buttonReiniciar);

  buttonReiniciar.addEventListener("click",()=>{
    location.reload();
  })
}


