let countdown;
let timerIsRunning = false;

const display = document.getElementById('display');
const startButton = document.getElementById('start');
const stopButton = document.getElementById('stop');
const resetButton = document.getElementById('reset');
const hoursInput = document.getElementById('hours');
const minutesInput = document.getElementById('minutes');
const secondsInput = document.getElementById('seconds');

function startTimer(hours, minutes, seconds) {
    clearInterval(countdown);

    const totalSeconds = hours * 3600 + minutes * 60 + seconds;
    const now = Date.now();
    const then = now + totalSeconds * 1000;
    displayTimeLeft(totalSeconds);

    countdown = setInterval(() => {
        const secondsLeft = Math.round((then - Date.now()) / 1000);

        if (secondsLeft < 0) {
            clearInterval(countdown);
            timerIsRunning = false;
            displayTimeLeft(0);
        } else {
            displayTimeLeft(secondsLeft);
        }
    }, 1000);

    timerIsRunning = true;
}

function displayTimeLeft(seconds) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;

    const displayTime = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
    display.textContent = displayTime;
}

function stopTimer() {
    clearInterval(countdown);
    timerIsRunning = false;
}

function resetTimer() {
    clearInterval(countdown);
    timerIsRunning = false;
    displayTimeLeft(0);
}

startButton.addEventListener('click', () => {
    if (!timerIsRunning) {
        const hours = parseInt(hoursInput.value) || 0;
        const minutes = parseInt(minutesInput.value) || 0;
        const seconds = parseInt(secondsInput.value) || 0;
        startTimer(hours, minutes, seconds);
    }
});

stopButton.addEventListener('click', stopTimer);
resetButton.addEventListener('click', resetTimer);
