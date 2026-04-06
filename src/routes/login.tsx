import { createFileRoute } from '@tanstack/react-router';
import { Container, Box, Typography, TextField, Button, Paper, Divider } from '@mui/material';

export const Route = createFileRoute('/login')({
  component: LoginPage,
});

function LoginPage() {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log('Login attempt (Static UI)');
    alert('This is a static login page. Authentication has been removed.');
  };

  const handleGitHubLogin = () => {
    console.log('GitHub login attempt (Static UI)');
    alert('GitHub authentication is currently disabled.');
  };

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

            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2, py: 1.5 }}>
              Sign In
            </Button>

            <Divider sx={{ my: 2 }}>OR</Divider>

            <Button fullWidth variant="outlined" onClick={handleGitHubLogin} sx={{ py: 1.5 }}>
              Sign In with GitHub
            </Button>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
}
