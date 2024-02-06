import React from "react";
import { tree_data } from './treedata';
import TreeNode from "./TreeNode";
import { searchTree } from './util';
import { FileType, TreeData, TreeState } from './types';
import './style.css';


const getTreeData = ({ tree, nodeKey, handleClick, treeState, activeItem, handleRightClick }: TreeData) => {
  const newKey = nodeKey ? nodeKey + '-' + tree.name : tree.name!;
  if (tree.type === FileType.FILE) {
    <TreeNode key={newKey} title={tree.name!} nodeKey={newKey} type={tree.type} handleClick={handleClick} activeItem={activeItem} handleRightClick={handleRightClick} />
  };
  return (
    <TreeNode key={newKey} title={tree.name!} nodeKey={newKey} type={tree.type} handleClick={handleClick} expanded={treeState[newKey]} activeItem={activeItem} handleRightClick={handleRightClick}>
      {treeState[newKey] && tree?.data?.map((item) => getTreeData({ tree: item, nodeKey: newKey, handleClick, treeState, activeItem, handleRightClick }))}
    </TreeNode>
  )
}

const FileExplorer: React.FC = () => {
  const [treeState, setTreeState] = React.useState<TreeState>({});
  const [activeItem, setActiveItem] = React.useState<string>('');
  const [showMenu, setShowMenu] = React.useState(false);
  const [position, setPosition] = React.useState({ x: 0, y: 0 });
  const itemRef = React.useRef<HTMLDivElement>(null);
  const [searchText, setSearchText] = React.useState<string>('');


  const handleClick = (nodeKey: string) => {
    setActiveItem(nodeKey);
    setTreeState(prev => ({ ...treeState, [nodeKey]: !prev[nodeKey] }));
  };

  const handleRightClick = (e: any, key: string) => {
    console.log("on right click", key, e.clientX, e.clientY);
    setShowMenu(true);
    setPosition({ x: e.clientX, y: e.clientY });
  };

  const handleMenuClick = (e: any) => {
    // window.alert(e.target.getAttribute("data-id"));
    console.log("on menu click", e.target.getAttribute("data-id"));
  };

  const handleClickOutside = (e: any) => {
    if (itemRef?.current && !itemRef.current.contains(e.target)) {
      console.log("Outside click");
      setShowMenu(false);
    }
  };

  React.useEffect(() => {
    const str = searchText && searchText.trim();
    if (str) {
      const found = searchTree(str, tree_data);
      // find file  
      console.log(found);
    }
  }, [searchText]);

  React.useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  console.log(treeState);
  return (
    <div className="FileExplorer">
      <h2>File Explorer</h2>
      <input className="searchBox" placeholder="Search files here" onChange={(e) => setSearchText(e.target.value)} />
      {getTreeData({ tree: tree_data, nodeKey: '', handleClick, treeState, activeItem, handleRightClick })}
      {showMenu &&
        <div id="context-menu" ref={itemRef} style={{ left: position.x, top: position.y }}>
          <ul>
            <li data-id="copy" onClick={handleMenuClick}>Copy</li>
            <li data-id="rename" onClick={handleMenuClick}>Rename</li>
            <li data-id="delete" onClick={handleMenuClick}>Delete</li>
          </ul>
        </div>
      }
    </div>
  )
};
export default FileExplorer;