import Apartment from "components/Apartment/Apartment";
import Filter from "components/Filter/Filter";
import MySelect from "components/UI/MySelect/MySelect";
import {
  loadFromSessionStorage,
  saveToSessionStorage,
} from "helpers/localStorage";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useGetApartmentsQuery } from "redux/apartments/api";
import { selectFilter } from "redux/filter/filterSelector";

const ApartmentsList = () => {
  // const [rooms, setRooms] = useState("");
  // const [price, setPrice] = useState("");
  const { rooms, price } = useSelector(selectFilter);
  const { isLoading, data = [] } = useGetApartmentsQuery({ rooms, price });
  // useEffect(() => {
  //   const savedRooms = loadFromSessionStorage("rooms");
  //   const savedPrice = loadFromSessionStorage("price");
  //   if (savedRooms) {
  //     setRooms(savedRooms);
  //   }
  //   if (savedPrice) {
  //     setPrice(savedPrice);
  //   }
  // }, []);

  // useEffect(() => {
  //   saveToSessionStorage("rooms", rooms);
  //   saveToSessionStorage("price", price);
  // }, [rooms, price]);

  if (isLoading) return <h1>loading</h1>;

  return (
    <div>
      <Filter />
      {/* <MySelect
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
      /> */}

      <h1>List of apartments</h1>
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
// {
//   /* <select
//       name="rooms"
//       value={rooms}
//       onChange={(e) => setRooms(e.target.value)}
//     >
//       <option value="">all</option>
//       <option value="1">1 room</option>
//       <option value="2">2 rooms</option>
//       <option value="3">3 rooms</option>
//       <option value="4">4 rooms</option>
//     </select> */
// }
// {
//   /* <select
//       name="price"
//       value={price}
//       onChange={(e) => setPrice(e.target.value)}
//     >
//       <option value="">default</option>
//       <option value="asc">ascending</option>
//       <option value="desc">descending</option>
//     </select> */
// }
