export default class Token {
  /**
   * Create a Token
   * @param {string} type - the TokenType
   * @param {string} value - the actual string that matched the token
   * @param {number} line - the line the token was found on
   * @param {number} column - the column the token was found on
   */
  constructor(type, value, line, column) {
    this.type = type;
    this.value = value;
    this.line = line;
    this.column = column;
  }
}
