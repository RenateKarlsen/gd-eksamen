const menuSection = document.getElementById("menu-section");
const popularItemsMenuContainer = document.getElementById("popular-items-menu-container");
const mainMenuContainer = document.getElementById("main-menu-container");
const drinksMenuButton = document.getElementById("drinks-menu-button");
const dessertsMenuButton = document.getElementById("desserts-menu-button");
const mainNavigationSection = document.getElementById("main-navigation-section");
const body = document.getElementsByTagName("body")[0];
const html = document.getElementsByTagName("html")[0];
const main = document.getElementsByTagName("main");
const mediaQuery = window.matchMedia("(max-width: 600px)")
const mediaQueryMin = window.matchMedia("(min-width: 600px)")

mediaQuery.addEventListener("change", (e) => {
    if (e.matches) {
        location.reload();
    };
});

mediaQueryMin.addEventListener("change", (e) => {
    if (e.matches) {
        location.reload();
    };
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
        const headerName = menuButton === "drinks-menu-button" ? "DRIKKE" : "DESSERT";
        menuHeader.innerHTML = `
            <button type="button" class="mobile-back-button" id="menu-back-button" onclick="returnToPreviousPage(id)">
                <i class="fa fa-angle-left fa-4x" alt="Pil venstre"></i>
            </button>
            <h3>${headerName}</h3>
        `;
    };

    if (menuSection.querySelector('.item-img-and-name') !== null) {
        closeOptionsMenu();
    };

    if (menuSection.querySelector('#order-history-container') !== null) {
        removeChildNodes(menuSection);
        menuSection.appendChild(popularItemsMenuContainer);
        menuSection.appendChild(mainMenuContainer);
    };

    if (!mainMenuContainer.hasChildNodes()) {
        createMenu(menuButton);
    } else {
        updateMenu(menuButton);
    };
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
    };
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
    };
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
        };
    };
};

// CREATES DRINK ITEMS
const createDrinkItem = (drinkItem, id) => {
    const index = id - 1;
    const drinkItemCard = document.createElement("div");
    drinkItemCard.className = "item-card drink-item-card";
    drinkItemCard.id = `item-card-${drinkItem.name}`;
    drinkItemCard.setAttribute("onclick", `renderOptions(${index}, null, false)`);

    if (mediaQuery.matches) {
        drinkItemCard.innerHTML = `
            <img src=${drinkItem.imagePath} alt=${drinkItem.name}> 
            <h4>${drinkItem.name.toUpperCase()}</h4>
            <p>fra<br>kr ${drinkItem.price.small}</p>
        `;
    } else {
        drinkItemCard.innerHTML = `
            <img src=${drinkItem.imagePath} alt=${drinkItem.name}> 
            <h4>${drinkItem.name.toUpperCase()}</h4>
            <p>${drinkItem.price.small}, ${drinkItem.price.medium}, ${drinkItem.price.large}</p>
        `;
    };

    return drinkItemCard;
};

// RENDERS DRINKITEMS IN DRINK MENU
const renderDrinks = () => {
    const popularItemsMenu = document.getElementById("popular-items-menu");
    const mainMenu = document.getElementById("main-menu");

    removeChildNodes(popularItemsMenu);
    removeChildNodes(mainMenu);

    let i = 0;
    drinkItems.map(drinkItem => {
        i++;
        const drinkMenu = createDrinkItem(drinkItem, i);
        mainMenu.appendChild(drinkMenu);
    });

    let i2 = 0;
    if (!mediaQuery.matches) {
        drinkItems.map(drinkItem => {
            i2++;
            const drinkMenu = createDrinkItem(drinkItem, i2);
            if (drinkItem.isDrinkPopular === true) {
                popularItemsMenu.appendChild(drinkMenu);
            };
        });
    } else {
        let i3 = 0;
        drinkItems.map(drinkItem => {
            i3++;
            const drinkMenu = createDrinkItem(drinkItem, i3);
            if (drinkItem.isPurchasedByUserEarlier === true) {
                popularItemsMenu.appendChild(drinkMenu);
            };
        });
    };
    styleMenu("drink");
};

// CREATES DESSERT ITEMS
const createDessertItem = (dessertItem, id) => {
    const index = id - 1;
    const dessertItemCard = document.createElement("div");
    dessertItemCard.className = "item-card dessert-item-card";
    dessertItemCard.setAttribute("onclick", `addItemToOrder(${index}, false, null)`);
    dessertItemCard.innerHTML = `
        <img src=${dessertItem.imagePath} alt=${dessertItem.name}> 
        <h4>${dessertItem.name.toUpperCase()}</h4>
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

    let i = 0;
    dessertItems.map(dessertItem => {
        i++;
        const dessertMenu = createDessertItem(dessertItem, i);
        mainMenu.appendChild(dessertMenu);
    });

    if (!mediaQuery.matches) {
        let i2 = 0;
        dessertItems.map(dessertItem => {
            i2++;
            const dessertMenu = createDessertItem(dessertItem, i2);
            if (dessertItem.isDessertPopular === true) {
                popularItemsMenu.appendChild(dessertMenu);
            };
        });
    } else {
        let i3 = 0;
        dessertItems.map(dessertItem => {
            i3++;
            const dessertMenu = createDessertItem(dessertItem, i3);
            if (dessertItem.isPurchasedByUserEarlier === true) {
                popularItemsMenu.appendChild(dessertMenu);
            };
        });
    };

    styleMenu("dessert");
};

const removeChildNodes = (container) => {
    while (container.firstChild) {
        container.removeChild(container.lastChild);
    };
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
    };

    if (menu === "drink") {
        popularItemsMenuHeader.style.backgroundColor = "var(--drinks-menu-color)";
        popularItemsMenu.style.backgroundColor = "var(--drinks-menu-color)";
        mainMenu.style.backgroundColor = "var(--drinks-menu-color)";
    } else if (menu === "dessert") {
        popularItemsMenuHeader.style.backgroundColor = "var(--desserts-menu-color)";
        popularItemsMenu.style.backgroundColor = "var(--desserts-menu-color)";
        mainMenu.style.backgroundColor = "var(--desserts-menu-color)";
    };
};

const revealOrderHistorySection = () => {
    const orderHistoryContainer = document.createElement("div");
    const orderContainer = document.createElement("div");

    if (menuSection.querySelector('.item-img-and-name') !== null) {
        closeOptionsMenu();
    };

    if (menuSection.querySelector('#order-history-container') === null) {
        menuSection.removeChild(popularItemsMenuContainer);
        menuSection.removeChild(mainMenuContainer);

        orderHistoryContainer.id = "order-history-container";
        orderHistoryContainer.innerHTML = `
            <div id="order-history-container-header">
                <i class="fa fa-cloud fa-5x" alt="Sky"></i>
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
    };
};

const renderOrderHistory = () => {
    const orderList = document.getElementById("order-list");
    for (let i = completedOrders.length - 1; i >= 0; i--) {
        const listedOrder = document.createElement("div");
        listedOrder.className = "listed-order";
        listedOrder.setAttribute("onclick", `renderOrder(this, ${completedOrders[i].orderNr})`);

        let item = ``;
        if (completedOrders[i].items.length === 1) {
            item = `${completedOrders[i].items[0].name}`;
        } else {
            item = `${completedOrders[i].items[0].name} ++`;
        };

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
            if (completedOrders[orderIndex].items[i].size === 1) {
                sizeImagesContainer.innerHTML += `
                    <i class="chosenSize fa fa-coffee fa-1x" alt="Liten kaffekopp"></i>
                    <i class="fa fa-coffee fa-2x" alt="Medium kaffekopp"></i>
                    <i class="fa fa-coffee fa-3x" alt="Stor kaffekopp"></i>

                `;
            } else if (completedOrders[orderIndex].items[i].size === 2) {
                sizeImagesContainer.innerHTML += `
                    <i class="fa fa-coffee fa-1x" alt="Liten kaffekopp"></i>
                    <i class="chosenSize fa fa-coffee fa-2x" alt="Medium kaffekopp"></i>
                    <i class="fa fa-coffee fa-3x" alt="Stor kaffekopp"></i>
                `;
            } else {
                sizeImagesContainer.innerHTML += `
                    <i class="fa fa-coffee fa-1x" alt="Liten kaffekopp"></i>
                    <i class="fa fa-coffee fa-2x" alt="Medium kaffekopp"></i>
                    <i class="chosenSize fa fa-coffee fa-3x" alt="Stor kaffekopp"></i>
                `;
            };
            completedOrderItemCard.appendChild(sizeImagesContainer);
            const extrasList = document.createElement("ul");
            for (let i2 = 0; i2 < completedOrders[orderIndex].items[i].extras.length; i2++) {
                extrasList.innerHTML += `<li>+ ${completedOrders[orderIndex].items[i].extras[i2].name.toUpperCase()}</li>`
            };
            completedOrderItemCard.appendChild(extrasList);

            completedOrderItemCardImgContainer.style.backgroundColor = "var(--drinks-menu-color)";
            completedOrderItemCard.style.backgroundColor = "var(--drinks-menu-color)";
            completedOrderItemCard.classList.add("drink-grid");
        } else {
            const img = completedOrderItemCardImgContainer.childNodes[1];
            img.style.marginTop = "0";
            img.style.marginBottom = "1.5em";
        };
        completedOrderItemCardContainer.appendChild(completedOrderItemCard);
        orderDetails.appendChild(completedOrderItemCardContainer);
    };
};

const styleListedOrders = (orderElement) => {
    const orderContainer = document.getElementById("order-container");
    const listedOrders = document.getElementsByClassName("listed-order");
    const orderPointers = document.getElementsByClassName("order-pointer");
    const orderElementChildren = orderElement.children;

    for (let i = 0; i < listedOrders.length; i++) {
        listedOrders[i].children[0].style.backgroundColor = "var(--standard-gray-color)";
        listedOrders[i].children[1].style.backgroundColor = "var(--standard-gray-color)";
    };

    for (let i = 0; i < orderPointers.length; i++) {
        orderPointers[i].style.display = "none";
    };

    orderContainer.style.backgroundColor = "var(--lighter-gray-color)";
    orderElementChildren[0].style.backgroundColor = "var(--darker-gray-color)";
    orderElementChildren[1].style.backgroundColor = "var(--darker-gray-color)";
    orderElementChildren[2].style.display = "block";
};

const renderOptions = (menuIndex, orderIndex, editItemInOrder) => {
    if (menuSection.querySelector('.item-img-and-name') !== null) {
        closeOptionsMenu();
    } else {
        //Removes menus so the boxes disappears
        menuSection.removeChild(popularItemsMenuContainer);
        menuSection.removeChild(mainMenuContainer);

        menuSection.style.backgroundColor = "var(--drinks-menu-color)";

        if (mediaQuery.matches) {
            menuSection.style.gridTemplateColumns = "repeat(3, 1fr)";
            menuSection.style.gridTemplateRows = "repeat(12, 1fr)";
            menuSection.style.justifyItems = "center";
            menuSection.style.padding = "20px";
            menuSection.style.gridGap = "0";


        } else {
            menuSection.style.padding = "2em";
            menuSection.style.gridGap = "1em";
            menuSection.style.gridTemplateColumns = "repeat(7, 1fr)";
        }



        let drinkPriceSmall = drinkItems[menuIndex].price.small;
        let drinkPriceMedium = drinkItems[menuIndex].price.medium;
        let drinkPriceLarge = drinkItems[menuIndex].price.large;

        if (editItemInOrder !== true) {
            menuSection.innerHTML = `
            <div class="item-img-and-name" id="item-img-and-name-choose">
                <h1>${drinkItems[menuIndex].name.toUpperCase()}</h1> 
                <img id="drinkImg"src=${drinkItems[menuIndex].imagePath} alt=${drinkItems[menuIndex].name}>
            </div>
            <div class="drink-size" id="small-drink" onclick="selectSize(this, ${menuIndex}, ${drinkPriceSmall}, 1)">
                <h3>LITEN</h3>
                <i class="fa fa-coffee fa-2x" alt="Liten kaffekopp"></i>
                <h4>KR ${drinkPriceSmall}</h4>
            </div>
            <div class="drink-size" id="medium-drink" onclick="selectSize(this, ${menuIndex}, ${drinkPriceMedium}, 2)">
                <h3>MEDIUM</h3>
                <i class="fa fa-coffee fa-3x" alt="Medium kaffekopp"></i>
                <h4>KR ${drinkPriceMedium}</h4>
            </div>
            <div class="drink-size" id="large-drink" onclick="selectSize(this, ${menuIndex}, ${drinkPriceLarge}, 3)">
                <h3>STOR</h3>
                <i class="fa fa-coffee fa-4x" alt="Stor kaffekopp"></i>
                <h4>KR ${drinkPriceLarge}</h4>
            </div>
            <button class="back-btn" id="back-btn-arrow" onclick="closeOptionsMenu()"><i class="fa fa-angle-left fa-5x" alt="Pil venstre"></i></button>
       `;
        } else {
            menuSection.style.gridTemplateRows = "120px 1fr 1fr 1fr 1fr";
            menuSection.innerHTML = `
            <div class="item-img-and-name" id="item-img-and-name-edit">
                <h1 id="edit-product-header">ENDRE DRIKK</h1>
                <h2>${orderItems[orderIndex].name.toUpperCase()}</h2> 
                <img id="drinkImg"src=${orderItems[orderIndex].imagePath} alt=${orderItems[orderIndex].name}>
            </div>
            <div class="drink-size" id="small-drink" onclick="updateSize(this, ${orderIndex}, ${drinkPriceSmall}, 1)">
                <h3>LITEN</h3>
                <i class="fa fa-coffee fa-2x" alt="Liten kaffekopp"></i>
                <h4>KR ${drinkPriceSmall}</h4>
            </div>
            <div class="drink-size" id="medium-drink" onclick="updateSize(this, ${orderIndex}, ${drinkPriceMedium}, 2)">
                <h3>MEDIUM</h3>
                <i class="fa fa-coffee fa-3x" alt="Medium kaffekopp"></i>
                <h4>KR ${drinkPriceMedium}</h4>
            </div>
            <div class="drink-size" id="large-drink" onclick="updateSize(this, ${orderIndex}, ${drinkPriceLarge}, 3)">
                <h3>STOR</h3>
                <i class="fa fa-coffee fa-4x" alt="Stor kaffekopp"></i>
                <h4>KR ${drinkPriceLarge}</h4>
            </div>
        `;
            let drinkPrice = 0;
            if (orderItems[orderIndex].size === 1) {
                const smallDrink = document.getElementById("small-drink");
                smallDrink.style.backgroundColor = "#ffffff";
                smallDrink.style.color = "var(--drinks-menu-color)";
                drinkPrice = drinkPriceSmall;
            } else if (orderItems[orderIndex].size === 2) {
                const mediumDrink = document.getElementById("medium-drink");
                mediumDrink.style.backgroundColor = "#ffffff";
                mediumDrink.style.color = "var(--drinks-menu-color)";
                drinkPrice = drinkPriceMedium;
            } else {
                const largeDrink = document.getElementById("large-drink");
                largeDrink.style.backgroundColor = "#ffffff";
                largeDrink.style.color = "var(--drinks-menu-color)";
                drinkPrice = drinkPriceLarge;
            }

            renderExtraOptionsCards(drinkPrice, orderIndex, true);
            for (let i = 0; i < extraOptions.length; i++) {
                if (orderItems[orderIndex].extras.includes(extraOptions[i])) {
                    document.getElementById(i).style.backgroundColor = "#ffffff";
                    document.getElementById(i).style.color = "var(--drinks-menu-color)";
                }
            }

            const orderItemTotalPriceContainer = document.createElement("div");
            orderItemTotalPriceContainer.id = "order-item-total-price-container";
            orderItemTotalPriceContainer.innerHTML = `<p>TOTALT KR </p>`;

            const orderItemTotalPrice = document.createElement("p");
            orderItemTotalPrice.id = "order-item-total-price";
            orderItemTotalPriceContainer.appendChild(orderItemTotalPrice);
            menuSection.appendChild(orderItemTotalPriceContainer);

            const confirmOrderBtn = document.createElement("button");
            confirmOrderBtn.className = "confirm-order-btn";
            confirmOrderBtn.innerHTML = "FULLFØR";
            confirmOrderBtn.setAttribute("onclick", `updateItemInOrder(${orderIndex}, ${orderItems[orderIndex].id})`);
            menuSection.appendChild(confirmOrderBtn);
            updateTotalPriceInItem(drinkPrice, orderIndex, true);
        }
    }
};

// The back button on options menu
const closeOptionsMenu = () => {
    menuSection.innerHTML = "";
    menuSection.appendChild(popularItemsMenuContainer);
    menuSection.appendChild(mainMenuContainer);

    if (!mediaQuery.matches) {
        menuSection.style.backgroundColor = "transparent";
        menuSection.style.padding = "0";
        menuSection.style.gridGap = "1rem";
        menuSection.style.gridTemplateColumns = "repeat(8, 1fr)";
        menuSection.style.gridTemplateRows = "repeat(5, 1fr)";
    } else {
        menuSection.style.gridTemplateColumns = "1fr";
        menuSection.style.gridTemplateRows = "12% 25% 63%";
    };
};

const updateSize = (sizeElement, index, price, sizeNr) => {
    orderItems[index].size = sizeNr;
    sizePrice = price;
    const drinkSizeElements = document.getElementsByClassName("drink-size");
    for (element of drinkSizeElements) {
        element.style.backgroundColor = "var(--drinks-menu-color)";
        element.style.color = "#ffffff";
    };
    sizeElement.style.backgroundColor = "#ffffff";
    sizeElement.style.color = "var(--drinks-menu-color)";

    updateTotalPriceInItem(sizePrice, index, true);
};

const updateItemInOrder = (index, id) => {
    const orderItemTotalPrice = document.getElementById("order-item-total-price");
    orderItems[index].price = parseInt(orderItemTotalPrice.innerHTML);
    //orderItems[index].extras = addedExtras;

    const openItem = document.getElementById(`order-item-card-content-${id}`);
    openItem.innerHTML = `
        <img src="${orderItems[index].imagePath}" alt="${orderItems[index].name}" width="50px" height="50px">
        <h4>${orderItems[index].name.toUpperCase()}</h4>
        <h2>${orderItems[index].price},00</h2>
    `;
    updateTotalPriceInOrder();
    closeOptionsMenu();
};

const selectSize = (sizeElement, index, price, size) => {
    renderExtraOptionsCards(price, null, false);
    if (menuSection.querySelector('#order-item-total-price-container') === null) {
        const orderItemTotalPriceContainer = document.createElement("div");
        orderItemTotalPriceContainer.id = "order-item-total-price-container";
        orderItemTotalPriceContainer.innerHTML = `
            <p>TOTALT KR </p>
        `;

        const orderItemTotalPrice = document.createElement("p");
        orderItemTotalPrice.id = "order-item-total-price";
        orderItemTotalPriceContainer.appendChild(orderItemTotalPrice);
        menuSection.appendChild(orderItemTotalPriceContainer);

        const confirmOrderBtn = document.createElement("button");
        confirmOrderBtn.className = "confirm-order-btn";
        confirmOrderBtn.innerHTML = "LEGG TIL I BESTILLING";
        confirmOrderBtn.setAttribute("onclick", `addItemToOrder(${index}, true, ${size})`);
        menuSection.appendChild(confirmOrderBtn);
    }

    updateTotalPriceInItem(price, null, false);

    const drinkSizeElements = document.getElementsByClassName("drink-size");
    for (element of drinkSizeElements) {
        element.style.backgroundColor = "var(--drinks-menu-color)";
        element.style.color = "#ffffff";
    };
    sizeElement.style.backgroundColor = "#ffffff";
    sizeElement.style.color = "var(--drinks-menu-color)";
};

const renderExtraOptionsCards = (price, orderIndex, editItemInOrder) => {
    const extraOptionCardContainer = document.createElement("div");
    sizePrice = price;

    if (menuSection.childNodes.length < 12) {
        for (let i = 0; i < extraOptions.length; i++) {
            const extraOptionCard = document.createElement("div");
            extraOptionCardContainer.className = "extra-options-card-container";
            extraOptionCard.className = "extra-option-card";
            extraOptionCard.id = `${extraOptions[i].id}`;
            if (editItemInOrder) {
                extraOptionCard.setAttribute("onclick", `updateExtrasInItem(this, extraOptions[id], ${orderIndex}, sizePrice)`);
            } else {
                extraOptionCard.setAttribute("onclick", `addExtraToItem(this, extraOptions[id], sizePrice)`);
            }
            extraOptionCard.innerHTML = `
                <img src="images/icons/${extraOptions[i].image}" alt="${extraOptions[i].name}" width="30px" height="30px">
                <h4 id="extra-option-name-h4">${extraOptions[i].name.toUpperCase()}</h4>
                <p id="extra-option-price">+ kr ${extraOptions[i].price}</p>
            `;
            extraOptionCardContainer.appendChild(extraOptionCard);
            menuSection.appendChild(extraOptionCardContainer);
        };
    };
};

const addExtraToItem = (extraElement, chosenExtra, sizePrice) => {
    if (!addedExtras.includes(chosenExtra)) {
        addedExtras.push(chosenExtra);

        extraElement.style.backgroundColor = "#ffffff";
        extraElement.style.color = "#000000";
    } else {
        for (let i = 0; i < addedExtras.length; i++) {
            if (addedExtras[i].id === chosenExtra.id) {
                addedExtras.splice(i, 1);
            }
        }

        extraElement.style.backgroundColor = "";
        extraElement.style.color = "#ffffff";
    }
    updateTotalPriceInItem(sizePrice, null, false);
};

const updateExtrasInItem = (extraElement, chosenExtra, orderIndex, sizePrice) => {
    if (!orderItems[orderIndex].extras.includes(chosenExtra)) {
        orderItems[orderIndex].extras.push(chosenExtra);

        extraElement.style.backgroundColor = "#ffffff";
        extraElement.style.color = "var(--drinks-menu-color)";
    } else {
        for (let i = 0; i < orderItems[orderIndex].extras.length; i++) {
            if (orderItems[orderIndex].extras[i].id === chosenExtra.id) {
                orderItems[orderIndex].extras.splice(i, 1);
            }
        }

        extraElement.style.backgroundColor = "";
        extraElement.style.color = "#ffffff";
    }
    updateTotalPriceInItem(sizePrice, orderIndex, true);
};

const updateTotalPriceInOrder = () => {
    const orderSectionTotalPrice = document.getElementById("order-section-total-price");
    let orderTotalPrice = 0;

    for (let i = 0; i < orderItems.length; i++) {
        orderTotalPrice += orderItems[i].price;
    };
    orderSectionTotalPrice.innerHTML = `KR ${orderTotalPrice},00`;
};

const updateTotalPriceInItem = (sizePrice, orderIndex, editItemInOrder) => {
    const orderItemTotalPrice = document.getElementById("order-item-total-price");
    let itemTotalPrice = sizePrice;

    if (editItemInOrder) {
        for (let i = 0; i < orderItems[orderIndex].extras.length; i++) {
            itemTotalPrice += orderItems[orderIndex].extras[i].price;
        }
    } else {
        for (let i = 0; i < addedExtras.length; i++) {
            itemTotalPrice += addedExtras[i].price;
        }
    };
    orderItemTotalPrice.innerHTML = `${itemTotalPrice},00`;
};

const addItemToOrder = (index, isTheItemADrink, sizeNr) => {
    const orderItemTotalPrice = document.getElementById("order-item-total-price");
    const paymentSection = document.getElementById("payment-section");
    const orderSectionContainer = document.getElementById("order-section");
    const orderItemCard = document.createElement("div");
    const orderItemCardContent = document.createElement("div");
    orderItemCard.className = "order-item-card";
    if (orderSectionContainer.querySelector('#order-section-list') === null) {
        if (mediaQuery.matches) {
            const paymentSection = document.getElementById("payment-section");
            menuSection.style.display = "none";
            paymentSection.style.display = "grid";
            orderSectionContainer.innerHTML = `
                <div id="order-section-header">
                    <button type="button" class="mobile-back-button" id="order-back-button" onclick="returnToPreviousPage(id)">
                    <i class="fa fa-angle-left fa-4x" alt="Pil venstre"></i>
                </button>
                    <h3>BESTILLING</h3>
                </div>
                <div id="order-section-list"></div>
                <div id="order-section-total-price-container">
                    <h3>TOTALT</h3>
                    <p id="order-section-total-price"><p>
                </div>
            `;
        } else {
            orderSectionContainer.innerHTML = `
                <div id="order-section-header">
                    <i class="fa fa-shopping-cart fa-2x alt="Handlevogn"></i>
                    <h3>BESTILLING</h3>
                </div>
                <div id="order-section-list"></div>
                <div id="order-section-total-price-container">
                    <h3>TOTALT Å BETALE:</h3>
                    <p id="order-section-total-price"><p>
                </div>
            `;
        }
    };

    let id = orderItems.length + 1;
    if (orderItems.length > 0) {
        for (let i = 0; i < orderItems.length; i++) {
            if (id <= orderItems[i].id) {
                id = orderItems[i].id + 1;
            }
        }
    };

    if (isTheItemADrink === true) {
        const name = drinkItems[index].name;
        const isDrink = true;
        const imagePath = drinkItems[index].imagePath;
        const size = sizeNr;
        const price = parseInt(orderItemTotalPrice.innerHTML);
        const extras = addedExtras;
        addedExtras = [];

        const item = { id, name, isDrink, imagePath, size, price, extras };
        orderItems.push(item);

        orderItemCard.innerHTML = `
            <button class="delete-item-button" onclick="renderDeletionOptions(this, ${id})" style="background-color:var(--drinks-menu-color)">
                <i class="fa fa-trash fa-2x"></i>
            </button>
        `;

        orderItemCardContent.classList.add("drinks-order-item-card-content");
        orderItemCardContent.classList.add("order-item-card-content");
        orderItemCardContent.id = `order-item-card-content-${id}`;

        orderItemCardContent.innerHTML = `
            <img src="${imagePath}" alt="${name}" width="50px" height="50px">
            <h4>${name.toUpperCase()}</h4>
            <h2>${price},00</h2>
        `;

        orderItemCardContent.setAttribute("onclick", `renderOptions(${index}, ${id - 1}, true)`);
        orderItemCard.insertBefore(orderItemCardContent, orderItemCard.firstChild);
    } else {
        const name = dessertItems[index].name;
        const isDrink = false;
        const imagePath = dessertItems[index].imagePath;
        const price = dessertItems[index].price;

        const item = { id, name, isDrink, imagePath, price };
        orderItems.push(item);

        orderItemCard.innerHTML = `
            <button class="delete-item-button" onclick="renderDeletionOptions(this, ${id})" style="background-color:var(--desserts-menu-color)">
                <i class="fa fa-trash fa-2x"></i>
            </button>
        `;

        orderItemCardContent.classList.add("desserts-order-item-card-content");
        orderItemCardContent.classList.add("order-item-card-content");

        orderItemCardContent.innerHTML = `
            <img src="${imagePath}" alt="${name}" width="50px" height="50px">
            <h4>${name.toUpperCase()}</h4>
            <h2>${price},00</h2>
        `;
    }

    orderItemCard.insertBefore(orderItemCardContent, orderItemCard.firstChild);

    const orderSectionList = document.getElementById("order-section-list");
    orderSectionList.appendChild(orderItemCard);
    updateTotalPriceInOrder();

    if (paymentSection.querySelector('.pay-button') === null) {
        revealOrderSection(orderSectionContainer, paymentSection);
    };

    closeOptionsMenu();
};

const revealOrderSection = (orderSectionContainer, paymentSection) => {
    if (!mediaQuery.matches) {
        orderSectionContainer.style.backgroundColor = "var(--lighter-gray-color)";
    } else {
        orderSectionContainer.style.backgroundColor = "#ffffff";
    }
    paymentSection.style.border = "0";
    paymentSection.style.gridTemplateRows = "repeat(5, 1fr)";

    const cashPayButton = document.createElement("button");
    cashPayButton.addEventListener("click", () => {
        completeOrder()
    });
    cashPayButton.className = "pay-button";
    cashPayButton.id = "cash-pay-button";

    if (!mediaQuery.matches) {
        cashPayButton.innerHTML = `
        <i class="fa fa-money fa-4x alt="Pengeseddel"></i>
        <h4>KONTANTER</h4>
    `;
    } else {
        cashPayButton.innerHTML = `
        <img src="images/icons/vipps-logo.png" alt="Vipps logo" width="120px">
        <h4>VIPPS</h4>
    `;
    }

    const cardPayButton = document.createElement("button");
    cardPayButton.addEventListener("click", () => {
        completeOrder()
    });
    cardPayButton.className = "pay-button";
    cardPayButton.id = "card-pay-button";
    cardPayButton.innerHTML = `
        <i class="fa fa-credit-card fa-3x" alt="Kredittkort"></i>
        <h4>KORT</h4>
    `;

    paymentSection.appendChild(cashPayButton);
    paymentSection.appendChild(cardPayButton);
};

const completeOrder = () => {
    const paymentSection = document.getElementById("payment-section");
    const orderSection = document.getElementById("order-section");

    const items = orderItems;
    const orderNr = completedOrders.length + 1;
    let totalPrice = 0;
    for (let i = 0; i < items.length; i++) {
        totalPrice += items[i].price;
    };
    const order = { orderNr, totalPrice, items };
    orderItems = [];

    if (order.items.length > 0) {
        completedOrders.push(order);
    };

    while (paymentSection.lastChild.id !== "order-section") {
        paymentSection.removeChild(paymentSection.lastChild);
    };
    removeChildNodes(orderSection);
    removeChildNodes(popularItemsMenuContainer)
    removeChildNodes(mainMenuContainer);

    paymentSection.style.border = "1px solid var(--lighter-gray-color)";
    popularItemsMenuContainer.style.border = "1px solid var(--lighter-gray-color)";
    mainMenuContainer.style.border = "1px solid var(--lighter-gray-color)";
    orderSection.style.backgroundColor = "transparent";

    if (menuSection.querySelector('.item-img-and-name') !== null) {
        closeOptionsMenu();
    }
};

const renderDeletionOptions = (orderItemCardButton, id) => {
    const orderItemCard = orderItemCardButton.parentElement;
    const backgroundColor = orderItemCardButton.style.backgroundColor;

    const stashedOrderItemCard = orderItemCard.innerHTML;
    removeChildNodes(orderItemCard);

    let item = "";
    for (var i = 0; i < orderItems.length; i++) {
        if (orderItems[i].id === id) {
            item = orderItems[i].name;
        }
    };

    const deletionCard = document.createElement("div");
    deletionCard.innerHTML = `
        <p>SLETTE ${item.toUpperCase()}?</p>
    `;

    deletionCard.className = "deletion-card";
    deletionCard.style.backgroundColor = backgroundColor;

    const confirmDeletionButton = document.createElement("button");
    confirmDeletionButton.className = "confirm-deletion-button";
    confirmDeletionButton.innerHTML = `<i class="fa fa-check" alt="Hake-ikon"></i> JA`;
    confirmDeletionButton.addEventListener("click", () => {
        deleteItemFromOrder(orderItemCard, id)
    });

    const cancelDeletionButton = document.createElement("button");
    cancelDeletionButton.className = "cancel-deletion-button";
    cancelDeletionButton.innerHTML = `<i class="fa fa-times" alt="Kryss"></i> NEI`;
    cancelDeletionButton.addEventListener("click", () => {
        removeChildNodes(orderItemCard);
        orderItemCard.innerHTML = stashedOrderItemCard;
    });

    deletionCard.appendChild(confirmDeletionButton);
    deletionCard.appendChild(cancelDeletionButton);
    orderItemCard.appendChild(deletionCard);
};

const deleteItemFromOrder = (orderItemCard, id) => {
    const orderSectionList = document.getElementById("order-section-list");
    for (let i = 0; i < orderItems.length; i++) {
        if (orderItems[i].id === id) {
            orderItems.splice(i, 1);
        }
    }
    orderSectionList.removeChild(orderItemCard);
    updateTotalPriceInOrder();

    if (menuSection.querySelector('.item-img-and-name') !== null) {
        closeOptionsMenu();
    }
};

const renderActiveUserAccount = () => {
    const userAccountHeader = document.getElementById("user-account-header");
    const activeUserAccount = JSON.parse(window.localStorage.getItem("activeUserAccount")) || [];
    if (activeUserAccount.length === 0) {
        document.location = "desktop-login.html";
    }

    for (const userAccount of activeUserAccount) {
        const activeUserAccountDisplay = document.createElement("a");
        activeUserAccountDisplay.href = "desktop-login.html";
        activeUserAccountDisplay.id = "active-user-account-display";
        activeUserAccountDisplay.innerHTML = `
            <img src="images/employees/${userAccount.image}" alt="${userAccount.firstName} ${userAccount.lastName} (ansatt)">
            <h2>${userAccount.firstName} ${userAccount.lastName}</h2>
        `;

        userAccountHeader.appendChild(activeUserAccountDisplay);
    }
}

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
    } else if (button === "order-back-button") {
        const paymentSection = document.getElementById("payment-section");
        paymentSection.style.display = "none";
        body.style.margin = "1rem";
        body.style.height = "98%";
        html.style.height = "98%";
        mainNavigationSection.style.display = "grid";
    }
};
