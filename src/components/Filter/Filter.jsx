import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import MySelect from "components/UI/MySelect/MySelect";
import { filterApartments } from "redux/filter/filterSlice";
import {
  loadFromSessionStorage,
  saveToSessionStorage,
} from "helpers/localStorage";
import css from "./Filter.module.css";

const Filter = () => {
  const [rooms, setRooms] = useState("");
  const [price, setPrice] = useState("");
  const dispatch = useDispatch();

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
    const filter = { rooms, price };
    dispatch(filterApartments(filter));
    saveToSessionStorage("rooms", rooms);
    saveToSessionStorage("price", price);
  }, [rooms, price, dispatch]);

  return (
    <div className={css.filterWrp}>
      <MySelect
        value={rooms}
        onChange={(v) => setRooms(v)}
        defaultValue="Filter by rooms"
        options={[
          { value: "", name: "All" },
          { value: "1", name: "1 rooms" },
          { value: "2", name: "2 rooms" },
          { value: "3", name: "3 rooms" },
          { value: "4", name: "4 rooms" },
        ]}
      />
      <MySelect
        value={price}
        onChange={(v) => setPrice(v)}
        defaultValue="Sort by price"
        options={[
          { value: "", name: "None" },
          { value: "asc", name: "Ascending" },
          { value: "desc", name: "Descending" },
        ]}
      />
    </div>
  );
};

export default Filter;
