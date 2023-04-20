"use strict";

/* This function is needed in 3 seperated files so I moved it to a new file
  and import it to the needing files instead of having the same code in those 3 files. */

/* Add breed to the main page */
const breedArr = JSON.parse(getFromStorage("breedArr"));
const inputBreed = document.getElementById("input-breed");
const inputType = document.getElementById("input-type");
console.log("This line is printed");
console.log(inputType.value);

const displayBreed = function (breedArr) {
  const inputBreed = document.getElementById("input-breed");
  breedArr.forEach(function (breed) {
    const option = document.createElement("option");
    option.innerHTML = breed.breedName;
    inputBreed.appendChild(option);
    console.log(option);
  });
};

const filterCretiria = function (breed) {
  console.log(breed.animalType);
  return breed.animalType === inputType.value;
};

const onChangeType = function () {
  console.log(breedArr);
  inputBreed.innerHTML = "<option>Select Breed</option>";
  const filteredBreedArr = breedArr.filter(function (breed) {
    return filterCretiria(breed);
  });
  console.log(filteredBreedArr);
  displayBreed(filteredBreedArr);
};

const renderBreed = function (breedArr, filtered = "true") {
  // if the filtered value is false. All the breeds are displayed
  // if the filtered value is cat, only cat breeds will be displayed, same for dog
  // if the filtered value is "true" which is default value. The type will be retrieve from the form.
  let filteredAnimal = "";
  switch (filtered) {
    case "cat":
      filteredAnimal = "Cat";
      break;
    case "dog":
      filteredAnimal = "Dog";
      break;
    default:
      filteredAnimal = inputType.value;
      break;
  }
  console.log(filteredAnimal);
  if (filtered) {
    inputType.onchange = onChangeType;
  } else {
    displayBreed(breedArr);
  }
};

/* END Add breed to the main page */
