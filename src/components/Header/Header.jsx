import Container from "components/Layout/Container";
import React from "react";

const Header = () => {
  return (
    <header
      style={{
        height: "60px",
        backgroundColor: "#ff7f7f",
      }}
    >
      <Container>
        <p>Apartments Marketplace</p>
      </Container>
    </header>
  );
};

export default Header;
