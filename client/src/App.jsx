import {BrowserRouter as Router , Route, Routes,Navigate } from 'react-router-dom';
import HomePage from './scenes/HomePage';
import LoginPage from './scenes/Login';
import ProfilePage from './scenes/ProfilePage';
import RegisterPage from './scenes/RegisterPage';
function App() {
  
  return (
    <>
      <div className='app'>
        <Router>
          <Routes>
            <Route path='/' element={<LoginPage/>}/>
            <Route path='/home' element={<HomePage/>}/>
            <Route path='/profile/:userId' element={<ProfilePage/>}/>
            <Route path='/register' element={<RegisterPage/>}/>
          </Routes>
        </Router>
        
      </div>
     
    
    </>
  )
  
}

export default App
