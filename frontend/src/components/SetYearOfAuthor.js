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
  const selectStyle = {
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isFocused ? '#4C0033' : 'black',
      color: state.isSelected ? 'red' : 'blue',
    }),
    control: (p) => ({
      ...p,
      backgroundColor: '#4C0033',
      borderColor: '#AF0171',
    }),
    placeholder: (p) => ({
      ...p,
      color: '#AF0171',
    }),
    singleValue: (p) => ({
      ...p,
      color: '#AF0171',
    }),
  }

  return (
    <div>
      <h2>Set birthyear</h2>
      <form onSubmit={submit} className='page-container'>
        <Select
          styles={selectStyle}
          options={options}
          onChange={setAuthor}
        />
        <input
          className='dark-input'
          placeholder='Born..'
          type="number"
          value={year}
          onChange={({ target }) => setYear(target.value)}
        />
        <button type="submit">update author</button>
      </form>
    </div>
  )
}

export default SetYearOfAuthor
