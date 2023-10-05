
/* function tempalate for add ,update ,delete request opserations */
const ApiReq = async (url ="",optionsObj = null,errMsg = null) => {
    try{
        const response = await fetch(url,optionsObj);
        if (!response.ok) throw Error("Please reload application.");
        

    } catch (err) {
        errMsg = err.message;
    }  finally {
        return errMsg;
    }
}


export default ApiReq;