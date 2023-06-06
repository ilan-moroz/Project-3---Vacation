import React from "react";
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

function VacationsReport(): JSX.Element {
  const followers = useSelector((state: RootState) => state.follower.followers);
  const vacations = useSelector(
    (state: RootState) => state.vacations.vacations
  );

  // Map vacationKey to followers count
  const followersCount = vacations.map((vacation) => ({
    vacationKey: vacation.vacationKey,
    followers: followers.filter(
      (follower) => follower.VacationKey === vacation.vacationKey
    ).length,
  }));

  // Create the data array for the chart
  const data = vacations.map((vacation) => ({
    name: vacation.vacationDestiny.split("-")[0],
    followers:
      followersCount.find(
        (follower) => follower.vacationKey === vacation.vacationKey
      )?.followers || 0,
  }));

  // Calculate the maximum number of followers
  const maxFollowers = Math.max(...data.map((item) => item.followers));

  return (
    <div className="VacationsReport">
      <div className="VacationsReportContainer">
        <ResponsiveContainer width="50%" height="40%" className="chart">
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
            <XAxis dataKey="name" interval={0} angle={-20} textAnchor="end" />
            <YAxis domain={[0, maxFollowers]} tickCount={maxFollowers + 1} />
            <Tooltip />
            <Legend />
            <CartesianGrid strokeDasharray="3 3" />
            <Bar
              dataKey="followers"
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
