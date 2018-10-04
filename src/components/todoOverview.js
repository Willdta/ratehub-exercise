import React from 'react';
import PropTypes from 'prop-types';
import {observer} from 'mobx-react';
import { ACTIVE_TODOS, COMPLETED_TODOS } from '../constants';

import TodoItem from './todoItem';

@observer
export default class TodoOverview extends React.Component {
	render() {
		const { viewStore } = this.props;
		const { 
			todos, 
			activeTodoCount, 
			filteredTodos 
		} = this.props.todoStore;

		if (todos.length === 0)
			return null;
		
		return (
			<section className="main">
				<input
					className="toggle-all"
					type="checkbox"
					onChange={this.toggleAll}
					checked={activeTodoCount === 0}
				/>
				<ul className="todo-list">
					{filteredTodos.map(todo =>
						(<TodoItem
							key={todo.id}
							todo={todo}
							viewStore={viewStore}
						/>)
					)}
				</ul>
			</section>
		)
	}

	// getVisibleTodos() {
	// 	return this.props.todoStore.todos.filter(todo => {
	// 		switch (this.props.viewStore.todoFilter) {
	// 			case ACTIVE_TODOS:
	// 				return !todo.completed;
	// 			case COMPLETED_TODOS:
	// 				return todo.completed;
	// 			default:
	// 				return true;
	// 		}
	// 	});
	// }

	toggleAll = (event) => {
		var checked = event.target.checked;
		this.props.todoStore.toggleAll(checked);
	};
}


TodoOverview.propTypes = {
	viewStore: PropTypes.object.isRequired,
	todoStore: PropTypes.object.isRequired
}
