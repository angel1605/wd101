document.addEventListener("DOMContentLoaded", () => {
  const dobInput = document.getElementById("dob");

  // Set DOB min and max for age between 18 and 55
  const today = new Date();
  const minDate = new Date(today.getFullYear() - 55, today.getMonth(), today.getDate());
  const maxDate = new Date(today.getFullYear() - 18, today.getMonth(), today.getDate());

  dobInput.min = minDate.toISOString().split("T")[0];
  dobInput.max = maxDate.toISOString().split("T")[0];

  const form = document.getElementById("registrationForm");
  const tableBody = document.getElementById("userTableBody");

  function loadUsers() {
    tableBody.innerHTML = "";
    const users = JSON.parse(localStorage.getItem("users")) || [];
    users.forEach(user => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${user.name}</td>
        <td>${user.email}</td>
        <td>${user.password}</td>
        <td>${user.dob}</td>
        <td>${user.acceptedTerms}</td>
      `;
      tableBody.appendChild(row);
    });
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const dob = document.getElementById("dob").value;
    const acceptedTerms = document.getElementById("acceptTerms").checked;

    const user = { name, email, password, dob, acceptedTerms };
    const users = JSON.parse(localStorage.getItem("users")) || [];
    users.push(user);
    localStorage.setItem("users", JSON.stringify(users));

    form.reset();
    loadUsers();
  });

  loadUsers(); // Load on page start
});
