const employees = [
    {
        firstName: "Eirik",
        lastName: "Lundanes",
        imagePath: ""
    },
    {
        firstName: "Karoline",
        lastName: "Andersen",
        imagePath: ""
    },
    {
        firstName: "Pål Anders",
        lastName: "Byenstuen",
        imagePath: ""
    },
    {
        firstName: "Renate",
        lastName: "Karlsen",
        imagePath: ""
    },
    {
        firstName: "Vibeke",
        lastName: "Opgård",
        imagePath: ""
    }
];

const createEmployeeButton = (employee) => {
    const employeeButton = document.createElement("button");
    employeeButton.type = "button";
    employeeButton.className = "button employee-button";
    employeeButton.innerHTML = `<img src="${employee.imagePath}" alt="${employee.firstName} ${employee.lastName} (ansatt)">`;
    employeeButton.addEventListener('click', chooseEmployee(employee.imagePath, employee.firstName, employee.lastName));

    return employeeButton;
};

const renderEmployeeList = () => {
    const employeeView = document.getElementById("employee-view");
    employees.map(employee => {
        const employeeButton = createEmployeeButton(employee);
        employeeView.appendChild(employeeButton);
    });
}

const chooseEmployee = (imagePath, firstName, lastName) => {
    const nameHeader = document.getElementById("name-header");
    const chosenEmployeeCard = document.createElement("div");
    chosenEmployeeCard.innerHTML = `
        <img src="${imagePath}" alt="${firstName} ${lastName} (ansatt)">
        <h1>${firstName} <br> ${lastName}</h1>
    `;
    //nameHeader.appendChild(chosenEmployeeCard);

    renderStartButton();
}

const renderStartButton = () => {
    const startButtonContainer = document.getElementById("start-button-container");
    const form = document.createElement("form");
    form.action = "index.html";
    form.method = "get";
    form.style.display = "inline";
    const startButton = document.createElement("button");
    startButton.innerHTML = "START";
    form.appendChild(startButton);
    startButtonContainer.appendChild(form);
}

renderEmployeeList();