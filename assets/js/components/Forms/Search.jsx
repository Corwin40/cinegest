import React, {useState} from 'react';

const Search = ({onChange, value}) => (
        <input
            type="text"
            onChange={onChange}
            value={value}
            className="form-control"
            placeholder="Rechercher ..."
        />
    );


export default Search;