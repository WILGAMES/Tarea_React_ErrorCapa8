import { useContext, useState } from "react";
import LoginRoundedIcon from "@mui/icons-material/LoginRounded";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import CircularProgress from "@mui/material/CircularProgress";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";

import { request } from "../api/client";
import { AuthContext } from "../auth/AuthContext";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      const data = await request("/api/auth/login", {
        method: "POST",
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const token = data.token || data.jwt || data.accessToken;

      if (!token) {
        throw new Error("El backend no devolvió un token válido");
      }

      login(token);
      navigate("/courses");
    } catch (err) {
      setError(err.message || "No se pudo iniciar sesión");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        py: 6,
      }}
    >
      <Container maxWidth="sm">
        <Paper
          elevation={0}
          sx={{
            p: { xs: 3, md: 5 },
            borderRadius: 6,
            border: "1px solid",
            borderColor: "divider",
            background:
              "radial-gradient(circle at top left, rgba(37,99,235,0.18), transparent 30%), linear-gradient(180deg, rgba(255,255,255,0.96), rgba(239,246,255,0.94))",
            backdropFilter: "blur(18px)",
          }}
        >
          <Stack spacing={3}>
            <Box>
              <Chip
                icon={<LoginRoundedIcon />}
                label="Acceso al sistema"
                color="primary"
                variant="outlined"
                sx={{ mb: 2 }}
              />
              <Typography variant="h3" component="h1" gutterBottom>
                Bienvenida
              </Typography>
              <Typography color="text.secondary">
                Inicia sesión para gestionar el catálogo de cursos desde un solo lugar.
              </Typography>
            </Box>

            <Box component="form" onSubmit={handleSubmit}>
              <Stack spacing={2}>
                {error && <Alert severity="error">{error}</Alert>}

                <TextField
                  label="Correo"
                  type="email"
                  variant="outlined"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  required
                  fullWidth
                />

                <TextField
                  label="Contraseña"
                  type="password"
                  variant="outlined"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  required
                  fullWidth
                />

                <Button
                  variant="contained"
                  type="submit"
                  disabled={loading}
                  fullWidth
                  sx={{
                    mt: 1,
                    py: 1.4,
                    borderRadius: 999,
                  }}
                >
                  {loading ? <CircularProgress size={24} color="inherit" /> : "Ingresar"}
                </Button>
              </Stack>
            </Box>
          </Stack>
        </Paper>
      </Container>
    </Box>
  );
}

export default LoginPage;
