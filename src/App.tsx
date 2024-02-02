import { Route, Routes } from 'react-router'

import { Header } from './components/Header'
import { Home } from './pages/Home'
import { EditList } from './pages/EditList'


function App() {
  return (
    <div>
      <Header/>

      <Routes>

        <Route path='/' element={<Home/>} />
        <Route path='/edit' element={<EditList/>} />

      </Routes>
    </div>
  );
}

export default App;
