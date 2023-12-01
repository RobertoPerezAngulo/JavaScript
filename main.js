function shopingCard(id,count){
    if(localStorage.getItem("admin") == "true"){
        if(localStorage.getItem("shopingCard") == null){
            localStorage.setItem("shopingCard", JSON.stringify([]));
        }
        const shopingCard = JSON.parse(localStorage.getItem("shopingCard"));
        document.querySelector("#countShopping").innerHTML = shopingCard.length;
        let flag = false;
        for (let i = 0; i < shopingCard.length; i++) {
            const element = shopingCard[i];
            if(element.id == id){
                element.count += count;
                flag = true;
            }
        }
        if(!flag){
            shopingCard.push({id: id, count: count});
        }
        localStorage.setItem("shopingCard", JSON.stringify(shopingCard));
        // alert("Se ha añadido al carrito");
    }
    else{
        alert("No tienes permisos para añadir al carrito");
    }
    window.location.href = "/Primera Entrega/index.html";
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
        document.querySelector("#bienvenida").innerHTML= "<p class='text-success text-center'>¡Bienvenido Admintrador!</p>";
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
        document.querySelector("#bienvenida").innerHTML= "<h1 class='mt-5 d-flex justify-content-center'>¡Bienvenido Admintrador!</h1>";
    }
}

function closeSession() {
    localStorage.removeItem("admin");
    window.location.href = "/Primera Entrega/index.html";
}

window.onload = checkSession;

document.addEventListener('DOMContentLoaded', (event) => {
    fetch('./static/auto.json')
    .then(response => response.json())
    .then(data => {
        const modelList = document.getElementById('card');
        data.models.forEach(model => {
            const img = document.createElement('img');
            img.src = model.image;
            img.className = "card-img-top";
            const cardBody = document.createElement('div');
            cardBody.className = "card-body mt-5";
            cardBody.id = "cardBody"+model.id;            
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
            cardButton.innerHTML = "Añade al carrito";
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
        if(localStorage.getItem("admin") == "false" || localStorage.getItem("admin") == null){
            document.querySelector("#countShopping").hidden = true;
        }else{
            console.log("hola");
            const shopingCard = JSON.parse(localStorage.getItem("shopingCard"));
            console.log(shopingCard);
            shopingCard ? document.querySelector("#countShopping").innerHTML = shopingCard.length : document.querySelector("#countShopping").hidden = true;
        }
    })
    .catch(error => console.error('Error:', error));
});
