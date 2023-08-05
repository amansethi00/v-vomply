import { IData } from "../common/common";
import { NodeType } from "../components/constants";

export type IOnEditFunction = (
  nodeIndexDepth: Array<number>,
  name: string
) => void;

export type IOnDeleteFunction = (nodeIndexDepth: Array<number>) => void;

export type ICreateFileOrFolder = (
  nodeIndexDepth: Array<number>,
  name: string,
  type: NodeType
) => void;

export type IToggleExpanded = (
  nodeIndexDepth: Array<number>,
  value?: boolean
) => void;

export interface FileContext {
  state: IData;
  onEdit: IOnEditFunction;
  onDelete: IOnDeleteFunction;
  onCreateFileOrFolder: ICreateFileOrFolder;
  toggleExpanded: IToggleExpanded;
}
