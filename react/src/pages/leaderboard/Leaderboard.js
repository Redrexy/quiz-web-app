import { useEffect, useState } from 'react';
import styles from './Leaderbord.module.css';
import { FilterButton } from '../../components/filterButton/FilterButton';
import { getLeaderboard } from '../../api/leaderboard/getLeaderboard';
import { color, size } from '../../theme';

export const Leaderboard = () => {
  const [filterDate, setFilterDate] = useState('all');
  const [filterType, setFilterType] = useState('survival');
  const [leaderboard, setLeaderboard] = useState([]);

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
            color: color.text.primaryWhite,
          }}
        >
          <div
            className={styles.leaderboardHeaderText}
            style={{ flex: 0.5, fontSize: size.fonts.small }}
          >
            Rank
          </div>
          <div
            className={styles.leaderboardHeaderText}
            style={{ flex: 1.5, fontSize: size.fonts.small }}
          >
            Name
          </div>
          <div
            className={styles.leaderboardHeaderText}
            style={{ flex: 0.5, fontSize: size.fonts.small }}
          >
            Score
          </div>
          <div
            className={styles.leaderboardHeaderText}
            style={{ flex: 1, fontSize: size.fonts.small }}
          >
            Date
          </div>
        </div>
        {leaderboard.map((user, index) => (
          <div
            className={styles.leaderboardItem}
            style={{ backgroundColor: color.background.secondaryBackground }}
            key={index}
          >
            <div
              className={styles.leaderboardItemText}
              style={{ flex: 0.5, fontSize: size.fonts.small }}
            >
              {index + 1}
            </div>
            <div
              className={styles.leaderboardItemText}
              style={{ flex: 1.5, fontSize: size.fonts.small }}
            >
              {user.name}
            </div>
            <div
              className={styles.leaderboardItemText}
              style={{ flex: 0.5, fontSize: size.fonts.small }}
            >
              {user.score}
            </div>
            <div
              className={styles.leaderboardItemText}
              style={{ flex: 1, fontSize: size.fonts.small }}
            >
              {new Date(user.date).toLocaleDateString()}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
