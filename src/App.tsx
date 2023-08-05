import FileExplorer from "./components/FileExplorer";
import FileExplorerProvider from "./provider/FileExplorerProvider";
import "./styles.css";

export default function App() {
  return (
    <div className="App">
      <FileExplorerProvider>
        <FileExplorer />
      </FileExplorerProvider>
    </div>
  );
}
