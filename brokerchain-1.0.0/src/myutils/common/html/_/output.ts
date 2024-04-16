export class Output {
    _html: string = "";
    _stylesheet: string = "";
    _code: string = "";
    html(v: string) {
        this._html = v;
        return this;
    }
    stylesheet(v: string) {
        this._stylesheet = v;
        return this;
    }
    code(v: string) {
        this._code = v;
        return this;
    }
}
