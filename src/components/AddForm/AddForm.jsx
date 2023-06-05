import {
  loadFromSessionStorage,
  removeFromSessionStorage,
  saveToSessionStorage,
} from "helpers/localStorage";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useAddApartmentMutation } from "redux/apartments/api";

const AddForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful },
    trigger,
    setValue,
    watch,
  } = useForm({
    defaultValues: { name: "", description: "", rooms: null, price: null },
  });

  const [addApartment, { isLoading }] = useAddApartmentMutation();

  useEffect(() => {
    const savedFormValues = loadFromSessionStorage("formValues");
    if (savedFormValues) {
      const parsedValues = JSON.parse(savedFormValues);
      Object.keys(parsedValues).forEach((key) =>
        setValue(key, parsedValues[key])
      );
    }
  }, [setValue]);

  useEffect(() => {
    const subscription = watch((data) => {
      saveToSessionStorage("formValues", JSON.stringify(data));
    });
    return () => {
      subscription.unsubscribe();
    };
  }, [watch]);

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
      removeFromSessionStorage("formValues");
    }
  }, [isSubmitSuccessful, reset]);

  const onSubmit = async (data) => {
    await addApartment({ ...data }).unwrap();
    // reset();
    // removeFromSessionStorage("formValues");
  };

  const handleBlur = (fieldName) => {
    trigger(fieldName);
  };

  return (
    <div>
      <h3>Add new apartment</h3>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            {...register("name", {
              required: "This field is required",
              maxLength: {
                value: 99,
                message: "Max length exceeded (99 characters).",
              },
            })}
            onBlur={() => handleBlur("name")}
          />
          {errors.name && <p>{errors.name.message}</p>}
        </div>

        <div>
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            {...register("description", {
              required: "This field is required",
              maxLength: {
                value: 99,
                message: "Max length exceeded (99 characters).",
              },
            })}
            onBlur={() => handleBlur("description")}
          />
          {errors.description && <p>{errors.description.message}</p>}
        </div>

        <div>
          <label htmlFor="rooms">Room Count:</label>
          <input
            type="number"
            id="rooms"
            {...register("rooms", {
              required: "This field is required.",
              min: {
                value: 1,
                message: "Number of rooms must be greater than 0.",
              },
            })}
            onBlur={() => handleBlur("rooms")}
          />
          {errors.rooms && <p>{errors.rooms.message}</p>}
        </div>

        <div>
          <label htmlFor="price">Rental Price:</label>
          <input
            type="number"
            id="price"
            {...register("price", {
              required: "This field is required.",
              min: {
                value: 1,
                message: "Price must be greater than 0.",
              },
            })}
            onBlur={() => handleBlur("price")}
          />
          {errors.price && <p>{errors.price.message}</p>}
        </div>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default AddForm;
