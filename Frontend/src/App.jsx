import React from "react";
import Books from "./pages/Books/Books";
import AddBook from "./pages/AddBook/AddBook";
import {BrowserRouter ,Routes,Route} from 'react-router-dom'
import Members from "./pages/Members/Members";
import AddMember from "./pages/AddMember/AddMember";
import IssueBook from "./pages/IssueBook/IssueBook";
import MemberLogs from "./pages/MemberLogs/MemberLogs";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element = {<Books />} />
          <Route path = "/book/:id" element = {<AddBook />} />
          <Route path="/addBook" element = {<AddBook />} />
          <Route path="/members" element = {<Members />} />
          <Route path = "/members/:id" element = {<MemberLogs />} />
          <Route path="/members/issuebook/:id" element = {<IssueBook />} />
          <Route path = "/members/editmember/:id" element = {<AddMember />} />
          <Route path="/addMember" element = {<AddMember />} />
        </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;
