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
  const petVacSearch = document.getElementById("input-vaccinated");
  const petDewormedSearch = document.getElementById("input-dewormed");
  const petSterilizedSearch = document.getElementById("input-sterilized");
  const data = {
    petIdSearch: petIdSearch.value.toLowerCase(),
    petTypeSearch: petTypeSearch.value.toLowerCase(),
    petNameSearch: petNameSearch.value.toLowerCase(),
    petBreedSearch: petBreedSearch.value.toLowerCase(),
    petVacSearch: petVacSearch.checked,
    petDewormedSearch: petDewormedSearch.checked,
    petSterilizedSearch: petSterilizedSearch.checked,
  };
  return data;
};

const searchById = function (searchData) {
  console.log(searchData.petIdSearch);
  console.log(getFormElements());

  if (!searchData.petIdSearch) {
    console.log(petArr);
    return petArr;
  }

  return petArr.filter(function (pet) {
    return pet.id.toLowerCase().includes(searchData.petIdSearch);
  });
};

const searchByName = function (searchData) {
  if (!searchData.petNameSearch) {
    return searchById(searchData);
  }
  return searchById(searchData).filter(function (pet) {
    return pet.dataName.toLowerCase().includes(searchData.petNameSearch);
  });
};

const searchByType = function (searchData) {
  if (searchData.petTypeSearch === "select type") {
    return searchByName(searchData);
  }
  return searchByName(searchData).filter(function (pet) {
    return pet.type.toLowerCase().includes(searchData.petTypeSearch);
  });
};

const searchByBreed = function (searchData) {
  if (searchData.petBreedSearch === "select breed") {
    return searchByType(searchData);
  }
  return searchByType(searchData).filter(function (pet) {
    return pet.breed.toLowerCase().includes(searchData.petBreedSearch);
  });
};

const searchByVac = function (searchData) {
  if (!searchData.petVacSearch) {
    return searchByBreed(searchData);
  }
  return searchByBreed(searchData).filter(function (pet) {
    return pet.vaccinated === searchData.petVacSearch;
  });
};

const searchByDewomred = function (searchData) {
  if (!searchData.petDewormedSearch) {
    return searchByVac(searchData);
  }
  return searchByVac(searchData).filter(function (pet) {
    return pet.dewormed === searchData.petDewormedSearch;
  });
};

const searchBySterilized = function (searchData) {
  if (!searchData.petSterilizedSearch) {
    return searchByDewomred(searchData);
  }
  return searchByDewomred(searchData).filter(function (pet) {
    return pet.sterilized === searchData.petSterilizedSearch;
  });
};

const searchResult = searchBySterilized;

btnFind.addEventListener("click", function () {
  // Take search keywords from the form
  const searchData = getFormElements();
  const filteredPetArr = searchResult(searchData);

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
                            
							`;
      tableBodyEl.appendChild(row);
    }
  }

  renderTableData(filteredPetArr);
});
/* END */
