import BaseContainer from "core/components/BaseContainer";
import Filter from "./components/Filter";
import './styles.scss';

const Events = () => {
  return (
    <BaseContainer title="Meus eventos">
      <h2>Meus eventos</h2>
      <Filter></Filter>
    </BaseContainer>
  );

}

export default Events;
