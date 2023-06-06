import { useState } from "react";
import MyButton from "components/UI/MyButton/MyButton";
import {
  useDeleteApartmentMutation,
  useGetApartmentByIdQuery,
} from "redux/apartments/apartmentApi";
import css from "./Apartment.module.css";

const Apartment = ({ item, index }) => {
  const [skip, setSkip] = useState(true);
  const { data: apartment, isLoading } = useGetApartmentByIdQuery(item._id, {
    skip,
  });
  const [deleteApartment, { isLoading: deleteIsLoading }] =
    useDeleteApartmentMutation();

  const handleDeleteApartment = async (id) => {
    await deleteApartment(id).unwrap;
  };

  const openDetails = () => {
    setSkip((prev) => !prev);
  };

  return (
    <div>
      <div className={css.card}>
        <h3 className={css.title}>
          {index + 1}. {item.name}
        </h3>
        <div className={css.detailesWrp}>
          <div className={css.detailes}>Rooms: {item.rooms}</div>
          <div className={css.detailes}>Price: {item.price}</div>
        </div>
        <div className={css.btnWrp}>
          <MyButton
            variant="red"
            disabled={deleteIsLoading ? true : false}
            type="button"
            onClick={() => handleDeleteApartment(item._id)}
          >
            {deleteIsLoading ? "Deleting" : "Delete"}
          </MyButton>
          <MyButton variant="green" type="button" onClick={openDetails}>
            Show details
          </MyButton>
        </div>
        {isLoading && <p>Loading...</p>}
        {!skip && !isLoading && (
          <div className={css.fetchDetailesWrp}>
            <p className={css.detailes}>{apartment.description}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Apartment;
