import React from 'react';
import FileIcon from '../file.svg';
import './style.css';
import { isMatch } from './util';
import { TreeNodeType, FileType } from './types';
import FolderOpenIcon from '../folder_open.svg';
import FolderCloseIcon from '../folder_close.svg';

const getIcon = (type: string, expanded: boolean) => {
  if (type === FileType.FILE) {
    return FileIcon;
  } else if (type === FileType.FOLDER && expanded) {
    return FolderOpenIcon;
  }
  return FolderCloseIcon;
}

const TreeNode = ({
  title,
  nodeKey,
  children,
  type,
  searchText,
  expanded = false,
  activeItem,
  handleClick,
  handleRightClick,
}: TreeNodeType) => {
  const isFile = type === FileType.FILE;
  const bgColor = searchText ? (isMatch(title, searchText) ? '#374151': '#fafafa') : (activeItem ===  nodeKey ? '#374151' : '#fafafa');
  const textColor = searchText ? (isMatch(title, searchText) ? '#fafafa': '#374151') : (activeItem ===  nodeKey ? '#fafafa' : '#374151');
  
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
      style={{ borderLeft: isFile ? '1px solid #030712' : 'none' }}>
      <span className="node-title" style={{ background: bgColor, color: textColor }}>
        <img className='file-icon' alt={type} src={getIcon(type, expanded)} />
        {title}
      </span>
      {type === 'folder' && <div style={{ marginLeft: '10px' }}>{children}</div>}
    </div>)
};


export default TreeNode;