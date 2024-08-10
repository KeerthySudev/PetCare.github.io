   
document.addEventListener('DOMContentLoaded', function () {
const form = document.getElementById('bookingForm');
const inputs = form.querySelectorAll('.input');
const validationMessages = form.querySelectorAll('.validation');

const patterns = {
name: /^[a-zA-Z\s]+$/,  // Only letters and spaces
email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,  // Basic email pattern
bookingDate: /.+/,  // Non-empty
// bookingTime: /.+/, // Non-empty
service: /.+/  // Non-empty
};
let today = new Date();

    // Format the date to 'YYYY-MM-DD'
    let formattedDate = today.toISOString().split('T')[0];

    // Set the min attribute to today's date
    document.getElementById('bookingDate').setAttribute('min', formattedDate);

inputs.forEach((input, index) => {
input.addEventListener('focusout', function () {
  const fieldType = input.id;
  if (!patterns[fieldType].test(input.value)) {
    validationMessages[index].innerText = getValidationMessage(fieldType);
  } else {
    validationMessages[index].innerText = '';
  }
});
});

form.addEventListener('submit', function (event) {
let valid = true;

inputs.forEach((input, index) => {
  const fieldType = input.id;
  if (!patterns[fieldType].test(input.value)) {
    validationMessages[index].innerText = getValidationMessage(fieldType);
    valid = false;
  } else {
    validationMessages[index].innerText = '';
  }
});

if (!valid) {
  event.preventDefault();
} else {
  event.preventDefault();
  showSuccessMessage();
}
});

function getValidationMessage(type) {
switch (type) {
  case 'name':
    return 'Please enter a valid name (letters and spaces only).';
  case 'email':
    return 'Please enter a valid email address.';
//   case 'bookingTime':
//     return 'Please select a time.';
  case 'bookingDate':
    return 'Please select a date.';
  case 'service':
    return 'Please select a service.';
  default:
    return 'This field is required.';
}
}


function showSuccessMessage() {
const successMessage = document.createElement('div');
successMessage.className = 'success-message';
successMessage.innerText = 'Your message has been sent successfully!';
form.insertAdjacentElement('beforebegin', successMessage);

setTimeout(() => {
  successMessage.remove();
  form.reset();
}, 3000);
}
});
