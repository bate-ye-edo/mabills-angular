export const PATTERNS = {
  NUMBERS_ONLY: '^(0|[1-9][0-9]*)(\\.[0-9]{1,3})?$',
  DATE: '^(\\d{4}-\\d{2}-\\d{2})$',
  CREDIT_CARD: '^\\d{15,16}$',
  IBAN: '^[A-Z]{2}[0-9]{2}[A-Z0-9]{1,30}$',
  CREDIT_CARD_CONTAINS_PATTERN: '^(\\d{1,16})?$',
  IBAN_CONTAINS_PATTERN: '^(^[A-Z]{2}[0-9]{2}[A-Z0-9]{1,30}|[A-Z0-9]{1,34})$',
}
