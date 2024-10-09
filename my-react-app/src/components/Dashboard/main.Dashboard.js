import { CardCount } from "../Dashboard/cardCount.Dashboard.js";
import BasicBars from "./barChart.Dashboard.js";
import { TopDashboard } from "./top.Dashboard";
import "../Dashboard/main.Dashboard.css";

export function Main() {
  return (
    <div className="main--container" >
      <h1 style={{textAlign:"center"}}>Dashboard</h1>
      <div className="container-1">
        <CardCount />
      </div>
      <div className="container-2">
        <BasicBars/>
      </div>
      <div className="container-3">
        <TopDashboard/>
      </div>
    </div>
  );
}
