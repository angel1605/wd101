window.addEventListener("DOMContentLoaded", () => {
    setDobRange();
    loadEntries();
  });
  
  function setDobRange() {
    const dobInput = document.getElementById("dob");
    const today = new Date();
    const minDate = new Date(today.getFullYear() - 55, today.getMonth(), today.getDate());
    const maxDate = new Date(today.getFullYear() - 18, today.getMonth(), today.getDate());
  
    dobInput.setAttribute("min", minDate.toISOString().split("T")[0]);
    dobInput.setAttribute("max", maxDate.toISOString().split("T")[0]);
  }
  
  function loadEntries() {
    const entries = JSON.parse(localStorage.getItem("userEntries")) || [];
    const tbody = document.querySelector("#entriesTable tbody");
    tbody.innerHTML = "";
  
    entries.forEach(entry => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td>${entry.name}</td>
        <td>${entry.email}</td>
        <td>${entry.password}</td>
        <td>${entry.dob}</td>
        <td>${entry.acceptedTerms}</td>
      `;
      tbody.appendChild(tr);
    });
  }
  
  document.getElementById("registrationForm").addEventListener("submit", function(e) {
    e.preventDefault();
  
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;
    const dob = document.getElementById("dob").value;
    const acceptedTerms = document.getElementById("acceptTerms").checked;
  
    if (!validateEmail(email)) {
      alert("Please enter a valid email address.");
      return;
    }
  
    if (!validateAge(dob)) {
      alert("Age must be between 18 and 55.");
      return;
    }
  
    const newEntry = { name, email, password, dob, acceptedTerms };
  
    const entries = JSON.parse(localStorage.getItem("userEntries")) || [];
    entries.push(newEntry);
    localStorage.setItem("userEntries", JSON.stringify(entries));
  
    loadEntries();
    this.reset();
  });
  
  function validateEmail(email) {
    const pattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
    return pattern.test(email.toLowerCase());
  }
  
  function validateAge(dob) {
    const birthDate = new Date(dob);
    const today = new Date();
    const age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    return (age > 18 || (age === 18 && m >= 0)) && (age < 55 || (age === 55 && m <= 0));
  }
