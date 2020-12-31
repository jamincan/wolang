import assert from 'assert';
import Token from '../src/tokenizer/token';
import Tokenizer from '../src/tokenizer/tokenizer';
import TokenQueue from '../src/tokenizer/tokenqueue';

let tokenizer = new Tokenizer();
let queue = new TokenQueue(tokenizer);

describe('TokenQueue', function () {
  beforeEach('Initialize Tokenizer and TokenQueue', function () {
    tokenizer.init('1x 2min @ 350W, 4min @ 290W, 6min @ 250W');
    queue.reset();
  });

  it('TokenQueue throws error if not created with a Tokenizer', function () {
    assert.throws(() => new TokenQueue());
  });

  describe('peek()', function () {
    it('peek(1) returns a Token', function () {
      assert(queue.peek() instanceof Token);
    });

    it('peek(n>2) returns the number of requested tokens.', function () {
      [2, 3, 4, 10, 20].forEach((n) => {
        const tokens = queue.peek(n);
        // Count the number of tokens returned
        assert.strictEqual(tokens.length, n);
        // Make sure all values are either instances of Token, or null
        assert(tokens.every((token) => !token || token instanceof Token));
      });
    });

    it('peek does not alter the queue', function () {
      assert.strictEqual(queue.peek(), queue.peek());
    });
  });

  describe('eat()', function () {
    it('removes the next token', function () {
      assert.notStrictEqual(queue.eat('INT'), queue.peek());
    });

    it("throws error if it's the wrong type", function () {
      assert.throws(() => queue.eat('INDENT'));
    });
    it('accepts multiple types', function () {
      assert.strictEqual(queue.eat('INT', 'FLOAT').type, 'INT');
    });
  });

  describe('optional()', function () {
    it('removes the next token for matching tokens', function () {
      assert.notStrictEqual(queue.optional('INT'), queue.peek());
    });
    it("returns null if it's the wrong type", function () {
      assert.strictEqual(queue.optional('FLOAT'), null);
    });
    it("doesn't eat token if there is no match", function () {
      queue.optional('FLOAT');
      assert.strictEqual(queue.peek().type, 'INT');
    });
    it('accepts multiple types', function () {
      assert.strictEqual(queue.optional('INT', 'FLOAT').type, 'INT');
    });
  });

  describe('test()', function () {
    it('will continue to eat tokens if success', function () {
      assert.strictEqual(queue.test(() => queue.eat('INT')).type, 'INT');
    });
    it('restores tokens to the last position if it fails', function () {
      queue.eat('INT');
      queue.eat('REPEAT');
      queue.test(() => queue.eat('FLOAT')); // This fails
      assert.deepStrictEqual(queue.peek(), new Token('INT', '2', 0, 3));
    });
    it('removes tokens if the test succeeds', function () {
      queue.eat('INT');
      queue.test(() => queue.eat('REPEAT')); // This succeeds
      assert.deepStrictEqual(queue.peek(), new Token('INT', '2', 0, 3));
    });
    it('works when nested', function () {
      queue.eat('INT');
      queue.test(() => {
        queue.eat('REPEAT');
        // If the nested test fails, throw a SyntaxError to indicate this test fails
        if (!queue.test(() => queue.eat('FLOAT'))) throw new SyntaxError();
      });
      // Even though the REPEAT was successful in the test, the rest wasn't, so the repeat should be restored
      assert.strictEqual(queue.peek().type, 'REPEAT');
    });
  });
});
