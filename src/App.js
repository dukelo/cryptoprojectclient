import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import authService from './services/auth.service';
import Layout from './components/Layout';
import HomeComponent from './pages/HomeComponent';
import PriceComponent from './pages/PriceComponent';
import LoginComponent from './pages/LoginComponent';
import RegisterComponent from './pages/RegisterComponent';
import ProfileComponent from './pages/ProfileComponent';
import InvestComponent from './pages/InvestComponents';
import HistoryComponent from './pages/HistoryComponent';



function App() {

  let [currentUser, setCurrentUser] = useState(authService.getCurrentUser())

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout currentUser={currentUser} setCurrentUser={setCurrentUser} />}>
          <Route index element={<HomeComponent />} />
          <Route path='price' element={<PriceComponent />} />
          <Route path='login' element={<LoginComponent currentUser={currentUser} setCurrentUser={setCurrentUser} />} />
          <Route path='register' element={<RegisterComponent />} />
          <Route path='profile' element={<ProfileComponent />} />
          <Route path='investment' element={<InvestComponent />} />
          <Route path='history' element={<HistoryComponent />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
