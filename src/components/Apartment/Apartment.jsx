import Loader from "components/UI/Loader/Loader";
import MyButton from "components/UI/MyButton/MyButton";
import React, { useState } from "react";
import {
  useDeleteApartmentMutation,
  useGetApartmentByIdQuery,
} from "redux/apartments/api";
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
        <h2>
          {index + 1}. {item.name}
        </h2>
        {/* <div style={{ display: "flex", gap: "20px" }}>
        <div>rooms: {item.rooms}</div>
        <div>price: {item.price}</div>
      </div> 
       <p>{item.description}</p> */}
        {/* <button
          style={{
            padding: "5px 10px",
            backgroundColor: "#ff7f7f",
            border: "none",
            cursor: "pointer",
          }}
          disabled={deleteIsLoading ? true : false}
          type="button"
          onClick={() => handleDeleteApartment(item._id)}
        >
          {deleteIsLoading ? "deleting" : "delete"}
        </button> */}
        {/* <button
          style={{
            padding: "5px 10px",
            backgroundColor: "#7fffb2",
            border: "none",
            cursor: "pointer",
          }}
          type="button"
          onClick={openDetails}
        >
          Show details
        </button> */}
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
          <div>
            <div style={{ display: "flex", gap: "20px" }}>
              <div>rooms: {apartment.rooms}</div>
              <div>price: {apartment.price}</div>
            </div>
            <p>{apartment.description}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Apartment;
