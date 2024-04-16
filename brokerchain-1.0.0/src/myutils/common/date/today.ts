function today(hours_offset: number) {
    const now = new Date();
    return new Date(
        Date.UTC(
            now.getFullYear(),
            now.getMonth(),
            now.getDate(),
            hours_offset, // IMPORTANT
            0,
            0,
            0
        )
    );
}

export function today_beijing() {
    return today(-8);
}
