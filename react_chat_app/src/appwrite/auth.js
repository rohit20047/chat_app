import conf from '../config/config';
import { Client, Account, ID } from "appwrite";

export class AuthService {
    client = new Client();
    account;
    subscription; // Add a property to store the subscription
    unsubcription

    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);
        this.account = new Account(this.client);
        this.subscription = null; // Initialize the subscription property
        this.unsubcription = null;
    }



    async createAccount({email, password, name}) {
        try {
            const userAccount = await this.account.create(ID.unique(), email, password, name);
            if (userAccount) {
                // call another method
                return this.login({email, password});
            } else {
               return  userAccount;
            }
        } catch (error) {
            throw error;
        }
    }

    async login({email, password}) {
        try {
           // console.log("hiiiiiiiiiii")
            return await this.account.createEmailSession(email, password);
        } catch (error) {
            throw error;
        }
    }

    async getCurrentUser() {
        try {
            return await this.account.get();
        } catch (error) {
            console.log("Appwrite serive :: getCurrentUser :: error", error);
        }

        return null;
    }

    async logout() {

        try {
            await this.account.deleteSessions();
        } catch (error) {
            console.log("Appwrite serive :: logout :: error", error);
        }
    }

    just(){
        console.log("working")
    }


    subscribeToDocuments(callback) {
    

        // Subscribe to documents
       return  this.subscription = this.client.subscribe(
            `databases.${conf.appwriteDatabaseId}.collections.${conf.appwriteCollectionId}.documents`,
            callback
        );
        
       
    }

   





    // Other methods...

}

export const authService = new AuthService();
export const appwriteClient = authService.client;
export default authService