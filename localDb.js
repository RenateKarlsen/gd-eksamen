//import dataArray from 'data.js';

const db = openDatabase('mydb', '1.0', 'GD-eksamen', 2 * 1024 * 1024);

const htmlDiv = document.getElementById("testDbSelector");
const kasseDiv = document.getElementById("kasse-div");
const totalSumDiv = document.getElementById("total-sum");

for (let i = 0; i < dataArray.length; i++) {
    htmlDiv.innerHTML += `
        <h1>${dataArray[i].name}</h1>
        <p>${dataArray[i].price}</p>
        <button onclick="addToDatabase('${dataArray[i].name}', '${dataArray[i].price}')">Legg i handlekurv</button>
    `;
}

/*db.transaction(function (tx) {
    tx.executeSql('DROP TABLE checkout');
    console.log("table succesfully removed");
})*/

//Creating the table if not existing on load
db.transaction(function (tx) {
    tx.executeSql('CREATE TABLE IF NOT EXISTS checkout (id INTEGER PRIMARY KEY, name, image, price)');
    console.log("table succesfully created");
})

/*function addToDatabase (name, price) {
    nameObject = name;
    priceObject = price;
}*/


function addToDatabase(name, price) {
    db.transaction(function (tx) {
        tx.executeSql('INSERT INTO checkout(name,price) VALUES (?,?)',[name, price], function(tx) {
            console.log("data sucessfully inserted");
            location.reload();
        });
    })
}

function removeFromDB(id) {
    //DELETE FROM Customers WHERE CustomerName='Alfreds Futterkiste';
    db.transaction(function (tx) {
        tx.executeSql('DELETE FROM checkout WHERE id=?',[id], function(tx) {
            console.log("data sucessfully removed");
            location.reload();
        });
    })
}

db.transaction(function (tx) { 
    tx.executeSql('SELECT * FROM checkout', [], function (tx, results) { 
       var len = results.rows.length, i; 
       /*msg = "<p>Found rows: " + len + "</p>"; 
       kasseDiv.innerHTML +=  msg; */

       for (i = 0; i < len; i++) { 
          //msg = "<p><b>" + results.rows.item(i).log + "</b></p>"; 
          kasseDiv.innerHTML +=  `
            <h3>${results.rows.item(i).name}</h3>
            <h4>${new Intl.NumberFormat('no-NO', { style: 'currency', currency: 'NOK'}).format(results.rows.item(i).price)}</h4>
            <button onclick="removeFromDB('${results.rows.item(i).id}')">Fjern</button>
            `; 
       } 
    }, null); 
 }); 

 db.transaction(function (tx) { 
    tx.executeSql('SELECT SUM(price) price FROM checkout', [], function (tx, results) { 
       var len = results.rows.length, i; 
       /*msg = "<p>Found rows: " + len + "</p>"; 
       kasseDiv.innerHTML +=  msg; */

       for (i = 0; i < len; i++) { 
          //msg = "<p><b>" + results.rows.item(i).log + "</b></p>"; 
          totalSumDiv.innerHTML = `<h3>${new Intl.NumberFormat('no-NO', { style: 'currency', currency: 'NOK'}).format(results.rows.item(i).price)}</h3>`;
       } 
    }, null); 
 }); 


 function successfullPayment() {
    db.transaction(function (tx) {
        tx.executeSql('DROP TABLE checkout');
        console.log("successful payment received");
        location.reload();
    })
 }


