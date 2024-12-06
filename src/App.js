import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import BookList from "./components/BookList/BookList";
import AddBook from "./components/BookList/AddBook";
import OrderDetailList from "./components/OrderDetail/OrderDetailList";
import AddOrderDetail from "./components/OrderDetail/AddOrderDetail";
import "./App.css"; // Import file CSS

const App = () => {
  return (
    <Router>
      <nav className="navbar">
        <Link to="/">Book List</Link>
        <Link to="/add-book">Add Book</Link>
        <Link to="/order-details">Order Details</Link>
        <Link to="/add-order-detail">Add Order Detail</Link>
      </nav>
      <div className="content">
        <Routes>
          <Route path="/" element={<BookList />} />
          <Route path="/add-book" element={<AddBook />} />
          <Route path="/order-details" element={<OrderDetailList />} />
          <Route path="/add-order-detail" element={<AddOrderDetail />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
