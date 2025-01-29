var countdownInterval;
var countdownSeconds = 0;
var stopwatchInterval;
var stopwatchSeconds = 0;
var alarmSound = document.getElementById('alarmSound');


function updateCountdownDisplay() {
  var hours = Math.floor(countdownSeconds / 3600).toString().padStart(2, '0');
  var minutes = Math.floor((countdownSeconds % 3600) / 60).toString().padStart(2, '0');
  var seconds = Math.floor(countdownSeconds % 60).toString().padStart(2, '0');

  document.getElementById('hoursInput').value = hours;
  document.getElementById('minutesInput').value = minutes;
  document.getElementById('secondsInput').value = seconds;
}

function showButton(id) {
  document.getElementById(id).classList.remove('hidden')
}

function hideButton(id) {
  document.getElementById(id).classList.add('hidden');
}


function updateButtonVisibility(running) {
  if (running) {
    hideButton('startCountdown');
    showButton('stopCountdown');
    showButton('resetCountdown')
    hideButton('stopAlarm');
  } else{
    showButton('startCountdown');
    hideButton('stopCountdown');
    hideButton('resetCountdown');
    if (countdownSeconds <= 0) {
    	showButton('stopAlarm');
    	hideButton('startCountdown');
    } 
    else if (countdownSeconds > 0)
    	showButton('resetCountdown')

    else {
    	hideButton('stopAlarm');
    	showButton('startCountdown')
    }
   
  }
}

var stop = document.getElementById('stopAlarm');
stop.addEventListener('click', function() {
	showButton('startCountdown')
	hideButton('stopAlarm')
	
});

var reset = document.getElementById('resetCountdown');
reset.addEventListener('click', function() {
	showButton('startCountdown')
	hideButton('stopAlarm')

})

var start = document.getElementById('startCountdown')
start.addEventListener('click', function(){
  var hoursInput = document.getElementById('hoursInput').value;
  var minutesInput = document.getElementById('minutesInput').value;
  var secondsInput = document.getElementById('secondsInput').value;

  minutesInput = parseInt(minutesInput || 0);
  secondsInput = parseInt(secondsInput || 0);

  if (hoursInput < 0 || minutesInput < 0 || secondsInput < 0) {
    alert("No se pueden ingresar números negativos");
    return;
  }

  if (minutesInput > 59) {
    var extraHours = Math.floor(minutesInput / 60);
    hoursInput = (parseInt(hoursInput) || 0) + extraHours;
    minutesInput = minutesInput % 60;
  }

  if (secondsInput > 59) {
    var extraMinutes = Math.floor(secondsInput / 60);
    minutesInput = minutesInput + extraMinutes;
    secondsInput = secondsInput % 60;
  }

  countdownSeconds = (parseInt(hoursInput) || 0) * 3600 + minutesInput * 60 + secondsInput;

  if (countdownSeconds <= 0) {
    alert("El contador está en 0");
  } else {
    clearInterval(countdownInterval);
    countdownInterval = setInterval(function() {
      countdownSeconds--;
      updateCountdownDisplay();

      if (countdownSeconds <= 0) {
        clearInterval(countdownInterval);
        alarmSound.play();
      }
      updateButtonVisibility(countdownSeconds > 0);
    }, 1000);

    updateButtonVisibility(countdownSeconds > 0);
  }
});






function stopCountdown() {
  clearInterval(countdownInterval);
  alarmSound.pause();
  alarmSound.currentTime = 0;
  updateButtonVisibility(false)
  
}

function resetCountdown() {
  clearInterval(countdownInterval);
  countdownSeconds = 0;
  updateCountdownDisplay();
  alarmSound.pause();
  alarmSound.currentTime = 0;
  updateButtonVisibility(false)
}

function stopAlarm() {
  alarmSound.pause();
  alarmSound.currentTime = 0;
  updateButtonVisibility(false);
}



function updateStopwatchDisplay() {
  var hours = Math.floor(stopwatchSeconds / 3600).toString().padStart(2, '0');
  var minutes = Math.floor((stopwatchSeconds % 3600) / 60).toString().padStart(2, '0');
  var seconds = Math.floor(stopwatchSeconds % 60).toString().padStart(2,'0')

  document.getElementById('stopwatchDisplay').textContent = hours + ':' + minutes + ':' + seconds;
}

  hideButton('stopStopwatch')
  showButton('startStopwatch')
  hideButton('resetStopwatch')

function startStopwatch() {
  clearInterval(stopwatchInterval);
  stopwatchInterval = setInterval(function() {
    stopwatchSeconds++;
    updateStopwatchDisplay();
    hideButton('startStopwatch')
    showButton('stopStopwatch')
    showButton('resetStopwatch')
  }, 1000);
}

function stopStopwatch() {
  clearInterval(stopwatchInterval);
  hideButton('stopStopwatch')
  showButton('startStopwatch')
  showButton('resetStopwatch')

}

function resetStopwatch() {
  clearInterval(stopwatchInterval);
  stopwatchSeconds = 0;
  updateStopwatchDisplay();
  hideButton('stopStopwatch')
  showButton('startStopwatch')
  hideButton('resetStopwatch')
}



function updateTime() {
  var now = new Date();
  var hours = now.getHours();
  var minutes = now.getMinutes();
  var seconds = now.getSeconds();
  var day = now.getDate().toString().padStart(2, '0');
  var month = (now.getMonth() + 1).toString().padStart(2, '0');
  var year = now.getFullYear();


  var daysOfWeek = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
  var dayOfWeek = daysOfWeek[now.getDay()]; 

  var dateString = day + '/' + month + '/' + year;
  var timeString = hours.toString().padStart(2, '0') + ':' + minutes.toString().padStart(2, '0') + ':' + seconds.toString().padStart(2, '0');

  document.getElementById('date').textContent = dateString;
  document.getElementById('time').textContent = timeString;
  document.getElementById('dayOfWeek').textContent = `${dayOfWeek}`;
}

setInterval(updateTime, 1000);


