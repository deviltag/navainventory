$(document).ready(function(){

if(localStorage.api_url_server){
    document.getElementById("server").value = localStorage.api_url_server;
}else{
    document.getElementById("server").value = document.getElementById("apiserver_s").value;
}

if(localStorage.api_url_api1){
    document.getElementById("api1").value = localStorage.api_url_api1;
}else{
    document.getElementById("api1").value = document.getElementById("api1_s").value;
}

if(localStorage.api_url_api2){
    document.getElementById("api2").value = localStorage.api_url_api2;
}else{
    document.getElementById("api2").value = document.getElementById("api2_s").value;
}


if(localStorage.api_url_api1){
    document.getElementById("api3").value = localStorage.api_url_api3;
}else{
    document.getElementById("api3").value = document.getElementById("api3_s").value;
}



/*    if (window.XMLHttpRequest)
{// code for IE7+, Firefox, Chrome, Opera, Safari
    xmlhttp=new XMLHttpRequest();
}
else
{// code for IE6, IE5
    xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
}
xmlhttp.open("GET","test.txt",false);
xmlhttp.send();
xmlDoc=xmlhttp.responseText;
document.getElementById("server").value = xmlDoc;
*/
});

$( "#set" ).click(function() {
    localStorage.api_url_server = document.getElementById("server").value;
    localStorage.api_url_api1 = document.getElementById("api1").value;
    localStorage.api_url_api2 = document.getElementById("api2").value;
    localStorage.api_url_api3 = document.getElementById("api3").value;
    alert("บันทึกข้อมูลเรียบร้อยแล้ว")


});
