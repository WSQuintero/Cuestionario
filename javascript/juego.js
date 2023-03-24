const usuarioActual = JSON.parse(localStorage.getItem('usuarioActual'))
const inputArchivo = document.getElementById('seleccionar-archivo')
const main = document.querySelector('main')
const nombre = document.querySelector('h1')
const busqueda = document.querySelector('.busqueda')
nombre.innerText = `Hola ${usuarioActual.name}`

inputArchivo.addEventListener('change', seleccionarArchivo)

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
function seleccionarArchivo () {
  const archivo = inputArchivo.files[0]

  const reader = new FileReader()

  reader.addEventListener('load', () => {
    fetch(reader.result)
      .then((response) => response.text())
      .then((data) => {
        main.innerHTML = data
        selectionInput()
      })
  })

  reader.readAsDataURL(archivo)
  inputArchivo.classList.add('remover')
  busqueda.innerHTML = 'Muy buena suerte'
}
