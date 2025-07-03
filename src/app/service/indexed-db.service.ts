import { Injectable } from '@angular/core';
import { openDB } from 'idb';

@Injectable({
  providedIn: 'root'
})
export class IndexedDbService {
  private dbName = 'AirlineDB';



  async initDB() {
    return await openDB(this.dbName, 1, {
      upgrade(db) {

        if (!db.objectStoreNames.contains('user')) {
          db.createObjectStore('user', { keyPath: 'id' });
        }
      }
    });
  }

  async setUser(user: any) {
    try {
      const db = await this.initDB();
      await db.put('user', user);
    }catch {
      const db = await this.initDB();
      await db.put('user', user);
    }
  }
  async setRole(role :   string){
    const db = await this.initDB();
    await db.put('role',  role);
  }

  async  deleteRole(){
    const db = await this.initDB();
    await db.delete('role' , 0);
  }

  async getUser(  ) {
    try{
      const db = await this.initDB();
      return (await db.getAll("user")).at(0);
    }catch {
      const db = await this.initDB();
      return (await db.getAll("user")).at(0);
    }
  }
  async getRole() {
    try {
      const db = await this.initDB();
      return (await db.getAll("role")).at(0);
    }catch {
      const db = await this.initDB();
      return (await db.getAll("role")).at(0);
    }
  }
  async getAllUser( ) {
    try{
      const db = await this.initDB();
      return await db.getAll('user');
    }catch(e){
      const db = await this.initDB();
      return await db.getAll('user');
    }
  }
  async getAllRole( ) {
    try {
      const db = await this.initDB();
      return await db.getAll('role');
    }catch (e){
      const db = await this.initDB();
      return await db.getAll('role');
    }
  }


  async deleteUser(  id: string) {
   try{
     const db = await this.initDB();
     await db.delete('user' , 0);
   }catch (e){
     const db = await this.initDB();
     await db.delete('user' , 0);
   }
  }


}
