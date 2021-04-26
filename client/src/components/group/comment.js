import React, { useEffect, useState } from 'react';
// import { Redirect } from 'react-router';
import DashboardNav from '../Dashboard/DashboardNav';
// import SideNavPage from '../sidebar';
import { makeStyles } from '@material-ui/core/styles';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Modal } from 'react-bootstrap';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { NavbarBrand } from 'react-bootstrap';
import axios from "axios";
import ApiRequest from "../../backendRequestAPI"
import {useLocation} from 'react-router-dom'
import SideNavPage from '../Dashboard/sidebar';
// import { useHistory } from "react-router";
// import AddComment from "./comments";
// import Accordion from '@material-ui/core/Accordion';
// import AccordionSummary from '@material-ui/core/AccordionSummary';
// import AccordionDetails from '@material-ui/core/AccordionDetails';
// import Typography from '@material-ui/core/Typography';
// import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const useStyles = makeStyles({
    root: {
      minWidth: 275,
    },
    bullet: {
      display: 'inline-block',
      margin: '0 2px',
      transform: 'scale(0.8)',
    },
    title: {
      fontSize: 14,
    },
    pos: {
      marginBottom: 12,
    },
  });

  const Comment=()=> {
    const [description, setDescription] = useState("");

    const [show, setShow] = useState(false);
   const handleClose = () => setShow(false);
   const handleShow = () => setShow(true);
    const classes = useStyles();
    const location = useLocation();
    const group_id = location.pathname.split('/')[2];
    const expense_id = location.pathname.split('/')[3];
    // const [userList, setuserList]= useState([])
    const [comment, setComment]= useState([])
    // const data = {
    //   group_id: group_id,
    //   user_id: localStorage.getItem("user_id")
    // }
    // const history = useHistory();
    const expenseID ={
        expenseID: expense_id
      }
  console.log(expense_id)

      useEffect(()=>{
        // recentactivity();
        getComments();
    },[])

    const handleSave = (e) => {

        const data = {
          group_id: group_id,
          expense_id: expense_id,
          
          message: description,
          userId: localStorage.getItem("user_id"),
          name: localStorage.getItem("name"),
        }
       
        e.preventDefault();
        axios.post(`${ApiRequest}/comment/addComment`,data)
        .then((response) => {
          console.log(response)
         getComments();
        })
      
        setShow(false);
      }
    

      const getComments= () =>{
      
      
        axios.post(`${ApiRequest}/comment/getComment`,expenseID)
        .then((response)=>{
          console.log(response)
          setComment(response.data)
        })
       }
    
       const deleteComment= (commentid) =>{
         const data = {
            commentid:commentid,
           }
        axios.post(`${ApiRequest}/comment/deleteComment`,data)
        .then((response)=>{
          console.log(response)
          getComments();
        })
       }
          
        return ( 
            <div>  
            
            <DashboardNav></DashboardNav>
            <div className="container">
            <br/>
            <br/>
            <Grid container spacing={50}>
          
              <Grid item s>
            
                <Paper className={classes.paper}>
                <SideNavPage></SideNavPage></Paper>
              </Grid>
              <Grid item xs>
             
              <div class="container">
              <div class="row">
                <div class="col-sm">
               
                </div>
                <div class="col-sm">
              
                </div></div></div>
                <br/>
                <nav class="navbar navbar-light bg-light">
               <NavbarBrand>Comments</NavbarBrand> 
               <div>
   

               <div className="container">
                    
                  
                     <button class="btn btn-link" onClick={handleShow}>
                      Add Comment
                     </button>
                  
                     <Modal size="lg" show={show} onHide={handleClose}>
                     <div class="container mt-4">
                     <form class="form" id="expense-form">
                       <Modal.Header closeButton>
               
                         <Modal.Title class="text-center text-info">SplitWise</Modal.Title>
                       </Modal.Header>
                       <Modal.Body>
                       
                     
                       <div class="row">
                         <div class="col-md-2"></div>
                         <div class="col-md-8">
                           <div class="row">
                             <div class="col-md-6">
                               <h4>Add comment</h4>
                             </div>
                            
                           </div>
                         
                             <div class="form-group">
                               <label>Description</label>
                               <input id="description" class="form-control" type="text" onChange={(e)=>setDescription(e.target.value)} />
                               <p id="error-description" class="text-danger"></p>
                             </div>
                            
                            
                             <div class="form-group">
                               <p id="error-split-type" class="text-danger"></p>
                             </div>
                            
               
                           <div id="error-message" style={{display: "none"}} class="mt-4 alert alert-danger"></div>
                           <div id="success-message" style={{display: "none"}} class="mt-4 alert alert-success"></div>
                           <br/>
                         </div>
                         <div class="col-md-2"></div>
                       </div>
                   
                       </Modal.Body>
                       <Modal.Footer>
                         <Button variant="secondary" onClick={handleClose}>
                           Close
                         </Button>
                         <Button variant="primary" type="submit" onClick={handleSave}>
                           Save It!
                         </Button>
                         </Modal.Footer>
                         </form>
                         </div>
                     </Modal>
                   </div>
                 
                     </div>
              </nav>
            

        
     
            
            {
              comment.map((item)=>
              
            <div>
            <div className="list-group list-group-horizontal">
            <li
              className="list-group-item"
              style={{
                fontFamily: "sans-serif",
                fontSize: "20px",
                width: "100%",
              }}
            >
              <h5>
                 {item.name} :</h5> <h7>{item.message}</h7> 
                 
                  <button
                  class="btn btn-link"
                 onClick={() => deleteComment(item._id)}
               >
                 Delete
               </button>
   </li></div>
               </div>
               
 
          )
            }
          

              </Grid>
              
            </Grid>
            </div>
          </div>

        );
    }


 
export default Comment;