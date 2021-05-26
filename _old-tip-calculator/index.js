const button = document.getElementById("calculateButton")
button.addEventListener("click", calculate);

function calculate() {
    const amount = document.getElementById("totalAmount").value
    const tipAmount = amount * 0.1
    document.getElementById("result").innerHTML = "Amount of tip should be paid: " + tipAmount
}

