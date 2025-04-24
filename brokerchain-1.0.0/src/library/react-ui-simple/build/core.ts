import { Logger } from "../../../myutils/logger.js";
import { Input, Output, Callback } from "./type.js";
import { build_page_index } from "../build-page-index/export.js";
import { build_page_button } from "../build-page-button/export.js";
import { build_page_attribute } from "../build-page-attribute/export.js";
import { build_page_attribute_list } from "../build-page-attribute-list/export.js";
import { build_page_label } from "../build-page-label/export.js";
import { build_page_left_right } from "../build-page-left-right/export.js";
import { build_page_panel } from "../build-page-panel/export.js";
import { build_page_page } from "../build-page-page/export.js";
import { build_page_raw_input } from "../build-page-raw-input/export.js";
import { build_page_input } from "../build-page-input/export.js";
import { build_page_input_date } from "../build-page-input-date/export.js";
import { build_page_input_number } from "../build-page-input-number/export.js";
import { build_page_input_phone } from "../build-page-input-phone/export.js";
import { build_page_raw_textarea } from "../build-page-raw-textarea/export.js";
import { build_page_textarea } from "../build-page-textarea/export.js";
import { build_page_select } from "../build-page-select/export.js";

import { classic } from "../../../myutils/node/classic.js";
import * as path from "node:path";

export async function core<R>(log: Logger, input: Input, cb: Callback<R>): Promise<R> {
    await build_page_index(
        log,
        {
            empty_out_dir: false // important
        },
        {
            ok: () => {
                // ignore
            },
            fail: (err) => {
                throw err;
            }
        }
    );

    await build_page_button(
        log,
        {
            empty_out_dir: false // important
        },
        {
            ok: () => {
                // ignore
            },
            fail: (err) => {
                throw err;
            }
        }
    );

    await build_page_attribute(
        log,
        {
            empty_out_dir: false // important
        },
        {
            ok: () => {
                // ignore
            },
            fail: (err) => {
                throw err;
            }
        }
    );

    await build_page_attribute_list(
        log,
        {
            empty_out_dir: false // important
        },
        {
            ok: () => {
                // ignore
            },
            fail: (err) => {
                throw err;
            }
        }
    );

    await build_page_label(
        log,
        {
            empty_out_dir: false // important
        },
        {
            ok: () => {
                // ignore
            },
            fail: (err) => {
                throw err;
            }
        }
    );

    await build_page_left_right(
        log,
        {
            empty_out_dir: false // important
        },
        {
            ok: () => {
                // ignore
            },
            fail: (err) => {
                throw err;
            }
        }
    );

    await build_page_panel(
        log,
        {
            empty_out_dir: false // important
        },
        {
            ok: () => {
                // ignore
            },
            fail: (err) => {
                throw err;
            }
        }
    );

    await build_page_page(
        log,
        {
            empty_out_dir: false // important
        },
        {
            ok: () => {
                // ignore
            },
            fail: (err) => {
                throw err;
            }
        }
    );

    await build_page_raw_input(
        log,
        {
            empty_out_dir: false // important
        },
        {
            ok: () => {
                // ignore
            },
            fail: (err) => {
                throw err;
            }
        }
    );

    await build_page_input(
        log,
        {
            empty_out_dir: false // important
        },
        {
            ok: () => {
                // ignore
            },
            fail: (err) => {
                throw err;
            }
        }
    );

    await build_page_input_date(
        log,
        {
            empty_out_dir: false // important
        },
        {
            ok: () => {
                // ignore
            },
            fail: (err) => {
                throw err;
            }
        }
    );

    await build_page_input_number(
        log,
        {
            empty_out_dir: false // important
        },
        {
            ok: () => {
                // ignore
            },
            fail: (err) => {
                throw err;
            }
        }
    );

    await build_page_input_phone(
        log,
        {
            empty_out_dir: false // important
        },
        {
            ok: () => {
                // ignore
            },
            fail: (err) => {
                throw err;
            }
        }
    );

    await build_page_raw_textarea(
        log,
        {
            empty_out_dir: false // important
        },
        {
            ok: () => {
                // ignore
            },
            fail: (err) => {
                throw err;
            }
        }
    );

    await build_page_textarea(
        log,
        {
            empty_out_dir: false // important
        },
        {
            ok: () => {
                // ignore
            },
            fail: (err) => {
                throw err;
            }
        }
    );

    await build_page_select(
        log,
        {
            empty_out_dir: false // important
        },
        {
            ok: () => {
                // ignore
            },
            fail: (err) => {
                throw err;
            }
        }
    );

    const { __dirname } = classic(import.meta.url);
    const webroot = path.resolve(__dirname, "../_webroot");
    log.variable("webroot", webroot);

    return cb.ok({
        webroot
    });
}
