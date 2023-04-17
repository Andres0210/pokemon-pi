import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import LandingPage from './components/LandingPage';
import HomePage from './components/HomePage';
import Formulario from './components/formulario';
import DetailPage from './components/Detail.Page';
import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:3001';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route exact path='/' element={<LandingPage />}> </Route>
          <Route path='/home' element={<HomePage />}></Route>
          <Route path='/create' element={<Formulario />}></Route>
          <Route path='/pokemon/:id' element={<DetailPage />}></Route>

        </Routes>


      </div>
    </BrowserRouter>
  );
}

export default App;
