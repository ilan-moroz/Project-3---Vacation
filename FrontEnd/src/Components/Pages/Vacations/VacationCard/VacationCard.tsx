import AspectRatio from "@mui/joy/AspectRatio";
import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import Card from "@mui/joy/Card";
import IconButton from "@mui/joy/IconButton";
import Typography from "@mui/joy/Typography";
import { Favorite } from "@mui/icons-material";
import "./VacationCard.css";

// props for getting info from another component
interface ItemProps {
  vacationDestiny: string;
  vacationDesc: string;
  vacationStart: string;
  vacationEnd: string;
  price: number;
}

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
        <img
          src="https://images.unsplash.com/photo-1527549993586-dff825b37782?auto=format&fit=crop&w=286"
          srcSet="https://images.unsplash.com/photo-1527549993586-dff825b37782?auto=format&fit=crop&w=286&dpr=2 2x"
          loading="lazy"
          alt=""
        />
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
