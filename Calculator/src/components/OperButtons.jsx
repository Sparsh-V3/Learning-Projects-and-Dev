import React from "react";
import { ACTIONS } from "../App";

function OperButtons({ dispatch, oper }) {
  return (
    <button
      onClick={() => dispatch({ type: ACTIONS.CHOOSE_OPR, payload: { oper } })}
    >
      {oper}
    </button>
  );
}

export default OperButtons;
