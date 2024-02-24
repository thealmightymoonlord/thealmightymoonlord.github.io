let totalExpense = 0;
let totalEarning = 0;

function addExpense() {
    const expenseDate = document.getElementById('expenseDate').value;
    const expenseName = document.getElementById('expenseName').value;
    const expenseDesc = document.getElementById('expenseDesc').value;
    const expenseAmount = parseFloat(document.getElementById('expenseAmount').value) || 0;

    clearExpenseFields();

    totalExpense += expenseAmount;
    document.getElementById('totalExpense').textContent = totalExpense.toFixed(2);

    updateTransactionHistory(`Expense - Date: ${expenseDate}, Name: ${expenseName}, Desc: ${expenseDesc}, Amount: $${expenseAmount}`);
}

function addEarning() {
    const earningDate = document.getElementById('earningDate').value;
    const earningName = document.getElementById('earningName').value;
    const earningDesc = document.getElementById('earningDesc').value;
    const earningAmount = parseFloat(document.getElementById('earningAmount').value) || 0;

    clearEarningFields();

    totalEarning += earningAmount;
    document.getElementById('totalEarning').textContent = totalEarning.toFixed(2);

    updateTransactionHistory(`Earning - Date: ${earningDate}, Name: ${earningName}, Desc: ${earningDesc}, Amount: $${earningAmount}`);
}

function updateTransactionHistory(transaction) {
    const transactionList = document.getElementById('transactionList');
    const transactionItem = document.createElement('li');

    const transactionContainer = document.createElement('div');
    transactionContainer.className = 'transaction-container';

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.onclick = function() { deleteTransaction(this); };

    transactionContainer.innerHTML = `${transaction}`;
    transactionContainer.appendChild(deleteButton);

    transactionItem.appendChild(transactionContainer);
    transactionList.appendChild(transactionItem);

    const transactions = JSON.parse(localStorage.getItem('transactions')) || [];
    transactions.push(transaction);
    localStorage.setItem('transactions', JSON.stringify(transactions));

    calculateTotalMoney();
}

function deleteTransaction(button) {
    const transactionItem = button.parentNode.parentNode;
    const transactionText = transactionItem.childNodes[0].textContent.trim();

    const transactions = JSON.parse(localStorage.getItem('transactions')) || [];
    const updatedTransactions = transactions.filter(transaction => transaction !== transactionText);
    localStorage.setItem('transactions', JSON.stringify(updatedTransactions));

    transactionItem.remove();

    calculateTotalMoney();
}

function calculateTotalMoney() {
    const totalMoney = totalEarning - totalExpense;
    document.getElementById('totalMoney').textContent = totalMoney.toFixed(2);
}

function clearExpenseFields() {
    document.getElementById('expenseDate').value = '';
    document.getElementById('expenseName').value = '';
    document.getElementById('expenseDesc').value = '';
    document.getElementById('expenseAmount').value = '';
}

function clearEarningFields() {
    document.getElementById('earningDate').value = '';
    document.getElementById('earningName').value = '';
    document.getElementById('earningDesc').value = '';
    document.getElementById('earningAmount').value = '';
}

function clearInterestFields() {
    document.getElementById('principal').value = '';
    document.getElementById('rate').value = '';
    document.getElementById('time').value = '';
}

function clearBulkShoppingFields() {
    document.getElementById('unitPrice').value = '';
    document.getElementById('units').value = '';
}

function calculateSimpleInterest() {
    const principal = parseFloat(document.getElementById('principal').value) || 0;
    const rate = parseFloat(document.getElementById('rate').value) || 0;
    const time = parseFloat(document.getElementById('time').value) || 0;

    const simpleInterest = (principal * rate * time) / 100;
    document.getElementById('simpleInterest').textContent = simpleInterest.toFixed(2);

    clearInterestFields();
    calculateTotalMoney();
}

function calculateCompoundInterest() {
    const principal = parseFloat(document.getElementById('principal').value) || 0;
    const rate = parseFloat(document.getElementById('rate').value) || 0;
    const time = parseFloat(document.getElementById('time').value) || 0;

    const compoundInterest = principal * Math.pow((1 + rate / 100), time) - principal;
    document.getElementById('compoundInterest').textContent = compoundInterest.toFixed(2);

    clearInterestFields();
    calculateTotalMoney();
}

function calculateTotalCost() {
    const unitPrice = parseFloat(document.getElementById('unitPrice').value) || 0;
    const units = parseFloat(document.getElementById('units').value) || 0;

    const totalCost = unitPrice * units;
    document.getElementById('totalCost').textContent = totalCost.toFixed(2);

    clearBulkShoppingFields();
    calculateTotalMoney();
}
