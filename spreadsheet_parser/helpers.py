import sys
from openpyxl import load_workbook
ALPHA = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"

def populate_store_numbers(spreadsheet, starting_row = 2):
    output = {}
    column = letter_column_from_tuple(spreadsheet['1'], "Store Number")
    counter = starting_row
    cell_name = column + str(counter)
    while spreadsheet[cell_name].value != None:
        store_num_string = spreadsheet[cell_name].value
        output[store_num_string[13:]] = counter
        counter += 1
        cell_name = column + str(counter)
    return output
""" 
Creates dictionary from specified column, 
requires: 
    spreadsheet, 
    column name not letter,
    *optional* starting row.
Iterates row by row until it doesn't find a value. Creates dictionary
with the cell value as the key and the row as the value
"""
def create_column_dictionary(spreadsheet, name, starting_row = 2):
    output = {}
    column = letter_column_from_tuple(spreadsheet['1'], name)
    counter = starting_row
    cell_name = column + str(counter)
    while spreadsheet[cell_name].value != None:
        store_num_string = spreadsheet[cell_name].value
        output[store_num_string[13:]] = counter
        counter += 1
        cell_name = column + str(counter)
    return output

def populate_input_types_per_store(spreadsheet):
    output = {}
    store_name = term_index_from_tuple(spreadsheet['1'], "Store Name")
    trans_type = term_index_from_tuple(spreadsheet['1'], "Trans Type")
    payment_total = term_index_from_tuple(spreadsheet['1'], "Total")

    end_of_spreadsheet = False
    counter = 1
    while not end_of_spreadsheet:
        counter += 1
        row = spreadsheet[counter]
        end_of_spreadsheet = any(map(lambda x: x.value is None, row))
        if end_of_spreadsheet or row[0] == "Device":
            break
        store_num = str(int(row[store_name].value))
        if store_num not in output:
            new_cash_dictionary = {"Cash": 0, "Credit": 0, "Cashless (mobile)": 0}
            output[store_num] = new_cash_dictionary
        payment_type = row[trans_type].value
        if payment_type != "Cash" and payment_type != "Credit":
            payment_type = "Cashless (mobile)"
        new_total = float(row[payment_total].value) + output[store_num][payment_type]
        output[store_num][payment_type] = round(new_total, 2)
    return output

"""
Returns the index from the tuple of the specific value, 
used in conjunction with letter_column_from_tuple
"""
def term_index_from_tuple(header, term):
    for i, cell in enumerate(header):
        if cell.value == term:
            return i
    return -1

"""
Returns the column letter of the specific value
"""
def letter_column_from_tuple(header, term):
    alpha = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    counter = term_index_from_tuple(header, term)
    return alpha[counter]

"""
If cell is empty, sets value to value,
if cell is a number, adds value to previous value
"""
def update_number_value_in_spreadsheet(cell, output_spreadsheet, value):
    cell_value = output_spreadsheet[cell].value
    output = cell_value if cell_value != None else 0
    output_spreadsheet[cell] = float(output) + float(value)


def insert_values_into_spreadsheet(column_array, output_spreadsheet, payment_info, store_num):
    current_row = 2
    previous_store_number = 0
    found_insert_spot = output_spreadsheet[column_array[0] + str(current_row)].value != None
    while found_insert_spot:
        current_store_number = int(output_spreadsheet[column_array[0] + str(current_row)].value[13:])
        if current_store_number > store_num and store_num > previous_store_number:
            found_insert_spot = false
        else:
            previous_store_number = current_store_number
            current_row += 1
            found_insert_spot = output_spreadsheet[column_array[0] + str(current_row)].value != None

    output_spreadsheet.insert_rows(current_row)
    output_spreadsheet[f"{column_array[0]}{current_row}"] = f"Terrible's - {store_num}"
    output_spreadsheet[f"{column_array[1]}{current_row}"] = float(payment_info["Cash"])
    output_spreadsheet[f"{column_array[2]}{current_row}"] = float(payment_info["Credit"])
    output_spreadsheet[f"{column_array[3]}{current_row}"] = float(payment_info["Cashless (mobile)"])

def error_check(array):
    for error_container in array:
        if not error_container[0]:
            print(error_container[1])
            sys.exit(1)


def manipulate_rows_by_column(spreadsheet, callback, column, starting_row = 1):
    current_row_number = starting_row
    current_cell = spreadsheet[column + str(current_row_number)]
    while not current_cell:
        spreadsheet[column + str(current_row_number)] = callback(current_cell)
        current_row_number += 1
        current_row_tuple = spreadsheet[column + str(current_row_number)]

def manipulate_columns_by_row(spreadsheet, callback, row, starting_column = "A"):
    current_column_letter = starting_column
    current_cell = spreadsheet[current_column_letter + str(row)]
    while not current_cell:
        spreadsheet[current_column_letter + str(row)] = callback(current_cell)
        if current_column_letter == "Z":
            current_cell = false
        else:
            current_column_letter = ALPHA[(ALPHA.index(current_column_letter) + 1)]
            current_row_tuple = spreadsheet[current_column_letter + str(row)]

def enumerate_rows(spreadsheet, callback, starting_row = 1):
    current_row_number = starting_row
    end_of_rows = end_of_spreadsheet(spreadsheet[current_row_number])
    while not end_of_rows:
        #This is a function that will enumerate one row and manipulate values that way
        callback(spreadsheet, current_row_number)
        current_row_number += 1
        end_of_rows = end_of_spreadsheet(spreadsheet[current_row_number])
    

def end_of_spreadsheet(row_tuple):
    return all(map(lambda x: x.value is None, row_tuple))