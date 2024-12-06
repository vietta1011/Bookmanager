import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig";

const OrderDetailList = () => {
  const [orderDetails, setOrderDetails] = useState([]);
  const [booksMap, setBooksMap] = useState({}); // Mapping book_id to book_name

  // Fetch books and create a mapping of book_id to book_name
  const fetchBooks = async () => {
    const querySnapshot = await getDocs(collection(db, "books"));
    const books = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    const map = {};
    books.forEach((book) => {
      map[book.id] = book.title; // Assuming 'title' is the book name
    });
    setBooksMap(map);
  };

  // Fetch order details
  const fetchOrderDetails = async () => {
    const querySnapshot = await getDocs(collection(db, "order_details"));
    setOrderDetails(
      querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
    );
  };

  useEffect(() => {
    const fetchData = async () => {
      await fetchBooks();
      await fetchOrderDetails();
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Order Details</h1>
      <table border="1" style={{ width: "100%", textAlign: "left" }}>
        <thead>
          <tr>
            <th>#</th>
            <th>Book Name</th>
            <th>Quantity</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {orderDetails.map((detail, index) => (
            <tr key={detail.id}>
              <td>{index + 1}</td>
              <td>{booksMap[detail.book_id] || "Unknown"}</td>
              <td>{detail.quantity}</td>
              <td>${detail.sale}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrderDetailList;
