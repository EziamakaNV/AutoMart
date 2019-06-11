"use strict";

const menuBarAnimation = menu => {
  menu.classList.toggle('change');
  document.getElementById("myDropDown").classList.toggle("show");
};