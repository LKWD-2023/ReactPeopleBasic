import React from 'react';
import PersonForm from './PersonForm';
import { produce } from 'immer';
import PersonRow from './PersonRow';
import { v4 as uuidv4 } from 'uuid';

class PeopleTable extends React.Component {
    state = {
        people: [],
        person: {
            id: uuidv4(),
            firstName: '',
            lastName: '',
            age: ''
        },

        selectedPeople: []
    }

    onTextChanged = e => {
        const nextState = produce(this.state, drafState => {
            drafState.person[e.target.name] = e.target.value;
        });

        this.setState(nextState);

        // const copy = {...this.state.person};
        // copy[e.target.name] = e.target.value;
        // this.setState({person: copy});
    }

    onAddClicked = () => {
        const { people } = this.state;
        const { firstName, lastName, age, id } = this.state.person;
        const nextState = produce(this.state, drafState => {
            drafState.people.push({ firstName, lastName, age, id });
            drafState.person = {
                id: uuidv4(),
                firstName: '',
                lastName: '',
                age: ''
            }
        });

        this.setState(nextState);

        // const { people } = this.state;
        // const { firstName, lastName, age, id } = this.state.person;
        // // const copy = [...people, { firstName, lastName, age, id }];
        // const copy = [{ firstName, lastName, age, id }, ...people];
        // this.setState({
        //     people: copy,
        //     person: {
        //         id: uuidv4(),
        //         firstName: '',
        //         lastName: '',
        //         age: ''
        //     }
        // });
    }

    onClearAllClicked = () => {
        const nextState = produce(this.state, drafState => {
            drafState.people = [];
            drafState.person = {
                id: uuidv4(),
                firstName: '',
                lastName: '',
                age: ''
            }
        });

        this.setState(nextState);
    }

    generateTable = () => {
        const { people } = this.state;
        if (!people.length) {
            return <h1>No people added yet! Add some people!</h1>
        }

        return <table className='table table-hover table-striped table-bordered'>
            <thead>
                <tr>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Age</th>
                </tr>
            </thead>
            <tbody>
                {people.map((p, i) => <PersonRow key={p.id} person={p} />)}
            </tbody>
        </table>
    }

    onPersonSelectClick = (p) => {
        const { selectedPeople } = this.state;
        if (selectedPeople.includes(p.id)) {
            this.setState({ selectedPeople: selectedPeople.filter(i => i !== p.id) });
        } else {
            this.setState({ selectedPeople: [...selectedPeople, p.id] });
        }
    }

    render() {
        const { people, selectedPeople } = this.state;
        const { firstName, lastName, age } = this.state.person;
        return (
            <div className="container" style={{ marginTop: 60 }}>
                <h2>Selected People: {selectedPeople.length}</h2>
                <PersonForm
                    onTextChanged={this.onTextChanged}
                    firstName={firstName}
                    lastName={lastName}
                    age={age}
                    onAddClicked={this.onAddClicked}
                    onClearAllClicked={this.onClearAllClicked}
                />

                {!people.length && <h1>No people added yet! Add some people!</h1>}
                {!!people.length && <table className='table table-hover table-striped table-bordered'>
                    <thead>
                        <tr>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Age</th>
                            <th>Select</th>
                        </tr>
                    </thead>
                    <tbody>
                        {people.map((p, i) => <PersonRow
                            key={p.id}
                            person={p}
                            onPersonSelectClick={() => this.onPersonSelectClick(p)}
                            isSelected={selectedPeople.includes(p.id)}
                        />)}
                    </tbody>
                </table>}


                {/* {this.generateTable()} */}
            </div>);
    }
}

export default PeopleTable;