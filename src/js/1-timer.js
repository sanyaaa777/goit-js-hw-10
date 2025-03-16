import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';


const dateTimePicker = document.querySelector('#datetime-picker');
const startButton = document.querySelector('#start-button');
startButton.disabled = true;
let userSelectedDate;
const dataDays = document.querySelector('[data-days]');
const dataHours = document.querySelector('[data-hours]');
const dataMinutes = document.querySelector('[data-minutes]');
const dataSeconds = document.querySelector('[data-seconds]');
let countdownInterval;


startButton.addEventListener('click', startCount);
function startCount() {
  startButton.disabled = true;
  dateTimePicker.disabled = true;

  countdownInterval = setInterval(() => {
    const timeLeft = userSelectedDate - Date.now();

    if (timeLeft <= 0) {
      clearInterval(countdownInterval);
      iziToast.success({ title: 'Done', message: 'Countdown finished!' });
      dateTimePicker.disabled = false;
      return;
    }

    const timeArray = convertMs(timeLeft);
    const { days, hours, minutes, seconds } = timeArray;

    dataDays.textContent = String(days).padStart(2, '0');
    dataHours.textContent = String(hours).padStart(2, '0');
    dataMinutes.textContent = String(minutes).padStart(2, '0');
    dataSeconds.textContent = String(seconds).padStart(2, '0');
  }, 1000);
}

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedDate = new Date(selectedDates[0]).getTime();
    if (selectedDate <= Date.now()) {
      iziToast.error({
        title: 'Error',
        message: 'Please choose a date in the future',
        position: 'topRight',
        messageColor: '#fff',
        backgroundColor: '#ef4040',
        iconColor: '#fff;',
        titleColor: '#fff',
        close: true,
        closeColor: '#fff',
        iconUrl: "./img/icon/bi_x-octagon.png"
      });
      startButton.disabled = true;
      return;
    } else {
      userSelectedDate = selectedDate;
      startButton.disabled = false;
    }
    clearInterval(countdownInterval);
  },
};

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

console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}

flatpickr('#datetime-picker', options);