import React, { useState, history, useEffect } from "react";
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
import axios from "axios";
import {useNavigate, useParams}  from "react-router-dom";
import { useSelector } from "react-redux";



export default function AddTask(props){
    const token = useSelector(s=>s.Token);

    const [message, setMessage] = useState({
      msg:'',
      type:""
    });
    const [showmessage, setSM] = useState(false)
    const navigate = useNavigate();
    const taskid = useParams();

    

    const [formValues, setFormValues] = useState({
                                                    content:'',
                                                    date:""
                                                })
    
    useEffect(()=>{
    if (props.operation==='update'){
      console.log(taskid.id)
      axios({
        url:`http://localhost:8000/api/tasks/${taskid.id}/`,
        method:'GET',
        headers:{
          Authorization:`token ${token}`
      }
      }).then((response)=>{
        console.log(response.data)
        setFormValues({
          content:response.data['content'],
          date:new Date(response.data['date']).toISOString().substring(0, 10),
          owner:response.data['owner']
        })
      })
    }
  },[props.operation,taskid.id]);






    // const getCookie = (name)=> {
    //         if (!document.cookie) {
    //             return null;
    //         }

    //         const xsrfCookies = document.cookie.split(';')
    //             .map(c => c.trim())
    //             .filter(c => c.startsWith(name + '='));

    //         if (xsrfCookies.length === 0) {
    //             return null;
    //         }
    //         return decodeURIComponent(xsrfCookies[0].split('=')[1]);
    //                         }
    const postdata = (e)=>{
      if (props.operation === 'add'){
        console.log(formValues);
        setSM(true);
        axios({
            url:'http://localhost:8000/api/tasks/',
            method:'POST',
            headers:{
              Authorization:`token ${token}`
          },
            // headers:{
            //      xsrfCookies:getCookie('csrftoken'),
            //  },
            data: formValues}).then((msg)=>{console.log(msg.data['status']);setMessage({msg:msg.data['status'], type:"success"});setTimeout(()=>{navigate('/tasks')},500);}).catch((msg)=>{console.log(msg.response.data['status']);setMessage({msg:msg.response.data['status'], type:"error"})})
            //  navigate('/tasks');
            //  window.location.reload();
        }
      else{
        console.log(formValues);
        setSM(true);
        axios({
            url:`http://localhost:8000/api/tasks/${taskid.id}/`,
            method:'PUT',
            headers:{
              Authorization:`token ${token}`
          },
            // headers:{
            //      xsrfCookies:getCookie('csrftoken'),
            //  },
             data: formValues}).then((msg)=>{console.log(msg.data['status']);setMessage({msg:msg.data['status'], type:"success"});setTimeout(()=>{navigate('/tasks')},500);}).catch((msg)=>{console.log(msg.response.data['status']);setMessage({msg:msg.response.data['status'], type:"error"})})}
            
            //  window.location.reload();
      
    }
    const onChangeHandler = (e)=>{
       const {name,value} = e.target
        setFormValues({
        ...formValues,
        [name]:value
       });
    }


    return(
    <div>
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
            {props.operation} Task
          </Text>
          <Input
          name="content"
            required
            clearable
            underlined
            fullWidth
            color="primary"
            size="lg"
            placeholder="content"
            value={formValues.content}
            onChange={onChangeHandler}
          />
          <Spacer y={1} />
          <Input
            required
            name="date"
            clearable
            underlined
            fullWidth
            color="primary"
            size="lg"
            value={formValues.date}
            placeholder="date"
            css={{ mb: '6px' }}
            onChange={onChangeHandler}
            type='date'
          />
          <Spacer y={1} />
          {
        (showmessage && message.type === "success" )?<Card css={{backgroundColor:"$green200", backdropFilter:'blur(19px)', marginBottom:"$10"}} blockquote><Card.Body>{message.msg}</Card.Body></Card>:((showmessage && message.type === "error" )?<Card css={{backgroundColor:"$red200", backdropFilter:'blur(19px)', marginBottom:"$10"}} blockquote><Card.Body>{message.msg}</Card.Body></Card>:<Spacer y={3}/>)
         }
          <Button onClick={postdata}>{props.operation}</Button>
        </Card>
      </Container>
      
    </div>
  );
}

