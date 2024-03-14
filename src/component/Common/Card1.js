import React from "react";

const Card1 = ({ children, title }) => {
  return (
    <div className="card" style="width: 18rem;">
      <div className="card-body">
        <h5 className="card-title">{title}</h5>
        <h6 className="card-subtitle mb-2 text-body-secondary">
          Card subtitle
        </h6>
        {children}
      </div>
    </div>
  );
};

export default Card1;
