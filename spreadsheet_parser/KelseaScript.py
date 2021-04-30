from openpyxl import load_workbook
from tkinter import Tk
from tkinter.filedialog import askopenfilename
import sys

def main():

    Tk().withdraw()
    input_spreadsheet_path = askopenfilename()
    output_spreadsheet_path = askopenfilename()

    if input_spreadsheet_path and output_spreadsheet_path:

        wb_input = load_workbook(input_spreadsheet_path)
        input_spreadsheet = wb_input.active

        wb_output = load_workbook(output_spreadsheet_path)
        output_spreadsheet = wb_output.active
        
        if not input_spreadsheet:
            print("Input spreadsheet couldn't be read!")
            sys.exit(1)
        if not output_spreadsheet:
            print("Output spreadsheet couldn't be read!")
            sys.exit(1)

        store_number_rows = populate_store_numbers(output_spreadsheet)
        store_payment_outputs = populate_input_types_per_store(input_spreadsheet)
        new_store_payment_outputs = {}

        store_number_column = letter_column_from_tuple(output_spreadsheet['1'], "Store Number")
        cash_column = letter_column_from_tuple(output_spreadsheet['1'], "Cash")
        credit_column = letter_column_from_tuple(output_spreadsheet['1'], "Credit")
        cashless_column = letter_column_from_tuple(output_spreadsheet['1'], "Cashless (mobile)")
        column_array = [store_number_column, cash_column, credit_column, cashless_column]

        if not store_number_column:
            print("Output spreadsheet needs a column named 'Store Number'")
            sys.exit(1)
        if not cash_column:
            print("Output spreadsheet needs a column named 'Cash'")
            sys.exit(1)
        if not credit_column:
            print("Output spreadsheet needs a column named 'Credit'")
            sys.exit(1)
        if not cashless_column:
            print("Output spreadsheet needs a column named 'Cashless (mobile)'")
            sys.exit(1)


        for store_num in store_payment_outputs:
            payment_info = store_payment_outputs[store_num]
            store_row = 0
            if store_num in store_number_rows:
                store_row = str(store_number_rows[store_num])
                
                update_value_in_spreadsheet(
                    f"{cash_column}{store_row}", 
                    output_spreadsheet, 
                    payment_info["Cash"]
                )
                update_value_in_spreadsheet(
                    f"{credit_column}{store_row}", 
                    output_spreadsheet, 
                    payment_info["Credit"]
                )
                update_value_in_spreadsheet(
                    f"{cashless_column}{store_row}",
                    output_spreadsheet, 
                    payment_info["Cashless (mobile)"]
                )
            else:
                new_store_payment_outputs[store_num] = store_payment_outputs[store_num]

        for store_num in new_store_payment_outputs:
            payment_info = store_payment_outputs[store_num]

            insert_values_into_spreadsheet(
                column_array,
                output_spreadsheet, 
                payment_info,
                int(store_num)
            )

        wb_input.save(input_spreadsheet_path)
        wb_output.save(output_spreadsheet_path)
    else:
        print("One or more spreadsheet wasn't selected!")
        sys.exit(1)


def populate_store_numbers(spreadsheet):
    output = {}
    column = letter_column_from_tuple(spreadsheet['1'], "Store Number")
    counter = 2
    while spreadsheet[column + str(counter)].value != None:
        store_num_string = spreadsheet[column + str(counter)].value
        output[store_num_string[13:]] = counter
        counter += 1
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

def term_index_from_tuple(header, term):
    for i, cell in enumerate(header):
        if cell.value == term:
            return i
    return -1

def letter_column_from_tuple(header, term):
    alpha = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    counter = term_index_from_tuple(header, term)
    return alpha[counter]

def insert_row_index(spreadsheet_dictionary, store_num, store_column, output_spreadsheet):
    past_inserted_row = False
    previous_store_num = 2
    inserted_row = 2
    for current_store_num in list(spreadsheet_dictionary):
        if past_inserted_row:
            spreadsheet_dictionary[current_store_num] += 1
        elif int(current_store_num) > int(store_num) and int(store_num) > int(previous_store_num):
            past_inserted_row = True
            spreadsheet_dictionary[store_num] = spreadsheet_dictionary[current_store_num]
            inserted_row = spreadsheet_dictionary[current_store_num]
            spreadsheet_dictionary[current_store_num] += 1
            output_spreadsheet.insert_row(previous_store_num)
            output_spreadsheet[f"{store_column}{current_store_num}"] = f"Terrible's - {store_num}"
        else:
            previous_store_num = current_store_num
    return inserted_row

def update_value_in_spreadsheet(cell, output_spreadsheet, payment):
    cell_value = output_spreadsheet[cell].value
    output = cell_value if cell_value != None else 0
    output_spreadsheet[cell] = float(output) + float(payment)

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


if __name__ == "__main__":
    main()