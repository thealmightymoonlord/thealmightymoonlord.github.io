// Expense and Earning Calculator
let totalExpense = 0;
let totalEarning = 0;

function addExpense() {
    const expenseDate = document.getElementById('expenseDate').value;
    const expenseName = document.getElementById('expenseName').value;
    const expenseDesc = document.getElementById('expenseDesc').value;
    const expenseAmount = parseFloat(document.getElementById('expenseAmount').value) || 0;

    // Auto-clear expense textboxes
    clearExpenseFields();

    totalExpense += expenseAmount;
    document.getElementById('totalExpense').textContent = totalExpense.toFixed(2);

    // Update transaction history in the sidebar
    updateTransactionHistory(`Expense - Date: ${expenseDate}, Name: ${expenseName}, Desc: ${expenseDesc}, Amount: $${expenseAmount}`);
}

function addEarning() {
    const earningDate = document.getElementById('earningDate').value;
    const earningName = document.getElementById('earningName').value;
    const earningDesc = document.getElementById('earningDesc').value;
    const earningAmount = parseFloat(document.getElementById('earningAmount').value) || 0;

    // Auto-clear earning textboxes
    clearEarningFields();

    totalEarning += earningAmount;
    document.getElementById('totalEarning').textContent = totalEarning.toFixed(2);

    // Update transaction history in the sidebar
    updateTransactionHistory(`Earning - Date: ${earningDate}, Name: ${earningName}, Desc: ${earningDesc}, Amount: $${earningAmount}`);
}

// Function to clear expense textboxes
function clearExpenseFields() {
    document.getElementById('expenseDate').value = '';
    document.getElementById('expenseName').value = '';
    document.getElementById('expenseDesc').value = '';
    document.getElementById('expenseAmount').value = '';
}

// Function to clear earning textboxes
function clearEarningFields() {
    document.getElementById('earningDate').value = '';
    document.getElementById('earningName').value = '';
    document.getElementById('earningDesc').value = '';
    document.getElementById('earningAmount').value = '';
}

// Function to update the transaction history in the sidebar
function updateTransactionHistory(transaction) {
    const transactionList = document.getElementById('transactionList');
    const transactionItem = document.createElement('li');

    // Create a container div to hold transaction details and delete button
    const transactionContainer = document.createElement('div');
    transactionContainer.className = 'transaction-container';

    // Create delete button and append it to the container
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.onclick = function() { deleteTransaction(this); };

    transactionContainer.innerHTML = `${transaction}`;
    transactionContainer.appendChild(deleteButton);

    transactionItem.appendChild(transactionContainer);
    transactionList.appendChild(transactionItem);

    // Save transaction history in local storage
    const transactions = JSON.parse(localStorage.getItem('transactions')) || [];
    transactions.push(transaction);
    localStorage.setItem('transactions', JSON.stringify(transactions));

    calculateTotalMoney(); // Calculate Total Money after each transaction
}

// Function to delete a transaction from the sidebar
function deleteTransaction(button) {
    const transactionItem = button.parentNode.parentNode; // Get the li element
    const transactionText = transactionItem.childNodes[0].textContent.trim(); // Get the text content

    // Remove the transaction from the local storage
    const transactions = JSON.parse(localStorage.getItem('transactions')) || [];
    const updatedTransactions = transactions.filter(transaction => transaction !== transactionText);
    localStorage.setItem('transactions', JSON.stringify(updatedTransactions));

    // Remove the transaction from the sidebar
    transactionItem.remove();

    calculateTotalMoney(); // Recalculate Total Money after deletion
}

// Function to calculate total money (earning - expenses)
function calculateTotalMoney() {
    const totalMoney = totalEarning - totalExpense;
    document.getElementById('totalMoney').textContent = totalMoney.toFixed(2);
}

// Function to calculate simple interest
function calculateSimpleInterest() {
    const principal = parseFloat(document.getElementById('principal').value) || 0;
    const rate = parseFloat(document.getElementById('rate').value) || 0;
    const time = parseFloat(document.getElementById('time').value) || 0;

    const simpleInterest = (principal * rate * time) / 100;
    document.getElementById('simpleInterest').textContent = simpleInterest.toFixed(2);

    // Auto-clear textboxes
    clearInterestFields();
    calculateTotalMoney(); // Calculate Total Money after each calculation
}

// Function to calculate compound interest
function calculateCompoundInterest() {
    const principal = parseFloat(document.getElementById('principal').value) || 0;
    const rate = parseFloat(document.getElementById('rate').value) || 0;
    const time = parseFloat(document.getElementById('time').value) || 0;

    const compoundInterest = principal * Math.pow((1 + rate / 100), time) - principal;
    document.getElementById('compoundInterest').textContent = compoundInterest.toFixed(2);

    // Auto-clear textboxes
    clearInterestFields();
    calculateTotalMoney(); // Calculate Total Money after each calculation
}

// Function to calculate total cost for bulk shopping
function calculateTotalCost() {
    const unitPrice = parseFloat(document.getElementById('unitPrice').value) || 0;
    const units = parseFloat(document.getElementById('units').value) || 0;

    const totalCost = unitPrice * units;
    document.getElementById('totalCost').textContent = totalCost.toFixed(2);

    // Auto-clear textboxes
    clearBulkShoppingFields();
    calculateTotalMoney(); // Calculate Total Money after each calculation
}

// Function to clear interest textboxes
function clearInterestFields() {
    document.getElementById('principal').value = '';
    document.getElementById('rate').value = '';
    document.getElementById('time').value = '';
}

// Function to clear bulk shopping textboxes
function clearBulkShoppingFields() {
    document.getElementById('unitPrice').value = '';
    document.getElementById('units').value = '';
}
    