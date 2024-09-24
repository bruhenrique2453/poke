document.addEventListener("DOMContentLoaded", function() {
    const input = document.getElementById("inputPoke");
    const btn = document.getElementById("btnBuscar");
    
    btn.addEventListener("click", function(){
       const pokemon = input.value;
       const url = `https://pokeapi.co/api/v2/pokemon/${pokemon}`;
       

        console.log(url);
       fetch(url)
          .then(response => {
             if(!response.ok) {
                throw new Error ("Erro ao realizar API: "+response.status)
              }
              return response.json();
          })
          .then(data =>{
              console.log(data);

              const visor = document.getElementById("visor");
              visor.innerHTML = "";

              const divNome = document.createElement("div");
              divNome.classList.add("container-nome");
              divNome.innerHTML = `<h5>${data.name}</h5>`;
              visor.appendChild(divNome);


              const divImg = document.createElement("div");
              divImg.classList.add("container-img");
              divImg.innerHTML =`
              <img src="${data.sprites.other.showdown.front_default}">
              <img src="${data.sprites.other.showdown.front_shiny}">`;     
              visor.appendChild(divImg);

              const divAltura = document.createElement("div");
              divAltura.classList.add("container-altura");
              divAltura.innerHTML = `<h5>${data.height/10} Metros</h5>`;
              visor.appendChild(divAltura);

              const divPeso = document.createElement("div");
              divPeso.classList.add("container-peso");
              divPeso.innerHTML = `<h5>${data.weight/10} Kg</h5>`;
              visor.appendChild(divPeso);

              
              
             data.stats.forEach(statusAtual =>{
                const divStatus = document.createElement("div");
                divStatus.classList.add("container-status");
                divStatus.innerHTML = `<h5>${statusAtual.base_stat } ${statusAtual.stat.name}</h5>`;
                visor.appendChild(divStatus);

             })
          })
          .catch(error => {
             console.log("Erro ao utilizar API: ",error);
          })
    });
});