import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { openDB } from 'idb';

@Injectable({
  providedIn: 'root'
})
export class IndexedDbService {
  private dbName = 'AirlineDB';
  isBrowser: any;
  constructor(@Inject(PLATFORM_ID) platformId: Object) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  async getData() {
    if (!this.isBrowser) {
      return Promise.resolve(null); // Alternative pour le serveur
    }
    
    // Code IndexedDB uniquement côté client
    return new Promise((resolve) => {
      const request = indexedDB.open('MyDB');
      request.onsuccess = () => resolve(request.result);
    });
  }

  async initDB() {
    let response = await this.getData();
    if(response == null) return Promise.resolve(null);; 
    return await openDB(this.dbName, 1, {
      upgrade(db) {

        if (!db.objectStoreNames.contains('user')) {
          db.createObjectStore('user', { keyPath: 'id' });
        }
      }
    });
  }

  async setUser(user: any) {
    const db = await this.initDB();
    if(db == null) return ; 
    try {
      
      await db.put('user', user);
    }catch {
      
      await db.put('user', user);
    }
  }
  async setRole(role :   string){
    const db = await this.initDB();
    if(db == null) return ; 
    
    await db.put('role',  role);
  }

  async  deleteRole(){
    const db = await this.initDB();
    if(db == null) return ; 
   
    await db.delete('role' , 0);
  }

  async getUser(  ) {
    const db = await this.initDB();
    if(db == null) return  null; 
    try{
       
      return (await db.getAll("user")).at(0);
    }catch {
    
      return (await db.getAll("user")).at(0);
    }
  }
  async getRole() {
    const db = await this.initDB();
    if(db == null) return ""; 
    try {
   
      return (await db.getAll("role")).at(0);
    }catch {
    
      return (await db.getAll("role")).at(0);
    }
  }
  async getAllUser( ) {
    const db = await this.initDB();
    if(db == null) return ; 
    try{
   
      return await db.getAll('user');
    }catch(e){
    
      return await db.getAll('user');
    }
  }
  async getAllRole( ) {
    const db = await this.initDB();
    if(db == null) return []; 
    try {
       
      return await db.getAll('role');
    }catch (e){
      
      return await db.getAll('role');
    }
  }


  async deleteUser(  id: string) {
    const db = await this.initDB();
    if(db == null) return ; 
   try{
     
     await db.delete('user' , 0);
   }catch (e){
    
     await db.delete('user' , 0);
   }
  }

}
