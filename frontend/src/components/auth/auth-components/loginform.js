import React, { useState } from 'react';
import {
  Card,
  Spacer,
  Button,
  Text,
  Input,
  Row,
  Checkbox,
  Container,
} from '@nextui-org/react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';



const Mail = ({ fill, size, height, width, ...props }) => {
    return (
      <svg
        width={size || width || 24}
        height={size || height || 24}
        viewBox="0 0 24 24"
        {...props}
      >
        <g
          fill="none"
          stroke={fill}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
        >
          <path d="M12 20.5H7c-3 0-5-1.5-5-5v-7c0-3.5 2-5 5-5h10c3 0 5 1.5 5 5v3" />
          <path d="M17 9l-3.13 2.5a3.166 3.166 0 01-3.75 0L7 9M19.21 14.77l-3.539 3.54a1.232 1.232 0 00-.3.59l-.19 1.35a.635.635 0 00.76.76l1.35-.19a1.189 1.189 0 00.59-.3l3.54-3.54a1.365 1.365 0 000-2.22 1.361 1.361 0 00-2.211.01zM18.7 15.28a3.185 3.185 0 002.22 2.22" />
        </g>
      </svg>
    );
  };









const Password = ({ fill, size, height, width, ...props }) => {
    return (
      <svg
        width={size || width || 24}
        height={size || height || 24}
        viewBox="0 0 24 24"
        {...props}
      >
        <g fill={fill}>
          <path d="M18.75 8v2.1a12.984 12.984 0 00-1.5-.1V8c0-3.15-.89-5.25-5.25-5.25S6.75 4.85 6.75 8v2a12.984 12.984 0 00-1.5.1V8c0-2.9.7-6.75 6.75-6.75S18.75 5.1 18.75 8z" />
          <path d="M18.75 10.1a12.984 12.984 0 00-1.5-.1H6.75a12.984 12.984 0 00-1.5.1C2.7 10.41 2 11.66 2 15v2c0 4 1 5 5 5h10c4 0 5-1 5-5v-2c0-3.34-.7-4.59-3.25-4.9zM8.71 16.71A1.052 1.052 0 018 17a1 1 0 01-.38-.08 1.032 1.032 0 01-.33-.21A1.052 1.052 0 017 16a1 1 0 01.08-.38 1.155 1.155 0 01.21-.33 1.032 1.032 0 01.33-.21 1 1 0 011.09.21 1.155 1.155 0 01.21.33A1 1 0 019 16a1.052 1.052 0 01-.29.71zm4.21-.33a1.155 1.155 0 01-.21.33A1.052 1.052 0 0112 17a1.033 1.033 0 01-.71-.29 1.155 1.155 0 01-.21-.33A1 1 0 0111 16a1.033 1.033 0 01.29-.71 1.047 1.047 0 011.42 0A1.033 1.033 0 0113 16a1 1 0 01-.08.38zm3.79.33a1.014 1.014 0 01-1.42 0 1.014 1.014 0 010-1.42 1.047 1.047 0 011.42 0c.04.05.08.1.12.16a.556.556 0 01.09.17.636.636 0 01.06.18 1.5 1.5 0 01.02.2 1.052 1.052 0 01-.29.71z" />
        </g>
      </svg>
    );
  };



export default function Loginform() {
    const [username, setUsername]= useState();
    const [password, setPassowrd]= useState();
    // const token = useSelector((state)=>state.Token);
    const dispatch= useDispatch();
    const navigate = useNavigate();
    


    const login = ()=>{
      axios({
        method:"POST",
        url:"http://localhost:8000/api-auth/login/",
        data:{
          "username":username,
          "password":password
        }}).then((res)=>{
          dispatch({type:"set", Token:res.data["token"]})
          // setCookies('token', res.data['token']);
          console.log(res.data['token'])
          navigate('/tasks')
        }).catch((er, msg)=>console.error(er, msg))
    }
        

    return (
      <form>
        <Container
          display="flex"
          alignItems="center"
          justify="center"
          css={{ minHeight: '100vh' }}
        >
          <Card css={{ mw: '420px', p: '20px' }} variant="bordered">
            <Text
              size={24}
              weight="bold"
              css={{
                as: 'center',
                mb: '20px',
              }}
            >
              ToDo-Login
            </Text>
            <Input
              value={username}
              onChange={(e)=>setUsername(e.target.value)}
              clearable
              labelLeft="username" 
              bordered            
              fullWidth
              name='username'
              color="primary"
              size="lg"
              placeholder="username"
              // contentLeft={<User fill="currentColor" />}
            />
            <Spacer y={1} />
            <Input.Password
              value={password}
              onChange={(e)=>setPassowrd(e.target.value)}
              clearable
              bordered
              fullWidth
              color="primary"
              size="lg"
              name='password'
              placeholder="Password"
              contentLeft={<Password fill="currentColor" />}
              css={{ mb: '6px' }}
            />
            <Spacer y={1} />
            <Button onClick={login}>Sign in</Button>
          </Card>
        </Container>
      </form>
    );
  }