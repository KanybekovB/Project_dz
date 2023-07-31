const phoneInput = document.querySelector("#phone_input");
const phoneCheck = document.querySelector("#phone_button");
const phoneResult = document.querySelector("#phone_result");

const regExp = /^\+996 \d{3} \d{2}-\d{2}-\d{2}/;

phoneCheck.addEventListener("click", () => {
  if (regExp.test(phoneInput.value)) {
    phoneResult.innerHTML = "Ok";
    phoneResult.style.color = `green`;
  } else {
    phoneResult.innerHTML = "Not ok";
    phoneResult.style.color = `red`;
  }
});

//*TAB SLIDER

const tabContent = document.querySelectorAll(".tab_content_block");
const tabs = document.querySelectorAll(".tab_content_item");
const tabsParent = document.querySelector(".tab_content_items");
let indexCount;
let interval;

const hideTabContent = () => {
  tabContent.forEach((item) => {
    item.style.display = "none";
  });
  tabs.forEach((item) => {
    item.classList.remove("tab_content_item_active");
  });
};

const showTabContent = (index = 0) => {
  tabContent[index].style.display = "block";
  tabs[index].classList.add("tab_content_item_active");
  indexCount = index;
};

hideTabContent();
showTabContent();

tabsParent.onclick = (event) => {
  const targetElement = event.target;
  if (targetElement.classList.contains("tab_content_item")) {
    tabs.forEach((tab, tabIndex) => {
      if (targetElement === tab) {
        hideTabContent();
        showTabContent(tabIndex);
        clearInterval(interval);
        interval = setInterval(autoSlider, 3000);
      }
    });
  }
};

const autoSlider = () => {
  indexCount++;
  if (indexCount > tabs.length - 1) {
    indexCount = 0;
  }
  hideTabContent();
  showTabContent(indexCount);
};
interval = setInterval(autoSlider, 3000);

//* CONVERTOR

const som = document.querySelector("#som");
const usd = document.querySelector("#usd");
const eur = document.querySelector("#eur");
const frank = document.querySelector("#frank");
const yen = document.querySelector("#yen");
const tenge = document.querySelector("#tenge");

// const convert = (element, targets, isTrue) => {
//   element.oninput = (event) => {
//     const request = new XMLHttpRequest();
//     request.open('GET', '../JSON/convert.json');
//     request.setRequestHeader("Content-Type", "application/json");
//     request.send();
//     request.onload = () => {
//       const response = JSON.parse(request.response);
//       const responses = [response.usd, response.eur, response.frank, response.yen, response.tenge];
//       const targetSom = targets.find(targetElement => targetElement === som);
//       let forStatus;
//       targets.forEach((target, i) => {
//         if (isTrue) {
//           target.value = (element.value / responses[i]).toFixed(2);
//           forStatus = false
//         } else {
//           if (target === targetSom) {
//             target.value = (element.value * responses[i]).toFixed(2);
//           }
//           forStatus = true;
//         }
//       });
//       if(forStatus){
//         for (var j = 0; j < targets.length; j++) {
//             if (targets[j] !== targetSom) {
//             targets[j].value = (targetSom.value / responses[j]).toFixed(2);
//             console.log(targets[j]);
//             }
//         }
//     }
//       if (element.value === '') {
//         targets.forEach(target => {
//           target.value = '';
//         });
//       }
//     };
//   };
// };

const convert = (element, targets, isTrue) => {
  element.oninput = async (event) => {
    try {
      const response = await fetch('../JSON/convert.json')
      const data = await response.json()
      const responses = [data.usd, data.eur, data.frank, data.yen, data.tenge];
      const targetSom = targets.find(targetElement => targetElement === som);
      let forStatus;
      targets.forEach((target, i) => {
        if (isTrue) {
          target.value = (element.value / responses[i]).toFixed(2);
          forStatus = false;
        } else {
          if (target === targetSom) {
            target.value = (element.value * responses[i]).toFixed(2);
          }
          forStatus = true;
        }
      });
      if (forStatus) {
        for (var j = 0; j < targets.length; j++) {
          if (targets[j] !== targetSom) {
            targets[j].value = (targetSom.value / responses[j]).toFixed(2);
          }
        }
      }
      if (element.value === '') {
        targets.forEach(target => {
          target.value = '';
        });
      }

    } catch (error) {
      console.error('Ошибка при загрузке данных:', error);
    }
  }
};

convert(som, [usd, eur, frank, yen, tenge], true);
convert(usd, [som, eur, frank, yen, tenge], false);
convert(eur, [usd, som, frank, yen, tenge], false);
convert(frank, [usd, eur, som, yen, tenge], false);
convert(yen, [usd, eur, frank, som, tenge], false);
convert(tenge, [usd, eur, frank, yen, som], false);

//* CARD SWITHCER

const card = document.querySelector(".card");
const btnNext = document.querySelector("#btn-next");
const btnPrev = document.querySelector("#btn-prev");
let count = 1;
const CARD_URL = 'https://jsonplaceholder.typicode.com/todos/'

// const fecthCardById = (index) => {
//   fetch(`https://jsonplaceholder.typicode.com/todos/${index}`)
//     .then((response) => {
//       if (!response.ok) {
//         throw new Error("Error");
//       } else {
//         return response.json();
//       }
//     })
//     .then((data) => {
//       updateCard(data);
//     })
//     .catch((error) => {
//       console.error("error", error);
//     });
// };

const fecthCardById = async (index) => {
  try {
    const response = await fetch(`${CARD_URL}${index}`);
    const data = await response.json()
    updateCard(data);
  } catch (error) {
    console.error('Ошибка при загрузке данных:', error);
  }
  
}

const updateCard = (data) => {
  card.innerHTML = `
    <p>${data.title}</p>
    <p style="color: ${data.completed ? "green" : "red"}">${data.completed}</p>
    <span>${data.id}</span>
  `;
  card.style.boxShadow = `0 0 60px ${data.completed ? "green" : "red"}`;
  card.style.border = `1px solid ${data.completed ? "green" : "red"}`;
};

btnNext.onclick = () => {
  if (count < 200) {
    count++;
  } else {
    count = 1;
  }
  fecthCardById(count);
};

btnPrev.onclick = () => {
  if (count > 1) {
    count--;
  } else {
    count = 200;
  }
  fecthCardById(count);
};

fecthCardById(count);

// btnNext.onclick = () => {
//   count++;
//   fetch(`https://jsonplaceholder.typicode.com/todos/${count}`)
//     .then(response => response.json())
//     .then(data => {
//       card.innerHTML = `
//         <p>${data.title}</p>
//         <p style="color: ${data.completed ? 'green': 'red'}">${data.completed}</p>
//         <span>${data.id}</span>
//       `
//       console.log(data);
//     })
// }

//* RANDOM CARD

const randomCard = document.querySelector(".randomCard");
let randomCount;
const RANDOM_CARD_URL = 'https://jsonplaceholder.typicode.com/posts/'

// const fecthRandomCard = (index) => {
//   fetch(`https://jsonplaceholder.typicode.com/posts/${index}`)
//     .then((response) => response.json())
//     .then((data) => {
//       randomData(data);
//     });
// };

const fecthRandomCard = async (index) => {
  try {
    const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${index}`);
    const data = await response.json()
    randomData(data);
  } catch (error) {
    console.error('Ошибка при загрузке данных:', error);
  }
  
}

const randomData = (data) => {
  randomCard.innerHTML = `
      <p>${data.title}</p>
      <p>${data.body}</p>
      <span>${data.id}</span>
    `;
};
const randomIndex = (length) => {
  randomCount = Math.floor(Math.random() * length) + 1;
  fecthRandomCard(randomCount);
};

randomIndex(100);

setInterval(() => {
  randomIndex(100);
}, 4000);

// const response = fetch('https://jsonplaceholder.typicode.com/posts/')
// .then(response => response.json())
// .then(data => console.log(data.length));

// WEATHER API

const cityName = document.querySelector(".cityName");
const city = document.querySelector(".city");
const temp = document.querySelector(".temp");

const apiKey = "e417df62e04d3b1b111abeab19cea714";
const BASE_URL = "https://api.openweathermap.org/data/2.5/weather";

// const fecthWeather = (city) => {
//   fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${process.env.API_KEY}`)
//    .then(response => response.json())
//    .then(data => {
//       weatherData(data)
//     })
// }

const citySearch = () => {
  cityName.oninput = async() => {
    try {
      const response = await fetch(`${BASE_URL}?q=${cityName.value}&units=metric&appid=${apiKey}`)
      const data = await response.json()
      city.innerHTML = data?.name || 'Город не найден...'
      temp.innerHTML = data?.main?.temp ? Math.round(data?.main?.temp) + `&deg;C` : '...'
    } catch (error) {
      console.error('Ошибка при загрузке данных:', error);
    }
  }
};

citySearch();
