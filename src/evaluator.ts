import { Order } from "./orders";

export class Evaluator {
    constructor(
        private stack: Stack,
        private inputFn: () => number | Promise<number>,
        private outputFn: (v: number) => void | Promise<void>,
    ) {}
    async evaluate(code: Order[]) {
        let index = 0;
        const braces = [];
        while (index < code.length) {
            switch (code[index]) {
                case Order.Decrement:
                    this.stack.value--;
                    break;
                case Order.Increment:
                    this.stack.value++;
                    break;
                case Order.Input:
                    this.stack.value = await this.inputFn();
                    break;
                case Order.JumpNext:
                    if (this.stack.value === 0) {
                        while (
                            code[index] !== Order.JumpPrev &&
                            index < code.length
                        ) {
                            index++;
                        }
                        if (index === code.length) {
                            throw JumpPrevNotFoundError;
                        }
                    } else {
                        braces.push(index);
                    }
                    break;
                case Order.JumpPrev:
                    if (this.stack.value !== 0) {
                        if (braces.length > 0) {
                            const brace = braces.pop();
                            if (brace === undefined) {
                                throw JumpPrevNotFoundError;
                            }
                            index = brace - 1;
                        } else {
                            index++;
                        }
                    }
                    break;
                case Order.Next:
                    this.stack.next();
                    break;
                case Order.Output:
                    await this.outputFn(this.stack.value);
                    break;
                case Order.Prev:
                    this.stack.prev();
                    break;
            }
            index++;
        }
    }
    static default() {
        async function input() {
            const value: string = await new Promise((resolve) =>
                process.stdin.once("data", (data) => {
                    return resolve(data.toString());
                }),
            );
            if (value === null) {
                return 0;
            }
            return parseInt(value);
        }
        function output(value: number) {
            console.log(value);
        }
        return new Evaluator(new NumberStack(), input, output);
    }
}

export class EvaluatorError extends Error {
    constructor(message: string) {
        super(message);
    }
}

export const StackPositionUnderZeroError = new EvaluatorError(
    "Stack position under zero",
);
export const JumpPrevNotFoundError = new EvaluatorError("JumpPrev not found");

export abstract class Stack {
    abstract next(): number;
    abstract prev(): number;
    abstract current(): number;
    abstract get value(): number;
    abstract set value(value: number);
}

export class NumberStack implements Stack {
    private stack: number[] = [0];
    private position: number = 0;
    constructor() {}
    next() {
        this.position++;
        if (this.stack.length <= this.position) {
            this.stack.push(0);
        }
        return this.position;
    }
    prev() {
        if (this.position <= 0) {
            throw StackPositionUnderZeroError;
        }
        this.position--;
        return this.position;
    }
    current() {
        return this.position;
    }
    get value() {
        return this.stack[this.position];
    }
    set value(value: number) {
        this.stack[this.position] = value;
    }
}
