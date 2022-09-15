import React from "react";
import { ACTIONS } from "./App.js";

export default function OperationButton(props) {
	const { dispatch, oper } = props;
	return (
		<button
			onClick={() => dispatch({ type: ACTIONS.CHOOSE_OPER, payload: { oper } })}
		>
			{oper}
		</button>
	);
}
