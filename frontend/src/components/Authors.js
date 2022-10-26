import { useQuery } from '@apollo/client';
import { ALL_AUTHORS } from '../queries';
import SetYearOfAuthor from './SetYearOfAuthor';

const Authors = (props) => {
  const result = useQuery(ALL_AUTHORS);
  if (!props.show) {
    return null
  }
  const authors = result.loading ? [] : result.data.allAuthors;

  return (
    <div className='page-container'>
      <h2>Authors</h2>
      <table className=''>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <SetYearOfAuthor authors={authors} />
    </div>
  )
}

export default Authors
