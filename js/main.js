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
locate = location.pathname;
if(locate.includes("searchcandidate"))
{
    url = "../../json/specializationData.json";
    sel = "All Categories";
}else{
    url = "json/specializationData.json";
    sel = "Select Specialization";
}
fetch(url)
.then(response => response.json())
.then(result => {
    let optionItems = "<option selected value='Select Specialization'>"+sel+"</options>"; 
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


if(document.getElementById("candidatesSearched"))
{
fetch("../../json/searchcandidates.json")
.then(response => response.json())
.then(result => {
    let candidates = "";
    for(const [key,val] of Object.entries(result)){
        for(const [spot,res] of Object.entries(val)){
            candidates += `
            <div class=" mt-3 canditem mx-1">
                <header class="canhead py-3 px-3">
                    <img src="../../img/candidate_avatar.jpg" class="img-thumbnail float-left" style="width:64px; height:64px" >
                    <div class="d-inline-block hgroup mx-4 candisplay">
                        <h4>${res.name}</h4>
                        <h5>${res.title}</h5>
                    </div>
                </header>
                <div class="card-body canhead">
                    <p>
                        ${res.profile}
                    </p>
                </div>
                <div class=" row py-3 px-2">
                    <div class="col-sm-6">
                    <i class="fas fa-phone"></i> ${res.phone}
                    </div>
                    <div class="col-sm-6 text-right">
                    <a class="btn btn-primary" href="candidates.html?category=${key}&index=${spot}">View Candidate</a>
                    </div>
                </div>
            </div>`;
        }
         
    }
    document.getElementById("candidatesSearched").innerHTML = candidates;
}); 

document.getElementById("specialItems").addEventListener("change", (event) => {
    if(event.target.value != 'Select Specialization'){
        skills("json/skills.json", event.target.value);
    }
});
}

if(document.getElementById("viewCandidate")){
    const candidateSearch = location.search;
    const searchUpdate = candidateSearch.replace("?","");
    const searchSplit = searchUpdate.split("&");
    let canInfo = [];
    let count = 0;
    for(const item of searchSplit.values()){
        const cat = item.split("=");
        canInfo[count] = cat[1];
        count++;
    }
    

    fetch("../../json/searchcandidates.json")
    .then(response => response.json())
    .then(result => {
        let candidates = "";
        for(const [key,val] of Object.entries(result)){
            if(key == decodeURIComponent(canInfo[0])){
                for(const [spot,res] of Object.entries(val)){
                   
                    if(spot == canInfo[1]){
                        candidates += `
                            <div class="m-5">
                                <header class="border-bottom overflow-auto ">
                                    <img src="${res.image}" class="img-thumbnail float-sm-left" alt="" style="width:200px; height:200px">
                                    <p>
                                        <h1 class="text-center info">${res.name}</h1>
                                        <p class="text-center mt-4 title-format">${res.title}</p>
                                    </p>
                                </header>
                                <div class="pt-5">
                                    <p class="profile-format">
                                        ${res.profile}
                                    </p>
                                </div>
                                <div class="pt-5 row">
                                    <div class="col-sm-6 columnInfo">
                                        <ul>
                                            <li class="mt-4"><i class="fas fa-map-marker-alt mr-2"></i> ${res.address}</li>
                                            <li class="mt-4"><i class="fas fa-city mr-2"></i> ${res.city}</li>
                                            <li class="mt-4"><i class="fas fa-phone mr-2"></i> ${res.phone}</li>
                                        </ul>
                                    </div>
                                    <div class="col-sm-6 columnInfo">
                                        <ul>
                                            <li class="mt-4"><i class="fa fa-neuter mr-2"></i> ${res.gender}</li>
                                            <li class="mt-4"><i class="fas fa-envelope mr-2"></i> ${res.email}</li>
                                            <li class="mt-4"><i class="fas fa-user-alt mr-2"></i> ${res.status}</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        `;
                        break;
                    }
                }
            }
            
        }
       document.getElementById("viewCandidate").innerHTML = candidates;
}); 


    
}

