const axios = require("axios");


async function getFrappe() {
  try {
    let res = await axios.get("https://frappe.io/api/method/frappe-library");
    console.log(res.data.message);
  } catch (err) {
    console.log(err);
  }
}

// async function importBooks() {
//   let books = [];
//   let start = 0;
//   let limit = 20;
//   let more = true;

//   while (more) {
//     let url = `https://frappe.io/api/method/frappe-library?title=Harry%20Potter&start=${start}&limit=${limit}`;

//     let response = await new Promise((resolve, reject) => {
//       request(url, (error, response, body) => {
//         if (error) {
//           reject(error);
//         } else {
//           resolve(response);
//         }
//       });
//     });

//     let data = JSON.parse(response.body);
//     books = books.concat(data.books);
//     start += limit;

//     if (data.books.length < limit || books.length >= 30) {
//       more = false;
//     }
//   }

//   console.log(books);
//   console.log(books.length);
// }

async function fetchBooks(requestedBooks,title) {
  let books = [];

  let url = `https://frappe.io/api/method/frappe-library?title=${title}`;
  let response = await axios.get(url);
  let data = response.data.message;
  let len = data.length;

  let requestTimes = Math.ceil(requestedBooks / len) - 1;
  //   console.log(requestTimes);
  books = data;

  while (requestTimes) {
    let url = `https://frappe.io/api/method/frappe-library?title=${title}`;
    let response = await axios.get(url);
    let data = response.data.message;

    books = [...books, ...data];
    console.log(requestTimes);

    requestTimes--;
  }

  books = Object.values(books).slice(0,requestedBooks);
  console.log(books);
  console.log(books.length);
}


async function addBook(title,stock) {

  let url = `https://frappe.io/api/method/frappe-library?title=${title}`;
  let response = await axios.get(url);
  let data = response.data.message;
  data = data.slice(0,1)

  console.log(data,stock)

}

addBook("Harry Potter",69)
// fetchBooks(30,"the");

// importBooks();

// getNumberOfFollowers();
// getFrappe()
