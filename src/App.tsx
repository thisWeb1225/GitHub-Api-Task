import { useEffect, useState } from 'react';
import api from './api/api';
import './App.css';

const CLIENT_ID = '2042d1629d1bc7b1b64f';

interface AccessTokenDataType {
  access_token: string;
  scope: string;
  token_type: string;
}

function App() {
  const [isLogin, setIsLogin] = useState<boolean>(false);

  useEffect(() => {
    const queryString = window.location.search;
    const urlParam = new URLSearchParams(queryString);
    const codeParam: string | null = urlParam.get('code');

    api.getAccessToken(codeParam)
      .then((data: AccessTokenDataType) => {
        const token = data?.access_token;
        if (token) {
          console.log(data.access_token);
        }

      })

  })

  const loginWithGitHub = () => {
    window.location.assign(`https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}`);
  }

  return (
    <>
      {isLogin ?
        <p>Login success!</p>
        :
        <button onClick={loginWithGitHub}>Login</button>
      }
    </>
  )
}

export default App
