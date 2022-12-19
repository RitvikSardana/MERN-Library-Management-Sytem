import React, { useState, useEffect } from "react";
import Navbar from "../../components/Navbar";
import axios from "axios";

import {
  Paper,
  Container,
  Button,
  TextField,
  FormGroup,
  FormControl,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { useNavigate, useParams, useLocation } from "react-router-dom";

const IssueBook = () => {
  const { id } = useParams();

  const navigate = useNavigate();
  const [book, setBook] = useState({
    name: "",
    email: "",
    age: 0,
    balance: 0,
  });
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    age: 0,
    balance: 0,
  });
  const [books, setBooks] = useState([]);

  const updateBookField = (event) => {
    const field = event.target;
    setBook((book) => ({ ...book, [field.name]: field.value }));
  };
  const validateForm = (event) => {
    const { name, value } = event.target;
    if (["name"].includes(name)) {
      setBook((prevProd) => ({ ...prevProd, [name]: value }));

      if (!value.length) {
        setErrors({ ...errors, [name]: `${name} can't be empty` });
      } else {
        setErrors({ ...errors, [name]: "" });
      }
    }
  };
  const isInvalid =
    book.name === "" ||
    book.email === "" ||
    book.age === 0 ||
    book.balance === 0;

  const getBooks = async () => {
    const data = await axios.get(
      "https://frappeprojectbackend.onrender.com/api/books/getBooks"
    );
    setBooks(data.data);
  };

  useEffect(() => {
    getBooks();
  }, []);

  const issueBookHandler = async () => {
    try {
      const bookId = books.filter((singleBook) =>
        singleBook["title"].includes(book.name)
      )[0].id;
      // let
      const data = await axios.patch(
        "https://frappeprojectbackend.onrender.com/api/users/issuebook",
        {
          id,
          bookId,
        }
      );
      navigate(-1);
    } catch (error) {
      console.log(error);
      alert("Insufficient Funds");
      navigate(-1);
    }
  };

  return (
    <>
      <Navbar />
      <Container component={Paper} className="wrapper">
        <Typography className={"pageHeaders"} variant="h4">
          Issue Book
        </Typography>
        <Typography className={"pageHeaders"} variant="h5">
          Available Books
        </Typography>
        {books.length > 0 ? (
          <>
            <div>
              <TableContainer>
                <Table stickyHeader>
                  <TableHead>
                    <TableRow>
                      <TableCell>Name</TableCell>
                      <TableCell align="right">Title</TableCell>
                      <TableCell>Rating</TableCell>
                      <TableCell align="right">Quantity</TableCell>
                      <TableCell align="right">Price</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {books.map((book) => (
                      <TableRow key={book.id}>
                        <TableCell component="th" scope="row">
                          {book.title}
                        </TableCell>
                        <TableCell align="right">{book.author}</TableCell>
                        <TableCell>{book.rating}</TableCell>
                        <TableCell align="right">{book.quantity}</TableCell>

                        <TableCell align="right">{`₹${book.price}`}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
            <div>
              <FormControl className="mb2" style={{ marginTop: "20px" }}>
                <TextField
                  label="Enter Movie Name"
                  name="name"
                  required
                  value={book.name}
                  onChange={updateBookField}
                  onBlur={validateForm}
                  error={errors.name.length > 0}
                  helperText={errors.name}
                  className="mb2"
                />
                <Button
                  variant="contained"
                  color="primary"
                  size="small"
                  disabled={book.name === "" ? true : false}
                  onClick={issueBookHandler}
                  className="mb2"
                >
                  Issue Book
                </Button>
                <Button
                  variant="contained"
                  color="secondary"
                  size="small"
                  onClick={() => {
                    navigate(-1);
                  }}
                >
                  Go Back
                </Button>
              </FormControl>
            </div>
          </>
        ) : (
          <div className="noBooks">
            <Typography variant="h6">
              No Members! Please Add Some Members
            </Typography>
          </div>
        )}
      </Container>
    </>
  );
};

export default IssueBook;
