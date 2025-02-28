const inputFields = document.querySelectorAll("input");
const form = document.querySelector("form");

inputFields.forEach((inputField) => {
  if (localStorage.getItem(inputField.id)) {
    inputField.value = localStorage.getItem(inputField.id);
  }
  inputField.addEventListener("input", () => {
    localStorage.setItem(inputField.id, inputField.value);
  });
});

// TODO: check safari private mode

// form.addEventListener("submit", (e) => {
//   e.preventDefault();
//   localStorage.clear();
//   inputFields.forEach((inputField) => {
//     inputField.value = "";
//   });
// });
