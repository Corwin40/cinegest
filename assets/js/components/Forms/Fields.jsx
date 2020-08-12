import React from 'react';

const Field = ({name, label, value, onChange, placeholder, type="text", error=""}) => (
    <div className="form-group row">
        <label className="col-sm-2 col-form-label" htmlFor={name}>{label}</label>
        <div className="col-sm-10">
            <input
                value={value || ''}
                onChange={onChange}
                type={type}
                className={"form-control" + (error && " is-invalid")}
                placeholder={placeholder}
                name={name}
                id={name}
            />
        </div>

        {error && <p className="invalid-feedback">{error}</p>}
    </div>
);

export default Field;
