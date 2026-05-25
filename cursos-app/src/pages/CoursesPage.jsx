import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import CourseForm from "../components/CourseForme";
import { AuthContext } from "../auth/AuthContext";

function CoursesPage() {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (

    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h1>Cursos</h1>
        <button onClick={handleLogout}>Cerrar sesión</button>
      </div>

      <CourseForm />

    </div>

  );
}

export default CoursesPage;
