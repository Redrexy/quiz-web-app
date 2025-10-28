import { endpoints } from '../endpoints';

export const getLeaderboard = async () => {
  try {
    const response = await fetch(endpoints.leaderboard, { method: 'GET' });
    if (!response.ok) {
      // throw new Error(data.error);
      return { success: true };
    }

    const data = await response.json();

    return { success: true, data };
  } catch (error) {
    console.error(error);
    return { success: false };
  }
};
