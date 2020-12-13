const Tokens = [
  // Comments:
  [/^ *#.*/, null],
  // Whitespace:
  [/^[\r\n]/, 'NEWLINE'], // Single newline
  [/^[^\S\r\n]+/, null], // Any other whitespace
  // Markers
  [/^,/, 'COMMA'],
  [/^x/i, 'REPEAT'],
  [/^\//, 'CYCLE'],
  [/^>/, 'RAMP'],
  [/^(watts?|w)/i, 'INTENSITY_WATTS'],
  [/^%/, 'INTENSITY_PERCENT'],
  [/^s((econd|ec)s?)?/i, 'DURATION_SEC'],
  [/^(minute|min)s?/i, 'DURATION_MIN'],
  [/^(hour|hr)s?/i, 'DURATION_HOUR'],
  // Numbers:
  [/^\d+\.\d*/, 'FLOAT'], // Positive floating point number
  [/^\d+/, 'INT'], // Positive integer
  // Strings:
  [/^"[^"]*"/, 'STRING'], // Double-quote string
  [/^'[^']*'/, 'STRING'], // Single-quote string
];

export default class Tokenizer {
  /**
   * Constructor for a tokenizer
   * @param {*} string String to initialize; defaults empty
   */
  constructor(string = '') {
    this.init(string);
  }

  /**
   * Initialize the tokenizer with a new string
   * @param {*} string String to initialize
   */
  init(string) {
    this.string = string;
    this.cursor = 0;
    this.currentIndent = 0;
  }

  // Grab the next token in the string
  next() {
    let string = this.getStringAtCursor();

    // Check Indents/Dedents
    if (this.atLineStart()) {
      // Tabs should not be used at the start of a line
      if (string.startsWith('\t')) throw SyntaxError(`Unexpected token: "\\t"`);

      const lineIndent = /^ */.exec(string)[0].length; // This regex should always match
      const diff = lineIndent - this.currentIndent;
      // INDENT
      if (diff === 2) {
        this.currentIndent += 2;
        return Tokenizer.tokenize('INDENT');
      }
      // DEDENT
      if (diff < 0 && !(diff % 2)) {
        this.currentIndent -= 2;
        return Tokenizer.tokenize('DEDENT');
      }
      // Invalid indent
      if (diff !== 0) {
        throw SyntaxError(`Unexpected indent of ${lineIndent}.`);
      }
      // Indent hasn't changed, advance cursor
      this.cursor += lineIndent;
      string = this.getStringAtCursor();
    }

    // Return null if there are no more tokens
    if (this.eof()) return null;

    // Loop through Tokens and look for match
    // eslint-disable-next-line guard-for-in, no-restricted-syntax
    for (let i = 0; i < Tokens.length; i += 1) {
      const [regexp, tokenType] = Tokens[i];
      const match = regexp.exec(string);
      if (match !== null) {
        const tokenValue = match[0];

        // If this is a full-line comment, ignore the new line
        if (tokenType === 'NEWLINE' && this.afterIndent().startsWith('#')) {
          this.cursor += tokenValue.length;
          return this.next();
        }

        // Advance the cursor
        this.cursor += tokenValue.length;

        // If the match doesn't have a token, return the next token
        if (!tokenType) return this.next();

        return Tokenizer.tokenize(tokenType, tokenValue);
      }
    }

    // Throw error as there are no matches
    throw SyntaxError(`Unexpect token: "${string[0]}"`);
  }

  // Check if the tokenizer is at the end of the string
  eof() {
    return this.cursor >= this.string.length;
  }

  // Builds a token structure
  static tokenize(type, value) {
    return { type, value };
  }

  // Checks if cursor is at the start of a line
  atLineStart(pos = this.cursor) {
    return pos <= 0 || this.string[pos - 1] === '\n';
  }

  // Returns the position of the beginning of the current line
  lineStart(pos = this.cursor) {
    let cursor = pos;
    while (!this.atLineStart(cursor)) cursor -= 1;
    return cursor;
  }

  // Returns the string starting after the current indent
  afterIndent(pos = this.cursor) {
    return this.string.slice(this.lineStart(pos) + this.currentIndent);
  }

  getStringAtCursor(pos = this.cursor) {
    return this.string.slice(pos);
  }

  // Iterator method to allow the tokenizer to be a valid iterator
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
