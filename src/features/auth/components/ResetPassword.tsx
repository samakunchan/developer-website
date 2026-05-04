import { Container, Box, Paper, Typography, TextField, Button, Alert } from '@mui/material';
import { Link } from '@tanstack/react-router';

interface ResetPasswordProps {
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => Promise<void>;
  isLoading: boolean;
  isSuccess: boolean;
  error: string | null;
}

export function ResetPassword({ handleSubmit, isLoading, isSuccess, error }: ResetPasswordProps) {
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
            Reset Password
          </Typography>

          {isSuccess ? (
            <Box sx={{ width: '100%', textAlign: 'center' }}>
              <Alert severity="success" sx={{ mb: 3 }}>
                Your password has been reset successfully.
              </Alert>
              <Link to="/login" style={{ textDecoration: 'none' }}>
                <Button variant="contained" fullWidth>
                  Go to Sign In
                </Button>
              </Link>
            </Box>
          ) : (
            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2, width: '100%' }}>
              <Typography variant="body2" color="text.secondary" align="center" sx={{ mb: 3 }}>
                Please enter your new password below.
              </Typography>

              {error && (
                <Alert severity="error" sx={{ mb: 2 }}>
                  {error}
                </Alert>
              )}

              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="New Password"
                type="password"
                id="password"
                autoComplete="new-password"
                disabled={isLoading}
              />

              <TextField
                margin="normal"
                required
                fullWidth
                name="confirmPassword"
                label="Confirm New Password"
                type="password"
                id="confirmPassword"
                autoComplete="new-password"
                disabled={isLoading}
              />

              <Button type="submit" fullWidth variant="contained" disabled={isLoading} sx={{ mt: 3, mb: 2, py: 1.5 }}>
                {isLoading ? 'Resetting...' : 'Reset Password'}
              </Button>
            </Box>
          )}

          {!isSuccess && (
            <Box sx={{ mt: 2 }}>
              <Link to="/login" style={{ textDecoration: 'none' }}>
                <Typography variant="body2" color="primary">
                  Back to Sign In
                </Typography>
              </Link>
            </Box>
          )}
        </Paper>
      </Box>
    </Container>
  );
}
