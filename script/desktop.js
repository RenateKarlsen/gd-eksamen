// DOM
const popularItemsMenu = document.getElementById("popular-items-menu");
const mainMenu = document.getElementById("main-menu");
const drinksMenuButton = document.getElementById("drinks-menu-button");
const desertsMenuButton = document.getElementById("deserts-menu-button")

let counter = 0;

// CREATES DRINK ITEMS
const createDrinkItem = (drinkItem) => {
    const drinkItemCard = document.createElement("div");
    drinkItemCard.id = "drink-item-card";
    drinkItemCard.innerHTML =  `
    <img src=${drinkItem.imagePath} alt=${drinkItem.drinkName} width="100" height="100"> 
    <h4>${drinkItem.drinkName}</h4>
    <p>${drinkItem.price.small}, ${drinkItem.price.medium}, ${drinkItem.price.big}</p>
    `;

    return drinkItemCard;
};

// RENDERS DRINKITEMS IN DRINK MENU
const renderDrinkMenu = () => {
    counter++;
    drinkItems.map(drinkItem => {
        const drinkMenu = createDrinkItem(drinkItem);
        if (drinkItem.isDrinkPopular === true) {
            popularItemsMenu.appendChild(drinkMenu);
        } else {
            mainMenu.appendChild(drinkMenu);
        }
    });

// NØDLØSNING FOR Å FÅ VEKK DRANKSA (Tømmer menyen når antall klikk er partall)
    if (counter%2 == 0) {
        popularItemsMenu.innerHTML = "";
        mainMenu.innerHTML = "";
    }
};

// CREATES DESERT ITEMS
const createDesertItem = (desertItem) => {
    const desertItemCard = document.createElement("div");
    desertItemCard.id = "desert-item-card";
    desertItemCard.innerHTML =  `
    <img src=${desertItem.imagePath} alt=${desertItem.drinkName} width="100" height="100"> 
    <h4>${desertItem.desertName}</h4>
    <p>${desertItem.price}</p>
    `;

    return desertItemCard;
};

// RENDERS DESERT ITEMS IN DESERT MENU
const renderDesertMenu = () => {
    counter++;
    desertItems.map(desertItem => {
        const desertMenu = createDesertItem(desertItem);
        if (desertItem.isDesertPopular === true) {
            popularItemsMenu.appendChild(desertMenu);
        } else {
            mainMenu.appendChild(desertMenu);
        }
    });

// NØDLØSNING FOR Å FÅ VEKK DRANKSA (Tømmer menyen når antall klikk er partall)
    if (counter%2 == 0) {
        popularItemsMenu.innerHTML = "";
        mainMenu.innerHTML = "";
    }
};