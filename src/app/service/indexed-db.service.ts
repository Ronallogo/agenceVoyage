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
     // const db = await this.initDB();
     // await db.put('user', user);
     console.log("server running");
    }
  }
  async setRole(role :   string){
      try{
        const db = await this.initDB();
         await db.put('role',  role);
      }catch{
        console.log("server running");
      }
  }

  async  deleteRole(){
      try{
        const db = await this.initDB();
        await db.delete('role' , 0);
      }catch{
          console.log("server running");
      }
  }

  async getUser(  ) {
    try{
      const db = await this.initDB();
      return (await db.getAll("user")).at(0);
    }catch {
      //const db = await this.initDB();
      //return (await db.getAll("user")).at(0);
      console.log("server running");
    }
  }
  async getRole() {
    try {
      const db = await this.initDB();
      return (await db.getAll("role")).at(0);
    }catch {
     // const db = await this.initDB();
     // return (await db.getAll("role")).at(0);
      console.log("server running");
    }

  }
  async getAllUser( ) {
    try{
      const db = await this.initDB();
      return await db.getAll('user');
    }catch(e){
     // const db = await this.initDB();
      return "OUT";
      console.log("server running");
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
