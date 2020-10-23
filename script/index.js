// DOM
const popularItemsMenuContainer = document.getElementById("popular-items-menu-container");
const mainMenuContainer = document.getElementById("main-menu-container");
const drinksMenuButton = document.getElementById("drinks-menu-button");
const dessertsMenuButton = document.getElementById("desserts-menu-button");
const main = document.getElementsByTagName("main");

const createMenus = (menuButton) => {
    if (!popularItemsMenuContainer.hasChildNodes()) {
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

        if (menuButton === "drinks-menu-button") {
            renderDrinkMenu()
        } else {
            renderDessertMenu()
        }
    } else {
        while (popularItemsMenuContainer.firstChild) {
            popularItemsMenuContainer.removeChild(popularItemsMenuContainer.lastChild);
        }

        while (mainMenuContainer.firstChild) {
            mainMenuContainer.removeChild(mainMenuContainer.lastChild);
        }

        popularItemsMenuContainer.style.border = "1px solid var(--lighter-gray-color)";
        mainMenuContainer.style.border = "1px solid var(--lighter-gray-color)";
    }
}

// CREATES DRINK ITEMS
const createDrinkItem = (drinkItem) => {
    const drinkItemCard = document.createElement("div");
    drinkItemCard.className = "item-card drink-item-card";
    drinkItemCard.setAttribute("onclick", "renderTrengerEtBraNavn()");
    drinkItemCard.innerHTML = `
        <img src=${drinkItem.imagePath} alt=${drinkItem.drinkName} width="70" height="70"> 
        <h4>${drinkItem.drinkName.toUpperCase()}</h4>
        <p>${drinkItem.price.small}, ${drinkItem.price.medium}, ${drinkItem.price.large}</p>
    `;

    return drinkItemCard;
};

// RENDERS DRINKITEMS IN DRINK MENU
const renderDrinkMenu = () => {
    const popularItemsMenu = document.getElementById("popular-items-menu");
    const mainMenu = document.getElementById("main-menu");
    emptyMenus();

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
    dessertItemCard.innerHTML = `
        <img src=${dessertItem.imagePath} alt=${dessertItem.drinkName} width="80" height="80"> 
        <h4>${dessertItem.dessertName.toUpperCase()}</h4>
        <p>${dessertItem.price}</p>
    `;

    return dessertItemCard;
};

// RENDERS DESERT ITEMS IN DESERT MENU
const renderDessertMenu = () => {
    const popularItemsMenu = document.getElementById("popular-items-menu");
    const mainMenu = document.getElementById("main-menu");
    emptyMenus();

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

const emptyMenus = () => {
    const popularItemsMenu = document.getElementById("popular-items-menu");
    const mainMenu = document.getElementById("main-menu");

    while (popularItemsMenu.firstChild) {
        popularItemsMenu.removeChild(popularItemsMenu.lastChild);
    }

    while (mainMenu.firstChild) {
        mainMenu.removeChild(mainMenu.lastChild);
    }
};

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
    });
}

const renderTrengerEtBraNavn = () => {
    createMenus();
    for (i = 0; i < 1; i++) {
        main[i].style.backgroundColor = "var(--drinks-menu-color)";
        main[i].innerHTML = `
        <p>${"Hei:/"}</p>
        `;

    }
    
}

renderActiveUserAccount();


