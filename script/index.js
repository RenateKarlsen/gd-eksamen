// DOM
const menuSection = document.getElementById("menu-section");
const popularItemsMenuContainer = document.getElementById("popular-items-menu-container");
const mainMenuContainer = document.getElementById("main-menu-container");
const drinksMenuButton = document.getElementById("drinks-menu-button");
const dessertsMenuButton = document.getElementById("desserts-menu-button");
const mainNavigationSection = document.getElementById("main-navigation-section");
const body = document.getElementsByTagName("body")[0];
const html = document.getElementsByTagName("html")[0];
const main = document.getElementsByTagName("main");
const totalPriceContainer = document.createElement("div");
const totalPrice = document.createElement("h4");
const mediaQuery = window.matchMedia("(max-width: 600px)")

mediaQuery.addEventListener("change", (e) => {
    if (e.matches) {
        location.reload();
    }
});

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
    dessertItemCard.alt = dessertItem.dessertName;
    dessertItemCard.setAttribute("onclick", "renderOptions()");
    dessertItemCard.innerHTML = `
        <img src=${dessertItem.imagePath} alt=${dessertItem.dessertName} width="80" height="80"> 
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
    for (let i = 0; i < completedOrders.length; i++) {
        const listedOrder = document.createElement("div");
        listedOrder.className = "listed-order";
        listedOrder.setAttribute("onclick", `renderOrder(this, ${completedOrders[i].orderNr})`);

        let item = ``;
        if (completedOrders[i].items.length === 1) {
            item = `${completedOrders[i].items[0].name}`;
        } else {
            item = `${completedOrders[i].items[0].name} ++`;
        }

        listedOrder.innerHTML = `
            <div class="ordernr-container">
                <h3>${completedOrders[i].orderNr}</h3>
            </div>
            <div class="listed-order-content">
                <p>${item.toUpperCase()}</p>
                <h5>${completedOrders[i].totalPrice},00</h5>
            </div>
            <div class="order-pointer"></div>
         `;

        orderList.appendChild(listedOrder);
    }
};

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
            <h1>KR ${completedOrders[orderIndex].totalPrice},00</h1>
        </div>
    `;

    const orderDetails = document.getElementById("order-details");
    for (let i = 0; i < completedOrders[orderIndex].items.length; i++) {
        const completedOrderItemCardContainer = document.createElement("div");
        const completedOrderItemCard = document.createElement("div");
        const completedOrderItemCardImgContainer = document.createElement("div");
        completedOrderItemCardContainer.className = "completed-order-item-card-container";
        completedOrderItemCard.className = "completed-order-item-card";
        completedOrderItemCardImgContainer.className = "image-container";

        completedOrderItemCardImgContainer.innerHTML = `
            <img src=${completedOrders[orderIndex].items[i].imagePath} alt=${completedOrders[orderIndex].items[i].name} width="70" height="70">
        `;
        completedOrderItemCardContainer.appendChild(completedOrderItemCardImgContainer);
        completedOrderItemCard.innerHTML = `
            <h3>${completedOrders[orderIndex].items[i].name.toUpperCase()}</h3>
            <h2>${completedOrders[orderIndex].items[i].price},00</h2>
        `;

        if (completedOrders[orderIndex].items[i].isDrink === true) {
            const sizeImagesContainer = document.createElement("div");
            sizeImagesContainer.className = "size-images-container";
            if (completedOrders[orderIndex].items[i].size === "small") {
                sizeImagesContainer.innerHTML += `
                    <i class="chosenSize fa fa-coffee fa-1x"></i>
                    <i class="fa fa-coffee fa-2x"></i>
                    <i class="fa fa-coffee fa-3x"></i>
                `;
            } else if (completedOrders[orderIndex].items[i].size === "medium") {
                sizeImagesContainer.innerHTML += `
                    <i class="fa fa-coffee fa-1x"></i>
                    <i class="chosenSize fa fa-coffee fa-2x"></i>
                    <i class="fa fa-coffee fa-3x"></i>
                `;
            } else {
                sizeImagesContainer.innerHTML += `
                    <i class="fa fa-coffee fa-1x"></i>
                    <i class="fa fa-coffee fa-2x"></i>
                    <i class="chosenSize fa fa-coffee fa-3x"></i>
                `;
            }
            completedOrderItemCard.appendChild(sizeImagesContainer);
            const extrasList = document.createElement("ul");
            for (let i2 = 0; i2 < completedOrders[orderIndex].items[i].extras.length; i2++) {
                extrasList.innerHTML += `<li>+ ${completedOrders[orderIndex].items[i].extras[i2].name.toUpperCase()}</li>`
            }
            completedOrderItemCard.appendChild(extrasList);

            completedOrderItemCardImgContainer.style.backgroundColor = "var(--drinks-menu-color)";
            completedOrderItemCard.style.backgroundColor = "var(--drinks-menu-color)";
            completedOrderItemCard.classList.add("drink-grid");
        }
        completedOrderItemCardContainer.appendChild(completedOrderItemCard);
        orderDetails.appendChild(completedOrderItemCardContainer);
    }
};


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
};

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

const renderOptions = () => {
    //Gets index based on name from alt-text (getIndex.js) - kinda jalla but it works!
    getIndex();

    //Removes menus so the boxes disappears
    menuSection.removeChild(popularItemsMenuContainer);
    menuSection.removeChild(mainMenuContainer);

    // Itemindex lower than 10 = drinks, higher than 10 = desserts.
    if (itemIndex < 10) {
        let drinkPriceSmall = drinkItems[itemIndex].price.small;
        let drinkPriceMedium = drinkItems[itemIndex].price.medium;
        let drinkPriceLarge = drinkItems[itemIndex].price.large;

        menuSection.style.backgroundColor = "var(--drinks-menu-color)";
        menuSection.style.padding = "2em";
        menuSection.style.gridGap = "2em";
        menuSection.innerHTML = `
            <div class = "itemImgAndName">
                <h4>${drinkItems[itemIndex].drinkName}</h4> 
                <img id="drinkImg"src=${drinkItems[itemIndex].imagePath} alt=${drinkItems[itemIndex].drinkName}>
            </div>
            <div class="smallDrink" id=${drinkPriceSmall} onclick="selectSize(); this.onclick=null;">
                <img  id=${drinkPriceSmall} src="Images/Icons/coffeecup.png">
                <h4 id=${drinkPriceSmall}>${drinkPriceSmall}kr</h4>
            </div>
            <div class="medDrink" onclick="selectSize(); this.onclick=null;">
                <img  id=${drinkPriceMedium} src="Images/Icons/coffeecup.png">
                <h4 id=${drinkPriceMedium}>${drinkPriceMedium}kr</h4>
            </div>
            <div class="largeDrink" onclick="selectSize(); this.onclick=null;">
                <img id=${drinkPriceLarge} src="Images/Icons/coffeecup.png">
                <h4 id=${drinkPriceLarge}>${drinkPriceLarge}kr</h4>
            </div>
            <button id="back-btn" onclick="back()"> X </button>
       `;

    } else {
        let dessertItemIndex = itemIndex - 10;
        menuSection.style.backgroundColor = "var(--desserts-menu-color)";
        menuSection.innerHTML = `
            <div class="dessertItem" id="${dessertItems[dessertItemIndex].dessertName}">
                <h4>${dessertItems[dessertItemIndex].dessertName}</h4> 
                <img id="drinkImg"src=${dessertItems[dessertItemIndex].imagePath} alt=${dessertItems[dessertItemIndex].dessertName}>
                <h4 id="smallTxt">${dessertItems[dessertItemIndex].price}kr</h4>
            </div>
            <button id="back-btn" onclick="back()"> X </button>
        `;
    }
};

// The back button on options menu
const back = () => {
    menuSection.innerHTML = "";
    menuSection.appendChild(popularItemsMenuContainer);
    menuSection.appendChild(mainMenuContainer);
};

const selectSize = () => {
    renderExtraOptionsCard();

    //RENDERS TOTAL PRICE
    let targetID = event.target.id;
    let price = parseInt(targetID);
    totalPrice.innerHTML = price;
    totalPriceContainer.id = "total-price";
    totalPriceContainer.innerHTML = "TOTALT KR: "
    totalPriceContainer.appendChild(totalPrice);
    menuSection.appendChild(totalPriceContainer);

    //RENDERS CONFIRM ORDER BTN
    const confirmOrderBtn = document.createElement("button");
    confirmOrderBtn.className = "confirm-order-btn";
    confirmOrderBtn.innerHTML = "Legg til i bestilling";
    confirmOrderBtn.setAttribute("onclick", "addItemToOrder()");
    menuSection.appendChild(confirmOrderBtn);

};

const renderExtraOptionsCard = () => {
    const extraOptionCardContainer = document.createElement("div");
    // RENDERS EXTRA-OPTIONS-CARD FROM extraOptionsObj (data.js)
    if (menuSection.childNodes.length < 12) {
        Object.keys(extraOptionsObj, extraOptionCardContainer).forEach(key => {
            const extraOptionCard = document.createElement("div");
            extraOptionCardContainer.className = "extra-options-card-container";
            extraOptionCard.className = "extra-option-card";
            extraOptionCard.id = extraOptionsObj[key].name;
            extraOptionCard.setAttribute("onclick", "updatePrice()");
            extraOptionCard.setAttribute("price", extraOptionsObj[key].price);

            extraOptionCard.innerHTML = `
                <img src="">
                <h4 id="extra-option-name-h4" style="pointer-events:none">${extraOptionsObj[key].name}</h4>
                <h4 id="extra-option-price-h4" style="pointer-events:none">${extraOptionsObj[key].price}kr</h4>
            `;
            extraOptionCardContainer.appendChild(extraOptionCard);
            menuSection.appendChild(extraOptionCardContainer);
        });
    };
};

const updatePrice = () => {
    let extraPrice = parseInt(event.target.getAttribute("price"));
    price = parseInt(totalPrice.innerHTML);
    updatedPrice = price + extraPrice;
    console.log(updatedPrice);
    totalPrice.innerHTML = parseInt(updatedPrice);
};

const addItemToOrder = () => {
    //totalPrice.innerHTML = updatedPrice;
    let updatedPrice = totalPrice.innerHTML;
    const orderSectionContainer = document.getElementById("order-section");
    const orderItemCard = document.createElement("div");
    orderItemCard.id = "order-item-card";
    orderItemCard.innerHTML = `${updatedPrice}`;
    orderSectionContainer.appendChild(orderItemCard);
    console.log(orderItemCard);
    back();
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
