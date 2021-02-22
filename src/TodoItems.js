import React, { Component } from "react";
import "./todoList.css";
class TodoItems extends Component {
    constructor(props) {
        super(props);

        this.createTasks = this.createTasks.bind(this);
    }

    delete(key) {
        this.props.delete(key);
    }

    check(key) {
        this.props.check(key);
    }

    createTasks(item) {
        return <li key={item.key}>
            <div>
                <button className="check" onClick={() => this.check(item.key)}>
                    <i className="fa fa-check"></i>
                </button>
                <span className={item.className}>{item.text}</span>
            </div>
            {/* <p>Due to:</p> */}
            <button className="trash" onClick={() => this.delete(item.key)}>
                <i className="fa fa-trash"></i>
            </button>
        </li>
    }

    render() {
        
       
        

        return (
            <ul className="theList">
                {this.props.entries.map(this.createTasks)}
            </ul>
        );
    }
};

export default TodoItems;