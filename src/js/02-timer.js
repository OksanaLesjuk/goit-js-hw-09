import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import { Notify } from 'notiflix/build/notiflix-notify-aio';



const myInput = document.querySelector("#datetime-picker");
const btnStart = document.querySelector('button[data-start]');
const remainderDays = document.querySelector('[data-days]');
const remainderHours = document.querySelector('[data-hours]');
const remainderMinutes = document.querySelector("[data-minutes]");
const remainderSeconds = document.querySelector("[data-seconds]");
let remainderTime = null;


//слухаємо інпут у методі onClose, кнопка неактивна поки користувач не вибере валідну дату , selectedDates є масивом, тому беремо по індексу
const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        const chooseDate = selectedDates[0];
        const currentDate = new Date();
        const isValidTime = chooseDate > currentDate;
        if (!isValidTime) {
            btnStart.disabled = true;
            Notify.failure("Please choose a date in the future");
        }
        else {
            btnStart.disabled = false;

        }
    },
}



//встановлюємо стан кнопки по замовчуванню
btnStart.disabled = true;


//створюємо екземпляр flatpickr, передаємо наш імпут і об"єкт
const fp = flatpickr(myInput, options);


btnStart.addEventListener(
    'click', onClickStart)


// після  кліку на старт щосекунди порівнюємо вибрану дату з поточниим часом та отримані мілісекунди форматуємо з допомогою функції convertMs
function onClickStart(evt) {

    const chooseDate = fp.selectedDates[0]; //fp.selectedDates є масивом з одним елементом 

    intervalId = setInterval(() => {
        const currentDate = new Date();

        remainderTime = chooseDate - currentDate;

        if (remainderTime > 0) {
            const { days, hours, minutes, seconds } = convertMs(remainderTime);
            remainderDays.textContent = addLeadingZero(days);
            remainderHours.textContent = addLeadingZero(hours);
            remainderMinutes.textContent = addLeadingZero(minutes);
            remainderSeconds.textContent = addLeadingZero(seconds);
        } else {
            clearInterval(intervalId);
            Notify.info('TIME IS OVER')

        }

    }, 1000)
}




function convertMs(ms) {
    // Number of milliseconds per unit of time
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    // Remaining days
    const days = Math.floor(ms / day);
    // Remaining hours
    const hours = Math.floor((ms % day) / hour);
    // Remaining minutes
    const minutes = Math.floor(((ms % day) % hour) / minute);
    // Remaining seconds
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);

    return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
    return String(value).padStart(2, '0')
}
