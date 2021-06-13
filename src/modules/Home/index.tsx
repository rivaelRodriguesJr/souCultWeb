import Navbar from '../../core/components/Navbar';
import HomeRoutes from './HomeRoutes';
import Banner from 'core/assets/images/banner.png';
import React, { Card } from 'react-bootstrap';
import './styles.scss';

const Home = () => (
  <>
    <Navbar />
    <HomeRoutes />
    <Card.Img className = "banner" variant="bottom" src={Banner} />
  </>
);

export default Home;
