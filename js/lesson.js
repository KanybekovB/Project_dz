const phoneInput = document.querySelector('#phone_input');
const phoneCheck = document.querySelector('#phone_button');
const phoneResult = document.querySelector('#phone_result');

const regExp = /^\+996 \d{3} \d{2}-\d{2}-\d{2}/

phoneCheck.addEventListener('click', () => {
    if(regExp.test(phoneInput.value)) {
        phoneResult.innerHTML = 'Ok'
        phoneResult.style.color = `green`
    }else{
        phoneResult.innerHTML = 'Not ok'
        phoneResult.style.color = `red`
    }
})

//*TAB SLIDER

const tabContent = document.querySelectorAll('.tab_content_block')
const tabs = document.querySelectorAll('.tab_content_item')
const tabsParent = document.querySelector('.tab_content_items')
let indexCount;
let interval;

const hideTabContent = () => {
    tabContent.forEach(item => {
        item.style.display = 'none'
    })
    tabs.forEach(item => {
        item.classList.remove('tab_content_item_active')
    })
}

const showTabContent = (index = 0) => {
    tabContent[index].style.display = 'block'
    tabs[index].classList.add('tab_content_item_active')
    indexCount = index
}

hideTabContent()
showTabContent()

tabsParent.onclick = (event) => {
    const targetElement = event.target
    if(targetElement.classList.contains('tab_content_item')) {
        tabs.forEach((tab, tabIndex) => {
            if(targetElement === tab) {
                hideTabContent()
                showTabContent(tabIndex)
                clearInterval(interval)
                interval = setInterval(autoSlider, 3000)
            }
        })
    }
}

const autoSlider = () => {
    indexCount++;
    if(indexCount > tabs.length -1) {
        indexCount = 0
    }
    hideTabContent()
    showTabContent(indexCount)
}
interval = setInterval(autoSlider, 3000)


//* CONVERTOR

const som = document.querySelector('#som')
const usd = document.querySelector('#usd')
const eur = document.querySelector('#eur')
const won = document.querySelector('#won')
const yen = document.querySelector('#yen')

const convert = (element, targets, isTrue) => {
  element.oninput = (event) => {
    const request = new XMLHttpRequest();
    request.open('GET', '../JSON/convert.json');
    request.setRequestHeader("Content-Type", "application/json");
    request.send();
    request.onload = () => {
      const response = JSON.parse(request.response);
      const responses = [response.usd, response.eur, response.won, response.yen];
      const targetSom = targets.find(targetElement => targetElement === som);
      let forStatus;
      targets.forEach((target, i) => {
        if (isTrue) {
          target.value = (element.value / responses[i]).toFixed(2);
          forStatus = false
        } else {
          if (target === targetSom) {
            target.value = (element.value * responses[i]).toFixed(2);
          }
          forStatus = true;
        }
      });
      if(forStatus){
        for (var j = 0; j < targets.length; j++) {
            if (targets[j] !== targetSom) {
            targets[j].value = (targetSom.value / responses[j]).toFixed(2);
            console.log(targets[j]);
            }
        }
    }
      if (element.value === '') {
        targets.forEach(target => {
          target.value = '';
        });
      }
    };
  };
};

convert(som, [usd, eur, won, yen], true);
convert(usd, [som, eur, won, yen], false);
convert(eur, [usd, som, won, yen], false);
convert(won, [usd, eur, som, yen], false);
convert(yen, [usd, eur, won, som], false);