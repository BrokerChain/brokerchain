// initialized by dev/system

import * as React from "react";
import {
    CaretDownOutlined,
    // CaretRightOutlined,
    CaretLeftOutlined
    // RightOutlined,
    // DownOutlined,
    // RightCircleOutlined,
    // DownCircleOutlined
} from "@ant-design/icons";
import { clsx } from "../../../../myutils/common/clsx.js";
import { Root } from "./index.js";
import { value_fun, ValueIO, log } from "../export.local.js";
// import {  } from "../../export.page.js";

export function render(self: Root): React.ReactNode {
    const { value, io } = self.props.vio;
    const collapse = value.get("collapse");
    console.log("collapse", collapse);

    const { vio, className, header, footer, headerClassName, bodyClassName, footerClassName, hideFooterIfCollapsed, children, ...props } = self.props;

    let hideFooter = footer ? false : true;
    if (collapse && hideFooterIfCollapsed) {
        hideFooter = true;
    }

    return (
        <div className={clsx("border-2 border-black bg-white rounded drop-shadow-lg w-[480px]", className)} {...props}>
            {header && (
                <div
                    className={clsx("bg-black text-white px-4 py-2 cursor-pointer", headerClassName)}
                    style={{
                        // @DESIGN-FIX-BORDER
                        // py-2 是上下留 8px 但是，由于外层 border 上方有 2px
                        // 导致整体的高度实际上，总共变高了 2px
                        // 这个问题用 box-sizing 解决不了，只能手工修正上下 padding
                        paddingTop: 8 - 1,
                        paddingBottom: 8 - 1
                    }}
                    onClick={() => {
                        io.update((v) => v.set("collapse", !collapse));
                    }}
                >
                    <div className="flex flex-row gap-4 items-center justify-between">
                        <div>{header}</div>
                        <div className="size-6 flex justify-end items-center">{collapse ? <CaretLeftOutlined /> : <CaretDownOutlined />}</div>
                    </div>
                    {/* <div className="flex flex-row items-center">
                        <div className="size-6 flex justify-center items-center" style={{ marginLeft: -12 }}>
                            {collapse ? <CaretRightOutlined /> : <CaretDownOutlined />}
                        </div>
                        <div>{header}</div>
                    </div> */}
                </div>
            )}
            {!collapse && <div className={clsx("px-4 py-8", bodyClassName)}>{children}</div>}
            {!hideFooter && <div className={clsx("border-t-2 border-black px-4 py-8", footerClassName)}>{footer}</div>}
        </div>
    );
}
