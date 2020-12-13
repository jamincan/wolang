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
