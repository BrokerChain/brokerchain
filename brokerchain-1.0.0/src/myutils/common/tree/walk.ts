interface TreeNode {
    children: TreeNode[];
}
export function walk_tree<T extends TreeNode>(root: T, cb: (item: T) => void) {
    if (root.children && root.children.length) {
        for (let item of root.children) {
            cb(item as T);
            walk_tree(item, cb);
        }
    }
}
