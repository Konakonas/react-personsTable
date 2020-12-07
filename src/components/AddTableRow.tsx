import React from 'react'
import { PersonsStore } from './Stores/PersonStore';
import { IPerson, status } from './Interfaces'

type personType = {
    person: IPerson;
}

type Props = {
    personsStore?: PersonsStore,
    currentPerson: IPerson | null,
    isFinished(): void;
}

export const AddTableRow: React.FC<Props> = (props) => {

    const newPerson: IPerson = {
        id: 0,
        email: '',
        password: '',
        phone: '',
        name: '',
        status: status.client,
        dateCreated: new Date(),
        dateChanged: new Date(),
    };

    let currentPerson: IPerson = props.currentPerson ? props.currentPerson : newPerson;

    return (
        <div>
            <div>Id
                <input className="addTable" type="number" onChange={event => (currentPerson.id = +event.currentTarget.value)} />
            </div>
            <div>Name 
                <input className="addTable" type="text" onChange={event => (currentPerson.name = event.currentTarget.value)}/> 
            </div>
            <div>Email 
                <input className="addTable" type="text" onChange={event => (currentPerson.email = event.currentTarget.value)}/> 
            </div>
            <div>Password 
                <input className="addTable" type="text" onChange={event => (currentPerson.password = event.currentTarget.value)}/> 
            </div>
            <select onChange={(event) => (currentPerson.status = event.currentTarget.value as status)}> Status
                <option value={status.admin}>admin</option>
                <option value={status.client}>client</option>
                <option value={status.partner}>partner</option>
            </select>
            <div>Phone 
                <input className="addTable" type="number" onChange={event => (currentPerson.phone = event.currentTarget.value)}/> 
            </div>
            <div className="addPersonButton">
                <button onClick={() => {props.personsStore?.addNewPerson(currentPerson); props.isFinished()}}>Добавить</button> : 
            </div>
        </div>
    )
}
