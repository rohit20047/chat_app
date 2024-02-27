import service from "./database";

const bgDelete = async()=>
{
    let res = await service.getMessages();
    let l = res.documents.length -  25;

   

    if(l > 0){
        for (let i = 0 ; i < l  ; i++){
            await service.deleteMessage(res.documents[i].$id);
            
        }
       
    }
    
}

export default bgDelete;