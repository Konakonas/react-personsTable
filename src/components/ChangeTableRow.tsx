import React from 'react'
import { PersonsStore } from './Stores/PersonStore';
import { IPerson } from './Interfaces'

type personType = {
    person: IPerson;
}

type Props = {
    personsStore?: PersonsStore,
    currentPerson: IPerson | null;
}

export const ChangeTableRow: React.FC<Props> = (props) => {

    return (
        <div>
            Hui
            {/* <div>Id
                <input className="addTable" type="number" onChange={event => (curPerson.id = +event.currentTarget.value)} />
            </div>
            <div>Name 
                <input className="addTable" type="text" onChange={event => (curPerson.name = event.currentTarget.value)}/> 
            </div>
            <div>Email 
                <input className="addTable" type="text" onChange={event => (curPerson.email = event.currentTarget.value)}/> 
            </div>
            <div>Password 
                <input className="addTable" type="text" onChange={event => (curPerson.password = event.currentTarget.value)}/> 
            </div>
            <select onChange={(event) => (curPerson.status = event.currentTarget.value as status)}> Status
                <option value={status.admin}>admin</option>
                <option value={status.client}>client</option>
                <option value={status.partner}>partner</option>
            </select>
            <div>Phone 
                <input className="addTable" type="number" onChange={event => (curPerson.phone = event.currentTarget.value)}/> 
            </div>
            <div className="addPersonButton">
                    <button onClick={() => {props.personsStore?.addNewPerson(curPerson, newPerson)}}>Добавить</button> : 
            </div> */}
        </div>
    )
}
