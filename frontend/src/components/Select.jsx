import React from "react";

const Select = ({ label, name, options = [], value, setValue }) => {
    return (
        <div className="form-control">
            <label>
                <span>{label}:</span>
                <select
                    name={name}
                    id={name}
                    required
                    value={value || ""}
                    onChange={(e) => setValue(e.target.value)}>
                    <option value="">Selecione uma opção</option>
                    {options &&
                        options.map((item) => (
                            <option key={item[0]} value={item[0]}>
                                {item[1]}
                            </option>
                        ))}
                </select>
            </label>
        </div>
    );
};

export default Select;
