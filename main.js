function shopingCard(id,count,imagen,precio){
    if(localStorage.getItem("admin") == "true"){
        if(document.querySelector("#shoppingbotton").disabled){
            document.querySelector("#shoppingbotton").disabled = false;
        }
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
                localStorage.setItem("Total",  localStorage.getItem("Total") == null ? 0  + parent(element.price) : parseInt(localStorage.getItem("Total")) + parseInt(element.price));
            }
        }
        if(!flag){
            shopingCard.push({id: id, count: count, price: precio, img: imagen});
            localStorage.setItem("Total", localStorage.getItem("Total") == null ? 0 + parseInt(precio)  : parseInt(localStorage.getItem("Total")) + parseInt(precio));
        }
        localStorage.setItem("shopingCard", JSON.stringify(shopingCard));
    }
    else{
        alert("No tienes permisos para añadir al carrito");
    }
    
    window.location.href = "/index.html";
}

function sendEmail(){
    let mensaje = document.getElementById('mensajeInteres').value;
    let nombre = document.getElementById('nombreInteres').value;
    let email = document.getElementById('correoInteres').value;
    window.open('mailto:rperez_puma@hotmail.com?subject=¡Hola realice una prueba de tu proyecto!&body=' + 'Mi nombre es ' + nombre + ', me puedes contactar a: ' + email + ' mensaje: ' +mensaje )
    var myModalEl = document.getElementById('showContactame');
    var modal = bootstrap.Modal.getInstance(myModalEl);
    modal.hide();
    Toastify({
        text: "En breve nos pondremos en contacto contigo, gracias por tu interes.",
        duration: -1,
        close: true,
        gravity: "top", 
        position: "right",
        stopOnFocus: true, 
        style: {
          background: "linear-gradient(to right, #212529, #dc3545)",
        }
      }).showToast();

}

function pagar(){
    Toastify({
        text: "En breve nos pondremos en contacto contigo, gracias por tu interes.",
        duration: -1,
        close: true,
        gravity: "top", 
        position: "right",
        stopOnFocus: true, 
        style: {
          background: "linear-gradient(to right, #212529, #dc3545)",
        }
      }).showToast();
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
        document.querySelector("#bienvenida").innerHTML= "<p class='text-success text-center'>¡Bienvenido Proyecto Final Curso JavaScript!</p>";
        window.location.href = "/index.html";
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
        document.querySelector("#bienvenida").innerHTML= "<h1 class='mt-1 d-flex justify-content-center'>¡Bienvenido Proyecto Final Curso JavaScript!</h1>";
        document.querySelector("#shoppingbotton").disabled
    }
}

function closeSession() {
    localStorage.removeItem("admin");
    window.location.href = "/index.html";
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
            cardButton.onclick = function(){shopingCard(model.id,1,model.image,model.price)};
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
            document.querySelector("#shoppingbotton").disabled = true;
        }else{
            if(localStorage.getItem("shopingCard") == null){
                localStorage.setItem("shopingCard", JSON.stringify([]));
            }
            const shopingCard = JSON.parse(localStorage.getItem("shopingCard"));
            if( shopingCard == null || shopingCard.length == 0){
                document.querySelector("#shoppingbotton").disabled = true;
            }else{
                document.querySelector("#shoppingbotton").disabled = false;
            }
            let total = 0;
            const canasta = document.querySelector("#canasta");
            for(let i = 0; i < shopingCard.length; i++)
            {
                total += shopingCard[i].count;
                const divcontainer = document.createElement('div');
                divcontainer.className = "row";

                const divcard = document.createElement('div');
                divcard.className = "col-4";
                const imgcanasta = document.createElement('img');
                imgcanasta.src = shopingCard[i].img;
                imgcanasta.className = "img-fluid rounded-start";        
                const divcol = document.createElement('div');
                divcol.className = "col-1 my-2";
                const inputdiv = document.createElement('div');
                inputdiv.innerHTML = shopingCard[i].count;
                
                const priceDiv = document.createElement('div');
                priceDiv.className = "col-4 my-2 figure-caption";
                const buttonPrice = document.createElement('div');
                buttonPrice.innerHTML = convertPrice(shopingCard[i].count * shopingCard[i].price);
                priceDiv.appendChild(buttonPrice);

                const buttondiv = document.createElement('div');
                buttondiv.className = "col-1 mx-1";
                const button = document.createElement('button');
                button.className = "btn";
                button.onclick = function(){removeItem(shopingCard[i].id)};
                button.innerHTML = "<span class='material-symbols-outlined'>close</span>";
                buttondiv.appendChild(button);
                divcol.appendChild(inputdiv);
                divcard.appendChild(imgcanasta);

                divcontainer.appendChild(divcard);
                divcontainer.appendChild(divcol);
                divcontainer.appendChild(priceDiv);
                divcontainer.appendChild(buttondiv);
                canasta.appendChild(divcontainer);
            }
            total != 0 ? document.querySelector("#countShopping").innerHTML = total : document.querySelector("#countShopping").hidden = true;
            document.querySelector('#precioFinal').innerHTML = convertPrice(localStorage.getItem("Total"));
        }

    })
    .catch(error => console.error('Error:', error));
});

function comprar(){
    window.location.href = "pages/finalizacompra.html";
}

function removeItem(id){
    const shopingCard = JSON.parse(localStorage.getItem("shopingCard"));
    for (let i = 0; i < shopingCard.length; i++) {
        const element = shopingCard[i];
        if(element.id == id){
            shopingCard.splice(i,1);
            localStorage.setItem("Total", localStorage.getItem("Total")  - element.count *  element.price);
        }
    }
    
    localStorage.setItem("shopingCard", JSON.stringify(shopingCard));
    window.location.href = "/index.html";
}

document.addEventListener('DOMContentLoaded', (event) => {
    document.getElementById("whatsApp").addEventListener("click", () => {
        window.open('https://api.whatsapp.com/send?phone=5513095096&text=Hola');
    });
});