import { describe, it } from 'mocha';
import assert from 'assert';
import Parser from '../lib/parser';
import { Interval, Set } from '../lib/nodes';

const parser = new Parser();

describe('Durations', function () {
  it('seconds', function () {
    const actual = parser.parse(`35 sec 350W`);
    const expected = {
      type: 'Program',
      body: Set(1, [Interval(35, { power: 350 })]),
    };
    assert.deepStrictEqual(actual, expected);
  });
  it('throw error with seconds as float', function () {
    assert.throws(() => parser.parse(`3.5 sec @200W`));
  });
  it('minutes', function () {
    const actual = parser.parse(`2 Minutes @200W`);
    const expected = {
      type: 'Program',
      body: Set(1, [Interval(120, { power: 200 })]),
    };
    assert.deepStrictEqual(actual, expected);
  });
  it('hours', function () {
    const actual = parser.parse(`1.5 HRS @ 0.90`);
    const expected = {
      type: 'Program',
      body: Set(1, [Interval(5400, { percentFTP: 0.9 })]),
    };
    assert.deepStrictEqual(actual, expected);
  });
});
describe('Intensity', function () {
  it('power', function () {
    const actual = parser.parse(`15s 350W`);
    const expected = {
      type: 'Program',
      body: Set(1, [Interval(15, { power: 350 })]),
    };
    assert.deepStrictEqual(actual, expected);
  });
  it('percentFTP as percentage', function () {
    const actual = parser.parse(`120s 85%`);
    const expected = {
      type: 'Program',
      body: Set(1, [Interval(120, { percentFTP: 0.85 })]),
    };
    assert.deepStrictEqual(actual, expected);
  });
  it('percentFTP as plain number', function () {
    const actual = parser.parse(`30s 1.35`);
    const expected = {
      type: 'Program',
      body: Set(1, [Interval(30, { percentFTP: 1.35 })]),
    };
    assert.deepStrictEqual(actual, expected);
  });
});

describe('Intervals', function () {
  it('interval without annotation', function () {
    const actual = parser.parse(`1min @200W`);
    const expected = {
      type: 'Program',
      body: Set(1, [Interval(60, { power: 200 })]),
    };
    assert.deepStrictEqual(actual, expected);
  });
  it('interval with annotation', function () {
    const actual = parser.parse(`1min @200W "max effort"`);
    const expected = {
      type: 'Program',
      body: Set(1, [Interval(60, { power: 200 }, 'max effort')]),
    };
    assert.deepStrictEqual(actual, expected);
  });
});

describe('Sets', function () {
  it('simple single-line set', function () {
    const actual = parser.parse(`2x 1min @200W`);
    const expected = {
      type: 'Program',
      body: Set(2, [Interval(60, { power: 200 })]),
    };
    assert.deepStrictEqual(actual, expected);
  });
  it('single-line set with 2 intervals', function () {
    const actual = parser.parse(`2x 1min @200W, 2min @170W`);
    const expected = {
      type: 'Program',
      body: Set(2, [Interval(60, { power: 200 }), Interval(120, { power: 170 })]),
    };
    assert.deepStrictEqual(actual, expected);
  });
  it('should not allow float repeats', function () {
    assert.throws(() => parser.parse(`2.5x 1min @200W`));
  });
});
