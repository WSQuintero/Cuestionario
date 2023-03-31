const usuarioActual = JSON.parse(localStorage.getItem('usuarioActual'))
const inputArchivo = document.getElementById('seleccionar-archivo')
const main = document.querySelector('main')
const nombre = document.querySelector('h1')
const busqueda = document.querySelector('.busqueda')
const body = document.querySelector('body')
let contador = 0

inputArchivo.addEventListener('change', seleccionarArchivo)
nombre.innerText = `Hola ${usuarioActual.name}`

function seleccionarArchivo () {
  const archivo = inputArchivo.files[0]

  const reader = new FileReader()

  reader.addEventListener('load', () => {
    fetch(reader.result)
      .then((response) => response.text())
      .then((data) => {
        main.innerHTML = data
        selectionInput()
        const enviar = new Enviar()
        enviar.iniciar()
      })
  })

  reader.readAsDataURL(archivo)
  inputArchivo.classList.add('remover')
  busqueda.innerHTML = 'Muy buena suerte'
}

class Enviar {
  #datoCifrado = '1012437325Cc'

  #desCifrarDato () {
    return this.#datoCifrado
  }

  iniciar () {
    const enviar = document.querySelector('.enviar')
    enviar.addEventListener('click', () => {
      const dato = this.#desCifrarDato()
      desCifrar(dato)
    })
  }
}
function desCifrar (clave) {
  const cifrado = document.querySelector('.cifrado').innerText
  const decrypted = CryptoJS.AES.decrypt(cifrado, clave).toString(
    CryptoJS.enc.Utf8
  )
  const respuestas = JSON.parse(decrypted)
  resultado(respuestas)
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

function resultado (objResultados) {
  main.classList.add('remover')
  const containerQuestion = document.querySelectorAll(
    '.main__container__trivia'
  )
  const respuestasCorrectas = []
  const respuestasInCorrectas = []
  const respuestasCorrectasSinCLickear = []

  for (const compa of containerQuestion) {
    const pregunta = compa.querySelector('.main__list__tittle')
    const ul = compa.querySelector('ul')
    const li = ul.querySelectorAll('li')

    li.forEach((a) => {
      const input = a.querySelector('input')
      const label = a.querySelector('label')

      for (const quest in objResultados) {
        const inputCorrecto = input.id === objResultados[quest]

        if (inputCorrecto && input.checked) {
          respuestasCorrectas.push([input.id, `Respuesta correcta: ${label.innerText}`, pregunta.innerText
          ])
        } else if (inputCorrecto && input.checked === false) {
          respuestasCorrectasSinCLickear.push([
            input.id, `Respuesta correcta: ${label.innerText}`, pregunta.innerText])
        }
      }
    })
  }

  containerQuestion.forEach((a) => {
    const preguntaTittle = a.querySelector('.main__list__tittle')
    const ulGeneral = a.querySelector('ul')
    const labelGeneral = ulGeneral.querySelectorAll('label')
    labelGeneral.forEach((label) => {
      const inputGeneral = label.querySelector('input')
      respuestasCorrectas.forEach((correct) => {
        if (inputGeneral.checked && inputGeneral.id !== correct[0]) {
          contador++
          if (respuestasCorrectas.length !== containerQuestion.length) {
            respuestasInCorrectas.push([
              inputGeneral.id,
							`Respuesta incorrecta: ${label.innerText}`,
							preguntaTittle.innerText
            ])
          }
        }
      })
    })
  })

  const todas = respuestasCorrectas.concat(respuestasInCorrectas)
  todas.forEach((pregunta) => {
    const container = document.createElement('div')
    const h2Tittle = document.createElement('h2')
    const liCorrectas = document.createElement('li')
    const liInCorrectas = document.createElement('li')
    liCorrectas.classList.add('liRespuestas')
    liInCorrectas.classList.add('liRespuestas')
    container.classList.add('containerRespuestas')
    h2Tittle.classList.add('h2Tittle')
    h2Tittle.innerText = pregunta[2]
    body.appendChild(container)
    container.appendChild(h2Tittle)
    if (pregunta[1].includes('Respuesta incorrecta:')) {
      liCorrectas.innerText = pregunta[1]
      container.appendChild(liCorrectas)
    } else if (pregunta[1].includes('Respuesta correcta:')) {
      liInCorrectas.innerText = pregunta[1]
      container.appendChild(liInCorrectas)
    }
  })
  const resultado = document.createElement('p')
  resultado.classList.add('resultado')
  resultado.innerText = `Tuviste ${contador} respuestas correctas de ${todas.length}`
  body.appendChild(resultado)
  console.log(respuestasCorrectas)
  console.log(respuestasInCorrectas)
}

// Crear una instancia de la clase y usar la función iniciar
