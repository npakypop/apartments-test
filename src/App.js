import ApartmentsList from "components/ApartmentsList/ApartmentsList";
import AddForm from "components/AddForm/AddForm";
import Container from "components/Layout/Container";
import Header from "components/Header/Header";

function App() {
  return (
    <main>
      <Header />
      <Container>
        <AddForm />
        <ApartmentsList />
      </Container>
    </main>
  );
}

export default App;
