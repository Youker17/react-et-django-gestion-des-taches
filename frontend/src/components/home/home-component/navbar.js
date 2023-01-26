import React from "react";
import { Navbar, Button, Text } from "@nextui-org/react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";





export default function NavbarHome(){
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const token = useSelector(e=>e.Token);




    const logout = ()=>{
          dispatch({type:"destroy"});
          navigate('/login');
          axios({
            url:"http://localhost:8000/api-auth/logout/",
            method:"POST",
            headers:{
              Authorization:`token ${token}`
            }
          })
    }

    return(
        <Navbar isBordered variant='floating'>
        <Navbar.Brand>
          <Text b color="inherit" hideIn="xs">
            You-Ker
          </Text>
        </Navbar.Brand>
        <Navbar.Content hideIn="xs">
          <Button light onClick={()=>{navigate('/tasks')}}>Tasks</Button> 
          <Navbar.Item>
            <Button auto flat onPress={()=>{navigate('/add-task')}}>Add Task</Button>
          </Navbar.Item>
        </Navbar.Content>
        <Navbar.Content>
          <Button light onClick={logout}>logout</Button>
        </Navbar.Content>
      </Navbar>
    )


}