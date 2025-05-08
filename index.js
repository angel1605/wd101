window.onload = function () {
  const dobInput = document.getElementById("dob");
  const today = new Date();
  const minAge = 18;
  const maxAge = 55;

  const minDate = new Date(today.getFullYear() - maxAge, today.getMonth(), today.getDate());
  const maxDate = new Date(today.getFullYear() - minAge, today.getMonth(), today.getDate());

  dobInput.setAttribute("min", minDate.toISOString().split("T")[0]);
  dobInput.setAttribute("max", maxDate.toISOString().split("T")[0]);

  loadEntries();
};

function loadEntries() {
  const entries = JSON.parse(localStorage.getItem("userEntries")) || [];
  const tableBody = document.querySelector("#entriesTable tbody");
  tableBody.innerHTML = "";

  entries.forEach(entry => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${entry.name}</td>
      <td>${entry.email}</td>
      <td>${entry.password}</td>
      <td>${entry.dob}</td>
      <td>${entry.acceptedTerms}</td>
    `;
    tableBody.appendChild(row);
  });
}

document.getElementById("registrationForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const dob = document.getElementById("dob").value;
  const acceptedTerms = document.getElementById("acceptTerms").checked;

  const entry = { name, email, password, dob, acceptedTerms };

  const entries = JSON.parse(localStorage.getItem("userEntries")) || [];
  entries.push(entry);
  localStorage.setItem("userEntries", JSON.stringify(entries));

  loadEntries();
  this.reset();
});
