document.addEventListener("DOMContentLoaded", function() {
    const input = document.getElementById("inputPoke");
    const btn = document.getElementById("btnBuscar");
    
    btn.addEventListener("click", function(){
       const pokemon = input.value;
       input.value = "";
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

              const tela = document.getElementById("tela")
              tela.innerHTML = "";

              const divNome = document.createElement("div");
              divNome.classList.add("container-nome");
              divNome.innerHTML = `<h1>${data.name}</h1>`;
              visor.appendChild(divNome);


              const divImg = document.createElement("div");
              divImg.classList.add("container-img");
              divImg.innerHTML =`
              <img class= "imagem" src="${data.sprites.other.home.front_default}">
              <img class= "imagem" src="${data.sprites.other.home.front_shiny}">`;     
              visor.appendChild(divImg);

              const divAltura = document.createElement("div");
              divAltura.classList.add("container-altura");
              divAltura.innerHTML = `<h4> Metros: ${data.height/10} </h4>`;
              tela.appendChild(divAltura);

              const divPeso = document.createElement("div");
              divPeso.classList.add("container-peso");
              divPeso.innerHTML = `<h4> Peso: ${data.weight/10} </h4>`;
              tela.appendChild(divPeso);

              
              
             data.stats.forEach(statusAtual =>{
                const divStatus = document.createElement("div");
                divStatus.classList.add("container-status");
                divStatus.innerHTML = `<h4> ${statusAtual.stat.name}: ${statusAtual.base_stat } </h4>`;
                tela.appendChild(divStatus);

             })
          })
          .catch(error => {
             console.log("Erro ao utilizar API: ",error);
          })
    });
});