import React, { Component } from 'react';
import Recipe from './Recipe.jsx';
import ScrollArea from 'react-scrollbar';

export default class Recipes extends Component {
  	constructor(props) {
		super(props);
		
		this.state = {
			loader: true,
			recipes: []
		};
		
		this.loadRecipes = this.loadRecipes.bind(this);
	}
	
	componentDidMount() {
		this.loadRecipes();
	}
	
	loadRecipes() {
		if (!this.blockAsync && !this.blockRecipes) {
			this.blockAsync = true;
			fetch('http://127.0.0.1:3030/recipes', {
				method: 'POST',
				body: JSON.stringify({
					offset: this.state.recipes.length
				}),
				headers: {
					'Content-Type': 'application/json'
				} 
			}).then(res => res.json()).then(res => {
				this.blockAsync = false;
				if (res.length) {
					this.setState({
						loader: false,
						recipes: this.state.recipes.concat(res)
					});	
				} else {
					this.blockRecipes = true;
					this.setState({
						loader: false
					});
				}
			});
		}
	}
	
    render() {
        return (
    		<ScrollArea className="Recipes" onScroll={value => {
				if (value.topPosition + value.containerHeight >= value.realHeight) this.loadRecipes();		
			}}>
    			{this.state.loader ? null : this.state.recipes.map(recipe => <Recipe key={recipe.id} {...recipe} />)}
    		</ScrollArea>
        );
    }
}
