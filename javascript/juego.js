const usuarioActual = JSON.parse(localStorage.getItem("usuarioActual"));
const checkboxes = document.querySelectorAll(".main__input__radio");
const li = document.querySelectorAll("li");
const container = document.querySelector(".container");
const inputArchivo = document.getElementById("seleccionar-archivo");
const header=document.querySelector(".header");
container.innerHTML = `<h1 class="saludo">Hola ${usuarioActual.name}!</h1>`;
const busqueda=document.querySelector(".busqueda");

inputArchivo.addEventListener("change", seleccionarArchivo);

function seleccionarArchivo() {
	const archivo = inputArchivo.files[0];

	const reader = new FileReader();

	reader.addEventListener("load", () => {
		fetch(reader.result)
			.then((response) => response.text())
			.then((data) => {
				container.innerHTML = data;
				
			});
	});

  reader.readAsDataURL(archivo);
  inputArchivo.classList.add("remover")
  busqueda.innerHTML="Muy buena suerte"
}

li.forEach((a) => {
	a.querySelectorAll("input").forEach((b) => {
		a.addEventListener("click", () => {
			b.checked = true;
		});
	});
});
