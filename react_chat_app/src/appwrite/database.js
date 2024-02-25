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
                [Query.limit(50)]
                
              
            )
        } catch (error) {
            console.log("Appwrite serive :: getPosts :: error", error);
            return false
        }
    }


    async createMessage(payload , permissions){
        try{
            return await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                ID.unique(),
                payload,
                permissions

            )
        }
        catch(error){

        }
    }

    async deleteMessage(message_id){
        try{
            console.log(message_id)
            return await this.databases.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,

                message_id,
                console.log("deleted")
            )
        }
        catch(error){

        }
    }

}
const service = new Service()
export default service 