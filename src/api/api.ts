import axios from "axios";

interface ApiType {
  getAccessToken: (codeParam: string | null) => Promise<any>;
  getRepoIssues: (token: string | null, page: number) => Promise<any>
}

const api: ApiType = {
  getAccessToken: async (codeParam) => {
    try {
      const response: any = await axios({
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
      throw new Error('error');
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
  }
}

export default api;