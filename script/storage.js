"use strict";

/*  If a new item is added to the list, just need to creata a new HTML 
element and display that element instead of re-renderring the whole table */

const btnSubmit = document.getElementById("submit-btn"); // submit btn

/* Read and write to storage */
const saveToStorage = function (key, value) {
  localStorage.setItem(key, value);
};

const getFromStorage = function (key, defaultValue) {
  return localStorage.getItem(key) ?? defaultValue;
};
/* END read and write to storage */

/* Add new row to the table */
const tableBodyEl = document.getElementById("tbody");
const addNewRow = function (data) {
  const row = document.createElement("tr");
  row.setAttribute("id", `pet--${data.id}`); // Add id to this row so I can delete them easier later
  row.innerHTML = `<th scope="row">${data.id}</th>
							<td>${data.dataName}</td>
							<td>${data.age}</td>
							<td>${data.type}</td>
							<td>${data.weight} kg</td>
							<td>${data.length} cm</td>
							<td>${data.breed}</td>
							<td>
								<i class="bi bi-square-fill" style="color: ${data.color}"></i>
							</td>
							<td>${
                data.vaccinated
                  ? '<i class="bi bi-check-circle-fill"></i>'
                  : '<i class="bi bi-x-circle-fill"></i>'
              }</td>
							<td>${
                data.dewormed
                  ? '<i class="bi bi-check-circle-fill"></i>'
                  : '<i class="bi bi-x-circle-fill"></i>'
              }</td>
							<td>${
                data.sterilized
                  ? '<i class="bi bi-check-circle-fill"></i>'
                  : '<i class="bi bi-x-circle-fill"></i>'
              }</td>
							<td>${data.date.toISOString().split("T")[0]}</td>
                            <td class="bmi-id--${data.id}">${data.bmi}</td>
							<td><button type="button" class="btn btn-danger btn-delete" data-petId="${
                data.id
              }">Delete</button> 

							</td>`;
  //   This button should contain only one class with the first 4 letters of "id--" because this class is used to store the id of the pet.
  // If another class with the first 4 letter of "id--" appear, there is a good chance the program will delete the wrong row because it takes the wrong id.
  tableBodyEl.appendChild(row);
};
/* END add new row to the table */

/* Add the delete function for the delete button by delegating the event to the tbody */
// Delete a row by its id
const deleteRow = function (id) {
  const selectedRow = document.getElementById(`pet--${id}`);
  selectedRow.remove();
  // clear it from local storage
  localStorage.removeItem(id);
};
tableBodyEl.addEventListener("click", function (e) {
  console.log(e);
  const clickedItem = e.target;

  if (clickedItem.classList.contains("btn-delete")) {
    deleteRow(clickedItem.dataset.petid);
  }
});
/* END Add the delete function for the delete button by delegating the event to the tbody */
btnSubmit.addEventListener("click", function () {
  const petID = document.getElementById("input-id");
  const petName = document.getElementById("input-name");
  const petAge = document.getElementById("input-age");
  const petType = document.getElementById("input-type");
  const petWeight = document.getElementById("input-weight");
  const petLength = document.getElementById("input-length");
  const petColor = document.getElementById("input-color-1");
  const petBreed = document.getElementById("input-breed");
  const isVaccinated = document.getElementById("input-vaccinated");
  const isDewormed = document.getElementById("input-dewormed");
  const isSterilized = document.getElementById("input-sterilized");
  const data = {
    id: petID.value,
    dataName: petName.value,
    age: parseInt(petAge.value),
    type: petType.value,
    weight: petWeight.value,
    length: petLength.value,
    color: petColor.value,
    breed: petBreed.value,
    vaccinated: isVaccinated.checked,
    dewormed: isDewormed.checked,
    sterilized: isSterilized.checked,
    date: new Date(),
    bmi: "?",
  };

  // Add pet to the list
  //   const validate = validateData(data);
  const validate = 1;
  if (validate) {
    // data.push(data);
    clearInput();
    addNewRow(data);
    saveToStorage(data.id, JSON.stringify(data));
    // renderTableData(data);
    // Make the show healthy pet button display "Show healthy pet" text every time user add a new pet,
    // a list of every pet should be displayed instead of only healthy pet even though the user was seeing all healthy pet when they submit a new pet.
    // btnShowHealthyPetText("Show Healthy Pet");
    // healthyCheck = false;
    console.log(localStorage);
  }
  // Clear input
  function clearInput() {
    petID.value = "";
    petName.value = "";
    petAge.value = "";
    petType.value = "Select Type";
    petWeight.value = "";
    petLength.value = "";
    petColor.value = "#000000";
    petBreed.value = "Select Breed";
    isDewormed.checked = false;
    isVaccinated.checked = false;
    isSterilized.checked = false;
  }

  // Validate information

  const validateData = function (data) {
    // ID
    if (!data.id) {
      alert("ID cannot be left empty");

      return false;
    }
    for (let i = 0, idArrLen = idArr.length; i < idArrLen; i++) {
      if (idArr[i] === data.id) {
        alert("ID cannot be duplicated");
        return false;
      }
    }
    // Age

    if (data.age < 1 || data.age > 15) {
      alert("Age must be between 1 and 15");
      return false;
    }

    // Weight
    if (data.weight < 1 || data.weight > 15) {
      alert("Weight must be between 1 and 15");
      return false;
    }

    // Length

    if (data.length < 1 || data.length > 100) {
      alert("Length must be between 1 and 100");
      return false;
    }

    // Type
    if (data.type === "Select Type") {
      alert("Please select type");
      return false;
    }

    // Breed
    if (data.breed === "Select Breed") {
      alert("Please select breed");
      return false;
    }
    idArr.push(data.id);
    return true;
  };
  //   addDelete();
});
