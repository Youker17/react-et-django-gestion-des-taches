import React, { useEffect, useRef, useState } from "react";
import { Button, Card, Text, Row, Grid, Link } from "@nextui-org/react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Cookies from "react-cookie";

export default function TaskList(){
    const token = useSelector(s=>s.Token);
    const [tasks, setTasks] = useState([]);
    const navigate = useNavigate();
    const [expanddata, setExpanddata] = useState({content:"", date:'',id:null, isVisible:false});
    const grand_parent = useRef(null);



    const expand_card = ()=>{return(
    <div ref={grand_parent} style={{zIndex:-1,
                                    width:"100%",
                                    height:"100vh",
                                    backdropFilter:"blur(7px)",
                                    position:"fixed", overflowY:"hidden",
                                    backgroundColor: 'rgba(0, 0, 0, 0.556)', 
                                    display:"none"}}>
        <Card css={{position:"relative",zIndex:1000,transform:"translate(-50%,-50%)",top:'50%',left:"50%",width:"50%",height:"auto", overflowY:"hidden"}}>
            <Card.Body >
            <Text h1 size={20} css={{textGradient: "45deg, $blue600 -20%, $pink600 50%",}} weight="bold">{expanddata.content}</Text>
            <Text size={10}>{expanddata.date}</Text>
                <Row css={{ justifyContent:'space-around'}}>

                            <Button  auto shadow color="success" onClick={(event)=>{setExpanddata({content:"", date:'',id:null, isVisible:false});deleteTask(event,expanddata.id)}}>Done</Button>

                            <Button  auto shadow color='warning' onClick={(event)=>{navigate(`/${expanddata.id}/update-task`)}}>Update</Button>

                            <Button  auto shadow color='primary' onClick={(event)=>{setExpanddata({content:"", date:'',id:null, isVisible:false})}}>chrink</Button>

                </Row>

            </Card.Body>
        </Card>

    </div>)}




    
    const getdata = () => axios({url:'http://localhost:8000/api/tasks/',
                        method:'GET',
                        headers:{
                            Authorization:`token ${token}`
                        }
                    }).then(response =>{
                            setTasks(response.data['data'])
                            console.log(response.data['data'])
                        }).catch((error)=>{console.log(token);navigate("/login");console.error(error);});

    const deleteTask = (e,id)=> {        
        axios({url:`http://localhost:8000/api/tasks/${id}/`,
                        method:'DELETE',
                        headers:{
                            Authorization:`token ${token}`
                        }
                    }).then(response =>{
                            console.log(response.data)
                        }).catch((error)=>{console.error(error);});
                        // navigate("/tasks");
                        setTasks(tasks.filter(obj=>obj.id !== id));
                        
                    }
    
    useEffect(()=>{
        getdata();
        if (expanddata.isVisible) {
            grand_parent.current.style.zIndex = 10;
            grand_parent.current.style.display = "block";
        } else {
            grand_parent.current.style.zIndex = -1;
            grand_parent.current.style.display = "none";
        }
    }, [expanddata]);
    console.log(tasks);
    return(
        <>
        
        {expand_card()}
        <Grid.Container gap={2} >
            {tasks.map((task)=>{
                return(
                    <Grid sm={5} md={2} >
                <Card css={{mw: "200px",maxWidth:"50vh",maxHeight:"40vh",fg:'White', bg:'$accents3', margin:'10px', }} 
                key={task.id}>
                    <Card.Body css={{overflowX:'hidden'}}>
                    {task.content.length <= 18 ? <Text h1 size={20} css={{textGradient: "45deg, $blue600 -20%, $pink600 50%",}} weight="bold">
                        {task.content}
                    </Text> : <Row><Text h1 size={20} css={{textGradient: "45deg, $blue600 -20%, $pink600 50%",}} weight="bold">
                        {task.content.slice(0,17)}
                    <Link  color="primary"  css={{textGradient: "45deg, $blue600 -20%, $blue600 50%"}} weight="light"  onClick={(e)=>{setExpanddata({content:task.content, date:new Date(task.date).toISOString().substring(0, 10), id:task.id, isVisible:true});e.preventDefault()}} href=''>...</Link></Text></Row>}
                        <Text size={10}>{new Date(task.date).toISOString().substring(0, 10)}</Text>
                    <Card.Footer css={{overflowX:'hidden'}}>
                        <Button  auto css={{marginRight:"$10"}} size="sm" shadow color="success" onClick={(event)=>{deleteTask(event,task.id); setExpanddata({content:"", date:'',id:null, isVisible:false})}}>Done</Button>
                        <Button  auto css={{marginLeft:"$10"}} size="sm" shadow color='warning' onClick={(event)=>{navigate(`/${task.id}/update-task`);}}>Update</Button>
                        
                    </Card.Footer>
                    </Card.Body >
                </Card>
                </Grid>
                )
            })}        
        </Grid.Container>
        </>
    )
    };