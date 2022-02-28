import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  saveItem(nameItem: string, values: any){
      localStorage.setItem(nameItem, values);
  }
}

