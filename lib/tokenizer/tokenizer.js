import { UnexpectedIndentError, UnexpectedCharacterError } from '../errors';

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
export default class Tokenizer {
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
        return this.tokenize('INDENT');
      }
      // DEDENT
      if (diff < 0 && !(diff % 2)) {
        this.currentIndent -= 2;
        return this.tokenize('DEDENT');
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

        return this.tokenize(tokenType, tokenValue, line, column);
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
   * Builds a token structure
   * @param {string} type - the TokenType
   * @param {string} value - the actual string that matched the token
   * @param {number} line - the line the token was found on
   * @param {number} column - the column the token was found on
   */
  tokenize(type, value, line = this.line, column = this.column) {
    return { type, value, line, column };
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
