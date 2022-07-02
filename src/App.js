import React from "react";

import Table from "./components/Table";
import Homepage from "./components/Homepage";

import { useSelector, useDispatch } from "react-redux";

import { initializeState } from "./store/actions/cellActions";
import { $localStorage } from "./utils/storage";

import "./scss/index.scss";

const App = () => {
  const columns = useSelector((state) => state.columns);
  const dispatch = useDispatch();

  React.useEffect(() => {
    if ($localStorage.get === null) {
      $localStorage.set({ columns: [] });
    } else {
      dispatch(initializeState($localStorage.toJson.columns));
    }
  }, []);

  return <div>{columns.length < 1 ? <Homepage /> : <Table />}</div>;
};

export default App;
