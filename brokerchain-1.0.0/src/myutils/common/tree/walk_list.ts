import { walk_tree } from "./walk.js";
interface TreeNode {
    children: TreeNode[];
}
export function walk_tree_list<T extends TreeNode>(roots: T[], cb: (item: T) => void) {
    roots.forEach((root) => {
        walk_tree(root, cb);
    });
}
