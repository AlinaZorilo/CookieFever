import React, { Component } from 'react';
import Recipe from './Recipe.jsx';
import ScrollArea from 'react-scrollbar';
import { connect } from 'react-redux';
import { LOAD_RECIPES } from 'actions/recipes';

class Recipes extends Component {
  componentDidMount() {
    this.props.dispatch(LOAD_RECIPES());
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.error) {
      alert(nextProps.error);
    }
  }

  handleScroll = (value) => {
    if (
      value.topPosition + value.containerHeight >= value.realHeight &&
      !this.blockAsync &&
      !this.blockRecipes
    ) {
      this.blockAsync = true;
      this.props
        .dispatch(LOAD_RECIPES(this.props.recipes.length))
        .then((recipes) => {
          if (recipes.length) {
            this.blockAsync = false;
          } else {
            this.blockRecipes = true;
          }
        });
    }
  };

  render() {
    return (
      <ScrollArea className="Recipes" onScroll={this.handleScroll}>
        {this.props.loader
          ? null
          : this.props.recipes.map((recipe) => (
              <Recipe key={recipe.id} {...recipe} />
            ))}
      </ScrollArea>
    );
  }
}

function mapStateToProps({ recipes: { loader, recipes, error } }) {
  return {
    loader,
    recipes,
    error,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Recipes);
