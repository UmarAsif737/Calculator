import React from "react";

export default function evaluate({ currOper, prevOper, oper }) {
	const curr = parseFloat(currOper);
	const prev = parseFloat(prevOper);
	if (isNaN(curr) || isNaN(prev)) return {};
	let comp = "";
	switch (oper) {
		case "+":
			comp = prev + curr;
			break;
		case "-":
			comp = prev - curr;
			break;
		case "*":
			comp = prev * curr;
			break;
		case "÷":
			comp = prev / curr;
			break;
	}

	return comp.toString();
}
