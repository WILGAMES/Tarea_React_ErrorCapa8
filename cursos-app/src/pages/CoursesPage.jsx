import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import CourseForm from "../components/CourseForme";
import { AuthContext } from "../auth/AuthContext";
import { request } from "../api/client.js";

function CoursesPage() {

  const { logout } = useContext(AuthContext);

  const navigate = useNavigate();

  // Estado de cursos
  const [courses, setCourses] = useState([]);

  // Estado de carga
  const [loading, setLoading] = useState(true);

  // Estado de error
  const [error, setError] = useState("");


  // Cargar cursos al entrar a la página
  useEffect(() => {

    async function fetchCourses() {

      try {

        setLoading(true);

        const data = await request("/api/courses", {
          method: "GET",
        });

        console.log("Cursos recibidos:", data);

        setCourses(data);

      } catch (err) {

        console.error(err);

        setError(err.message || "Error cargando cursos");

      } finally {

        setLoading(false);
      }
    }

    fetchCourses();

  }, []);


  // Logout
  const handleLogout = () => {

    logout();

    navigate("/");
  };


  return (

    <div
      style={{
        padding: "30px",
        maxWidth: "900px",
        margin: "0 auto",
        fontFamily: "Arial",
      }}
    >

      {/* HEADER */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "30px",
        }}
      >

        <h1
          style={{
            margin: 0,
          }}
        >
          Cursos
        </h1>

        <button
          onClick={handleLogout}
          style={{
            padding: "10px 15px",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
          }}
        >
          Cerrar sesión
        </button>

      </div>


      {/* FORMULARIO */}
      <CourseForm />


      <hr style={{ margin: "40px 0" }} />


      {/* TITULO */}
      <h2>Lista de Cursos</h2>


      {/* LOADING */}
      {loading && (

        <p>
          Cargando cursos...
        </p>

      )}


      {/* ERROR */}
      {error && (

        <p
          style={{
            color: "red",
            fontWeight: "bold",
          }}
        >
          {error}
        </p>

      )}


      {/* SIN CURSOS */}
      {!loading && !error && courses.length === 0 && (

        <p>
          No hay cursos disponibles
        </p>

      )}


      {/* LISTA */}
      {!loading && !error && courses.length > 0 && (

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "15px",
            marginTop: "20px",
          }}
        >

          {courses.map((course) => (

            <div
              key={course.id}
              style={{
                border: "1px solid #ddd",
                borderRadius: "12px",
                padding: "20px",
                backgroundColor: "#f5f5f5",
                boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
              }}
            >

              <h3
                style={{
                  margin: 0,
                }}
              >
                {course.name}
              </h3>

            </div>

          ))}

        </div>

      )}

    </div>

  );
}

export default CoursesPage;