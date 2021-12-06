import axios from 'axios';

const token = localStorage.getItem("token");

export const http = (url, request = null) => {
    return axios
        .post(
            process.env.VUE_APP_BASE_URL + url,
            request, {
                headers: {
                    Authorization: `Bearer ` + token,
                },
            }
        );
}