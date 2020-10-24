// DOM
const menuSection = document.getElementById("menu-section");
const popularItemsMenuContainer = document.getElementById("popular-items-menu-container");
const mainMenuContainer = document.getElementById("main-menu-container");
const drinksMenuButton = document.getElementById("drinks-menu-button");
const dessertsMenuButton = document.getElementById("desserts-menu-button");
const main = document.getElementsByTagName("main");

const handleMenu = (menuButton) => {
    if (menuSection.querySelector('#order-history-container') !== null) {
        removeChildNodes(menuSection);
        menuSection.appendChild(popularItemsMenuContainer);
        menuSection.appendChild(mainMenuContainer);
    }

    if (!mainMenuContainer.hasChildNodes()) {
        createMenu(menuButton);
    } else {
        updateMenu(menuButton);
    }
};

const createMenu = (buttonClicked) => {
    const popularItemsMenuHeader = document.createElement("div");
    popularItemsMenuHeader.id = "popular-items-menu-header";
    popularItemsMenuHeader.innerHTML = `
        <img src="images/icons/heart.png" alt="Hjerte" width="30px" height="30px">
        <h3>POPULÆRE</h3>
    `;
    popularItemsMenuContainer.appendChild(popularItemsMenuHeader);

    const popularItemsMenu = document.createElement("div");
    popularItemsMenu.id = "popular-items-menu";
    popularItemsMenuContainer.appendChild(popularItemsMenu);

    const mainMenu = document.createElement("div");
    mainMenu.id = "main-menu";
    mainMenuContainer.appendChild(mainMenu);

    if (buttonClicked === "drinks-menu-button") {
        renderDrinks();
    } else {
        renderDesserts();
    }
};

const updateMenu = (buttonClicked) => {

    const drinkItemCards = document.getElementsByClassName("drink-item-card");
    const dessertItemCards = document.getElementsByClassName("dessert-item-card");

    if (buttonClicked === "drinks-menu-button" && drinkItemCards.length > 0 ||
        buttonClicked === "desserts-menu-button" && dessertItemCards.length > 0) {
        removeChildNodes(popularItemsMenuContainer);
        removeChildNodes(mainMenuContainer);
        popularItemsMenuContainer.style.border = "1px solid var(--lighter-gray-color)";
        mainMenuContainer.style.border = "1px solid var(--lighter-gray-color)";
    } else {
        if (buttonClicked === "drinks-menu-button") {
            renderDrinks()
        } else {
            renderDesserts()
        }
    }
};

// CREATES DRINK ITEMS
const createDrinkItem = (drinkItem) => {
    const drinkItemCard = document.createElement("div");
    drinkItemCard.className = "item-card drink-item-card";
    drinkItemCard.alt = drinkItem.drinkName;
    drinkItemCard.setAttribute("onclick", "renderOptions()");
    drinkItemCard.innerHTML = `
        <img src=${drinkItem.imagePath} alt=${drinkItem.drinkName} width="70" height="70"> 
        <h4>${drinkItem.drinkName.toUpperCase()}</h4>
        <p>${drinkItem.price.small}, ${drinkItem.price.medium}, ${drinkItem.price.large}</p>
    `;

    return drinkItemCard;
};

// RENDERS DRINKITEMS IN DRINK MENU
const renderDrinks = () => {
    const popularItemsMenu = document.getElementById("popular-items-menu");
    const mainMenu = document.getElementById("main-menu");

    removeChildNodes(popularItemsMenu);
    removeChildNodes(mainMenu);

    drinkItems.map(drinkItem => {
        const drinkMenu = createDrinkItem(drinkItem);
        if (drinkItem.isDrinkPopular === true) {
            popularItemsMenu.appendChild(drinkMenu);
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
    dessertItemCard.alt = dessertItem.dessertName;
    dessertItemCard.setAttribute("onclick", "renderOptions()");
    dessertItemCard.innerHTML = `
        <img src=${dessertItem.imagePath} alt=${dessertItem.dessertName} width="80" height="80"> 
        <h4>${dessertItem.dessertName.toUpperCase()}</h4>
        <p>${dessertItem.price}</p>
    `;

    return dessertItemCard;
};

// RENDERS DESERT ITEMS IN DESERT MENU
const renderDesserts = () => {
    const popularItemsMenu = document.getElementById("popular-items-menu");
    const mainMenu = document.getElementById("main-menu");

    removeChildNodes(popularItemsMenu);
    removeChildNodes(mainMenu);

    dessertItems.map(dessertItem => {
        const dessertMenu = createDessertItem(dessertItem);
        if (dessertItem.isDessertPopular === true) {
            popularItemsMenu.appendChild(dessertMenu);
        }
    });

    dessertItems.map(dessertItem => {
        const dessertMenu = createDessertItem(dessertItem);
        mainMenu.appendChild(dessertMenu);
    });

    styleMenu("dessert");
};

const removeChildNodes = (container) => {
    while (container.firstChild) {
        container.removeChild(container.lastChild);
    }
}

const styleMenu = (menu) => {
    const popularItemsMenuHeader = document.getElementById("popular-items-menu-header");
    const popularItemsMenu = document.getElementById("popular-items-menu");
    const mainMenu = document.getElementById("main-menu");
    popularItemsMenuContainer.style.border = "0px";
    mainMenuContainer.style.border = "0px";

    if (menu === "drink") {
        popularItemsMenuHeader.style.backgroundColor = "var(--drinks-menu-color)";
        popularItemsMenu.style.backgroundColor = "var(--drinks-menu-color)";
        mainMenu.style.backgroundColor = "var(--drinks-menu-color)";
    } else if (menu === "dessert") {
        popularItemsMenuHeader.style.backgroundColor = "var(--desserts-menu-color)";
        popularItemsMenu.style.backgroundColor = "var(--desserts-menu-color)";
        mainMenu.style.backgroundColor = "var(--desserts-menu-color)";
    }
};

const revealOrderHistorySection = () => {
    const orderHistoryContainer = document.createElement("div");
    const orderContainer = document.createElement("div");

    if (menuSection.querySelector('#order-history-container') === null) {
        menuSection.removeChild(popularItemsMenuContainer);
        menuSection.removeChild(mainMenuContainer);

        orderHistoryContainer.id = "order-history-container";
        orderHistoryContainer.innerHTML = `
            <div id="order-history-container-header">
                <i class="fa fa-cloud fa-5x"></i>
                <h2>TIDLIGERE<br>BESTILLINGER</h2>
            </div>
            <div id="order-list"></div>
        `;
        menuSection.appendChild(orderHistoryContainer);

        orderContainer.id = "order-container";
        menuSection.appendChild(orderContainer);
    } else {
        removeChildNodes(menuSection);
        menuSection.appendChild(popularItemsMenuContainer);
        menuSection.appendChild(mainMenuContainer);
    }
};

const renderActiveUserAccount = () => {
    const userAccountHeader = document.getElementById("user-account-header");

    db.transaction(function (tx) {
        tx.executeSql('SELECT * FROM activeUserAccount LIMIT 1', [], function (tx, results) {
            let len = results.rows.length, i;

            // Check if no users is selected in the DB redirect to the login page
            if (screen.width >= 1000) {
                if (len === 0) {
                    window.location.href = 'desktop-login.html';
                }
            }

            for (i = 0; i < len; i++) {
                const activeUserAccountDisplay = document.createElement("div");
                activeUserAccountDisplay.id = "active-user-account-display";
                activeUserAccountDisplay.innerHTML = `
                    <img src="images/employees/${results.rows.item(i).image}" alt="${results.rows.item(i).firstName} ${results.rows.item(i).lastName} (ansatt)">
                    <h2>${results.rows.item(i).firstName} ${results.rows.item(i).lastName}</h2>
                `;

                userAccountHeader.appendChild(activeUserAccountDisplay);
            }
        })
    })
};


const renderOptions = () => {
//Gets index based on name from alt-text (getIndex.js) - kinda jalla but it works!
getIndex();

//Removes menus so the boxes disappears
menuSection.removeChild(popularItemsMenuContainer);
menuSection.removeChild(mainMenuContainer);

        const optionsMenu = document.createElement("div");
        optionsMenu.id = "options-menu";
        
        // Itemindex lower than 10 = drinks, higher than 10 = desserts.
        if (itemIndex < 10) {
            optionsMenu.style.backgroundColor = "var(--drinks-menu-color)";
            optionsMenu.innerHTML = `
            <div class="grid-item0">
                <h4>${drinkItems[itemIndex].drinkName}</h4> 
                <img id="drinkImg"src=${drinkItems[itemIndex].imagePath} alt=${drinkItems[itemIndex].drinkName}>
            </div>

                <div class="grid-item1">
                <img  id= "coffeeSmall" src="Images/Icons/coffeecup.png">
                <h4 id="smallTxt">${drinkItems[itemIndex].price.small}kr</h4>
                </div>

                <div class="grid-item2">
                <img  id="coffeeMedium"src="Images/Icons/coffeecup.png">
                <h4 id="mediumTxt">${drinkItems[itemIndex].price.medium}kr</h4>
                </div>

                <div class="grid-item3">
                <img id="coffeeLarge"src="Images/Icons/coffeecup.png">
                <h4 id="largeTxt">${drinkItems[itemIndex].price.large}kr</h4>
                </div>

                <button id="back-btn" onclick="back()"> X </button>
       `;

        } else {
            let dessertItemIndex = itemIndex - 10;
            optionsMenu.style.backgroundColor = "var(--desserts-menu-color)";
            optionsMenu.innerHTML = `
            <div class="grid-item0">
                <h4>${dessertItems[dessertItemIndex].dessertName}</h4> 
                <img id="drinkImg"src=${dessertItems[dessertItemIndex].imagePath} alt=${dessertItems[dessertItemIndex].dessertName}>
            </div>

                <div class="grid-item1">
                <img  id= "coffeeSmall" src="Images/Icons/coffeecup.png">
                <h4 id="smallTxt">${dessertItems[dessertItemIndex].price}kr</h4>
                </div>

                <button id="back-btn" onclick="back()"> X </button>`; 
            }

    menuSection.appendChild(optionsMenu);
}

// The back button on options menu
const back = () => {
    const optionsMenu = document.getElementById("options-menu");
    menuSection.removeChild(optionsMenu);
    menuSection.appendChild(popularItemsMenuContainer);
    menuSection.appendChild(mainMenuContainer);
    };


renderActiveUserAccount();

