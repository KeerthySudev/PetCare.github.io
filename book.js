
document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('bookingForm');
  const inputs = form.querySelectorAll('.input');
  const validationMessages = form.querySelectorAll('.validation');

  // Regular expression patterns for validation
  const patterns = {
      name: /^[a-zA-Z\s]+$/, 
      email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, 
      bookingDate: /.+/,
      service: /.+/  
  };

  // Get today's date
  let today = new Date();
  let formattedDate = today.toISOString().split('T')[0];

  // Set the minimum date attribute to today's date for the booking date input
  document.getElementById('bookingDate').setAttribute('min', formattedDate);

  // Add event listeners for each input to validate on focus out
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

  // Form submission event listener
  form.addEventListener('submit', function (event) {
      let valid = true;

      // Validate each input field before submitting the form
      inputs.forEach((input, index) => {
          const fieldType = input.id;
          if (!patterns[fieldType].test(input.value)) {
              validationMessages[index].innerText = getValidationMessage(fieldType);
              valid = false;
          } else {
              validationMessages[index].innerText = '';
          }
      });

      // Prevent form submission if validation fails
      if (!valid) {
          event.preventDefault();
      } else {
          // If validation is successful, show a success message
          event.preventDefault();
          showSuccessMessage();
      }
  });

  // Function to return validation messages based on the field type
  function getValidationMessage(type) {
      switch (type) {
          case 'name':
              return 'Please enter a valid name (letters and spaces only).';
          case 'email':
              return 'Please enter a valid email address.';
          case 'bookingDate':
              return 'Please select a date.';
          case 'service':
              return 'Please select a service.';
          default:
              return 'This field is required.';
      }
  }

  // Function to display a success message and reset the form
  function showSuccessMessage() {
      const successMessage = document.createElement('div');
      successMessage.className = 'success-message';
      successMessage.innerText = 'Your booking request has been received! Check your mailbox for more details.';
      form.insertAdjacentElement('beforebegin', successMessage);

      // Remove the success message after 3 seconds and reset the form
      setTimeout(() => {
          successMessage.remove();
          form.reset();
      }, 3000);
  }
});
