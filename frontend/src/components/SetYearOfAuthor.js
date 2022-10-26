import { useState } from 'react'
import { useMutation } from '@apollo/client'
import { ALL_AUTHORS, EDIT_AUTHOR } from '../queries'

import Select from 'react-select';

const SetYearOfAuthor = ({ authors }) => {
  const [author, setAuthor] = useState('')
  const [year, setYear] = useState('')
  const options = authors.map((a) => ({ value: a.name, label: a.name }))

  const [editAuthor] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }]
  });

  const submit = async (event) => {
    event.preventDefault()

    editAuthor({ variables: { name: author.value, setBornTo: Number(year) } })

    console.log('editing author...')

    setAuthor('')
    setYear('')
  }

  return (
    <div>
      <h2>Set birthyear</h2>
      <form onSubmit={submit}>
        <Select
          options={options}
          onChange={setAuthor}
        />
        <div>
          born
          <input
            type="number"
            value={year}
            onChange={({ target }) => setYear(target.value)}
          />
        </div>
        <button type="submit">update author</button>
      </form>
    </div>
  )
}

export default SetYearOfAuthor
