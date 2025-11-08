import { useEffect, useState } from 'react';
import styles from './Leaderbord.module.css';
import { FilterButton } from '../../components/filterButton/FilterButton';
import { getLeaderboard } from '../../api/leaderboard/getLeaderboard';
import { color, size } from '../../theme';

export const Leaderboard = () => {
  const [filterDate, setFilterDate] = useState('all');
  const [filterType, setFilterType] = useState('survival');
  const [leaderboard, setLeaderboard] = useState([]);
  let lastScore = null;
  let lastRank = 0;

  const rankedLeaderboard = leaderboard.map((user, index) => {
    if (user.score === lastScore) {
      user.rank = lastRank;
    } else {
      user.rank = index + 1;
      lastRank = index + 1;
      lastScore = user.score;
    }

    return user;
  });

  const buttonColor = (value, filter) => {
    if (filter === 'date') {
      return filterDate === value
        ? color.background.tertiaryBackground
        : color.background.secondaryBackground;
    } else if (filter === 'quiz') {
      return filterType === value
        ? color.background.tertiaryBackground
        : color.background.secondaryBackground;
    }
  };

  const getLeaderboardData = async () => {
    const result = await getLeaderboard(filterType, filterDate);
    if (result.success) {
      setLeaderboard(result.data);
    } else {
      setLeaderboard([]);
      console.error(result.error);
    }
  };

  useEffect(() => {
    getLeaderboardData();
  }, [filterDate, filterType]);

  return (
    <div
      className={styles.leaderboardPage}
      style={{ background: color.background.primaryBackground }}
    >
      {/* <div
        className={styles.LeaderboardTop}
        style={{ color: color.text.primaryWhite }}
      >
        Leaderboard
      </div> */}

      <div className={styles.filterContainer}>
        <div className={styles.filterDate}>
          <FilterButton
            text="All Time"
            backgroundColor={buttonColor('all', 'date')}
            onClick={() => setFilterDate('all')}
          />
          <FilterButton
            text="This Week"
            backgroundColor={buttonColor('week', 'date')}
            onClick={() => setFilterDate('week')}
          />
          <FilterButton
            text="Today"
            backgroundColor={buttonColor('day', 'date')}
            onClick={() => setFilterDate('day')}
          />
        </div>

        <div className={styles.filterType}>
          <FilterButton
            text="Survival"
            backgroundColor={buttonColor('survival', 'quiz')}
            onClick={() => setFilterType('survival')}
          />
          <FilterButton
            text="Minute"
            backgroundColor={buttonColor('minute', 'quiz')}
            onClick={() => setFilterType('minute')}
          />
        </div>
      </div>

      <div className={styles.leaderboard}>
        <div
          className={styles.leaderboardHeader}
          style={{
            background: color.background.tertiaryBackground,
            color: color.text.primaryBlack,
          }}
        >
          <div
            className={styles.leaderboardHeaderText}
            style={{
              flex: 0.5,
              fontSize: size.fonts.small,
              color: color.text.primaryBlack,
            }}
          >
            Rank
          </div>
          <div
            className={styles.leaderboardHeaderText}
            style={{
              flex: 1.5,
              fontSize: size.fonts.small,
              color: color.text.primaryBlack,
            }}
          >
            Name
          </div>
          <div
            className={styles.leaderboardHeaderText}
            style={{
              flex: 0.5,
              fontSize: size.fonts.small,
              color: color.text.primaryBlack,
            }}
          >
            Score
          </div>
          <div
            className={styles.leaderboardHeaderText}
            style={{
              flex: 1,
              fontSize: size.fonts.small,
              color: color.text.primaryBlack,
            }}
          >
            Date
          </div>
        </div>
        {rankedLeaderboard.map((user) => (
          <div
            className={styles.leaderboardItem}
            style={{ backgroundColor: color.background.secondaryBackground }}
            key={user.id || user.name + user.score}
          >
            <div
              className={styles.leaderboardItemText}
              style={{
                flex: 0.5,
                fontSize: size.fonts.small,
              }}
            >
              <span
                style={{
                  background: color.leaderboard[user.rank] || null,
                  color:
                    user.rank <= 3
                      ? color.text.primaryWhite
                      : color.text.primaryBlack,
                  width: 20,
                  height: 20,
                  borderRadius: '50%',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {user.rank}
              </span>
            </div>
            <div
              className={styles.leaderboardItemText}
              style={{
                flex: 1.5,
                fontSize: size.fonts.small,
                color: color.text.primaryBlack,
              }}
            >
              {user.name}
            </div>
            <div
              className={styles.leaderboardItemText}
              style={{
                flex: 0.5,
                fontSize: size.fonts.small,
                color: color.text.primaryBlack,
              }}
            >
              {user.score}
            </div>
            <div
              className={styles.leaderboardItemText}
              style={{
                flex: 1,
                fontSize: size.fonts.small,
                color: color.text.primaryBlack,
              }}
            >
              {new Date(user.date).toLocaleDateString()}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
