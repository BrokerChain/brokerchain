// auto generated by dev/system

import * as React from "react";
import { render } from "./render.js";
import { ContentProps, ContentState, init_state } from "./type.js";
import { did_mount } from "./lifecycle/did_mount.js";
import { will_unmount } from "./lifecycle/will_unmount.js";
import { Extend } from "./extend.js";

export class Content extends React.PureComponent<ContentProps, ContentState> {
    extend: Extend;

    constructor(props: ContentProps) {
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
