import axios from 'axios';

export const http = (url, request = null) => {
    const token = localStorage.getItem("token");

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