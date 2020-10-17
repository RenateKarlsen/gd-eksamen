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
    const maxEmployees = 12;
    for (let i = 0; i < maxEmployees; i++) {
        const employeeSlot = document.createElement("div");
        employeeSlot.className = "employee-slot";
        employeeContainer.appendChild(employeeSlot);
    }
    renderEmployeeList();
};

const renderEmployeeList = () => {
    const employeeSlots = document.getElementsByClassName("employee-slot");
    for (let i = 0; i < employees.length; i++) {
        const employeeButton = createEmployeeButton(employees[i]);
        employeeSlots[i].appendChild(employeeButton);
    }
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
    localStorage.clear();
    const activeUserAccount = JSON.parse(localStorage.getItem('activeUserAccount')) || [];
    activeUserAccount.push(userAccount);
    window.localStorage.setItem('activeUserAccount', JSON.stringify(activeUserAccount));
};

createEmployeeSlots();