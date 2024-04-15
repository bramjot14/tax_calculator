// Event listener for form submission
document.getElementById('taxForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent default form submission
    calculateTax(); // Call function to calculate tax
});

// Function to calculate tax based on user inputs
function calculateTax() {
    const income = parseFloat(document.getElementById('income').value) || 0; // Get gross annual income
    const extraIncome = parseFloat(document.getElementById('extraIncome').value) || 0; // Get extra income
    const deductions = parseFloat(document.getElementById('deductions').value) || 0; // Get deductions
    const ageGroup = document.getElementById('age').value; // Get selected age group

    // Validate age group selection
    if (!ageGroup) {
        alert('Please select an age group.');
        return;
    }

    // Calculate overall income after deductions
    const overallIncome = income + extraIncome - deductions;

    let taxAmount = 0;

    // Check if overall income exceeds 8 Lakhs for tax calculation
    if (overallIncome > 800000) {
        // Determine tax rate based on age group
        switch (ageGroup) {
            case '<40':
                taxAmount = (overallIncome - 800000) * 0.3; // 30% tax for age < 40
                break;
            case '>=40&<60':
                taxAmount = (overallIncome - 800000) * 0.4; // 40% tax for age >= 40 and < 60
                break;
            case '>=60':
                taxAmount = (overallIncome - 800000) * 0.1; // 10% tax for age >= 60
                break;
        }
    }

    displayTaxResult(taxAmount); // Display calculated tax amount
}

// Function to display tax calculation result in modal
function displayTaxResult(taxAmount) {
    const modal = document.getElementById('resultModal'); // Get result modal
    const resultElement = document.getElementById('taxAmount'); // Get element to display tax amount

    resultElement.textContent = `Tax Amount: ₹${taxAmount.toFixed(2)}`; // Set tax amount in result element

    modal.style.display = 'block'; // Display the modal

    // Close modal when close button is clicked
    document.getElementsByClassName('close')[0].onclick = function() {
        modal.style.display = 'none';
    };

    // Close modal when clicking outside the modal content
    window.onclick = function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    };
}
