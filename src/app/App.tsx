import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from '../routes/LoginPage';
import HomePage from '../routes/HomePage';
import { AppContextProvider, useAppContext } from './AppContext';
import { ThemeProvider } from '@mui/material';
import { themeLight } from './theme';

function App() {
  const appContext = useAppContext();
  return (
    <div>
        <AppContextProvider>
        <ThemeProvider theme={themeLight}>
          <Router>
            <Routes>
              {appContext.auth === undefined ? ( <Route path="*" element={<LoginPage/>} />):(<><Route path="" element={<LoginPage/>} />
              <Route path="*" element={<HomePage/>} /></>)}  
            </Routes>
          </Router>
          </ThemeProvider>
        </AppContextProvider>
    </div>
  );
}

export default App;
