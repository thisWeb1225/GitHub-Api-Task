const express = require('express');
const cors = require('cors');
const bodyParse = require('body-parser');
const axios = require('axios');

const CLIENT_ID = '2042d1629d1bc7b1b64f';
const CLIENT_SECRET = '99237c4c1bf43ee153b0cff72db5c25bd30a2475';

const BASE_URL = 'https://api.github.com';
const OWNER = 'thisWeb1225';
const REPO = 'GitHub_Task_Demo';
const SCOPE = 'repo:issue';

const PORT = 4000;

const app = express();

app.use(cors());
app.use(bodyParse.json());

app.get('/getAccessToken', async (req, res) => {
  const code = req.query.code;

  try {
    if (!code) throw new Error('need a code param');

    const response = await axios({
      method: 'POST',
      url: `https://github.com/login/oauth/access_token`,
      params: {
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        code: code,
        scope: SCOPE,
      },
      headers: {
        Accept: 'application/json',
      },
    });

    const data = await response.data;
    res.json(data);
  } catch (err) {
    res.send(err);
  }
});

app.listen(PORT, () => {
  console.log(`CORS server running on http://localhost:${PORT}`);
});
