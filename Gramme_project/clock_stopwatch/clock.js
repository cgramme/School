"use strict";
var $ = function(id) { return document.getElementById(id); };

//global stop watch timer variable and elapsed time object
var stopwatchTimer;
var elapsed = { minutes:0, seconds:0, milliseconds:0 };

var displayCurrentTime = function() {
    var now = new Date();
    var hours = now.getHours();
    var ampm = "AM"; // set default value
    
    // correct hours and AM/PM value for display
    if (hours > 12) { // convert from military time
        hours = hours - 12;
        ampm = "PM";
    } else { // adjust 12 noon and 12 midnight
         switch (hours) {
            case 12: // noon
                ampm = "PM";
                break;
            case 0:  // midnight
                hours = 12;
                ampm = "AM";
        }
    }
    
    $("hours").firstChild.nodeValue = hours;
    $("minutes").firstChild.nodeValue = padSingleDigit(now.getMinutes());
    $("seconds").firstChild.nodeValue = padSingleDigit(now.getSeconds());
    $("ampm").firstChild.nodeValue = ampm;
};

var padSingleDigit = function(num) {
    return (num < 10) ? "0" + num : num;
};

var tickStopwatch = function() {
    // increment milliseconds by 10 milliseconds
    elapsed.milliseconds += 10;
    // if milliseconds total 1000, increment seconds by one and reset milliseconds to zero
    if(elapsed.milliseconds >= 1000){
        elapsed.seconds += 1;
        elapsed.milliseconds = 0;
    }
    // if seconds total 60, increment minutes by one and reset seconds to zero
    if(elapsed.seconds >= 60){
        elapsed.minutes += 1;
        elapsed.seconds = 0;
    }
    // display new stopwatch time in format 00:00:000
    $("s_ms").innerHTML = (elapsed.milliseconds > 99) ? elapsed.milliseconds : "0" + elapsed.milliseconds;
    $("s_seconds").innerHTML = (elapsed.seconds > 9) ? elapsed.seconds : "0" + elapsed.seconds;
    $("s_minutes").innerHTML = (elapsed.minutes > 9) ? elapsed.minutes : "0" + elapsed.minutes;
};

// event handler functions
var startStopwatch = function(e) {
    // prevent default action of link
    evt.preventDefault();

    // do first tick of stop watch and then set interval timer to tick 
    // stop watch every 10 milliseconds. Store timer object in stopwatchTimer 
    // variable so next two functions can stop timer.
    tickStopwatch();
    stopwatchTimer = setInterval(tickStopwatch,10);
};

var stopStopwatch = function(e) {
    // prevent default action of link
    evt.preventDefault();
    
    // stop timer
    clearTimeout(stopwatchTimer);
};

var resetStopwatch = function(e) {
    // prevent default action of link
    evt.preventDefault();
        
    // stop timer
    clearTimeout(stopwatchTimer);

    // clear elapsed object and reset stopwatch display
    elapsed = {minutes:0, seconds:0, milliseconds:0};
    $("s_ms").innerHTML = "000";
    $("s_seconds").innerHTML = "00";
    $("s_minutes").innerHTML = "00";
};

window.onload = function() {
    // set initial clock display and then set interval timer to display
    // new time every second. Don't store timer object because it 
    // won't be needed - clock will just run.
    displayCurrentTime();
    setInterval(displayCurrentTime, 1000);
    
    // set up stopwatch event handlers
    evt.attach($("start"), "click", startStopwatch);
    evt.attach($("stop"), "click", stopStopwatch);
    evt.attach($("reset"), "click", resetStopwatch);
};
