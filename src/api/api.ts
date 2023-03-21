import axios from "axios";

interface ApiType {
  getAccessToken: (codeParam: string | null) => any;
}

const api: ApiType = {
  getAccessToken: async (codeParam) => {
    try {
      let response = await axios({
        method: 'GET',
        url: 'http://localhost:4000/getAccessToken',
        params: {
          code: codeParam,
        }
      })
      const data = await response.data;
      return data;

    } catch (err) {
      return err;
    }
  }
}

export default api;