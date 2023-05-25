import Card from "./VacationCard/VacationCard";
import AddVacationModal from "./addVacationModal/addVacationModal";
import "./Vacations.css";
import { useEffect, useState } from "react";
import { vacation } from "../../../Redux/VacationStore";
import axios from "axios";
import { allVacationsAction } from "../../../Redux/VacationReducer";
import Pagination from "@mui/material/Pagination";
import moment from "moment";
import { sortBy } from "lodash";
import { Checkbox, FormControlLabel } from "@mui/material";
import { Favorite, FavoriteBorder } from "@mui/icons-material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import AccessTimeFilledIcon from "@mui/icons-material/AccessTimeFilled";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import PlayCircleFilledIcon from "@mui/icons-material/PlayCircleFilled";

function Vacations(): JSX.Element {
  // re render the page after get data
  const [refresh, setRefresh] = useState(false);
  // for Pagination
  const [page, setPage] = useState(1);
  const itemsPerPage = 8;
  // handle change for Pagination
  const handleChange = (event: any, value: any) => {
    setPage(value);
  };

  // get data from database and save in redux
  const fetchVacations = () => {
    console.log("getting data from backend....");
    axios
      .get("http://localhost:8080/api/v1/vacation/vacations/allVacations")
      .then((response) => {
        vacation.dispatch(allVacationsAction(response.data));
        setRefresh(!refresh);
      });
  };

  //if vacations is empty get all vacations from database and save in redux
  useEffect(() => {
    if (vacation.getState().vacations.vacations.length < 1) {
      fetchVacations();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // sort the vacations by date
  const vacations = vacation.getState().vacations.vacations;
  const sortedVacations = sortBy(
    vacations,
    (vacation: { vacationStart: any }) => {
      return moment(vacation.vacationStart, "DD/MM/YYYY");
    }
  );

  // make sure only one checkbox is checked
  const [selected, setSelected] = useState("");

  return (
    <div className="Vacations">
      {/* Checkboxes for user filter */}
      <FormControlLabel
        control={
          <Checkbox
            icon={<FavoriteBorder />}
            checkedIcon={<Favorite />}
            checked={selected === "follow"}
            onChange={() => setSelected("follow")}
          />
        }
        label="Vacations you follow"
      />
      <FormControlLabel
        control={
          <Checkbox
            icon={<AccessTimeIcon />}
            checkedIcon={<AccessTimeFilledIcon />}
            checked={selected === "notStarted"}
            onChange={() => setSelected("notStarted")}
          />
        }
        label="Vacations that didn't start"
      />
      <FormControlLabel
        control={
          <Checkbox
            icon={<PlayCircleOutlineIcon />}
            checkedIcon={<PlayCircleFilledIcon />}
            checked={selected === "active"}
            onChange={() => setSelected("active")}
          />
        }
        label="Vacations that are active now"
      />
      {/* add new vacation */}
      <AddVacationModal fetchVacations={fetchVacations} />
      {/* get all vacations from redux and display all the vacations*/}
      <div className="vacationCards">
        {sortedVacations
          .slice((page - 1) * itemsPerPage, page * itemsPerPage)
          .map((item: any) => (
            <Card
              fetchVacations={fetchVacations}
              key={item["vacationDestiny"]}
              vacationDestiny={item["vacationDestiny"]}
              vacationDesc={item["vacationDesc"]}
              vacationStart={item["vacationStart"]}
              vacationEnd={item["vacationEnd"]}
              price={item["price"]}
              photoFile={`http://localhost:8080/${item["photoFile"]}`}
            />
          ))}
      </div>
      <Pagination
        count={Math.ceil(
          vacation.getState().vacations.vacations.length / itemsPerPage
        )}
        page={page}
        onChange={handleChange}
        color="primary"
        className="Pagination"
        shape="rounded"
      />
    </div>
  );
}

export default Vacations;
