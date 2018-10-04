import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import {observer} from 'mobx-react';

const ENTER_KEY = 13;

@observer export default class TodoEntry extends React.Component {
	render() {
		return (
		<div>
			<input
				ref="newField"
				className="new-todo"
				placeholder="What needs to be done?"
				onKeyDown={this.handleNewTodoKeyDown}
				autoFocus={true}
			/>
			<input
				ref="newField"
				className="new-todo"
				placeholder="Add a tag"
				autoFocus={true}
			/>
			<div className="add-todo-button-container">
				<button className="button-style">
					Add Todo
				</button>
			</div>
		</div>
		);
	}

	handleNewTodoKeyDown = (event) => {
		if (event.keyCode !== ENTER_KEY) {
			return;
		}

		event.preventDefault();

		var val = ReactDOM.findDOMNode(this.refs.newField).value.trim();

		if (val) {
			this.props.todoStore.addTodo(val);
			ReactDOM.findDOMNode(this.refs.newField).value = '';
		}
	};
}

TodoEntry.propTypes = {
	todoStore: PropTypes.object.isRequired
};
