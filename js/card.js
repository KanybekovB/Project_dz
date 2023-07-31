const innerCards = document.querySelector('.inner_cards')
const POST_CARD = 'https://jsonplaceholder.typicode.com/posts'

const postCards = async (count) => {
    try {
        const response = await fetch(POST_CARD);
    const data = await response.json();
    data.forEach((cardInfo) => {
        const card = document.createElement('div');
        card.classList.add('randomPostCard');
        card.innerHTML = `
            <div class="card-body">
                <img src="https://picsum.photos/id/${getRandomCount(1, 85)}/300/200" class="card-img-top"> 
                <div class="card-text">
                    <b>${cardInfo.title}</b>
                    <p>${cardInfo.body}</p>
                </div>
            </div>
    `;
    innerCards.appendChild(card);
    });
    } catch (error) {
        console.error('Ошибка при загрузке данных:', error);   
    }
}


function getRandomCount(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

postCards()