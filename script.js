const expenseForm = document.querySelector("#expense-form");
const expenseNameInput = document.querySelector("#expense-name");
const expenseAmountInput = document.querySelector("#expense-amount");
const expenseList = document.querySelector("#expense-list");

const kesFormatter = new Intl.NumberFormat("en-KE", {
    maximumFractionDigits: 2,
});

expenseForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const expenseName = expenseNameInput.value.trim();
    expenseNameInput.setCustomValidity(
        expenseName ? "" : "Enter an expense name."
    );

    if (!expenseForm.reportValidity()) {
        return;
    }

    const amount = Number(expenseAmountInput.value);
    if (!Number.isFinite(amount) || amount <= 0) {
        expenseAmountInput.setCustomValidity("Enter an amount greater than zero.");
        expenseAmountInput.reportValidity();
        return;
    }

    expenseAmountInput.setCustomValidity("");

    const row = document.createElement("tr");
    const nameCell = document.createElement("td");
    const amountCell = document.createElement("td");

    nameCell.textContent = expenseName;
    amountCell.textContent = `KES ${kesFormatter.format(amount)}`;
    row.append(nameCell, amountCell);
    expenseList.append(row);

    expenseForm.reset();
    expenseNameInput.focus();
});

expenseAmountInput.addEventListener("input", () => {
    expenseAmountInput.setCustomValidity("");
});
