let timer; // Timer variable
let timeElapsed = 0; // Time elapsed in milliseconds
let lapCounter = 1; // Lap counter

function displayTime() {
    let hours = Math.floor(timeElapsed / 3600000);
    let minutes = Math.floor((timeElapsed % 3600000) / 60000);
    let seconds = Math.floor((timeElapsed % 60000) / 1000);
    let milliseconds = timeElapsed % 1000;

    document.getElementById('display').innerHTML = 
        pad(hours) + ":" + pad(minutes) + ":" + pad(seconds);
}

function pad(number) {
    return ("00" + number).slice(-2);
}

function startPause() {
    if (timer) {
        clearInterval(timer);
        timer = null;
        document.getElementById('startPause').innerHTML = 'Resume';
    } else {
        timer = setInterval(function() {
            timeElapsed += 10; // Increase elapsed time by 10 milliseconds (adjust for accuracy)
            displayTime();
        }, 10);
        document.getElementById('startPause').innerHTML = 'Pause';
    }
}

function reset() {
    clearInterval(timer);
    timer = null;
    timeElapsed = 0;
    lapCounter = 1;
    document.getElementById('startPause').innerHTML = 'Start';
    document.getElementById('display').innerHTML = '00:00:00';
    document.getElementById('laps').innerHTML = '';
}

function lap() {
    let lapTime = timeElapsed;
    let lapItem = document.createElement('li');
    lapItem.innerText = 'Lap ' + lapCounter + ': ' + formatTime(lapTime);
    document.getElementById('laps').appendChild(lapItem);
    lapCounter++;
}

function formatTime(time) {
    let minutes = Math.floor((time % 3600000) / 60000);
    let seconds = Math.floor((time % 60000) / 1000);
    let milliseconds = time % 1000;
    return pad(minutes) + ":" + pad(seconds) + "." + ("00" + milliseconds).slice(-3);
}

document.getElementById('startPause').addEventListener('click', startPause);
document.getElementById('reset').addEventListener('click', reset);
document.getElementById('lap').addEventListener('click', lap);
