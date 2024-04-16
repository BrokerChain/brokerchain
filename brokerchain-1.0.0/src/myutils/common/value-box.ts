export class ValueBox<Value> {
    private value: Value;
    private on_change: (v: Value) => void;
    constructor(value: Value, on_change: (v: Value) => void) {
        this.value = value; // init value
        this.on_change = on_change;
    }
    get_value(): Value {
        return this.value;
    }
    set_value(v: Value) {
        this.value = v;
        this.on_change(v); // notify
    }
}
