import Apartment from "components/Apartment/Apartment";
import {
  loadFromSessionStorage,
  saveToSessionStorage,
} from "helpers/localStorage";
import React, { useEffect, useState } from "react";
import { useGetApartmentsQuery } from "redux/apartments/api";

const ApartmentsList = () => {
  const [rooms, setRooms] = useState("");
  const [price, setPrice] = useState("");
  const { isLoading, data = [] } = useGetApartmentsQuery({ rooms, price });

  useEffect(() => {
    const savedRooms = loadFromSessionStorage("rooms");
    const savedPrice = loadFromSessionStorage("price");
    if (savedRooms) {
      setRooms(savedRooms);
    }
    if (savedPrice) {
      setPrice(savedPrice);
    }
  }, []);

  useEffect(() => {
    saveToSessionStorage("rooms", rooms);
    saveToSessionStorage("price", price);
  }, [rooms, price]);

  if (isLoading) return <h1>loading</h1>;

  return (
    <div style={{ backgroundColor: "grey" }}>
      <select
        name="rooms"
        value={rooms}
        onChange={(e) => setRooms(e.target.value)}
      >
        <option value="">all</option>
        <option value="1">1 room</option>
        <option value="2">2 rooms</option>
        <option value="3">3 rooms</option>
        <option value="4">4 rooms</option>
      </select>
      <select
        name="price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      >
        <option value="">default</option>
        <option value="asc">ascending</option>
        <option value="desc">descending</option>
      </select>
      <h3>List of apartments</h3>
      <p>Total: {data.length}</p>
      <ul>
        {data.map((item, index) => (
          <li key={item._id}>
            <Apartment item={item} index={index} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ApartmentsList;
