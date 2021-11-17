
import Banner from 'core/assets/images/banner.jpg';
import BannerAbout from 'core/assets/images/about.png';
import React, { Card } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import './styles.scss';

const About = () => (
  <>
    <div className = "homeContainer">
      <Card>
          <Card.Body>
            <div className = "about">
              <h5>
                SOBRE O SOULCULT
              </h5>
              <h6>
                  SouCult é um sistema dedicado a introduzir 
                  o universo cultural como um novo benefício ao mercado de trabalho. 
                  A plataforma busca associar empregadores, colaboradores e meios culturais por
                  meio de um convênio que tem como objetivo viabilizar e incentivar o consumo de
                  práticas culturais no país. 
              </h6>
            </div> 
            <div className = "about">
              <h5>
                MISSÃO
              </h5>

              <h6>
                Disseminar e desenvolver o conhecimento cultural da população, por meio da democratização 
                do acesso aos eventos culturais, para isso a companhia pretende tornar os eventos culturais
                mais acessíveis e auxiliar no desenvolvimento das empresas de nicho cultural, oferecendo um
                serviço seguro e de qualidade.  
              </h6>
            </div> 
            <div className = "about">
              <h5>
                VISÃO
              </h5>

              <h6>
                Ser reconhecida como um agente de mudança educacional, sendo referência em produtos e 
                serviços de foco cultural voltados à área de benefícios corporativos.
              </h6>
            </div>
            <div className = "about">
              <h5>
                VALORES
              </h5>

              <h6>
                Respeito
              </h6>
              <h6>
                Transparência
              </h6>
              <h6>
                Responsabilidade educacional
              </h6>
              <h6>
                Valorização dos serviços culturais
              </h6>
              <h6>
                Inclusão social
              </h6>
              
            </div>  
          </Card.Body>
        </Card>
    </div>
  </>
);

export default About;
