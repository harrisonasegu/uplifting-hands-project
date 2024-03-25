export const useCamelCaseToTitle = (str: string) => {
  // insert a space before all caps
  str = str.replace(/([A-Z])/g, ' $1')

  // capitalize the first letter and return the string
  let titleCaseString = str.charAt(0).toUpperCase() + str.slice(1)

  return titleCaseString
}
