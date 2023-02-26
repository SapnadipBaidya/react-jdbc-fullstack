import * as React from "react";
import { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import EditIcon from "@mui/icons-material/Edit";
import Axios from "axios";
import "./showdata.css";



const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function EditAlertDialogSlide(props) {
  const [open, setOpen] = React.useState(false);

  let edit = props.editRow; //selcted row number form parent

  console.log("editable row_no inside editROW -->>" + edit);

  let [prevInvoiceCurrency, setprevInvoiceCurrency] = useState();
  let [prevCustPayTerms, setprevCustPayTerms] = useState();
 
  useEffect(() => {
    //console.log(edit);
    Axios.post("http://localhost:8000/sapnadip/PrevEditData", {
      sl_no: `${edit}`,
    })
      .then(function (response) {
        setprevInvoiceCurrency(
          response.data.prev_edit_detail[0].invoice_currency
        );
        setprevCustPayTerms(
          response.data.prev_edit_detail[0].cust_payment_terms
        );
      })
      .catch(function (error) {
        console.log(error);
      });
  });

  // console.log("prevCustPayTerms --> " + prevCustPayTerms);
  // console.log("prevInvoiceCurrency --> " + prevInvoiceCurrency); /// set as default value in pop up of edit to show currently stored data in db
  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
 //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  const time = new Date().toLocaleTimeString(); ///THIS IS USED TO STORE CURRENT TIME
  const [ctime, setDate] = useState(time);

  const handelTime = () => {
    let time = new Date().toLocaleTimeString();
    setDate(time);
  };
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  
  };

  const DoCommitEDIT = async (e) => {//used inside EDIT button onClick 
    await Axios.post("http://localhost:8000/sapnadip/CommitEdit", e)
      .then(function (response) {})
      .catch(function (error) {
        console.log(error);
      });
  };
  const [user, setUser] = useState({});
  let handleKeyword = async (e) => {
    const { name, value } = e.target; //since target contains key and value
    await setUser({ ...user, sl_no: edit, [name]: value });
    console.log(user);
  };

  const handleSave = async () => {
    console.log(user.invoice_currency.length + user.cust_payment_terms.length)
    if(user.invoice_currency.length > 0 && user.cust_payment_terms.length > 0 )//this is a fail safe. for none input it wont do anything
    { setOpen(false);
    await DoCommitEDIT(user);
    await setUser([]);//after edit is sucessfull removes the data from stack 
    setTimeout(() => {
      handelTime();
      console.log("current time -->> " + ctime);
      props.currentTIME(ctime);
    }, 500);}
    
    else{
     alert("no input");
    }
  };

  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //this is used to enable / disable edit button
  const [disable, setdisable] = useState();

  useEffect(() => {
    if (props.numberOfRows != 1) {
      setdisable(true);
    } else {
      setdisable(false);
    }
  }, [props.numberOfRows]);
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////Rendering starts///////////////////////////////////////////////////////////////////////////////////////////////
  return (
    <div>
      <button className="edtBTN" onClick={handleClickOpen} disabled={disable}>
        <EditIcon fontSize="large" />
      </button>

      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{`EDIT ROW `}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            <TextField
              required
              name="invoice_currency"
              id="outlined-required"
              label="Invoice Currency"
              type="text"
              onChange={handleKeyword}
              margin="dense"
              helperText={"Enter new Invoice Currency"}
              placeholder={prevInvoiceCurrency}
            />

            <TextField
              required
              name="cust_payment_terms"
              id="outlined-required"
              label="Customer Payment Terms"
              onChange={handleKeyword}
              margin="dense"
              placeholder={prevCustPayTerms}
              helperText={"Enter new terms code"}
              variant="filled"
            />
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>CANCEL</Button>
          <Button onClick={handleSave}>EDIT</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
