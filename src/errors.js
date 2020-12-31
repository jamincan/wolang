/* eslint-disable max-classes-per-file */

/** Error class for unexpected characters in tokenizer's input stream. */
export class UnexpectedCharacterError extends SyntaxError {
  /**
   * Create a new UnexpectedCharacterError
   * @param {string} character - the unexpected character
   * @param {number} line - the line it was found on
   * @param {number} column - the column it was found on
   */
  constructor(character, line, column) {
    super();
    this.message = `Unexpect character at [${line}, ${column}]: "${character}"`;
    this.line = line;
    this.column = column;
  }
}

/** Error class for unexpected indentation in tokenizer's input stream. */
export class UnexpectedIndentError extends SyntaxError {
  /**
   * Create a new UnexpectedIndentError
   * @param {number} indent - length of the indent
   * @param {number} line - the line it can be found at
   * @param {number} column - the column it can be found at
   */
  constructor(indent, line, column) {
    super();
    this.message = `Unexpected indent of ${indent} at [${line}, ${column}].`;
    this.line = line;
    this.column = column;
  }
}

/** Error class for unexpected token. */
export class UnexpectedTokenError extends SyntaxError {
  /**
   * Create a new UnexpectedTokenError
   * @param {Token} token - the token that was unexpected
   * @param {string} expected - the type of the token that was expected
   */
  constructor(token, expected) {
    super();
    this.message = `Unexpected token at [${token.line}, ${token.column}]: "${token.value}", expected: ${expected}.`;
    this.line = token.line;
    this.column = token.column;
  }
}

/** Error class for when EOF is reached unexpectedly */
export class UnexpectedEOFError extends SyntaxError {
  /**
   * Create a new UnexpectedEOFError
   * @param {string} expected - the Symbol that was expected
   */
  constructor(expected) {
    super();
    if (expected) this.message = `Unexpected EOF; expected: ${expected}.`;
    else this.message = 'Unexpected EOF.';
  }
}
