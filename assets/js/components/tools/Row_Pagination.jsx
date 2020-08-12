import React from 'react';

const RowPagination = (onSelectChange) => {
    return (
        <div>
            <select className="custom-select custom-select-sm" onChange={onSelectChange}>
                <option selected value="15">15</option>
                <option value="20">20</option>
                <option value="50">50</option>
            </select>
        </div>
    );
};

export default RowPagination;