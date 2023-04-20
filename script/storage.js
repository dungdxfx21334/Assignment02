"use strict";

const saveToStorage = function (key, value) {
  localStorage.setItem(key, value);
};

const getFromStorage = function (key, defaultValue = JSON.stringify([])) {
  return localStorage.getItem(key) ?? defaultValue;
};
