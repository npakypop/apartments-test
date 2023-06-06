import MyButton from "components/UI/MyButton/MyButton";
import MyInput from "components/UI/MyInput/MyInput";
import {
  DESCRIPTION_SCHEMA,
  NAME_SCHEMA,
  PRICE_SCHEMA,
  ROOMS_SCHEMA,
} from "helpers/schemas";
// import {
//   loadFromSessionStorage,
//   removeFromSessionStorage,
//   saveToSessionStorage,
// } from "helpers/localStorage";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useAddApartmentMutation } from "redux/apartments/api";
import css from "./AddForm.module.css";

const AddForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful },
    trigger,
    // setValue,
    // watch,
  } = useForm({
    defaultValues: { name: "", description: "", rooms: null, price: null },
  });

  const [addApartment, { isLoading }] = useAddApartmentMutation();

  // useEffect(() => {
  //   const savedFormValues = loadFromSessionStorage("formValues");
  //   if (savedFormValues) {
  //     const parsedValues = JSON.parse(savedFormValues);
  //     Object.keys(parsedValues).forEach((key) =>
  //       setValue(key, parsedValues[key])
  //     );
  //   }
  // }, [setValue]);

  // useEffect(() => {
  //   const subscription = watch((data) => {
  //     saveToSessionStorage("formValues", JSON.stringify(data));
  //   });
  //   return () => {
  //     subscription.unsubscribe();
  //   };
  // }, [watch]);

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
      // removeFromSessionStorage("formValues");
    }
  }, [isSubmitSuccessful, reset]);

  // useEffect(() => {
  //   const handleBeforeUnload = (event) => {
  //     event.preventDefault();
  //     event.returnValue = "Вы покидаете эту страницу и данные будут потеряны";
  //   };

  //   window.addEventListener("beforeunload", handleBeforeUnload);

  //   return () => {
  //     window.removeEventListener("beforeunload", handleBeforeUnload);
  //   };
  // }, []);

  const onSubmit = async (data) => {
    await addApartment({ ...data }).unwrap();
  };

  const handleBlur = (fieldName) => {
    trigger(fieldName);
  };

  return (
    <div className={css.formWrp}>
      <h3 className={css.title}>Add new apartment</h3>
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
