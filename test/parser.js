import { describe, it } from 'mocha';
import assert from 'assert';
import Parser from '../lib/Parser';

const parser = new Parser();

describe('Durations', () => {
  it('seconds', () => {
    const actual = parser.parse(`35 sec`);
    const expected = {
      type: 'Program',
      body: 35,
    };
    assert.deepStrictEqual(actual, expected);
  });
  it('throw error with seconds as float', () => {
    assert.throws(() => parser.parse(`3.5 sec`));
  });
  it('minutes', () => {
    const actual = parser.parse(`2 Minutes`);
    const expected = {
      type: 'Program',
      body: 120,
    };
    assert.deepStrictEqual(actual, expected);
  });
  it('hours', () => {
    const actual = parser.parse(`1.5 HRS`);
    const expected = {
      type: 'Program',
      body: 5400,
    };
    assert.deepStrictEqual(actual, expected);
  });
});
describe('Intensity', () => {
  it('power', () => {
    const actual = parser.parse(`350W`);
    const expected = {
      type: 'Program',
      body: { power: 350 },
    };
    assert.deepStrictEqual(actual, expected);
  });
  it('percentFTP as percentage', () => {
    const actual = parser.parse(`85%`);
    const expected = {
      type: 'Program',
      body: { percentFTP: 0.85 },
    };
    assert.deepStrictEqual(actual, expected);
  });
  it('percentFTP as plain number', () => {
    const actual = parser.parse(`1.35`);
    const expected = {
      type: 'Program',
      body: { percentFTP: 1.35 },
    };
    assert.deepStrictEqual(actual, expected);
  });
});
