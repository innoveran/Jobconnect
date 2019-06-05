(function(){
    if(!sessionStorage.name)
    {
     
    }else{
        if(sessionStorage.user == "employer"){
            window.location.replace("pages/employer");
        }else if(sessionStorage.user == "employee"){
            window.location.replace("pages/employee");
        }
    }
}());