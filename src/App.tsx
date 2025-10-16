import { ToastContainer } from "react-toastify";
import { CharacterPage } from "./pages/CharacterPage";

function App() {
  return (
    <>
      <CharacterPage />
      <ToastContainer
        position="top-right"
        autoClose={3000}
        theme="dark"
        closeOnClick
        pauseOnHover
      />
    </>
  );
}

export default App;