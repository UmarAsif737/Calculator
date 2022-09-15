import React from "react";
import { ACTIONS } from "./App.js";

export default function DigitButton(props) {
	const { dispatch, digit } = props;
	return (
		<button
			onClick={() => dispatch({ type: ACTIONS.ADD_DIG, payload: { digit } })}
		>
			{digit}
		</button>
	);
}
