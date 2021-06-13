
import Banner from 'core/assets/images/banner.jpg';
import React, { Card } from 'react-bootstrap';
import './styles.scss';

const Home = () => (
  <>
    <div className = "homeContainer">
      <Card.Img className = "banner" variant="bottom" src={Banner} />
      <Card>
      <Card.Body>
        <a href = "/home/register">
          <h5>ENTRE EM CONTATO CONOSCO PARA FAZER PARTE DESSE GRANDE SHOW!</h5>
        </a>
      </Card.Body>
      </Card>
    </div>
  </>
);

export default Home;
