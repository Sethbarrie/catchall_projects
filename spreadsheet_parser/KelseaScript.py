import helpers

def main():

    worksheets = helpers.Worksheets()

    #input spreadsheet columns
    store_name_column = helpers.term_index_from_tuple(worksheets.input_spreadsheet['1'], "Store Name")
    trans_type_column = helpers.term_index_from_tuple(worksheets.input_spreadsheet['1'], "Trans Type")
    total_payment_column = helpers.term_index_from_tuple(worksheets.input_spreadsheet['1'], "Total")
    
    #output spreadsheet columns
    store_number_column = helpers.term_index_from_tuple(worksheets.output_spreadsheet['1'], "Store Number")
    cash_column = helpers.term_index_from_tuple(worksheets.output_spreadsheet['1'], "Cash")
    credit_column = helpers.term_index_from_tuple(worksheets.output_spreadsheet['1'], "Credit")
    cashless_column = helpers.term_index_from_tuple(worksheets.output_spreadsheet['1'], "Cashless (mobile)")

    #Checks if any necessary column isn't here and throws an error
    helpers.error_check([
        (store_name_column, "Input spreadsheet needs a column named 'Store Name'", lambda x: x == -1), 
        (trans_type_column, "Input spreadsheet needs a column named 'Trans Type'", lambda x: x == -1), 
        (total_payment_column, "Input spreadsheet needs a column named 'Total'", lambda x: x == -1), 

        (store_number_column, "Output spreadsheet needs a column named 'Store Number'", lambda x: x == -1), 
        (cash_column, "Output spreadsheet needs a column named 'Cash'", lambda x: x == -1), 
        (credit_column, "Output spreadsheet needs a column named 'Credit'", lambda x: x == -1), 
        (cashless_column, "Output spreadsheet needs a column named 'Cashless (mobile)'", lambda x: x == -1)
    ])

    def format_input_dictionary(input_tuple, current_dictionary, row):
        return_dictionary = {}
        store_number_string = str(int(input_tuple[store_name_column]))
        if store_number_string not in current_dictionary:
            return_dictionary = {"Cash": 0, "Credit": 0, "Cashless (mobile)": 0}
        else:
            return_dictionary = current_dictionary[store_number_string]
        trans_type = input_tuple[trans_type_column]
        if trans_type != "Cash" and trans_type != "Credit":
            trans_type = "Cashless (mobile)"
        return_dictionary[trans_type] += input_tuple[total_payment_column]

        return (store_number_string, return_dictionary)
        
    def format_output_dictionary(input_tuple, current_dictionary, row):
        return(input_tuple[store_number_column][13:], row)

    #The dictionaries to work with
    store_number_rows = helpers.create_rows_dictionary(worksheets.output_spreadsheet, format_output_dictionary, 2)
    """
    store_number_rows = {
        '101': 2, 
        '118': 3, 
        '129': 4, 
        '132': 5, 
        '156': 6,
        ...    
    }
    """
    store_payment_outputs = helpers.create_rows_dictionary(worksheets.input_spreadsheet, format_input_dictionary)
    """
    store_payment_outputs = {
        '101': {
            'Cash': 53.6, 
            'Credit': 8.6, 
            'Cashless (mobile)': 15.7
        }, '118': {
            'Cash': 120.0, 
            'Credit': 55.6, 
            'Cashless (mobile)': 7.3
        }, '129': {
            'Cash': 40.8, 
            'Credit': 24.6, 
            'Cashless (mobile)': 11.8
        }, '132': {
            'Cash': 74.4, 
            'Credit': 19.2, 
            'Cashless (mobile)': 35.2
        }, '156': {
            'Cash': 9.6, 
            'Credit': 1.8, 
            'Cashless (mobile)': 0
        }, ...
    }
    """
    #new_store_payment_outputs will have a similar structure to store_payment_outputs
    new_store_payment_outputs = {}

    #Need to define function here for payment_info and store_num scoping
    def update_payments(row_tuple):
        total = payment_info["Cash"] + payment_info["Credit"] + payment_info["Cashless (mobile)"]
        return (
            ("A", helpers.set_new_value(row_tuple[0], f"Terrible's - {store_num}")),
            ("B", round(helpers.set_new_value(row_tuple[1], 0)) + payment_info["Cash"], 2),
            ("C", round(helpers.set_new_value(row_tuple[2], 0)) + payment_info["Credit"], 2),
            ("D", round(helpers.set_new_value(row_tuple[3], 0)) + payment_info["Cashless (mobile)"], 2),
            ("E", round(helpers.set_new_value(row_tuple[4], 0)) + total, 2),
            ("F", round((helpers.set_new_value(row_tuple[4], 0)  + total) / 2.0), 2),
        )
    #For stores that are on the output sheet
    for store_num in store_payment_outputs:
        store_row = 0
        if store_num in store_number_rows:
            store_row = str(store_number_rows[store_num])
            
            payment_info = store_payment_outputs[store_num]
            helpers.manipulate_row(worksheets.output_spreadsheet, update_payments, store_row)
        else:
            new_store_payment_outputs[store_num] = store_payment_outputs[store_num]
    #For stores that need to be inserted on the output sheet
    for store_num in new_store_payment_outputs:
        payment_info = store_payment_outputs[store_num]
        store_row = helpers.insert_row(worksheets.output_spreadsheet, "A", int(store_num),lambda x: int(x[13:]) ,2)
        helpers.manipulate_row(worksheets.output_spreadsheet, update_payments, store_row)

    worksheets.save_work()

if __name__ == "__main__":
    main()