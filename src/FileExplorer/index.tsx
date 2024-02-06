import React from "react";
import { tree_data } from './treedata';
import TreeNode from "./TreeNode";
import './style.css';

type Tree = {
  type: string | "file" | "folder";
  name?: string;
  data?: Array<any>;
};

const getTreeData = ({ tree, nodeKey, handleClick, treeState, activeItem, handleRightClick }: { tree: Tree, nodeKey: string, handleClick: any, activeItem: string, treeState: Record<string, boolean>, handleRightClick: any }) => {
  if (tree.type === 'file') {
    <TreeNode title={tree.name!} nodeKey={nodeKey + ':' + tree.name} type={tree.type} handleClick={handleClick} activeItem={activeItem} handleRightClick={handleRightClick} />
  };
  return (
    <TreeNode title={tree.name!} nodeKey={nodeKey + ':' + tree.name} type={tree.type} handleClick={handleClick} expanded={treeState[nodeKey]} activeItem={activeItem} handleRightClick={handleRightClick}>
      {treeState[nodeKey + ':' + tree.name] && tree?.data?.map((item) => getTreeData({ tree: item, nodeKey: nodeKey + ':' + tree.name, handleClick, treeState, activeItem, handleRightClick }))}
    </TreeNode>
  )
}

const FileExplorer: React.FC = () => {
  const [treeState, setTreeState] = React.useState<Record<string, boolean>>({});
  const [activeItem, setActiveItem] = React.useState<string>('');
  const [showMenu, setShowMenu] = React.useState(false);
  const [position, setPosition] = React.useState({ x: 0, y: 0 });
  const itemRef = React.useRef<HTMLDivElement>(null);


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
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  console.log(treeState);
  return (
    <div className="FileExplorer">
      <h2>File Explorer</h2>
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