import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})

export class LocalStorageService {

    setData(itemName: string, data: any) {

        const jsonData = JSON.stringify(data);

        localStorage.setItem(itemName, jsonData);
    }

    getData(itemName: string) {
        return localStorage.getItem(itemName);
    }

    removeData(itemName: string) {
        localStorage.removeItem(itemName);
    }

    removeAllData() {
        localStorage.clear();
    }
}