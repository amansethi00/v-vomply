export enum NodeType {
  FILE = "file",
  FOLDER = "folder"
}
export enum ModifyFunctionUpdateType {
  TOGGLE = "TOGGLE",
  UPDATE = "UPDATE",
  DELETE = "DELETE",
  ADD_FILE = "ADD_FILE",
  ADD_FOLDER = "ADD_FOLDER"
}
export const data = [
  {
    id: 1,
    name: "Folder1",
    type: NodeType.FOLDER,
    isExpanded: true,
    children: [
      {
        id: 2,
        name: "f1.js",
        type: NodeType.FILE
      },
      {
        id: 3,
        name: "folder1childfolder",
        type: NodeType.FOLDER,
        isExpanded: false,
        children: [
          {
            id: 4,
            name: "f2.ts",
            type: NodeType.FILE
          }
        ]
      }
    ]
  }
];
