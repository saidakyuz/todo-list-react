import React, { Component } from "react";
import "./todoList.css";
class TodoItems extends Component {
    constructor(props) {
        super(props);

        this.createTasks = this.createTasks.bind(this);
    }

    delete(key) {
        this.props.delete(key);  // DELETE??? nerede tanimlandi bu method predefined mi?
    }

    createTasks(item) {
        return <li key={item.key}>
            <div><button className="check" onClick={() => this.delete(item.key)}>
                <i class="fa fa-check"></i>
            </button>
                {item.text}</div>
            <button className="trash" onClick={() => this.delete(item.key)}>
                <i class="fa fa-trash"></i>
            </button>
        </li>
    }

    render() {
        const todoEntries = this.props.entries;
        const listItems = todoEntries.map(this.createTasks);

        return (
            <ul className="theList">
                {listItems}
            </ul>
        );
    }
};

export default TodoItems;