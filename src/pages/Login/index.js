import React from "react";
import Logo from '../../assets/images/logo2.png';
import {
  Backdrop, Box, Button, Checkbox,
  CircularProgress, FormControl,
  FormControlLabel, FormGroup,
  InputAdornment, InputLabel,
  MenuItem, OutlinedInput,
  TextField,
} from "@mui/material";

import PersonIcon from '@mui/icons-material/Person';
import LockIcon from '@mui/icons-material/Lock';

export const Login = () => {
  return (
    <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'url(https://sisecf.com/img/intro-bg.webp)', backgroundRepeat: 'no-repeat', objectFit: 'contain' }}>

      <div style={{ background: '#f8f8f8', minHeight: '55%', minWidth: '20%', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '5rem', borderRadius: '4px' }}>

        <img src={Logo} alt="logo company" style={{ width: '12rem', height: '10rem', objectFit: 'contain', paddingBottom: '3rem' }} />

        <form >

          <Box sx={{ display: 'flex', flexDirection: "column", gap: 2, mb: 2 }}>

            <TextField
              id="input-with-icon-textfield"
              label="E-mail"
              fullWidth
              type="email"
              required
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PersonIcon />
                  </InputAdornment>
                ),
              }}
              variant="outlined"
            />

            <TextField
              id="input-with-icon-textfield"
              label="Senha"
              type="password"
              required
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockIcon />
                  </InputAdornment>
                ),
              }}
              variant="outlined"
            />

            <Button sx={{}} type="submit" variant="contained" size="large">Entrar</Button>

          </Box>

        </form>

        <Box sx={{ display: 'flex', flexDirection: "column", gap: 2, mb: 2, alignItems: 'center' }}>

          <a href="#" style={{ fontSize: '14px', color: '#2280FF' }}>Criar conta</a>
          <a href="#" style={{ fontSize: '14px', color: '#2280FF' }}>Esqueci minha senha</a>
        </Box>

      </div>

    </div>
  );
}