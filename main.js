

function shopingCard(id,count){
    console.log("El id es: "+id+" y la cantidad es: "+count);
}


document.addEventListener('DOMContentLoaded', (event) => {
    document.getElementById('searchForm').addEventListener('submit', function(e) {
        e.preventDefault(); 
        const searchText = document.getElementById('searchInput').value;
        const busqueda = document.getElementsByClassName('nameVehicle');
        for (let i = 0; i < busqueda.length; i++) {
            const element = busqueda[i];
            if(element.innerHTML.toLowerCase().indexOf(searchText.toLowerCase()) == -1){
                element.parentElement.parentElement.style.display = "none";
            }
            else{
                element.parentElement.parentElement.style.display = "block";
            }
        }
    });
});


function convertPrice(price){
    return price.toLocaleString('es-MX', { style: 'currency', currency: 'MXN' }.currency) + " MXN";
}



function login(){
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    if(email == "admin@hotmail.com" && password == "123"){
        localStorage.setItem("admin", "true");
        window.location.href = "/Primera Entrega/index.html";
    }
    else{
        document.querySelector("#messajeError").innerHTML= "<p class='text-danger text-center'>Usuario o contraseña incorrectos</p>";
    }
}

function checkSession() {
    if (localStorage.getItem("admin") === "true") { 
        document.querySelectorAll("#buttonSession").forEach(doc => {
            doc.innerHTML = "Cerrar sesión";
            doc.onclick = function(){closeSession()};
        });
    }
}

function closeSession() {
    localStorage.removeItem("admin");
    window.location.href = "/Primera Entrega/index.html";
}

window.onload = checkSession;

fetch('./static/auto.json')
    .then(response => response.json())
    .then(data => {
        const modelList = document.getElementById('card');
        data.models.forEach(model => {
            const img = document.createElement('img');
            img.src = "/Primera Entrega/static/seat.png";
            img.className = "card-img-top";
            const cardBody = document.createElement('div');
            cardBody.className = "card-body mt-5";            
            const cardTitle = document.createElement('h5');
            cardTitle.className = "nameVehicle card-title";
            cardTitle.innerHTML = model.name; 
            const cardText = document.createElement('p');
            cardText.className = "card-text";
            cardText.innerHTML = model.description;
            const cardtextPrice = document.createElement('p');
            cardtextPrice.className = "card-text";
            cardtextPrice.innerHTML = "<span class='align-bottom material-symbols-outlined'>attach_money</span>" + convertPrice(model.price);
            const cardButton = document.createElement('button');
            cardButton.onclick = function(){shopingCard(model.id,1)};
            cardButton.className = "btn btn-dark card-img-bottom";
            cardButton.innerHTML = "Comprar";
            if(localStorage.getItem("admin") == "false" || localStorage.getItem("admin") == null){
                cardButton.disabled = true
            }
            cardBody.appendChild(cardTitle);
            cardBody.appendChild(cardtextPrice);
            cardBody.appendChild(cardText);
            cardBody.appendChild(cardButton);
            const card = document.createElement('div');
            card.className = "card";
            card.appendChild(img);
            card.appendChild(cardBody);
            modelList.appendChild(card);
            const col = document.createElement('div');
            col.style = "width: 28rem;";
            col.className = "col";
            col.appendChild(card);
            modelList.appendChild(col);
        });
    })
    .catch(error => console.error('Error:', error));