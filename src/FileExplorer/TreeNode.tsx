import React from 'react';
import FileIcon from '../file.svg';
import './style.css';
import FolderOpenIcon from '../folder_open.svg';
import FolderCloseIcon from '../folder_close.svg';


const getIcon = (type: string, expanded: boolean) => {
  if (type === 'file') {
    return FileIcon;
  } else if (type === 'folder' && expanded) {
    return FolderOpenIcon;
  }
  return FolderCloseIcon;
}

const TreeNode = ({
  title,
  nodeKey,
  children,
  type,
  expanded = false,
  activeItem,
  handleClick,
  handleRightClick,
}: {
  type: string,
  title: string,
  nodeKey: string,
  expanded?: boolean,
  handleRightClick: (ev: React.MouseEvent<HTMLElement>, key: string) => void;
  handleClick: (key: string) => void;
  activeItem: string,
  children?: React.ReactNode
}) => {
  const isFile = type === 'file';
  return (
    <div onClick={(ev) => {
      ev.stopPropagation();
      handleClick(nodeKey);
    }}
    onContextMenu={(ev) => {
      ev.stopPropagation();
      ev.preventDefault();
      handleRightClick(ev, nodeKey)
    }}
    style={{ borderLeft: isFile ? '1px solid gray' : 'none' }}>
      <span className="node-title" style={{ background: activeItem === nodeKey ? 'lightblue' : 'white', }}>
        <img alt={type} src={getIcon(type, expanded)} />
        {title}</span>
      {type === 'folder' && <div style={{ marginLeft: '10px' }}>{children}</div>}
  </div>)
};


export default TreeNode;