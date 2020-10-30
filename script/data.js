const db = openDatabase('mydb', '1.0', 'GD-eksamen', 2 * 1024 * 1024);

const drinkItems = [
    {
        drinkName: "Americano",
        isDrinkPopular: false,
        isPurchasedByUserEarlier: false,
        imagePath: "images/stock/americano.png",
        price: {
            small: 28,
            medium: 32,
            large: 36
        }
    },
    {
        drinkName: "Caffè Latte",
        isDrinkPopular: true,
        isPurchasedByUserEarlier: false,
        imagePath: "images/stock/caffee-latte.png",
        price: {
            small: 38,
            medium: 42,
            large: 46
        }
    },
    {
        drinkName: "Caffè Mocha",
        isDrinkPopular: false,
        isPurchasedByUserEarlier: false,
        imagePath: "images/stock/caffee-mocha.png",
        price: {
            small: 32,
            medium: 36,
            large: 40
        }
    },
    {
        drinkName: "Cappuccino",
        isDrinkPopular: true,
        isPurchasedByUserEarlier: false,
        imagePath: "images/stock/cappuccino.png",
        price: {
            small: 36,
            medium: 42,
            large: 50
        }
    },
    {
        drinkName: "Caramel Macchiato",
        isDrinkPopular: false,
        isPurchasedByUserEarlier: true,
        imagePath: "images/stock/caramel-macchiato.png",
        price: {
            small: 38,
            medium: 42,
            large: 46
        }
    },
    {
        drinkName: "Cortado",
        isDrinkPopular: false,
        isPurchasedByUserEarlier: false,
        imagePath: "images/stock/cortado.png",
        price: {
            small: 38,
            medium: 44,
            large: 48
        }
    },
    {
        drinkName: "Espresso",
        isDrinkPopular: true,
        isPurchasedByUserEarlier: false,
        imagePath: "images/stock/espresso.png",
        price: {
            small: 45,
            medium: 48,
            large: 51
        }
    },
    {
        drinkName: "Filterkaffe",
        isDrinkPopular: true,
        isPurchasedByUserEarlier: true,
        imagePath: "images/stock/filterkaffe.png",
        price: {
            small: 34,
            medium: 38,
            large: 42
        }
    },
    {
        drinkName: "Iskaffe",
        isDrinkPopular: true,
        isPurchasedByUserEarlier: true,
        imagePath: "images/stock/iskaffe.png",
        price: {
            small: 36,
            medium: 40,
            large: 44
        }
    },
    {
        drinkName: "Iste",
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
        dessertName: "Brioche",
        isDessertPopular: false,
        isPurchasedByUserEarlier: false,
        imagePath: "images/stock/brioche.png",
        price: 44,
    },
    {
        dessertName: "Brownies",
        isDessertPopular: true,
        isPurchasedByUserEarlier: false,
        imagePath: "images/stock/brownies.png",
        price: 54,
    },
    {
        dessertName: "Chiapudding",
        isDessertPopular: false,
        isPurchasedByUserEarlier: false,
        imagePath: "images/stock/chiapudding.png",
        price: 46,
    },
    {
        dessertName: "Croissant",
        isDessertPopular: true,
        isPurchasedByUserEarlier: true,
        imagePath: "images/stock/croissant.png",
        price: 38,
    },
    {
        dessertName: "Kanelbolle",
        isDessertPopular: true,
        isPurchasedByUserEarlier: false,
        imagePath: "images/stock/kanelbolle.png",
        price: 42,
    },
    {
        dessertName: "Oreokake",
        isDessertPopular: true,
        isPurchasedByUserEarlier: true,
        imagePath: "images/stock/oreokake.png",
        price: 44,
    },
    {
        dessertName: "Scones",
        isDessertPopular: true,
        isPurchasedByUserEarlier: false,
        imagePath: "images/stock/scones.png",
        price: 37,
    },
];

const employees = [
    {   
        id: 0,
        firstName: "Eirik",
        lastName: "Lundanes",
        image: "1.jpg"
    },
    {
        id: 1,
        firstName: "Karoline",
        lastName: "Andersen",
        image: "2.jpg"
    },
    {
        id: 2,
        firstName: "Pål Anders",
        lastName: "Byenstuen",
        image: "3.jpg"
    },
    {
        id: 3,
        firstName: "Renate",
        lastName: "Karlsen",
        image: "4.jpg"
    },
    {
        id: 4,
        firstName: "Vibeke",
        lastName: "Opgård",
        image: "5.png"
    }
];

const completedOrders = [
    {
        orderNr: 1,
        totalPrice: 90,
        items: [
            {
                name: "Caffè Latte",
                isDrink: true,
                imagePath: "images/stock/caffee-latte.png",
                size: "medium",
                price: 45,
                extras: [
                    {
                        name: "soyamelk",
                        price: 3
                    }
                ]
            },
            {
                name: "Espresso",
                isDrink: true,
                imagePath: "images/stock/espresso.png",
                size: "small",
                price: 45,
                extras: []
            }
        ]
    },
    {
        orderNr: 2,
        totalPrice: 133,
        items: [
            {
                name: "Filterkaffe",
                isDrink: true,
                imagePath: "images/stock/filterkaffe.png",
                size: "large",
                price: 42,
                extras: []
            },
            {
                name: "Iste",
                isDrink: true,
                imagePath: "images/stock/iste.png",
                size: "large",
                price: 55,
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
                size: "small",
                price: 34,
                extras: [
                    {
                        name: "kumelk",
                        price: 0
                    }
                ]
            }
        ]
    }
]