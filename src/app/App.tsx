import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from '../routes/LoginPage';
import HomePage from '../routes/HomePage';
import { AppContextProvider, useAppContext } from './AppContext';

function App() {
  const appContext = useAppContext();
  return (
    <div className="App">
      <header className="App-header">
        <AppContextProvider>
          <Router>
            <Routes>
              {appContext.auth === undefined ? ( <Route path="*" element={<LoginPage/>} />):(<><Route path="" element={<LoginPage/>} />
              <Route path="*" element={<HomePage/>} /></>)} 
            </Routes>
          </Router>
        </AppContextProvider>
      </header>
    </div>
  );
}

export default App;
