//*GMAIL CHECK*

const gmailCheck = document.querySelector("#gmail_input");
const gmailButton = document.querySelector("#gmail_button");
const gmail_result = document.querySelector("#gmail_result");
const regExp = /\w{5}@gmail.com$/; // *ДОЛЖЕН БЫТЬ НЕ МЕНЬШЕ 5

gmailButton.addEventListener("click", () => {
  let checkGmail = regExp.test(gmailCheck.value);
  if (checkGmail === true) {
    gmail_result.innerHTML = "account is found";
    gmail_result.style.color = "green";
  } else {
    gmail_result.innerHTML = "account is not found";
    gmail_result.style.color = "red";
  }
});

//*CHILD BLOCK*

const childBlock = document.querySelector(".child_block");
let positionX = 0;
let positionY = 0;
const moveBlock = () => {
  if (positionX < 447 && positionY === 0) {
    positionX++;
    childBlock.style.left = `${positionX}px`;
    setTimeout(moveBlock, 3);
  } else if (positionX >= 447 && positionY < 447) {
    positionY++;
    childBlock.style.top = `${positionY}px`;
    setTimeout(moveBlock, 3);
  } else if (positionX > 0 && positionY >= 447) {
    positionX--;
    childBlock.style.left = `${positionX}px`;
    setTimeout(moveBlock, 3);
  } else if (positionX === 0 && positionY <= 447) {
    positionY--;
    childBlock.style.top = `${positionY}px`;
    setTimeout(moveBlock, 3);
  }
};

moveBlock();

//*STOP WATCH* with 'setInterval' FULL VERSION

const ml_Seconds = document.querySelector("#ml-seconds");
const seconds = document.querySelector("#seconds");
const minutes = document.querySelector("#minutes");

const start = document.querySelector("#start");
const stop = document.querySelector("#stop");
const reset = document.querySelector("#reset");
const resume = document.querySelector("#resume");

let mlSeconds_start = 0;
let seconds_start = 0;
let minutes_start = 0;
let interval; // * ДЛЯ ПОЛУЧЕНИЯ 'setInterval' и дальнейшего взаимодействия с ним
let isRunning = false; // * ДЛЯ ТОГО ЧТО БЫ ПРОВЕРИТЬ В КАКОМ СОСТОЯНИИ СЕКУНДОМЕР В РАБОЧЕМ ИЛИ НЕТ
let stopWatchStatus = false;

function start_button() {
  mlSeconds_start++;
  ml_Seconds.innerHTML = `${mlSeconds_start}`;
  if (mlSeconds_start === 99) {
    seconds_start++;
    seconds.innerHTML = `${seconds_start}`;
    mlSeconds_start = 0;
  }
  if (seconds_start === 59) {
    minutes_start++;
    minutes.innerHTML = `${minutes_start}`;
    seconds_start = 0;
  }
}

function resetTimer() {
  clearInterval(interval);
  mlSeconds_start = 0;
  seconds_start = 0;
  minutes_start = 0;
  ml_Seconds.innerHTML = "00";
  seconds.innerHTML = "00";
  minutes.innerHTML = "00";
  isRunning = false;
}

let startResume = () => {
  if (!isRunning) {
    clearInterval(interval);
    interval = setInterval(start_button, 16);
    isRunning = true;
  }
};

start.onclick = () => {
  startResume();
  stopWatchStatus = true;
};

stop.onclick = () => {
  if (!stopWatchStatus) {
    alert(
      `Секундомер ещё не запущен! Нажмите на кнопку ${start.innerHTML} для запуска.`
    );
  } else {
    clearInterval(interval);
    isRunning = false;
  }
};

reset.onclick = () => {
  if (!stopWatchStatus) {
    alert(
      `Секундомер ещё не запущен! Нажмите на кнопку ${start.innerHTML} для запуска.`
    );
  } else {
    resetTimer();
    stopWatchStatus = false;
  }
};

resume.onclick = () => {
  if (!stopWatchStatus) {
    alert(
      `Секундомер ещё не запущен! Нажмите на кнопку ${start.innerHTML} для запуска.`
    );
  } else {
    startResume();
  }
};

//* CARD WITH DATA
const peopleCards = document.querySelector("peopleCards");
const cardContainer = document.querySelector(".cardContainer");
const modalPeople = document.querySelector(".modalPeople");
const modalContent = document.querySelector(".modalContent");
const modalInfo = document.querySelector(".modalInfo");
const cardClose = document.querySelector(".cardClose");

const peopleInfo = document.createElement("div");
peopleInfo.setAttribute("class", "peopleInfo");

// const modalContent = document.createElement('div')
// modalContent.setAttribute('class', 'modalContent ')

// const modalPeople = document.createElement('div')
// modalPeople.setAttribute('class', 'modalPeople modal')
// const afterModal = document.querySelector(".modal")
// modalPeople.append(modalContent)
// afterModal.insertAdjacentElement('afterend', modalPeople)
// const request = new XMLHttpRequest();
// request.open("GET", "../JSON/peoples.json");
// request.setRequestHeader("Content-Type", "application/json");
// request.send();
// request.addEventListener("load", () => {
//   const data = JSON.parse(request.response);
//   data.forEach((people) => {
//     const peopleCard = document.createElement("div");
//     peopleCard.setAttribute("class", "peopleCard");
//     peopleCard.innerHTML = `
//         <div class="peoplePhoto">
//             <img src="${people.photo}"/>
//         </div>
//         <span>${people.surname} ${people.name}</span>
//         <span>Age: ${people.age}</span>
//         <span>Race: ${people.race}</span>
//         <span>Gender: ${people.gender}</span>   
//         `;
//     cardContainer.append(peopleCard);

//     peopleCard.onclick = () => {
//       modalPeople.style.display = "block";
//       document.body.style.overflow = "hidden";
//       peopleInfo.innerHTML = `
//           <div class="photoInfo">
//             <div class="fullPhoto">
//               <img src="${people.photo}"/>
//             </div>
//             <div class="info">
//               <span>Name: ${people.name}</span>
//               <span>Surname: ${people.surname}</span>
//               <span>Age: ${people.age}</span>
//               <span>Height: ${people.height}</span>
//               <span>Race: ${people.race}</span>
//               <span>Gender: ${people.gender}</span>
//               <span>Profession: ${people.profession}</span>
//               <span>From Anime: ${people.fromAnime}</span>
//             </div>
//           </div>

//           <div class="biography">
//             <span>Biography: ${people.biography}</span>
//           </div>
//           `;
//       modalInfo.append(peopleInfo);
//     };
//     const closeCardModal = () => {
//       modalPeople.style.display = "none";
//       document.body.style.overflow = "auto";
//       peopleInfo.remove();
//     };
//     cardClose.onclick = () => closeCardModal();
//     modalPeople.onclick = (event) =>
//       event.target === modalPeople && closeCardModal();
//   });
// });

const fetchUserData = async () => {
  try {
    const response = await fetch("../JSON/peoples.json");
    const data = await response.json();
    data.forEach(peopleData)
  } catch (error) {
    console.error('Ошибка при загрузке данных:', error);
  }
  
};

const peopleData = (people) => {
  const peopleCard = document.createElement("div");
  peopleCard.setAttribute("class", "peopleCard");
  peopleCard.innerHTML = `
      <div class="peoplePhoto">
          <img src="${people.photo}"/>
      </div>
      <span>${people.surname} ${people.name}</span>
      <span>Age: ${people.age}</span>
      <span>Race: ${people.race}</span>
      <span>Gender: ${people.gender}</span>   
      `;
  cardContainer.append(peopleCard)
  
  peopleCard.onclick = () => {
    modalPeople.style.display = "block";
    document.body.style.overflow = "hidden";
    peopleInfo.innerHTML = `
        <div class="photoInfo">
          <div class="fullPhoto">
            <img src="${people.photo}"/>
          </div>
          <div class="info">
            <span>Name: ${people.name}</span>
            <span>Surname: ${people.surname}</span>
            <span>Age: ${people.age}</span>
            <span>Height: ${people.height}</span>
            <span>Race: ${people.race}</span>
            <span>Gender: ${people.gender}</span>
            <span>Profession: ${people.profession}</span>
            <span>From Anime: ${people.fromAnime}</span>
          </div>
        </div>

        <div class="biography">
          <span>Biography: ${people.biography}</span>
        </div>
        `;
    modalInfo.append(peopleInfo);
    const closeCardModal = () => {
            modalPeople.style.display = "none";
            document.body.style.overflow = "auto";
            peopleInfo.remove();
          };
          cardClose.onclick = () => closeCardModal();
          modalPeople.onclick = (event) =>
            event.target === modalPeople && closeCardModal();
  }
}

fetchUserData();

