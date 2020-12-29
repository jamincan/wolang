import { describe, it } from 'mocha';
import assert from 'assert';
import Parser from '../lib/parser';
import { Interval, Set, Power, PercentFTP } from '../lib/nodes';

const parser = new Parser();

describe('Durations', function () {
  it('seconds', function () {
    const actual = parser.parse(`35 sec 350W`);
    const expected = [Interval(35, Power(350))];
    assert.deepStrictEqual(actual, expected);
  });
  it('throw error with seconds as float', function () {
    assert.throws(() => parser.parse(`3.5 sec @200W`));
  });
  it('minutes', function () {
    const actual = parser.parse(`2 Minutes @200W`);
    const expected = [Interval(120, Power(200))];
    assert.deepStrictEqual(actual, expected);
  });
  it('hours', function () {
    const actual = parser.parse(`1.5 HRS @ 0.90`);
    const expected = [Interval(5400, PercentFTP(0.9))];
    assert.deepStrictEqual(actual, expected);
  });
});
describe('Intensity', function () {
  it('power', function () {
    const actual = parser.parse(`15s 350W`);
    const expected = [Interval(15, Power(350))];
    assert.deepStrictEqual(actual, expected);
  });
  it('percentFTP as percentage', function () {
    const actual = parser.parse(`120s 85%`);
    const expected = [Interval(120, PercentFTP(0.85))];
    assert.deepStrictEqual(actual, expected);
  });
  it('percentFTP as plain number', function () {
    const actual = parser.parse(`30s 1.35`);
    const expected = [Interval(30, PercentFTP(1.35))];
    assert.deepStrictEqual(actual, expected);
  });
});

describe('Intervals', function () {
  it('interval without annotation', function () {
    const actual = parser.parse(`1min @200W`);
    const expected = [Interval(60, Power(200))];
    assert.deepStrictEqual(actual, expected);
  });
  it('interval with annotation', function () {
    const actual = parser.parse(`1min @200W "max effort"`);
    const expected = [Interval(60, Power(200), 'max effort')];
    assert.deepStrictEqual(actual, expected);
  });
});

describe('Sets', function () {
  it('simple single-line set', function () {
    const actual = parser.parse(`2x 1min @200W`);
    const expected = [Set(2, [Interval(60, Power(200))])];
    assert.deepStrictEqual(actual, expected);
  });
  it('single-line set with 2 intervals', function () {
    const actual = parser.parse(`2x 1min @200W, 2min @170W`);
    const expected = [Set(2, [Interval(60, Power(200)), Interval(120, Power(170))])];
    assert.deepStrictEqual(actual, expected);
  });
  it('should not allow float repeats', function () {
    assert.throws(() => parser.parse(`2.5x 1min @200W`));
  });
  it('single indent block', function () {
    const actual = parser.parse(`2x\n  1min @200W\n  2min @170W\n30s @ 120W`);
    const expected = [
      Set(2, [Interval(60, Power(200)), Interval(120, Power(170))]),
      Interval(30, Power(120)),
    ];
    assert.deepStrictEqual(actual, expected);
  });
  it('double indent block', function () {
    const actual = parser.parse(
      `2x\n  1min @200W\n  3x\n    2min @170W\n    30s @ 120W`
    );
    const expected = [
      Set(2, [
        Interval(60, Power(200)),
        Set(3, [Interval(120, Power(170)), Interval(30, Power(120))]),
      ]),
    ];
    assert.deepStrictEqual(actual, expected);
  });
  it('longer complex workout', function () {
    const actual = parser.parse(
      `
10 min @ 0.75 "warmup"

5x 30s 400W "max effort" 30s 0.5 "easy spin"
5 min 0.7

2x
  10 min @280W "steady", 2 min @200W 30s @350W
  60s @ 120W "easy recovery"
  
10 min @ 0.75 "cooldown"`
    );
    const expected = [
      Interval(600, PercentFTP(0.75), 'warmup'),
      Set(5, [
        Interval(30, Power(400), 'max effort'),
        Interval(30, PercentFTP(0.5), 'easy spin'),
      ]),
      Interval(300, PercentFTP(0.7)),
      Set(2, [
        Interval(600, Power(280), 'steady'),
        Interval(120, Power(200)),
        Interval(30, Power(350)),
        Interval(60, Power(120), 'easy recovery'),
      ]),
      Interval(600, PercentFTP(0.75), 'cooldown'),
    ];
    assert.deepStrictEqual(actual, expected);
  });
});
