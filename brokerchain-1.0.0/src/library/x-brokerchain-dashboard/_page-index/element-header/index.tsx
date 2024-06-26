// auto generated by dev/system

import * as React from "react";
import { render } from "./render.js";
import { HeaderProps, HeaderState, init_state } from "./type.js";
import { did_mount } from "./lifecycle/did_mount.js";
import { will_unmount } from "./lifecycle/will_unmount.js";
import { Extend } from "./extend.js";

export class Header extends React.PureComponent<HeaderProps, HeaderState> {
    extend: Extend;

    constructor(props: HeaderProps) {
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
