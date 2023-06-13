import "./DeleteVacation.css";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import Button from "@mui/joy/Button";
import axios from "axios";
import { useState } from "react";
import { RootState, vacation } from "../../../../Redux/VacationStore";
import { deleteVacationAction } from "../../../../Redux/VacationReducer";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { VacationWithKey } from "../../../../Model/VacationWithKey";
import { useSelector } from "react-redux";
import { removeAllFollowsAction } from "../../../../Redux/FollowReducer";

// props to get vacation information from VacationCard component
type DeleteVacationProps = {
  vacationToDelete: VacationWithKey;
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

  //  get the logged in user state
  const followers = useSelector((state: RootState) => state.follower.followers);

  const deleteVacation = async (vacationKey: number, image: string) => {
    // if the vacation has a follow remove it from database and redux
    if (followers.some((follower) => follower.vacationKey === vacationKey)) {
      await axios.delete(
        `http://localhost:8080/api/v1/vacation/followers/removeAllFollowers/${vacationKey}`
      );
      await vacation.dispatch(removeAllFollowsAction(vacationKey));
    }
    // delete the vacation from mysql and image from backend
    await axios
      .delete(
        `http://localhost:8080/api/v1/vacation/vacations/delete/${vacationKey}`
      )
      .then(() => {
        handleClose();
        // dispatch the delete action to Redux store
        vacation.dispatch(deleteVacationAction(vacationKey));
        // delete the image from the backend
        const imageName = new URL(image).pathname.split("/").pop();
        axios
          .delete(
            `http://localhost:8080/api/v1/vacation/vacations/deleteImage/${imageName}`
          )
          .then(() => {
            console.log(`Image: ${image} was successfully deleted.`);
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
                vacationToDelete.vacationKey,
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
