import { IData } from "../common/common";
import RenderNode from "../components/RenderNode";
import "../common/common.css";

interface IRenderStructure {
  data: IData;
  childrenDepthArray?: Array<number>;
}

const RenderStructure: React.FC<IRenderStructure> = (props) => {
  const { childrenDepthArray, data } = props;
  return (
    <div className="w-200 flex-col">
      {data.map((item, index) => {
        return (
          <RenderNode
            key={item.id}
            item={item}
            childrenDepthArray={
              childrenDepthArray ? [...childrenDepthArray, index] : [index]
            }
          />
        );
      })}
    </div>
  );
};

export default RenderStructure;
