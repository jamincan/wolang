/* eslint-disable max-classes-per-file */
export class UnexpectedCharacterError extends SyntaxError {
  constructor(character, line, column) {
    super();
    this.message = `Unexpect character at [${line}, ${column}]: "${character}"`;
    this.line = line;
    this.column = column;
  }
}
export class UnexpectedIndentError extends SyntaxError {
  constructor(indent, line, column) {
    super();
    this.message = `Unexpected indent of ${indent} at [${line}, ${column}].`;
    this.line = line;
    this.column = column;
  }
}
export class UnexpectedTokenError extends SyntaxError {
  constructor(token, expected) {
    super();
    this.message = `Unexpected token at [${token.line}, ${token.column}]: "${token.value}", expected: ${expected}.`;
    this.line = token.line;
    this.column = token.column;
  }
}
export class UnexpectedEOFError extends SyntaxError {
  constructor(expected) {
    super();
    if (expected) this.message = `Unexpected EOF; expected: ${expected}.`;
    else this.message = 'Unexpected EOF.';
  }
}
