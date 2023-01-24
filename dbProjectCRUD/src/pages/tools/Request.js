import React from 'react';
import axios from 'axios';
function Request({url,method,data}) {

    return axios({
        baseURL:"http://localhost:3011",
        url,
      method,
      data
    })
}

export default Request;