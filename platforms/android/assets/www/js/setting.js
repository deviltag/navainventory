$(document).ready(function(){

if(localStorage.api_url_server){
    document.getElementById("server").value = localStorage.api_url_server;
}else{
    document.getElementById("server").value = document.getElementById("apiserver_s").value;
}

if(localStorage.api_url_vender){
     document.getElementById("api1").value = localStorage.api_url_vender;
 }else{
     document.getElementById("api1").value = document.getElementById("api1_s").value;
 }

 if(localStorage.api_url_poList){
     document.getElementById("api2").value = localStorage.api_url_poList;
 }else{
     document.getElementById("api2").value = document.getElementById("api2_s").value;
 }

 if(localStorage.api_url_poDetail){
     document.getElementById("api3").value = localStorage.api_url_poDetail;
 }else{
     document.getElementById("api3").value = document.getElementById("api3_s").value;
 }

 if(localStorage.api_url_insert){
     document.getElementById("api4").value = localStorage.api_url_insert;
 }else{
     document.getElementById("api4").value = document.getElementById("api4_s").value;
 }

 if(localStorage.api_url_additem){
     document.getElementById("api5").value = localStorage.api_url_additem;
 }else{
     document.getElementById("api5").value = document.getElementById("api5_s").value;
 }

 if(localStorage.api_url_serchitem){
     document.getElementById("api6").value = localStorage.api_url_serchitem;
 }else{
     document.getElementById("api6").value = document.getElementById("api6_s").value;
 }

 if(localStorage.api_url_search){
     document.getElementById("api7").value = localStorage.api_url_search;
 }else{
     document.getElementById("api7").value = document.getElementById("api7_s").value;
 }

});

$( "#set" ).click(function() {
    localStorage.api_url_server = document.getElementById("server").value;
    localStorage.api_url_vender = document.getElementById("api1").value;
    localStorage.api_url_poList = document.getElementById("api2").value;
    localStorage.api_url_poDetail = document.getElementById("api3").value;
    localStorage.api_url_insert = document.getElementById("api4").value;
    localStorage.api_url_additem = document.getElementById("api5").value;
    localStorage.api_url_serchitem = document.getElementById("api6").value;
    localStorage.api_url_search = document.getElementById("api7").value;
    /*localStorage.api_url_8 = document.getElementById("api8").value;
    localStorage.api_url_9 = document.getElementById("api9").value;
    localStorage.api_url_10 = document.getElementById("api10").value;
    localStorage.api_url_11 = document.getElementById("api11").value;
    localStorage.api_url_12 = document.getElementById("api12").value;*/
    alert("บันทึกข้อมูลเรียบร้อยแล้ว")


});
