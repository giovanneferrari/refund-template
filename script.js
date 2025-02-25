const amount = document.getElementById("amount");
const expense = document.getElementById("expense");
const category = document.getElementById("category");
const form = document.querySelector('form');

let contDespesas = document.querySelector("header span");
let counter = 0;
let buttonAdd = document.querySelector("form button");

let categoryExpense = document.querySelector('select');

let moneyCount2 = document.getElementsByClassName('expense-amount');
let moneyCount = document.querySelector('aside header h2')

// console.log(moneyCount.innerText);

// buttonAdd.addEventListener("click", (event) => {
//     event.preventDefault();
//     counter++;
//     contDespesas.innerHTML = `${counter} despesas`;
// });

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

});

function expenseAdd(newExpense) {
    try {

        // Cria o elemento da despesa.
        const expenseItem = document.createElement("li");

        // Adiciona a classe ao elemento da despesa.
        expenseItem.classList.add("expense");

        const expenseImg = document.createElement("img");
        expenseImg.src = `./img/${newExpense.category_id}.svg`;
        expenseImg.alt = "Imagem da despesa";
        expense.classList.add("expense-img");



    } catch (error) {
        alert("Não foi possível atualizar a lista de despesas.")
        console.log(error)
    }
}



