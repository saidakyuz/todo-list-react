import React, { Component } from "react";
import TodoItems from "./TodoItems";

class TodoList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items: []
        };

        this.addItem = this.addItem.bind(this);
        this.deleteItem = this.deleteItem.bind(this);
    }

    deleteItem(key) {
        // filteredItems an Array which contains every items except removed items.
        const filteredItems = this.state.items.filter(function (item) {
          return (item.key !== key);
        });
       
        this.setState({
          items: filteredItems
        });
      }

    addItem(e) {
        if (this._inputElement.value !== "") {
            const newItem = {
                text: this._inputElement.value,
                key: Date.now()
            };

            this.setState((prevState) => {  // neden bir method olarak cagirmak gerekiyorki sadece return icindeki assign islemini yapsa yetmez mi?
                return {
                    items: prevState.items.concat(newItem)
                };
            });

            this._inputElement.value = "";
        }
        else {
            alert("Cannot not create empty task");
        }

        console.log(this.state.items);

        e.preventDefault();
    }

    render() {
        return (
            <div className="todoListMain">
                <div className="header">
                    <form onSubmit={this.addItem}>
                        <input ref={(a) => this._inputElement = a} placeholder="enter task">
                        </input>
                        <button type="submit">Add Task</button>
                    </form>
                </div>
                <TodoItems entries={this.state.items} delete={this.deleteItem} />
            </div>
        );
    }
}

export default TodoList;