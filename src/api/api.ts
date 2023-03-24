import axios from "axios";
import { IssueType } from "../context/IssuesProvider";

type ApiType = {
  getAccessToken: (codeParam: string | null) => any,
  getRepoIssues: (token: string | null, page: number) => any,
  updateIssue: (token: string | null, issue: IssueType) => any,
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
    const {number ,title: editedTitle , body: editedBody, state} = issue;
    let response = await axios({
      method: 'GET',
      url: 'http://localhost:4000/updateIssue',
      params: {
        token: token,
        title: editedTitle,
        body: editedBody,
        number: number,
      }
    })
  }

}

export default api;