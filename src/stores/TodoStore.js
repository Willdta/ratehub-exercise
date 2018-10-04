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

	@computed get filteredTodos() {
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

	@action addTodo = (title, tags) => {
		const lowerCaseTags = tags.map(tag => tag.toLowerCase())

		this.todos = [...this.todos, new TodoModel(this, Utils.uuid(), title, [...new Set(lowerCaseTags)], false)];

		const filteredArr = [];

		for (const tag of this.tagDescriptions) {
			if (!this.filterableTags.includes(tag)) {
				filteredArr.push(tag.toLowerCase());
			}
		}

		const filteredUniques = filteredArr.filter((tag, i, arr) => arr.indexOf(tag) === i);

		this.filterableTags = [...this.filterableTags, ...filteredUniques];

		this.tagDescriptions = [];
	}

	@action addTags = tag => {
		this.tagDescriptions = [...this.tagDescriptions, tag];
	}

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
