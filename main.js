function sendMesasge() {
  let name = document.getElementById("nombre").value;
  let course = document.getElementById("curso");
  if (course.value == 1) {
    const alertPlaceholder = document.getElementById("liveAlertPlaceholder");
    const alertTrigger = document.getElementById("liveAlertBtn");
    const appendAlert = (message, type) => {
        const wrapper = document.createElement("div");
        wrapper.innerHTML = [
          `<div class="alert alert-${type} alert-dismissible" role="alert">`,
          `   <div>${message}</div>`,
          '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
          "</div>",
        ].join("");
        alertPlaceholder.append(wrapper);
      };
    appendAlert("No has seleciona un curso valido!", "danger");
  }else{
    let message = "Hola, mi nombre es " + name + " y estoy interesado en el curso " + course.options[course.value - 1].text + ".";
    alert(message);
  }
}


var contadorLlenado = 0; 
function incrementarProgreso() {
    var barra = document.querySelector('.progress-bar');
    var valorActual = parseInt(barra.style.width);

    if (valorActual < 100) {
        valorActual += 10; 
        barra.style.width = valorActual + '%';
        barra.textContent = valorActual + '%';
    } else {
        contadorLlenado++; 
        if (contadorLlenado >= 2) {
            clearInterval(intervalo); 
        } else {
            barra.style.width = '0%'; 
            barra.textContent = '0%';
        }
    }
}

var intervalo = setInterval(incrementarProgreso, 2000); 