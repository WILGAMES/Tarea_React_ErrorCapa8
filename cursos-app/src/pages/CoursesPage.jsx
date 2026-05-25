import { useCallback, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AddCircleOutlineRoundedIcon from "@mui/icons-material/AddCircleOutlineRounded";
import AutoStoriesRoundedIcon from "@mui/icons-material/AutoStoriesRounded";
import ExitToAppRoundedIcon from "@mui/icons-material/ExitToAppRounded";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import CircularProgress from "@mui/material/CircularProgress";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import CourseForm from "../components/CourseForm";
import { request } from "../api/client.js";
import { AuthContext } from "../auth/AuthContext";

function CoursesPage() {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchCourses = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const data = await request("/api/courses", {
        method: "GET",
      });

      setCourses(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(err.message || "Error cargando cursos");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCourses();
  }, [fetchCourses]);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const handleCourseCreated = async (createdCourse) => {
    if (createdCourse?.id) {
      setCourses((currentCourses) => [createdCourse, ...currentCourses]);
      return;
    }

    await fetchCourses();
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        py: { xs: 4, md: 8 },
      }}
    >
      <Container maxWidth="lg">
        <Stack spacing={4}>
          <Paper
            elevation={0}
            sx={{
              p: { xs: 3, md: 4 },
              borderRadius: 6,
              overflow: "hidden",
              position: "relative",
              border: "1px solid",
              borderColor: "divider",
              background:
                "radial-gradient(circle at top left, rgba(14,165,233,0.22), transparent 32%), radial-gradient(circle at right, rgba(59,130,246,0.20), transparent 26%), linear-gradient(135deg, rgba(255,255,255,0.95), rgba(240,249,255,0.92))",
            }}
          >
            <Stack
              direction={{ xs: "column", md: "row" }}
              spacing={3}
              justifyContent="space-between"
              alignItems={{ xs: "flex-start", md: "center" }}
            >
              <Box>
                <Chip
                  icon={<AutoStoriesRoundedIcon />}
                  label="Panel académico"
                  color="primary"
                  variant="outlined"
                  sx={{ mb: 2 }}
                />
                <Typography variant="h3" component="h1" gutterBottom>
                  Cursos
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 640 }}>
                  Crea cursos, visualiza el catálogo actual y mantén la información organizada
                  desde una interfaz más clara y agradable.
                </Typography>
              </Box>

              <Button
                onClick={handleLogout}
                variant="outlined"
                color="inherit"
                startIcon={<ExitToAppRoundedIcon />}
                sx={{
                  borderRadius: 999,
                  px: 2.5,
                  py: 1.1,
                  bgcolor: "rgba(255,255,255,0.5)",
                }}
              >
                Cerrar sesión
              </Button>
            </Stack>
          </Paper>

          <CourseForm onCourseCreated={handleCourseCreated} />

          <Box>
            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={1.5}
              justifyContent="space-between"
              alignItems={{ xs: "flex-start", sm: "center" }}
              sx={{ mb: 2.5 }}
            >
              <Box>
                <Typography variant="h4" component="h2" gutterBottom>
                  Lista de cursos
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {courses.length} {courses.length === 1 ? "curso registrado" : "cursos registrados"}
                </Typography>
              </Box>

              <Chip
                icon={<AddCircleOutlineRoundedIcon />}
                label="Actualización automática al crear"
                variant="filled"
                color="primary"
              />
            </Stack>

            {loading && (
              <Paper
                elevation={0}
                sx={{
                  p: 5,
                  borderRadius: 4,
                  border: "1px dashed",
                  borderColor: "divider",
                }}
              >
                <Stack spacing={2} alignItems="center">
                  <CircularProgress />
                  <Typography color="text.secondary">Cargando cursos...</Typography>
                </Stack>
              </Paper>
            )}

            {!loading && error && <Alert severity="error">{error}</Alert>}

            {!loading && !error && courses.length === 0 && (
              <Paper
                elevation={0}
                sx={{
                  p: 5,
                  borderRadius: 4,
                  textAlign: "center",
                  border: "1px dashed",
                  borderColor: "divider",
                  backgroundColor: "rgba(255,255,255,0.65)",
                }}
              >
                <Typography variant="h6" gutterBottom>
                  No hay cursos disponibles
                </Typography>
                <Typography color="text.secondary">
                  Usa el formulario superior para crear el primero.
                </Typography>
              </Paper>
            )}

            {!loading && !error && courses.length > 0 && (
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: {
                    xs: "1fr",
                    md: "repeat(2, minmax(0, 1fr))",
                  },
                  gap: 2.5,
                }}
              >
                {courses.map((course) => (
                  <Paper
                    key={course.id ?? course.name}
                    elevation={0}
                    sx={{
                      p: 3,
                      borderRadius: 4,
                      border: "1px solid",
                      borderColor: "divider",
                      background:
                        "linear-gradient(180deg, rgba(255,255,255,0.95), rgba(248,250,252,0.95))",
                      transition: "transform 0.2s ease, box-shadow 0.2s ease",
                      "&:hover": {
                        transform: "translateY(-3px)",
                        boxShadow: "0 16px 30px rgba(15, 23, 42, 0.08)",
                      },
                    }}
                  >
                    <Stack direction="row" spacing={2} alignItems="center">
                      <Box
                        sx={{
                          display: "grid",
                          placeItems: "center",
                          width: 52,
                          height: 52,
                          borderRadius: "18px",
                          color: "primary.main",
                          backgroundColor: "rgba(59,130,246,0.10)",
                        }}
                      >
                        <AutoStoriesRoundedIcon />
                      </Box>

                      <Box>
                        <Typography variant="h6">{course.name}</Typography>
                        <Typography variant="body2" color="text.secondary">
                          ID: {course.id ?? "pendiente"}
                        </Typography>
                      </Box>
                    </Stack>
                  </Paper>
                ))}
              </Box>
            )}
          </Box>
        </Stack>
      </Container>
    </Box>
  );
}

export default CoursesPage;
