import conf from "../config/config";
import { Client, ID, Databases, Storage, Query } from "appwrite";


export class Service{

    client = new Client();
    databases;

    constructor(){
        this.client 
        .setEndpoint(conf.appwriteUrl)
        .setProject(conf.appwriteProjectId);
        this.databases = new Databases(this.client);
    }

    async getMessages(){
        
        try {
            return  await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                
              
            )
        } catch (error) {
            console.log("Appwrite serive :: getPosts :: error", error);
            return false
        }
    }


    async createMessage(payload){
        try{
            return await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                ID.unique(),
                payload

            )
        }
        catch(error){

        }
    }

}
const service = new Service()
export default service 