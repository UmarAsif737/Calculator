import { useReducer, useState } from "react";
import "./index.css";
import DigitButton from "./DigitButton";
import OperationButton from "./OperationButton";
import evaluate from "./utills/evaluate";
import formOper from "./utills/formOper";

export const ACTIONS = {
	ADD_DIG: "add_digit",
	CHOOSE_OPER: "choose_oper",
	DELETE_DIG: "delete_digit",
	CLEAR: "clear",
	EVALUATE: "evaluate",
};

function reducer(state, { type, payload }) {
	console.log(state);
	switch (type) {
		case ACTIONS.ADD_DIG:
			if (state.overwrite)
				return {
					...state,
					currOper: payload.digit,
					overwrite: false,
				};
			if (payload.digit === "0" && state.currOper === "0") return state;
			if (payload.digit === "." && state.currOper.includes(".")) return state;
			return {
				...state,
				currOper: `${state.currOper || ""}${payload.digit}`,
			};
		case ACTIONS.DELETE_DIG:
			if (state.overwrite)
				return {
					...state,
					currOper: null,
					overwrite: false,
				};
			if (state.currOper == null) return state;
			if (state.currOper.length === 1) return { ...state, currOper: null };
			return {
				...state,
				currOper: state.currOper.slice(0, -1),
			};
		case ACTIONS.CLEAR:
			return {};
		case ACTIONS.CHOOSE_OPER:
			if (state.currOper == null && state.prevOper == null) return state;
			if (state.prevOper == null)
				return {
					...state,
					oper: payload.oper,
					prevOper: state.currOper,
					currOper: null,
				};
			if (state.currOper == null)
				return {
					...state,
					oper: payload.oper,
				};

			return {
				...state,
				oper: payload.oper,
				prevOper: evaluate(state),
				currOper: null,
			};
		case ACTIONS.EVALUATE:
			if (
				state.oper == null ||
				state.currOper == null ||
				state.prevOper == null
			)
				return state;
			return {
				...state,
				overwrite: true,
				prevOper: null,
				currOper: evaluate(state),
				oper: null,
			};
	}
}

function App() {
	const [{ currOper, prevOper, oper }, dispatch] = useReducer(reducer, {});
	return (
		<div className="calc-grid">
			<div className="output">
				<div className="prev-oper">
					{formOper(prevOper)} {oper}
				</div>
				<div className="curr-oper"> {formOper(currOper)} </div>
			</div>
			<button
				className="span-two"
				onClick={() => dispatch({ type: ACTIONS.CLEAR })}
			>
				AC
			</button>
			<button onClick={() => dispatch({ type: ACTIONS.DELETE_DIG })}>
				DEL
			</button>
			<OperationButton dispatch={dispatch} oper="÷" />
			<DigitButton dispatch={dispatch} digit="1" />
			<DigitButton dispatch={dispatch} digit="2" />
			<DigitButton dispatch={dispatch} digit="3" />
			<OperationButton dispatch={dispatch} oper="*" />
			<DigitButton dispatch={dispatch} digit="4" />
			<DigitButton dispatch={dispatch} digit="5" />
			<DigitButton dispatch={dispatch} digit="6" />
			<OperationButton dispatch={dispatch} oper="+" />
			<DigitButton dispatch={dispatch} digit="7" />
			<DigitButton dispatch={dispatch} digit="8" />
			<DigitButton dispatch={dispatch} digit="9" />
			<OperationButton dispatch={dispatch} oper="-" />
			<DigitButton dispatch={dispatch} digit="." />
			<DigitButton dispatch={dispatch} digit="0" />
			<button
				className="span-two"
				onClick={() => dispatch({ type: ACTIONS.EVALUATE })}
			>
				=
			</button>
		</div>
	);
}

export default App;
