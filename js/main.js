$(function(){
    $("#employer").on("click", function(){
       $(".employee-addon").css("display","none");
    });

    $("#employee").on("click", function(){
        $(".employee-addon").css("display","block");
     });

    $("form").on("submit", function(event){
        event.preventDefault();
        var value = $("form input[name=name]").val();
        window.sessionStorage.setItem("name", value);
        if($("#employer:checked").val()){
            window.sessionStorage.setItem("user", "employer");
            window.location.replace("pages");
        }else if($("#employee:checked").val() ){
            window.sessionStorage.setItem("user", "employee");
            window.location.replace("pages");
        }
        
    });

    $(".logout").on("click", function(){
        delete sessionStorage.name;
        delete sessionStorage.user;
        var path = location.pathname;

        if(path.includes("/jobconnect/pages/employee/") || path.includes("/jobconnect/pages/employer/")){
            window.location.replace("../../");
        }else{
            window.location.replace("../");
        }
        
    });



    if(sessionStorage.user){
        var userName = sessionStorage.name;
        $('.username').text(userName);
     }

     if(sessionStorage.user == "employee" ){
        $("#employer-header").css("display","none");
    }else if(sessionStorage.user == "employer"){
        $("#employee-header").css("display","none");
    }
    
});
