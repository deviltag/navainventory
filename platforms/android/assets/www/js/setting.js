$(document).ready(function(){

if(localStorage.api_url_server){
    document.getElementById("server").value = localStorage.api_url_server;
}else{
    document.getElementById("server").value = document.getElementById("apiserver_s").value;
}

if(localStorage.api_url_server_nava){
    document.getElementById("server_nava").value = localStorage.api_url_server_nava;
}else{
    document.getElementById("server_nava").value = document.getElementById("apiserver_nava_s").value;
}

if(localStorage.api_url_login){
    document.getElementById("apilogin").value = localStorage.api_url_login;
}else{
    document.getElementById("apilogin").value = document.getElementById("apilogin_s").value;
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

 if(localStorage.api_url_prlist){
      document.getElementById("api8").value = localStorage.api_url_prlist;
 }else{
      document.getElementById("api8").value = document.getElementById("api8_s").value;
 }

 if(localStorage.api_url_prdetail){
       document.getElementById("api9").value = localStorage.api_url_prdetail;
 }else{
       document.getElementById("api9").value = document.getElementById("api9_s").value;
 }

 if(localStorage.api_url_insertpr){
        document.getElementById("api10").value = localStorage.api_url_insertpr;
 }else{
        document.getElementById("api10").value = document.getElementById("api10_s").value;
 }

 if(localStorage.api_url_gendocno){
         document.getElementById("api11").value = localStorage.api_url_gendocno;
 }else{
         document.getElementById("api11").value = document.getElementById("api11_s").value;
 }

 if(localStorage.api_url_search_item_pr){
          document.getElementById("api12").value = localStorage.api_url_search_item_pr;
  }else{
          document.getElementById("api12").value = document.getElementById("api12_s").value;
  }


});

$( "#set" ).click(function() {
    localStorage.api_url_server = document.getElementById("server").value;
    localStorage.api_url_server_nava = document.getElementById("server_nava").value;
    localStorage.api_url_login = document.getElementById("apilogin").value;
    localStorage.api_url_vender = document.getElementById("api1").value;
    localStorage.api_url_poList = document.getElementById("api2").value;
    localStorage.api_url_poDetail = document.getElementById("api3").value;
    localStorage.api_url_insert = document.getElementById("api4").value;
    localStorage.api_url_additem = document.getElementById("api5").value;
    localStorage.api_url_serchitem = document.getElementById("api6").value;
    localStorage.api_url_search = document.getElementById("api7").value;
    localStorage.api_url_prlist = document.getElementById("api8").value;
    localStorage.api_url_prdetail = document.getElementById("api9").value;
    localStorage.api_url_insertpr = document.getElementById("api10").value;
    localStorage.api_url_gendocno = document.getElementById("api11").value;
    localStorage.api_url_search_item_pr = document.getElementById("api12").value;
    alert("บันทึกข้อมูลเรียบร้อยแล้ว")


});
