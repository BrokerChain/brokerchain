// initialized by dev/system

import * as React from "react";
import { clsx } from "../../../../myutils/common/clsx.js";
import { Root } from "./index.js";
import { value_fun, ValueIO, log } from "../export.local.js";
import { PhoneValue } from "./type.js";
import { Label, RawInput } from "../../export.page.js";

export function render(self: Root): React.ReactNode {
    // const { value, io } = self.props.vio;
    const { vio, ...props } = self.props;

    const disabled = props.disabled;
    const value = props.value || { country_code: "", phone_number: "" };
    const onChange =
        props.onChange ||
        ((v: PhoneValue) => {
            // ignore
        });

    return (
        <div>
            {props.children && <Label>{props.children}</Label>}
            <div
                className="gap-2"
                style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 2fr"
                }}
            >
                <RawInput
                    // placeholder={props.placeholder}
                    disabled={props.disabled}
                    value={value.country_code}
                    onChange={(e) => {
                        onChange({
                            country_code: e.target.value,
                            phone_number: value.phone_number
                        });
                    }}
                />
                <RawInput
                    placeholder={props.placeholder}
                    disabled={props.disabled}
                    value={value.phone_number}
                    onChange={(e) => {
                        onChange({
                            country_code: value.country_code,
                            phone_number: e.target.value
                        });
                    }}
                />
            </div>
        </div>
    );
}
