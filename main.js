

const description = document.getElementById("description")
const amount = document.getElementById("amount")
const type = document.getElementById("type")
const incomeValue = document.getElementById("income-value")
const expenseValue = document.getElementById("expenses-value")
const balanceValue = document.getElementById("balance-value")


const savedTransactions = localStorage.getItem("transactions")
const parsedTransactions = JSON.parse(savedTransactions)
const transactions = parsedTransactions || []
const transactionList = document.getElementById("transaction-list")

function updateTotals() {
  let totalIncome = 0
for (let i = 0; i < transactions.length; i++) {
  if (transactions[i].type === "income") {
    totalIncome += transactions[i].amount
  }
}

let totalExpense = 0
for (let i = 0; i < transactions.length; i++) {
  if (transactions[i].type === "expense") {
    totalExpense += transactions[i].amount
  }
}

const totalBalance = totalIncome - totalExpense

balanceValue.textContent = `£${totalBalance.toFixed(2)}`
expenseValue.textContent = `£${totalExpense.toFixed(2)}`
incomeValue.textContent = `£${totalIncome.toFixed(2)}`
}
updateTotals()

function renderTransaction(transaction) {
  let symbol 
      if (transaction.type === "income") {
        symbol = "+"
      } else {
        symbol = "-"
      }

  
  const listItem = document.createElement("li")
  const transactionDetails = document.createElement("span")
  if (transaction.type === "income") {
    transactionDetails.classList.add("income")
  } else {
    transactionDetails.classList.add("expense")
  }

  const formattedAmount = transaction.amount.toLocaleString("en-GB", {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2
})


    transactionDetails.textContent = `${transaction.description}, ${symbol}£${formattedAmount}, ${transaction.type}`
      transactionList.appendChild(listItem)
      

        

  const deleteButton = document.createElement("button")
    deleteButton.textContent = "Delete"
      listItem.appendChild(transactionDetails)
      listItem.appendChild(deleteButton)
      

  deleteButton.addEventListener("click", () => {
    console.log("delete button clicked!")
  
   listItem.remove()

  const transactionIndex = transactions.indexOf(transaction)
    transactions.splice(transactionIndex, 1)

  localStorage.setItem("transactions", JSON.stringify(transactions))

  updateTotals()
  })
  
}



for (let i = 0; i < transactions.length; i++) {
    renderTransaction(transactions[i])
}


const transactionForm = document.getElementById("form")
  transactionForm.addEventListener("submit", () => {
    event.preventDefault()
      console.log("Transaction submitted!")

    console.log(description.value)
    console.log(amount.value)
    console.log(type.value)

    const transaction = {
      description: description.value,
        amount: Number(amount.value),
          type: type.value
}


if (transaction.amount <= 0) {
  return alert("Amount must be greater than 0")
}

if(transaction.description.trim() === "") {
  alert("Please enter a description")
  return
}


transactions.push(transaction)


localStorage.setItem("transactions", JSON.stringify(transactions))


updateTotals()

renderTransaction(transaction)

console.log(transactions)

description.value = ""
amount.value = ""
type.value = "income"

})


