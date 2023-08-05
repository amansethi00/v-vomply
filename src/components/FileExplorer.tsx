import { useState } from "react";

import { useFileExplore } from "../hooks/useFileExplorer";
import "../common/common.css";
import RenderStructure from "./RenderStructure";
import ActionButtons from "./ActionButtons";
import { NodeType } from "./constants";
import CreateNewNode from "./CreateNewNode";

const FileExplorer = () => {
  const { state } = useFileExplore();
  const [createFlow, setCreateFlow] = useState(null);
  const onCreateFileClick = () => setCreateFlow(NodeType.FILE);
  const onCreateFolderClick = () => setCreateFlow(NodeType.FOLDER);

  return (
    <div>
      File Explorer
      <div className="flex row spaceBetween w-100">
        <span className="w-100 text-align-left w-50">Files</span>
        <ActionButtons
          onCreateFileHandler={onCreateFileClick}
          onCreateFolderHandler={onCreateFolderClick}
        />
      </div>
      <RenderStructure data={state} />
      {createFlow ? (
        <CreateNewNode
          type={createFlow}
          childrenDepthArray={[]}
          closeCreateView={() => setCreateFlow(null)}
        />
      ) : null}
    </div>
  );
};

export default FileExplorer;
