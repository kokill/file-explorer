
export const isMatch = (str1: string, str2: string) => {
  return str1.toLowerCase().includes(str2.toLowerCase());
};

export const searchTree = (text: string, tree: any, nodeKey: string) => {
  const newKey = nodeKey ? nodeKey + '-' + tree.name : tree.name!;
  if (isMatch(tree.name, text)) {
    return newKey;
  }
  const result = tree.data?.map((item: any) => searchTree(text, item, newKey));
  const filteredResult = result?.filter((item: any) => !!item?.length);
  return filteredResult?.flat();
};