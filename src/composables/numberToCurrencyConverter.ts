export const useNumberToCurrencyConverter = (number: number, countryCode: string, currency: string) => {
  return number?.toLocaleString(countryCode, { style: 'currency', currency });
}
