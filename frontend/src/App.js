import Home from './pages/Home';
import Login from './pages/Login';
import { StyledContainer, StyledContainerOther } from './componants/Styles';
import Signup from './pages/Signup'

import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import Acceuil from './pages/Acceuil';
function App() {
  return (
    <Router>

      <Routes>
        <Route path="/signup" element={<Signup />}></Route>
        <Route path='/login' element={<Login />} ></Route>
        <Route path='/' element={<Home />} ></Route>
        <Route path='/acceuil' element={<Acceuil />} ></Route>
      </Routes>

    </Router >

  );
}

export default App;
