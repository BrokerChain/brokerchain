export type ReasonType =
    // initial state
    | "none"
    // common reasons
    | "invalid-format"
    | "empty";
// more specific reasons
// | "invalid-email"
// | "invalid-tel"
// | "invalid-name"
// | "invalid-first-name"
// | "invalid-middle-name"
// | "invalid-last-name"
// | "invalid-age"
// | "invalid-birthday"
// | "invalid-gender";
export class Why {
    _reason: ReasonType = "none";
    _explain: string = "";
    reason(v: ReasonType) {
        this._reason = v;
        return {
            explain: (text: any) => {
                this._explain = text;
            }
        };
    }
    // TODO
    // display user readable text
    // consider locale
    display() {
        let text = "";
        switch (this._reason) {
            case "none":
                text = "";
                break;
            case "invalid-format":
                text = "\u683C\u5F0F\u6709\u8BEF";
                break;
            case "empty":
                text = "\u8BF7\u586B\u5199";
                break;
            default:
                debugger;
                text = this._explain || this._reason;
        }
        return text;
    }
}
