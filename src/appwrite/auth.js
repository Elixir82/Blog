import conf from "../conf";
import { Client, Account, ID } from "appwrite";

class auth{
  client =new Client();
  account;

  constructor(){
    this.client.setProject(conf.appwriteprojectid);
    this.client.setEndpoint(conf.appwriteapiendpoint);
    this.account=new Account(this.client);
  }
  
  async createAccount({email,name,password}) {
    try {
      let userAccount = await this.account.create(ID.unique(),email,password,name);
      console.log(userAccount )
      if(userAccount ){
        return await this.login({email,password});
      }else return userAccount ;
    } catch (error) {
      console.log("Create Account throws error");
      throw error;
    }
  }

  async login({email,password}){
    try {
      return await this.account.createEmailPasswordSession(email,password)
    } catch (error) {
      console.log("Login throws error");
      throw error;
    }
  }

  async logout(){
    try {
      await this.account.deleteSessions();
    } catch (error) {
      console.log("Delete session throws error");
      throw error;
    }
  }

  async getCurrentUser(){
    try {
      let user= await this.account.get();
      if(user){
        return user;
      }else {return null;}
    } catch (error) {
      console.log("No active session");
      throw error;
    }
    
  }
}

let Authservices=new auth();
export default Authservices;