import React from "react";

import "./Input.css";

const Input = ({
    name,
    label,
    type = "text",
    placeholder = "",
    value,
    setValue,
}) => {
    return (
        <div className="form-control">
            <label>
                <span>{label}:</span>
                <input
                    type={type}
                    name={name}
                    id={name}
                    required
                    placeholder={placeholder}
                    value={value || ""}
                    onChange={(e) => setValue(e.target.value)}
                />
            </label>
        </div>
    );
};

export default Input;
