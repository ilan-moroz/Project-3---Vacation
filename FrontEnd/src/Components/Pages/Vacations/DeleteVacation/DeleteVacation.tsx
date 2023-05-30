import "./DeleteVacation.css";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import Button from "@mui/joy/Button";
import axios from "axios";
import { useState } from "react";
import { vacation } from "../../../../Redux/VacationStore";
import { deleteVacationAction } from "../../../../Redux/VacationReducer";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { Vacation } from "../../../../Model/Vacation";

// props to get vacation information from VacationCard component
type DeleteVacationProps = {
  vacationToDelete: Vacation;
};

function DeleteVacation({
  vacationToDelete,
}: DeleteVacationProps): JSX.Element {
  //for the alert if to delete the vacation
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const deleteVacation = async (destiny: string, image: string) => {
    // get the vacation key
    const key = await axios.get(
      `http://localhost:8080/api/v1/vacation/vacations/getVacationKey/${destiny}`
    );
    // delete the vacation from mysql and image from backend
    await axios
      .delete(
        `http://localhost:8080/api/v1/vacation/vacations/delete/${key.data[0].vacationKey}`
      )
      // after the delete operation fetch the vacations and refresh the page
      .then(() => {
        handleClose();
        // dispatch the delete action to Redux store
        vacation.dispatch(deleteVacationAction(destiny));
        // delete the image from the backend
        const imageName = new URL(image).pathname.split("/").pop();
        axios
          .delete(
            `http://localhost:8080/api/v1/vacation/vacations/deleteImage/${imageName}`
          )

          .then(() => {
            console.log(
              `Image for vacation ${image} was successfully deleted.`
            );
          })
          .catch((error) => {
            console.error("There was an error deleting the image:", error);
          });
      });
  };

  return (
    <div className="DeleteVacation">
      <Button color="danger" sx={{ width: "3px" }} onClick={handleClickOpen}>
        <DeleteForeverIcon />
      </Button>
      {/* dialog for confirmation of delete */}
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Are you sure u want to delete this vacation?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            If you are sure that you want to delete this vacation, click
            "Delete."
            <br />
            Otherwise, click "Cancel."
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button
            onClick={() =>
              deleteVacation(
                vacationToDelete.vacationDestiny,
                vacationToDelete.photoFile
              )
            }
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default DeleteVacation;
