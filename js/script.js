// ELEMEMTS
const inputFields = document.querySelectorAll("input");
const dateOfDeathInput = document.querySelector("#date-of-death");
const marriageDateInput = document.querySelector("#marriage-date");
const form = document.querySelector("form");
const submitButton = document.querySelector(".submit-button");
const initialsInput = document.querySelector("#initials");
const fieldsets = document.querySelectorAll("fieldset");
const balanceInheritanceFields = document.querySelectorAll(
  ".balance-inheritance input"
);
const totalValues = document.querySelectorAll(".balance-inheritance p");
const partnerContainer = document.querySelector(".partner-container");
const isNotMarriedField = document.querySelector("#n-married");
const isMarriedField = document.querySelector("#y-married");
const marriedFields = [isNotMarriedField, isMarriedField];
const marriageContractFieldYes = document.querySelector("#y-marriage-contract");
const marriageContractFieldNo = document.querySelector("#n-marriage-contract");
const marriageContractFields = [
  marriageContractFieldYes,
  marriageContractFieldNo,
];
const marriageContractFileLabel = document.querySelector(
  ".marriage-contract-file-label"
);

// BALANCE INHERITANCE Input Fields

// VALUE input fields
const generalInboedelField = document.querySelector("input[name='g-inboedel']");
const privateInboedelField = document.querySelector("input[name='p-inboedel']");
const generalVervoersmiddelField = document.querySelector(
  "input[name='g-vervoersmiddel']"
);
const privateVervoersmiddelField = document.querySelector(
  "input[name='p-vervoersmiddel']"
);

const generalKunstField = document.querySelector("input[name='g-kunst']");
const privateKunstField = document.querySelector("input[name='p-kunst']");
const generalOverigField = document.querySelector("input[name='g-overig']");
const privateOverigField = document.querySelector("input[name='p-overig']");

// DEBT Input Fields

const generalMortgageField = document.querySelector("input[name='g-mortgage']");
const privateMortgageField = document.querySelector("input[name='p-mortgage']");
const generalGiftField = document.querySelector("input[name='g-gift']");
const privateGiftField = document.querySelector("input[name='p-gift']");

// FUNEREAL EXPENSES Input Fields

const ceremonyField = document.querySelector("input[name='ceremony']");
const cateringField = document.querySelector("input[name='catering']");

// AUTHORIZED PERSONS Input Fields

const authorizedPersonsField = document.querySelector(
  "input[name='authorized-persons']"
);

// TOTAL VALUES

const totalBalanceInheritance = document.querySelector(
  "p[data-total-balance-inheritance]"
);
const totalPersonalBalanceInheritance = document.querySelector(
  "p[data-total-personal-balance-inheritance]"
);

// VARS
const date = new Date();

// SET TOTAL VALUES TO VISIBLE IF JS IS ENABLED

totalValues.forEach((value) => {
  value.removeAttribute("hidden");
});

// OPEN AND CLOSING OF THE PARTNER CONTAINER

marriedFields.forEach((field) => {
  field.addEventListener("change", () => {
    if (!isMarriedField.checked) {
      partnerContainer.style.maxHeight = "0";
    } else {
      partnerContainer.style.maxHeight = partnerContainer.scrollHeight + "px";
    }
  });
});

// OPEN AND CLOSING OF THE MARRIAGE CONTRACT FILE INPUT

marriageContractFields.forEach((field) => {
  field.addEventListener("change", () => {
    if (!marriageContractFieldYes.checked) {
      marriageContractFileLabel.style.maxHeight = "0";
    } else {
      marriageContractFileLabel.style.maxHeight = "50vh";
    }
  });
});

// SETTING MAX DATE OF DEATH INPUT TO CURRENT DATE

dateOfDeathInput.setAttribute("max", date.toISOString().split("T")[0]);

// SETTING MAX DATE OF MARRIAGE DATE INPUT TO DATE OF DEATH INPUT

dateOfDeathInput.addEventListener("input", () => {
  marriageDateInput.setAttribute(
    "max",
    dateOfDeathInput.value
      ? dateOfDeathInput.value
      : date.toISOString().split("T")[0]
  );
});

document.addEventListener("DOMContentLoaded", () => {
  marriageDateInput.setAttribute(
    "max",
    localStorage.getItem(dateOfDeathInput.id)
      ? localStorage.getItem(dateOfDeathInput.id)
      : date.toISOString().split("T")[0]
  );

  if (!isMarriedField.checked) {
    partnerContainer.style.maxHeight = "0";
  } else {
    partnerContainer.style.maxHeight = partnerContainer.scrollHeight + "px";
  }

  if (!marriageContractFieldYes.checked) {
    marriageContractFileLabel.style.maxHeight = "0";
  } else {
    marriageContractFileLabel.style.maxHeight = "50vh";
  }
});

// SETTING FIELDS TO LOCALSTORAGE

inputFields.forEach((inputField) => {
  if (inputField.type === "file") {
    if (inputField.type !== "file" && localStorage.getItem(inputField.id)) {
      inputField.value = localStorage.getItem(inputField.id);
    }

    inputField.addEventListener("change", () => {
      localStorage.setItem(inputField.id, inputField.files[0].name);
    });

    return;
  }

  if (localStorage.getItem(inputField.id)) {
    inputField.value = localStorage.getItem(inputField.id);
  }

  inputField.addEventListener("input", () => {
    localStorage.setItem(inputField.id, inputField.value);
  });

  if (inputField.type === "radio" || inputField.type === "checkbox") {
    if (localStorage.getItem(inputField.id)) {
      inputField.checked = localStorage.getItem(inputField.id) === "true";
    }

    inputField.addEventListener("change", () => {
      localStorage.setItem(inputField.id, inputField.checked);

      if (inputField.type === "radio" && inputField.checked) {
        const name = inputField.name;
        inputFields.forEach((field) => {
          if (field.name === name && field !== inputField) {
            field.checked = false;
            localStorage.setItem(field.id, false);
          }
        });
      }
    });
  }
});

// PREVENT DEFAULT ACTION ON SUBMIT AND LOG DATA

form.addEventListener("submit", (e) => {
  e.preventDefault();
  let formData = new FormData(form);
  let data = Object.fromEntries(formData.entries());
  console.log(data);
});

// PLACE A . AFTER EVERY LETTER IN THE INITIALS INPUT

initialsInput.addEventListener("keyup", (e) => {
  if (e.key === "Backspace" || e.key === "." || !/^[a-zA-Z]$/.test(e.key)) {
    return;
  }
  initialsInput.value = initialsInput.value + ".";
});

// BALANCE INHERITANCE CALCULATION

// FUNCTIONS TO CALCULATE SUBTOTAL

function totalValueCalculation() {
  const value =
    (Number(generalInboedelField.value) +
      Number(generalVervoersmiddelField.value) +
      Number(generalKunstField.value) +
      Number(generalOverigField.value)) /
      4 +
    Number(privateInboedelField.value) +
    Number(privateVervoersmiddelField.value) +
    Number(privateKunstField.value) +
    Number(privateOverigField.value);

  return value;
}

function totalDebtCalculation() {
  const debt =
    (Number(generalMortgageField.value) + Number(generalGiftField.value)) / 2 +
    Number(privateMortgageField.value) +
    Number(privateGiftField.value);

  return debt;
}

function totalFuneralExpensesCalculation() {
  const funeralExpenses =
    Number(ceremonyField.value) + Number(cateringField.value);

  return funeralExpenses;
}

function totalBalanceInheritanceCalculation() {
  const balanceInheritance =
    totalValueCalculation() -
    totalDebtCalculation() -
    totalFuneralExpensesCalculation();

  return balanceInheritance;
}

function totalPersonalBalanceInheritanceCalculation() {
  let authorized = 1;
  if (authorizedPersonsField.value > 1) {
    authorized = authorizedPersonsField.value;
  }

  const total = totalBalanceInheritanceCalculation() / authorized;

  return total;
}

// TOTAL CALCULATION

function calculateTotal() {
  totalBalanceInheritance.innerHTML = `<strong>Totaal:</strong> €${totalBalanceInheritanceCalculation().toFixed(
    2
  )}`;

  totalPersonalBalanceInheritance.innerHTML = `<strong>Per Persoon:</strong> €${totalPersonalBalanceInheritanceCalculation().toFixed(
    2
  )}`;
}

balanceInheritanceFields.forEach((field) => {
  document.addEventListener("DOMContentLoaded", () => {
    calculateTotal();
  });

  field.addEventListener("input", () => {
    calculateTotal();
  });
});
