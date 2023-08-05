import React, { useState } from "react";
import { AiFillFolder, AiFillFolderOpen, AiTwotoneFile } from "react-icons/ai";

import "../common/common.css";
import ActionButtons from "./ActionButtons";
import useHover from "../hooks/useHover";
import { SingleNode } from "../common/common";
import { useFileExplore } from "../hooks/useFileExplorer";
import RenderStructure from "./RenderStructure";
import { NodeType } from "./constants";
import CreateNewNode from "./CreateNewNode";
import EditFileOrFolder from "./EditFileOrFolder";

interface IRenderNode {
  item: SingleNode;
  childrenDepthArray: Array<number>;
}

const RenderNode: React.FC<IRenderNode> = (props) => {
  const { item, childrenDepthArray } = props;
  const { name, type, isExpanded, children } = item;
  const [ref, isHovered] = useHover();
  const [isEditing, setIsEditing] = useState(false);
  const [createFlow, setCreateFlow] = useState<NodeType | null>(null);
  const { toggleExpanded, onDelete } = useFileExplore();

  const closeCreateFlow = () => {
    setCreateFlow(null);
  };
  const closeEditingFlow = () => {
    setIsEditing(false);
  };
  const clickHandlerForExpand = () => {
    if (type === NodeType.FOLDER) {
      toggleExpanded(childrenDepthArray);
    }
  };
  const onKeyPressForExpand = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      clickHandlerForExpand();
    }
  };
  const onClickCreateFile =
    type === NodeType.FOLDER
      ? () => {
          toggleExpanded(childrenDepthArray, true);
          setCreateFlow(NodeType.FILE);
        }
      : null;
  const onClickCreateFolder =
    type === NodeType.FOLDER
      ? () => {
          toggleExpanded(childrenDepthArray, true);
          setCreateFlow(NodeType.FOLDER);
        }
      : null;
  const onClickEditNode = () => setIsEditing(true);
  const onClickDeleteNode = () => onDelete(childrenDepthArray);

  return (
    <>
      <div
        ref={ref as any}
        className="flex-row spaceBetween alignCenter pointer h-2 w-50 "
      >
        <div className="flex-row alignCenter">
          {type === NodeType.FILE ? (
            <AiTwotoneFile />
          ) : isExpanded ? (
            <AiFillFolderOpen />
          ) : (
            <AiFillFolder />
          )}
          {!isEditing ? (
            <span
              className={`w-50 text-align-left shrink-2 node-name ${
                isHovered ? "highlight" : ""
              }`}
              aria-label="expand"
              tabIndex={type === NodeType.FOLDER ? 0 : -1}
              onClick={clickHandlerForExpand}
              onKeyPress={onKeyPressForExpand}
            >
              {name}
            </span>
          ) : (
            <EditFileOrFolder
              name={name}
              childrenDepthArray={childrenDepthArray}
              closeEditing={closeEditingFlow}
            />
          )}
        </div>
        {isHovered && !isEditing ? (
          <ActionButtons
            onDeleteHandler={onClickDeleteNode}
            onCreateFileHandler={onClickCreateFile}
            onCreateFolderHandler={onClickCreateFolder}
            onEditHandler={onClickEditNode}
          />
        ) : null}
      </div>
      {isExpanded ? (
        <div
          style={{
            paddingLeft: 16
          }}
          className="flex-col"
        >
          <RenderStructure
            data={children}
            childrenDepthArray={childrenDepthArray}
          />
          {createFlow ? (
            <CreateNewNode
              type={createFlow}
              childrenDepthArray={childrenDepthArray}
              closeCreateView={closeCreateFlow}
            />
          ) : null}
        </div>
      ) : null}
    </>
  );
};

export default RenderNode;
