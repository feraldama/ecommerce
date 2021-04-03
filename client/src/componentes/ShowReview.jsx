import React, { useState, useEffect } from "react";
import { postUser } from "../redux/actions/actionsUser";
import { useSelector, useDispatch } from "react-redux";
import "./SignUp.css";
import "./Review.css";

export default function showReview({
  calification,
  review,
  firstName,
  lastName,
  createdAt,
}) {
  return (
    <div>
      <div className="card">
        <div className="card-body">
          <p className="card-title">Creado: {createdAt}</p>
        </div>
        <div>
          <p className="card-title">Calificación: {calification}</p>
        </div>
        <div className="card-body">
          <p className="card-title">
            Nombre: {firstName} {lastName}
          </p>
        </div>
        <div className="card-body">
          <p className="card-title">Review: {review}</p>
        </div>
        <br />
      </div>
    </div>
  );
}
