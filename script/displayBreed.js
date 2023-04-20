"use strict";

/* This function is needed in the two seperated files so I moved it to a new file
  and import them to the needed file instead of having the same code in those two files. */

/* Add breed to the main page */
const breedArr = JSON.parse(getFromStorage("breedArr"));

const renderBreed = function (breedArr) {
  const inputBreed = document.getElementById("input-breed");
  console.log(inputBreed);
  breedArr.forEach(function (breed) {
    const option = document.createElement("option");
    option.innerHTML = breed.breedName;
    inputBreed.appendChild(option);
    console.log(option);
  });
};

const inputType = document.getElementById("input-type");
inputType.onchange = function () {
  console.log(breedArr);
  const inputBreed = document.getElementById("input-breed");
  inputBreed.innerHTML = "<option>Select Breed</option>";
  const filteredBreedArr = breedArr.filter(function (breed) {
    return breed.animalType === inputType.value;
  });
  renderBreed(filteredBreedArr);
};

/* END Add breed to the main page */
