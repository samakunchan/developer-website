import { Container, Box, Paper, Typography, TextField, Button, Alert } from '@mui/material';
import { Link } from '@tanstack/react-router';

interface ForgotPasswordProps {
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => Promise<void>;
  isLoading: boolean;
  isSuccess: boolean;
  error: string | null;
}

export function ForgotPassword({ handleSubmit, isLoading, isSuccess, error }: ForgotPasswordProps) {
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
            Forgot Password
          </Typography>

          <Typography variant="body2" color="text.secondary" align="center" sx={{ mb: 3 }}>
            Enter your email address and we'll send you a link to reset your password.
          </Typography>

          {isSuccess ? (
            <Alert severity="success" sx={{ width: '100%', mb: 2 }}>
              If an account exists for this email, you will receive a reset link shortly.
            </Alert>
          ) : (
            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2, width: '100%' }}>
              {error && (
                <Alert severity="error" sx={{ mb: 2 }}>
                  {error}
                </Alert>
              )}

              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                disabled={isLoading}
              />

              <Button type="submit" fullWidth variant="contained" disabled={isLoading} sx={{ mt: 3, mb: 2, py: 1.5 }}>
                {isLoading ? 'Sending...' : 'Send Reset Link'}
              </Button>
            </Box>
          )}

          <Box sx={{ mt: 2 }}>
            <Link to="/login" style={{ textDecoration: 'none' }}>
              <Typography variant="body2" color="primary">
                Back to Sign In
              </Typography>
            </Link>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
}
