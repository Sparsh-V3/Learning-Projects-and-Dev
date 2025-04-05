import { useReducer } from "react";
import "./App.css";
import DigitButtons from "./components/DigitButtons";
import OperButtons from "./components/OperButtons";

const ACTIONS = {
  ADD: "ADD",
  CHOOSE_OPR: "CHOOSE_OPR",
  CLEAR: "CLEAR",
  DELETE: "DELETE",
  EVAL: "EVAL",
};

const reducer = (state, { type, payload }) => {
  {
    switch (type) {
      case ACTIONS.ADD:
        if (payload.digit === "0" && state.currOperand === "0") return state;
        if (payload.digit === "." && state.currOperand.includes("."))
          return state;
        if (state.overwrite) {
          return {
            ...state,
            currOperand: payload.digit,
            overwrite: false,
          };
        }
        return {
          ...state,
          currOperand: `${state.currOperand || ""}${payload.digit}`,
        };

      case ACTIONS.CHOOSE_OPR:
        if (state.currOperand == null && state.prevOperand == null) {
          return state;
        }

        if (state.currOperand == null) {
          return {
            ...state,
            operation: payload.oper,
          };
        }

        if (state.prevOperand == null) {
          return {
            ...state,
            operation: payload.oper,
            prevOperand: state.currOperand,
            currOperand: null,
          };
        }

        return {
          ...state,
          prevOperand: evaluate(state),
          operation: payload.oper,
          currOperand: null,
        };
      case ACTIONS.CLEAR:
        return {};
      case ACTIONS.DELETE:
        if (state.currOperand == null) {
          return state;
        }

        if (state.overwrite) {
          return {
            ...state,
            currOperand: null,
            overwrite: false,
          };
        }

        if (state.currOperand.length === 1) {
          return {
            ...state,
            currOperand: null,
          };
        }

        return {
          ...state,
          currOperand: state.currOperand.slice(0, -1),
        };
      case ACTIONS.EVAL:
        if (state.currOperand == null || state.prevOperand == null) {
          return state;
        }
        return {
          ...state,
          overwrite: true,
          prevOperand: null,
          operation: null,
          currOperand: evaluate(state),
        };
    }
  }
};

const evaluate = ({ currOperand, prevOperand, operation }) => {
  const prev = parseFloat(prevOperand);
  const curr = parseFloat(currOperand);
  let computation = "";
  switch (operation) {
    case "+":
      computation = prev + curr;
      break;
    case "-":
      computation = prev - curr;
      break;
    case "/":
      computation = prev / curr;
      break;
    case "*":
      computation = prev * curr;
      break;
  }

  return computation.toString();
};

function App() {
  const [{ currOperand, prevOperand, operation }, dispatch] = useReducer(
    reducer,
    {}
  );
  return (
    <>
      <div className="calculator-grid">
        <div className="output">
          <div className="previous-operand">
            {prevOperand} {operation}
          </div>
          <div className="current-operand">{currOperand}</div>
        </div>
        <button
          className="span-two"
          onClick={() => dispatch({ type: ACTIONS.CLEAR })}
        >
          AC
        </button>
        <button onClick={() => dispatch({ type: ACTIONS.DELETE })}>DEL</button>
        <OperButtons oper={"/"} dispatch={dispatch} />
        <DigitButtons digit={"1"} dispatch={dispatch} />
        <DigitButtons digit={"2"} dispatch={dispatch} />
        <DigitButtons digit={"3"} dispatch={dispatch} />
        <OperButtons oper={"*"} dispatch={dispatch} />
        <DigitButtons digit={"4"} dispatch={dispatch} />
        <DigitButtons digit={"5"} dispatch={dispatch} />
        <DigitButtons digit={"6"} dispatch={dispatch} />
        <OperButtons oper={"+"} dispatch={dispatch} />
        <DigitButtons digit={"7"} dispatch={dispatch} />
        <DigitButtons digit={"8"} dispatch={dispatch} />
        <DigitButtons digit={"9"} dispatch={dispatch} />
        <OperButtons oper={"-"} dispatch={dispatch} />
        <DigitButtons digit={"."} dispatch={dispatch} />
        <DigitButtons digit={"0"} dispatch={dispatch} />
        <button
          className="span-two"
          onClick={() => dispatch({ type: ACTIONS.EVAL })}
        >
          =
        </button>
      </div>
    </>
  );
}

export { App, ACTIONS };
