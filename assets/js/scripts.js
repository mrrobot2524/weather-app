const container = document.querySelector('.container');
const search = document.querySelector('.search-box button');
const weatherBox = document.querySelector('.weather-box');
const weatherDetails = document.querySelector('.weather-details');
const error404 = document.querySelector('.not-found');

search.addEventListener('click', () => {
    const ApiKey = 'a6fd9e6dbfeda3d31aa752c0607074db';
    const city = document.querySelector('.search-box input').value;


    if(city === ''){
        return 'You enter nothing';
    }
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${ApiKey}`).then(response => response.json()).then(json=>{

        if(json.cod == '404'){
            container.style.height = '400px';
            weatherBox.classList.remove('active');
            weatherDetails.classList.remove('active');
            error404.classList.add('active');
            return;
        }


        container.style.height = '555px';
        weatherBox.classList.add('active');
        weatherDetails.classList.add('active');
        error404.classList.remove('active');

        const images = document.querySelector('.weather-box img');
        const temperature = document.querySelector('.weather-box .temperature');
        const description = document.querySelector('.weather-box .descriptions');
        const humidity = document.querySelector('.weather-details .humidity span');
        const wind = document.querySelector('.weather-details .wind span');

        switch(json.weather[0].main){
            case 'Clear':
                images.src = 'assets/images/sun.png';
            break;
            case 'Rain':
                images.src = 'assets/images/rain.png';
            break;
            case 'Snow':
                images.src = 'assets/images/snow.png';
            break;
            case 'Clouds':
                images.src = 'assets/images/cloud.png';
            break;
            case 'Mist':
                images.src = 'assets/images/mist.png';
            break;
            case 'Haze':
                images.src = 'assets/images/haze.png';
            break;
            default:
                images.src = 'assets/images/cloud.png';
            break;
        }

        temperature.innerHTML = `${parseInt(json.main.temp)}<span>&deg;C</span>`;
        description.innerHTML = `${json.weather[0].description}`;
        humidity.innerHTML = `${json.main.humidity}%`;
        wind.innerHTML = `${parseInt(json.wind.speed)}Km/h`;
    });
});