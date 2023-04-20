"use strict";

const breedArr = JSON.parse(getFromStorage("breedArr"));
const tbodyEl = document.getElementById("tbody");

/* Render breed table */
function renderBreedTable(breedArr) {
  tbodyEl.innerHTML = "";
  breedArr.forEach(function (breed, i) {
    const row = document.createElement("tr");
    row.setAttribute("id", `breed--${breed.breedNum}`);
    row.innerHTML = `<th scope="row">${i + 1}</th>							
    <td>${breed.breedName}</td>
    <td>${breed.animalType}</td>
    <td><button type="button" class="btn btn-danger btn-delete" data-number="${
      breed.breedNum
    }">Delete</button> 
    
    </td>`;
    tbodyEl.appendChild(row);
  });
}

/*  END Render breed table */
renderBreedTable(breedArr);
renderBreed(breedArr);

/* Submit function */
const btnSubmit = document.getElementById("submit-btn");
btnSubmit.addEventListener("click", function () {
  const breedName = document.getElementById("input-breed").value;
  const animalType = document.getElementById("input-type").value;
  const data = {
    breedNum: breedArr.length ? breedArr.at(-1).breedNum + 1 : 1,
    breedName: breedName,
    animalType: animalType,
  };
  if (validateData(data)) {
    breedArr.push(data);
    saveToStorage("breedArr", JSON.stringify(breedArr));
    renderBreedTable(breedArr);
  }

  function validateData(data) {
    if (!breedName) {
      alert("Breed cannot be left empty");
      return false;
    }

    if (animalType === "Select Type") {
      alert("Please select type");
      return false;
    }

    return true;
  }
});
/* END Submit function */

/* Delete breed */
tbodyEl.addEventListener("click", function (e) {
  const clicked = e.target;
  if (clicked.classList.contains("btn-delete")) {
    console.log(breedArr);
    console.log(clicked.dataset.number, typeof clicked.dataset.number);
    console.log(
      breedArr.findIndex(function (breed) {
        console.log(breed.breedNum);
        return Number(breed.breedNum) === Number(clicked.dataset.number);
      })
    );
    const deleteIndex = breedArr.findIndex(function (breed) {
      return breed.breedNum === Number(clicked.dataset.number);
    });
    breedArr.splice(deleteIndex, 1);
    saveToStorage("breedArr", JSON.stringify(breedArr));
    renderBreedTable(breedArr);
  }
});
/* END Delete breed */
