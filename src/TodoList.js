import React, { Component } from "react";
import TodoItems from "./TodoItems";
import 'date-fns';
// import Grid from '@material-ui/core/Grid';
// import DateFnsUtils from '@date-io/date-fns';
// import {
//     MuiPickersUtilsProvider,
//     KeyboardDatePicker,
// } from '@material-ui/pickers';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
// import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";

class TodoList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items: [],
            deletedItems: [],
            checkedItems: [],
            // selectedDate: new Date(),
            startDate: new Date()
        };

        this.addItem = this.addItem.bind(this);
        this.deleteItem = this.deleteItem.bind(this);
        this.handleDate = this.handleDate.bind(this);
        this.checkItem = this.checkItem.bind(this);


    }

    handleDate() {
        console.log("Hallo");
    }

    // handleDateChange(date) {
    //     this.setState({ selectedDate: date });
    //     console.log("handleChanged runs");
    // }

    deleteItem(key) {
        const filteredItems = this.state.items.filter((item) => (item.key !== key));

        const unfilteredItems = this.state.items.filter((item) => (item.key === key));

        this.setState({
            items: filteredItems,
            deletedItems: unfilteredItems
        });
    }

    checkItem(key) {
        const checkedObj = this.state.items.findIndex((el) => (el.key === key));
        const cName = this.state.items[checkedObj].className;
        this.state.items[checkedObj].className = cName === "checked" ? "default" : "checked";   /****** TERNARY :D */
        this.setState({ items: this.state.items });

        const filteredItems = this.state.items.filter((item) => (item.key !== key));

        const unfilteredItems = this.state.items.filter((item) => (item.key === key));


        this.setState({
            items: this.state.items,
            checkedItems: unfilteredItems
        });


    }



    addItem(e) {
        if (this._inputElement.value !== "") {
            const newItem = {
                text: this._inputElement.value,
                key: Date.now(),
                className: "default"
            };

            this.setState((prevState) => {  // neden bir method olarak cagirmak gerekiyorki sadece return icindeki assign islemini yapsa yetmez mi?
                return {
                    items: prevState.items.concat(newItem)
                };
            });

            this._inputElement.value = "";
        }
        else {
            alert("Empty task? Doesn't make sense :D");
        }

        console.log(this.state.items);

        e.preventDefault();
    }



    render() {
        return (
            <Tabs>
                <TabList>
                    <Tab>Tasks</Tab>
                    <Tab>Last Deleted Task</Tab>
                    <Tab>Last Finiished Task</Tab>
                </TabList>

                <TabPanel>

                    <div className="todoListMain">
                        <div className="header">
                            <form onSubmit={this.addItem}>
                                <input ref={(a) => this._inputElement = a} placeholder="enter task" />

                                {/* <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                    <KeyboardDatePicker
                                        margin="normal"
                                        id="date-picker-dialog"
                                        format="MM/dd/yyyy"
                                        value={this.state.selectedDate}
                                        onChange={() => this.handleDateChange}
                                        KeyboardButtonProps={{
                                            'aria-label': 'change date',
                                        }}
                                    />
                                </MuiPickersUtilsProvider> */}

                                <TextField
                                    id="datetime-local"
                                    type="datetime-local"
                                    defaultValue="2021-02-15T12:00"
                                    // value=""
                                    className="textField"
                                    onChange={this.handleDate}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />

                                {/* <DatePicker selected={this.startDate} onChange={date => this.setState(date)} /> */}

                                <button type="submit">Add Task</button>
                            </form>
                        </div>
                        <TodoItems entries={this.state.items} delete={this.deleteItem} check={this.checkItem} />
                    </div>
                </TabPanel>
                <TabPanel>
                    <div className="todoListMain">
                        <TodoItems entries={this.state.deletedItems} delete={this.deleteItem} check={this.checkItem} />
                    </div>
                </TabPanel>
                <TabPanel>
                    <div className="todoListMain">
                        <TodoItems entries={this.state.checkedItems} delete={this.deleteItem} check={this.checkItem} />
                    </div>
                </TabPanel>
            </Tabs>
        );
    }
}

export default TodoList;