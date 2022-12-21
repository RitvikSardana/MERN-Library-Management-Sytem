import React, { useState, useEffect } from "react";
import Navbar from "../../components/Navbar";

import axios from "axios";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Modal,
  Card,
  CardContent,
  CardActions,
  Typography,
} from "@mui/material";
import "./Members.css";
import { Link, useNavigate } from "react-router-dom";

const Members = () => {
  const [openModal, setOpenModal] = useState(false);
  const [activeUser, setActiveUser] = useState("");
  const [users, setUsers] = useState([]);

  const navigate = useNavigate();

  const getUsers = async () => {
    const data = await axios.get("https://frappeprojectbackend.onrender.com/api/users/getUsers");
    setUsers(result.data.data);

  };

  useEffect(() => {
    getUsers();
  }, []);

  const deleteUser = async () => {
    try {
      const data = await axios.delete(
        `https://frappeprojectbackend.onrender.com/api/users/getUser/${activeUser._id}`
      );
      setOpenModal(false);
      setActiveUser("");
      navigate(0);
    } catch (error) {
      console.log(error);
    }
  };

  const handleReturnBook = async (user) => {
    console.log(user);
    const data = await axios.patch(
      "https://frappeprojectbackend.onrender.com/api/users/returnBook",
      {
        user,
      }
    );
    if (result.data.success) {
      alert(result.data.data);
      navigate(0);
    }
  };
  
  const handleNavigation = (user) => {
    navigate(`/members/${user._id}`);
  };

  return (
    <>
      <Navbar />
      <div className="headingContainer">
        <Typography variant="h5">Members List</Typography>
        <Link to="/addMember">
          <Button variant="contained" color="primary">
            Add Member
          </Button>
        </Link>
      </div>
      {
        users.length > 0 ?
        (
          <>
          <div className="tableContainer">
            <TableContainer className="tableContainer">
              <Table stickyHeader>
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell align="right">Email</TableCell>
                    <TableCell>Age</TableCell>
                    <TableCell align="right">Issued Book</TableCell>
                    <TableCell align="right">Balance</TableCell>
                    <TableCell>Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {users.map((user) => (
                    <TableRow key={user.email}>
                      <TableCell component="th" scope="row">
                        {user.name}
                      </TableCell>
                      <TableCell align="right">{user.email}</TableCell>
                      <TableCell>{user.age}</TableCell>
                      <TableCell align="right">
                        {user.issuedBook ? user.issuedBook : "None"}
                      </TableCell>
  
                      <TableCell align="right">{`₹${user.balance}`}</TableCell>
                      <TableCell>
                        <div className="actionsContainer">
                          <>
                            {/* <Link to={`/members/${user._id}`}
                          state={{user}}
                          > */}
                            <Button
                              variant="contained"
                              color="primary"
                              size="small"
                              onClick={
                                user.issuedBook
                                  ? () => handleReturnBook(user)
                                  : () => handleNavigation(user)
                              }
                            >
                              {user.issuedBook ? "Return Book" : "Issue Book"}
                            </Button>
                            {/* </Link> */}
                            <Link to={`/members/editmember/${user._id}`}>
                              <Button
                                variant="contained"
                                color="primary"
                                size="small"
                              >
                                Edit
                              </Button>
                            </Link>
                            <Button
                              variant="contained"
                              color="secondary"
                              size="small"
                              onClick={(e) => {
                                setActiveUser(user);
                                setOpenModal(true);
                              }}
                            >
                              Delete
                            </Button>
                          </>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
  
            <Modal open={openModal} onClose={(e) => setOpenModal(false)}>
              <Card className="conf_modal">
                <CardContent>
                  <h2>Are you sure?</h2>
                </CardContent>
                <CardActions className="conf_modal_actions">
                  <Button variant="contained" onClick={() => setOpenModal(false)}>
                    Cancel
                  </Button>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={deleteUser}
                  >
                    Delete
                  </Button>
                </CardActions>
              </Card>
            </Modal>
          </div>
        </>
        ) :
        (
          <div className="noBooks">
          <Typography variant="h6">No Members! Please Add Some Members</Typography>
        </div>
        )
      }

    </>
  );
};

export default Members;
