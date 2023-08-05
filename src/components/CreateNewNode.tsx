import React, { useRef } from "react";
import { Function } from "../common/common";
import { useFileExplore } from "../hooks/useFileExplorer";
import { NodeType } from "./constants";
import { AiFillFolder, AiTwotoneFile } from "react-icons/ai";
import "../common/common.css";

interface ICreateNewNode {
  type: NodeType;
  childrenDepthArray: Array<number>;
  closeCreateView: Function;
}
const CreateNewNode: React.FC<ICreateNewNode> = (props) => {
  const { type, childrenDepthArray, closeCreateView } = props;
  const { onCreateFileOrFolder } = useFileExplore();
  const inputRef = useRef(null);

  const keyHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const currentValue = inputRef.current.value;
      if (currentValue === "") {
        alert("cannot create empty" + type);
        closeCreateView();
        return;
      }
      onCreateFileOrFolder(childrenDepthArray, currentValue, type);
      closeCreateView();
    }
  };
  return (
    <div className="w-100 flex-row alignCenter h-2 ">
      <div>{type === NodeType.FILE ? <AiTwotoneFile /> : <AiFillFolder />}</div>
      <input ref={inputRef} autoFocus onKeyPress={keyHandler} />
    </div>
  );
};

export default CreateNewNode;
