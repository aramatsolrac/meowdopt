// function to add validation

function formValidation(component) {
  if (component.value.trim()) {
    component.classList.remove("required");
  } else {
    component.classList.add("required");
  }
}
export default formValidation;
