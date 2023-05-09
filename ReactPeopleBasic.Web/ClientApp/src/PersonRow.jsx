import React from 'react';

class PersonRow extends React.Component {

    // getTableClassName = () => {
    //     const { age } = this.props.person;
    //     if(age >= 65) {
    //         return 'table-danger';
    //     }
    // }

    onPersonSelectClick = () => {
        this.props.onPersonSelectClick(this.props.person);
    }

    render() {
        const { firstName, lastName, age } = this.props.person;
        const { isSelected, onPersonSelectClick } = this.props;
        return <tr className={+age >= 65 ? 'table-danger' : ''}>
            <td>{firstName}</td>
            <td>{lastName}</td>
            <td>{age}</td>
            <td>
                {/* <button className='btn btn-success' onClick={this.onPersonSelectClick}>Select</button> */}
                <button className={`btn ${isSelected ? 'btn-danger' : 'btn-success'}`} onClick={onPersonSelectClick}>
                    {isSelected ? 'Unselect' : 'Select'}
                </button>
            </td>
        </tr>
    }
}

export default PersonRow;