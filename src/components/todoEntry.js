import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import TagDescriptionSection from './TagDescriptionSection';

@observer export default class TodoEntry extends React.Component {
	addTags = () => {
		const { addTags } = this.props.todoStore
		const { value } = this.refs.tagValue
	
		if (value) {
			addTags(value)
			this.refs.tagValue.value = ''
		}
	}

	addTodo = () => {
		const { addTodo, tagDescriptions } = this.props.todoStore
		const { value } = this.refs.newField
		
		if (value && tagDescriptions.length > 0) {
			addTodo(value, tagDescriptions)
			this.refs.newField.value = ''
		}
	}

	render() {
		const { tagDescriptions } = this.props.todoStore

		return (
			<div className="input-section">
				<input
					ref="newField"
					className="new-todo"
					placeholder="What needs to be done?"
					autoFocus={true}
				/>
				<input
					ref="tagValue"
					className="new-todo"
					placeholder="Add a tag"
					autoFocus={true}
					onKeyPress={e => {
						e.key === 'Enter' && (
							this.addTags()
						)
					}}
				/>

				<TagDescriptionSection tagDescriptions={tagDescriptions} />

				<div className="add-todo-button-container">
					<button 
						className="button-style"
						onClick={() => this.addTodo()}>
						Add Todo
					</button>
				</div>
			</div>
		);
	}
}

TodoEntry.propTypes = {
	todoStore: PropTypes.object.isRequired
};