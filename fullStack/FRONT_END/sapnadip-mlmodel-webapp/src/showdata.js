import React, { useEffect, useState } from "react";
import EnhancedTable from "./ShowGridData";
import RefreshRoundedIcon from "@mui/icons-material/RefreshRounded";
import EditAlertDialogSlide from "./EditRow";
import AddAlertDialogSlide from "./addData";
import ShowAnalytics from "./showAnalytics";
import "./showdata.css";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import "./showdata.css";
import productlogo from "./productLogo.svg";

function ShowData(props) {
  const time = new Date().toLocaleTimeString(); ///THIS IS USED TO STORE CURRENT TIME
  const [cDtime, setcDTime] = useState(null);
  const [cRtime, setcRTime] = useState(null);

  const handelcRTime = () => {
    let time = new Date().toLocaleTimeString();
    setcRTime(time);
  };

  const handelcDTime = () => {
    let time = new Date().toLocaleTimeString();
    setcDTime(time);
  };

  let handleRefreshBtn = async () => {
    setTimeout(() => {
      handelcRTime();
      console.log("current time inside showdata for refresh-->> " + cRtime);
    }, 900);
  };
  let handleDeleteBtn = async () => {
    handelcDTime();
    console.log("current time inside showdata for refresh-->> " + cDtime);
  };

  function DeleteAlertDialog() {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
      setOpen(true);
    };

    const handleClose = () => {
      setOpen(false);
    };

    const handleSave = () => {
      setOpen(false);
      handleDeleteBtn();
    };

    return (
      <div>
        <Button
          variant="contained"
          onClick={handleClickOpen}
          disabled={disable}
          color="error"
        >
          <div className="dltBtn">
            <DeleteForeverIcon fontSize="large" />
          </div>
        </Button>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"DELETE SELECTED"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              ARE YOU SURE ?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>CANCEL</Button>
            <Button onClick={handleSave} autoFocus>
              DELETE
            </Button>
          </DialogActions>
        </Dialog>
        
      </div>
    );
  }
  const [currTime, setCurrTime] = useState();
  let handleEdTime = (time) => {
    setCurrTime(time);
  };

  const [selectRowNumber, setSelectRowNumber] = useState(0);
  const handleTotalSelectNumber = (number) => {
    setSelectRowNumber(number);
  };
  const [disable, setdisable] = useState();
//////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////if if total selected sl_no < 0 then delete becomes inactive
  useEffect(() => {
  //  console.log(selectRowNumber);
    if (selectRowNumber == 0) {
      setdisable(true);
    } else {
      setdisable(false);
    }
  }, [selectRowNumber]);

  const [editableRow, setEditableRow] = useState([]);
  const handleEditRow = async (editableRow) => {
    await setEditableRow(editableRow);
  };

  const [EDITROW, setEDITROW] = useState(); ///using this to store the row number which needs to be edited
  useEffect(() => {
    setEDITROW(editableRow[0]);
  }, [editableRow[0]]);
 // console.log("editable row number inside show data -->> " + EDITROW);
  return (
    <div className="mainApp">
      <div className="toplogos">
        {" "}
        <img src={productlogo} alt="ABC product logo" className="productLogo" />
        <img
          src={companylogo}
          alt="HRC company logo"
          className="hrcComrpLogo"
        />
      </div>

      <nav className="navbar">
        <button onClick={handleRefreshBtn} className="rfsBtn">
          <RefreshRoundedIcon fontSize="large" color="primary" />
        </button>
        <DeleteAlertDialog />

        <EditAlertDialogSlide
          editRow={EDITROW}
          numberOfRows={selectRowNumber}
          currentTIME={handleEdTime}
        />
        <AddAlertDialogSlide
          editRow={EDITROW}
          numberOfRows={selectRowNumber}
          currentTIME={handleEdTime}
        />
        <ShowAnalytics />
      </nav>

      <div className="DataGrid">
        {" "}
        <EnhancedTable
          currentDelTime={cDtime}
          Refresh={cRtime}
          currentTime={currTime}
          totalSelectLength={handleTotalSelectNumber}
          UpdateableRow={handleEditRow}
        />
        <footer><span className='footer'><h4> <a  href="https://en.wikipedia.org/wiki/Privacy_policy" >Privacy Policy</a> | © 2022 Sapnadip Corporation. All rights reserved</h4></span></footer>
      </div>
    </div>
  );
}
export { ShowData };
