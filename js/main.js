cityInput=document.querySelector(".city");
currentImgInput=document.querySelector(".current-img");
imgInput=document.querySelectorAll(".img");
stateInput=document.querySelectorAll(".state");
currentTempEle=document.querySelector(".current-temp");
maxTempEle=document.querySelectorAll(".max-temp");
minTempEle=document.querySelectorAll(".min-temp");
currentWindEle=document.querySelectorAll(".current-wind ");
WindEle=document.querySelectorAll(".wind");
rainEle=document.querySelectorAll(".rain");
daysInput=Array.from(document.querySelectorAll(".day"));
datesInput=Array.from(document.querySelectorAll(".date"));
searchInput=document.getElementById("search");
let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
];

let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
];

let current = {};
let userLocation = {};
let forecast = [];

// determining days name //
let d=new Date()
let currentDay=days[d.getDay()]
let nextDay=days[(d.getDay()+1<days.length?d.getDay()+1:d.getDay()+1-days.length)]
let lastDay=days[(d.getDay()+2<days.length?d.getDay()+2:d.getDay()+2-days.length)]
// getdate//
currentDate=d.getDate()
nextDate=(d.getDate()+1<= 31 ?d.getDate()+1:d.getDate()+1-31)
lastDate=(d.getDate()+2<=31?d.getDate()+2:d.getDate()+2-31)
//getmonth//
currentMonth=months[d.getMonth()]
nextMonth=(d.getDate()+1<=31?months[d.getMonth()]:months[d.getMonth()+1])
lastMonth=(d.getDate()+2<=31?months[d.getMonth()]:months[d.getMonth()+1])

daysInput[0].innerHTML=`${currentDay}`;
daysInput[1].innerHTML=`${nextDay}`;
daysInput[2].innerHTML=`${lastDay}`;
datesInput[0].innerHTML=`${currentDate}${currentMonth}`;
datesInput[1].innerHTML=`${nextDate}${currentMonth}`;
datesInput[2].innerHTML=`${lastDate}${currentMonth}`;
// //////////////////////////// //


// dealing with api //
async function getData(city="cairo"){
    var apiResponse=await fetch(`http://api.weatherapi.com/v1/forecast.json?key=8a49b11e3e2845f08de105153232502&q=${city}&days=3&aqi=no&alerts=no`);
    var finalResult= await apiResponse.json();
    if (finalResult.error) {return};
    current=finalResult.current;
    userLocation=finalResult.location;
    forecast=finalResult.forecast.forecastday;
    // ////////// //
    getLocation();
    getImage();
    getCondtionText();
    getTemp();
    getWind();
}
getData()
// search input //
function search(){
    if(searchInput.value.length>=3){
        getData(searchInput.value)
    }
}
searchInput.addEventListener("input",search)



// get user location //
function getLocation(){
cityInput.innerHTML=`${userLocation.name}`
}

// get state img //
function getImage(){
for(i=0;i<Array.from(imgInput).length;i++){
imgInput[i].src=`${forecast[i].day.condition.icon}`
}
}

// get state text //
function getCondtionText(){
    for(i=0;i<Array.from(stateInput).length;i++){
        stateInput[i].innerHTML=`${forecast[i].day.condition.text}`
        }  
}
// get temp //
function getTemp(){
    currentTempEle.innerHTML=`${current.temp_c} <span class="c-temp fw-bold ">&#176;C</span>`;
    for(i=0;i<Array.from(maxTempEle).length;i++){
        maxTempEle[i].innerHTML=`${forecast[i].day.maxtemp_c} <span class="fs-1">&#176;C</span>`
    }  
    for(i=0;i<Array.from(minTempEle).length;i++){
        minTempEle[i].innerHTML=`${forecast[i].day.mintemp_c} <span class="fs-5">&#176;C</span>`
    }  
}

// get wind and rain text for icons //
function getWind(){
    currentWindEle[0].innerHTML=`${forecast[0].day.daily_will_it_rain}`
    currentWindEle[1].innerHTML=`${current.wind_kph}`
    currentWindEle[2].innerHTML=`${current.wind_dir}`
    for(i=0 ; i<Array.from(rainEle).length ; i++){
        rainEle[i].innerHTML=`${forecast[i+1].day.daily_will_it_rain}`
    }
    for(i=0 ; i<Array.from(WindEle).length ; i++){
        WindEle[i].innerHTML=`${forecast[i].day.maxwind_kph}`
    }
}





