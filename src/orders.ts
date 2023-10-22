export interface Orders {
    increment: string;
    decrement: string;
    next: string;
    prev: string;
    output: string;
    input: string;
    jumpnext: string;
    jumpprev: string;
}

export const defaultOrders: Orders = {
    increment: "+",
    decrement: "-",
    next: ">",
    prev: "<",
    output: ".",
    input: ",",
    jumpnext: "[",
    jumpprev: "]",
};

export function mergeOrders(orders: Partial<Orders> = {}): Orders {
    return Object.assign({}, defaultOrders, orders);
}

export const enum Order {
    Increment,
    Decrement,
    Next,
    Prev,
    Output,
    Input,
    JumpNext,
    JumpPrev,
}
