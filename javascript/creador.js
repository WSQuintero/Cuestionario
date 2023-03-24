const preguntas = document.querySelector('#preguntas')
const respuestas = document.querySelector('#respuestas')
const container = document.querySelector('.container')
const buttonCreator = document.querySelector('.buttonCreator')
const divCreador = document.querySelector('.creador')
const buttonReiniciar = document.createElement('button')
const botonDescarga = document.createElement('button')
const enviar = document.createElement('button')
let numberQuestion

buttonCreator.addEventListener('click', creador)

function createButtonSend () {
  enviar.classList.add('enviar')
  enviar.innerText = 'Enviar'
  container.appendChild(enviar)
  enviar.classList.add('remover')

  botonDescarga.innerText = 'Descargar cuestionario'
  botonDescarga.addEventListener('click', descargarCuestionario)
  container.appendChild(botonDescarga)
}
function descargarCuestionario () {
  enviar.classList.remove('remover')
  botonDescarga.classList.add('remover')
  buttonReiniciar.classList.add('remover')
  const section = document.querySelector('section')

  const contenido = `${section.innerHTML}`

  const archivo = new Blob([contenido], { type: 'text/html' })
  const urlArchivo = URL.createObjectURL(archivo)

  const link = document.createElement('a')
  link.href = urlArchivo
  link.download = 'mi_cuestionario.html'
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  buttonReiniciar.classList.remove('remover')
  enviar.classList.add('remover')
}
function selectionInput () {
  const li = document.querySelectorAll('li')
  li.forEach((a) => {
    a.querySelectorAll('input').forEach((b) => {
      a.addEventListener('click', () => {
        b.checked = true
      })
    })
  })
}
function reset () {
  buttonReiniciar.classList.add('buttonReiniciar')
  buttonReiniciar.innerText = 'Reiniciar'
  container.appendChild(buttonReiniciar)
  buttonReiniciar.addEventListener('click', () => {
    location.reload()
  })
}
function deleteButtonCorrect () {
  const buttonsCorrect = document.querySelectorAll(`.respuestaCorrecta${numberQuestion}`)

  for (const correct of buttonsCorrect) {
    correct.classList.add('remover')
  }
}
function creador (event) {
  event.preventDefault()
  divCreador.classList.add('remover')

  for (let i = 0; i < preguntas.value; i++) {
    const containerQuestions = document.createElement('div')
    const containerPregunta = document.createElement('div')
    const inputPregunta = document.createElement('input')
    const buttonPregunta = document.createElement('button')
    const h2 = document.createElement('h2')
    const ul = document.createElement('ul')
    const generalLabel = document.createElement('label')
    let correct
    let respuestaCorrectaClickeado = false

    containerQuestions.classList.add('main__container__trivia')
    containerPregunta.classList.add('containerPregunta')
    buttonPregunta.classList.add('buttonPregunta')
    h2.classList.add('main__list__tittle')
    h2.classList.add('remover')

    inputPregunta.type = 'text'
    buttonPregunta.innerText = 'Crear pregunta'
    inputPregunta.placeholder = 'Escibe la pregunta aquí'

    container.appendChild(containerQuestions)
    containerQuestions.appendChild(containerPregunta)
    containerPregunta.appendChild(inputPregunta)
    containerPregunta.appendChild(buttonPregunta)
    containerPregunta.appendChild(h2)
    generalLabel.appendChild(ul)

    buttonPregunta.addEventListener('click', () => {
      h2.classList.remove('remover')
      h2.innerText = inputPregunta.value
      buttonPregunta.classList.add('remover')
      inputPregunta.classList.add('remover')
    })

    for (let o = 0; o < respuestas.value; o++) {
      const li = document.createElement('li')
      const label = document.createElement('label')
      const input = document.createElement('input')
      const inputRespuestas = document.createElement('input')
      const ButtonCrearRespuesta = document.createElement('button')
      const respuestaCorrecta = document.createElement('button')
      const containers = document.querySelectorAll('.main__container__trivia')

      const crearRespuesta = () => {
        if (respuestaCorrectaClickeado) {
          label.innerText = inputRespuestas.value
          ButtonCrearRespuesta.classList.add('remover')
          inputRespuestas.classList.add('remover')
          input.classList.remove('remover')

          selectionInput()
        } else {
          alert('Por favor selecciona la respuesta correcta primero')
        }
      }
      const seleccionarCorrecta = () => {
        correct = `pregunta${i}respuesta${o}`
        console.log(correct)
        numberQuestion = i
        deleteButtonCorrect()
        respuestaCorrectaClickeado = true
      }

      input.type = 'radio'
      input.name = `Pregunta${i}`
      generalLabel.htmlFor = `Pregunta${i}`

      ul.classList.add('main__container__list')
      li.classList.add('main__element_list')
      label.classList.add('main__checkbox__label')
      input.classList.add('main__input__radio')
      input.classList.add('remover')
      inputRespuestas.classList.add('inputRespuestas')
      inputRespuestas.classList.add('inputRespuestas')
      respuestaCorrecta.classList.add(`respuestaCorrecta${i}`)

      inputRespuestas.placeholder = 'Escribe la opción de respuesta aquí'
      ButtonCrearRespuesta.innerText = 'Crear'
      respuestaCorrecta.innerText = '¿correcta?'

      label.appendChild(inputRespuestas)
      label.appendChild(respuestaCorrecta)
      label.appendChild(ButtonCrearRespuesta)

      ButtonCrearRespuesta.addEventListener('click', crearRespuesta)
      respuestaCorrecta.addEventListener('click', seleccionarCorrecta)

      for (const cadaPregunta of containers) {
        cadaPregunta.appendChild(generalLabel)
        ul.appendChild(li)
        li.appendChild(label)
        li.appendChild(input)
        li.id = `pregunta${i}respuesta${o}`
      }
    }
  }
  reset()
  createButtonSend()
}
