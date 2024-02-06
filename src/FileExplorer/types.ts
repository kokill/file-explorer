export enum FileType {
  FILE = "file",
  FOLDER = "folder",
};

export type Tree = {
  type: FileType;
  name?: string;
  meta?: string;
  data?: Array<Tree>;
};

export type TreeState = Record<string, boolean>;

export type TreeData = {
  tree: Tree;
  nodeKey: string;
  activeItem: string;
  treeState: TreeState;
  handleClick: (key: string) => void;
  handleRightClick: (ev: React.MouseEvent<HTMLElement>, key: string) => void;
};

export type TreeNodeType = {
  type: FileType;
  title: string;
  nodeKey: string;
  expanded?: boolean;
  activeItem: string;
  children?: React.ReactNode;
  handleRightClick: (ev: React.MouseEvent<HTMLElement>, key: string) => void;
  handleClick: (key: string) => void;
};