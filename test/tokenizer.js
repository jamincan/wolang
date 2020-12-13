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
  describe('Repeats', () => {
    it('x and X mark a repeat', () => {
      tokenizer.init(`21x32X`);
      const actual = Array.from(tokenizer).map((token) => token.type);
      const expected = ['INT', 'REPEAT', 'INT', 'REPEAT'];
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
