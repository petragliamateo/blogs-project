import { useState } from 'react'
import { useMutation } from '@apollo/client'
import { ALL_AUTHORS, ALL_BOOKS, NEW_BOOK } from '../queries'

const NewBook = (props) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [published, setPublished] = useState('')
  const [genre, setGenre] = useState('')
  const [genres, setGenres] = useState([])

  const [createBook] = useMutation(NEW_BOOK, {
    refetchQueries: [{ query: ALL_AUTHORS }],
    update: (store, response) => {
      const dataInStore = store.readQuery({ query: ALL_BOOKS });
      store.writeQuery({
        query: ALL_BOOKS,
        data: {
          ...dataInStore,
          allBooks: [ ...dataInStore.allBooks, response.data.addBook ],
        }
      })
    }
  });

  if (!props.show) {
    return null
  }

  const submit = async (event) => {
    event.preventDefault()

    createBook({ variables: { title, author, published: Number(published), genres } })

    console.log('add book...')

    setTitle('')
    setPublished('')
    setAuthor('')
    setGenres([])
    setGenre('')
  }

  const addGenre = () => {
    setGenres(genres.concat(genre))
    setGenre('')
  }

  return (
    <div>
      <form onSubmit={submit} className="page-container">
        <div>
          <h3>Title</h3>
          <input
            className='dark-input'
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          <h3>Author</h3>
          <input
            className='dark-input'
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          <h3>Published</h3>
          <input
            className='dark-input'
            type="number"
            value={published}
            onChange={({ target }) => setPublished(target.value)}
          />
        </div>
        <div>
          <h3>Genre</h3>
          <input
            className='dark-input'
            value={genre}
            onChange={({ target }) => setGenre(target.value)}
          />
          <button className='my-1' onClick={addGenre} type="button">
            Add genre
          </button>
          <div>Genres: {genres.join(' ')}</div>
        </div>
        <button type="submit">Create book</button>
      </form>
    </div>
  )
}

export default NewBook
