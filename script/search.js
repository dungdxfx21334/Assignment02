"use strict";

/* START */
const btnFind = document.getElementById("find-btn");
const petArr = JSON.parse(getFromStorage("petArr"));
console.log(petArr);

// Display all the breed
renderBreed(breedArr, false);

const getFormElements = function () {
  const petIdSearch = document.getElementById("input-id");
  const petNameSearch = document.getElementById("input-name");
  const petTypeSearch = document.getElementById("input-type");
  const petBreedSearch = document.getElementById("input-breed");
  const data = {
    petIdSearch: petIdSearch,
    petTypeSearch: petTypeSearch,
    petNameSearch: petNameSearch,
    petBreedSearch: petBreedSearch,
  };
  return data;
};

const searchById = function (searchData) {
  if (!searchData.petIdSearch) {
    return petArr;
  }
  return petArr.filter(function (pet) {
    return pet.id.includes(searchData.petIdSearch);
  });
};

const searchByName = function (searchData) {
  if (!searchData.petNameSearch) {
    return searchById(searchData);
  }
  return searchById(searchData).filter(function (pet) {
    return pet.dataName.includes(searchData.petNameSearch);
  });
};

const searchByType = function (searchData) {
  return searchByName(searchData).filter(function (pet) {
    return pet.type.includes(searchData.petTypeSearch);
  });
};

const searchByBreed = function (searchData) {
  return searchByType(searchData).filter(function (pet) {
    return pet.breed.includes(searchData.petBreedSearch);
  });
};

const searchResult = searchByBreed;
btnFind.addEventListener("click", function () {
  // Take search keywords from the form
  const searchData = getFormElements();
  const filteredPetArr = searchResult(searchData);
  console.log(filteredPetArr);
  /*  Display every element in the petArr  */
  function renderTableData(petArr) {
    const tableBodyEl = document.getElementById("tbody");
    console.log(tableBodyEl);
    tableBodyEl.innerHTML = "";
    for (let i = 0, petArrLen = petArr.length; i < petArrLen; i++) {
      const row = document.createElement("tr");
      row.innerHTML = `<th scope="row">${petArr[i].id}</th>
							<td>${petArr[i].dataName}</td>
							<td>${petArr[i].age}</td>
							<td>${petArr[i].type}</td>
							<td>${petArr[i].weight} kg</td>
							<td>${petArr[i].length} cm</td>
							<td>${petArr[i].breed}</td>
							<td>
								<i class="bi bi-square-fill" style="color: ${petArr[i].color}"></i>
							</td>
							<td>${
                petArr[i].vaccinated
                  ? '<i class="bi bi-check-circle-fill"></i>'
                  : '<i class="bi bi-x-circle-fill"></i>'
              }</td>
							<td>${
                petArr[i].dewormed
                  ? '<i class="bi bi-check-circle-fill"></i>'
                  : '<i class="bi bi-x-circle-fill"></i>'
              }</td>
							<td>${
                petArr[i].sterilized
                  ? '<i class="bi bi-check-circle-fill"></i>'
                  : '<i class="bi bi-x-circle-fill"></i>'
              }</td>
							<td>${new Date(petArr[i].date).toISOString().split("T")[0]}</td>
                            
							<td><button type="button" class="btn btn-warning btn-edit" data-petId="${
                petArr[i].id
              }">Edit</button> 

							</td>`;
      //   This button should contain only one class with the first 4 letters of "id--" because this class is used to store the id of the pet.
      // If another class with the first 4 letter of "id--" appear, there is a good chance the program will delete the wrong row because it takes the wrong id.
      tableBodyEl.appendChild(row);
    }
  }

  renderTableData(filteredPetArr);
});
/* END */
