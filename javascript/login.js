let usuarioActual = JSON.parse(localStorage.getItem("usuarioActual")) || [];
let baseUsuarios = JSON.parse(localStorage.getItem("baseUsuarios")) || [];
const usuario = document.querySelector("#usuario");
const password = document.querySelector("#password");
const copia = [...baseUsuarios];
const busqueda = copia.find(
  (a) => a.user === usuario.value && a.pass === password.value
);
localStorage.setItem("usuarioActual", JSON.stringify(busqueda));

const linkRegistrar = document.getElementById("registrar");
const button = document.getElementById("button");
const error = document.querySelector("#error");

button.addEventListener("click", ingresar);


function ingresar(event) {
	
  

	if (busqueda === undefined) {
		error.innerText = "El usuario o contraseña son incorrectos";
		error.style.color = "red";
		error.style.textAlign = "center";
		event.preventDefault();
	} else {
		if (busqueda.tipo == "Estudiante") {
      const link = document.createElement("a");
			link.href = "./html/juego.html";
			link.click();
			event.preventDefault();
		} else if (busqueda.tipo == "Profesor") {
      const link = document.createElement("a");
			link.href = "./html/creador.html";
			link.click();
			event.preventDefault();
		}
	}
}
