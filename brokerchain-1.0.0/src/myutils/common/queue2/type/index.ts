export interface Queue {
    working: Task | null;
    pending: Task[];
}
export interface Task {
    id: string;
    handle: Handle;
}
export type Handle = (task: Task) => Promise<void>;
