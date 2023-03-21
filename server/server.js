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
const PER_PAGE = 10;

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

    console.log(response.status);

    const data = await response.data;
    res.json(data);
  } catch (err) {
    console.error(err);
    res.send(err);
  }
});

app.get('/getRepoIssues', async (req, res) => {
  const authorization = `Bearer ${req.query.token}`;
  const page = req.query.page;

  try {
    const response = await axios({
      method: 'GET',
      url: `${BASE_URL}/repos/${OWNER}/${REPO}/issues`,
      headers: {
        Authorization: authorization,
        Accept: 'application/vnd.github+json',
      },
      parmas: {
        per_page: PER_PAGE,
        page: page,
      },
    });

    const data = await response.data;
    res.json(data);
  } catch (err) {
    console.error(err);
    res.send(err);
  }
});

app.listen(PORT, () => {
  console.log(`CORS server running on http://localhost:${PORT}`);
});
