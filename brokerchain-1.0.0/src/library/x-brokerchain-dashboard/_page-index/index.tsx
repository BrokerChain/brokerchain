// auto generated by dev/system
import * as React from "react";
import { createRoot } from "react-dom/client";
import { Root } from "./element-root/index.js";
import { Value, ValueIO } from "./type/index.js";
import { empty } from "./value/index.js";

import "../_global/index.js";

class PageContainer extends React.Component<{}, { value: Value }> {
    latest_value: Value;
    io: ValueIO;

    constructor(props: {}) {
        super(props);
        this.latest_value = empty();
        this.state = {
            value: this.latest_value
        };
        this.io = new ValueIO(
            () => {
                return this.latest_value;
            },
            (v, silent) => {
                this.latest_value = v;
                if (!silent) {
                    this.setState({
                        value: v
                    });
                }
            }
        );
    }

    render() {
        return <Root value={this.state.value} io={this.io} />;
    }
}

createRoot(document.getElementById("root")).render(<PageContainer />);
