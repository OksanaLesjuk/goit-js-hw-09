import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        console.log(selectedDates[0]);
    },
};

const myInput = document.querySelector("#datetime-picker");
const btnStart = document.querySelector('button[data-start]');

const fp = flatpickr(myInput, options);



btnStart.addEventListener(
    'click', onClickStart)

function onClickStart(evt) {
    console.log(evt);
}

