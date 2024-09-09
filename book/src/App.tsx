import { useState } from 'react'
import './App.css'

interface Book {
  title: string
  author: string
  overview: string
}

function App() {
  const [inputBook, setInput] = useState<Book>({ title: '', author: '', overview: '' })
  const [books, setBooks] = useState<Book[]>([
    { title: "坊っちゃん", author: "夏目漱石", overview: "ぼっちゃんが先生になって頑張ったけど結局ダメでした。" }
    , { title: "吾輩は猫である", author: "夏目漱石", overview: "吾輩は猫ですが失恋してから人間の前足の使い方が不思議に思えました。" }
    , { title: "走れメロス", author: "太宰治", overview: "激怒して走ったら結構速かったので友人と殴り合いました。" }
  ])

  function onInput(e: React.ChangeEvent<HTMLInputElement>) {
    const book = { ...inputBook, [e.target.placeholder]: e.target.value }
    setInput(book)
    console.log(book)
  }

  function addBook() {
    setBooks([...books, inputBook])
    setInput({ title: '', author: '', overview: '' })
  }

  function deleteBook(index: number) {
    const newBooks = books.filter((book, i) => i !== index)
    setBooks(newBooks)
  }
  return (
    <>
      <div className='book-list-header'>
        <h4>本の追加</h4>
        <input type='text' placeholder='title' onChange={onInput} value={inputBook.title} />
        <input type='text' placeholder='author' onChange={onInput} value={inputBook.author} />
        <input type='text' placeholder='overview' onChange={onInput} value={inputBook.overview} />
        <button onClick={addBook}>追加</button>
      </div>
      <div className='book-list-body'>
        <table>
          <tr>
            <th>タイトル</th>
            <th>著者</th>
            <th>概要</th>
            <th>操作</th>
          </tr>
          {books.map((book, index) => (
            <tr key={index}>
              <td>{book.title}</td>
              <td>{book.author}</td>
              <td>{book.overview}</td>
              <td><button>編集</button>
                <button onClick={() => { deleteBook(index) }}>削除</button></td>
            </tr>
          ))}
        </table>
      </div>
    </>
  )
}

export default App
