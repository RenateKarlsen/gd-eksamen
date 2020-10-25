if (window.matchMedia("(max-width: 600px)").matches) {
    document.location = "index.html";
}

const rightScrollButton = document.getElementById("right-scroll-button");
const leftScrollButton = document.getElementById("left-scroll-button");

// Dropping table on every load to ensure no data is duplicated
db.transaction(function (tx) {
    tx.executeSql('DROP TABLE employees');
    console.log("table succesfully removed");
})

db.transaction(function (tx) {
    tx.executeSql('DROP TABLE activeUserAccount');
    console.log("table succesfully removed");
})

// Creating tables for employees and selected employee
db.transaction(function (tx) {
    tx.executeSql('CREATE TABLE IF NOT EXISTS employees (id INTEGER PRIMARY KEY, firstName unique, lastName uniqie, image)');
    console.log("table succesfully created");
});

db.transaction(function (tx) {
    tx.executeSql('CREATE TABLE IF NOT EXISTS activeUserAccount (id INTEGER PRIMARY KEY, firstName unique, lastName uniqie, image)');
    console.log("table succesfully created");
});

for (let i = 0; i < employees.length; i++) {
    db.transaction(function (tx) {
        tx.executeSql('INSERT INTO employees(firstName, lastName, image) VALUES(?,?,?)', [employees[i].firstName, employees[i].lastName, employees[i].image])
    });
}

rightScrollButton.addEventListener('click', () => {
    document.getElementById("employee-container").scrollLeft += 170;
});

leftScrollButton.addEventListener('click', () => {
    document.getElementById("employee-container").scrollLeft -= 170;
});

const createEmployeeButton = (employee) => {
    const employeeButton = document.createElement("button");
    employeeButton.type = "button";
    employeeButton.className = "employee-button";
    employeeButton.id = `employee-button-${employee.id}`
    employeeButton.innerHTML = `
    <img src="images/employees/${employee.image}" alt="${employee.firstName} ${employee.lastName} (ansatt)">`;
    employeeButton.addEventListener('click', () => {
        chooseEmployee(employee)
    });

    return employeeButton;
};

const createEmployeeSlots = () => {
    const employeeContainer = document.getElementById("employee-container");
    const maxEmployees = 18;
    for (let i = 0; i < maxEmployees; i++) {
        const employeeSlot = document.createElement("div");
        employeeSlot.className = "employee-slot";
        employeeContainer.appendChild(employeeSlot);
    }
    renderEmployeeList();
};

const renderEmployeeList = () => {
    const employeeSlots = document.getElementsByClassName("employee-slot");

    db.transaction(function(tx) {
        tx.executeSql('SELECT * FROM employees', [], function(tx, results) {
            let len = results.rows.length, i;

            for (i = 0; i < len; i++) {
                const employeeButton = createEmployeeButton(results.rows.item(i));
                employeeSlots[i].appendChild(employeeButton);
            }
        })
    });
};

const chooseEmployee = (employee) => {
    const nameHeader = document.getElementById("name-header");
    const chosenEmployeeCard = document.createElement("div");
    chosenEmployeeCard.id = "chosen-employee-card";
    chosenEmployeeCard.innerHTML = `
        <img src="images/employees/${employee.image}" alt="${employee.firstName} ${employee.lastName} (ansatt)">
        <h2>${employee.firstName}<br>${employee.lastName}</h2>
    `;
    nameHeader.innerHTML = "";
    nameHeader.appendChild(chosenEmployeeCard);

    styleClickedEmployeeButton(employee);
    setActiveUserAccount(employee);
    renderStartButton();
};

const styleClickedEmployeeButton = (employee) => {
    const employeeButton = document.getElementById(`employee-button-${employee.id}`);
    const employeeButtons = document.getElementsByClassName("employee-button");
    for (const employeeButton of employeeButtons) {
        employeeButton.style.opacity = "1";
    }
    employeeButton.style.opacity = "0.2";
};

const renderStartButton = () => {
    const startButtonContainer = document.getElementById("start-button-container");
    startButtonContainer.innerHTML = "";
    const form = document.createElement("form");
    form.action = "index.html";
    form.method = "get";
    const startButton = document.createElement("button");
    startButton.innerHTML = "START";
    startButton.id = "start-button";
    form.appendChild(startButton);
    startButtonContainer.appendChild(form);
};

const setActiveUserAccount = (userAccount) => {    
    db.transaction(function(tx) {
        db.transaction(function (tx) {
            tx.executeSql('INSERT INTO activeUserAccount(firstName, lastName, image) VALUES(?,?,?)', [userAccount.firstName, userAccount.lastName, userAccount.image])
        });
    })
};

createEmployeeSlots();