
function generateCards() {
    const cardContainer = Nimble.grab("right-card-container");
    for (let i = 0; i < 8; i++) {
      const card = document.createElement('div');
      card.classList.add('card');
      card.id = i;
      card.innerHTML = `
        <h2>User ${i + 1}</h2>
        <div class="line"></div>
        <p>Dis do be the user</p>
      `;
      cardContainer.appendChild(card);
    }
  
    const addMoreButton = document.createElement('div');

    addMoreButton.classList.add('add-more');
    addMoreButton.innerText = 'Add More';
    cardContainer.appendChild(addMoreButton);
  }
  
  generateCards();