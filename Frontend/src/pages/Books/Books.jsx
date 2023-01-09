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
import "./Books.css";
import { Link, useNavigate } from "react-router-dom";

const Books = () => {
  const [openModal, setOpenModal] = useState(false);
  const [activeBook, setActiveBook] = useState("");
  const [issuedBooks, setIssuedBooks] = useState([]);
  const [books, setBooks] = useState([]);

  const navigate = useNavigate();

  const getBooks = async () => {
    const data = await axios.get(
      "https://frappeprojectbackend.onrender.com/api/books/getBooks"
    );
    setBooks(data.data);
  };

  const getIssuedBooks = async () => {
    const data = await axios.get(
      "https://frappeprojectbackend.onrender.com/api/books/getIssuedBook"
    );
    setIssuedBooks(data.data);
  };

  useEffect(() => {
    getBooks();
    // getIssuedBooks();
  }, []);

  const deleteBook = async () => {
    console.log(activeBook.id);
    try {
      const data = await axios.delete(
        `https://frappeprojectbackend.onrender.com/api/books/getBook/${activeBook.id}`
      );
      setOpenModal(false);
      setActiveBook("");
      navigate(0);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Navbar />
      <div className="headingContainer">
        <Typography variant="h5">Book List</Typography>
        <Link to="/addBook">
          <Button variant="contained" color="primary">
            Add Book
          </Button>
        </Link>
      </div>
      {books.length > 0 ? (
        <>
          <div className="tableContainer">
            <TableContainer className="tableContainer">
              <Table stickyHeader>
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell align="right">Author</TableCell>
                    <TableCell>Rating</TableCell>
                    <TableCell align="right">Quantity</TableCell>
                    <TableCell align="right">Price</TableCell>
                    <TableCell>Action</TableCell>
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
                      <TableCell>
                        <div className="actionsContainer">
                          <>
                            <Link to={`/book/${book.id}`}>
                              <Button
                                variant="contained"
                                color="primary"
                                size="small"
                                // to={`/admin/books/${book.isbn}/edit`}
                              >
                                Edit
                              </Button>
                            </Link>
                            <Button
                              variant="contained"
                              color="secondary"
                              size="small"
                              onClick={(e) => {
                                setActiveBook(book);
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
                  <Button
                    variant="contained"
                    onClick={() => setOpenModal(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={deleteBook}
                  >
                    Delete
                  </Button>
                </CardActions>
              </Card>
            </Modal>
          </div>
        </>
      ) : (
        <div className="noBooks">
          <Typography variant="h6">No books issued!</Typography>
        </div>
      )}

      {/* For Borrowed Books
      <div className="headingContainer">
        <Typography variant="h5">Issued Books</Typography>
      </div>
      {issuedBooks.length > 0 ? (
        <>
          <div className="tableContainer">
            <TableContainer className="tableContainer">
              <Table stickyHeader>
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell align="middle">Author</TableCell>
                    <TableCell>Rating</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {issuedBooks.map((book) => (
                    <TableRow key={book.id}>
                      <TableCell component="th" scope="row">
                        {book.title}
                      </TableCell>
                      <TableCell align="middle">{book.author}</TableCell>
                      <TableCell>{book.rating}</TableCell>
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
      )} */}
    </>
  );
};

export default Books;
