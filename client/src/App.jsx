import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './scenes/HomePage';
import LoginPage from './scenes/Login';
import ProfilePage from './scenes/ProfilePage';
import { ThemeProvider, CssBaseline, createTheme } from '@mui/material'; 
import { useSelector } from 'react-redux';
import { themeSettings } from './theme';
import { useMemo } from 'react';

function App() {
  const mode = useSelector((state) => state.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);

  return (
    <div className="app">
      <Router>
        <ThemeProvider theme={theme}>
          <CssBaseline /> {/* Ensuring CssBaseline is applied correctly */}
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/profile/:userId" element={<ProfilePage />} />
          </Routes>
        </ThemeProvider>
      </Router>
    </div>
  );
}

export default App;
