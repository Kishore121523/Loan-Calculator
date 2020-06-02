// Listen for submit
document.getElementById("loan-form").addEventListener("submit", function (e) {
  // Hide Results
  document.getElementById("results").style.display = "none";

  // show loader
  document.getElementById("loading").style.display = "block";

  setTimeout(calculateResults, 2000);

  e.preventDefault();
});

// Calculate results
function calculateResults() {
  // UI variables
  const amount = document.getElementById("amount");
  const interest = document.getElementById("interest");
  const years = document.getElementById("years");
  const monthlyPayment = document.getElementById("monthly-payment");
  const totalPayment = document.getElementById("total-payment");
  const totalInterest = document.getElementById("total-interest");

  const principal = parseFloat(amount.value);
  const calculatedInterest = parseFloat(interest.value) / 100 / 12;
  const calcultedPayment = parseFloat(years.value) * 12;

  // compute monthly payment
  const x = Math.pow(1 + calculatedInterest, calcultedPayment);
  const monthly = (principal * x * calculatedInterest) / (x - 1);

  if (isFinite(monthly)) {
    monthlyPayment.value = monthly.toFixed(2);
    totalPayment.value = (monthly * calcultedPayment).toFixed(2);
    totalInterest.value = (monthly * calcultedPayment - principal).toFixed(2);

    // show results
    document.getElementById("results").style.display = "block";
    document.getElementById("loading").style.display = "none";

    //clear all
    document.getElementById("clear").addEventListener("click", clearAll);

    // clearAll
    function clearAll(e) {
      amount.value = "";
      interest.value = "";
      years.value = "";
      document.getElementById("results").style.display = "none";
    }
  } else {
    showError("Please check your numbers");
  }
}

//show error
function showError(error) {
  //create a div
  const errorDiv = document.createElement("div");
  const card = document.querySelector(".card"); //parent
  const heading = document.querySelector(".heading"); //before heading we want to insert
  errorDiv.className = "alert alert-danger";
  errorDiv.appendChild(document.createTextNode(error));
  card.insertBefore(errorDiv, heading); // take the parent element and first parameter is what we want to insert and second parameter is before which we have to insert.
  document.getElementById("loading").style.display = "none";
  //clear error after 3 sec
  setTimeout(clearError, 3000);
}

function clearError() {
  document.querySelector(".alert").remove();
}
