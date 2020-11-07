const drinkItems = [
    {
        name: "Americano",
        isDrinkPopular: false,
        isPurchasedByUserEarlier: false,
        imagePath: "images/stock/americano.png",
        price: {
            small: 32,
            medium: 36,
            large: 40
        }
    },
    {
        name: "Caffè Latte",
        isDrinkPopular: true,
        isPurchasedByUserEarlier: false,
        imagePath: "images/stock/caffee-latte.png",
        price: {
            small: 38,
            medium: 44,
            large: 48
        }
    },
    {
        name: "Caffè Mocha",
        isDrinkPopular: false,
        isPurchasedByUserEarlier: false,
        imagePath: "images/stock/caffee-mocha.png",
        price: {
            small: 38,
            medium: 42,
            large: 46
        }
    },
    {
        name: "Cappuccino",
        isDrinkPopular: true,
        isPurchasedByUserEarlier: false,
        imagePath: "images/stock/cappuccino.png",
        price: {
            small: 38,
            medium: 42,
            large: 46
        }
    },
    {
        name: "Caramel Macchiato",
        isDrinkPopular: false,
        isPurchasedByUserEarlier: true,
        imagePath: "images/stock/caramel-macchiato.png",
        price: {
            small: 45,
            medium: 48,
            large: 51
        }
    },
    {
        name: "Cortado",
        isDrinkPopular: false,
        isPurchasedByUserEarlier: false,
        imagePath: "images/stock/cortado.png",
        price: {
            small: 36,
            medium: 40,
            large: 44
        }
    },
    {
        name: "Espresso",
        isDrinkPopular: true,
        isPurchasedByUserEarlier: false,
        imagePath: "images/stock/espresso.png",
        price: {
            small: 34,
            medium: 38,
            large: 42
        }
    },
    {
        name: "Filterkaffe",
        isDrinkPopular: true,
        isPurchasedByUserEarlier: true,
        imagePath: "images/stock/filterkaffe.png",
        price: {
            small: 28,
            medium: 32,
            large: 36
        }
    },
    {
        name: "Iskaffe",
        isDrinkPopular: true,
        isPurchasedByUserEarlier: true,
        imagePath: "images/stock/iskaffe.png",
        price: {
            small: 36,
            medium: 42,
            large: 50
        }
    },
    {
        name: "Iste",
        isDrinkPopular: false,
        isPurchasedByUserEarlier: false,
        imagePath: "images/stock/iste.png",
        price: {
            small: 38,
            medium: 47,
            large: 55
        }
    },
];

const dessertItems = [
    {
        name: "Brioche",
        isDessertPopular: false,
        isPurchasedByUserEarlier: false,
        imagePath: "images/stock/brioche.png",
        price: 44,
    },
    {
        name: "Brownies",
        isDessertPopular: true,
        isPurchasedByUserEarlier: false,
        imagePath: "images/stock/brownies.png",
        price: 44,
    },
    {
        name: "Chiapudding",
        isDessertPopular: false,
        isPurchasedByUserEarlier: false,
        imagePath: "images/stock/chiapudding.png",
        price: 42,
    },
    {
        name: "Croissant",
        isDessertPopular: true,
        isPurchasedByUserEarlier: true,
        imagePath: "images/stock/croissant.png",
        price: 38,
    },
    {
        name: "Kanelbolle",
        isDessertPopular: true,
        isPurchasedByUserEarlier: false,
        imagePath: "images/stock/kanelbolle.png",
        price: 46,
    },
    {
        name: "Oreokake",
        isDessertPopular: true,
        isPurchasedByUserEarlier: true,
        imagePath: "images/stock/oreokake.png",
        price: 54,
    },
    {
        name: "Scones",
        isDessertPopular: true,
        isPurchasedByUserEarlier: false,
        imagePath: "images/stock/scones.png",
        price: 37,
    },
];

const extraOptions = [
    {
        id: 0,
        name: "Espresso",       
        price: 6,
        image: "espresso.png"
    }, 
    {
        id: 1,
        name: "Kumelk",         
        price: 0,
        image: "kumelk.png"
    },
    {
        id: 2,
        name: "Soyamelk",       
        price: 3,
        image: "soyamelk.png"
    },
    {
        id: 3,
        name: "Vanilje-sirup",   
        price: 3,
        image: "vaniljesirup.png"
    },
    {
        id: 4,
        name: "Sjokolade-sirup", 
        price: 3,
        image: "sjokoladesirup.png"
    },
    {
        id: 5,
        name: "Krem",
        price: 4,
        image: "krem.png"
    }
];

let addedExtras = [];
let orderItems = [];

const completedOrders = [
    {
        orderNr: 1,
        totalPrice: 82,
        items: [
            {
                name: "Caffè Latte",
                isDrink: true,
                imagePath: "images/stock/caffee-latte.png",
                size: 2,
                price: 48,
                extras: [
                    {
                        name: "kumelk",
                        price: 0
                    },
                    {
                        name: "krem",
                        price: 4
                    }
                ]
            },
            {
                name: "Espresso",
                isDrink: true,
                imagePath: "images/stock/espresso.png",
                size: 1,
                price: 34,
                extras: []
            }
        ]
    },
    {
        orderNr: 2,
        totalPrice: 127,
        items: [
            {
                name: "Filterkaffe",
                isDrink: true,
                imagePath: "images/stock/filterkaffe.png",
                size: 3,
                price: 36,
                extras: []
            },
            {
                name: "Iste",
                isDrink: true,
                imagePath: "images/stock/iste.png",
                size: 2,
                price: 47,
                extras: []
            },
            {
                name: "Oreokake",
                isDrink: false,
                imagePath: "images/stock/oreokake.png",
                price: 44
            }
        ]
    },
    {
        orderNr: 3,
        totalPrice: 34,
        items: [
            {
                name: "Filterkaffe",
                isDrink: true,
                imagePath: "images/stock/filterkaffe.png",
                size: 1,
                price: 34,
                extras: [
                    {
                        name: "kumelk",
                        price: 0
                    }
                ]
            }
        ]
    },
    {
        orderNr: 4,
        totalPrice: 157,
        items: [
            {
                name: "Caramel Macchiato",
                isDrink: true,
                imagePath: "images/stock/caramel-macchiato.png",
                size: 2,
                price: 55,
                extras: [
                    {
                        name: "soyamelk",
                        price: 3
                    },
                    {
                        name: "krem",
                        price: 4
                    }
                ]
            },
            {
                name: "Filterkaffe",
                isDrink: true,
                imagePath: "images/stock/filterkaffe.png",
                size: 3,
                price: 36,
                extras: []
            },
            {
                name: "Filterkaffe",
                isDrink: true,
                imagePath: "images/stock/filterkaffe.png",
                size: 1,
                price: 28,
                extras: [
                    {
                        name: "kumelk",
                        price: 0
                    }
                ]
            },
            {
                name: "Croissant",
                isDrink: false,
                imagePath: "images/stock/croissant.png",
                price: 38
            }
        ]
    }
];

const employees = [
    {   
        id: 0,
        firstName: "Eirik",
        lastName: "Lundanes",
        image: "eirik-lundanes.jpg"
    },
    {
        id: 1,
        firstName: "Karoline",
        lastName: "Andersen",
        image: "karoline-andersen.jpg"
    },
    {
        id: 2,
        firstName: "Pål Anders",
        lastName: "Byenstuen",
        image: "paal-anders-byenstuen.jpg"
    },
    {
        id: 3,
        firstName: "Renate",
        lastName: "Karlsen",
        image: "renate-karlsen.jpg"
    },
    {
        id: 4,
        firstName: "Vibeke",
        lastName: "Opgård",
        image: "vibeke-opgaard.jpg"
    }
];
