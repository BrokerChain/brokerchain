// initialized by dev/system

import * as React from "react";
import { clsx } from "../../../../myutils/common/clsx.js";
import { Root } from "./index.js";
import { value_fun, ValueIO, log } from "../export.local.js";
import { Attribute } from "../../export.page.js";

export function render(self: Root): React.ReactNode {
    // const { value, io } = self.props.vio;
    const { vio, className, list, children, ...props } = self.props;

    return (
        <div className={clsx("px-4 space-y-2", className)} {...props}>
            {(list || [])
                .filter((item) => (item.hide ? false : true))
                .map((item, i) => (
                    <Attribute
                        key={i}
                        name={item.name}
                        value={item.value}
                        // className={i === list.length - 1 ? "border-b-0" : ""}
                    />
                ))}
        </div>
    );
}
