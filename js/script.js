// ELEMEMTS
const inputFields = document.querySelectorAll("input");
const dateOfDeathInput = document.querySelector("#date-of-death");
const form = document.querySelector("form");
const submitButton = document.querySelector(".submit-button");
const initialsInput = document.querySelector("#initials");

// VARS
const date = new Date();

inputFields.forEach((inputField) => {
  if (localStorage.getItem(inputField.id)) {
    inputField.value = localStorage.getItem(inputField.id);
  }
  inputField.addEventListener("input", () => {
    localStorage.setItem(inputField.id, inputField.value);
  });
});

dateOfDeathInput.setAttribute("max", date.toISOString().split("T")[0]);

form.addEventListener("submit", (e) => {
  e.preventDefault();
});

initialsInput.addEventListener("keyup", (e) => {
  if (e.key === "Backspace" || e.key === "." || !/^[a-zA-Z]$/.test(e.key)) {
    return;
  }
  initialsInput.value = initialsInput.value + ".";
});

// Check if someone added the dot
// Remove the dot if a character is deleted
// Check how many keypresses for deleting a character
