class appError extends Error{
     constructor(){
        super();
     }

    create(mesage,statusCode){
        this.statusCode = statusCode;
        this.mesage = mesage;
        return this;
    }

}

module.exports = new appError();