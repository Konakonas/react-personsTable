import { IPerson } from "../components/Interfaces";

export class LocalStorageClass {
    // async get<T>(url: string): Promise<T> {
    //     const response = await fetch(url);
    //     return response.json();
    // }
    // async get<t>
    setToLocalStorage(value: IPerson[]) {
        localStorage.setItem('personStore', JSON.stringify(value));
    }
    
    getFromLocalStorage(): IPerson[]{
        const store = localStorage.getItem('personStore');
        return store ? JSON.parse(store) : [];
    }
}
export const localStorageService = new LocalStorageClass();
