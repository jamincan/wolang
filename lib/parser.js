class Token {
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

/* eslint-disable max-classes-per-file */

/** Error class for unexpected characters in tokenizer's input stream. */
class UnexpectedCharacterError extends SyntaxError {
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
class UnexpectedIndentError extends SyntaxError {
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
class UnexpectedTokenError extends SyntaxError {
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
class UnexpectedEOFError extends SyntaxError {
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

const Tokens = [
  // Comments:
  [/^ *#.*/, null],
  // Whitespace:
  [/^[\r\n]/, 'NEWLINE'], // Single newline
  [/^[^\S\r\n]+/, null], // Any other whitespace
  // Markers
  [/^,/, ','],
  [/^x/i, 'REPEAT'],
  [/^\//, 'CYCLE'],
  [/^>/, 'RAMP'],
  [/^@/, '@'],
  [/^(watts?|w)/i, 'W'],
  [/^%/, '%'],
  [/^s((econd|ec)s?)?/i, 'SEC'],
  [/^(minute|min)s?/i, 'MIN'],
  [/^(hour|hr)s?/i, 'HR'],
  // Numbers:
  [/^\d+\.\d*/, 'FLOAT'], // Positive floating point number
  [/^\d+/, 'INT'], // Positive integer
  // Strings:
  [/^"[^"]*"/, 'STRING'], // Double-quote string
  [/^'[^']*'/, 'STRING'], // Single-quote string
];

/**
 * Tokenizer class
 * The tokenizer processes an input stream into a series of tokens. It can be treated as an iterator
 * or manually advanced using the next() method.
 */
class Tokenizer {
  /**
   * Constructor for a tokenizer
   * @param {string} - String to initialize; defaults empty
   */
  constructor(string = '') {
    this.init(string);
  }

  /**
   * Initialize the tokenizer with a new string
   * @param {string} - String to initialize
   */
  init(string) {
    this.string = string;
    this.cursor = 0;
    this.currentIndent = 0;
    this.line = 0;
    this.column = 0;
  }

  /**
   * Advance the cursor and update the line and column position
   * NOTE: this method should only be called by the Tokenizer itself
   * as you could cause the tokenizer to lose the indentation state.
   * @param {number} length - the number of characters to move ahead
   */
  advanceCursor(length) {
    const { string } = this;

    // Identify newlines in the skipped string and update line and column
    const skipped = string.slice(this.cursor, this.cursor + length);
    const pattern = /\n/g;
    const newlines = (pattern.exec(skipped) || []).length;

    this.line += newlines;
    if (newlines > 0) this.column = length - pattern.lastIndex;
    else this.column += length;
    this.cursor += length;
  }

  /** Grab the next token in the string */
  next() {
    let string = this.getStringAtCursor();

    // Check Indents/Dedents
    if (this.atLineStart()) {
      // Tabs should not be used at the start of a line
      if (string.startsWith('\t')) {
        throw new UnexpectedCharacterError('\\t', this.line, this.column);
      }
      const lineIndent = /^ */.exec(string)[0].length; // This regex should always match
      const diff = lineIndent - this.currentIndent;
      // INDENT
      if (diff === 2) {
        this.currentIndent += 2;
        return new Token('INDENT', null, this.line, this.column);
      }
      // DEDENT
      if (diff < 0 && !(diff % 2)) {
        this.currentIndent -= 2;
        return new Token('DEDENT', null, this.line, this.column);
      }
      // Invalid indent
      if (diff !== 0)
        throw new UnexpectedIndentError(lineIndent, this.line, this.column);
      // Indent hasn't changed, advance cursor
      this.advanceCursor(lineIndent);
      string = this.getStringAtCursor();
    }

    // Return null if there are no more tokens
    if (this.eof()) return null;

    // Loop through Tokens and look for match
    for (let i = 0; i < Tokens.length; i += 1) {
      const [regexp, tokenType] = Tokens[i];
      const match = regexp.exec(string);
      if (match !== null) {
        const tokenValue = match[0];

        // If this is a full-line comment, ignore the new line
        if (tokenType === 'NEWLINE' && this.afterIndent().startsWith('#')) {
          this.advanceCursor(tokenValue.length);
          return this.next();
        }

        // Save position and advance the cursor
        const { line, column } = this;
        this.advanceCursor(tokenValue.length);

        // If the match doesn't have a token, return the next token
        if (!tokenType) return this.next();

        return new Token(tokenType, tokenValue, line, column);
      }
    }

    // Throw error as there are no matches
    throw new UnexpectedCharacterError(string[0], this.line, this.column);
  }

  /**
   * Checks if the the position is at the end of the file
   * @param {number} pos - the position in the string to search from, defaults to the index
   */
  eof(pos = this.cursor) {
    return pos >= this.string.length;
  }

  /**
   * Checks if the cursor is at the start of a line
   * @param {number} pos - the position in the string to search from, defaults to the index
   */
  atLineStart(pos = this.cursor) {
    return pos <= 0 || this.string[pos - 1] === '\n';
  }

  /**
   * Find the beginning of the current line
   * @param {number} pos - the position in the string to search from, defaults to the index
   */
  lineStart(pos = this.cursor) {
    let cursor = pos;
    while (!this.atLineStart(cursor)) cursor -= 1;
    return cursor;
  }

  /**
   * Returns the string starting after the current indent
   * @param {number} pos - the position in the string to search from, defaults to the index
   */
  afterIndent(pos = this.cursor) {
    return this.string.slice(this.lineStart(pos) + this.currentIndent);
  }

  /**
   * Returns a string slice from the specified position to the end of the string
   * @param {number} pos - the position to start the slice from, default to the current index
   */
  getStringAtCursor(pos = this.cursor) {
    return this.string.slice(pos);
  }

  /** Iterator method to allow the tokenizer to be a valid iterator */
  [Symbol.iterator]() {
    return {
      next: () => {
        const token = this.next();
        return {
          value: token,
          done: token == null,
        };
      },
    };
  }
}

/** Manages the incoming stream of tokens from the tokenizer */
class TokenQueue {
  /**
   * Create a new TokenQueue
   * @param {Tokenizer} tokenizer - an initialized Tokenizer instance
   */
  constructor(tokenizer) {
    if (!(tokenizer instanceof Tokenizer))
      throw TypeError('The TokenQueue must be provided a Tokenizer instance.');
    this.tokenizer = tokenizer;
    this.reset();
  }

  /** @returns {number} - the number of tokens in the queue */
  get count() {
    return this.queue.length - this.index;
  }

  /**
   * Look at the next tokens in the queue without consuming them. The TokenQueue will fetch
   * additional tokens from the Tokenizer as needed.
   * @param {number} [amount] - the number of tokens to return.
   * @returns {Token|Token[]} - the token, or array of tokens.
   */
  peek(amount = 1) {
    if (amount < 1)
      throw new RangeError(`Invalid amount: ${amount}. Amount must be greater than 1.`);

    // Fetch tokens from the tokenizer until the queue has enough to return
    while (amount - this.count > 0) this.queue.push(this.tokenizer.next());

    // If the amount is 1, return the token directly, otherwise send a slice of the queue containing the requested tokens
    return amount === 1
      ? this.queue[this.index]
      : this.queue.slice(this.index, this.index + amount);
  }

  /**
   * Consumes the next token in the queue. If a tokenType is provided, an error
   * will be thrown if the next token is not a match.
   * @param {...string} tokenType - the type of the token to match
   * @returns {Token} - the next token in the queue
   */
  eat(...tokenType) {
    // Fetch the next token and do error checking on it
    const next = this.peek();
    if (next == null) throw new UnexpectedEOFError(tokenType);
    if (!tokenType.includes(next.type))
      throw new UnexpectedTokenError(next, tokenType.join('/'));

    // If there are any tests in the stack, simply advance the index to point to the next token
    if (this.tests.length > 0) this.index += 1;
    // Otherwise, remove the first token in the queue
    else this.queue.shift();

    return next;
  }

  /**
   * If the requested token is in the queue, return it, but otherwise just return none.
   * @param {...string} tokenType - the type of the token to match
   * @returns {Token|null} - optionally the next token in the queue
   */
  optional(...tokenType) {
    const next = this.peek();
    if (!next || !tokenType.includes(next.type)) return null;
    return this.eat(next.type);
  }

  /**
   * Start a test. When the provided function is executed, any tokens returned by eat will be
   * preserved. If execution is successful, the tokens will be consumed as normal and the result
   * from the function returned. However, if the test catches any SyntaxErrors during execution,
   * the tokens will be restored to the queue and null will be returned.
   * @param {function} func - the testing function
   * @returns {*|null} - the result from the testing function, or null
   */
  test(func) {
    // Save the current index in the testing stack
    this.tests.push(this.index);

    // Try running the test function
    let result;
    try {
      result = func();
    } catch (err) {
      // If it throws a SyntaxError, reset the queue index to the one saved at the start of the test and return null
      if (err instanceof SyntaxError) {
        this.index = this.tests.pop();
        return null;
      }
      // Rethrow any other error
      throw err;
    }

    // Function succeeded, so delete the tokens in the queue ahead of the current index and then return the result
    const index = this.tests.pop();
    if (this.tests.length == 0) this.queue.splice(0, this.index); // Remove tokens saved in the queue if testing is done.
    this.index = index;
    return result;
  }

  /** Reset the queue so it is empty. */
  reset() {
    this.queue = []; // Queue of tokens from the tokenizer (FIFO)
    this.tests = []; // Stack of indices marking test starts (LIFO)
    this.index = 0; // Index of the next token
  }
}

/** Returns an Interval object - the annotation property is only included if provided */
function Interval(duration, intensity, annotation) {
  if (annotation) return { type: 'Interval', duration, intensity, annotation };
  return { type: 'Interval', duration, intensity };
}

function Set(repeat, sets) {
  return { type: 'Set', repeat, sets };
}

function Power(value) {
  return { type: 'Power', value };
}

function PercentFTP(value) {
  return { type: 'PercentFTP', value };
}

/** Javascript parser for wolang using recursive descent implementation. */
class Parser {
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
    return this.queue.test(() => this.Power()) || this.PercentFTP();
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
    return PercentFTP(value);
  }

  /** Power
   *  : INT W
   */
  Power() {
    const value = this.Integer();
    this.queue.eat('W');
    return Power(value);
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

export default Parser;
