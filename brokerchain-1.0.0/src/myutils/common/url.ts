export function proxy_url(url: string) {
    return `/vcool/proxy-raw?url=${encodeURIComponent(url)}`;
}
export function youtube_download_url(url: string, proxy = false) {
    return `/web-article/youtube-video?url=${encodeURIComponent(url)}&proxy=${proxy}`;
}
