import AspectRatio from "@mui/joy/AspectRatio";
import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import Card from "@mui/joy/Card";
import IconButton from "@mui/joy/IconButton";
import Typography from "@mui/joy/Typography";
import { Favorite, FavoriteBorder } from "@mui/icons-material";
import "./VacationCard.css";
import { useSelector } from "react-redux";
import { RootState } from "../../../../Redux/VacationStore";
import EditVacation from "../EditVacation/EditVacation";
import DeleteVacation from "../DeleteVacation/DeleteVacation";
import { VacationWithKey } from "../../../../Model/VacationWithKey";
import axios from "axios";
import { useState } from "react";

// props for getting info from another component
export default function BasicCard(props: VacationWithKey) {
  // check if user or admin is logged in
  const role = useSelector((state: RootState) => state.users.role);
  const user = useSelector((state: RootState) => state.users.currentUser);

  // change the icon if follow or not
  const [isFollowing, setIsFollowing] = useState(false);

  // add follow to database
  const addFollow = (vacationKey: number, userKey: number | null) => {
    if (userKey === null) {
      console.error("User key is null");
      return;
    }
    axios
      .post(
        `http://localhost:8080/api/v1/vacation/followers/follow/${userKey}/${vacationKey}`
      )
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  // remove follow from database
  const removeFollow = (vacationKey: number, userKey: number | null) => {
    if (userKey === null) {
      console.error("User key is null");
      return;
    }
    axios
      .delete(
        `http://localhost:8080/api/v1/vacation/followers/RemoveFollow/${userKey}/${vacationKey}`
      )
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

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
      }}
    >
      {/* only for admin */}
      {role === "admin" && (
        <div style={{ display: "flex" }}>
          {/* delete vacation comp and pass the vacation as props */}
          <DeleteVacation vacationToDelete={props} />
          {/* edit vacation comp and pass the vacation as props */}
          <EditVacation editVacation={props} />
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
        size="sm"
        sx={{
          position: "absolute",
          top: "0.5rem",
          right: "0.5rem",
          color: isFollowing ? "red" : "white",
        }}
        onClick={() => {
          if (user && user.userKey !== undefined) {
            if (isFollowing) {
              // Call remove follow function
              removeFollow(props.vacationKey, user.userKey);
            } else {
              // Call add follow function
              addFollow(props.vacationKey, user.userKey);
            }
            // Toggle following state
            setIsFollowing(!isFollowing);
          }
        }}
      >
        {/* Switch icon based on following state */}
        {role === "user" && (isFollowing ? <Favorite /> : <FavoriteBorder />)}
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
    </Card>
  );
}
