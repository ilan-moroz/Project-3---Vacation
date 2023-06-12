import { useSelector } from "react-redux";
import "./VacationsReport.css";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { RootState } from "../../../Redux/VacationStore";
import { CSVLink } from "react-csv";
import { Button } from "@mui/material";

function VacationsReport(): JSX.Element {
  const followers = useSelector((state: RootState) => state.follower.followers);
  const vacations = useSelector(
    (state: RootState) => state.vacations.vacations
  );

  // Map vacationKey to count the followers
  const followersCount = vacations.map((vacation) => ({
    vacationKey: vacation.vacationKey,
    followers: followers.filter(
      (follower) => follower.vacationKey === vacation.vacationKey
    ).length,
  }));

  // Create the data array for the chart
  const data = vacations.map((vacation) => ({
    Destination: vacation.vacationDestiny.split("-")[0],
    Followers:
      followersCount.find(
        (follower) => follower.vacationKey === vacation.vacationKey
      )?.followers || 0,
  }));

  // Calculate the maximum number of followers
  const maxFollowers = Math.max(...data.map((item) => item.Followers));

  return (
    <div className="VacationsReport">
      <Button variant="contained" sx={{ marginTop: 2, zIndex: 1 }}>
        <CSVLink
          data={data}
          filename={"vacations.csv"}
          style={{ color: "white" }}
        >
          Download CSV
        </CSVLink>
      </Button>
      <div className="VacationsReportContainer">
        <ResponsiveContainer width="50%" height="50%" className="chart">
          <BarChart
            width={500}
            height={300}
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
            barSize={20}
          >
            <XAxis
              dataKey="Destination"
              interval={0}
              angle={-20}
              textAnchor="end"
              height={50}
            />
            <YAxis domain={[0, maxFollowers]} tickCount={maxFollowers + 1} />
            <Tooltip />
            <Legend />
            <CartesianGrid strokeDasharray="3 3" />
            <Bar
              dataKey="Followers"
              fill="#d18884"
              background={{ fill: "#eee" }}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default VacationsReport;
