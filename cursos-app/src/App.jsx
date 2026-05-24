import { BrowserRouter, Routes, Route } from "react-router-dom";

import LoginPage from "./pages/LoginPage";
import CoursesPage from "./pages/CoursesPage";

function App() {

  return (

    <BrowserRouter>

      <Routes>

        <Route path="/" element={<LoginPage />} />

        <Route path="/courses" element={<ProtectedRoute><CoursesPage /></ProtectedRoute>} />

      </Routes>

    </BrowserRouter>


  );
}

export default App;