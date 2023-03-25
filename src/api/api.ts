import axios from "axios";
import { IssueType } from "../context/IssuesProvider";

type EditedIssueType = {
  number: number,
  editedTitle: string,
  editedBody: string,
  editedState: string,
}

type ApiType = {
  getAccessToken: (codeParam: string | null) => any,
  getRepoIssues: (token: string | null, page: number) => any,
  updateIssue: (token: string | null, issue: EditedIssueType) => any,
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
    const {number , editedTitle , editedBody, editedState} = issue;
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
      console.log(data)

      return data
    } catch (err) {
      console.error(err);
      return err;
    }
  }

}

export default api;