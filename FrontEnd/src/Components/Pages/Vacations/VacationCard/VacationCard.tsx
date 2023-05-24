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
// import axios from "axios";

// props for getting info from another component
interface ItemProps {
  vacationDestiny: string;
  vacationDesc: string;
  vacationStart: string;
  vacationEnd: string;
  price: number;
  photoFile: string;
}

// const deleteVacation = (key: number) => {
//   axios.delete(`http://localhost:8080/api/v1/vacation/vacations/delete/${key}`);
// };

export default function BasicCard(props: ItemProps) {
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
      <div style={{ display: "flex" }}>
        <Button color="danger" sx={{ width: "3px" }}>
          <DeleteForeverIcon />
        </Button>
        <Button sx={{ width: "3px", marginLeft: "6px" }}>
          <EditIcon />
        </Button>
      </div>
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
        <Favorite />
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
