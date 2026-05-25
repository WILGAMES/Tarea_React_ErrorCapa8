import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import Stack from "@mui/material/Stack";
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
      component="form"
      onSubmit={handleSubmit}
      sx={{
        maxWidth: 380,
        mx: "auto",
        mt: 8,
      }}
    >

      <h1>Login</h1>

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
        >
          {loading ? <CircularProgress size={24} color="inherit" /> : "Ingresar"}
        </Button>
      </Stack>

    </Box>

  );
}

export default LoginPage;
