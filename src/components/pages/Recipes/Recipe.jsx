import React from 'react';
import { Link } from 'react-router-dom';

const Recipe = (props) => (
  <Link to={'/recipe/' + props.id} className="Dish">
    <div className="center">
      <img src={'/files/cook/' + props.photo} />
      <i className="fa fa-heart-o" />
    </div>
    <div className="bot">
      <img src={'/files/avatar/' + props.user.avatar} className="avatar" />
      <div className="info">
        <h5>{props.name || ''}</h5>
        <div className="in-info">
          <i className="fa fa-coffee" />
          <span>{props.skill}</span>
        </div>
        <div className="in-info">
          <i className="fa fa-user" />
          <span>{props.person} Persons</span>
        </div>
        <div className="in-info">
          <i className="fa fa-clock-o" />
          <span>{props.time}</span>
        </div>
      </div>
    </div>
  </Link>
);

export default Recipe;
