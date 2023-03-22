const preguntas = document.querySelector("#preguntas");
const respuestas = document.querySelector("#respuestas");
const container = document.querySelector(".container");
const buttonCreator = document.querySelector(".buttonCreator");
const divCreador = document.querySelector(".creador");
const form = document.querySelector(".form");
buttonCreator.addEventListener("click", creador);

function selectionInput() {
    
	const li = document.querySelectorAll("li");
	li.forEach((a) => {
        
		a.querySelectorAll("input").forEach((b) => {
			a.addEventListener("click", () => {
                
				if(!b.checked)b.checked = true;
                else b.checked = false;
			});
		});
	});
}

function reset() {
	const buttonReiniciar = document.createElement("button");
	buttonReiniciar.classList.add("buttonReiniciar");
	buttonReiniciar.innerText = "Reiniciar";
	container.appendChild(buttonReiniciar);

	buttonReiniciar.addEventListener("click", () => {
		location.reload();
	});
}

function creador(event) {
	event.preventDefault();
	divCreador.classList.add("remover");
	for (let i = 0; i < preguntas.value; i++) {
		let containerQuestions = document.createElement("div");
		containerQuestions.classList.add("main__container__trivia");
		container.appendChild(containerQuestions);
        const containerPregunta = document.createElement("div");
        containerPregunta.classList.add("containerPregunta")
       
        containerQuestions.appendChild(containerPregunta);
        const inputPregunta=document.createElement("input");
        containerPregunta.appendChild(inputPregunta) ;
        inputPregunta.type="text";
		const nameInput = ( inputPregunta.value);
		
        const buttonPregunta=document.createElement("button");
        buttonPregunta.innerText="Crear pregunta";
        buttonPregunta.classList.add("buttonPregunta");
        containerPregunta.appendChild(buttonPregunta);
        inputPregunta.placeholder="Escibe la pregunta aquí"
            const h2 = document.createElement("h2");
            h2.classList.add("main__list__tittle");
            containerPregunta.appendChild(h2);
            h2.classList.add("remover");
            
        buttonPregunta.addEventListener("click",()=>{
            h2.classList.remove("remover");
            h2.innerText=inputPregunta.value;
            buttonPregunta.classList.add("remover")
            inputPregunta.classList.add("remover")
        })
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
            input.classList.add("remover");
			const containers = document.querySelectorAll(".main__container__trivia");
            const inputRespuestas=document.createElement("input");
            inputRespuestas.classList.add("inputRespuestas");
            inputRespuestas.placeholder="Escribe la opción de respuesta aquí";
            inputRespuestas.classList.add("inputRespuestas")
            label.appendChild(inputRespuestas);
            const ButtonCrearRespuesta=document.createElement("button");
            ButtonCrearRespuesta.innerText="Crear";
            label.appendChild(ButtonCrearRespuesta);
            ButtonCrearRespuesta.addEventListener("click",()=>{
                label.innerText = inputRespuestas.value;
                ButtonCrearRespuesta.classList.add("remover")
                inputRespuestas.classList.add("remover");
                input.classList.remove("remover");
                
                selectionInput();
                
            })
			

			for (let cadaPregunta of containers) {
				cadaPregunta.appendChild(ul);
				ul.appendChild(li);
				li.appendChild(input);
				li.appendChild(label);
			}
		}
	}
    
	
	reset();
}
