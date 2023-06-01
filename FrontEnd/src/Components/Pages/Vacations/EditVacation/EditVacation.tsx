import "./EditVacation.css";
import EditIcon from "@mui/icons-material/Edit";
import Button from "@mui/joy/Button";
import MaterialButton from "@mui/material/Button";
import { Vacation } from "../../../../Model/Vacation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { vacation } from "../../../../Redux/VacationStore";
import {
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  InputAdornment,
  TextField,
} from "@mui/material";
import axios from "axios";
import { editVacationsAction } from "../../../../Redux/VacationReducer";

// props to get vacation information from VacationCard component
type EditVacationProps = {
  editVacation: Vacation;
};

function EditVacation({ editVacation }: EditVacationProps): JSX.Element {
  const [open, setOpen] = useState(false);
  // set the image
  const [image, setImage] = useState(editVacation.photoFile);
  // handle the image change
  function handleChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
    }
  }

  const updateVacation = async (updatedVacation: Vacation) => {
    // get the vacation key
    const key = await axios.get(
      `http://localhost:8080/api/v1/vacation/vacations/getVacationKey/${updatedVacation.vacationDestiny}`
    );
    // edit the vacation
    await axios
      .put(
        `http://localhost:8080/api/v1/vacation/vacations/editVacation/${key.data[0].vacationKey}`,
        updatedVacation
      )
      // after the delete operation fetch the vacations and refresh the page
      .then(() => {
        handleClose();
        // dispatch the delete action to Redux store
        vacation.dispatch(editVacationsAction(updatedVacation));
        //   // delete the image from the backend
        //   const imageName = new URL(image).pathname.split("/").pop();
        //   axios
        //     .delete(
        //       `http://localhost:8080/api/v1/vacation/vacations/deleteImage/${imageName}`
        //     )
        //     .then(() => {
        //       console.log(
        //         `Image for vacation ${image} was successfully deleted.`
        //       );
        //     })
        //     .catch((error) => {
        //       console.error("There was an error deleting the image:", error);
        //     });
      });
  };

  // converts a date from the format dd/mm/yyyy to yyyy-mm-dd for edit.
  function transformDate(dateStr: string) {
    const [day, month, year] = dateStr.split("/");
    return `${year}-${month}-${day}`;
  }

  //  converts a date from the format yyyy-mm-dd to dd/mm/yyyy after edit.
  function reverseTransformDate(dateStr: string) {
    const [year, month, day] = dateStr.split("-");
    return `${day}/${month}/${year}`;
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    reset,
  } = useForm<Vacation>({
    defaultValues: {
      ...editVacation,
      vacationStart: transformDate(editVacation.vacationStart),
      vacationEnd: transformDate(editVacation.vacationEnd),
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
    // get the values of the input fields
    const formValues = getValues();
    // Transform dates back to dd/mm/yyyy format
    const updatedValues = {
      ...formValues,
      vacationStart: reverseTransformDate(formValues.vacationStart),
      vacationEnd: reverseTransformDate(formValues.vacationEnd),
    };
    updateVacation(updatedValues);
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
