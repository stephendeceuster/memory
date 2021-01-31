import Card from "./Card";

export default class Memory {
  constructor(lvl = 2) {
    this._allCards = [];
    this._lvl = lvl;
    this._firstCard = null;
    this._second = null; 
    this._playground = document.body.querySelector('.playground');

    this.fetchCards();
  }
  fetchCards(){
    fetch('icons/selection.json')
    .then((resp) => resp.json())
    .then((data) => {
      this._allCards = data.icons.map(icon => icon.properties.name);
      this.init();
    })
    .catch((error)=> console.log(error));
  }
  init() {
    this.startLevel();
  }
  startLevel() {
    const numberOfDiffentCards = this._lvl * 2;
    const playCards = this._allCards.sort(() => 0.5 - Math.random()).slice(0, numberOfDiffentCards);
    const allPlayCards = this.shuffleCards([...playCards,...playCards]);
    console.log(allPlayCards);
    allPlayCards.forEach(element => {
        new Card(this._playground, element);
    });
  }
  shuffleCards(cards) {
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

}  
