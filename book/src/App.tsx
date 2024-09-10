import React, { useState, useEffect } from 'react';
import './App.css';

interface Book {
  id: number;
  title: string;
  author: string;
  overview: string;
}

const App = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [editBook, setEditBook] = useState<Book>({ id: 0, title: '', author: '', overview: '' });
  const [inputBook, setInputBook] = useState<Book>({ id: 0, title: '', author: '', overview: '' });

  useEffect(() => {
    componentDidMount();
  }
    , []);

  const openModal = (book: Book) => {
    setEditBook(book);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditBook({ id: 0, title: '', author: '', overview: '' });
  };

  const onInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (showModal) {
      setEditBook((prevBook) => ({
        ...prevBook,
        [name]: value,
      }));
    } else {
      setInputBook((prevBook) => ({
        ...prevBook,
        [name]: value,
      }));
    }
  };

  const saveBook = (updatedBook: Book) => {
    fetch('http://localhost:3000/books', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedBook),
    }).then(() => {
      componentDidMount();
    });
    closeModal();
  };

  const deleteBook = (id: number) => {
    const deleteBook = books.find((book) => book.id === id);
    fetch('http://localhost:3000/books', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(deleteBook),
    }).then(() => {
      componentDidMount();
    });
  };

  const addBook = () => {
    const newBook = { ...inputBook, id: books.length + 1 };
    fetch('http://localhost:3000/books', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newBook),
    }).then(() => {
      componentDidMount();
    });
    setInputBook({ id: 0, title: '', author: '', overview: '' });
  };

  const componentDidMount = async () => {
    const response = await fetch('http://localhost:3000/books');
    const data = await response.json();
    setBooks(data);
  }
  return (
    <>
      <div className='book-list-header'>
        <h4>本の追加</h4>
        <input
          type='text'
          placeholder='title'
          name='title'
          onChange={onInput}
          value={inputBook.title}
        />
        <input
          type='text'
          placeholder='author'
          name='author'
          onChange={onInput}
          value={inputBook.author}
        />
        <input
          type='text'
          placeholder='overview'
          name='overview'
          onChange={onInput}
          value={inputBook.overview}
        />
        <button onClick={addBook}>追加</button>
      </div >
      <table className='book-list-content'>
        <thead>
          <tr>
            <th>タイトル</th>
            <th>著者</th>
            <th>概要</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book, index) => (
            <tr key={index}>
              <td>{book.title}</td>
              <td>{book.author}</td>
              <td>{book.overview}</td>
              <td>
                <button onClick={() => openModal(book)}>編集</button>
                <button onClick={() => deleteBook(book.id)}>削除</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {showModal && (
        <div className='modal'>
          <div className='modal-content'>
            <span className='close' onClick={closeModal}>&times;</span>
            <h2>本の編集</h2>
            <label>
              タイトル:
              <input
                type='text'
                name='title'
                value={editBook.title}
                onChange={onInput}
              />
            </label>
            <br />
            <label>
              著者:
              <input
                type='text'
                name='author'
                value={editBook.author}
                onChange={onInput}
              />
            </label>
            <br />
            <label>
              概要:
              <input
                type='text'
                name='overview'
                value={editBook.overview}
                onChange={onInput}
              />
            </label>
            <br />
            <button onClick={() => saveBook(editBook)}>保存</button>
            <button onClick={closeModal}>閉じる</button>
          </div>
        </div>
      )}
    </>
  );
};

export default App;
