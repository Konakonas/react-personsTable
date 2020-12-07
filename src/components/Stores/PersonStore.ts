import { IPerson, status } from '../Interfaces'
import { observable, computed, action } from 'mobx'
import { localStorageService } from '../../services/network.service'

export type SortParam = {
    column: keyof IPerson;
    isAscending: boolean;
} 

export const nullPerson: IPerson = {
    id: 0,
    email: '',
    password: '',
    phone: '',
    name: '',
    status: status.client,
    dateCreated: new Date(),
    dateChanged: new Date(),
};

export class PersonsStore {

    @observable 
    private _persons: IPerson[] = [];
    
    @observable
    private _isLoading: boolean = false;

    @observable
    private _currentPage: number = 0;

    @observable
    private _filter = status.client;
    
    @observable
    private _isFiltred: boolean = false;

    @observable
    private _availablePages: number = 0;

    @observable
    private _sorting: SortParam | null = null;

    @observable
    private _currentPerson: IPerson | null = null;

    @observable
    private _searchTerm: string = '';

    @computed
    get sorting(): SortParam | null {
        return this._sorting;
    }

    @computed
    get isLoading(): boolean {
        return this._isLoading;   
    }

    @computed
    get searchTerm(): string {
        return this._searchTerm;   
    }

    @computed 
    get currentPersons(): IPerson[] {
    
        let copy = [...this._persons];

        if (this._sorting != null && copy.length > 0) {
            const arr = this._sorting.isAscending;
            const key: keyof IPerson = this._sorting.column;
            if (typeof copy[0][key] === "string") {
                copy.sort((prev, next) => prev[key].toString().localeCompare(next[key].toString()) * ( arr? 1:-1 ));
            } else {
                copy.sort((prev, next) => ((prev[key] as number) - (next[key] as number)) * ( arr? 1:-1 ));    
            }
        }
        if (this._isFiltred) {
            copy.filter(person => person.status === this._filter)
        }
        return copy.filter(person => `${person.email} ${person.phone}`.toLowerCase().includes(this.searchTerm.toLowerCase())).slice(this._currentPage * 50, this._currentPage * 50 + 50);
    }

    @computed 
    get availablePages(): number { 
        return this._availablePages;
    }

    @computed 
    get currentPage(): number { 
        return this._currentPage;
    }

    @computed 
    get currentPerson(): IPerson | null { 
        return this._currentPerson;
    }

    @computed 
    get statusFilter() { 
        return this._filter;
    }

    @computed 
    get isFiltred() { 
        return this._isFiltred;
    }

    @action
    setFilered(isFiltred: boolean): void {
        this._isFiltred = isFiltred;
    }

    @action
    setFilter(filter: status): void {
        this._filter = filter;
    }

    @action
    setPage(page: number): void {
        this._currentPage = page;
    }

    @action 
    async init() {
        this._persons = localStorageService.getFromLocalStorage();
    }

    @action
    setSorting(sortingParams: SortParam) {
        this._sorting = sortingParams;          
    }

    @action
    addNewPerson(newPerson: IPerson) {
        this._persons.unshift(newPerson);
        localStorageService.setToLocalStorage(this._persons);
        this.setCurrentPerson(nullPerson);
        console.log(this._currentPerson);
    }

    @action
    setSearch(search: string) {
        this._searchTerm = search;
    }

    @action
    setCurrentPerson (curPerson: IPerson | null) {
        this._currentPerson = curPerson;
    }

    @action
    changePerson (curPerson: IPerson) {
        //this._currentPerson = curPerson;
    }

    @action
    deletePerson (curPerson: IPerson) {
        this._persons = this._persons.filter(person => person !== curPerson);
        localStorageService.setToLocalStorage(this._persons);
    }
}
