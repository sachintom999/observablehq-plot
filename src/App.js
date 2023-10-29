import * as Plot from "@observablehq/plot";
import PlotFigure from "./PlotFigure.js";
import "./styles.css";
import penguins from "./penguins.json";
import timeseries from "./timeseries.json";

export default function App() {
  return (
    <div className="App">
      <h1>Plot + React</h1>
      <h2>Penguins scatterplot</h2>
      <PlotFigure
        options={{
          marks: [
            Plot.dot(penguins, { x: "culmen_length_mm", y: "culmen_depth_mm" })
          ]
        }}
      />
      <h2>Time-series bar chart</h2>
      <PlotFigure
        options={{
          x: { tickFormat: "d", interval: 1 },
          marks: [Plot.barY(timeseries, { x: "year", y: "population" })]
        }}
      />
    </div>
  );
}
