export default class Card {
  constructor(holder, icon) {
    this._holder = holder;
    this._icon = icon;
    this._flippedEvent = new CustomEvent("flipped", {detail: this});
    this._ref = this.init();
    this._isFlipped = false;
    //this.setUpEvents();
  }
  init = () => {
    this._holder.insertAdjacentHTML(
      "beforeend",
      `
      <div class="card">
        <div class="card-inner">
          <div class="card-front">
          
          </div>
          <div class="card-back">
            <svg class="icon icon-${this._icon}"><use xlink:href="./icons/symbol-defs.svg#icon-${this._icon}"></use></svg>
          </div>
        </div>
      </div>
      ` 
    );
    return this._holder.querySelector('.card:last-child');
  }

  setUpEvents = () => {
    this._ref.addEventListener('click', () => flip);
  }

  flip = () => {
    if (this._isFlipped) {
      
    }
  }
}