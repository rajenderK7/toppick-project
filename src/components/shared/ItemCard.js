import React from "react";

const ItemCard = (props) => {
  return (
    // <div classNameName="card mt-5 mx-5 p-2 rounded shadow">
    //   <div classNameName="row">
    //     <img
    //       classNameName="col-sm-12 col-md-6 col-lg-4 rounded"
    //       src="https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
    //     ></img>
    //     <div classNameName="col-sm-12 col-md-6 col-lg-8">{props.title}</div>
    //   </div>
    // </div>
    <div className="card" style={{ width: "18rem" }}>
      <img
        className="card-img-top"
        src="https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
        alt="Card cap"
      />
      <div className="card-body">
        <h5 className="card-title">{props.title}</h5>
        <p className="card-text">
          Some quick example text to build on the card title and make up the
          bulk of the card's content.
        </p>
        <button href="#" className="btn btn-primary">
          Go somewhere
        </button>
      </div>
    </div>
  );
};

export default ItemCard;
