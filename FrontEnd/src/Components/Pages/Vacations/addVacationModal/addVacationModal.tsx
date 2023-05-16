import "./addVacationModal.css";
import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { InputAdornment, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import { Vacation } from "../../../Model/Vacation";
import axios from "axios";
import { vacation } from "../../../Redux/VacationStore";
import { newVacationAction } from "../../../Redux/VacationReducer";

// saves new user in the database and redux
const addNewVacation = (newVacation: Vacation) => {
  vacation.dispatch(newVacationAction(newVacation));
  axios
    .post(
      "http://localhost:8080/api/v1/vacation/vacations/newVacation",
      newVacation
    )
    .then((response) => {
      console.log(response);
    });
};

export default function AddVacationModal() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onSubmit = (data: any) => {
    try {
      const newVacation: Vacation = {
        vacationDestiny: data.destination,
        vacationDesc: data.description,
        vacationStart: data.startDate,
        vacationEnd: data.finishDate,
        price: data.price,
        photoFile: data.image[0].name,
      };
      addNewVacation(newVacation);
      handleClose();
    } catch (error) {
      console.error(error);
    }
  };

  // use form for form validation
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm();

  return (
    <div>
      <Button
        variant="contained"
        onClick={handleClickOpen}
        sx={{ marginTop: "1rem" }}
      >
        Add Vacation
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        sx={{
          backgroundColor: "rgba(0,0,0,0.4)",
        }}
        PaperProps={{
          sx: {
            backgroundColor: "rgba(255,255,255,0.9)",
            color: "black",
          },
        }}
      >
        <DialogTitle>Add New Vacation</DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ color: "black" }}>
            To add a vacation to this website, please fill up all the fields
            below.
          </DialogContentText>
          <br /> <br />
          <form onSubmit={handleSubmit(onSubmit)}>
            <TextField
              margin="normal"
              fullWidth
              autoFocus
              placeholder="Destination "
              id="destination"
              {...register("destination", { required: true })}
              error={Boolean(errors.destination)}
              helperText={errors.destination && "Destination is required"}
            />
            <TextField
              fullWidth
              autoFocus
              id="description"
              placeholder="Description"
              {...register("description", { required: true })}
              error={Boolean(errors.description)}
              helperText={errors.description && "Description is required"}
            />
            <br />
            <label htmlFor="startDate" className="label-large">
              Start date:
            </label>
            <TextField
              type="date"
              id="startDate"
              fullWidth
              autoFocus
              {...register("startDate", { required: true })}
              error={Boolean(errors.startDate)}
              helperText={errors.startDate && "Start date is required"}
              inputProps={{
                min: new Date().toISOString().slice(0, 10),
              }}
            />
            <br />
            <br />
            <label htmlFor="finishDate" className="label-large">
              Finish date:
            </label>
            <TextField
              type="date"
              id="finishDate"
              fullWidth
              autoFocus
              {...register("finishDate", {
                required: true,
                validate: {
                  notEarlier: (value) => {
                    const startDate = new Date(getValues("startDate")); // get start date from form values
                    const finishDate = new Date(value); // convert finish date string to date object
                    return finishDate >= startDate;
                  },
                },
              })}
              error={Boolean(errors.finishDate)}
              helperText={
                errors.finishDate &&
                "Finish date is required and must be later than start date"
              }
              inputProps={{
                min: new Date().toISOString().slice(0, 10),
              }}
            />
            <br />
            <br />
            <TextField
              placeholder="Price"
              type="number"
              id="price"
              fullWidth
              autoFocus
              {...register("price", { required: true, min: 0, max: 10000 })}
              error={Boolean(errors.price)}
              helperText={
                errors.price &&
                "Price is required and must be between 0 and 10000"
              }
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">$</InputAdornment>
                ),
              }}
            />
            <br />
            <br />
            <label htmlFor="image" className="label-large">
              Image upload
            </label>
            <TextField
              type="file"
              id="image"
              fullWidth
              autoFocus
              {...register("image", { required: true })}
              error={Boolean(errors.image)}
              helperText={errors.image && "Image is required"}
            />
            <Button onClick={handleClose}>Cancel</Button>
            <Button type="submit">Add Vacation</Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
