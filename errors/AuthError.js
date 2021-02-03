class AuthError extends Error{
    constructor(type,status,message){
        super(message)
        this.type=type;
        this.status=status;
        this.message=message;
    }


}

module.exports=AuthError;