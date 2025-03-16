import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import iconDagger from '../img/icon/Group.png';
import iconOk from '../img/icon/circle Ok.png';
import iconCaution from '../img/icon/triangle Caution.png';
import iconBell from '../img/icon/bell welcome.png';

const form = document.querySelector('.form');
form.setAttribute('novalidate', '');

const successMessage = {
  title: 'OK',
  position: 'topRight',
  messageColor: '#fff',
  backgroundColor: '#59a10d',
  iconColor: '#fff',
  close: true,
  titleColor: '#fff',
  closeColor: '#fff',
  iconUrl: iconOk,
};

const errorMessage = {
  title: 'Error',
  position: 'topRight',
  messageColor: '#fff',
  backgroundColor: '#ef4040',
  iconColor: '#fff',
  close: true,
  titleColor: '#fff',
  closeColor: '#fff',
  iconUrl: iconDagger,
};

const cautionMessage = {
  title: 'Caution',
  position: 'topRight',
  message: 'You forgot important data',
  messageColor: '#fff',
  backgroundColor: '#ffa000',
  iconColor: '#fff',
  close: true,
  titleColor: '#fff',
  closeColor: '#fff',
  iconUrl: iconCaution,
};

const informingMessage = {
  title: 'Hello',
  message: 'Welcome!',
  position: 'topRight',
  messageColor: '#fff',
  backgroundColor: '#09f',
  iconColor: '#fff',
  close: true,
  titleColor: '#fff',
  closeColor: '#fff',
  iconUrl: iconBell,
};

iziToast.show(informingMessage);

form.addEventListener('submit', function promiseFunction(event) {
  event.preventDefault();

  const delayInput = document.querySelector('input[name="delay"]');
  const getState = document.querySelector('input[name="state"]:checked');

  if (delayInput.value === '') {
    // console.log('Enter some number');
    iziToast.show(cautionMessage);
    event.currentTarget.reset();
    return;
  }

  if (Number(delayInput.value) <= 0) {
    // console.log('You must enter a valid value');
    iziToast.show(cautionMessage);
    event.currentTarget.reset();
    return;
  }

  if (!getState) {
    // console.log('You forgot to choose a promise type');
    iziToast.show(cautionMessage);
    return;
  }

  const promiseDelay = Number(delayInput.value);

  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (getState.value === 'fulfilled') {
        resolve(promiseDelay);
      } else {
        reject(promiseDelay);
      }
    }, promiseDelay);
  });

  promise
    .then(delay => {
      const message = `✅ Fulfilled promise in ${delay}ms`;
      console.log(message);
      iziToast.success({
        ...successMessage,
        message: message,
      });
    })
    .catch(delay => {
      const message = `❌ Rejected promise in ${delay}ms`;
      console.log(message);
      iziToast.error({
        ...errorMessage,
        message: message,
      });
    });

  event.currentTarget.reset();
});
