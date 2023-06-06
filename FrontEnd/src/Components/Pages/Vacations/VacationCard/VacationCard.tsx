import AspectRatio from "@mui/joy/AspectRatio";
import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import Card from "@mui/joy/Card";
import IconButton from "@mui/joy/IconButton";
import Typography from "@mui/joy/Typography";
import { Favorite, FavoriteBorder } from "@mui/icons-material";
import "./VacationCard.css";
import { useSelector } from "react-redux";
import { RootState, vacation } from "../../../../Redux/VacationStore";
import EditVacation from "../EditVacation/EditVacation";
import DeleteVacation from "../DeleteVacation/DeleteVacation";
import { VacationWithKey } from "../../../../Model/VacationWithKey";
import axios from "axios";
import { useState } from "react";
import {
  addFollowAction,
  removeFollowAction,
} from "../../../../Redux/FollowReducer";

// props for getting info from another component
export default function BasicCard(props: VacationWithKey) {
  // check if user or admin is logged in
  const role = useSelector((state: RootState) => state.users.role);
  const user = useSelector((state: RootState) => state.users.currentUser);
  const followers = useSelector((state: RootState) => state.follower.followers);
  console.log(followers);

  // change the icon if follow or not
  const isVacationFollowed = followers.some(
    (follow) =>
      follow.VacationKey === props.vacationKey &&
      follow.userKey === user?.userKey
  );

  const [isFollowing, setIsFollowing] = useState(isVacationFollowed);

  // add follow to database and redux
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
        // dispatch the followed vacation to redux
        vacation.dispatch(addFollowAction(userKey, vacationKey));
      })
      .catch((error) => {
        console.error(error);
      });
  };

  // remove follow from database and redux
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
        // remove the followed vacation from redux
        vacation.dispatch(removeFollowAction(userKey, vacationKey));
      })
      .catch((error) => {
        console.error(error);
      });
  };

  // Count the followers for this vacation
  const followerCount = followers.filter(
    (follow) => follow.VacationKey === props.vacationKey
  ).length;

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
      <AspectRatio
        minHeight="120px"
        maxHeight="200px"
        sx={{ my: 2, position: "relative" }}
      >
        <img src={props.photoFile} loading="lazy" alt={props.photoFile} />
        {/* only for user */}
        {role === "user" && (
          <Box
            sx={{
              position: "absolute",
              top: "0.1rem",
              left: "0.1rem",
              display: "flex",
              alignItems: "center",
              backgroundColor: "rgba(255,255,255,0.4)",
              borderRadius: "5px",
              padding: "0.5rem",
              zIndex: 2,
            }}
          >
            <IconButton
              aria-label="favorite"
              variant="plain"
              className="icon-favorite"
              size="sm"
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
              {isFollowing ? <Favorite /> : <FavoriteBorder />}
            </IconButton>
            <Typography sx={{ ml: 1 }} className="black-text">
              followers: {followerCount}
            </Typography>
          </Box>
        )}
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
