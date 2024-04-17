// auto generated by dev/system

import * as React from "react";
import { render } from "./render.js";
import { FooterProps, FooterState, init_state } from "./type.js";
import { did_mount } from "./lifecycle/did_mount.js";
import { will_unmount } from "./lifecycle/will_unmount.js";
import { Extend } from "./extend.js";

export class Footer extends React.PureComponent<FooterProps, FooterState> {
    extend: Extend;

    constructor(props: FooterProps) {
        super(props);
        this.state = init_state();
        this.extend = new Extend(this);
    }

    componentDidMount() {
        did_mount(this);
    }

    componentWillUnmount() {
        will_unmount(this);
    }

    render() {
        return render(this);
    }
}
