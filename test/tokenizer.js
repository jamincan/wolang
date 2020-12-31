import { describe, it } from 'mocha';
import assert from 'assert';
import Tokenizer from '../src/tokenizer/tokenizer';

const tokenizer = new Tokenizer();

describe('Tokenizer', function () {
  describe('Indents/Dedents', function () {
    it('single indent', function () {
      tokenizer.init(`21\n  30`);
      const actual = Array.from(tokenizer).map((token) => token.type);
      const expected = ['INT', 'NEWLINE', 'INDENT', 'INT'];
      assert.deepStrictEqual(actual, expected);
    });
    it('indent/dedent', function () {
      tokenizer.init(`21\n  30\n20`);
      const actual = Array.from(tokenizer).map((token) => token.type);
      const expected = ['INT', 'NEWLINE', 'INDENT', 'INT', 'NEWLINE', 'DEDENT', 'INT'];
      assert.deepStrictEqual(actual, expected);
    });
    it('nested', function () {
      tokenizer.init(`21\n  30\n    20\n10`);
      const actual = Array.from(tokenizer).map((token) => token.type);
      const expected = [
        'INT',
        'NEWLINE',
        'INDENT',
        'INT',
        'NEWLINE',
        'INDENT',
        'INT',
        'NEWLINE',
        'DEDENT',
        'DEDENT',
        'INT',
      ];
      assert.deepStrictEqual(actual, expected);
    });
    it('double dedent nested', function () {
      tokenizer.init(`  \n    \n      \n  \n`);
      const actual = Array.from(tokenizer).map((token) => token.type);
      const expected = [
        'INDENT',
        'NEWLINE',
        'INDENT',
        'NEWLINE',
        'INDENT',
        'NEWLINE',
        'DEDENT',
        'DEDENT',
        'NEWLINE',
        'DEDENT',
      ];
      assert.deepStrictEqual(actual, expected);
    });
    it('throws error with double indent', function () {
      tokenizer.init(`    30\n`);
      assert.throws(() => tokenizer.next(), SyntaxError);
    });
    it('throws error with odd indents', function () {
      tokenizer.init(` 30\n`);
      assert.throws(() => tokenizer.next(), SyntaxError);
    });
    it('throws error with odd dedents', function () {
      tokenizer.init(`  20\n 30\n`);
      assert.throws(() => Array.from(tokenizer), SyntaxError);
    });
  });
  describe('Whitespace', function () {
    it('new lines', function () {
      tokenizer.init(`\n\n\n21`);
      const actual = Array.from(tokenizer).map((token) => token.type);
      const expected = ['NEWLINE', 'NEWLINE', 'NEWLINE', 'INT'];
      assert.deepStrictEqual(actual, expected);
    });
    it('ignore spaces', function () {
      tokenizer.init(`21   "Hello"`);
      const actual = Array.from(tokenizer).map((token) => token.type);
      const expected = ['INT', 'STRING'];
      assert.deepStrictEqual(actual, expected);
    });
    it('throws error with tab at start', function () {
      tokenizer.init(`\t20\n 30\n`);
      assert.throws(() => Array.from(tokenizer));
    });
  });
  describe('Comments', function () {
    it('Full-line comment', function () {
      tokenizer.init(`# This is a comment\n"This is not."`);
      const actual = Array.from(tokenizer).map((token) => token.type);
      const expected = ['STRING'];
      assert.deepStrictEqual(actual, expected);
    });
    it('Comment on line with other literal', function () {
      tokenizer.init(`21 # This is a comment\n"This is not."`);
      const actual = Array.from(tokenizer).map((token) => token.type);
      const expected = ['INT', 'NEWLINE', 'STRING'];
      assert.deepStrictEqual(actual, expected);
    });
  });
  describe('Markers', function () {
    it('x or X are a REPEAT', function () {
      tokenizer.init(`21x32X`);
      const actual = Array.from(tokenizer).map((token) => token.type);
      const expected = ['INT', 'REPEAT', 'INT', 'REPEAT'];
      assert.deepStrictEqual(actual, expected);
    });
    it('/ marks a CYCLE, > marks a RAMP', function () {
      tokenizer.init(`21>32/40`);
      const actual = Array.from(tokenizer).map((token) => token.type);
      const expected = ['INT', 'RAMP', 'INT', 'CYCLE', 'INT'];
      assert.deepStrictEqual(actual, expected);
    });
    it('Watts Intensity', function () {
      tokenizer.init(`21w30Watts4watt`);
      const actual = Array.from(tokenizer).map((token) => token.type);
      const expected = ['INT', 'W', 'INT', 'W', 'INT', 'W'];
      assert.deepStrictEqual(actual, expected);
    });
    it('Percent Intensity', function () {
      tokenizer.init(`21%`);
      const actual = Array.from(tokenizer).map((token) => token.type);
      const expected = ['INT', '%'];
      assert.deepStrictEqual(actual, expected);
    });
    it('Duration - seconds', function () {
      tokenizer.init(`21Second30s 45 secs`);
      const actual = Array.from(tokenizer).map((token) => token.type);
      const expected = ['INT', 'SEC', 'INT', 'SEC', 'INT', 'SEC'];
      assert.deepStrictEqual(actual, expected);
    });
    it('Duration - minutes', function () {
      tokenizer.init(`21mIn30 minutes 45 mins`);
      const actual = Array.from(tokenizer).map((token) => token.type);
      const expected = ['INT', 'MIN', 'INT', 'MIN', 'INT', 'MIN'];
      assert.deepStrictEqual(actual, expected);
    });
    it('Duration - hours', function () {
      tokenizer.init(`21hr 14 Hours`);
      const actual = Array.from(tokenizer).map((token) => token.type);
      const expected = ['INT', 'HR', 'INT', 'HR'];
      assert.deepStrictEqual(actual, expected);
    });
    it('comma', function () {
      tokenizer.init(`21, 15`);
      const actual = Array.from(tokenizer).map((token) => token.type);
      const expected = ['INT', ',', 'INT'];
      assert.deepStrictEqual(actual, expected);
    });
  });
  describe('Numbers', function () {
    it('Positive floats', function () {
      tokenizer.init(`21.2\n0.45`);
      const actual = Array.from(tokenizer).map((token) => token.type);
      const expected = ['FLOAT', 'NEWLINE', 'FLOAT'];
      assert.deepStrictEqual(actual, expected);
    });
    it('Positive integers', function () {
      tokenizer.init(`21\n0`);
      const actual = Array.from(tokenizer).map((token) => token.type);
      const expected = ['INT', 'NEWLINE', 'INT'];
      assert.deepStrictEqual(actual, expected);
    });
  });
  describe('Strings', function () {
    it('Single-quote string', function () {
      tokenizer.init(`'Test'`);
      const actual = Array.from(tokenizer).map((token) => token.type);
      const expected = ['STRING'];
      assert.deepStrictEqual(actual, expected);
    });
    it('Double-quote string', function () {
      tokenizer.init(`"Test"`);
      const actual = Array.from(tokenizer).map((token) => token.type);
      const expected = ['STRING'];
      assert.deepStrictEqual(actual, expected);
    });
    it('Nested string', function () {
      tokenizer.init(`"String 'in' a string."`);
      const actual = Array.from(tokenizer).map((token) => token.type);
      const expected = ['STRING'];
      assert.deepStrictEqual(actual, expected);
    });
    it('String with white-space', function () {
      tokenizer.init(`"  Test    "`);
      const actual = Array.from(tokenizer).map((token) => token.type);
      const expected = ['STRING'];
      assert.deepStrictEqual(actual, expected);
    });
  });
  describe('Line and Columns #s', function () {
    it('0,0', function () {
      tokenizer.init(`2101 "Bob"\n21.1`);
      assert.strictEqual(tokenizer.line, 0);
      assert.strictEqual(tokenizer.column, 0);
    });
    it('0,4', function () {
      tokenizer.init(`2101 "Bob"\n21.1`);
      tokenizer.next();
      assert.strictEqual(tokenizer.line, 0);
      assert.strictEqual(tokenizer.column, 4);
    });
    it('1,0', function () {
      tokenizer.init(`2101 "Bob"\n21.1`);
      tokenizer.next();
      tokenizer.next();
      tokenizer.next();
      assert.strictEqual(tokenizer.line, 1);
      assert.strictEqual(tokenizer.column, 0);
    });
    it('line/col in tokens', function () {
      tokenizer.init(`2101 "Bob"\n  21.1`);
      const actual = Array.from(tokenizer).map((token) => [token.line, token.column]);
      const expected = [
        [0, 0],
        [0, 5],
        [0, 10],
        [1, 0],
        [1, 2],
      ];
      assert.deepStrictEqual(actual, expected);
    });
  });
});
