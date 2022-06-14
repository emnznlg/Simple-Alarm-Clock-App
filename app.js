//SELECTORS
const selectMenu = document.querySelectorAll("select");
const currentTime = document.querySelector("h1");
const setAlarmBtn = document.querySelector("button");
const content = document.querySelector(".content");
const alarmSetAlert = document.querySelector(".alarm-set-alert");
let alarmTime;
let isAlarmSet = false;
ringtone = new Audio("./files/ringtone.mp3");

//Event Listeners

setAlarmBtn.addEventListener("click", setAlarm);

//FUNCTIONS
function createOptions() {
  //Creating Hours
  for (let i = 12; i > 0; i--) {
    if (i < 10) {
      i = "0" + i;
    } else {
      i = i;
    }
    let option = `<option value="${i}">${i}</option>`;
    selectMenu[0].firstElementChild.insertAdjacentHTML("afterend", option);
  }

  //Creating Minutes
  for (let i = 59; i >= 0; i--) {
    if (i < 10) {
      i = "0" + i;
    } else {
      i = i;
    }
    let option = `<option value="${i}">${i}</option>`;
    selectMenu[1].firstElementChild.insertAdjacentHTML("afterend", option);
  }

  //Creating AM/PM
  for (let i = 2; i > 0; i--) {
    let ampm = i == 2 ? "PM" : "AM";
    let option = `<option value="${ampm}">${ampm}</option>`;
    selectMenu[2].firstElementChild.insertAdjacentHTML("afterend", option);
  }
}

function getAndShowCurrentTime() {
  let date = new Date();
  let hour = date.getHours();
  let minutes = date.getMinutes();
  let seconds = date.getSeconds();

  let ampm = "AM";

  hour > 12 ? (ampm = "PM") : ampm;

  hour = hour == 0 ? (hour = 12) : hour;

  hour = hour < 10 ? (hour = "0" + hour) : hour;
  minutes = minutes < 10 ? (minutes = "0" + minutes) : minutes;
  seconds = seconds < 10 ? (seconds = "0" + seconds) : seconds;

  currentTime.innerText = `${hour}:${minutes}:${seconds} ${ampm}`;

  if (alarmTime == `${hour}:${minutes} ${ampm}`) {
    ringtone.play();
    ringtone.loop = true;
  }
}

function setAlarm() {
  //Get the users time choice
  let time = `${selectMenu[0].value}:${selectMenu[1].value} ${selectMenu[2].value}`;

  if (isAlarmSet) {
    alarmTime = "";
    ringtone.pause();
    content.classList.remove("disable");
    setAlarmBtn.innerText = "Set Alarm";
    return (isAlarmSet = false);
  }
  if (
    //Check if user choose the time or not
    time.includes("hour") ||
    time.includes("minutes") ||
    time.includes("AM/PM")
  ) {
    alert("Please select the time that you want to set the alarm!");
  } else {
    isAlarmSet = true;
    alarmTime = time;

    //Disable the options once we set the alarm
    content.classList.add("disable");
    setAlarmBtn.innerText = "Clear Alarm";
    //show the "alarm set" alert for 1.5 seconds (I did it totally myself haha!!)
    alarmSetAlert.classList.add("show");
    setTimeout(() => {
      alarmSetAlert.classList.remove("show");
    }, 1500);
  }
}

setInterval(getAndShowCurrentTime, 1000);
createOptions();
