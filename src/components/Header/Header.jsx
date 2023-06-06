import Container from "components/Layout/Container";
import css from "./Header.module.css";

const Header = () => {
  return (
    <header className={css.header}>
      <Container>
        <h2 className={css.headerTitle}>Apartments Marketplace</h2>
      </Container>
    </header>
  );
};

export default Header;
