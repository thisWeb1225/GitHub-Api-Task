import { useState } from 'react';
import './App.css';

const CLIENT_ID = '2042d1629d1bc7b1b64f';

function App() {
  const [isLogin, setIsLogin] = useState<boolean>(false);

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
