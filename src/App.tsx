import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css'

import { Login } from './pages/auth/login/Login';
// import { Register } from './pages/auth/register/Register';
import { Home } from './pages/home/Home';
import { Layout } from './pages/layout/Layout';
import 'material-icons/iconfont/material-icons.css';
import { Users } from './pages/(admin)/users/Users';
import { Classrooms } from './pages/(admin)/classrooms/Classrooms';
import { SubjectsAdmin } from './pages/(admin)/subjects/SubjectsAdmin';
import { Students } from './pages/(admin)/students/Students';
import { Subjects } from './pages/subjects/Subjects';
import { UserData } from './interfaces/base-response.interface';
import { Topics } from './pages/topics/Topics';
import { userToken } from './backend/authenticate';
import { Asistent } from './pages/asistent/Asistent';
import { Profile } from './pages/profile/Profile';
import { Activities } from './pages/activities/Activities';

const SubjestsRouter = () => {
  const getUserData: UserData = userToken();

  if(getUserData.roles == 'Administrador'){
    return <SubjectsAdmin></SubjectsAdmin>
  } else {
    return <Subjects></Subjects>
  }
}


function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />

          <Route element={<Layout></Layout>}>
            <Route path="/home" element={<Home />} />
            <Route path="/perfil" element={<Profile />} />
            <Route path="/salones" element={<Classrooms />} />
            <Route path="/temas" element={<Topics />} />
            <Route path="/cursos" element={<SubjestsRouter />} />
            <Route path="/asistencia" element={<Asistent />} />
            <Route path="/actividades" element={<Activities />} />
            <Route path="/usuarios" element={<Users />} />
            <Route path="/alumnos" element={<Students />} />
          </Route>
        </Routes >
      </BrowserRouter>
    </>
  )
}

export default App
