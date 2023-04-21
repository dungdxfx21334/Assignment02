"use strict";

/*  Display every element in the petArr  */
function renderTableData(petArr) {
  const tableBodyEl = document.getElementById("tbody");
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

    tableBodyEl.appendChild(row);
  }
}

const petArr = JSON.parse(getFromStorage("petArr"));
renderTableData(petArr);

/* END Display every element in the petArr  */

/* Edit function */
const getFormElements = function () {
  const inputId = document.getElementById("input-id");
  const inputName = document.getElementById("input-name");
  const inputAge = document.getElementById("input-age");
  const inputType = document.getElementById("input-type");
  const inputWeight = document.getElementById("input-weight");
  const inputLength = document.getElementById("input-length");
  const inputColor1 = document.getElementById("input-color-1");
  const inputBreed = document.getElementById("input-breed");
  const inputVac = document.getElementById("input-vaccinated");
  const inputDewormed = document.getElementById("input-dewormed");
  const inputSterilized = document.getElementById("input-sterilized");
  const data = {
    inputId: inputId,
    inputName: inputName,

    inputAge: inputAge,
    inputType: inputType,
    inputWeight: inputWeight,
    inputLength: inputLength,
    inputColor1: inputColor1,
    inputBreed: inputBreed,
    inputVac: inputVac,
    inputDewormed: inputDewormed,
    inputSterilized: inputSterilized,
  };
  return data;
};

const editPet = function (petId) {
  const formContainer = document.getElementById("container-form");
  console.log(formContainer);
  formContainer.classList.remove("hide");

  const selectedPetIndex = petArr.findIndex(function (pet) {
    return pet.id === petId;
  });

  const oldData = getFormElements();
  console.log(petArr[selectedPetIndex]);

  oldData.inputId.value = petId;

  oldData.inputName.value = petArr[selectedPetIndex].dataName;
  oldData.inputAge.value = petArr[selectedPetIndex].age;
  oldData.inputType.value = petArr[selectedPetIndex].type;
  oldData.inputWeight.value = Number(petArr[selectedPetIndex].weight);
  oldData.inputLength.value = Number(petArr[selectedPetIndex].length);
  oldData.inputColor1.value = petArr[selectedPetIndex].color;
  /* This onChangeType is originally called when there is a change on the type select field to display
     corresponding breeds. But it can be applied here when the page is loaded .*/
  onChangeType();

  /* Make the old breed of the pet the selected option in the breed select field */
  const breedOptions = [...oldData.inputBreed.children];
  const selectedBreedIndex = breedOptions.findIndex(function (child) {
    console.log(child.value, petArr[selectedPetIndex].breed);
    return child.value === petArr[selectedPetIndex].breed;
  });
  breedOptions[selectedBreedIndex].setAttribute("selected", "selected");
  renderBreed(breedArr);
  /* END Make the old breed of the pet the selected option in the breed select field */

  oldData.inputVac.checked = petArr[selectedPetIndex].vaccinated;
  oldData.inputDewormed.checked = petArr[selectedPetIndex].dewormed;
  oldData.inputSterilized.checked = petArr[selectedPetIndex].sterilized;
};

/* END Edit function */

/* Delegate the Edit event listener to the tbody */
const tbodyEl = document.getElementById("tbody");
tbodyEl.addEventListener("click", function (e) {
  const clicked = e.target;
  if (clicked.classList.contains("btn-edit")) {
    const petId = clicked.dataset.petid;
    editPet(petId);
  }
});
/* END Delegate the Edit event listener to the tbody */

/* Register new informations when users submit */
const btnSubmit = document.getElementById("submit-btn");
btnSubmit.addEventListener("click", function () {
  /* Validate information */
  const validateData = function (newData) {
    // Name
    if (newData.inputName.value === "") {
      alert("Please enter name");
      return false;
    }
    // Age

    if (newData.inputAge.value < 1 || newData.inputAge.value > 15) {
      alert("Age must be between 1 and 15");
      return false;
    }

    // Weight
    if (newData.inputWeight.value < 1 || newData.inputWeight.value > 15) {
      alert("Weight must be between 1 and 15");
      return false;
    }

    // Length

    if (newData.inputLength.value < 1 || newData.inputLength.value > 100) {
      alert("Length must be between 1 and 100");
      return false;
    }

    // Type
    if (newData.inputType.value === "Select Type") {
      alert("Please select type");
      return false;
    }

    // Breed
    if (newData.inputBreed.value === "Select Breed") {
      alert("Please select breed");
      return false;
    }
    return true;
  };
  /* END Validate information */

  const newData = getFormElements(); // Get new information from user.

  if (validateData(newData)) {
    const selectedPetIndex = petArr.findIndex(function (pet) {
      return pet.id === newData.inputId.value;
    });
    /*  I can't use splice to delete the old pet at selectedPetIndex and then add the newData 
    because the newData has a different format. So I have to do this manually like this. */
    petArr[selectedPetIndex].dataName = newData.inputName.value;
    petArr[selectedPetIndex].age = newData.inputAge.value;
    petArr[selectedPetIndex].type = newData.inputType.value;
    petArr[selectedPetIndex].weight = newData.inputWeight.value;
    petArr[selectedPetIndex].length = newData.inputLength.value;
    petArr[selectedPetIndex].color = newData.inputColor1.value;
    petArr[selectedPetIndex].breed = newData.inputBreed.value;
    petArr[selectedPetIndex].vaccinated = newData.inputVac.checked;
    petArr[selectedPetIndex].dewormed = newData.inputDewormed.checked;
    petArr[selectedPetIndex].sterilized = newData.inputSterilized.checked;
    petArr[selectedPetIndex].date = new Date();
    petArr[selectedPetIndex].bmi = "?";
  }

  saveToStorage("petArr", JSON.stringify(petArr));
  renderTableData(petArr);
  // Clear input;
  newData.inputId.value = "";
  newData.inputName.value = "";
  newData.inputAge.value = "";
  newData.inputType.value = "";
  newData.inputWeight.value = "";
  newData.inputLength.value = "";
  newData.inputColor1.value = "";
  newData.inputBreed.value = "";
  newData.inputVac.checked = "";
  newData.inputDewormed.checked = "";
  newData.inputSterilized.checked = "";

  // Hide form
  const formContainer = document.getElementById("container-form");
  formContainer.classList.add("hide");
});
/* END Register new informations when users submit */
