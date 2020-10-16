const employees = [
    {
        firstName: "Eirik",
        lastName: "Lundanes",
        image: "paal-anders-byenstuen.jpeg"
    },
    {
        firstName: "Karoline",
        lastName: "Andersen",
        image: "paal-anders-byenstuen.jpeg"
    },
    {
        firstName: "Pål Anders",
        lastName: "Byenstuen",
        image: "paal-anders-byenstuen.jpeg"
    },
    {
        firstName: "Renate",
        lastName: "Karlsen",
        image: "paal-anders-byenstuen.jpeg"
    },
    {
        firstName: "Vibeke",
        lastName: "Opgård",
        image: "paal-anders-byenstuen.jpeg"
    }
];

const createEmployeeButton = (employee) => {
    const employeeButton = document.createElement("button");
    employeeButton.type = "button";
    employeeButton.className = "button employee-button";
    employeeButton.innerHTML = `
    <img src="images/employees/${employee.image}" alt="${employee.firstName} ${employee.lastName} (ansatt)">`;
    employeeButton.addEventListener('click', () => {
        chooseEmployee(employee.image, employee.firstName, employee.lastName)
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
}

const renderEmployeeList = () => {
    const employeeSlots = document.getElementsByClassName("employee-slot");
    for (let i = 0; i < employees.length; i++) {
        const employeeButton = createEmployeeButton(employees[i]);
        employeeSlots[i].appendChild(employeeButton);
    }
}

const chooseEmployee = (image, firstName, lastName) => {
    const nameHeader = document.getElementById("name-header");
    const chosenEmployeeCard = document.createElement("div");
    chosenEmployeeCard.id = "chosen-employee-card";
    chosenEmployeeCard.innerHTML = `
        <img src="images/employees/${image}" alt="${firstName} ${lastName} (ansatt)">
        <h2>${firstName}<br>${lastName}</h2>
    `;
    nameHeader.innerHTML = "";
    nameHeader.appendChild(chosenEmployeeCard);

    renderStartButton();
}

const renderStartButton = () => {
    const startButtonContainer = document.getElementById("start-button-container");
    startButtonContainer.innerHTML = "";
    const form = document.createElement("form");
    form.action = "index.html";
    form.method = "get";
    const startButton = document.createElement("button");
    startButton.innerHTML = "START";
    startButton.id = "start-button";
    startButton.className = "button";
    form.appendChild(startButton);
    startButtonContainer.appendChild(form);
}

createEmployeeSlots();