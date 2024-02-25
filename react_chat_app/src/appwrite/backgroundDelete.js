import service from "./database";

const bgDelete = async()=>
{
    let res = await service.getMessages();
    let l = res.documents.length -  25;

    console.log("before "  , res.documents)

    if(l > 0){
        for (let i = 0 ; i < l  ; i++){
            await service.deleteMessage(res.documents[i].$id);
            console.log("deleted" , res.documents[i].$id)
        }
        console.log(res.documents)
    }
    
}

export default bgDelete;