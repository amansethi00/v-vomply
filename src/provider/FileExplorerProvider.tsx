import { useState } from "react";

import { IData } from "../common/common";
import { modifyPropertyAtTheGivenNodePosition } from "../common/utils";
import {
  data,
  ModifyFunctionUpdateType,
  NodeType
} from "../components/constants";
import { FileExplorerContext } from "../context/FileExplorerContext";
import {
  ICreateFileOrFolder,
  IOnDeleteFunction,
  IOnEditFunction,
  IToggleExpanded
} from "../context/types";

const FileExplorerProvider = (props) => {
  const [state, setState] = useState<IData>(data);

  const toggleExpanedState: IToggleExpanded = (nodeIndexDepth, value) => {
    setState(
      modifyPropertyAtTheGivenNodePosition({
        nodeIndexArray: nodeIndexDepth,
        state,
        property: "isExpanded",
        updateType: value
          ? ModifyFunctionUpdateType.UPDATE
          : ModifyFunctionUpdateType.TOGGLE,
        value: value
      })
    );
  };

  const onEdit: IOnEditFunction = (nodeIndexDepth, name) => {
    const updatedState = modifyPropertyAtTheGivenNodePosition({
      nodeIndexArray: nodeIndexDepth,
      state,
      property: "name",
      updateType: ModifyFunctionUpdateType.UPDATE,
      value: name
    });
    setState(updatedState);
  };

  const onDelete: IOnDeleteFunction = (nodeIndexDepth) => {
    const updatedState = modifyPropertyAtTheGivenNodePosition({
      nodeIndexArray: nodeIndexDepth,
      state,
      updateType: ModifyFunctionUpdateType.DELETE
    });
    setState(updatedState);
  };

  const onCreateFileOrFolder: ICreateFileOrFolder = (
    nodeIndexDepth,
    name,
    type
  ) => {
    const updatedState = modifyPropertyAtTheGivenNodePosition({
      nodeIndexArray: nodeIndexDepth,
      state: state,
      updateType:
        type === NodeType.FILE
          ? ModifyFunctionUpdateType.ADD_FILE
          : ModifyFunctionUpdateType.ADD_FOLDER,
      value: name
    });
    setState(updatedState);
  };

  return (
    <FileExplorerContext.Provider
      value={{
        state,
        toggleExpanded: toggleExpanedState,
        onCreateFileOrFolder,
        onEdit,
        onDelete
      }}
    >
      {props.children}
    </FileExplorerContext.Provider>
  );
};

export default FileExplorerProvider;
