import { ModifyFunctionUpdateType, NodeType } from "../components/constants";
import { IData, SingleNode } from "./common";

interface IModifyPropertyAtTheGivenNodePosition {
  nodeIndexArray: Array<number>;
  state: IData;
  property?: string;
  updateType: ModifyFunctionUpdateType;
  value?: any;
}

export const modifyPropertyAtTheGivenNodePosition = (
  props: IModifyPropertyAtTheGivenNodePosition
) => {
  const { state, nodeIndexArray, property, updateType, value } = props;
  const cloneState = structuredClone(state);
  let currentState: IData | SingleNode = cloneState;
  let prevState: IData | SingleNode = cloneState;
  nodeIndexArray.forEach((index) => {
    if ("children" in currentState) {
      prevState = currentState.children;
      currentState = currentState.children?.[index];
    } else {
      prevState = currentState;
      currentState = currentState[index];
    }
  });
  switch (updateType) {
    case "TOGGLE":
      currentState[property] = !currentState[property];
      break;
    case "UPDATE":
      currentState[property] = value;
      break;
    case "DELETE":
      prevState.splice(nodeIndexArray[nodeIndexArray.length - 1], 1);
      break;
    case "ADD_FILE":
      const newFile = {
        id: Math.random(),
        name: value,
        type: NodeType.FILE
      };
      if ("children" in currentState) {
        (currentState.children as IData).push(newFile);
      } else {
        currentState.push(newFile);
      }
      break;
    case "ADD_FOLDER":
      const newFolder = {
        id: Math.random(),
        name: value,
        type: NodeType.FOLDER,
        children: []
      };
      if ("children" in currentState) {
        (currentState.children as IData).push(newFolder);
      } else {
        currentState.push(newFolder);
      }
      break;
    default:
      currentState[property] = value;
      break;
  }
  return cloneState;
};
