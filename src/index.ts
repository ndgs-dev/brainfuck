export * from "./orders";
export * from "./assembler";
export * from "./evaluator";

import { Evaluator } from "./evaluator";
import { Assembler } from "./assembler";

export function run(code: string) {
    const assembler = Assembler.default();
    const evaluator = Evaluator.default();
    const orders = assembler.assemble(code);
    evaluator.evaluate(orders);
}
