import { describe, it } from 'mocha';
import assert from 'assert';
import Tokenizer from '../lib/Tokenizer';

const tokenizer = new Tokenizer();

describe('Tokenizer', () => {
  describe('Indents/Dedents', () => {
    it('single indent', () => {
      tokenizer.init(`21\n  30`);
      const actual = Array.from(tokenizer).map((token) => token.type);
      const expected = ['INT', 'NEWLINE', 'INDENT', 'INT'];
      assert.deepStrictEqual(actual, expected);
    });
    it('indent/dedent', () => {
      tokenizer.init(`21\n  30\n20`);
      const actual = Array.from(tokenizer).map((token) => token.type);
      const expected = ['INT', 'NEWLINE', 'INDENT', 'INT', 'NEWLINE', 'DEDENT', 'INT'];
      assert.deepStrictEqual(actual, expected);
    });
    it('nested', () => {
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
    it('double dedent nested', () => {
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
    it('throws error with double indent', () => {
      tokenizer.init(`    30\n`);
      assert.throws(() => tokenizer.next(), SyntaxError);
    });
    it('throws error with odd indents', () => {
      tokenizer.init(` 30\n`);
      assert.throws(() => tokenizer.next(), SyntaxError);
    });
    it('throws error with odd dedents', () => {
      tokenizer.init(`  20\n 30\n`);
      assert.throws(() => Array.from(tokenizer), SyntaxError);
    });
  });
  describe('Whitespace', () => {
    it('new lines', () => {
      tokenizer.init(`\n\n\n21`);
      const actual = Array.from(tokenizer).map((token) => token.type);
      const expected = ['NEWLINE', 'NEWLINE', 'NEWLINE', 'INT'];
      assert.deepStrictEqual(actual, expected);
    });
    it('ignore spaces', () => {
      tokenizer.init(`21   "Hello"`);
      const actual = Array.from(tokenizer).map((token) => token.type);
      const expected = ['INT', 'STRING'];
      assert.deepStrictEqual(actual, expected);
    });
  });
  describe('Comments', () => {
    it('Full-line comment', () => {
      tokenizer.init(`# This is a comment\n"This is not."`);
      const actual = Array.from(tokenizer).map((token) => token.type);
      const expected = ['STRING'];
      assert.deepStrictEqual(actual, expected);
    });
    it('Comment on line with other literal', () => {
      tokenizer.init(`21 # This is a comment\n"This is not."`);
      const actual = Array.from(tokenizer).map((token) => token.type);
      const expected = ['INT', 'NEWLINE', 'STRING'];
      assert.deepStrictEqual(actual, expected);
    });
  });
  describe('Markers', () => {
    it('x or X are a REPEAT', () => {
      tokenizer.init(`21x32X`);
      const actual = Array.from(tokenizer).map((token) => token.type);
      const expected = ['INT', 'REPEAT', 'INT', 'REPEAT'];
      assert.deepStrictEqual(actual, expected);
    });
    it('/ marks a CYCLE, > marks a RAMP', () => {
      tokenizer.init(`21>32/40`);
      const actual = Array.from(tokenizer).map((token) => token.type);
      const expected = ['INT', 'RAMP', 'INT', 'CYCLE', 'INT'];
      assert.deepStrictEqual(actual, expected);
    });
    it('Watts Intensity', () => {
      tokenizer.init(`21w30Watts4watt`);
      const actual = Array.from(tokenizer).map((token) => token.type);
      const expected = [
        'INT',
        'INTENSITY_WATTS',
        'INT',
        'INTENSITY_WATTS',
        'INT',
        'INTENSITY_WATTS',
      ];
      assert.deepStrictEqual(actual, expected);
    });
    it('Percent Intensity', () => {
      tokenizer.init(`21%`);
      const actual = Array.from(tokenizer).map((token) => token.type);
      const expected = ['INT', 'INTENSITY_PERCENT'];
      assert.deepStrictEqual(actual, expected);
    });
    it('Duration - seconds', () => {
      tokenizer.init(`21Second30s 45 secs`);
      const actual = Array.from(tokenizer).map((token) => token.type);
      const expected = [
        'INT',
        'DURATION_SEC',
        'INT',
        'DURATION_SEC',
        'INT',
        'DURATION_SEC',
      ];
      assert.deepStrictEqual(actual, expected);
    });
    it('Duration - minutes', () => {
      tokenizer.init(`21mIn30 minutes 45 mins`);
      const actual = Array.from(tokenizer).map((token) => token.type);
      const expected = [
        'INT',
        'DURATION_MIN',
        'INT',
        'DURATION_MIN',
        'INT',
        'DURATION_MIN',
      ];
      assert.deepStrictEqual(actual, expected);
    });
    it('Duration - hours', () => {
      tokenizer.init(`21hr 14 Hours`);
      const actual = Array.from(tokenizer).map((token) => token.type);
      const expected = ['INT', 'DURATION_HOUR', 'INT', 'DURATION_HOUR'];
      assert.deepStrictEqual(actual, expected);
    });
    it('comma', () => {
      tokenizer.init(`21, 15`);
      const actual = Array.from(tokenizer).map((token) => token.type);
      const expected = ['INT', 'COMMA', 'INT'];
      assert.deepStrictEqual(actual, expected);
    });
  });
  describe('Numbers', () => {
    it('Positive floats', () => {
      tokenizer.init(`21.2\n0.45`);
      const actual = Array.from(tokenizer).map((token) => token.type);
      const expected = ['FLOAT', 'NEWLINE', 'FLOAT'];
      assert.deepStrictEqual(actual, expected);
    });
    it('Positive integers', () => {
      tokenizer.init(`21\n0`);
      const actual = Array.from(tokenizer).map((token) => token.type);
      const expected = ['INT', 'NEWLINE', 'INT'];
      assert.deepStrictEqual(actual, expected);
    });
  });
  describe('Strings', () => {
    it('Single-quote string', () => {
      tokenizer.init(`'Test'`);
      const actual = Array.from(tokenizer).map((token) => token.type);
      const expected = ['STRING'];
      assert.deepStrictEqual(actual, expected);
    });
    it('Double-quote string', () => {
      tokenizer.init(`"Test"`);
      const actual = Array.from(tokenizer).map((token) => token.type);
      const expected = ['STRING'];
      assert.deepStrictEqual(actual, expected);
    });
    it('Nested string', () => {
      tokenizer.init(`"String 'in' a string."`);
      const actual = Array.from(tokenizer).map((token) => token.type);
      const expected = ['STRING'];
      assert.deepStrictEqual(actual, expected);
    });
    it('String with white-space', () => {
      tokenizer.init(`"  Test    "`);
      const actual = Array.from(tokenizer).map((token) => token.type);
      const expected = ['STRING'];
      assert.deepStrictEqual(actual, expected);
    });
  });
});
