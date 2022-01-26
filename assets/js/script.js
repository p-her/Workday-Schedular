
// Get the current date
var currentDay = moment().format("dddd, MMMM Do");

// Set the current date to the element's text
$('#currentDay').text(currentDay)

// Retrieve data from local storage and assing to currentPlan
var currentPlan = JSON.parse(localStorage.getItem("planner"))

// Get the current hour of the day
var currentHour = moment().format("H A")

// the planner object for today's plan
var planner = [
    { time: '9 AM', plan: ''},
    { time: '10 AM', plan: ''},
    { time: '11 AM', plan: ''},
    { time: '12 PM', plan: ''},
    { time: '1 PM', plan: ''},
    { time: '2 PM', plan: ''},
    { time: '3 PM', plan: ''},
    { time: '4 PM', plan: ''},
    { time: '5 PM', plan: ''}
]

// Check if currentPlan is not null, then assign currentPlan to planner
if(currentPlan !== null){
    planner = currentPlan;
}

// loop through the planner and generate a time block
for( var i = 0; i < planner.length; i++){


    // Get the time status: present, future, or past
    var colorBlock = colorCoded(planner[i].time);


    $(".container").append(`<div class="row time-block ${colorBlock}" id="${i}">
                                <div class="col-1 hour"> ${planner[i].time}</div>
                                <textarea class="col-10">${planner[i].plan}</textarea>
                                <div class="col-1 saveBtn" ><i class="fas fa-save"></i></div>
                            </div>
            `)
}


// save the data into local storage when the user clicked save
$('.saveBtn').on('click', function(){

    // Retrieve the id of the time-block that the user has clicked
    var id = parseInt($(this).closest('.time-block').attr('id'));
    // Retrieve the value of the textarea corresponding to the time-block the user clicked
    var todayPlan = $(this).closest('.time-block').find('textarea').val();
    // set the index and value of the textarea corresponding to the user clicked save
    // to the array
    planner[id].plan = todayPlan;

    // convert planner object to json and save it to local storage
    localStorage.setItem("planner", JSON.stringify(planner));


})


// Compare the current hour of the day to the entry hour to determine if 
// entry hour is present, past, or future to current hour of the day
function colorCoded(entryHour){
    // convert the current hour into moment object
    var currentTime = moment(currentHour, "H A");
    // convert the entry hour into moment object
    var entryTime = moment(entryHour, "H A");

    // compare the moment objects to determine: past, present, or future 
    if(currentTime.isBefore(entryTime)){
        return "future";
    }else if(currentTime.isAfter(entryTime)){
        return "past";
    }else{
        return "present";
    }

}

