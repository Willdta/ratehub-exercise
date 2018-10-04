import React from 'react';
import PropTypes from 'prop-types';
import {observer} from 'mobx-react';
import {pluralize} from '../utils';
import { ALL_TODOS, ACTIVE_TODOS, COMPLETED_TODOS } from '../constants';

@observer
export default class TodoFooter extends React.Component {
	render() {
		const { 
			activeTodoCount, 
			completedCount,
			changeTodoFilter,
			filterableTags
		} = this.props.todoStore;
		
		if (!activeTodoCount && !completedCount)
			return null;

		const activeTodoWord = pluralize(activeTodoCount, 'item');

		return (
			<div className="footer-section">
				<footer className="footer">
					<span className="todo-count">
						<strong>{activeTodoCount}</strong> {activeTodoWord} left
					</span>
					<ul className="filters">
						<li className="li-style" onClick={() => changeTodoFilter('all')}>All</li>
						<li className="li-style" onClick={() => changeTodoFilter('active')}>Active</li>
						<li className="li-style" onClick={() => changeTodoFilter('complete')}>Complete</li>
					</ul>
					{ completedCount === 0
						? null
						: 	<button
								className="clear-completed"
								onClick={this.clearCompleted}>
								Clear completed
							</button>
					}
				</footer>

				{filterableTags.map((tag, index) => (
					<span key={index}>{tag}</span>	
				))}
			</div>
		);
	}

	renderFilterLink(filterName, url, caption) {
		return (<li>
			<a href={"#/" + url}
				className={filterName ===  this.props.viewStore.todoFilter ? "selected" : ""}>
				{caption}
			</a>
			{' '}
		</li>)
	}

	clearCompleted = () => {
		this.props.todoStore.clearCompleted();
	};
}

TodoFooter.propTypes = {
	viewStore: PropTypes.object.isRequired,
	todoStore: PropTypes.object.isRequired
}
