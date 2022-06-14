const resetButton = document.getElementById('reset-btn');
const inputBill = document.getElementById('bill-value');
const inputPeople = document.getElementById('people-value');
const inputTip = document.getElementById('tip-custom');
const inputTipPerPerson = document.getElementById('tip-per-person');
const inputTotalPrice = document.getElementById('total-price');

resetButton.addEventListener('click', resetAll);
inputBill.addEventListener('input', updateBillValue);
inputPeople.addEventListener('input', updatePeopleValue);
inputTip.addEventListener('input', updateCustomTipValue);

let billAmount = 0;
let people = 0;
let tipAmount = 0;

function removeErrorLabelIfExist() {
    const errorLabelElement = document.getElementById('error-label');
    if (errorLabelElement) {
        errorLabelElement.remove();
    }
}

function resetAll() {
    billAmount = 0;
    people = 0;
    tipAmount = 0;

    updateTotalValues();
    findAndRemoveSelectedTip();
    inputBill.value = 0;
    inputPeople.value = 0;
    removeErrorLabelIfExist();
}

function updateBillValue(event) {
    billAmount = Number(event.target.value);
    updateTotalValues();
}

function updatePeopleValue(event) {
    const amount = Number(event.target.value);
    if (amount <= 0) {
        const peopleLabelElement = document.getElementById('people-label');
        let spanElement = document.createElement('span');
        spanElement.innerText = `Can't be less or equal to zero`;
        spanElement.classList.add('error-label');
        spanElement.classList.add('label');
        spanElement.id = 'error-label';
        peopleLabelElement.appendChild(spanElement);
        inputPeople.classList.add('error');
    } else {
        inputPeople.classList.remove('error');
        removeErrorLabelIfExist();
        people = Number(event.target.value);
        updateTotalValues();
    }
}

function updateCustomTipValue(event) {
    const amount = Number(event.target.value);

    updateTipAmount(amount);
}

function findAndRemoveSelectedTip() {
    const selectedTip = document.getElementById(`tip-amounts`).getElementsByClassName('selected');

    if (selectedTip[0]) {
        document.getElementById(selectedTip[0].id).classList.remove('selected');
    }
}

function updateTipAmount(amount) {
    tipAmount = amount;
    const tipElement = document.getElementById(`tip-${amount}`);
    findAndRemoveSelectedTip();

    if (tipElement) {
        tipElement.classList.add('selected');
        inputTip.value = null;
    }

    updateTotalValues();
}

function updateTotalValues() {
    const tempTip = (billAmount * tipAmount) / 100;
    inputTipPerPerson.innerText = `$${(tempTip >= 0 ? tempTip : 0).toFixed(2)}`;

    if (people > 0) {
        const tipPerPerson = tempTip / people;
        inputTipPerPerson.innerText = `$${tipPerPerson.toFixed(2)}`;

        const calculatedAmount = people > 0 ? (billAmount + tempTip) / people : 0;
        inputTotalPrice.innerText = `$${calculatedAmount.toFixed(2)}`;
    } else {
        inputTotalPrice.innerText = '$0.00';
    }
}
