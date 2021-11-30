import react from "react";
import M from "materialize-css";
import { useRef, useEffect } from "react";
import { Bar,Line } from "react-chartjs-2";
import { CategoryScale } from "chart.js";
import Chart from "chart.js/auto";
import SideNav from "./SideNav";
import {
  Chart as ChartJS,
 
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

import faker from 'faker';

const Landing = () => {
  // ChartJS.register(
  //   CategoryScale,
  //   LinearScale,
  //   PointElement,
  //   LineElement,
  //   Title,
  //   Tooltip,
  //   Legend
  // );
   
// export const options = {
//   responsive: true,
 
// };

// const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

// export const data = {
//   labels,
//   datasets: [
//     {
//       label: 'Dataset 1',
//       data: labels.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
//       borderColor: 'rgb(255, 99, 132)',
//       backgroundColor: 'rgba(255, 99, 132, 0.5)',
//     },
//     {
//       label: 'Dataset 2',
//       data: labels.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
//       borderColor: 'rgb(53, 162, 235)',
//       backgroundColor: 'rgba(53, 162, 235, 0.5)',
//     },
//   ],
// };

  

  return (
    <div className="main1">
      <div class="row">
        <div class="col s8">
          <div className="charts">
            <div className="barchart1">
            
            </div>
            <div className="barchart1">
              <Bar
                data={{
                  labels: ["Temperature", "Humidity", "Pressure"],
                  datasets: [
                    {
                      label: "POTATO FIELD",
                      data: [28, 30, 13],
                      backgroundColor: [
                        "rgba(255, 99, 132, 0.2)",
                        "rgba(54, 162, 235, 0.2)",
                        "rgba(255, 206, 86, 0.2)",
                      ],
                      borderColor: [
                        "rgba(255, 99, 132, 1)",
                        "rgba(54, 162, 235, 1)",
                        "rgba(255, 206, 86, 1)",
                      ],
                      borderWidth: 1,
                    },
                  ],
                }}
                height={200}
                width={500}
                options={{
                  maintainAspectRatio: false,
                }}
              />
            </div>
            <div className="barchart1">
              <Bar
                data={{
                  labels: ["Temperature", "Humidity", "Pressure"],
                  datasets: [
                    {
                      label: "GARDEN SENSOR",
                      data: [12, 19, 3],
                      backgroundColor: [
                        "rgba(255, 99, 132, 0.2)",
                        "rgba(54, 162, 235, 0.2)",
                        "rgba(255, 206, 86, 0.2)",
                      ],
                      borderColor: [
                        "rgba(255, 99, 132, 1)",
                        "rgba(54, 162, 235, 1)",
                        "rgba(255, 206, 86, 1)",
                      ],
                      borderWidth: 1,
                    },
                  ],
                }}
                height={200}
                width={500}
                options={{
                  maintainAspectRatio: false,
                }}
              />
            </div>
          </div>
        </div>
        <div class="col s4 sideMenu">
          <SideNav />
        </div>
      </div>
    </div>
  );
};

export default Landing;
