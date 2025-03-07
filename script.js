const amount = document.getElementById("amount");
const expense = document.getElementById("expense");
const category = document.getElementById("category");
const form = document.querySelector('form');
const contDespesas = document.querySelector("header span");
const expenseContainer = document.querySelector("aside ul");

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

    // Limpa os campos do formulário.
    cleanData();
});

function expenseAdd(newExpense) {
    try {

        // Cria os elementos da despesa.
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
        expenseAmount.innerHTML = `<small>R$</small>${newExpense.amount.toUpperCase().replace('R$', '')}`;
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
            expenseItem = expenseItem.target.parentElement.remove();
            counterExpense();
        })

        // Atualiza os totais.
        counterExpense();

    } catch (error) {
        alert("Não foi possível atualizar a lista de despesas.")
        console.log(error)
    }
}

// Parei aqui, pois não consegui somar os valores de acordo com cada input.
function counterExpense() {
    try {
        // Armazena todos os itens da lista de despesas.
        const items = expenseContainer.children;
        // Regra para apresentar textos diferentes de acordo com a quantidade de despesas.
        contDespesas.textContent = `${items.length} ${items.length > 1 ? "despesas" : "despesa"}`;

        // Variável para armazenar o total das despesas.
        let total = 0;

        // Loop para processar os valores de cada despesa.
        for (let i = 0; i < items.length; i++) {
            const expenseItem = items[i];
            const expenseAmount = expenseItem.querySelector(".expense-amount");
            total += Number(expenseAmount.textContent.replace("R$", "").replace(",", "."));
        }

        // Apresentar o valor final após rodar a função de conversão.
        moneyCount.innerHTML = `<small>R$</small>${formatCurrency(total).replace("R$", "")}`;
        

    } catch (error) {
        alert("Não foi possível atualizar a lista de despesas.")
        console.log(error)
    }
}

function cleanData() {
    // Limpa o formulário.
    expense.value = "";
    category.value = "";
    amount.value = "";

    expense.focus();
}



