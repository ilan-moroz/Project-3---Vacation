import "./addVacationModal.css";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { InputAdornment, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import { Vacation } from "../../../../Model/Vacation";
import axios from "axios";
import { vacation } from "../../../../Redux/VacationStore";
import { newVacationAction } from "../../../../Redux/VacationReducer";
import { useState } from "react";

// saves new vacation in the database and redux
const addNewVacation = async (newVacation: Vacation) => {
  const response = await axios.post(
    "http://localhost:8080/api/v1/vacation/vacations/newVacation",
    newVacation
  );
  const vacationKey = response.data.insertId;
  vacation.dispatch(
    newVacationAction({ ...newVacation, vacationKey: vacationKey })
  );
};

// save the image in the backend
const uploadImage = (newImage: any) => {
  console.log(newImage);
  const image = new FormData();
  image.append("sampleFile", newImage);
  axios.post(
    "http://localhost:8080/api/v1/vacation/vacations/uploadImage",
    image,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
};

export default function AddVacationModal() {
  const [open, setOpen] = useState(false);
  const [image, setImage] = useState("");

  function handleChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
    }
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    reset();
    setImage("");
    setOpen(false);
  };

  const onSubmit = async (data: any) => {
    const startDate = new Date(data.startDate);
    const finishDate = new Date(data.finishDate);
    try {
      const newVacation: Vacation = {
        vacationDestiny: data.destination,
        vacationDesc: data.description,
        vacationStart: startDate.toLocaleDateString("en-GB"),
        vacationEnd: finishDate.toLocaleDateString("en-GB"),
        price: data.price,
        photoFile: data.image[0].name,
      };
      // check if destiny exist in database if it exists cancel the upload and notyf
      addNewVacation(newVacation);
      uploadImage(data.image[0]);
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
    reset,
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
          backgroundColor: "rgba(0,0,0,0.5)",
        }}
      >
        <DialogTitle>Add New Vacation</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To add a vacation to this website, please fill up all the fields
            below.
          </DialogContentText>
          <form onSubmit={handleSubmit(onSubmit)}>
            <TextField
              margin="dense"
              fullWidth
              label="Destination "
              id="destination"
              {...register("destination", { required: true })}
              error={Boolean(errors.destination)}
              helperText={errors.destination && "Destination is required"}
            />
            <TextField
              margin="dense"
              multiline
              rows={3}
              fullWidth
              id="description"
              label="Description"
              {...register("description", { required: true })}
              error={Boolean(errors.description)}
              helperText={errors.description && "Description is required"}
            />
            <label htmlFor="startDate" className="label-large">
              Start date:
            </label>
            <TextField
              margin="dense"
              type="date"
              id="startDate"
              fullWidth
              {...register("startDate", { required: true })}
              error={Boolean(errors.startDate)}
              helperText={errors.startDate && "Start date is required"}
              inputProps={{
                min: new Date().toISOString().slice(0, 10),
              }}
            />
            <label htmlFor="finishDate" className="label-large">
              Finish date:
            </label>
            <TextField
              margin="dense"
              type="date"
              id="finishDate"
              fullWidth
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
            <TextField
              margin="dense"
              placeholder="Price"
              label="Price"
              type="number"
              id="price"
              fullWidth
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
            <label htmlFor="image" className="label-large">
              Image upload
            </label>
            <TextField
              margin="dense"
              type="file"
              id="image"
              fullWidth
              {...register("image", { required: true })}
              error={Boolean(errors.image)}
              helperText={errors.image && "Image is required"}
              onChange={handleChange}
            />
            <div className="container">
              <img className="preview" src={image} alt={image} />
            </div>
            <Button onClick={handleClose} color="error">
              Cancel
            </Button>
            <Button type="submit" color="success">
              Add Vacation
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
