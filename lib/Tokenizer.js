const Tokens = [
  // Whitespace:
  [/^[\r\n]/, 'NEWLINE'], // Single newline
  [/^[^\S\r\n]+/, null], // Any other whitespace
  // Comments:
  [/^#.*[\r\n]?/, null],
  // Repeat operator
  [/^[xX]/, 'REPEAT'],
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
      this.cursor += lineIndent;
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

      // Update the current string with the new cursor position
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
        // Advance the cursor
        const tokenValue = match[0];
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
