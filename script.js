const locale = document.querySelector('.location');
const temperature = document.querySelector('.temperature');
const precipitation = document.querySelector('.precipitation');
const overall = document.querySelector('.overall');
const units = document.querySelector('.units');



function fillUrl (locationUrl,dateUrl,unitsUrl) {
    let url = 'https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/' 
    + locationUrl + dateUrl + '?unitGroup=' + unitsUrl 
    + '&key=PAG8PHPBB7KYF3BUR727D4QSQ&contentType=json';
    getWeather(url,dateUrl);
}


async function getWeather(link,dateUrl,locationUrl) {
    try {
        const response = await fetch(link, {mode: 'cors'});
        const weatherData = await response.json();
        console.log(weatherData);
        if (dateUrl) {
            locale.textContent = `Location: ${weatherData.address}`;
            overall.textContent = `${weatherData.days[0].conditions}`;
            temperature.textContent = `Temp: ${weatherData.days[0].temp}°`;
            precipitation.textContent = `Chance of rain: ${weatherData.days[0].precipprob}%`;
            identifyWeather(overall);
        } else {
            locale.textContent = `Location: ${weatherData.address}`;
            overall.textContent = `${weatherData.currentConditions.conditions}`;
            temperature.textContent = `Temp: ${weatherData.currentConditions.temp}°`;
            precipitation.textContent = `Chance of rain: ${weatherData.currentConditions.precipprob}%`;
            identifyWeather(overall);
        }
    } catch (err) {
        alert('Unfortunately, this API does not have your location :(')
    }
}

// getWeather();

function rain() {
    document.body.style.backgroundImage = "url('images/rain.png')";
    const header = document.querySelector('h1');
    const current = document.querySelector('.current')
    header.setAttribute(
        'style',
        'color: white; font-family: Cyberpunk; background-color: rgba(128, 128, 128, 0.541); border-radius: 12px; padding: 8px'
    );
    current.setAttribute(
        'style',
        'color: white; background-color: rgba(128, 128, 128, 0.541); border-radius: 12px; padding: 8px'
    );
}

function sunny() {
    document.body.style.backgroundImage = "url('images/sunny.jpg')";
    const header = document.querySelector('h1');
    const current = document.querySelector('.current')
    header.setAttribute(
        'style',
        'color: white; font-family: Cyberpunk; background-color: rgba(128, 128, 128, 0.541); border-radius: 12px; padding: 8px'
    );
    current.setAttribute(
        'style',
        'color: white; background-color: rgba(128, 128, 128, 0.541); border-radius: 12px; padding: 8px'
    );
}

// rain()
// sunny();
// document.body.style.backgroundImage = "url('')";

function formCreate() {
    const formToSearch = document.createElement('form');
    const locationDiv = document.createElement('div');
    const locationLabel = document.createElement('label');
    const locationInput = document.createElement('input');
    const unitsDiv = document.createElement('div');
    const unitsLabel = document.createElement('label');
    const unitsSelect = document.createElement('select');
    const unitsMetricOption = document.createElement('option');
    const unitsUSOption = document.createElement('option');
    const unitsUKOption = document.createElement('option');
    const dayDiv = document.createElement('div');
    const dayLabel = document.createElement('label');
    const dayInput = document.createElement('input');
    const buttonSubmit = document.createElement('button');

    formToSearch.setAttribute('class','terms');
    locationLabel.setAttribute('for','location');
    locationLabel.textContent = 'Type a city:';
    locationInput.setAttribute('type','text');
    locationInput.setAttribute('name','location');
    locationInput.setAttribute('id','location');
    locationInput.setAttribute('placeholder','Tilburg');
    unitsLabel.setAttribute('for','units');
    unitsLabel.textContent = 'Measurement units:';
    unitsSelect.setAttribute('name','units');
    unitsSelect.setAttribute('id','units');
    unitsMetricOption.setAttribute('value','metric');
    unitsMetricOption.textContent = 'Metric (°C, km)';
    unitsUSOption.setAttribute('value','us');
    unitsUSOption.textContent = 'US (°F, miles)';
    unitsUKOption.setAttribute('value','uk');
    unitsUKOption.textContent = 'UK (°C, miles)';
    dayLabel.setAttribute('for','day');
    dayLabel.textContent = 'Day to check:';
    dayInput.setAttribute('type','date');
    dayInput.setAttribute('id','day');
    dayInput.setAttribute('name','day');
    buttonSubmit.setAttribute('type','button');
    buttonSubmit.textContent = 'Search';

    locationDiv.append(locationLabel,locationInput);
    unitsSelect.append(unitsMetricOption,unitsUSOption,unitsUKOption);
    unitsDiv.append(unitsLabel,unitsSelect);
    dayDiv.append(dayLabel,dayInput);
    formToSearch.append(locationDiv,unitsDiv,dayDiv,buttonSubmit);
    document.body.appendChild(formToSearch);

    buttonSubmit.addEventListener('click', ()=>{
        if (locationInput.value) {
            let locationUrlInput = locationInput.value;
            let unitsUrlInput = unitsSelect.value;
            let dateUrlInput = '';
            if (dayInput.value) {
                dateUrlInput = `/${dayInput.value}/${dayInput.value}`;
            }
            fillUrl(locationUrlInput,dateUrlInput, unitsUrlInput);
        } else {
            alarm('You forgot to insert the location!');
        }
        document.body.removeChild(formToSearch);
        buttonCreate();
    });
}

function buttonCreate() {
    const buttonAddItem = document.createElement('button');
    const imgButton = document.createElement('img');
    buttonAddItem.setAttribute('class','add-item');
    imgButton.setAttribute('alt','AddItem');
    imgButton.src = 'images/plus.svg';
    buttonAddItem.appendChild(imgButton);
    document.body.appendChild(buttonAddItem);
    
    buttonAddItem.addEventListener('click', ()=>{
        formCreate();
        document.body.removeChild(buttonAddItem);
    })
}

function identifyWeather(overall) {
    let test = overall.textContent.toLowerCase();
    if (test.includes('rain')) {
        rain();
    } else {
        sunny();
    }
}

buttonCreate();

