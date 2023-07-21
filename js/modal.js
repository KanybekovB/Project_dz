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

modal.onclick = (event) => event.target === modal  && closeModal()

function scrollFn() {
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
        openModal()
        removeEventListener('scroll', scrollFn)
    }
  }
  
window.addEventListener('scroll', scrollFn);
