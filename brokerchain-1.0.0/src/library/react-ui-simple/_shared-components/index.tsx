// initialized by dev/system

import * as React from "react";
import { clsx } from "../../../myutils/common/clsx.js";
import {
    CaretDownOutlined,
    CaretRightOutlined,
    CaretLeftOutlined,
    RightOutlined,
    DownOutlined,
    RightCircleOutlined,
    DownCircleOutlined
} from "@ant-design/icons";
import { ButtonRootWrapper } from "../_page-button/export.js";
import { AttributeRootWrapper } from "../_page-attribute/export.js";
import { AttributeListRootWrapper } from "../_page-attribute-list/export.js";
import { LabelRootWrapper } from "../_page-label/export.js";
import { LeftRightRootWrapper } from "../_page-left-right/export.js";
import { PageRootWrapper } from "../_page-page/export.js";
import { PanelRootWrapper } from "../_page-panel/export.js";
import { SelectRootWrapper } from "../_page-select/export.js";
import { RawInputRootWrapper } from "../_page-raw-input/export.js";
import { InputRootWrapper } from "../_page-input/export.js";
import { InputDateRootWrapper } from "../_page-input-date/export.js";
import { InputNumberRootWrapper } from "../_page-input-number/export.js";
import { InputPhoneRootWrapper } from "../_page-input-phone/export.js";

// ⚠️警告
// 如果要修改这个页面里，border 的宽度，请搜索 @DESIGN-FIX-BORDER 关键词
// 找到所有相关的位置，同步进行修改，否则最终的视觉会有偏差
// 目前 border 的宽度是 border-2 也就是 2px 的宽度

// export const Page = PageRootWrapper;
// export const Panel = PanelRootWrapper;
// export const Button = ButtonRootWrapper;
// export const Attribute = AttributeRootWrapper;
// export const AttributeList = AttributeListRootWrapper;
// export const Label = LabelRootWrapper;
// export const LeftRight = LeftRightRootWrapper;
// export const Select = SelectRootWrapper;
// export const RawInput = RawInputRootWrapper;
// export const Input = InputRootWrapper;
// export const InputDate = InputDateRootWrapper;
// export const InputNumber = InputNumberRootWrapper;
// export const InputPhone = InputPhoneRootWrapper;
