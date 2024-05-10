import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from '../routes/LoginPage';
import HomePage from '../routes/HomePage';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Router>
          <Routes>
            <Route path="/login" element={<LoginPage/>} />
            <Route path="*" element={<HomePage/>} />
          </Routes>
        </Router>
      </header>
    </div>
  );
}

export default App;
