import React from 'react'
import { IPerson } from './Interfaces'

type Props = {
    person: IPerson;
    setPersonInfo(person: IPerson): void;
}

export const Row: React.FC<Props> = (props) => {
    if (props.person !== undefined) {
    return (
        <tr onClick={() => {props.setPersonInfo(props.person)}}>
            <td>{props.person.id}</td>
            <td>{props.person.name}</td>
            <td>{props.person.password}</td>
            <td>{props.person.email}</td>
            <td>{props.person.phone}</td>   
            <td>{props.person.status}</td>
        </tr>
    )
    }
    return <div></div>
}

