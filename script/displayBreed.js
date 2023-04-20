"use strict";

/* This function is needed in 3 seperated files so I moved it to a new file
  and import it to the needing files instead of having the same code in those 3 files. */

/* Add breed to the main page */
const breedArr = JSON.parse(getFromStorage("breedArr"));

const displayBreed = function (breedArr) {
  const inputBreed = document.getElementById("input-breed");
  breedArr.forEach(function (breed) {
    const option = document.createElement("option");
    option.innerHTML = breed.breedName;
    inputBreed.appendChild(option);
    console.log(option);
  });
};

const renderBreed = function (breedArr, filtered = true) {
  const inputBreed = document.getElementById("input-breed");
  console.log(filtered);
  if (filtered) {
    const inputType = document.getElementById("input-type");
    inputType.onchange = function () {
      console.log(breedArr);
      inputBreed.innerHTML = "<option>Select Breed</option>";
      const filteredBreedArr = breedArr.filter(function (breed) {
        return breed.animalType === inputType.value;
      });
      displayBreed(filteredBreedArr);
    };
  } else {
    displayBreed(breedArr);
  }
};

/* END Add breed to the main page */
