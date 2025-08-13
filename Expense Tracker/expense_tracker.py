from expense import Expense
import datetime 
import calendar 


def main():
    while True:
          print(black("Running Expense Tracker!"))
          expense_file_path = "data/expenses.csv"
          expense_file_path_total = "data/expenses_total.csv"
          budget = 13000 #change as needed, 500SGD = 13500THB. 500THB to account for currency exchange 
          # get user input for expense 
          expense = user_expense()
          # refer back to expense script and note the use of a function that properly represents the object, else the address of the object will be printed instead 
          print(expense)

          # is it dbs or ocbc?
          try:
               choice = input(("Was it charged to DBS or OCBC? \n 1. DBS \n 2. OCBC \n"))
          except Exception:
             print("Invalid. System restart.")
             continue

          # if DBS then save into both files, if OCBC just save to one file 
          # DBS file will have DBS transactions only, OCBC file will have both, basically total 
          if choice == "1":
               # if expense is charged to DBS, add to both files 
               save_expense_to_file(expense, expense_file_path)
               save_expense_to_file(expense, expense_file_path_total)
               # read file and summarise expenses 
               print("DBS Summary: ")
               summarise_expenses(expense_file_path, budget)
               print("DBS and OCBC Summary: ")
               summarise_expenses(expense_file_path_total, budget)
          # choice=2 means it was charged to OCBC, write to OCBC file only  
          elif choice == "2":
               save_expense_to_file(expense, expense_file_path_total)
               summarise_expenses(expense_file_path_total, budget)

# get user input for expense 
def user_expense():
    print("Getting User Expense")
    while True:
          # we need 3 things: expense name, amount and category 
          expense_name = input("Enter expense name: ")
          # ensure that a number is put in 
          try:
               expense_amount = float(input("Enter expense amount: "))
               break
          except Exception:
                    print("Invalid. System restart.")
                    continue

    # make user choose category 
    # remember the difference between lists and tuples. this is a tuple
    # since we used normal brackets. tuples are immutable lists
    expense_categories = (
        "🍒 Food", 
        "🏫 Groceries", 
        "🎉 Fun", 
        "🛍️ Shopping", 
        "👻 Miscellaneous",
        "🚗 Transport"
    )

    while True:
        print("Select a category: ")
        # we +1 so printed index does not start from 0 
        for i, category_name in enumerate(expense_categories):
                print(f" {i+1}.{category_name}")

        # value range is a string 
        value_range = f"[1 - {len(expense_categories)}]"
        try:        
            selected_index = int(input(f"Enter category number {value_range}: ")) - 1
        except Exception:
             print("Invalid. Please write within the given indexes")
             # continue rejects all the remaining iterations and starts from the top of the while loop 
             continue
        
        # remember that the last number in range is not included, 
        # so if you put range 0-5, 5 is not included 
        if selected_index in range(len(expense_categories)):
             selected_category = expense_categories[selected_index]
             # define the new variable of class expense  
             new_expense = Expense(name=expense_name, category=selected_category, amount=expense_amount)
             # return stops the function 
             return new_expense 
        else:
             print("Invalid category. Please write within the given indexes")

# write expense to a file 
# writing expense: expense is for typehints on line 69, we describe expense to be of class Expense 
def save_expense_to_file(expense: Expense, file_path):
    print(f"Saving user expense: {expense} to {file_path}")
    # opens file, first argument here is the file, second the  mode 
    # a is to append to the file 
    # encoding here allows emojis to be enocded into the file 
    with open(file_path, "a", encoding='utf8') as f:
         f.write(f"{expense.name}, {expense.category}, {expense.amount}\n")
         

# read file and summarise expenses 
def summarise_expenses(file_path, budget):
    print("Summarising expenses")

    # section 1: printing expenses by category  

    # creates empty list called expense, list[expense] tells python that expenses is a list of items of class Expense  
    # encoding here is to read the emojis 
    expenses: list[Expense] = []
    with open(file_path, "r", encoding='utf8') as f:
         lines = f.readlines()
         for line in lines:
              # strips the ending whitespace from the line, so whenever you print each line they wont be separated by a one line space [happens bcos in the csv file there is already an ending whitespace, and when we print we auto go to next line]
              stripped_line = line.strip()
              # splitting each element of the line into 3 parts, variables are all strings 
              expense_name, expense_category, expense_amount = stripped_line.split(",")
              # expense_name, expense_category, expense_amount = stripped_line.strip.split(",") - can replace the last 2 lines of code
              line_expense = Expense(name=expense_name, category=expense_category, amount=float(expense_amount))
              expenses.append(line_expense)

    # create a dictionary where keys are categories and value is the total amount in that category
    amount_by_category = {}
    for expense in expenses:
         # create key for dictionary 
         key = expense.category
         # if the key is already present, simply add the amount, else create a new one 
         if key in amount_by_category:
              amount_by_category[key] += expense.amount 
         else:
              amount_by_category[key] = expense.amount
              
    print("Expenses by Category: ")
    # items() returns a view object that di
    # splays a list of the dictionary keys and values 
    for key, amount in amount_by_category.items():
         print(f"  {key}: {amount:.2f} THB")

    # section 3: calculate total expenses and remaining budget  
    total_spent = sum(ex.amount for ex in expenses)
    print(f"💸 Total spent: {total_spent:.2f} THB")
    
    remaining_budget = budget-total_spent 
    print(f"🏧 Remaining budget: {remaining_budget:.2f} THB")

    # section 3: finding the daily budget for the rest of the month 
    # get current date 
    now = datetime.datetime.now()
    # get number of days in the current month 
    days_in_month = calendar.monthrange(now.year, now.month)[1]
    # calculate the remaining number of days in the current month 
    remaining_days = days_in_month - now.day 
    if remaining_days == 0:
         daily_budget = remaining_budget
    else: 
         daily_budget = remaining_budget / remaining_days 
    print(green(f"Budget per day: {daily_budget:.2f} THB"))

def green(text):
     return f"\033[1;32;47m{text}\033"

def black(text):
     return f"\033[1;30;47m{text}\033"

main()
