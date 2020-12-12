/**
 * Javascript parser for wolang using recursive descent implementation.
 */
export default class Parser {
  constructor() {
    this.string = '';
  }

  /**
   * Parse a string into an AST
   * @param {} string  The wolang program
   * @return {}  AST in JSON format
   */
  parse(string) {
    this.string = string;
    return this.Program();
  }

  /**
   * Main entry point for wolang program.
   *
   * Program
   * : NumericLiteral
   * ;
   */
  Program() {
    return {
      type: 'Program',
      body: this.NumericLiteral(),
    };
  }

  /**
   * NumericLiteral
   * : NUMBER
   * ;
   */
  NumericLiteral() {
    return {
      type: 'NumericLiteral',
      value: Number(this.string),
    };
  }
}
