import axios from "axios";

interface ApiType {
  getAccessToken: (codeParam: string | null) => Promise<any>;
  getRepoIssues: (params: ParamsType) => Promise<any>
}

interface ParamsType {
  token: string | null;
  editedTitle?: string;
  editedBody?: string;
  id?: number;
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

      if (response.state === 200) {
        const data = await response.data;
        return data;
      } else {
        throw new Error('state error')
      }
     

    } catch (err) {
      console.error(err);
      throw new Error('error');
    }
  },

  getRepoIssues: async (params) => {
    const {token} = params;
    const response = await axios({
      method: 'GET',
      url: 'http://localhost:4000/getRepoIssues',
      params: {
        token
      }
    })

    const data = await response.data;
    return data;
  }
}

export default api;