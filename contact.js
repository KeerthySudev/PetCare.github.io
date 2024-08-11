document.addEventListener('DOMContentLoaded', function () {
  // Select the form and its inputs and validation message elements
  const form = document.getElementById('contactForm');
  const inputs = form.querySelectorAll('.input');
  const validationMessages = form.querySelectorAll('.validation');

  // Regular expression patterns for each field
  const patterns = {
    name: /^[a-zA-Z\s]+$/,  
    email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, 
    subject: /.+/, 
    message: /.+/ 
  };

  // Event listener for each input field on losing focus 
  inputs.forEach((input, index) => {
    input.addEventListener('focusout', function () {
      const fieldType = input.id;
      // Validate input value against the pattern
      if (!patterns[fieldType].test(input.value)) {
        validationMessages[index].innerText = getValidationMessage(fieldType);
      } else {
        validationMessages[index].innerText = '';
      }
    });
  });

  // Form submission event listener
  form.addEventListener('submit', function (event) {
    let valid = true;

    // Validate each input field
    inputs.forEach((input, index) => {
      const fieldType = input.id;
      if (!patterns[fieldType].test(input.value)) {
        validationMessages[index].innerText = getValidationMessage(fieldType);
        valid = false;
      } else {
        validationMessages[index].innerText = '';
      }
    });

    // Prevent form submission if any input is invalid
    if (!valid) {
      event.preventDefault();
    } else {
      event.preventDefault(); 
      showSuccessMessage();   
    }
  });

  // Function to return appropriate validation message based on field type
  function getValidationMessage(type) {
    switch (type) {
      case 'name':
        return 'Please enter a valid name (letters and spaces only).';
      case 'email':
        return 'Please enter a valid email address.';
      case 'subject':
        return 'Please enter a subject.';
      case 'message':
        return 'Please enter a message.';
      default:
        return 'This field is required.';
    }
  }

  // Function to show a success message when the form is submitted successfully
  function showSuccessMessage() {
    const successMessage = document.createElement('div');
    successMessage.className = 'success-message';
    successMessage.innerText = 'Your message has been sent! We will reach out to you soon';
    form.insertAdjacentElement('beforebegin', successMessage);

    // Remove the success message after 3 seconds and reset the form
    setTimeout(() => {
      successMessage.remove();
      form.reset();
    }, 3000);
  }
});
