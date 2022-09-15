import React from "react";
const INT_FORM = new Intl.NumberFormat("en-us", { maximumFractionDigits: 0 });

function formOper(oper) {
	if (oper == null) return;
	const [int, dec] = oper.split(".");
	if (dec == null) return INT_FORM.format(int);
	return `${INT_FORM.format(int)}.${dec}`;
}

export default formOper;
