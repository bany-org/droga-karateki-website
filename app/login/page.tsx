'use client';

import { useRouter } from 'next/navigation';
import { 
  Box, 
  Typography, 
  TextField, 
  Button, 
  Link, 
  InputAdornment, 
  IconButton, 
  Container 
} from '@mui/material';
import { 
  Email as EmailIcon, 
  Lock as LockIcon, 
  Visibility, 
  VisibilityOff,
  Login as LoginIcon
} from '@mui/icons-material';
import { useState } from 'react';
import Image from 'next/image';

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
    const router = useRouter();
    async function handleLogin(e: React.FormEvent) {
      e.preventDefault();
      const formData = new FormData(e.target as HTMLFormElement);
      const email = formData.get('email') as string;
      const password = formData.get('password') as string;
      let response: Response | null = null;
      try {
         response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/auth/login`, {
          method: 'POST',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password }),
        });
      } catch (error) {
        console.error('error', error);
      }

      if (response?.ok) {
        router.replace('/');
      } else {
        console.error('error', response && response.status);
      }
    }

  return (
    <Box 
      sx={{ 
        minHeight: '100vh', 
        bgcolor: 'background.default', 
        display: 'flex', 
        flexDirection: 'column',
        alignItems: 'center',
        pt: 8,
        px: 3
      }}
    >
      {/* Brand Section */}
      <Box sx={{ mb: 6, textAlign: 'center' }}>
        <Box 
          sx={{ 
            width: 80, 
            height: 80, 
            bgcolor: 'rgba(46, 125, 50, 0.1)', 
            borderRadius: 4, 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            margin: '0 auto',
            mb: 2,
            border: '2px solid #2e7d32'
          }}
        >
          {/* Replace with your actual SVG logo */}
          <Typography variant="h4" sx={{ color: '#2e7d32', fontWeight: 'bold' }}>B</Typography>
        </Box>
        <Typography variant="h4"  sx={{ letterSpacing: 2, color: '#2e7d32', fontWeight: "800" }}>
          BUSHIDO ZABRZE
        </Typography>
        <Typography variant="caption" sx={{ color: 'text.secondary', letterSpacing: 1 }}>
          THE WAY OF THE WARRIOR • ZABRZE DOJO
        </Typography>
      </Box>

      {/* Login Card */}
      <Box 
        sx={{ 
          width: '100%', 
          maxWidth: 400,
          bgcolor: 'background.paper',
          p: 4,
          borderRadius: 4,
          boxShadow: '0 8px 32px rgba(0,0,0,0.4)'
        }}
      >
        <Typography variant="h5"  sx={{ mb: 1, fontWeight: "bold" }}>
          Sign In
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary', mb: 4 }}>
          Access your rank tracking and dojo schedule.
        </Typography>

        <Box component="form" noValidate onSubmit={handleLogin}>
          <Typography variant="caption" sx={{ mb: 1, display: 'block', color: 'text.secondary', fontWeight: "bold" }}>
            EMAIL ADDRESS
          </Typography>
          <TextField
            fullWidth
            placeholder="sensei@bushido.pl"
            variant="outlined"
            margin="normal"
            sx={{ mb: 3 }}
            name="email"
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                  <EmailIcon fontSize="small" sx={{ color: 'text.secondary' }} />
                </InputAdornment>
              ),
            }
            }}
          />

          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
            <Typography variant="caption"  sx={{ color: 'text.secondary', fontWeight: "bold" }}>
              PASSWORD
            </Typography>
            <Link href="#" variant="caption" sx={{ color: '#4caf50', textDecoration: 'none', fontWeight: 'bold' }}>
              FORGOT?
            </Link>
          </Box>
          <TextField
            fullWidth
            type={showPassword ? 'text' : 'password'}
            placeholder="••••••••"
            variant="outlined"
            sx={{ mb: 4 }}
            name="password"
            slotProps={{
              input:{
                startAdornment: (
                  <InputAdornment position="start">
                  <LockIcon fontSize="small" sx={{ color: 'text.secondary' }} />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }
            }}
          />

          <Button
            fullWidth
            variant="contained"
            size="large"
            endIcon={<LoginIcon />}
            type="submit"
            sx={{ 
              py: 1.5, 
              bgcolor: '#2e7d32', 
              '&:hover': { bgcolor: '#1b5e20' },
              borderRadius: 2,
              fontWeight: 'bold',
              fontSize: '1.1rem'
            }}
          >
            Login
          </Button>
        </Box>
      </Box>

      {/* Footer Links */}
      <Box sx={{ mt: 'auto', py: 4, textAlign: 'center' }}>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          Don't have an account?{' '}
          <Link href="#" sx={{ color: '#4caf50', fontWeight: 'bold', textDecoration: 'none' }}>
            Sign up
          </Link>
        </Typography>
      </Box>
    </Box>
  );
}