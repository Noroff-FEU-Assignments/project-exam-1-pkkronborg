const form = document.querySelector("#form");
const email = document.querySelector("#email");
const emailError = document.querySelector("#emailError");
const fullName = document.querySelector("#fullName");
const fullNameError = document.querySelector("#fullNameError");
const subject = document.querySelector("#subject");
const subjectError = document.querySelector("#subjectError");
const contactMessage = document.querySelector("#contactMessage");
const contactMessageError = document.querySelector("#contactMessageError");
const successMessage = document.querySelector("#successMessage");
const regEx = /\S+@\S+\.\S+/;
console.log(fullName);
console.log(subjectError);

function validateForm(event) {
  event.preventDefault();
  if (fullName.value.trim().length > 5) {
    fullNameError.style.visibility = "hidden";
  } else {
    fullNameError.style.visibility = "visible";
  }
  if (regEx.test(email.value)) {
    emailError.style.visibility = "hidden";
  } else {
    emailError.style.visibility = "visible";
  }
  if (subject.value.trim().length > 15) {
    subjectError.style.visibility = "hidden";
  } else {
    subjectError.style.visibility = "visible";
  }
  if (contactMessage.value.trim().length > 25) {
    contactMessageError.style.visibility = "hidden";
  } else {
    contactMessageError.style.visibility = "visible";
  }
  if (
    fullName.value.trim().length > 5 &&
    regEx.test(email.value) &&
    subject.value.trim().length > 15 &&
    contactMessage.value.trim().length > 25
  ) {
    successMessage.style.visibility = "visible";
    fullName.value = "";
    email.value = "";
    subject.value = "";
    contactMessage.value = "";
  } else {
    successMessage.style.visibility = "hidden";
  }
}

form.addEventListener("submit", validateForm);
