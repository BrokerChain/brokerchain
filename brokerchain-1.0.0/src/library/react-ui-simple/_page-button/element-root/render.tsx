// initialized by dev/system

import * as React from "react";
import { Button } from "@headlessui/react";
import { Root } from "./index.js";
import { value_fun, ValueIO, log } from "../export.local.js";
import { clsx } from "../../../../myutils/common/clsx.js";
// import {  } from "../../export.page.js";

export function render(self: Root): React.ReactNode {
    const { value, io } = self.props.vio;
    const { children } = self.props;

    return (
        <Button
            className={clsx(
                [
                    self.props.disabled ? "bg-gray-200 text-white" : "bg-black text-white",
                    "px-4 py-2 rounded cursor-pointer flex justify-center items-center w-full",
                    "no-select"
                ].join(" "),
                self.props.className
            )}
            style={{ minWidth: 160 }}
            disabled={self.props.disabled}
            onClick={self.props.onClick}
        >
            {children}
        </Button>
    );
}
