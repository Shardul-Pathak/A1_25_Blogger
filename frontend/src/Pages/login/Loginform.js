import React, { useState } from "react";
import { TextField, Button, InputAdornment, Alert, CircularProgress } from "@mui/material";
import { useNavigate } from "react-router-dom";
import AccountCircle from '@mui/icons-material/AccountCircle';
import LockIcon from '@mui/icons-material/Lock';
import "./Loginform.css";
import { useAuth } from '../../context/AuthContext';

function Loginform() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [state, setState] = useState({
    email: "",
    password: "",
    emailError: "",
    passwordError: "",
    generalError: "",
    loading: false
  });

  const validateForm = (email, password) => {
    let emailError = "";
    let passwordError = "";

    if (!email) {
      emailError = "Please enter your email";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      emailError = "Please enter a valid email";
    }

    if (!password) {
      passwordError = "Please enter your password";
    }

    return { emailError, passwordError, isValid: !emailError && !passwordError };
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const email = event.target.email.value.trim();
    const password = event.target.password.value;

    const { emailError, passwordError, isValid } = validateForm(email, password);

    if (!isValid) {
      setState({
        ...state,
        emailError,
        passwordError,
        generalError: ""
      });
      return;
    }

    setState({ ...state, loading: true, generalError: "" });

    const result = await login(email, password);
    
    if (result.success) {
      navigate("/author");
    } else {
      setState(prev => ({
        ...prev,
        loading: false,
        generalError: result.message || "Login failed. Please try again."
      }));
    }
  };

  return (
    <React.Fragment>
      <form autoComplete="off" onSubmit={handleSubmit} className="form-container">
        <h1>Sign In</h1>
        
        {state.generalError && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {state.generalError}
          </Alert>
        )}

        <TextField
          id="email"
          name="email"
          label="Email"
          defaultValue=""
          fullWidth
          sx={{ mb: 1 }}
          error={!!state.emailError}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <AccountCircle />
              </InputAdornment>
            ),
          }}
        />
        {state.emailError && <span className="error-message">{state.emailError}</span>}

        <TextField
          id="password"
          name="password"
          label="Password"
          type="password"
          defaultValue=""
          fullWidth
          sx={{ mb: 1, mt: 2 }}
          error={!!state.passwordError}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <LockIcon />
              </InputAdornment>
            ),
          }}
        />
        {state.passwordError && <span className="error-message">{state.passwordError}</span>}

        <Button 
          variant="outlined" 
          color="secondary" 
          type="submit"
          fullWidth
          sx={{ mt: 3 }}
          disabled={state.loading}
        >
          {state.loading ? <CircularProgress size={24} /> : "Login"}
        </Button>
      </form>

      <small style={{ display: 'block', marginTop: '10px', textAlign: 'center' }}>
        Need an account? <a href="#signup" style={{ cursor: 'pointer', color: 'blue' }}>Register here</a>
      </small>
    </React.Fragment>
  );
}

export default Loginform;
