var hour = document.getElementsByClassName('hour')[0];
var minute = document.getElementsByClassName('minute')[0];
var second = document.getElementsByClassName('seconds')[0];
var setAlarmButton = document.getElementById('set-alarm');
var alarmTimeInput = document.getElementById('alarm-time');
var alarmTimeout;
var audio=new Audio('alarm.wav');

setInterval(() => {
    var date = new Date();
    var hrs = date.getHours();
    var min = date.getMinutes();
    var sec = date.getSeconds();

    var hrotation = 30 * hrs + min / 2;
    var mrotation = 6 * min;
    var srotation = 6 * sec;

    hour.style.transform = `rotate(${hrotation}deg)`;
    minute.style.transform = `rotate(${mrotation}deg)`;
    second.style.transform = `rotate(${srotation}deg)`;
}, 1000);

setAlarmButton.addEventListener('click', function() {
    var alarmTime = alarmTimeInput.value;

    if (validateTime(alarmTime)) {
        var currentTime = getCurrentTime();
        var timeDifference = getTimeDifference(currentTime, alarmTime);

        if (timeDifference >= 0) {
            setAlarm(timeDifference);
        } else {
            alert('Invalid alarm time. Please select a time in the future.');
        }
    } else {
        alert('Invalid time format. Please enter a valid time (HH:MM).');
    }
});

function validateTime(time) {
    // Regular expression to validate the time format (HH:MM)
    var timeRegex = /^(?:[01]\d|2[0-3]):[0-5]\d$/;
    return timeRegex.test(time);
}

function getCurrentTime() {
    var date = new Date();
    var hours = date.getHours().toString().padStart(2, '0');
    var minutes = date.getMinutes().toString().padStart(2, '0');
    return hours + ':' + minutes;
}

function getTimeDifference(currentTime, alarmTime) {
    var currentMinutes = convertToMinutes(currentTime);
    var alarmMinutes = convertToMinutes(alarmTime);
    return alarmMinutes - currentMinutes;
}

function convertToMinutes(time) {
    var splitTime = time.split(':');
    var hours = parseInt(splitTime[0]);
    var minutes = parseInt(splitTime[1]);
    return hours * 60 + minutes;
}

function setAlarm(timeDifference) {
    clearTimeout(alarmTimeout);
    alarmTimeout = setTimeout(function() {
        audio.play();

        
        setTimeout(function() {
            audio.pause();
            audio.currentTime = 0;
        }, 60*1000);
    }, timeDifference * 60 * 1000);
}