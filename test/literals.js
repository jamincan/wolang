import { describe, it } from 'mocha';
import assert from 'assert';
import Parser from '../lib/Parser';

const parser = new Parser();

describe('Literals', () => {
  describe('NumericLiteral', () => {
    it('basic number', () => {
      const program = `42`;
      const expected = {
        type: 'Program',
        body: {
          type: 'NumericLiteral',
          value: 42,
        },
      };
      assert.deepStrictEqual(parser.parse(program), expected);
    });
  });
});
