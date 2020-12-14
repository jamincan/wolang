class TokenQueue {
    constructor(tokenizer) {
        this.tokenizer = tokenizer;
        this.queue = [];
        this.tests = [];
        this.index = 0;
    }

    get size() {
        return this.queue.length - this.index;
    }

    peek(count = null) {
        const single = Boolean(count);
        count = count || 1;
        while (count - this.size > 0) this.queue.push(this.tokenizer.next());
        return single ? this.queue[index] : this.queue.slice(this.index, this.index + count);
    }

    eat(tokenType) {
        const next = this.peek();
        if (next == null) throw new SyntaxError;
        if (next.type !== tokenType) throw new SyntaxError;

        if (this.tests.length > 0) this.index += 1;
        else this.queue.shift();
        return next;
    }

    test(func) {
        this.tests.push(this.index);
        try {
            const result = func();
            this.queue.splice(0, this.index); // Remove tokens saved in the queue
            return result;
        } catch (err) {
            if (err instanceof SyntaxError) {
                this.index = this.tests.pop();
                return null;
            }
            throw err;
        }
    }
}