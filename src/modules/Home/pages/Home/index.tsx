
import Banner from 'core/assets/images/banner.jpg';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './styles.scss';

const Home = () => (
  <>
    <div className="homeContainer">
      <Card.Img className="banner" variant="bottom" src={Banner} />
      <Card>
        <Card.Body>
          <Link to="/home/register">
            <h5>ENTRE EM CONTATO CONOSCO PARA FAZER PARTE DESSE GRANDE SHOW!</h5>
          </Link>
        </Card.Body>
      </Card>
    </div>
  </>
);

export default Home;
