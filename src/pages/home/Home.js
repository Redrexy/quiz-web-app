import { useNavigate } from 'react-router-dom';
import { PrimaryButton } from '../../components/primaryButton/PrimaryButton';
import { color } from '../../theme';
import './Home.css';

export const Home = () => {
  const navigate = useNavigate();

  return (
    <div
      className="homePage"
      style={{ background: color.background.primaryBackground }}
    >
      <h1 className="homeTitle">React Quiz Application</h1>
      <h3 className="homeDetails">Take this test to test your knowledge!</h3>

      <div className="buttonContainer">
        <PrimaryButton
          text="Survival Mode"
          onClick={() => navigate('/survival')}
          color={color.button.survialMode}
        />
        <PrimaryButton
          text="Result Example"
          onClick={() => navigate('/result')}
          color="blue"
        />
      </div>
    </div>
  );
};
