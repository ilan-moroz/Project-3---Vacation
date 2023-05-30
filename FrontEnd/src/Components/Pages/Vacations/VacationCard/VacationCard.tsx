import AspectRatio from "@mui/joy/AspectRatio";
import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import Card from "@mui/joy/Card";
import IconButton from "@mui/joy/IconButton";
import Typography from "@mui/joy/Typography";
import { Favorite } from "@mui/icons-material";
import "./VacationCard.css";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";
import { Vacation } from "../../../../Model/Vacation";
import axios from "axios";
import { useState } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { useSelector } from "react-redux";
import { RootState, vacation } from "../../../../Redux/VacationStore";
import { deleteVacationAction } from "../../../../Redux/VacationReducer";

// props for getting info from another component
export default function BasicCard(props: Vacation) {
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

  // check if user or admin is logged in
  const role = useSelector((state: RootState) => state.users.role);

  return (
    <Card
      className="Card"
      sx={{
        width: 290,
        backgroundColor: "rgba(0,0,0,0.7)",
        "& .MuiTypography-root": {
          color: "white",
        },
        "& .MuiButton-root": {
          color: "white",
          borderColor: "white",
        },
        "& .MuiIconButton-root": {
          color: "white",
        },
      }}
    >
      {/* only for admin */}
      {role === "admin" && (
        <div style={{ display: "flex" }}>
          <Button
            color="danger"
            sx={{ width: "3px" }}
            onClick={handleClickOpen}
          >
            <DeleteForeverIcon />
          </Button>
          <Button sx={{ width: "3px", marginLeft: "6px" }}>
            <EditIcon />
          </Button>
        </div>
      )}
      <Typography level="h2" fontSize="md" sx={{ mb: 0.5 }}>
        {props.vacationDestiny}
      </Typography>
      <Typography level="body2">
        {props.vacationStart} - {props.vacationEnd}
      </Typography>
      <IconButton
        aria-label="favorite"
        variant="plain"
        color="neutral"
        size="sm"
        sx={{ position: "absolute", top: "0.5rem", right: "0.5rem" }}
      >
        {/* only for user */}
        {role === "user" && <Favorite />}
      </IconButton>
      <AspectRatio minHeight="120px" maxHeight="200px" sx={{ my: 2 }}>
        <img src={props.photoFile} loading="lazy" alt={props.photoFile} />
      </AspectRatio>
      <Typography sx={{ overflowWrap: "break-word" }} gutterBottom>
        {props.vacationDesc}
      </Typography>
      <Box sx={{ display: "flex" }}>
        <div>
          <Typography level="body3">Total price:</Typography>
          <Typography fontSize="lg" fontWeight="lg">
            ${props.price}
          </Typography>
        </div>
        <Button
          variant="solid"
          size="sm"
          color="primary"
          aria-label="Explore Bahamas Islands"
          sx={{ ml: "auto", fontWeight: 600 }}
        >
          Order
        </Button>
      </Box>
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
              deleteVacation(props.vacationDestiny, props.photoFile)
            }
            autoFocus
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Card>
  );
}
