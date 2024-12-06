import React, { useEffect, useState } from "react";
import { collection, getDocs, addDoc } from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig";

const AddOrderDetail = () => {
  const [books, setBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [price, setPrice] = useState(0);

  const fetchBooks = async () => {
    const querySnapshot = await getDocs(collection(db, "books"));
    const bookList = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setBooks(bookList);
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const handleBookChange = (e) => {
    const bookId = e.target.value;
    const book = books.find((b) => b.id === bookId);
    setSelectedBook(bookId);
    setPrice(book ? book.price : 0);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedBook) return alert("Please select a book.");
    await addDoc(collection(db, "order_details"), {
      book_id: selectedBook,
      quantity,
      sale: price,
    });
    setSelectedBook("");
    setQuantity(1);
    setPrice(0);
  };

  return (
    <div>
      <h1>Add Order Detail</h1>
      <form onSubmit={handleSubmit} style={formStyle}>
        <div style={inputGroupStyle}>
          <label>Book</label>
          <select value={selectedBook} onChange={handleBookChange}>
            <option value="">Select a book</option>
            {books.map((book) => (
              <option key={book.id} value={book.id}>
                {book.title}
              </option>
            ))}
          </select>
        </div>
        <div style={inputGroupStyle}>
          <label>Quantity</label>
          <input
            type="number"
            min="1"
            value={quantity}
            onChange={(e) => setQuantity(parseInt(e.target.value))}
          />
        </div>
        <div style={inputGroupStyle}>
          <label>Price</label>
          <input type="text" value={price} disabled />
        </div>
        <button type="submit" style={buttonStyle}>
          Add Order Detail
        </button>
      </form>
    </div>
  );
};

const formStyle = {
  maxWidth: "400px",
  margin: "auto",
  padding: "20px",
  border: "1px solid #ccc",
  borderRadius: "5px",
  backgroundColor: "#f9f9f9",
};

const inputGroupStyle = {
  marginBottom: "15px",
};

const buttonStyle = {
  padding: "10px 20px",
  backgroundColor: "#007bff",
  color: "#fff",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
};

export default AddOrderDetail;
