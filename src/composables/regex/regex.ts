export const RegEx = {
    email: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,

    password: {
        hasLowerCaseChar: /^(?=.*[a-z])/,
        hasUpperCaseChar: /^(?=.*[A-Z])/,
        hasNumberChar: /^(?=.*\d)/,
        hasSymbolChar: /[^\w\s]|_/
    }
}
