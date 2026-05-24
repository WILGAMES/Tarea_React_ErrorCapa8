import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

function LoginPage() {

  return (

    <div>

      <h1>Login</h1>

      <TextField
        label="Correo"
        variant="outlined"
      />

      <br /><br />

      <TextField
        label="Contraseña"
        type="password"
        variant="outlined"
      />

      <br /><br />

      <Button
        variant="contained"
      >
        Ingresar
      </Button>

    </div>

  );
}

export default LoginPage;