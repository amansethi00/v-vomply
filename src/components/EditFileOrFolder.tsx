import { useRef } from "react";
import { Function } from "../common/common";
import { useFileExplore } from "../hooks/useFileExplorer";

interface IEditFileOrFolder {
  closeEditing: Function;
  name: string;
  childrenDepthArray: Array<number>;
}

const EditFileOrFolder: React.FC<IEditFileOrFolder> = (props) => {
  const { closeEditing, name, childrenDepthArray } = props;
  const { onEdit } = useFileExplore();
  const inputref = useRef(null);

  const changeKeyHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const currentValue = inputref.current.value;
      if (currentValue === "") {
        alert("cannot set empty value");
        closeEditing();
        return;
      }
      onEdit(childrenDepthArray, currentValue);
      closeEditing();
    }
  };

  return (
    <input
      autoFocus
      ref={inputref}
      defaultValue={name}
      onKeyPress={changeKeyHandler}
    />
  );
};
export default EditFileOrFolder;
