// import { tree_data } from "./treedata";

export const searchTree = (text: string, tree: any) => {
  if (tree.name.toLowerCase().includes(text.toLowerCase())) {
    return tree;
  }
  const result = tree.data?.map((item: any) => searchTree(text, item));
  console.log("RR", result);
};