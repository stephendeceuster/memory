import Card from "./Card";

export default class Memory {
  constructor(lvl = 1) {
    this._allCards = [];
    this._lvl = lvl;
    //this._username = username;
    this._playground = document.body.querySelector('.playground');

    this._firstCard = null;
    this._secondCard = null; 
    this._foundCards = [];
    this._allPlayCardsLength = null;

    //this._username = prompt('Wat is uw naam?');
    this.fetchCards();
    this.setUpEvents();
  }

  fetchCards = () => {
    fetch('icons/selection.json')
    .then((resp) => resp.json())
    .then((data) => {
      this._allCards = data.icons.map(icon => icon.properties.name);
      this.init();
    })
    .catch((error)=> console.log(error));
  }

  init = () =>{
    alert(`Klaar voor level ${this._lvl} !`);

    this.startLevel();
  }

  startLevel = () => {
    const numberOfDiffentCards = this._lvl * 2;
    const playCards = this._allCards.sort(() => 0.5 - Math.random()).slice(0, numberOfDiffentCards);
    const allPlayCards = this.shuffleCards([...playCards,...playCards]);
    this._allPlayCardsLength = allPlayCards.length;
    //this._playground.innerHTML = '';
    allPlayCards.forEach(element => {
        new Card(this._playground, element);
    });
  }

  shuffleCards = (cards) => {
    let ctr = cards.length, temp, index;
    while(ctr > 0) {
      index = Math.floor(Math.random() * ctr);
      ctr--;
      temp = cards[ctr];
      cards[ctr] = cards[index];
      cards[index] = temp;
    }
    return cards;
  }

  setUpEvents = () => {
    window.addEventListener("flipped", (e) => this.setValues(e));
  }
  
  setValues = (e) => {
    if (!this._firstCard) {
      this._firstCard = e.detail;
    } else {
      this._secondCard = e.detail;
      setTimeout(() => this.checkValues(), 1000);
    }
  }

  checkValues = () => {
    if (this._firstCard._icon === this._secondCard._icon) {
      this._firstCard._ref.classList.add('matched');
      this._secondCard._ref.classList.add('matched');
      this._foundCards.push(this._firstCard, this._secondCard);
      this.resetCards();

      if (this._foundCards.length === this._allPlayCardsLength) {
        this.finishGame();
      }
    } else {
      this._firstCard._isFlipped = false;
      this._secondCard._isFlipped = false;

      this._firstCard._ref.classList.remove('flipped');
      this._secondCard._ref.classList.remove('flipped');
      
      this.resetCards();
    }
  }

  resetCards = () => {
    this._firstCard = null;
    this._secondCard = null;
  }

  finishGame = () => {
    this._foundCards = [];
    this._allPlayCardsLength = null;
    console.log('game finished');
    alert(`Level ${this._lvl} uitgespeeld!`);
    this._lvl++;
    this._playground.innerHTML = '';
    this.init();
  }
}  
