// auto generated by dev/system

import * as React from "react";
import { RootProps } from "./type.js";
import { Root } from "./index.js";
import { Value, ValueIO } from "../type/index.js";
import { empty } from "../value/index.js";

interface Props extends Omit<RootProps, "vio"> {
    init?: (value: Value) => Value;
}

interface State {
    value: Value;
}

export class RootWrapper extends React.Component<Props, State> {
    latest_value: Value;
    io: ValueIO;

    constructor(props: Props) {
        super(props);
        this.latest_value = props.init ? props.init(empty()) : empty();
        this.state = {
            value: this.latest_value
        };
        this.io = new ValueIO({
            read: () => {
                return this.latest_value;
            },
            write: (v, silent) => {
                this.latest_value = v;
                if (!silent) {
                    this.setState({
                        value: v
                    });
                }
                // console.log(`AttributeRootWrapper.io.write()`, JSON.stringify(v.toJS(), null, 4));
            }
        });
    }

    render() {
        // console.log(`AttributeRootWrapper.render()`);
        return <Root {...this.props} vio={{ value: this.state.value, io: this.io }} />;
    }
}
