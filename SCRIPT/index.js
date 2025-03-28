const getGames = function () {
  const gamesUrl = "https://striveschool-api.herokuapp.com/api/product/";
  fetch(gamesUrl, {
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2N2U2YzdmMGFiZWE5ZTAwMTU1OTA2YjciLCJpYXQiOjE3NDMxODQ0MzEsImV4cCI6MTc0NDM5NDAzMX0.5EoCMqrrFvIQdDzctEAG1iDw6O8rkyMJVmQtVYFuQmI",
    },
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Si è verificato un errore nel collegamento all'API");
      }
    })
    .then((data) => {
      // Stampiamo l'intera risposta per verificare la struttura
      console.log("DATI RICEVUTI:", data);

      // verifica che "data" sia un array
      if (Array.isArray(data)) {
        console.log("Risposta Api", data);
        const row = document.getElementById("games-row");
        row.classList.add("g-3");

        data.forEach((game) => {
          console.log(game.name, game._id);

          // creazione elementi per la card
          const divCol = document.createElement("div");
          divCol.classList.add(
            "col",
            "col-12",
            "col-lg-3",
            "col-md-4",
            "col-sm-6"
          );

          const divCard = document.createElement("div");
          divCard.classList.add("card", "border", "border-2");

          const imgCard = document.createElement("img");
          imgCard.setAttribute("src", game.imageUrl);
          imgCard.classList.add("rounded-top-2", "cursor-pointer");
          imgCard.setAttribute("data-bs-toggle", "modal");
          imgCard.setAttribute("data-bs-target", "#staticBackdrop");
          imgCard.addEventListener("click", function () {
            staticBackdropLabel.innerText = game.name;
            const modalBody = document.getElementById("modal-body");
            const imgModal = document.createElement("img");
            imgModal.setAttribute("src", game.imageUrl);
            modalBody.appendChild(imgModal);
          });

          const divCardBody = document.createElement("div");
          divCardBody.classList.add("card-body", "bg-dark", "rounded-bottom-2");

          const titleCard = document.createElement("h5");
          titleCard.classList.add("card-title", "text-danger");
          titleCard.innerText = game.name;

          const descriptionCard = document.createElement("p");
          descriptionCard.classList.add("card-text", "text-white");

          let shortDesc = game.description.slice(0, 100);
          if (game.description.length > 100) {
            shortDesc += "...";
          }

          descriptionCard.innerText = shortDesc;

          const priceBrandCard = document.createElement("p");
          priceBrandCard.classList.add("text-warning", "fw-semibold");
          priceBrandCard.innerText = game.price + "€ - " + game.brand;

          const btnGRP = document.createElement("div");
          btnGRP.classList.add("btn-group");

          const detailButton = document.createElement("a");
          detailButton.classList.add(
            "btn",
            "btn-dark",
            "border",
            "border-1",
            "border-secondary"
          );
          detailButton.innerText = "View";
          detailButton.setAttribute("href", `./details.html?id=${game._id}`);

          // inseriamo gli elementi nella card
          btnGRP.appendChild(detailButton);

          divCardBody.appendChild(titleCard);
          divCardBody.appendChild(descriptionCard);
          divCardBody.appendChild(priceBrandCard);
          divCardBody.appendChild(btnGRP);

          divCard.appendChild(imgCard);
          divCard.appendChild(divCardBody);

          divCol.appendChild(divCard);
          row.appendChild(divCol);
        });
      } else {
        console.log("La struttura dei dati non è quella che ci aspettavamo.");
      }
    })
    .catch((err) => {
      console.log("Si è verificato un errore", err);
    });
};

getGames();
