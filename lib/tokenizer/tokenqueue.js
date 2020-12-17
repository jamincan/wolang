import { UnexpectedEOFError, UnexpectedTokenError } from '../errors';

/** Manages the incoming stream of tokens from the tokenizer */
export default class TokenQueue {
  /**
   * Create a new TokenQueue
   * @param {Tokenizer} tokenizer - an initialized Tokenizer instance
   */
  constructor(tokenizer) {
    this.tokenizer = tokenizer;
    this.queue = []; // Queue of tokens from the tokenizer (FIFO)
    this.tests = []; // Stack of indices marking test starts (LIFO)
    this.index = 0; // Index of the next token
  }

  /** @returns {number} - the number of tokens in the queue */
  get count() {
    return this.queue.length - this.index;
  }

  /**
   * Look at the next tokens in the queue without consuming them. The TokenQueue will fetch
   * additional tokens from the Tokenizer as needed.
   * @param {number} [amount] - the number of tokens to return.
   * @returns {Token|Token[]} - the token, or array of tokens.
   */
  peek(amount = 1) {
    if (amount < 1)
      throw new RangeError(`Invalid amount: ${amount}. Amount must be greater than 1.`);

    // Fetch tokens from the tokenizer until the queue has enough to return
    while (amount - this.count > 0) this.queue.push(this.tokenizer.next());

    // If the amount is 1, return the token directly, otherwise send a slice of the queue containing the requested tokens
    return amount === 1
      ? this.queue[this.index]
      : this.queue.slice(this.index, this.index + amount);
  }

  /**
   * Consumes the next token in the queue. If a tokenType is provided, an error
   * will be thrown if the next token is not a match.
   * @param {...string} tokenType - the type of the token to match
   * @returns {Token} - the next token in the queue
   */
  eat(...tokenType) {
    // Fetch the next token and do error checking on it
    const next = this.peek();
    if (next == null) throw new UnexpectedEOFError(tokenType);
    if (!tokenType.includes(next.type))
      throw new UnexpectedTokenError(next, tokenType.join('/'));

    // If there are any tests in the stack, simply advance the index to point to the next token
    if (this.tests.length > 0) this.index += 1;
    // Otherwise, remove the first token in the queue
    else this.queue.shift();

    return next;
  }

  /**
   * Start a test. When the provided function is executed, any tokens returned by eat will be
   * preserved. If execution is successful, the tokens will be consumed as normal and the result
   * from the function returned. However, if the test catches any SyntaxErrors during execution,
   * the tokens will be restored to the queue and null will be returned.
   * @param {function} func - the testing function
   * @returns {*|null} - the result from the testing function, or null
   */
  test(func) {
    // Save the current index in the testing stack
    this.tests.push(this.index);

    // Try running the test function
    let result;
    try {
      result = func();
    } catch (err) {
      // If it throws a SyntaxError, reset the queue index to the one saved at the start of the test and return null
      if (err instanceof SyntaxError) {
        this.index = this.tests.pop();
        return null;
      }
      // Rethrow any other error
      throw err;
    }

    // Function succeeded, so delete the tokens in the queue ahead of the current index and then return the result
    this.queue.splice(0, this.index); // Remove tokens saved in the queue
    return result;
  }
}
