import React, { useState,useEffect } from "react";
import Navbar from "../../components/Navbar";
import "./AddMember.css";
import axios from 'axios'
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
  const { id } = useParams()
  const navigate = useNavigate()

  const [user, setUser] = useState({
    name: "",
    email:"",
    age:0,
    balance:0
  });

  const [errors, setErrors] = useState({
    name: "",
    email:"",
    age:0,
    balance:0
  });

  const updateBookField = (event) => {
    const field = event.target;
    setUser((user) => ({ ...user, [field.name]: field.value }));
  };

  const validateForm = (event) => {
    const { name, value } = event.target;
    if (["name","email"].includes(name)) {
      setUser((prevProd) => ({ ...prevProd, [name]: value }));
      if (value.length===0) {
        setErrors({ ...errors, [name]: `${name} can't be empty` });
      } else {
        setErrors({ ...errors, [name]: "" });
      }
    }
  };

  const isInvalid = user.name === "" || user.email === "" || user.age === 0 || user.balance === 0;

  const getSingleBook = async () =>{
    const singleBook = await axios.get(`https://frappeprojectbackend.onrender.com/api/users/getUser/${id}`)
    setUser({...singleBook.data})
  }

  const formSubmitAdd = async (event) => {
    event.preventDefault()
    try {
      const data = await axios.post("https://frappeprojectbackend.onrender.com/api/users/addUser",{
        user:user
      })
      navigate(-1)

    } catch (error) {
      console.log(error)
    }

  };

  const formSubmitUpdate = async (event) =>{

    event.preventDefault()
    try {
      const data = await axios.patch(`https://frappeprojectbackend.onrender.com/api/users/getUser/${id}`,{
        user:user
      })
      navigate(-1)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(()=>{
    id && getSingleBook()
  },[])

  return (
    <>
      <Navbar />
      <Container component={Paper} className="wrapper">
        <Typography className={"pageHeaders"} variant="h5" >
          {id ? "Update Member" : "Add Member"}
        </Typography>
        <form noValidate autoComplete="off" onSubmit={id ? formSubmitUpdate : formSubmitAdd}>
          <FormGroup>
            <FormControl className="mb2" >
              <TextField
                label="Name"
                name="name"
                required
                value={user.name}
                onChange={updateBookField}
                onBlur={validateForm}
                error={errors.name.length > 0}
                helperText={errors.name}
              />
            </FormControl>

            <FormControl className="mb2">
              <TextField
                label="Email"
                name="email"
                type="email"
                required
                disabled = {id ?true : false}
                value={user.email}
                onChange={updateBookField}
                onBlur={validateForm}
                error={errors.email.length > 0}
                helperText={errors.email}
              />
            </FormControl>

            <FormControl className="mb2">
              <TextField
                label="Age"
                name="age"
                type="number"
                value={user.age}
                onChange={updateBookField}
                onBlur={validateForm}
                error={errors.age> 0}
              />
            </FormControl>

            <FormControl className="mb2">
              <TextField
                label="Balance"
                name="balance"
                type="number"
                value={user.balance}
                onChange={updateBookField}
                onBlur={validateForm}
                error={errors.balance > 0}
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
              {id ? "Update Member" : "Add Member"}
            </Button>
          </div>
        </form>
      </Container>
    </>
  );
};

export default AddBook;
