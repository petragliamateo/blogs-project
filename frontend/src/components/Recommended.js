import React from "react";
import { useQuery } from "@apollo/client"
import { ALL_BOOKS } from "../queries"

const Recommended = ({ show, favoriteGenre }) => {
  const [filtered, setFiltered] = React.useState([]);
  const result = useQuery(ALL_BOOKS, { variables: { genre: favoriteGenre } })
  const books = result.loading ? [] : result.data.allBooks;
  
  React.useEffect(() => {
    console.log('rec');
    const reload = async () => {
      await result.refetch({ genre: favoriteGenre })
      setFiltered(books);
    }
    reload();
  }, [show])

  if (!show) {
    return null
  }

  return (
    <div>
      <h2>recommendations</h2>
      <p>books in your favorite genre <strong>{favoriteGenre}</strong></p>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {filtered.map((b) => (
            <tr key={b.title}>
              <td>{b.title}</td>
              <td>{b.author.name}</td>
              <td>{b.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Recommended;
