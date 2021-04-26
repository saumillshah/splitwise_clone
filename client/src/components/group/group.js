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
import {Link, useLocation} from 'react-router-dom'
import { useHistory } from "react-router";
// import AddComment from "./comments";
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

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

  const Group=()=> {
    
    const classes = useStyles();
    const location = useLocation();
    const [show, setShow] = useState(false);
    const group_id = location.pathname.split('/')[2];
    const [userList, setuserList]= useState([])
    const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [description, setDescription] = useState("");
   const [amount, setAmount] = useState("");


    const data = {
      group_id: group_id,
      user_id: localStorage.getItem("user_id")
    }
    
    const history = useHistory();
   
    const Leave=()=>{
      axios
      .post(`${ApiRequest}/group/leave`,data)
      .then((response) => {
        console.log("eref",response)
        if(response.data === "Clear dues"){
       alert("Please clear dues")}
       else{
         history.push('/mygroup')
       }
      })
      }

      useEffect(()=>{
        recentactivity();
       
    },[])


    const handleSave = (e) => {

      const data1 = {
        email: localStorage.getItem("email"),
        paidby: localStorage.getItem("user_id"),
        description: description,
        amount:amount,
      }
      const dataarray = [];
      dataarray.push(data1)
  
      const splitexpense= {
        group_id: group_id,
        dataarray:dataarray
      }
      e.preventDefault();
      axios
      .post(`${ApiRequest}/expense/split`, splitexpense)
      .then((response) => {
        console.log(response)
      })
      recentactivity();
      setShow(false);
    }


      const recentactivity = () =>{
        axios.post(`${ApiRequest}/group/getgroupdetails`,data)
        .then((response)=>{
          console.log(response.data)
          setuserList(response.data)
        })
      }

          
        return ( 
            <div>  
            <DashboardNav></DashboardNav>
            <br/>
            <br/>
            <div className="container">
            
            <Grid container spacing={50}>
           
              <Grid item s>
            
                <Paper className={classes.paper}></Paper>
              </Grid>
              <Grid item xs>
             
              <div class="container">
              <div class="row">
                <div class="col-sm">
                <div>
   

                <div className="container">
                     
                   
                      <Button variant="primary" onClick={handleShow}>
                       Add Expense
                      </Button>
                   
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
                                <h4>Add Expense</h4>
                              </div>
                             
                            </div>
                          
                              <div class="form-group">
                                <label>Description</label>
                                <input id="description" class="form-control" type="text" onChange={(e)=>setDescription(e.target.value)} />
                                <p id="error-description" class="text-danger"></p>
                              </div>
                             
                              <div class="form-group">
                                <label>Amount</label>
                                <input pattern="^[0-9]*$" id="expense-amount" class="form-control" type="number" onChange={(e)=>setAmount(e.target.value)} />
                                <p id="error-expense-amount" class="text-danger"></p>
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
                </div>
                <div class="col-sm">
                <Button variant="primary" onClick={Leave}>
                Leave Group
               </Button>
                </div></div></div>
                <br/>
                <nav class="navbar navbar-light bg-light">
               <NavbarBrand>Recent Activity</NavbarBrand> 
              </nav>
            

              {userList.map((item)=>(
              <Accordion >
              
              <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography className={classes.heading}> {item.paidby.name} paid ${item.amount} for {item.description} <br/> {item.createdAt}   
              
              
          
              
              </Typography>
            </AccordionSummary>
           
           
     
            

              
            
              <AccordionDetails>
              
                 <Typography>
                 {item.message}
                 <Link
              className="list-group-item list-group-item-action"
              style={{ width: "80%", marginRight: "10px" }}
              to={`/comment/${group_id}/${item._id}`}
            >
              show comments
            </Link> 
                
                </Typography>
              
               
              </AccordionDetails>
          
    
              
          
             </Accordion>))}
    

              </Grid>
              
            </Grid>
            </div>
          </div>

        );
    }


 
export default Group;