import React from "react";
import { ACTIONS } from "../App";

function DigitButtons({ dispatch, digit }) {
  return (
    <button onClick={() => dispatch({ type: ACTIONS.ADD, payload: { digit } })}>
      {digit}
    </button>
  );
}

export default DigitButtons;
