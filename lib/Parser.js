import Tokenizer from './tokenizer/tokenizer';
import { UnexpectedTokenError, UnexpectedEOFError } from './errors';
/**
 * Javascript parser for wolang using recursive descent implementation.
 */
export default class Parser {
  constructor() {
    this.tokenizer = new Tokenizer();
  }

  /**
   * Parse a string into an AST
   * @param {string} string  The wolang program
   * @return {object}  AST in JSON format
   */
  parse(string) {
    this.string = string;
    this.tokenizer.init(string);
    this.queue = [];
    this.trying = [];
    return this.Program();
  }

  // Returns first token in the queue and retrieves the next if empty
  get lookahead() {
    // If the queue is empty, add another token
    if (this.queue.length === 0) this.queue.push(this.tokenizer.next());
    // Return first token in the queue
    return this.queue[0];
  }

  /**
   * Consume a token of the specified type
   * @param {string} tokenType Defaults to the type of the next token
   * @return {object} The matching next token.
   */
  eat(tokenType = this.lookahead.type) {
    const token = this.lookahead;
    if (token == null) {
      throw new SyntaxError(`Unexpected end of input, expected: "${tokenType}`);
    }

    if (token.type !== tokenType) throw new UnexpectedTokenError(token, tokenType);

    // If a trying queue is active, save the token in the most recent one
    if (this.trying.length > 0) {
      this.trying[this.trying.length - 1].push(this.queue[0]);
    }
    // Return the next token
    return this.queue.shift();
  }

  /**
   * Try a callable. If it throws and error, return null and restore the used tokens.
   * Return the result if it succeeds.
   * @param {function} method // Method to test. Use closure to ensure instance context is preserved.
   */
  try(method) {
    this.trying.push([]); // Add new queue to the top of the trying queue
    try {
      const result = method();
      // Success
      this.trying.pop(); // Remove the saved tokens
      return result;
    } catch (err) {
      if (err instanceof SyntaxError) {
        // Fail - restore queues
        this.queue.unshift(...this.trying.pop());
        return null;
      }
      throw err;
    }
  }

  // Returns the lookahead if it exists, otherwise throws an error.
  expecting(string) {
    if (this.lookahead) return this.lookahead;
    throw new UnexpectedEOFError(string);
  }

  /**
   * Main entry point for wolang program.
   *
   * Program
   * : Duration
   * | Intensity
   * ;
   */
  Program() {
    return {
      type: 'Program',
      body: this.try(() => this.Duration()) || this.Intensity(),
    };
  }

  /** Duration -> returns value in seconds
   *  : Integer SEC
   *  | Numeric MIN
   *  | Numeric HR
   */
  Duration() {
    let value = this.Numeric();

    const lookahead = this.expecting('SEC/MIN/HR');
    // Convert the durations to seconds
    switch (lookahead.type) {
      case 'SEC':
        // Throw an error if seconds is a float
        if (!Number.isInteger(value))
          throw new UnexpectedTokenError(lookahead, 'MIN/HR');
        break;
      case 'MIN':
        value *= 60;
        break;
      case 'HR':
        value *= 3600;
        break;
      default:
        throw new UnexpectedTokenError(lookahead, 'SEC/MIN/HR');
    }
    this.eat(); // Consume the DURATION token in the queue

    return value;
  }

  /** Intensity
   *  : Power
   *  | PercentFTP
   */
  Intensity() {
    const power = this.try(() => this.Power());
    if (power) return { power };
    return { percentFTP: this.PercentFTP() };
  }

  /** PercentFTP -> returns percentage as float
   *  : Numeric %
   *  | Numeric
   */
  PercentFTP() {
    let value = this.Numeric();
    if (this.lookahead && this.lookahead.type === '%') {
      this.eat('%');
      value /= 100;
    }
    return value;
  }

  /** Power
   *  : INT W
   */
  Power() {
    const value = this.Integer();
    this.eat('W');
    return value;
  }

  /** Numeric
   *  : Float
   *  | Integer
   */
  Numeric() {
    const lookahead = this.expecting('INT/FLOAT');
    switch (lookahead.type) {
      case 'INT':
        return this.Integer();
      case 'FLOAT':
        return this.Float();
      default:
        throw new UnexpectedTokenError(lookahead, 'INT/FLOAT');
    }
  }

  // INT
  Integer() {
    return Number(this.eat('INT').value);
  }

  // FLOAT
  Float() {
    return Number(this.eat('FLOAT').value);
  }

  // STRING
  String() {
    return this.eat('STRING').slice(1, -1); // Remove quotes
  }
}
