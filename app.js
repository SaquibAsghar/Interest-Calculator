// declare UI var
const calcbutton = document.querySelector("#load-form");
calcbutton.addEventListener("click", function (e) {
	// hide the element
	document.getElementById("results").style.display = "none"
	// Show loading
	document.getElementById("loading").style.display = "block";
	setTimeout(calculateLoan, 1250);
	e.preventDefault()
});

function calculateLoan() {
	const amount = document.querySelector("#amount");
	const interest = document.querySelector("#interest");
	const years = document.querySelector("#years");

	const monthlyPayment = document.querySelector("#monthly-payment");
	const totalPayment = document.querySelector("#total-payment");
	const totalInterest = document.querySelector("#total-interest");

	const principal = parseFloat(amount.value);
	const claculatedInterest = parseFloat(interest.value) / 100 / 12;
	const calculatedPayments = parseFloat(years.value) * 12;

	// Monthly payment
	let x = Math.pow(1 + claculatedInterest, calculatedPayments);
	const monthly = (principal * x * claculatedInterest) / (x - 1);

	if (isFinite(monthly)) {
		monthlyPayment.value = monthly.toFixed(2);
		totalPayment.value = (monthly * calculatedPayments).toFixed(2);
		totalInterest.value = (monthly * calculatedPayments - principal).toFixed(2);
		
		// show results
		document.getElementById("results").style.display = "block";
		// block loading.gif
		document.getElementById("loading").style.display = "none";
	} else {
		showError("Please check your inputs");

		document.getElementById("loading").style.display = "none";
	}
}

function showError(error) {
	// get elements
	const card = document.querySelector(".card");
	const heading = document.querySelector(".heading");
	const errorDiv = document.createElement("div");

	// Add error class
	errorDiv.classList.add("alert");
	errorDiv.classList.add("alert-danger");
	// create text node
	errorDiv.appendChild(document.createTextNode(error));

    card.insertBefore(errorDiv, heading);
    
    // clear Error
    setTimeout(function clearError() {
        
       document.querySelector('.alert').remove()
    }, 1500)


}
