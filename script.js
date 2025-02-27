const amount = document.getElementById("amount");
const expense = document.getElementById("expense");
const category = document.getElementById("category");
const form = document.querySelector('form');
const contDespesas = document.querySelector("header span");
let counter = 0;

const categoryExpense = document.querySelector('select');

const moneyCount = document.querySelector('aside header h2');

// Captura o evento de input para formatar o valor.
amount.addEventListener("input", () => {
    // Verifica se o valor digitado é um número.
    let value = amount.value.replace(/\D/g, '');

    // Transforma o valor em centavos (150/100 = 1.5 que é equivalente a R$1,50)
    value = Number(value) / 100;

    // Atualiza o valor no campo.
    amount.value = formatCurrency(value);
})

function formatCurrency(value) {
    value = value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    return value;
}

// Captura o evento de submit do formulário para obter os valores.
form.addEventListener("submit", (event) => {
    event.preventDefault();

    // Cria um objeto com os detalhes da despesa.
    const newExpense = {
        id: new Date().getTime(),
        expense: expense.value,
        category_id: category.value,
        category_name: categoryExpense.options[category.selectedIndex].text,
        amount: amount.value,
        created_at: new Date(),
    }

    // Chama a função que irá adicionar o item na lista.
    expenseAdd(newExpense);
    counterExpense(newExpense);
    removeExpense(event);

    // Limpa o formulário.
    expense.value = "";
    category.value = "";
    amount.value = "";

});

function expenseAdd(newExpense) {
    try {

        // Cria os elementos da despesa.
        const expenseContainer = document.querySelector("aside ul");
        const expenseItem = document.createElement("li");
        const expenseImg = document.createElement("img");
        const expenseDeleteImg = document.createElement("img");
        const expenseTextContainer = document.createElement("div");
        const expenseTitle = document.createElement("strong");
        const expenseDescription = document.createElement("span");
        const expenseAmount = document.createElement("span");

        expenseImg.src = `./img/${newExpense.category_id}.svg`;
        expenseTitle.innerHTML = newExpense.expense;
        expenseDescription.innerHTML = newExpense.category_name;
        expenseAmount.innerHTML = newExpense.amount;
        expenseDeleteImg.src = "./img/remove.svg";

        expenseTextContainer.appendChild(expenseTitle);
        expenseTextContainer.appendChild(expenseDescription);
        expenseItem.appendChild(expenseImg);
        expenseItem.appendChild(expenseTextContainer);
        expenseItem.appendChild(expenseAmount);
        expenseContainer.appendChild(expenseItem);
        expenseItem.appendChild(expenseDeleteImg);

        // Adiciona as classes aos elementos da despesa.
        expenseItem.classList.add("expense");
        expenseTextContainer.classList.add("expense-info");
        expenseAmount.classList.add("expense-amount");
        expenseDeleteImg.classList.add("remove-icon");

        expenseDeleteImg.addEventListener("click", (expenseItem) => {
            removeExpense(expenseItem);
        })


    } catch (error) {
        alert("Não foi possível atualizar a lista de despesas.")
        console.log(error)
    }
}

// Parei aqui, pois não consegui somar os valores de acordo com cada input.
function counterExpense(newExpense) {
    if (counter < 1) {
        counter++;
        contDespesas.innerHTML = `${counter} despesa`;
        moneyCount.textContent = newExpense.amount;
        console.log(newExpense.amount);
        console.log(typeof newExpense.amount);

    } else {
    counter++;
    contDespesas.innerHTML = `${counter} despesas`;
    console.log(newExpense.amount);
    console.log(typeof newExpense.amount);
    moneyCount.textContent = parseFloat(newExpense.amount++);
    }
}

function removeExpense(expenseItem) {
    expenseItem.remove
    counter--;
    contDespesas.innerHTML = `${counter} despesas`;
}



