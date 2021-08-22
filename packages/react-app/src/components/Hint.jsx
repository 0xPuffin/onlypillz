

import React from "react";
export default function Hint(props) {
    const {hint} = props;
    return <p style={{ color: "gray", fontSize: "small" }}>{hint}</p>
          
}