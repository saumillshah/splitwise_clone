import React, { useEffect, useState } from "react";
import { Redirect } from "react-router";
import DashboardNav from "./DashboardNav";
import SideNavPage from "./sidebar";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";

import CardContent from "@material-ui/core/CardContent";
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
// import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";

import axios from "axios";
import ApiRequest from "../../backendRequestAPI";
import { Navbar, Nav } from "react-bootstrap";

const useStyles = makeStyles({
  root: {
    minWidth: 300,
  },
  bullet: {
    display: "inline-block",
    margin: "0 3px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

export default function Dashboard() {
  const [Total, setTotal] = useState("");
  const [Total1, setTotal1] = useState("");
  const [Total2, setTotal2] = useState("");
  // const [getdetails, setgetdetails] = useState([]);
  // const [userbalanceowes, setuserbalanceowes] = useState("");
  const [userList, setuserList] = useState([]);
  console.log(localStorage.getItem("user_id"));

  useEffect(() => {
    setTotal(Total1-Total2);
   data();
     
  },[Total1, Total2]);
 


 
  const data = ()=>{
    axios
    .post(`${ApiRequest}/expense/getSummary`, {
      user1: localStorage.getItem("email"),
    })
    .then((response) => {
      console.log("data is", response.data);
      const data1 = response.data;

      console.log(data1[0])
      if(data1.length===0){
        setTotal1(0)
      }else{
        setTotal1(data1[0].takeAmount)
      }
      //  setTotal(data1[0][0].total)
     
      //  setTotal2(data1[0][0].total)
      })
    // });

  axios
    .post(`${ApiRequest}/expense/getSummary`, {
      user2: localStorage.getItem("email"),
    })
    .then((response) => {
      console.log("data is", response.data);
      const data1 = response.data;

      console.log(data1[0])
      if(data1.length===0){
        setTotal2(0)
      }else{
        setTotal2(data1[0].giveAmount)
      }
      //  setTotal(data1[0][0].total)
    
      //  setTotal2(data1[0][0].total)
    });
    const Data = {
      email: localStorage.getItem("email"),
    };
    axios.defaults.withCredentials = true;
    console.log(Data)
    axios.post(`${ApiRequest}/group/creategroup/getUser`, Data)
        .then(response =>{ 
          console.log(response.data)
          setuserList(response.data)
        }) 
       
        .catch(error => {
            if (error.response && error.response.data) {
               console.log(error)
            }
        });
  }


  const onSettleup = (email) =>{
    axios.defaults.withCredentials = true;
    const user = {user2:localStorage.getItem("email"),user1:email}
    axios
    .post(`${ApiRequest}/expense/settleup`, user)
    .then((response) => {
      console.log("Response after Axios call", response);
      if (response.status === 200) {
        alert("Settled up!");
        data();
      }
    })
    .catch((error) => {
      console.log("error occured while connecting to backend:", error);
    });
  }

 

  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;

  let redirectVar = null;
  if (localStorage.getItem("user_id") == null) {
    redirectVar = <Redirect to="/" />;
  }
  return (
    <div>
      {redirectVar}

      <DashboardNav></DashboardNav>
      <br/>
      <br/>
      <div class="container">
        <Grid container spacing={100}>
          <Grid item s>
            <Paper className={classes.paper}>
              <SideNavPage></SideNavPage>
            </Paper>
          </Grid>
          <Grid item xs>
            <div className="landing">
              {" "}
              <Navbar bg="light" expand="lg" style={{ flex: 1 }}>
                <Navbar.Brand margin="5px ">Dashboard</Navbar.Brand>
                <Nav className="ms-auto">
                  <button
                    class="btn btn-outline-success btn-space"
                    type="button"
                  >
                    Add Bill
                  </button>
                  &nbsp;
                  <button
                    class="btn btn-outline-success btn-space"
                    type="button"
          
                  >
                    Summary
                  </button>
                </Nav>
                <br />

                <Nav className="mx-auto">&nbsp;&nbsp;</Nav>
              </Navbar>
            </div>
            <Paper className={classes.paper}>
              {" "}
              <Card className={classes.root}>
                <CardContent>
                  <Typography variant="h5" component="h2">
                    {bull}Total balance : ${Total}
                  </Typography>
                </CardContent>
              </Card>
            </Paper>

            <br />

            <Paper className={classes.paper}>
              {" "}
              <Card className={classes.root}>
                <CardContent>
                  <Typography variant="h5" component="h2">
                    {bull}You are Owed : ${Total1}
                  </Typography>
                </CardContent>
              </Card>
            </Paper>

            <br />
            <Paper className={classes.paper}>
              {" "}
              <Card className={classes.root}>
                <CardContent>
                  <Typography variant="h5" component="h2">
                    {bull}You owe : ${Total2}
                  </Typography>
                </CardContent>
              </Card>
            </Paper>
            <br />
            <div className={classes.root}>
            <div>
            <Accordion>
            <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography className={classes.heading}>Settle up</Typography>
          </AccordionSummary>
            {
            userList.map((item)=>
            
          
            <AccordionDetails>
            
               <Typography>
               {item.name}  <button
               className="btn btn-outline-success my-2 my-sm-0"
               onClick={() => onSettleup(item.email)}
             >
               Settle
             </button>
              </Typography>
            
             
            </AccordionDetails>
        )
            
          } 
           </Accordion>
            </div>
      
    </div>
            
          </Grid>
         
        </Grid>
      </div>
    </div>
  );
}

// export default Dashboard;
