import Tokenizer from './tokenizer/tokenizer';
import TokenQueue from './tokenizer/tokenqueue';
import { UnexpectedTokenError } from './errors';

/** Javascript parser for wolang using recursive descent implementation. */
export default class Parser {
  /** Create a parser instance */
  constructor() {
    this.tokenizer = new Tokenizer();
  }

  /**
   * Parse a string into an Abstract Source Tree
   * @param {string} string  The wolang program
   * @return {object}  AST in JSON format
   */
  parse(string) {
    this.string = string;
    this.tokenizer.init(string);
    this.queue = new TokenQueue(this.tokenizer);
    return this.Program();
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
      body: this.queue.test(() => this.Duration()) || this.Intensity(),
    };
  }

  /** Duration -> returns value in seconds
   *  : Integer SEC
   *  | Numeric MIN
   *  | Numeric HR
   */
  Duration() {
    let value = this.Numeric();

    const units = this.queue.eat(); // TODO: update TokenQueue to allow eat to accept multiple tokenTypes.
    // Convert the durations to seconds
    switch (units.type) {
      case 'SEC':
        // Throw an error if seconds is a float
        if (!Number.isInteger(value)) throw new UnexpectedTokenError(units, 'MIN/HR');
        break;
      case 'MIN':
        value *= 60;
        break;
      case 'HR':
        value *= 3600;
        break;
      default:
        throw new UnexpectedTokenError(units, 'SEC/MIN/HR');
    }
    return value;
  }

  /** Intensity
   *  : Power
   *  | PercentFTP
   */
  Intensity() {
    const power = this.queue.test(() => this.Power());
    if (power) return { power };
    return { percentFTP: this.PercentFTP() };
  }

  /** PercentFTP -> returns percentage as float
   *  : Numeric %
   *  | Numeric
   */
  PercentFTP() {
    let value = this.Numeric();
    const units = this.queue.peek();
    if (units && units.type === '%') {
      this.queue.eat('%');
      value /= 100;
    }
    return value;
  }

  /** Power
   *  : INT W
   */
  Power() {
    const value = this.Integer();
    this.queue.eat('W');
    return value;
  }

  /** Numeric
   *  : Float
   *  | Integer
   */
  Numeric() {
    const value = this.queue.peek();
    switch (value.type) {
      case 'INT':
        return this.Integer();
      case 'FLOAT':
        return this.Float();
      default:
        throw new UnexpectedTokenError(value, 'INT/FLOAT');
    }
  }

  // INT
  Integer() {
    return Number(this.queue.eat('INT').value);
  }

  // FLOAT
  Float() {
    return Number(this.queue.eat('FLOAT').value);
  }

  // STRING
  String() {
    return this.queue.eat('STRING').slice(1, -1); // Remove quotes
  }
}
