function getIndex() {
    
        switch (event.target.alt) {
            case "Americano":
                itemIndex = 0;
            break;
    
            case "Caffè Latte":
                itemIndex = 1;
            break;
    
            case "Caffè Mocha":
                itemIndex = 2;
            break;
    
            case "Cappuccino":
                itemIndex = 3;
            break;
    
            case "Caramel Macchiato":
                itemIndex = 4;
            break;
    
            case "Cortado":
                itemIndex = 5;
            break;
    
            case "Espresso":
                itemIndex = 6;
            break;
    
            case "Filterkaffe":
                itemIndex = 7;
            break;
    
            case "Iskaffe":
                itemIndex = 8;
            break;
    
            case "Iste":
                itemIndex = 9;
            break;
    
            case "Brioche":
                itemIndex = 10;
            break;
    
            case "Brownies":
                itemIndex = 11;
            break;

            case "Chiapudding":
                itemIndex = 12;
            break;

            case "Croissant":
                itemIndex = 13;
            break;

            case "Kanelbolle":
                itemIndex = 14;
            break;

            case "Oreokake":
                itemIndex = 15;
            break;

            case "Scones":
                itemIndex = 16;
            break;

            default:
                itemIndex = 0;
            break
        }
        return itemIndex;
    }
    