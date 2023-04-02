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

  res.json(response.data);
});

app.get('/getRepoIssues', async (req, res) => {
  const authorization = `Bearer ${req.query.token}`;
  const page = req.query.page;

  const response = await axios({
    method: 'GET',
    url: `${BASE_URL}/repos/${OWNER}/${REPO}/issues`,
    headers: {
      Authorization: authorization,
      Accept: 'application/vnd.github+json',
    },
    params: {
      per_page: PER_PAGE,
      page: page,
    },
  });

  res.json(response.data);
});

app.get('/updateIssue', async (req, res) => {
  const authorization = `Bearer ${req.query.token}`;

  const title = req.query.title;
  const body = req.query.body;
  const state = req.query.state;
  const number = req.query.number;
  const labels = req.query.labels;

  const response = await axios({
    method: 'PATCH',
    url: `${BASE_URL}/repos/${OWNER}/${REPO}/issues/${number}`,
    headers: {
      Accept: 'application/json',
      Authorization: authorization,
    },
    data: {
      title,
      body,
      state,
      number,
      labels,
    },
  });

  res.json(response.data);
});

app.get('/createIssue', async (req, res) => {
  const authorization = `Bearer ${req.query.token}`;

  const title = req.query.title;
  const body = req.query.body;
  const labels = req.query.labels;
  // "labels":["Open"]

  const response = await axios({
    method: 'POST',
    url: `${BASE_URL}/repos/${OWNER}/${REPO}/issues`,
    headers: {
      Accept: 'application/vnd.github+json',
      Authorization: authorization,
    },
    data: {
      title,
      body,
      labels,
    },
  });

  res.json(response.data);
});

app.get('/search', async (req, res) => {
  const authorization = `Bearer ${req.query.token}`;
  const keyword = req.query.keyword;

  const response = await axios({
    method: 'GET',
    url: `${BASE_URL}/search/issues`,
    headers: {
      Accept: 'application/vnd.github+json',
      Authorization: authorization,
    },
    parmas: {
      q: `repo:${OWNER}/${REPO} ${keyword} is:issue`,
    },
  });

  res.json(response.data);
});

app.listen(PORT, () => {
  console.log(`CORS server running on http://localhost:${PORT}`);
});
