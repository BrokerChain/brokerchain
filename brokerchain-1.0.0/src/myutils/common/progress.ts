export interface ProgressReporter {
    onProgress: (info: { current: number; total: number; percent: number }) => void;
}
export type ProgressReporterCallback = (reporter: ProgressReporter) => void;
export function MakeProgressReporter(cb: ProgressReporterCallback) {
    let reporter: ProgressReporter = {
        onProgress: () => {}
    };
    cb(reporter);
    return {
        reportProgress: (info: { current: number; total: number }) => {
            const { current, total } = info;
            const percent = current / total;
            reporter.onProgress({
                current,
                total,
                percent
            });
        }
    };
}
