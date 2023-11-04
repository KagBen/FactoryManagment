import { getCookie, clearJwt } from "./cookies.js";

const url = "http://localhost:3000/auth/logout";

const injectHeader = () => {
  const div = document.createElement("div");
  const header = document.createElement("header");

  // Create a "Welcome" message
  const welcomeMessage = document.createElement("h4");
  const fullName = getCookie("FullName");
  const role = getCookie("role");
  welcomeMessage.innerHTML = `Welcome <span id="welcome">${fullName} (${role})</span>`;

  // Create a "Logout" button
  const logoutButton = document.createElement("button");
  logoutButton.id = "logoutBtn";
  logoutButton.innerHTML = `Logout`;
  logoutButton.addEventListener("click", async () => {
    const resp = await fetch(url, {
      method: "GET",
    });
    clearJwt();
    location.href = "../loginPage.html";
  });

  header.appendChild(welcomeMessage);

  header.appendChild(logoutButton);

  const navigation = document.createElement("nav");

  const homePage = document.createElement("div");
  homePage.innerHTML = `<a href="../welcomePage.html">Home</a> `;
  // Create a Departments dropdown
  const departmentsDropdown = document.createElement("div");
  departmentsDropdown.classList.add("dropdown");
  departmentsDropdown.innerHTML = `
        <a href="../department.html">Departments &#9660;</a>
        <div class="dropdown-content">
            <a href="../addDepartmentPage.html">Add Department</a>
            <a href="../updateDepartmentPage.html">Update Department</a>
        </div>
    `;

  // Create an Employees dropdown
  const employeesDropdown = document.createElement("div");
  employeesDropdown.classList.add("dropdown");
  employeesDropdown.innerHTML = `
        <a href="../employee.html">Employees &#9660;</a>
        <div class="dropdown-content">
            <a href="../addEmployee.html">Add Employee</a>
            <a href="../updateEmployee.html">Update Employee</a>
        </div>
    `;

  // Create a Shifts dropdown
  const shiftsDropdown = document.createElement("div");
  shiftsDropdown.classList.add("dropdown");
  shiftsDropdown.innerHTML = `
        <a href="../shifts.html">Shifts &#9660;</a>
        <div class="dropdown-content">
            <a href="../addShift.html">Add Shift</a>
            <a href="../shiftUpdate.html">Update Shift</a>
        </div>
    `;

  const users = document.createElement("div");
  users.innerHTML = `<a href="#">Users <sub style="font-size:10px">(only Admins allowed)</sub></a> `;
  const usersLink = users.querySelector("a"); // Assuming you have a link inside the "users" div

  usersLink.addEventListener("click", () => {
    const userRole = getCookie("role");
    if (userRole === "admin") {
      window.location.href = "usersPage.html";
    } else {
      // Show an alert if the user is not an admin
      alert("You do not have permission to access this page.");
    }
  });

  // Append the dropdowns to the navigation menu
  navigation.appendChild(homePage);
  navigation.appendChild(departmentsDropdown);
  navigation.appendChild(employeesDropdown);
  navigation.appendChild(shiftsDropdown);
  navigation.appendChild(users);

  document.addEventListener("DOMContentLoaded", function () {
    // Add dropdown event listeners
    const dropdowns = document.getElementsByClassName("dropdown");
    for (const dropdown of dropdowns) {
      dropdown.addEventListener("mouseenter", function () {
        this.getElementsByClassName("dropdown-content")[0].style.display =
          "block";
      });

      dropdown.addEventListener("mouseleave", function () {
        this.getElementsByClassName("dropdown-content")[0].style.display =
          "none";
      });
    }
  });

  div.appendChild(header);
  div.appendChild(navigation);
  document.body.prepend(div);
};

export { injectHeader };
