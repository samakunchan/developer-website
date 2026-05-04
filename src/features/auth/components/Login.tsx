import { Container, Box, Paper, Typography, TextField, Button } from '@mui/material';
import { useServerFn } from '@tanstack/react-start';
import { Link } from '@tanstack/react-router';
import { requestPasswordResetActionForProd } from '../utils/auth-actions.functions';

export function Login({ handleSubmit }: { handleSubmit: (event: React.SubmitEvent<HTMLFormElement>) => void }) {
  const requestReset = useServerFn(requestPasswordResetActionForProd);
  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          py: 4,
        }}
      >
        <Paper
          elevation={3}
          sx={{
            p: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            borderRadius: 2,
          }}
        >
          <Typography component="h1" variant="h4" gutterBottom>
            Sign In
          </Typography>

          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2, width: '100%' }}>
            <TextField
              margin="normal"
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />

            <TextField
              margin="normal"
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />

            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
              {process.env.NODE_ENV === 'development' && (
                <Link to="/forgot-password" style={{ textDecoration: 'none' }}>
                  <Typography variant="body2" color="primary">
                    Forgot password?
                  </Typography>
                </Link>
              )}
              {process.env.NODE_ENV === 'production' && (
                <Button variant="text" color="primary" onClick={() => requestReset()}>
                  <Typography variant="body2" color="primary">
                    Forgot password?
                  </Typography>
                </Button>
              )}
            </Box>

            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2, py: 1.5 }}>
              Sign In
            </Button>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
}
