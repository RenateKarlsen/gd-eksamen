// DOM
const popularItemsMenu = document.getElementById("popular-items-menu");
const popularItemsMenuContainer = document.getElementById("popular-items-menu-container");
const mainMenu = document.getElementById("main-menu");
const drinksMenuButton = document.getElementById("drinks-menu-button");
const dessertsMenuButton = document.getElementById("desserts-menu-button")

// CREATES DRINK ITEMS
const createDrinkItem = (drinkItem) => {
    const drinkItemCard = document.createElement("div");
    drinkItemCard.className = "item-card drink-item-card";
    drinkItemCard.innerHTML = `
        <img src=${drinkItem.imagePath} alt=${drinkItem.drinkName} width="100" height="100"> 
        <h4>${drinkItem.drinkName}</h4>
        <p>${drinkItem.price.small}, ${drinkItem.price.medium}, ${drinkItem.price.big}</p>
    `;

    return drinkItemCard;
};

// RENDERS DRINKITEMS IN DRINK MENU
const renderDrinkMenu = () => {
    emptyMenus();

    drinkItems.map(drinkItem => {
        const drinkMenu = createDrinkItem(drinkItem);
        if (drinkItem.isDrinkPopular === true) {
            popularItemsMenuContainer.appendChild(drinkMenu);
        }
    });

    drinkItems.map(drinkItem => {
        const drinkMenu = createDrinkItem(drinkItem);
            mainMenu.appendChild(drinkMenu);
    });

    styleMenu("drink");
};

// CREATES DESERT ITEMS
const createDessertItem = (dessertItem) => {
    const dessertItemCard = document.createElement("div");
    dessertItemCard.className = "item-card dessert-item-card";
    dessertItemCard.innerHTML = `
        <img src=${dessertItem.imagePath} alt=${dessertItem.drinkName} width="100" height="100"> 
        <h4>${dessertItem.dessertName}</h4>
        <p>${dessertItem.price}</p>
    `;

    return dessertItemCard;
};

// RENDERS DESERT ITEMS IN DESERT MENU
const renderDessertMenu = () => {
    emptyMenus();

    dessertItems.map(dessertItem => {
        const dessertMenu = createDessertItem(dessertItem);
        if (dessertItem.isDessertPopular === true) {
            popularItemsMenuContainer.appendChild(dessertMenu);
        }
    });

    dessertItems.map(dessertItem => {
        const dessertMenu = createDessertItem(dessertItem);
            mainMenu.appendChild(dessertMenu);
    });

    styleMenu("dessert");
};

const emptyMenus = () => {
    while (popularItemsMenuContainer.firstChild) {
        popularItemsMenuContainer.removeChild(popularItemsMenuContainer.lastChild);
    }

    while (mainMenu.firstChild) {
        mainMenu.removeChild(mainMenu.lastChild);
    }
};

const styleMenu = (menu) => {
    document.getElementById("popular-items-menu-header").style.visibility = "visible";
    popularItemsMenu.style.border = "0px";
    mainMenu.style.border = "0px";

    if (menu === "drink") {
        popularItemsMenu.style.backgroundColor = "var(--drinks-menu-color)";
        mainMenu.style.backgroundColor = "var(--drinks-menu-color)";
    } else if (menu === "dessert") {
        popularItemsMenu.style.backgroundColor = "var(--desserts-menu-color)";
        mainMenu.style.backgroundColor = "var(--desserts-menu-color)";
    }
};

const renderActiveUserAccount = () => {
    const userAccountHeader = document.getElementById("user-account-header");
    const activeUserAccount = JSON.parse(window.localStorage.getItem("activeUserAccount")) || [];

    for (const userAccount of activeUserAccount) {
        const { firstName, lastName, image } = userAccount;
        const activeUserAccountDisplay = document.createElement("div");
        activeUserAccountDisplay.id = "active-user-account-display";
        activeUserAccountDisplay.innerHTML = `
            <img src="images/employees/${userAccount.image}" alt="${userAccount.firstName} ${userAccount.lastName} (ansatt)">
            <h2>${userAccount.firstName} ${userAccount.lastName}</h2>
        `;

        userAccountHeader.appendChild(activeUserAccountDisplay);
    }
};

renderActiveUserAccount();