import React, { useState, useEffect } from "react";
import Navbar from "../../components/Navbar";
import "./AddBook.css";
import axios from "axios";
import {
  Paper,
  Container,
  Button,
  TextField,
  FormGroup,
  FormControl,
  Typography,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";

const AddBook = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [book, setBook] = useState({
    name: "",
    quantity: 0,
    price: 0,
  });

  const [errors, setErrors] = useState({
    name: "",
    quantity: "",
    price: "",
  });

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

  const isInvalid = book.name === "" || book.quantity === 0 || book.price === 0;

  const getSingleBook = async () => {
    const singleBook = await axios.get(
      `https://frappeprojectbackend.onrender.com/api/books/getBook/${id}`
    );
    setBook({ ...singleBook.data, name: singleBook.data.title });
  };
  
  useEffect(() => {
    id && getSingleBook();
  }, []);

  const formSubmitAdd = async (event) => {
    event.preventDefault();
    try {
      const data = await axios.post("https://frappeprojectbackend.onrender.com/api/books/addBook", {
        book,
      });
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  const formSubmitUpdate = async (event) => {
    event.preventDefault();
    try {
      const data = await axios.patch(
        `https://frappeprojectbackend.onrender.com/api/books/getBook/${id}`,
        {
          book,
        }
      );
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Navbar />
      <Container component={Paper} className="wrapper">
        <Typography className={"pageHeaders"} variant="h5">
          {id ? "Update Book" : "Add Book"}
        </Typography>
        <form
          noValidate
          autoComplete="off"
          onSubmit={id ? formSubmitUpdate : formSubmitAdd}
        >
          <FormGroup>
            <FormControl className="mb2">
              <TextField
                label="Name"
                name="name"
                required
                value={book.name}
                onChange={updateBookField}
                onBlur={validateForm}
                error={errors.name.length > 0}
                helperText={errors.name}
              />
            </FormControl>

            <FormControl className="mb2">
              <TextField
                label="Price"
                name="price"
                type="number"
                value={book.price}
                onChange={updateBookField}
                onBlur={validateForm}
                error={errors.quantity.length > 0}
                helperText={errors.quantity}
              />
            </FormControl>

            <FormControl className="mb2">
              <TextField
                label="Quantity"
                name="quantity"
                type="number"
                value={book.quantity}
                onChange={updateBookField}
                onBlur={validateForm}
                error={errors.quantity.length > 0}
                helperText={errors.quantity}
              />
            </FormControl>
          </FormGroup>
          <div className="btnContainer">
            <Button
              variant="contained"
              color="secondary"
              onClick={() => {
                navigate(-1);
              }}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={isInvalid}
            >
              {id ? "Update Book" : "Add Book"}
            </Button>
          </div>
        </form>
      </Container>
    </>
  );
};

export default AddBook;
