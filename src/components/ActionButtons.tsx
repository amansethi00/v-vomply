import React from "react";
import { FiEdit2 } from "react-icons/fi";
import { AiFillDelete, AiFillFolder, AiTwotoneFile } from "react-icons/ai";
import { Function } from "../common/common";
import "../common/common.css";

interface IActionButtons {
  onEditHandler?: Function;
  onDeleteHandler?: Function;
  onCreateFileHandler?: Function;
  onCreateFolderHandler?: Function;
}

const ActionButtons: React.FC<IActionButtons> = (props) => {
  const {
    onEditHandler,
    onDeleteHandler,
    onCreateFileHandler,
    onCreateFolderHandler
  } = props;

  return (
    <div className="w-50 flex-row alignCenter">
      {onEditHandler ? (
        <button
          aria-label="edit-name"
          className="btn-transparent"
          onClick={onEditHandler}
        >
          <FiEdit2 />
        </button>
      ) : null}
      {onCreateFileHandler ? (
        <button
          aria-label="create-file"
          className="btn-transparent"
          onClick={onCreateFileHandler}
        >
          <AiTwotoneFile />
        </button>
      ) : null}
      {onCreateFolderHandler ? (
        <button
          aria-label="create-folder"
          className="btn-transparent"
          onClick={onCreateFolderHandler}
        >
          <AiFillFolder />
        </button>
      ) : null}
      {onDeleteHandler ? (
        <button
          aria-label="delete-node"
          className="btn-transparent"
          onClick={onDeleteHandler}
        >
          <AiFillDelete />
        </button>
      ) : null}
    </div>
  );
};
export default ActionButtons;
