import React, { Component } from 'react';
import ScrollArea from 'react-scrollbar';
import { connect } from 'react-redux';
import { LOAD_RECIPES } from 'actions/recipes';

class Recipe extends Component {
  componentDidMount() {
    this.blockAsync = true;
    this.props.dispatch(LOAD_RECIPE(this.props.id)).then(() => {
      this.blockAsync = false;
    });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.error) {
      alert(nextProps.error);
    }

    if (
      (!nextProps.currentRecipe && !this.blockAsync) ||
      this.props.id != nextProps.id
    ) {
      this.blockAsync = true;
      this.props.dispatch(LOAD_RECIPE(nextProps.id)).then(() => {
        this.blockAsync = false;
      });
    }
  }

  render() {
    return this.props.loader ? null : (
      <ScrollArea className="Recipes Details">
        <div className="Dish">
          <div className="bot">
            <img
              src={'/files/avatar/' + this.props.data.user.avatar}
              className="avatar"
            />
            <div className="info">
              <h5>{this.props.data.name || ''}</h5>
              <div className="in-info">
                <i className="fa fa-coffee" />
                <span>{this.props.data.skill}</span>
              </div>
              <div className="in-info">
                <i className="fa fa-user" />
                <span>{this.props.data.person} Persons</span>
              </div>
              <div className="in-info">
                <i className="fa fa-clock-o" />
                <span>{this.props.data.time}</span>
              </div>
            </div>
          </div>
          <div className="center">
            <img src={'/files/cook/' + this.props.data.photo} />
            <i className="fa fa-heart-o" />
          </div>
        </div>
        <div className="Recipe">
          <div className="block1">
            <div className="left">
              <i className="fa fa-cutlery" />
            </div>
            <div className="right">
              <h3>Ingredients</h3>
              {this.props.data.ingredients.map((ingredient, index) => (
                <span key={index}>{ingredient}</span>
              ))}
            </div>
          </div>
          <div className="block2">
            <div className="left">
              <i className="fa fa-list-alt" />
            </div>
            <div className="right">
              <div className="in-right">
                <h3>Directions</h3>
                {this.props.data.cooking.map((cooking, index) => (
                  <div key={index}>
                    <h3>{index + 1}</h3>
                    <span>{cooking}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </ScrollArea>
    );
  }
}

function mapStateToProps(
  { recipes: { loader, currentRecipe, error } },
  { match: { params: { id } } },
) {
  return {
    loader,
    currentRecipe,
    error,
    id,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Recipe);
