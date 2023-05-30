import "./EditVacation.css";
import EditIcon from "@mui/icons-material/Edit";
import Button from "@mui/joy/Button";
import MaterialButton from "@mui/material/Button";
import { Vacation } from "../../../../Model/Vacation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  InputAdornment,
  TextField,
} from "@mui/material";

// props to get vacation information from VacationCard component
type EditVacationProps = {
  vacation: Vacation;
};

function EditVacation({ vacation }: EditVacationProps): JSX.Element {
  const [open, setOpen] = useState(false);
  // set the image
  const [image, setImage] = useState(vacation.photoFile);
  // handle the image change
  function handleChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
    }
  }

  // converts a date from the format dd/mm/yyyy to yyyy-mm-dd.
  function transformDate(dateStr: string) {
    const [day, month, year] = dateStr.split("/");
    return `${year}-${month}-${day}`;
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    reset,
  } = useForm<Vacation>({
    defaultValues: {
      ...vacation,
      vacationStart: transformDate(vacation.vacationStart),
      vacationEnd: transformDate(vacation.vacationEnd),
    },
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    reset();
  };

  const onSubmit = () => {
    console.log(vacation);
  };
  return (
    <div className="EditVacation">
      <Button
        sx={{ width: "3px", marginLeft: "6px" }}
        onClick={handleClickOpen}
      >
        <EditIcon />
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        sx={{
          backgroundColor: "rgba(0,0,0,0.5)",
        }}
      >
        <DialogTitle>Edit Vacation</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To edit this vacation, please update the information below.
          </DialogContentText>
          <form onSubmit={handleSubmit(onSubmit)}>
            <TextField
              margin="dense"
              id="destination"
              label="Destination"
              fullWidth
              {...register("vacationDestiny", { required: true })}
              error={Boolean(errors.vacationDestiny)}
              helperText={errors.vacationDestiny && "Destination is required"}
            />
            <TextField
              margin="dense"
              id="description"
              label="Description"
              type="text"
              fullWidth
              multiline
              rows={3}
              {...register("vacationDesc", { required: true })}
              error={Boolean(errors.vacationDesc)}
              helperText={errors.vacationDesc && "Description is required"}
            />
            <label htmlFor="startDate" className="label-large">
              Start date:
            </label>
            <TextField
              margin="dense"
              type="date"
              id="startDate"
              fullWidth
              {...register("vacationStart", { required: true })}
              error={Boolean(errors.vacationStart)}
              helperText={errors.vacationStart && "Start date is required"}
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
              {...register("vacationEnd", {
                required: true,
                validate: {
                  notEarlier: (value) => {
                    const startDate = new Date(getValues("vacationStart")); // get start date from form values
                    const finishDate = new Date(value); // convert finish date string to date object
                    return finishDate >= startDate;
                  },
                },
              })}
              error={Boolean(errors.vacationEnd)}
              helperText={
                errors.vacationEnd &&
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
            <TextField
              margin="dense"
              type="file"
              id="image"
              fullWidth
              {...register("photoFile")}
              onChange={handleChange}
            />
            <div className="container">
              <img className="preview" src={image} alt={image} />
            </div>
            <MaterialButton onClick={handleClose} color="error">
              Cancel
            </MaterialButton>
            <MaterialButton type="submit" color="success">
              Save
            </MaterialButton>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default EditVacation;
