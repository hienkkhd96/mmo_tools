import ttCheoClient from "./ttcheo.client";

export const ttCheoApi = {
    getProfile: (token: string) => {
        return ttCheoClient.post('/logintoken.php', {
            access_token: token
        });
    },

};
