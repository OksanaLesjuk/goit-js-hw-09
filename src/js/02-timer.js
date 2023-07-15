import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        console.log(selectedDates[0]);

        const chooseDate = selectedDates[0];
        const currentDate = new Date();
        console.log(currentDate);
        const isValidTime = chooseDate > currentDate;
        if (!isValidTime) {
            btnStart.disabled = true;
            alert("Please choose a date in the future");
        }
        else {
            btnStart.disabled = false;
        }
    },
}



const myInput = document.querySelector("#datetime-picker");
const btnStart = document.querySelector('button[data-start]');


btnStart.disabled = true;

const fp = flatpickr(myInput, options);
console.dir(fp);




// myInput.addEventListener('input', onInput)

btnStart.addEventListener(
    'click', onClickStart)



function onClickStart(evt) {
    console.log(evt);
}

