import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { TextField } from "@mui/material";
import { useState, useEffect } from "react";
import CloseIcon from "@mui/icons-material/Close";
import Axios from "axios";
import "./showdata.css";
import Barchart from "./charts/barchart";
import Piechart from "./charts/piechart";

export default function AlertDialog() {
  const [open, setOpen] = React.useState(false);
  const [trigger, setTrigger] = React.useState(false);

  const handleClickOpen = () => {//default mui pop-up function helps in opening dialog box onclick 
    setOpen(true);
  };

  //default mui pop-up function helps in closing dialog box onclick 
  const handleCancel = () => {
    setOpen(false);
  };
  const handlesubmit = async () => {//this helps to make the api work by calling the callbackend function
    setOpen(false);
    await callbackend(data); //here async await it used because setbardata was working before this function is called
    setTrigger(true);
    setData([])//used of clear previous data from stack
    // openPopupAnalyticsView
  };

  const time = new Date().toLocaleTimeString(); ///THIS IS USED TO STORE CURRENT TIME
  const [ctime, setcTime] = useState(null);
  const [barData, setBarData] = useState();//both of these are used to set and map the data to the respective charts
  const [pieData, setPieData] = useState();

  let ivc = [{ c: "usd" }, { c: "cad" }];// <-- this is used to give labels in pie chart
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  const callbackend = async (e) => {//used for calling analytics servlet
    await Axios.post("http://localhost:8000/sapnadip/analytics", e)
      .then(function (response) {
        setBarData(response.data.bar_graph_details);
        setPieData(response.data.pie_chart_details);
      })
      .catch(function (error) {
        console.log(error);
      });
    await setcTime(time);
  };
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  const [data, setData] = useState({});
  let handleKeyinput = (e) => {
    const { name, value } = e.target; //since target contains key and value
    setData({ ...data, [name]: value });
   // console.log(data);
  };

  const [userBarData, setUserBarData] = useState();
  const [userPieData, setUserPieData] = useState();
  useEffect(() => {
    if (ctime != null) {
      //this is used so that the undefined error goes away for the 1st time component loads
      setUserBarData({//default chart js mapping structure i just edited it 
        labels: barData.map((data) => data["Bcode"]),
        datasets: [
          {
            label: "NUMBER OF CUSTOMERS",
            backgroundColor: "rgba(179, 49, 129, 0.822)",
            data: barData.map((data) => data["cust_num_count"]),
          },
          {
            label: "TOTAL OPEN AMOUNT",
            backgroundColor: "rgba(57, 227, 240, 0.637)",
            data: barData.map(
              (data) => data["total_open_amount_sum"] / 1000000
            ),
          },
        ],
      });

      setUserPieData({
        labels: ivc.map((data) => data["c"]),
        datasets: [
          {
            label: "USD vs CAD",
            data: [
              pieData.map((data) => data["total_open_amount_usd"]),
              pieData.map((data) => data["total_open_amount_cad"]),
            ],
            backgroundColor: ["rgb(255, 99, 132)", "rgb(54, 162, 235)"],
            hoverOffset: 4,
          },
        ],
      });
    }
  }, [ctime]);//i am using this to avoid infinte rerenders 

  return (
    <div className="analytics">
      <div className="anlBTN">
        {" "}
        <button className="anlBTN" onClick={handleClickOpen}>
          <img src={sapilogo} alt="sapiLOGO" className="sapilogo" />

          <div className="anlBTNtxt">ANALYTICS</div>
        </button>
      </div>

      <Dialog
        open={open}
        onClose={handleCancel}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"ANALYTICS"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Clear Date
            <br />
            <TextField
              name="clear_date_start"
              id="outlined-basic"
              label="clear date start"
              variant="outlined"
              onChange={handleKeyinput}
              margin="dense"
              type="date"
            />
            <TextField
              name="clear_date_end"
              id="outlined-basic"
              label="clear date end"
              variant="outlined"
              onChange={handleKeyinput}
              margin="dense"
              type="date"
            />
            <br />
            Due Date
            <br />
            <TextField
              name="due_in_date_start"
              id="outlined-basic"
              label="Due Date start"
              variant="outlined"
              onChange={handleKeyinput}
              margin="dense"
              type="date"
            />
            <TextField
              name="due_in_date_end"
              id="outlined-basic"
              label="Due Date end"
              variant="outlined"
              onChange={handleKeyinput}
              margin="dense"
              type="date"
            />
            <br />
            Baseline Create Date
            <br />
            <TextField
              name="baseline_create_date_start"
              id="outlined-basic"
              label="Baseline Create Date end"
              variant="outlined"
              onChange={handleKeyinput}
              margin="dense"
              type="date"
            />
            <TextField
              name="baseline_create_date_end"
              id="outlined-basic"
              label="Baseline Create Date end"
              variant="outlined"
              onChange={handleKeyinput}
              margin="dense"
              type="date"
            />
            <br />
            Invoice Currency
            <br />
            <TextField
              name="invoice_currency"
              id="outlined-basic"
              label="invoice currency"
              variant="outlined"
              onChange={handleKeyinput}
              margin="dense"
            />
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancel}>Cancel</Button>
          <Button onClick={handlesubmit} autoFocus>
            Submit
          </Button>
        </DialogActions>
      </Dialog>

      {trigger ? (
        <>
          <div className="popupAnalytics">
            <div className="blurbox"></div>
            <button className="closePopup" onClick={() => setTrigger(false)}>
              <CloseIcon fontSize="large" style={{ fill: "rgb(255, 0, 0)" }} />
            </button>
            <div className="barchart">
              <Barchart chartData={userBarData} />
            </div>
            <div className="piechart">
              <Piechart chartData={userPieData} />
            </div>
          </div>
        </>
      ) : null}
    </div>
  );
}
