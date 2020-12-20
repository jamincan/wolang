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
    return this.Block(true);
  }

  /** Set -> returns a set (a repeating block of intervals or sets)
   *  : Repeat NewLine? Block
   */
  Set() {
    const repeat = this.Repeat();
    const block = this.Block();
    return Set(repeat, block);
  }

  /** Block -> returns a list of Intervals or Sets
   *  : INDENT Block... DEDENT
   *  | Interval ,? Interval ,? ... NewLine
   *
   *  A file is effectively one indent block, setting bootstrap to true will cause
   *  the Block symbol to jump into an INDENT block without an INDENT token to trigger
   *  it.
   *  @param {boolean} bootstrap
   */
  Block(bootstrap = false) {
    // If the next token is an indent, it's followed by a block.
    // Alternately, if we are bootstrapping the program, enter a block directly
    if (bootstrap || this.queue.optional('INDENT')) {
      let sets = [];
      // Collect the sets until a dedent or EOF. If the child set has no repeats,
      // this set should inherit the children directly instead of nesting
      // a single-repeat set.
      while (this.queue.peek() && !this.queue.optional('DEDENT')) {
        const next = this.Set();
        if (next.repeat < 2) sets.push(...next.sets);
        else sets.push(next);
      }
      return sets;
    }
    // If it's not an indent, it's a block of intervals
    let intervals = [];
    while (!this.queue.test(() => this.NewLine())) {
      intervals.push(this.Interval());
      this.queue.optional(',');
    }
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
      this.queue.optional('NEWLINE');
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

  // NEWLINE -> treat EOF as NewLine, also collapse multiple NEWLINEs into one
  NewLine() {
    if (!this.queue.peek()) return 'EOF'; // EOF

    // Grab one NEWLINE minimum
    let next = this.queue.eat('NEWLINE');
    let string = next.value;
    // Grab any subsequent NEWLINEs
    while ((next = this.queue.optional('NEWLINE'))) string += next.value;

    if (string.length == 0) throw new UnexpectedTokenError(next, 'NEWLINE');
    return string;
  }
}
