import Loginpage from './components/auth/login.js';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import React from 'react';
import TaskList from './components/home/tasks.js';
import AddTask from './components/home/addtask.js';
import NavbarHome from './components/home/home-component/navbar.js';
import { useNavigate } from 'react-router-dom';
import {useCookies} from 'react-cookie';



function App() {
  const nav = useNavigate();
  const [cookies, setCookies] = useCookies(['token']);
  return (
    <>
    <Routes>
      <Route path='/login' element={<Loginpage/>}/>

      <Route path='' element={<><NavbarHome/><TaskList/></>}>
            <Route path='/tasks' element={<><NavbarHome/><TaskList/></>}/>
      </Route>

      <Route path='/add-task' element={<><NavbarHome/><AddTask operation="add" /></>}/>

      <Route path='/:id/update-task' element={<AddTask operation="update"/>}/>

    </Routes>
    </>
    
  );
}

export default App;
