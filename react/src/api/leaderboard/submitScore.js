import { endpoints } from '../endpoints';

export const submitScore = async (name, score, type) => {
  try {
    const response = await fetch(endpoints.leaderboard, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, score, type }),
    });
    if (!response.ok) {
      return { success: false };
    }

    return { success: true };
  } catch (error) {
    console.error(error);
    return { success: false };
  }
};
