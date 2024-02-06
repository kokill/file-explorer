import React from "react";
import { tree_data } from './treedata';
import FileIcon from '../file.svg';
import './style.css';
import FolderOpenIcon from '../folder_open.svg';
import FolderCloseIcon from '../folder_close.svg';

type NodeType = {
  type: "file" | "folder";
  name: string;
  meta: string;
};

type Tree = {
  type: string | "file" | "folder";
  name?: string;
  data?: Array<any>;
};



const getIcon = (type: string, expanded: boolean) => {
  if (type === 'file') {
    return FileIcon;
  } else if (type === 'folder' && expanded) {
    return FolderOpenIcon;
  }
  return FolderCloseIcon;
}
const RenderNode = ({
  title,
  nodeKey,
  children,
  type,
  expanded = false,
  activeItem,
  handleClick,
}: {
  type: string,
  title: string,
  nodeKey: string,
  expanded?: boolean,
  handleClick: (key: string) => void;
  activeItem: string,
  children?: React.ReactNode
}) => {
  const isFile = type === 'file';
  return (
    <div onClick={(ev) => {
      ev.stopPropagation();
      handleClick(nodeKey);
    }} style={{ borderLeft: isFile ? '1px solid gray' : 'none' }}>
      <span className="node-title" style={{ background: activeItem === nodeKey ? 'lightblue' : 'white', }}>
        <img alt={type} src={getIcon(type, expanded)} />
        {title}</span>
      {type === 'folder' && <div style={{ marginLeft: '10px' }}>{children}</div>}
  </div>)
};

const getTreeData = ({ tree, nodeKey, handleClick, treeState, activeItem }: { tree: Tree, nodeKey: string, handleClick: any, activeItem: string, treeState: Record<string, boolean> }) => {
  if (tree.type === 'file') {
    <RenderNode title={tree.name!} nodeKey={nodeKey + ':' + tree.name} type={tree.type} handleClick={handleClick} activeItem={activeItem} />
  };
  return (
    <RenderNode title={tree.name!} nodeKey={nodeKey + ':' + tree.name} type={tree.type} handleClick={handleClick} expanded={treeState[nodeKey]} activeItem={activeItem} >
      {treeState[nodeKey + ':' + tree.name] && tree?.data?.map((item) => getTreeData({ tree: item, nodeKey: nodeKey + ':' + tree.name, handleClick, treeState, activeItem }))}
    </RenderNode>
  )
}

const FileExplorer: React.FC = () => {
  const [treeState, setTreeState] = React.useState<Record<string, boolean>>({});
  const [activeItem, setActiveItem] = React.useState<string>('');

  const handleClick = (nodeKey: string) => {
    setActiveItem(nodeKey);
    setTreeState(prev => ({ ...treeState, [nodeKey]: !prev[nodeKey] }));
  };
  console.log(treeState);
  return (
    <div className="FileExplorer">
      <h2>File Explorer</h2>
      {getTreeData({ tree: tree_data, nodeKey: '', handleClick, treeState, activeItem })}
    </div>
  )
};
export default FileExplorer;