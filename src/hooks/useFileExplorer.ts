import { useContext } from "react";
import { FileExplorerContext } from "../context/FileExplorerContext";

export const useFileExplore = () => {
  const fileExplorerObject = useContext(FileExplorerContext);
  return fileExplorerObject;
};
