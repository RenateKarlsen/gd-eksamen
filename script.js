const popularItemsMenu = document.getElementById("popular-items-menu");
const mainMenu = document.getElementById("main-menu");
const drinksMenuButton = document.getElementById("drinks-menu-button");


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

const renderDrinkMenu = () => {
    drinkItems.map(drinkItem => {
        const drinkMenu = createDrinkItem(drinkItem);
        if (drinkItem.isDrinkPopular === true) {
            popularItemsMenu.appendChild(drinkMenu);
        } else {
            mainMenu.appendChild(drinkMenu);
        }
    });
}
