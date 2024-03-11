// INCLUDING LIBRARY IZITOAST

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

// ========================================== VARIABLES ==============================================

const form = document.querySelector('form');

// ==================================== ADDING FORM EVENT LISTENER ===================================

form.addEventListener('submit', generatePromises);

// =================================== GENERATING PROMISES FUNCTION ==================================

function generatePromises(event) {
  event.preventDefault();
  // getting values
  const delayValue = parseInt(event.currentTarget.elements.delay.value);
  const stateValue = event.currentTarget.elements.state.value;

  // making a promise
  setTimeout(() => {
    let promise;

    // deciding if the promise will be fulfilled or rejected
    if (stateValue === 'rejected') {
      promise = Promise.reject(delayValue);
    } else if (stateValue === 'fulfilled') {
      promise = Promise.resolve(delayValue);
    }

    // handling returned promise
    promise
      .then(value => {
        // SUCCESS MESSAGE IF THE PROMISE WAS FULFILLED
        iziToast.success({
          timeout: false,
          message: `Fulfilled promise in ${delayValue} ms`,
          messageColor: 'rgb(255, 255, 255)',
          messageSize: '16px',
          backgroundColor: 'rgb(89, 161, 13)',
          maxWidth: '384px',
          position: "topRight",
          progressBarColor: 'rgb(50, 97, 1)',
        });
      })
      // ERROR MESSAGE IF THE PROMISE WAS REJECTED
      .catch(error => {
        iziToast.error({
          message: `Rejected promise in ${delayValue}ms`,
          position: "topRight",
      });
      });
  }, delayValue);

  event.currentTarget.reset();
}
