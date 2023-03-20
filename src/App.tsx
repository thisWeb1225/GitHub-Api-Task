import { useEffect, useState } from 'react';
import './App.css';

const CLIENT_ID = '2042d1629d1bc7b1b64f';

function App() {
  const [isLogin, setIsLogin] = useState<boolean>(false);

  useEffect(() => {
    const queryString = window.location.search;
    const urlParam = new URLSearchParams(queryString);
    const codeParam = urlParam.get('code');

    console.log(codeParam);
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
