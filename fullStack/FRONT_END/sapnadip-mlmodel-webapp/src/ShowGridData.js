import * as React from "react";
import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { visuallyHidden } from "@mui/utils";
import Axios from "axios";
import { TextField } from "@mui/material";
import Slide from "@mui/material/Slide";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";

import "./showgridData.css";

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

// This method is created for cross-browser compatibility, if you don't
// need to support IE11, you can use Array.prototype.sort() directly
function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  //used to set and map column names
  {
    id: "sl_no",
    numeric: true,
    disablePadding: false,
    label: "sl_no",
  },
  {
    id: "business_code",
    numeric: false,
    disablePadding: false,
    label: "business_code",
  },
  {
    id: "cust_number",
    numeric: true,
    disablePadding: false,
    label: "cust_number",
  },
  {
    id: "clear_date",
    numeric: true,
    disablePadding: false,
    label: "clear_date",
  },
  {
    id: "buisness_year",
    numeric: true,
    disablePadding: false,
    label: "buisness_year",
  },
  {
    id: "doc_id",
    numeric: true,
    disablePadding: false,
    label: "doc_id",
  },
  {
    id: "posting_date",
    numeric: true,
    disablePadding: false,
    label: "posting_date",
  },
  {
    id: "document_create_date",
    numeric: true,
    disablePadding: false,
    label: "document_create_date",
  },
  {
    id: "due_in_date",
    numeric: true,
    disablePadding: false,
    label: "due_in_date",
  },
  {
    id: "invoice_currency",
    numeric: false,
    disablePadding: false,
    label: "invoice_currency",
  },
  {
    id: "document_type",
    numeric: false,
    disablePadding: false,
    label: "document_type",
  },
  {
    id: "posting_id",
    numeric: false,
    disablePadding: false,
    label: "posting_id",
  },
  {
    id: "total_open_amount",
    numeric: true,
    disablePadding: false,
    label: "total_open_amount",
  },
  {
    id: "baseline_create_date",
    numeric: true,
    disablePadding: false,
    label: "baseline_create_date",
  },
  {
    id: "cust_payment_terms",
    numeric: false,
    disablePadding: false,
    label: "cust_payment_terms",
  },
  {
    id: "invoice_id",
    numeric: true,
    disablePadding: false,
    label: "invoice_id",
  },
  {
    id: "age_bucket",
    numeric: true,
    disablePadding: false,
    label: "age_bucket",
  },
];

function EnhancedTableHead(props) {
  const {
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
  } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              "aria-label": "select all sl_no",
            }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? "right" : "left"}
            padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const EnhancedTableToolbar = (props) => {
  const { numSelected } = props;

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(
              theme.palette.primary.main,
              theme.palette.action.activatedOpacity
            ),
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: "1 1 100%" }}
          color="inherit"
          variant="h6"
          component="div"
        >
          <h1 className="mainGridText"> {numSelected} selected</h1>
        </Typography>
      ) : (
        <Typography
          sx={{ flex: "1 1 100%" }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          <h1 className="mainGridText">CUSTOMER BUSINESS</h1>
        </Typography>
      )}
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

export default function EnhancedTable(props) {
  const [order, setOrder] = React.useState("asc"); //provided by default code --> setting view order
  const [orderBy, setOrderBy] = React.useState("sl_no"); //provided by default code  --> setting initial view order by column name
  const [selected, setSelected] = React.useState([]); //this will contain no. of selected sl_no
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [rows, setrows] = React.useState([]); //this is used to map the incoming data into mui table
  const [pagesTraverser, setPageTraversed] = useState([]);
  const [keywords, setKeywords] = useState([]);

  let totalSelectedRows = selected;

  // useEffect(() => {
  //   console.log("render");
  //   console.log(`totalSelectedRows ->> ${totalSelectedRows}`);
  // });

  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  useEffect(() => {
    console.log("total selected row length -->> " + totalSelectedRows.length);
    if (totalSelectedRows.length == 1) {
      props.UpdateableRow(totalSelectedRows);
    }
  }, [totalSelectedRows.length]);

  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //this is used to achieve basic pagination with minimum load to the server

  useEffect(() => {
    if (!pagesTraverser.includes(page) && page > 0 && keywords.length < 1) {
      //to avoid api call while is simple search
      Axios.get("http://localhost:8000/sapnadip/showall", {
        //1st 25 data will be visible in search of specifics and traversal wont call api while in search
        params: {
          page: `${page}`,
          rowsPerPage: `${rowsPerPage}`,
          order: `${order}`,
        },
      })
        .then(function (response) {
          setrows((rows) => rows.concat(response.data.business_details)); //here i need to concat data so i will not call api to go to the previous page
        }) //or same number of pages already travelled
        .catch(function (error) {
          console.log(error);
        });
    }

    console.log(order);
  }, [page, order, rowsPerPage, selected]);

  let showallDESC = async () => {
    while (rows.length !== 0) {
      rows.pop(); //makes sure that rows in empty before api call so the data wont overlap
    }

    while (pagesTraverser.length > 0) {
      //this is done so the pages can traverse on every sort change
      pagesTraverser.pop();
    }

    await setPage(0); //so that i can click on next to see previous data in reverse order

    await Axios.get("http://localhost:8000/sapnadip/showall", {
      params: {
        page: 0,
        rowsPerPage: `${rowsPerPage}`,
        order: "DESC",
      },
    })
      .then(function (response) {
        setrows(response.data.business_details);
      })
      .catch(function (error) {
        console.log(error);
      });
    console.log("desc");
  };
  useEffect(() => {
    if (order == "desc") {
      showallDESC();
    }

   // console.log(order);
  }, [order]);

  let showalldataASC = async () => {
    while (rows.length > 0) {
      rows.pop();
    }

    //console.log(rows.length);

    while (pagesTraverser.length > 0) {
      //this is done so the pages can traverse on every sort change
      pagesTraverser.pop();
    }
    setPage(0);

    await Axios.get("http://localhost:8000/sapnadip/showall", {
      params: {
        page: 0,
        rowsPerPage: `${rowsPerPage}`,
        order: "ASC",
      },
    })
      .then(function (response) {
        setrows(response.data.business_details);
      })
      .catch(function (error) {
        console.log(error);
      });
    //console.log("asc");
    while (rows.length !== 0) {
      rows.pop();
    }
  };

  useEffect(() => {
    if (order == "asc" || keywords.length == 0) {
      showalldataASC();
    }
  }, [order, keywords.length]);

  useEffect(() => {
    if (!pagesTraverser.includes(page)) {
      setPageTraversed((pagesTraverser) => pagesTraverser.concat(page));
    }
  }, [page, keywords.length]);
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  ///////////////////this is used to store the sl_no of selected rows.////////////////////////////////////////////////////////////////////////

  useEffect(() => {
   // console.log(`selected -> ${selected}`);
  }, [selected]);
  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = rows.map((n) => n.sl_no);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, sl_no) => {
    const selectedIndex = selected.indexOf(sl_no);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, sl_no);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(page);
  };

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };

  const isSelected = (sl_no) => selected.indexOf(sl_no) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //reset the page with updated backend when delete is pressed
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  const [deleted, setDeleted] = useState(false);
  let handleDelete = async () => {
    try {
      const resp = await Axios.post("http://localhost:8000/sapnadip/delete", {
        totalSelectedRows: `${totalSelectedRows}`,
      });
      console.log(resp.data);

      setDeleted(true);
    } catch (err) {
      // Handle Error Here
      console.error(err);
    }
  };
  useEffect(() => {
    if (props.currentDelTime != null) {
      handleDelete();
    }
  }, [props.currentDelTime]);

  useEffect(() => {
    if (deleted) {
      setrows([]);
      while (pagesTraverser.length > 0) {
        //this is done so the pages can traverse on every sort change
        pagesTraverser.pop();
      }
      while (selected.length > 0) {
        selected.pop();
      }
      setPage(0);
      Axios.get("http://localhost:8000/sapnadip/showall", {
        params: {
          page: 0,
          rowsPerPage: `${rowsPerPage}`,
          order: `${order}`,
        },
      })
        .then(function (response) {
          setrows((rows) => rows.concat(response.data.business_details));
        })
        .catch(function (error) {
          console.log(error);
        });
      console.log(order);
    }

    setDeleted(false);
  }, [deleted]);

  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //reset the page with updated backend when Refresh Button is pressed

  useEffect(() => {
    if (props.Refresh != null) {
      setTimeout(() => {
        //console.log(props.Refresh);
        while (rows.length > 0) {
          //this is done so that the rows array become empty and set to its default position
          rows.pop();
        }
        setrows([]);
        while (pagesTraverser.length > 0) {
          //this is done so the pages can traverse on every sort change
          pagesTraverser.pop();
        }

        while (selected.length > 0) {
          selected.pop();
        }
        setPage(0);
        Axios.get("http://localhost:8000/sapnadip/showall", {
          params: {
            page: 0,
            rowsPerPage: `${rowsPerPage}`,
            order: `${order}`,
          },
        })
          .then(function (response) {
            setrows(response.data.business_details);
          })
          .catch(function (error) {
            console.log(error);
          });
      }, 200);

      return () => {
        setrows([]);
      };
    }
  }, [props.Refresh]); //->> to avoid infinite rerenders on refresh onclick// this is time . since no time will be same

  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  useEffect(() => {
    props.totalSelectLength(totalSelectedRows.length);
  });

  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  ///////////////When edit commit is successful main data grid refreshes////////////////////////////////////////////////////////////////////////////////////////////////////////
  let toggleEditRefresh = props.currentTime; //getting this from showdata

  useEffect(() => {
   // console.log("currentTIme inside showgrid is ==> " + toggleEditRefresh);
    if (toggleEditRefresh != undefined) {
      while (pagesTraverser.length > 0) {
        //this is done so the pages can traverse on every sort change
        pagesTraverser.pop();
      }
      while (selected.length > 0) {
        selected.pop();
      }
      setPage(0);
      Axios.get("http://localhost:8000/sapnadip/showall", {
        params: {
          page: 0,
          rowsPerPage: `${rowsPerPage}`,
          order: `${order}`,
        },
      })
        .then(function (response) {
          setrows(response.data.business_details);
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  }, [toggleEditRefresh]);

  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  const [disable, setdisable] = useState();

  useEffect(() => {
  //  console.log(totalSelectedRows.length);
    if (totalSelectedRows.length == 0) {
      setdisable(true);
    } else {
      setdisable(false);
    }
  }, [totalSelectedRows.length]);
  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////for advanced search////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

  function AdvnSchDialogSlide() {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
      setOpen(true);
    };

    const handleClose = () => {
      setOpen(false);
    };

    const DoSearchFind = async (e) => {
      while (rows.length > 0) {
        rows.pop();
      }
      Axios.get("http://localhost:8000/sapnadip/AdvancedSearchServlet", {
        params: e,
      })
        .then(function (response) {
          setrows((rows) => rows.concat(response.data.advanced_search_result));

          console.log(rows);
        })
        .catch(function (error) {
          console.log(error);
        });
    };

    const handleSave = () => {
      //if all the inputs are filled then only api will be called -->> using DoSearchFind function
      if (
        user.doc_id.length > 0 &&
        user.invoice_id.length > 0 &&
        user.buisness_year.length > 0 &&
        user.invoice_id.length > 0 &&
        user.cust_number.length > 0
      ) {
        setOpen(false);

        DoSearchFind(user);
      } else {
        alert("no input");
      }
    };
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    const [user, setUser] = useState({}); //this is used to store keyinputs for advanced search
    let handleKeyword = (e) => {
      const { name, value } = e.target; //since target contains key and value
      setUser({ ...user, [name]: value });
      console.log(user);
    };

    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    return (
      <div>
        <button className="advnBTN" onClick={handleClickOpen}>
          ADVANCED SEARCH
        </button>
        <Dialog
          open={open}
          TransitionComponent={Transition}
          keepMounted
          onClose={handleClose}
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle>{"ADVANCED SEARCH"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
              <TextField
                required
                id="outlined-required"
                name="doc_id"
                label="Document Id"
                variant="outlined"
                onChange={handleKeyword}
                margin="dense"
              />
              <TextField
                name="invoice_id"
                required
                id="outlined-required"
                label="Invoice Id"
                variant="outlined"
                onChange={handleKeyword}
                margin="dense"
              />
              <TextField
                name="buisness_year"
                required
                id="outlined-required"
                label="Business Year"
                variant="outlined"
                onChange={handleKeyword}
                margin="dense"
              />
              <TextField
                name="cust_number"
                required
                id="outlined-required"
                label="Customer Number"
                variant="outlined"
                onChange={handleKeyword}
                margin="dense"
              />
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>CANCEL</Button>
            <Button onClick={handleSave}>SEARCH</Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //////////////////for simple search//////////////////////////////////////////////////////////////////////////////////////////////////////////

  useEffect(() => {
    if (page == 0 && keywords.length > 0) {
    
      Axios.get("http://localhost:8000/sapnadip/SearchServlet", {
        params: {
          page: 0,
          rowsPerPage: `${rowsPerPage}`,
          order: `${order}`,
          cust_number: `${keywords}`,
        },
      })
        .then(function (response) {
         if(response.data.search_result.length>0){
          console.log(response.data.search_result)
          setrows(response.data.search_result);}
          else{
          console.log(response.data.search_result)
          setrows([]);
        }
        })
        .catch(function (error) {
          console.log(error);
        });
    }

   // console.log(order);
  }, [page, order, rowsPerPage, keywords.length]);

  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //for back button
  let handleBackBtn = async () => {
    while (rows.length > 0) {
      //this is done so that the rows array become empty and set to its default position
      rows.pop();
    }
    while (pagesTraverser.length > 0) {
      //this is done so the pages can traverse on every sort change
      pagesTraverser.pop();
    }

    setPage(0);
    await Axios.get("http://localhost:8000/sapnadip/showall", {
      params: {
        page: 0,
        rowsPerPage: `${rowsPerPage}`,
        order: `${order}`,
      },
    })
      .then(function (response) {
        setrows(response.data.business_details);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////for predict button and ageBucket column /////////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  const time = new Date().toLocaleTimeString(); ///THIS IS USED TO STORE CURRENT TIME
  const [pTime, setPRime] = useState(null);
  const handelPrTime = () => {
    let time = new Date().toLocaleTimeString();
    setPRime(time);
  };
  //i have done this way below because data was not setting in current instance when api calls were placed outside of one another
  useEffect(() => {
    if (pTime != null) {
      console.log(pTime);
      Axios.post("http://localhost:8000/sapnadip/PredictionSupportServlet", {
        totalSelectedRows: `${totalSelectedRows}`,
      })
        .then(function (response) {
          console.log(response.data.predict_details);
          //setPredictData(response.data.predict_details)
          Axios.post("http://127.0.0.1:5000", response.data.predict_details)
            .then(function (response) {
              console.log(response.data);
              Axios.post(
                "http://localhost:8000/sapnadip/PredictionUpdate",
                response.data
              )
                .then(function (response) {
                  console.log(response.data);
                })
                .catch(function (error) {
                  console.log(error);
                });
            })
            .catch(function (error) {
              console.log(error);
            });
        })
        .catch(function (error) {
          console.log(error);
        });

      console.log(props.Refresh);
      setTimeout(() => {
        showalldataASC();
      }, 600);
    }
  }, [pTime]); //to avoid rerenders

  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //jsx rendering starts////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  return (
    <div className="datatable">
      <div className="searchfields">
        <button className="predictBtn" onClick={handelPrTime}>
          PREDICT
        </button>
        <div className="searchSimple">
          <label for="search">search</label>
          <input
            type="text"
            onChange={(e) => {
              setKeywords(e.target.value);
            }}
            placeholder="customer ID"
            className="textf"
          />
        </div>

        <div className="ADVNBACKbtns">
          <AdvnSchDialogSlide />
          <button className="backBTN" onClick={handleBackBtn}>
            <ArrowBackRoundedIcon
              fontSize="large"
              style={{ fill: "rgb(255, 255, 255)" }}
            />
          </button>
        </div>
      </div>

      <Box sx={{ width: "1850px", maxWidth: "100%" }} className="mainGrid">
        <Paper sx={{ maxWidth: "100%", mb: 2, bgcolor: "#00000000" }}>
          <EnhancedTableToolbar
            numSelected={selected.length}
            sx={{ bgcolor: "#00000000" }}
          />
          <TableContainer sx={{ maxHeight: "300px" }}>
            <Table
              stickyHeader
              sx={{ minWidth: 750 }}
              aria-labelledby="tableTitle"
              size={dense ? "small" : "medium"}
            >
              <EnhancedTableHead
                numSelected={selected.length}
                order={order}
                orderBy={orderBy}
                onSelectAllClick={handleSelectAllClick}
                onRequestSort={handleRequestSort}
                rowCount={rows.length}
              />
              <TableBody>
                {/* if you don't need to support IE11, you can replace the `stableSort` call with:
                 rows.slice().sort(getComparator(order, orderBy)) */}
                {stableSort(rows, getComparator(order, orderBy))
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => {
                    const isItemSelected = isSelected(row.sl_no);
                    const labelId = `enhanced-table-checkbox-${index}`;

                    return (
                      <TableRow
                        hover
                        onClick={(event) => handleClick(event, row.sl_no)}
                        role="checkbox"
                        aria-checked={isItemSelected}
                        tabIndex={-1}
                        key={row.sl_no}
                        selected={isItemSelected}
                      >
                        <TableCell padding="checkbox">
                          <Checkbox
                            color="success"
                            checked={isItemSelected}
                            inputProps={{
                              "aria-labelledby": labelId,
                            }}
                          />
                        </TableCell>
                        <TableCell
                          component="th"
                          id={labelId}
                          scope="row"
                          padding="none"
                          align="center"
                        >
                          {row.sl_no}
                        </TableCell>
                        <TableCell align="center">
                          {row.business_code}
                        </TableCell>
                        <TableCell align="center">{row.cust_number}</TableCell>
                        <TableCell align="center">{row.clear_date}</TableCell>
                        <TableCell align="center">
                          {row.buisness_year}
                        </TableCell>
                        <TableCell align="center">{row.doc_id}</TableCell>
                        <TableCell align="center">{row.posting_date}</TableCell>
                        <TableCell align="center">
                          {row.document_create_date}
                        </TableCell>
                        <TableCell align="center">{row.due_in_date}</TableCell>
                        <TableCell align="center">
                          {row.invoice_currency}
                        </TableCell>
                        <TableCell align="center">
                          {row.document_type}
                        </TableCell>
                        <TableCell align="center">{row.posting_id}</TableCell>
                        <TableCell align="center">
                          {row.total_open_amount}{" "}
                        </TableCell>
                        <TableCell align="center">
                          {row.baseline_create_date}{" "}
                        </TableCell>
                        <TableCell align="center">
                          {" "}
                          {row.cust_payment_terms}
                        </TableCell>
                        <TableCell align="center">{row.invoice_id}</TableCell>
                        <TableCell align="center">{row.aging_bucket}</TableCell>
                      </TableRow>
                    );
                  })}
                {emptyRows > 0 && (
                  <TableRow
                    style={{
                      height: (dense ? 33 : 53) * emptyRows,
                    }}
                  >
                    <TableCell colSpan={6} />
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={rows.length + 1}
            color="primary"
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>

        <FormControlLabel
          control={<Switch checked={dense} onChange={handleChangeDense} />}
          label="Dense padding"
        />
      </Box>
    </div>
  );
}
