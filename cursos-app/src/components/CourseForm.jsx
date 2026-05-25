import { useState } from "react";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

import { request } from "../api/client";

function CourseForm({ onCourseCreated }) {
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!name.trim()) {
      setError("Escribe un nombre para el curso.");
      setSuccess("");
      return;
    }

    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const newCourse = await request("/api/courses", {
        method: "POST",
        body: JSON.stringify({
          name: name.trim(),
        }),
      });

      setName("");
      setSuccess("Curso creado correctamente.");

      if (onCourseCreated) {
        onCourseCreated(newCourse);
      }
    } catch (err) {
      setError(err.message || "No se pudo guardar el curso.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Paper
      elevation={0}
      sx={{
        p: { xs: 3, md: 4 },
        borderRadius: 4,
        border: "1px solid",
        borderColor: "divider",
        background:
          "linear-gradient(145deg, rgba(255,255,255,0.96), rgba(245,247,255,0.92))",
        backdropFilter: "blur(18px)",
      }}
    >
      <Stack spacing={3}>
        <Box>
          <Typography variant="h5" component="h2" gutterBottom>
            Crear curso
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Registra un nuevo curso y actualiza la lista al instante.
          </Typography>
        </Box>

        <Box component="form" onSubmit={handleSubmit}>
          <Stack spacing={2}>
            {error && <Alert severity="error">{error}</Alert>}
            {success && <Alert severity="success">{success}</Alert>}

            <TextField
              label="Nombre del curso"
              placeholder="Ej. Redes y Comunicaciones"
              value={name}
              onChange={(event) => setName(event.target.value)}
              required
              fullWidth
              autoComplete="off"
            />

            <Button
              type="submit"
              variant="contained"
              disabled={loading}
              sx={{
                alignSelf: "flex-start",
                minWidth: 180,
                px: 3,
                py: 1.3,
                borderRadius: 999,
              }}
            >
              {loading ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                "Guardar curso"
              )}
            </Button>
          </Stack>
        </Box>
      </Stack>
    </Paper>
  );
}

export default CourseForm;
