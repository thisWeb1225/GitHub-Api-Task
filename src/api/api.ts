import axios from "axios";
import { IssueType } from "../context/IssuesProvider";

type EditedIssueType = {
  number: number,
  editedTitle: string,
  editedBody: string,
  editedState?: string,
}

type ApiType = {
  getAccessToken: (codeParam: string) => any,
  getRepoIssues: (token: string, page: number) => any,
  updateIssue: (token: string, issue: EditedIssueType) => any,
  updateIssueLabels: (token: string ,number: number, labels: string[]) => any,
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
      return err;
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
    const {number , editedTitle , editedBody, editedState = 'open'} = issue;
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
        }
      })

      const data = await response.data

      return data
    } catch (err) {
      console.error(err);
      return err;
    }
  },

  updateIssueLabels: async (token ,number, labels) => {
    try {
      const response = await axios({
        method: 'GET',
        url: 'http://localhost:4000/updateIssueLabels',
        params: {
          token: token,
          number: number,
          labels: labels
        }
      })

      const data = await response.data

      return data
    } catch (err) {
      console.error(err);
      return err;
    }
  },

  createIssue: async (token, issue) => {
    const {number , editedTitle , editedBody} = issue;
    try {
      const response = await axios({
        method: 'GET',
        url: 'http://localhost:4000/createIssue',
        params: {
          token: token,
          title: editedTitle,
          body: editedBody,
          labels: ['Open']
        }
      })

      const data = await response.data

      return data
    } catch (err) {
      console.error(err);
      return err;
    }
  }
 
}

export default api;