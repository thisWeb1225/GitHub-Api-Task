import { useEffect, useState } from 'react';
import api from './api/api';
import './App.css';

const CLIENT_ID = '2042d1629d1bc7b1b64f';

interface AccessTokenDataType {
  access_token?: string;
  scope?: string;
  token_type?: string;
  error?: string;
  error_description?: string;
}

function App() {
  const [loginState, setLoginState] = useState<boolean>(false);
  const [token, setToken] = useState<string>('');
  const [page, setPage] = useState<number>(1);

  useEffect(() => {
    const queryString = window.location.search;
    const urlParam = new URLSearchParams(queryString);
    const codeParam: string | null = urlParam.get('code');

    if (!codeParam) return;

    api.getAccessToken(codeParam)
      .then((data: AccessTokenDataType) => {
        const token = data?.access_token;
        if (token) {
          localStorage.setItem('accessToken', token);
          setLoginState(true);
          setToken(token)
        }
      })
  }, [])

  useEffect(() => {
    const getIssues = async () => {
      if (loginState) {
        let data = await api.getRepoIssues(token, page);
        console.log(data);
      }
    }
    getIssues()

  }, [loginState])

  const loginWithGitHub = () => {
    window.location.assign(`https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}`);
  }
  const logoutWithGithub = () => {
    localStorage.removeItem('accessToken');
    setLoginState(false)
  }

  return (
    <>
      {loginState ?
        <>
          <p>Login success!</p>
          <button onClick={logoutWithGithub}>Logout</button>
        </>
        :
        <button onClick={loginWithGitHub}>Login</button>
      }
    </>
  )
}

export default App
