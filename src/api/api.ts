import axios from "axios";
import { IssueType } from "../context/IssuesProvider";

type EditedIssueType = {
  number?: number,
  editedTitle: string,
  editedBody: string,
  editedState?: string,
  labels?: string[],
}

type ApiType = {
  getAccessToken: (codeParam: string) => any,
  getRepoIssues: (token: string, page: number) => any,
  updateIssue: (token: string, issue: EditedIssueType) => any,
  createIssue: (token: string, issue: EditedIssueType) => any,
}

const api: ApiType = {
  getAccessToken: async (codeParam) => {
    try {
      const response = await axios({
        method: 'GET',
        url: 'http://localhost:4000/getAccessToken',
        params: {
          code: codeParam,
        }
      })

      const data = await response.data;
      return data;

    } catch (err) {
      console.error(err);
    }
  },

  getRepoIssues: async (token, page = 1) => {
    const response = await axios({
      method: 'GET',
      url: 'http://localhost:4000/getRepoIssues',
      params: {
        token,
        page
      }
    })
    const data = await response.data;
    return data;
  },

  updateIssue: async (token, issue) => {
    const {number , editedTitle , editedBody, editedState = 'open', labels} = issue;
    try {
      const response = await axios({
        method: 'GET',
        url: 'http://localhost:4000/updateIssue',
        params: {
          token: token,
          title: editedTitle,
          body: editedBody,
          state: editedState,
          number: number,
          labels,
        }
      })

      if (response.status !== 200) {
        throw new Error (`status code is not 200: ${response.status}`);
      }

      if (!response.data) {
        throw new Error (`there is no data in update issue's response`);
      }

      return response.data;

    } catch (err) {
      console.error(err);
    }
  },

  createIssue: async (token, issue) => {
    const {editedTitle , editedBody, labels} = issue;
    try {
      const response = await axios({
        method: 'GET',
        url: 'http://localhost:4000/createIssue',
        params: {
          token: token,
          title: editedTitle,
          body: editedBody,
          labels: labels
        }
      });

      if (response.status !== 200) {
        throw new Error (`status code is not 200: ${response.status}`);
      }

      if (!response.data) {
        throw new Error (`there is no data in update issue's response`);
      }
      return response.data;

    } catch (err) {
      console.error(err);
    }
  }
 
}

export default api;