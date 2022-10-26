import { gql } from "@apollo/client/core"

export const ALL_AUTHORS = gql`
query {
  allAuthors {
    name
    born
    bookCount
  }
}
`

export const ALL_BOOKS = gql`
query($genre: String) {
  allBooks(genre: $genre) {
    title
    author {
      name
      born
      bookCount
    }
    published
    genres
  }
}
`

export const NEW_BOOK = gql`
mutation($title: String!, $author: String!, $published: Int, $genres: [String]) {
  addBook(title: $title, author: $author, published: $published, genres: $genres) {
    title
    author {
      name
      born
      bookCount
    }
    published
    genres
  }
}
`

export const EDIT_AUTHOR = gql`
mutation($name: String!, $setBornTo: Int!){
  editAuthor(name: $name, setBornTo: $setBornTo) {
    name
    born
  }
}
`

export const LOGIN = gql`
mutation login($username: String!, $password: String!) {
  login(username: $username, password: $password) {
    value
  }
}
`
export const GET_USER = gql`
query {
  me {
    username
    favoriteGenre
  }
}
`

const BOOKS_DETAILS = gql`
  fragment BooksDetails on Books {
    title
    author {
      name
      born
      bookCount
    }
    published
    genres
  }
`

export const BOOK_ADDED = gql`
  subscription {
    bookAdded {
      ...BooksDetails
    }
  }
  ${BOOKS_DETAILS}
`

