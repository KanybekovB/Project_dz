//* MODAL
const modal = document.querySelector('.modal');
const modalTrigger = document.querySelector('#btn-get');
const closeModalButton = document.querySelector('.modal_close');

const openModal = () => {
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

// setInterval(openModal, 10000)

const closeModal = () => {
    modal.style.display = 'none';
    document.body.style.overflow = '';
}

modalTrigger.onclick = () => openModal();

closeModalButton.onclick = () => closeModal();

// modal.onclick = (event) => event.target === modal  && closeModal()

function scrollFn() {
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
        openModal()
        window.removeEventListener('scroll', scrollFn)
    }
  }
  
window.addEventListener('scroll', scrollFn);
// window.onscroll = () => scrollFn();


// POST DATA

// const form = document.querySelector('.form');

// const postData = (form) => {
//     form.addEventListener('submit', (event) => {
//         event.preventDefault();

//         const request = new XMLHttpRequest();
//         request.open('POST', 'server.php');
//         request.setRequestHeader('Content-Type', 'application/json');
//         const formData = new FormData(form);
//         formData.forEach((item, i) => {
//             obj[i] = item;
//         })
//         const json = JSON.stringify(obj);
//         request.send(json);
//         request.addEventListener('load', () => {
//            if(request.status === 200 ) {
//             console.log(request.response)
//            }
//         })
        
//     })
    
// }
// postData(form)