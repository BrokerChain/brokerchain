export interface TextFile {
    id?: string;
    name: string;
    content: string;
    do_not_override?: boolean; // default false
}
