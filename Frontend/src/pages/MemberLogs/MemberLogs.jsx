import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
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
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";

const MemberLogs = () => {
  const [prevouslyIssuedBooks, setPrevouslyIssuedBooks] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState([]);

  const handleNavigation = () => {
    navigate(-1);
  };

  const countDuplicates = (previousBooks) => {
    const counts = {};

    //Calculated the Count of each book
    for (const element of previousBooks) {
      counts[element.title] = (counts[element.title] || 0) + 1;
    }

    // Manipulated the array to add the counts
    const countOfBooks = previousBooks.map((currentBook) => ({
      ...currentBook,
      count: counts[currentBook.title],
    }));

    //Removed Duplicates
    const uniqueBooks = countOfBooks.filter((element, index, self) => {
      return index === self.findIndex((curr) => curr.id === element.id);
    });
    setPrevouslyIssuedBooks(uniqueBooks);
  };

  const getSingleMember = async () => {
    const result = await axios.get(
      `http://localhost:1337/api/users/getUser/${id}`
    );
    // console.log(result.data.data);
    if (result.data.success) {
      countDuplicates(result.data?.data?.previouslyIssuedBooks);
      setUser([result.data.data]);
    }
  };

  useEffect(() => {
    getSingleMember();
  }, []);

  console.log(user);

  return (
    <>
      <Navbar />
      <div className="headingContainer">
        <Typography variant="h5">User Details</Typography>
        <Button
          variant="contained"
          color="secondary"
          onClick={handleNavigation}
        >
          <ArrowBackIosNewIcon /> Go Back
        </Button>
      </div>
      <div>
        <TableContainer>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell align="right">Email</TableCell>
                <TableCell>Age</TableCell>
                <TableCell align="right">Issued Book</TableCell>
                <TableCell align="right">Balance</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {user?.map((user) => (
                <TableRow key={user.id}>
                  <TableCell component="th" scope="row">
                    {user.name}
                  </TableCell>
                  <TableCell align="right">{user.email}</TableCell>
                  <TableCell>{user.age}</TableCell>
                  <TableCell align="right">
                    {user.issuedBook ? user.issuedBook : "None"}
                  </TableCell>
                  <TableCell align="right">{user.balance}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>

      <div className="headingContainer">
        <Typography variant="h5">Previously Issued Books</Typography>
      </div>
      {prevouslyIssuedBooks.length > 0 ? (
        <>
          <div className="tableContainer">
            <TableContainer className="tableContainer">
              <Table stickyHeader>
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell align="right">Author</TableCell>
                    <TableCell>Rating</TableCell>
                    <TableCell align="right">Number Of times Issued</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {prevouslyIssuedBooks?.map((book) => (
                    <TableRow key={book.id}>
                      <TableCell component="th" scope="row">
                        {book.title}
                      </TableCell>
                      <TableCell align="right">{book.author}</TableCell>
                      <TableCell>{book.rating}</TableCell>
                      <TableCell align="right">{book.count}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </>
      ) : (
        <div className="noBooks">
          <Typography variant="h6">No books issued!</Typography>
        </div>
      )}
    </>
  );
};

export default MemberLogs;
