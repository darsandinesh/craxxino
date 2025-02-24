import { Route, Routes } from 'react-router-dom';
import CreateAccountPage from './pages/CreateAccountPage';
import PersonalInfoPage from './pages/PersonalInfoPage';
import FinancialInfoPage from './pages/FinancialInfoPage';
import HomePage from './pages/HomePage';


function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<CreateAccountPage />} />
        <Route path='/information' element={<PersonalInfoPage />} />
        <Route path='/financial' element={<FinancialInfoPage/>}/>
        <Route path='/home/:id' element={<HomePage/>}/>
      </Routes>
    </>
  )
}

export default App
