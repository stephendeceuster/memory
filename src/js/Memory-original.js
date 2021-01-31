import Card from "./Card";

class Memory {
  constructor(lvl = 1) {
    this._allIcons = [];
    this._lvl = lvl;
    this._username = username;
    this._first = null;
    this._second = null;
    this._selected = ["leaf"];
    this._turned = ["home"];
    if (localStorage.getItem("xyz")) {
      const persistedData = JSON.parse(localStorage.getItem("xyz"));
      this._lvl = persistedData.lvl;
      this._allIcons = persistedData.icons;
      this.init();
      //...
    } else {
      this.fetchIcons();
    }
    //setUpEvents => luisteren naar flipped eventTypes
  }
  saveToPersist() {
    localStorage.setItem(
      "xyz",
      JSON.stringify({
        lvl: this._level,
        icons: this._allIcons,
      })
    );
  }
  fetchIcons() {
    fetch(URL)
      .then((response) => response.json())
      .then((data) => {
        this._allIcons = data.icons.map((el) => el.properties.name);
        this.init();
      })
      .catch((error) => console.log(error));
  }
  init() {
    //initiele html opbouwen (<div id="grid"></div>)
    this.startLevel();
  }
  startLevel() {
    // op basis van levelnr
    //x aantal Card plaatsen in #grid
    //op basis van levelNr aantal unieke items uit array halen
    new Card(".grid", "pencil||home||gear||tree||leaf");
    const result = ["leaf", "gear"];
    const allCards = [...result, ...result];
    //how to shuffle array
    //allCards.shuffle()
    // 1 => 2unieke => 4
    // 2 => 4unieke => 8
    // 3 => 8unieke => 16
  }
  setUpEvents() {
    // window.addEventListener("flipped", function(e) {
    //     console.log(e.detail._icon);
    //   });
  }
}
