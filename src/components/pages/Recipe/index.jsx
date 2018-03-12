import React, { Component } from 'react';
import ScrollArea from 'react-scrollbar';

export default class Recipe extends Component {
		constructor(props) {
		super(props);
		
		this.state = {
			loader: true,
			data: undefined
		};
		
		this.loadRecipe = this.loadRecipe.bind(this);
	}
	
	componentDidMount() {
		this.loadRecipe(this.props);
	}
	
	componentWillReceiveProps(props) {
		this.loadRecipe(props);
	}
	
	loadRecipe(props) {
		fetch('http://127.0.0.1:3030/recipe/' + props.match.params.id).then(res => res.json()).then(data => {
			this.setState({
				loader: false,
				data
			});
		});
	}

	render() {
		return (
			this.state.loader ? null : <ScrollArea className="Recipes Details">
				<div className="Dish">
   					<div className="bot">
    					<img src={'/files/avatar/' + this.state.data.user.avatar} className="avatar"/>
    					<div className="info">
    						<h5>{this.state.data.name || ''}</h5>
    						<div className="in-info">
    							<i className="fa fa-coffee" />
    							<span>{this.state.data.skill}</span>
    						</div>
    						<div className="in-info">
    							<i className="fa fa-user" />
    							<span>{this.state.data.person} Persons</span>
    						</div>
    						<div className="in-info">
    							<i className="fa fa-clock-o" />
    							<span>{this.state.data.time}</span>
    						</div>
    					</div>
    				</div>
    				<div className="center">
    				    <img src={'/files/cook/' + this.state.data.photo} />
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
							{this.state.data.ingredients.map((ingredient, index) => <span key={index}>{ingredient}</span>)}
    					</div>
    				</div>
    				<div className="block2">
    					<div className="left">
    						<i className="fa fa-list-alt" />
    					</div>
    					<div className="right">
    						<div className="in-right">
    						    <h3>Directions</h3>
								{this.state.data.cooking.map((cooking, index) => <div key={index}>
   									<h3>{index + 1}</h3>
    								<span>{cooking}</span>
    							</div>)}
    						</div>
    					</div>
    				</div>
    			</div>
			</ScrollArea>
		);
	}
}