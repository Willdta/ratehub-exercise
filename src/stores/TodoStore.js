import { observable, computed, action, reaction } from 'mobx';
import TodoModel from '../models/TodoModel';
import * as Utils from '../utils';


export default class TodoStore {
	@observable todos = [];
	@observable tagDescriptions = [];
	@observable filterableTags = [];
	@observable filter = 'all';

	@computed get activeTodoCount() {
		return this.todos.reduce(
			(sum, todo) => sum + (todo.completed ? 0 : 1),
			0
		)
	}

	@computed get completedCount() {
		return this.todos.length - this.activeTodoCount;
	}

	// Here we filter todos based on what `this.filter` is equal to
	@computed get filteredTodos() {

		// Check whether `this.filter` is equal to any
		// of the tags listed in the todos object
		const tagCheck = this.todos.filter(todo => (
			todo.tags.some(tag => tag === this.filter)
		))

		if (this.filter === 'all') {
			return [...this.todos];
		} else if (this.filter === 'complete') {
			return this.todos.filter(todo => todo.completed);
		} else if (this.filter === 'active') {
			return this.todos.filter(todo => !todo.completed);
		} else if (tagCheck) {
			return tagCheck
		}
	}

	subscribeServerToStore() {
		reaction(
			() => this.toJS(),
			todos => window.fetch && fetch('/api/todos', {
				method: 'post',
				body: JSON.stringify({ todos }),
				headers: new Headers({ 'Content-Type': 'application/json' })
			})
		);
	}

	subscribeLocalstorageToStore() {
		reaction(
			() => this.toJS(),
			todos => localStorage.setItem('mobx-react-todomvc-todos', JSON.stringify({ todos }))
		);
	}

	// Here we add the todo along with the tags
	@action addTodo = (title, tags) => {

		// make all tags lowercase to prevent duplicates in case of unnecessary uppercase
		const lowerCaseTags = tags.map(tag => tag.toLowerCase())

		// Along with id, title and completed values, we add on an array
		// of tags and remove any duplicates that might be added
		this.todos = [...this.todos, new TodoModel(this, Utils.uuid(), title, [...new Set(lowerCaseTags)], false)];

		const filteredArr = [];

		// Here we check if the filterableTags array includes
		// any value of tagDescriptions and if not push to the
		// filteredArr array
		for (const tag of this.tagDescriptions) {
			if (!this.filterableTags.includes(tag)) {
				filteredArr.push(tag.toLowerCase());
			}
		}

		// Then we remove duplicates
		const filteredUniques = filteredArr.filter((tag, i, arr) => arr.indexOf(tag) === i);

		// Here we spread the contents of filteredArr alongside the existing items in
		// the filterableTags array
		this.filterableTags = [...this.filterableTags, ...filteredUniques];

		// Set the tagDescriptions array to empty to clear the previus declared tags
		this.tagDescriptions = [];
	}

	// Simple concatination of any tags added to the tagDescriptions array
	@action addTags = tag => {
		this.tagDescriptions = [...this.tagDescriptions, tag];
	}

	// Change `this.filter` value to whatever is passed onClick
	@action changeTodoFilter = filter => {
		this.filter = filter;
	}

	toggleAll (checked) {
		this.todos.forEach(
			todo => todo.completed = checked
		);
	}

	clearCompleted () {
		this.todos = this.todos.filter(
			todo => !todo.completed
		);
	}

	toJS() {
		return this.todos.map(todo => todo.toJS());
	}

	static fromJS(array) {
		const todoStore = new TodoStore();
		todoStore.todos = array.map(item => TodoModel.fromJS(todoStore, item));
		return todoStore;
	}
}