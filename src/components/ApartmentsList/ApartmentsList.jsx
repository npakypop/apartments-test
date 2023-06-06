import { useSelector } from "react-redux";
import Filter from "components/Filter/Filter";
import Apartment from "components/Apartment/Apartment";
import Loader from "components/UI/Loader/Loader";
import { useGetApartmentsQuery } from "redux/apartments/apartmentApi";
import { selectFilter } from "redux/filter/filterSelector";
import css from "./ApartmentsList.module.css";

const ApartmentsList = () => {
  const { rooms, price } = useSelector(selectFilter);
  const { isLoading, data = [] } = useGetApartmentsQuery({ rooms, price });

  return (
    <div className={css.listSection}>
      <h1 className={css.listTitle}>Avaliable apartments</h1>
      <div className={css.wrp}>
        <Filter />
        <div className={css.total}>
          Total:
          <span className={css.totalNumber}>
            {isLoading ? "" : data.length}
          </span>
        </div>
      </div>
      {isLoading ? (
        <Loader />
      ) : (
        <ul className={css.list}>
          {data.map((item, index) => (
            <li key={item._id} className={css.listItem}>
              <Apartment item={item} index={index} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ApartmentsList;
