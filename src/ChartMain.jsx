import { useEffect } from "react";
import "./styles/ChartMain.css";

const ChartMain = ({ detailsData }) => {
  useEffect(() => {
    if (detailsData!= null) window.location.href = "#chart-main-section";
  }, [detailsData]);

  return (
    <div id="chart-main-section">
      <div className="container m-0 p-0">
        <div className="row">
          <div className="col-md-12" id="zoomed-chart">
            {detailsData}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChartMain;
