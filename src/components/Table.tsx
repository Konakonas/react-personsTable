import React from "react";
import { ColumnHeader } from "./ColumnHeader";
import { Row } from "./Row";
import { inject, observer } from "mobx-react";
import { PersonsStore, SortParam } from "./Stores/PersonStore";
import { Pagination } from "./Pagination";
import { AddTableRow } from "./AddTableRow";
import { ChangeTableRow } from "./ChangeTableRow";
import { IPerson, status } from "./Interfaces";

type Props = {
  personsStore?: PersonsStore;
};

type State = {
  search: string,
  isChange: boolean,
  isCreated: boolean;
};

//let filter: string = "";

@inject("personsStore")
@observer
export class Table extends React.Component<Props, State> {
  state: State = { search: "",  isChange: false, isCreated: false };

  componentDidMount(): void {
    this.props.personsStore?.init();
  }

  setStatus(): void {
    this.props.personsStore?.init();
  }

  render() {
    const { personsStore } = this.props;
    
    if (personsStore?.isLoading) {
      return <div className="container isLoading">Is loading</div>;
    }

    return (
      <div className="container">
        <div className="informationTable">
          <div className="addNewPerson">
            <button onClick={() => this.isCreating()}>Добавить данные</button>
            <div className="newPerson">
              { this.state.isCreated && <AddTableRow personsStore={personsStore} currentPerson={personsStore!.currentPerson} isFinished={this.isCreating} /> }
            </div>
            <div className="changePerson">
              { this.state.isChange && <ChangeTableRow personsStore={personsStore} currentPerson={personsStore!.currentPerson}/> }
            </div>    
          </div>
          <div className="search">
            <input
              type="text"
              value={this.state.search}
              onChange={(event) =>
                this.setState({ search: event.currentTarget.value })
              }
            />
            <button
              onClick={() =>
                this.props.personsStore?.setSearch(this.state.search)
              }
            >
              Поиск
            </button>
            <select onChange={(event) => (this.changeFilterStatus(event.currentTarget.value as status))}> Status
                <option value={status.admin}>admin</option>
                <option value={status.client}>client</option>
                <option value={status.partner}>partner</option>
            </select>
            <input type="checkbox" onChange={event => {this.changeFilterStatus(event.currentTarget.value as status)}}/>
          </div>
        </div>
        <table className="table">
          <thead>
            <tr className="tableHeader">{this.columnHeaders}</tr>
          </thead>
          <tbody>
            {personsStore!.currentPersons.map((person) => (
              <Row
                person={person}
                setPersonInfo={() => {
                  personsStore!.setCurrentPerson(person);
                }}
              />
            ))}
          </tbody>
        </table>
        <div className="pages">
          <Pagination
            currentPage={personsStore!.currentPage}
            availablePages={personsStore!.availablePages}
            onChange={this.changePage}
          />
        </div>
      </div>
    );
  }

  get columnHeaders() {
    const { personsStore } = this.props;
    const columns: Array<[keyof IPerson, string]> = [
      ["id", "ID"],
      ["name", "name"],
      ["password", "Password"],
      ["email", "Email"],
      ["phone", "Phone"],
      ["status", "status"],
    ];
    return columns.map(([columnKey, columnName]) => (
      <ColumnHeader
        columnName={columnName}
        columnKey={columnKey}
        sortingParam={personsStore!.sorting}
        onChange={this.changeSorting}
      />
    ));
  }

  changePage = (pageNumber: number) => {
    this.props.personsStore?.setPage(pageNumber);
  };

  changeSorting = (sortingParams: SortParam) => {
    this.props.personsStore?.setSorting(sortingParams);
  };

  changeFilterStatus = (status: status ) => {
    this.props.personsStore?.setFilter(status);
  }

  unableFilter = () => {
    this.props.personsStore?.setFilered(!this.props.personsStore?.isFiltred);
  }

  isCreating = () => {
    this.setState({ isCreated: !this.state.isCreated})
  }

  isChange = () => {
    this.setState({ isCreated: !this.state.isChange});
  }
}
