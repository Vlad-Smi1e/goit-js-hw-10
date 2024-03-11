// INCLUDING LIBRARY FLATPICKER

import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

// INCLUDING LIBRARY IZITOAST

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

// =========================================== VARIABLES ===================================================

// BUTTON
const btn = document.querySelector('[data-start]');
btn.disabled = true;

// TIMER INTERFACE DAYS, HOURS ETC ELEMENTS
const daysField = document.querySelector('[data-days]');
const hoursField = document.querySelector('[data-hours]');
const minutesField = document.querySelector('[data-minutes]');
const secondsField = document.querySelector('[data-seconds]');

// USER SELECTED DATE
let userSelectedDate;

// ======================================= FLATPICKER OPTIONS ===============================================
const options = {
  enableTime: true,
  dateFormat: "Y-m-d H:i",
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  clickOpens: true,
  onClose(selectedDates) {
    if (selectedDates[0] < new Date()) {
      iziToast.error({
        timeout: false,
        message: 'Please choose a date in the future',
        messageSize: '16px',
        maxWidth: "300px",
        position: 'topRight',
      });
    } else {
      btn.disabled = false;
      userSelectedDate = selectedDates[0];
      btn.addEventListener('click', backwardsTimer);
    }
  },
};

// =============================================== CREATING TIME PICKER ========================================
const myTimePicker = flatpickr('#datetime-picker', options);
console.log(myTimePicker);

// ================================================ HANDLE COUNTDOWN ===========================================

function backwardsTimer() {
  btn.disabled = true;
  myTimePicker.set('clickOpens', false);

  let intervalId;

  intervalId = setInterval(() => {
    let milisecTimeDif = userSelectedDate - new Date();

    if (milisecTimeDif <= 0) {
      clearInterval(intervalId);
    } else {
      const timeObj = convertMs(milisecTimeDif);
      let seconds = timeObj.seconds;
      let minutes = timeObj.minutes;
      let hours = timeObj.hours;
      let days = timeObj.days;

      secondsField.textContent = addLeadingZero(String(seconds));
      minutesField.textContent = addLeadingZero(String(minutes));
      hoursField.textContent = addLeadingZero(String(hours));
      daysField.textContent = addLeadingZero(String(days));
    }
  }, 1000);
}

// ============================================== CONVERT MS FUNCTION =========================================

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;
  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);
  return { days, hours, minutes, seconds };
}

// ================================================ ADD LEADING ZERO ==========================================

function addLeadingZero(value) {
  return value.padStart(2, '0');
}
