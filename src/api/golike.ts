import golikeClient from './golikeClient';

export const golikeApi = {
  getProfile: async (token: string) => {
    return golikeClient.get('users/me', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
};
