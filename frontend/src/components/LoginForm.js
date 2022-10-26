import { useEffect, useState } from 'react'
import { useMutation } from '@apollo/client'
import { LOGIN } from '../queries'

const LoginForm = ({ setToken, show, setPage, getUser }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const [login, result] = useMutation(LOGIN, {
    onError: (e) => {setError(e.graphQLErrors[0].message);}
  });

  useEffect(() => {
    if (result.data) {
      const token = result.data.login.value;
      setToken(token);
      localStorage.setItem('user-token', token);
      setPage('authors')
    }
  }, [result.data])

  if (!show) {
    return null
  }

  const submit = async (event) => {
    event.preventDefault()
    await login({ variables: { username, password } })

    console.log('login...')
    getUser();
    setPassword('')
    setUsername('')
  }

  return (
    <div>
      <form onSubmit={submit} className="page-container">
        <h3>username</h3>
        <input
          className='dark-input'
          value={username}
          onChange={({ target }) => setUsername(target.value)}
        />
        <h3>password</h3>
        <input
          className='dark-input'
          type="password"
          value={password}
          onChange={({ target }) => setPassword(target.value)}
        />
        <button type="submit">Login</button>
      </form>
      {error}
    </div>
  )
}

export default LoginForm
