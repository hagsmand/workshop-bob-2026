var expenses = [
  { description: 'Weekly groceries', category: 'Food', amount: 120 },
  { description: 'Bus pass', category: 'Transport', amount: 80 },
  { description: 'Lunch with team', category: 'Food', amount: 60 },
  { description: 'Electricity', category: 'Home', amount: 95 }
]

function filterExpenses() {
  var category = document.getElementById('category').value
  var html = '<tr><th>Description</th><th>Category</th><th>Amount</th></tr>'
  var total = 0
  for (var i = 0; i < expenses.length; i++) {
    if (category === 'All' || expenses[i].category === category) {
      html += '<tr><td>' + expenses[i].description + '</td><td>' + expenses[i].category + '</td><td>$' + expenses[i].amount + '</td></tr>'
      total += expenses[i].amount
    }
  }
  document.getElementById('expense-table').innerHTML = html
  document.getElementById('total').innerHTML = 'Total: $' + total
}

function addExpense() {
  var description = document.getElementById('description').value
  var category = document.getElementById('new-category').value
  var amount = Number(document.getElementById('amount').value)
  if (description === '' || amount <= 0) {
    document.getElementById('message').innerHTML = 'Enter a description and valid amount.'
    return
  }
  expenses.push({ description: description, category: category, amount: amount })
  document.getElementById('description').value = ''
  document.getElementById('amount').value = ''
  document.getElementById('message').innerHTML = ''
  filterExpenses()
}

filterExpenses()
