export function viewport(designWidth = 750) {
    let scale = screen.width / designWidth;
    let vp = document.createElement("meta");
    vp.setAttribute("name", "viewport");
    vp.setAttribute(
        "content",
        [
            ["width", designWidth],
            ["initial-scale", scale],
            ["maximum-scale", scale],
            ["minimum-scale", scale],
            ["user-scalable", "no"]
        ]
            .map((v) => v[0] + "=" + v[1])
            .join(",")
    );
    document.head.appendChild(vp);
}
