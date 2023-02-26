import * as React from "react";
import { useState} from "react";
import { TextField } from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import AddIcon from "@mui/icons-material/Add";
import Axios from "axios";
import "./showdata.css";
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AddAlertDialogSlide(props) {
  const [open, setOpen] = React.useState(false);
  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  const time = new Date().toLocaleTimeString(); ///THIS IS USED TO STORE CURRENT TIME
  const [ctime, setDate] = useState(time);

  const handelTime = () => {
    let time = new Date().toLocaleTimeString();
    setDate(time);
  };
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
   
  };

  const DoCommitADD = async (e) => {
    await Axios.post("http://localhost:8000/sapnadip/register", e)
      .then(function (response) {})
      .catch(function (error) {
        console.log(error);
      });
  };

  const handleSave = async () => {
    if(user.cust_number.length >0)
    {setOpen(false);
  
    await DoCommitADD(user);
    setUser([]);//this is done to remove previous data from stack

    setTimeout(() => {
      handelTime();
      // console.log("current time -->> " + ctime); //here i have used this so that useEffect can work in another component  everytime adddata words
      props.currentTIME(ctime);
    }, 500);}
    else{
      alert("provide correct customer number")
    }
  };

  const [user, setUser] = useState({});
  let handleKeyword = (e) => {
    const { name, value } = e.target; //since target contains key and value
    setUser({ ...user, [name]: value });
    console.log(user);
  };
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  return (
    <div>
      <button className="AddBtn" onClick={handleClickOpen}>
        <AddIcon fontSize="large" />
      </button>

      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"ADD DATA"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            <TextField
              name="business_code"
              id="outlined-basic"
              label="Business Code"
              variant="outlined"
              onChange={handleKeyword}
              margin="dense"
            />
            <TextField
              required
              id="outlined-required"
              name="cust_number"
              label="Customer Number"
              variant="outlined"
              onChange={handleKeyword}
              margin="dense"
            />

            <TextField
              name="clear_date"
              id="outlined-basic"
              label="Clear Date"
              variant="outlined"
              onChange={handleKeyword}
              margin="dense"
              type="date"
            />
            <TextField
              name="buisness_year"
              id="outlined-basic"
              label="Business Year"
              variant="outlined"
              onChange={handleKeyword}
              margin="dense"
            />
            <TextField
              name="doc_id"
              id="outlined-basic"
              label="Document Id"
              variant="outlined"
              onChange={handleKeyword}
              margin="dense"
            />
            <TextField
              name="posting_date"
              id="outlined-basic"
              label="Posting Date"
              variant="outlined"
              onChange={handleKeyword}
              margin="dense"
              type="date"
            />
            <TextField
              name="document_create_date"
              id="outlined-basic"
              label="Document Create Date"
              variant="outlined"
              onChange={handleKeyword}
              margin="dense"
              type="date"
            />
            <TextField
              name="due_in_date"
              id="outlined-basic"
              label="Due Date"
              variant="outlined"
              onChange={handleKeyword}
              margin="dense"
              type="date"
            />
            <TextField
              name="invoice_currency"
              id="outlined-basic"
              label="Invoice Currency"
              variant="outlined"
              onChange={handleKeyword}
              margin="dense"
            />
            <TextField
              name="document_type"
              id="outlined-basic"
              label="Document Type"
              variant="outlined"
              onChange={handleKeyword}
              margin="dense"
            />
            <TextField
              name="posting_id"
              id="outlined-basic"
              label="Posting ID"
              variant="outlined"
              onChange={handleKeyword}
              margin="dense"
            />
            <TextField
              name="total_open_amount"
              id="outlined-basic"
              label="Total open amount"
              variant="outlined"
              onChange={handleKeyword}
              margin="dense"
            />
            <TextField
              name="baseline_create_date"
              id="outlined-basic"
              label="Baseline date"
              variant="outlined"
              onChange={handleKeyword}
              margin="dense"
              type="date"
            />
            <TextField
              name="cust_payment_terms"
              id="outlined-basic"
              label="Customer Payment Terms"
              variant="outlined"
              onChange={handleKeyword}
              margin="dense"
            />
            <TextField
              name="invoice_id"
              id="outlined-basic"
              label="Invoice ID"
              variant="outlined"
              onChange={handleKeyword}
              margin="dense"
            />
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>CANCEL</Button>
          <Button onClick={handleSave}>ADD</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
