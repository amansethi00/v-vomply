import { NodeType } from "../components/constants";

export type Function = (...args) => void;

export type IData = Array<SingleNode>;

export interface SingleNode {
  id: number;
  name: string;
  type: NodeType;
  children?: IData;
  isExpanded?: boolean;
}
