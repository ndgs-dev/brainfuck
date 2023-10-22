import { type Orders, mergeOrders, Order } from "./orders";

export class Assembler {
    private orders: Orders;
    constructor(orders: Partial<Orders> = {}) {
        this.orders = mergeOrders(orders);
    }
    assemble(code: string): Order[] {
        const orders = code.split("").map((char) => {
            switch (char) {
                case this.orders.decrement:
                    return Order.Decrement;
                case this.orders.increment:
                    return Order.Increment;
                case this.orders.input:
                    return Order.Input;
                case this.orders.jumpnext:
                    return Order.JumpNext;
                case this.orders.jumpprev:
                    return Order.JumpPrev;
                case this.orders.next:
                    return Order.Next;
                case this.orders.output:
                    return Order.Output;
                case this.orders.prev:
                    return Order.Prev;
                default:
                    return null;
            }
        });
        return orders.filter((char) => char !== null) as Order[];
    }
    static default() {
        return new Assembler();
    }
}
