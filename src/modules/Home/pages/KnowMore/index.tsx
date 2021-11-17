
import Banner from 'core/assets/images/banner.jpg';
import BannerAbout from 'core/assets/images/about.png';
import React, { Card } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import './styles.scss';

const KnowMore = () => (
  <>
    <div className = "homeContainer">
      <Card>
        <Card.Img className = "banner" variant="bottom" src={BannerAbout} />
        <Card.Body>
          <h5>
             SOBRE O SOULCULT
          </h5>
          <div className = "about">
            <h6>
                SouCult é um sistema dedicado a introduzir 
                o universo cultural como um novo benefício ao mercado de trabalho. 
                A plataforma busca associar empregadores, colaboradores e meios culturais por
                meio de um convênio que tem como objetivo viabilizar e incentivar o consumo de
                práticas culturais no país. 
            </h6>
          </div> 
        </Card.Body>
      </Card>
    </div>
  </>
);

export default KnowMore;
