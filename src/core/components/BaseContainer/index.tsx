import './styles.scss';

type Props = {
  title: string;
  children: React.ReactNode;
}

const BaseContainer = ({ title, children }: Props) => (
  <>
    <h1 className="base-container-title">{title}</h1>
    <hr className="base-container-divider" />
    {children}
  </>
);

export default BaseContainer;
