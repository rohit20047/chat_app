import service from "./database";

const bgDelete = async()=>
{
    let res = await service.getMessages();
    let l = 5;
    console.log("before "  , res.documents)
    for (let i = 0 ; i < l  ; i++){
        await service.deleteMessage(res.documents[i].$id);
        console.log("deleted" , res.documents[i].$id)
    }
    console.log(res.documents)
}

export default bgDelete;