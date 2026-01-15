import { BrowserRouter, Routes, Route } from "react-router-dom";
import Gallery from "./components/Gallery";
import PictureDiscussion from "./components/PictureDiscussion";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Gallery />} />
        <Route path="/picture/:id" element={<PictureDiscussion />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
