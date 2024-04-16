let rate = 1;
export function set_rpx_base(design_width: number = 750) {
    rate = document.body.offsetWidth / design_width;
}
export function rpx_v(v: number) {
    return v * rate;
}
export function rpx(v: number): string {
    return `${rpx_v(v)}px`;
}
