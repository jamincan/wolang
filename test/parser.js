import { describe, it } from 'mocha';
import assert from 'assert';
import Parser from '../lib/parser';
import { Interval, Set } from '../lib/nodes';

const parser = new Parser();

describe('Durations', () => {
  it('seconds', () => {
    const actual = parser.parse(`35 sec 350W`);
    const expected = {
      type: 'Program',
      body: Set(1, [Interval(35, { power: 350 })]),
    };
    assert.deepStrictEqual(actual, expected);
  });
  it('throw error with seconds as float', () => {
    assert.throws(() => parser.parse(`3.5 sec @200W`));
  });
  it('minutes', () => {
    const actual = parser.parse(`2 Minutes @200W`);
    const expected = {
      type: 'Program',
      body: Set(1, [Interval(120, { power: 200 })]),
    };
    assert.deepStrictEqual(actual, expected);
  });
  it('hours', () => {
    const actual = parser.parse(`1.5 HRS @ 0.90`);
    const expected = {
      type: 'Program',
      body: Set(1, [Interval(5400, { percentFTP: 0.9 })]),
    };
    assert.deepStrictEqual(actual, expected);
  });
});
describe('Intensity', () => {
  it('power', () => {
    const actual = parser.parse(`15s 350W`);
    const expected = {
      type: 'Program',
      body: Set(1, [Interval(15, { power: 350 })]),
    };
    assert.deepStrictEqual(actual, expected);
  });
  it('percentFTP as percentage', () => {
    const actual = parser.parse(`120s 85%`);
    const expected = {
      type: 'Program',
      body: Set(1, [Interval(120, { percentFTP: 0.85 })]),
    };
    assert.deepStrictEqual(actual, expected);
  });
  it('percentFTP as plain number', () => {
    const actual = parser.parse(`30s 1.35`);
    const expected = {
      type: 'Program',
      body: Set(1, [Interval(30, { percentFTP: 1.35 })]),
    };
    assert.deepStrictEqual(actual, expected);
  });
});

describe('Sets', () => {
  it('simple single-line set', () => {
    const actual = parser.parse(`2x 1min @200W`);
    const expected = {
      type: 'Program',
      body: Set(2, [Interval(60, { power: 200 })]),
    };
    assert.deepStrictEqual(actual, expected);
  });
  it('single-line set with 2 intervals', () => {
    const actual = parser.parse(`2x 1min @200W, 2min @170W`);
    const expected = {
      type: 'Program',
      body: Set(2, [Interval(60, { power: 200 }), Interval(120, { power: 170 })]),
    };
    assert.deepStrictEqual(actual, expected);
  });
  it('should not allow float repeats', () => {
    assert.throws(() => parser.parse(`2.5x 1min @200W`));
  });
});
