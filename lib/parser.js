import Tokenizer from './tokenizer/tokenizer';
import TokenQueue from './tokenizer/tokenqueue';
import { Interval, Set } from './nodes';
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
   * : Interval
   * ;
   */
  Program() {
    return {
      type: 'Program',
      body: this.Set(),
    };
  }

  /** Set -> returns a list of Sets
   *  : Repeat IntervalList
   */
  Set() {
    const repeat = this.Repeat();
    const intervals = this.IntervalList();
    return Set(repeat, intervals);
  }

  /** IntervalList -> return a list of intervals
   *  : Interval , Interval , ... NewLine
   *  | Interval NewLine
   */
  IntervalList() {
    // Grab one Interval minimum
    let intervals = [this.Interval()];

    // As long as a comma follows, keep eating Intervals
    while (this.queue.optional(',')) {
      intervals.push(this.Interval());
    }

    // The list should terminate with a newline
    this.NewLine();

    return intervals;
  }

  /** Interval -> returns an object with duration and intensity and optionally an annotation
   *  : Duration @? Intensity STRING?
   */
  Interval() {
    const duration = this.Duration();
    this.queue.optional('@');
    const intensity = this.Intensity();
    const annotation = this.queue.test(() => this.String());
    return Interval(duration, intensity, annotation);
  }

  /** Repeat -> returns the number of repeats. If there is no repeat specified, it will implicitly assign 1
   *  : Integer REPEAT
   */
  Repeat() {
    // Do a test out an Integer symbol and REPEAT token and save the integer if success
    const value = this.queue.test(() => {
      const value = this.Integer();
      this.queue.eat('REPEAT');
      return value;
    });

    // Return the value if success, otherwise default to 1
    return value || 1;
  }

  /** Duration -> returns value in seconds
   *  : Integer SEC
   *  | Numeric MIN
   *  | Numeric HR
   */
  Duration() {
    let value = this.Numeric();

    const units = this.queue.eat('SEC', 'MIN', 'HR'); // TODO: update TokenQueue to allow eat to accept multiple tokenTypes.
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
    switch (value && value.type) {
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
    return this.queue.eat('STRING').value.slice(1, -1); // Remove quotes
  }

  // NEWLINE
  NewLine() {
    const next = this.queue.peek();
    if (next && next.type !== 'NEWLINE')
      throw new UnexpectedTokenError(next, 'NEWLINE');
    if (next) this.queue.eat(next);
  }
}
