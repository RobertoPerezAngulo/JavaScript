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
            cardtextPrice.innerHTML = "Precio: "+model.price;
            const cardButton = document.createElement('button');
            cardButton.onclick = function(){shopingCard(model.id,1)};
            cardButton.className = "btn btn-dark";
            cardButton.innerHTML = "Comprar";
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
            col.style = "width: 30rem;";
            col.className = "col";
            col.appendChild(card);
            modelList.appendChild(col);
        });
    })
    .catch(error => console.error('Error:', error));

function shopingCard(id,count){
    console.log("El id es: "+id+" y la cantidad es: "+count);
}


document.addEventListener('DOMContentLoaded', (event) => {
    document.getElementById('searchForm').addEventListener('submit', function(e) {
        e.preventDefault(); 
        const searchText = document.getElementById('searchInput').value;
        console.log('Búsqueda:', searchText);
        const busqueda = document.getElementsByClassName('nameVehicle');
        for (let i = 0; i < busqueda.length; i++) {
            if(busqueda[i].innerHTML.toLowerCase().indexOf(searchText.toLowerCase()) !== -1){
                alert("Se ha encontrado un vehículo con el nombre: "+ busqueda[i].innerHTML);
            }
        }
    });
});