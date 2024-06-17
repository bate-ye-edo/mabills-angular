import {FilterField} from "./filter-field";
import {PATTERNS} from "../patterns";

export const DEFAULT_FILTERS = {
  Amount: {
    filterName: 'Amount',
    filterField: FilterField.AMOUNT,
    filterDataType: 'number',
  },
  ExpenseDate: {
    filterName: 'Expense date',
    filterField: FilterField.EXPENSE_DATE,
    filterDataType: 'Date',
  },
  CreditCard: {
    filterName: 'Credit card',
    filterField: FilterField.CREDIT_CARD,
    filterDataType: 'string',
    pattern: PATTERNS.CREDIT_CARD,
    containsSearchPattern: PATTERNS.CREDIT_CARD_CONTAINS_PATTERN,
    errorMessage: 'Invalid credit card number'
  },
  IncomeDate: {
    filterName: 'Income date',
    filterField: FilterField.INCOME_DATE,
    filterDataType: 'Date',
  },
  IBAN: {
    filterName: 'IBAN',
    filterField: FilterField.BANK_ACCOUNT,
    filterDataType: 'string',
    pattern: PATTERNS.IBAN,
    containsSearchPattern: PATTERNS.IBAN_CONTAINS_PATTERN,
    errorMessage: 'Invalid IBAN number'
  },
  ExpenseCategory: {
    filterName: 'Expense category',
    filterField: FilterField.EXPENSE_CATEGORY,
    filterDataType: 'string',
  },
  FormOfPayment: {
    filterName: 'Expense form of payment',
    filterField: FilterField.FORM_OF_PAYMENT,
    filterDataType: 'string',
  },
  Description: {
    filterName: 'Description',
    filterField: FilterField.DESCRIPTION,
    filterDataType: 'string',
  }
}
