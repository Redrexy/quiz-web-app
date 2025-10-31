import { endpoints } from '../endpoints';

export const getLeaderboard = async (type, date) => {
  try {
    const params = new URLSearchParams();

    if (type) {
      params.append('type', type);
    }
    if (date) {
      params.append('date', date);
    }

    const url = params.toString()
      ? `${endpoints.leaderboard}?${params.toString()}`
      : endpoints.leaderboard;

    const response = await fetch(url, { method: 'GET' });
    if (!response.ok) {
      // throw new Error(data.error);
      return { success: false };
    }

    const data = await response.json();

    return { success: true, data };
  } catch (error) {
    console.error(error);
    return { success: false };
  }
};
