import { useEffect } from "react";
import { useForm } from "react-hook-form";
import MyButton from "components/UI/MyButton/MyButton";
import MyInput from "components/UI/MyInput/MyInput";
import { useAddApartmentMutation } from "redux/apartments/apartmentApi";
import css from "./AddForm.module.css";
import {
  DESCRIPTION_SCHEMA,
  NAME_SCHEMA,
  PRICE_SCHEMA,
  ROOMS_SCHEMA,
} from "helpers/schemas";

const AddForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful },
    trigger,
  } = useForm({
    defaultValues: { name: "", description: "", rooms: null, price: null },
  });

  const [addApartment, { isLoading }] = useAddApartmentMutation();

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
  }, [isSubmitSuccessful, reset]);

  const onSubmit = async (data) => {
    await addApartment({ ...data }).unwrap();
  };

  const handleBlur = (fieldName) => {
    trigger(fieldName);
  };

  return (
    <div className={css.formWrp}>
      <h2 className={css.title}>Add new apartment</h2>
      <form onSubmit={handleSubmit(onSubmit)} className={css.form}>
        <MyInput
          type="text"
          name="name"
          label="Apartment title"
          variant="input"
          placeholder="Enter title"
          errors={errors}
          register={register}
          validationSchema={NAME_SCHEMA}
          handleBlur={() => handleBlur("name")}
          required
        />
        <MyInput
          type="text"
          name="description"
          label="Description"
          variant="textarea"
          placeholder="Enter apartment description"
          errors={errors}
          register={register}
          validationSchema={DESCRIPTION_SCHEMA}
          handleBlur={() => handleBlur("description")}
          required
        />
        <MyInput
          type="number"
          name="rooms"
          label="Rooms"
          placeholder="Enter number of rooms"
          errors={errors}
          register={register}
          validationSchema={ROOMS_SCHEMA}
          handleBlur={() => handleBlur("rooms")}
          required
        />
        <MyInput
          type="number"
          name="price"
          label="Price"
          placeholder="Enter your price"
          errors={errors}
          register={register}
          validationSchema={PRICE_SCHEMA}
          handleBlur={() => handleBlur("price")}
          required
        />
        <MyButton variant="green" type="submit" disabled={isLoading}>
          Add
        </MyButton>
      </form>
    </div>
  );
};

export default AddForm;
