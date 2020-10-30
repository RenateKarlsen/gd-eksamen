// DOM
const menuSection = document.getElementById("menu-section");
const popularItemsMenuContainer = document.getElementById("popular-items-menu-container");
const mainMenuContainer = document.getElementById("main-menu-container");
const drinksMenuButton = document.getElementById("drinks-menu-button");
const dessertsMenuButton = document.getElementById("desserts-menu-button");
const mainNavigationSection = document.getElementById("main-navigation-section");
const body = document.getElementsByTagName("body")[0];
const html = document.getElementsByTagName("html")[0];
const mediaQuery = window.matchMedia("(max-width: 600px)")

const handleMenu = (menuButton) => {
    if (mediaQuery.matches) {
        menuSection.style.display = "grid";
        mainNavigationSection.style.display = "none";
        body.style.margin = "0";
        body.style.height = "100%";
        html.style.height = "100%";

        if (menuSection.querySelector('#menu-header') === null) {
            const menuHeader = document.createElement("div");
            menuHeader.id = "menu-header";
            menuSection.insertBefore(menuHeader, menuSection.firstChild);
        }
        const menuHeader = document.getElementById("menu-header");
        const headerName = menuButton === "drinks-menu-button" ? "DRIKKER" : "DESSERTER";
        menuHeader.innerHTML = `
            <button type="button" class="mobile-back-button" id="menu-back-button" onclick="returnToPreviousPage(id)">
                <i class="fa fa-chevron-left fa-3x"></i>
            </button>
            <h3>${headerName}</h3;
        `;
    }
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

    if (!mediaQuery.matches) {
        popularItemsMenuHeader.innerHTML = `
            <img src="images/icons/heart.png" alt="Hjerte" width="30px" height="30px">
            <h3>POPULÆRE</h3>
        `;
    } else {
        popularItemsMenuHeader.innerHTML = `
            <h3>HURTIGKJØP</h3>
        `;
    }
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

    if (mediaQuery.matches) {
        drinkItemCard.innerHTML = `
            <img src=${drinkItem.imagePath} alt=${drinkItem.drinkName} width="70" height="70"> 
            <h4>${drinkItem.drinkName.toUpperCase()}</h4>
            <p>fra<br>kr ${drinkItem.price.small}</p>
        `;
    } else {
        drinkItemCard.innerHTML = `
            <img src=${drinkItem.imagePath} alt=${drinkItem.drinkName} width="70" height="70"> 
            <h4>${drinkItem.drinkName.toUpperCase()}</h4>
            <p>${drinkItem.price.small}, ${drinkItem.price.medium}, ${drinkItem.price.large}</p>
        `;
    }

    return drinkItemCard;
};

// RENDERS DRINKITEMS IN DRINK MENU
const renderDrinks = () => {
    const popularItemsMenu = document.getElementById("popular-items-menu");
    const mainMenu = document.getElementById("main-menu");

    removeChildNodes(popularItemsMenu);
    removeChildNodes(mainMenu);

    if (!mediaQuery.matches) {
        drinkItems.map(drinkItem => {
            const drinkMenu = createDrinkItem(drinkItem);
            if (drinkItem.isDrinkPopular === true) {
                popularItemsMenu.appendChild(drinkMenu);
            }
        });
    } else {
        drinkItems.map(drinkItem => {
            const drinkMenu = createDrinkItem(drinkItem);
            if (drinkItem.isPurchasedByUserEarlier === true) {
                popularItemsMenu.appendChild(drinkMenu);
            }
        });
    }

    drinkItems.map(drinkItem => {
        const drinkMenu = createDrinkItem(drinkItem);
        mainMenu.appendChild(drinkMenu);
    });

    styleMenu("drink");
};

// CREATES DESSERT ITEMS
const createDessertItem = (dessertItem) => {
    const dessertItemCard = document.createElement("div");
    dessertItemCard.className = "item-card dessert-item-card";
    dessertItemCard.innerHTML = `
        <img src=${dessertItem.imagePath} alt=${dessertItem.drinkName} width="80" height="80"> 
        <h4>${dessertItem.dessertName.toUpperCase()}</h4>
        <p>kr ${dessertItem.price}</p>
    `;

    return dessertItemCard;
};

// RENDERS DESSERT ITEMS IN DESERT MENU
const renderDesserts = () => {
    const popularItemsMenu = document.getElementById("popular-items-menu");
    const mainMenu = document.getElementById("main-menu");

    removeChildNodes(popularItemsMenu);
    removeChildNodes(mainMenu);

    if (!mediaQuery.matches) {
        dessertItems.map(dessertItem => {
            const dessertMenu = createDessertItem(dessertItem);
            if (dessertItem.isDessertPopular === true) {
                popularItemsMenu.appendChild(dessertMenu);
            }
        });
    } else {
        dessertItems.map(dessertItem => {
            const dessertMenu = createDessertItem(dessertItem);
            if (dessertItem.isPurchasedByUserEarlier === true) {
                popularItemsMenu.appendChild(dessertMenu);
            }
        });
    }

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
};

const styleMenu = (menu) => {
    const popularItemsMenuHeader = document.getElementById("popular-items-menu-header");
    const popularItemsMenu = document.getElementById("popular-items-menu");
    const mainMenu = document.getElementById("main-menu");
    popularItemsMenuContainer.style.border = "0px";
    mainMenuContainer.style.border = "0px";

    if (mediaQuery.matches) {
        const menuHeader = document.getElementById("menu-header");
        const menuBackButton = document.getElementById("menu-back-button");
        if (menu === "drink") {
            menuHeader.style.backgroundColor = "var(--drinks-menu-color)";
            menuBackButton.style.backgroundColor = "none";
        } else if (menu === "dessert") {
            menuHeader.style.backgroundColor = "var(--desserts-menu-color)";
        }
    }

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

        renderOrderHistory();
    } else {
        removeChildNodes(menuSection);
        menuSection.appendChild(popularItemsMenuContainer);
        menuSection.appendChild(mainMenuContainer);
    }
};

const renderOrderHistory = () => {
    const orderList = document.getElementById("order-list");
    const completedOrdersReversed = completedOrders.reverse();
    for (let i = 0; i < completedOrdersReversed.length; i++) {
        const listedOrder = document.createElement("div");
        listedOrder.className = "listed-order";
        listedOrder.setAttribute("onclick", `renderOrder(this, ${completedOrders[i].orderNr})`);

        let items = ``;
            if (completedOrders[i].items.length === 1) {
                items = `${completedOrders[i].items[0].name}`;
            } else if (completedOrders[i].items.length === 2) {
                items = `${completedOrders[i].items[0].name}, ${completedOrders[i].items[1].name}`;
            } else {
                items = `${completedOrders[i].items[0].name}, ${completedOrders[i].items[1].name}...`;
            }

        listedOrder.innerHTML = `
             <h3>${completedOrders[i].orderNr}</h3>
             <div class="listed-order-content">
                <p>${items.toUpperCase()}</p>
             </div>
             <div class="order-pointer"></div>
         `;

        orderList.appendChild(listedOrder);
    }
}

const renderOrder = (orderElement, orderNr) => {
    styleListedOrders(orderElement);
    const orderContainer = document.getElementById("order-container");
    const orderIndex = orderNr - 1;
    orderContainer.innerHTML = `
        <div id="order-container-header">
            <h2>BESTILLING NR.</h2>
            <h1>${orderNr}</h1>
        </div>
        <div id="order-details"></div>
        <div id="completed-order-total-price">
            <h2>TOTALT</h2>
            <h1>KR ${completedOrders[orderIndex].totalPrice}</h1>
        </div>
`;


}

const styleListedOrders = (orderElement) => {
    const orderContainer = document.getElementById("order-container");
    const listedOrders = document.getElementsByClassName("listed-order");
    const orderPointers = document.getElementsByClassName("order-pointer");
    const orderElementChildren = orderElement.children;

    for (let i = 0; i < listedOrders.length; i++) {
        listedOrders[i].children[0].style.backgroundColor = "var(--standard-gray-color)";
        listedOrders[i].children[1].style.backgroundColor = "var(--standard-gray-color)";
    }

    for (let i = 0; i < orderPointers.length; i++) {
        orderPointers[i].style.display = "none";
    }

    orderContainer.style.backgroundColor = "var(--lighter-gray-color)";
    orderElementChildren[0].style.backgroundColor = "var(--darker-gray-color)";
    orderElementChildren[1].style.backgroundColor = "var(--darker-gray-color)";
    orderElementChildren[2].style.display = "block";
}

const renderActiveUserAccount = () => {
    const userAccountHeader = document.getElementById("user-account-header");

    db.transaction(function (tx) {
        tx.executeSql('SELECT * FROM activeUserAccount LIMIT 1', [], function (tx, results) {
            let len = results.rows.length, i;

            // Check if no users is selected in the DB redirect to the login page
            if (len === 0) {
                window.location.href = 'desktop-login.html';
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

if (!mediaQuery.matches) {
    renderActiveUserAccount();
};

// MOBILE

const returnToPreviousPage = (button) => {
    if (button === "menu-back-button") {
        body.style.margin = "1rem";
        body.style.height = "98%";
        html.style.height = "98%";
        menuSection.style.display = "none";
        mainNavigationSection.style.display = "grid";
    }
};
