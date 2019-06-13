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
        if($("#employer:checked").val() ){
            window.sessionStorage.setItem("user", "employer");
            window.location.replace("pages");
        }
        if($("#employee:checked").val() && $("#specialItems").val() != "Select Specialization" && $("#skills").val() != "Select Skills" ){
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


if(document.getElementById("rightDate")){
    document.getElementById("rightDate").innerHTML = new Date().getFullYear();
}

if(document.getElementById("userForm"))
{
fetch("json/specializationData.json")
.then(response => response.json())
.then(result => {
    let optionItems = "<option selected value='Select Specialization'>Select Specialization</options>"; 
    for(const val of result){
        optionItems += `<option value='${val}'> ${val} </option>`;
    }
    document.getElementById("specialItems").innerHTML = optionItems;
}); 

document.getElementById("specialItems").addEventListener("change", (event) => {
    if(event.target.value != 'Select Specialization'){
        skills("json/skills.json", event.target.value);
    }
});
}

function skills(filePath , targetValue){
    fetch(filePath)
    .then(response => response.json())
    .then(result => {
        let optionItems = "<option selected value='Select Skills'>Select Skills</options>"; 
        for(const [key,val] of Object.entries(result)){
            if(key == targetValue){
                for(const item of val)
                optionItems += `<option value='${item}'> ${item} </option>`;
            }
            
        }
        document.getElementById("skills").innerHTML = optionItems;
    }); 
}