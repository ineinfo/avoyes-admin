import axios from "axios";

import { DASHBOARD_ROUTE } from "src/utils/apiendpoints";

export const DASHBOARD_COUNT = async ( token) => {
      const response = await axios.get(DASHBOARD_ROUTE, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    }