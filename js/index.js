function cnklogin(){
if(document.forms["login"]["username"].value== "" || document.forms["login"]["username"].value == null){
  alert("กรุณากรอกข้อมูล Username !!");
  document.forms["login"]["username"].focus();
  return false;
  }
  else if(document.forms["login"]["passwd"].value == "" || document.forms["login"]["passwd"].value == null){
  alert("กรุณากรอกข้อมูล Password !!");
  document.forms["login"]["passwd"].focus();
  return false;
  }else{
  if(document.forms["login"]["username"].value == "admin" && document.forms["login"]["passwd"].value == "1234"){
  alert("test");
   $.mobile.changePage( "#pagetwo", {
  type: "post",
  //data: $( "form#search" ).serialize(),
  //changeHash: false
});

  //$.mobile.changePage("#pagetwo")
  //$.mobile.loadPage("#pagetwo");
  // window.location = "test.html"; 
  //navigator.app.loadUrl("#pagetwo")
  //window.location.href("index.html/#pagetwo");
  //window.open("#pagetwo");
  //$.mobile.changePage("#pagetwo", {transition:"slide"});
  //$("#pagetwo").show();
  return false;
  /* $.ajax({
                url: "http://qserver.nopadol.com:8080/ReOrderWS/reorder/login",
                data: '{"userID":"'+login.username.value+'","pwd":"'+login.pwd.value+'"}',
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                type: "POST",
                cache: false,
               success: function(result){ 
                //console.log(result);
                //var obj = JSON.stringify(result);
                localStorage.userID = result.userID;
                localStorage.userName = result.userName;
                localStorage.levelID = result.levelID;
                localStorage.expertTeam = result.expertTeam;
                localStorage.lastname = result.lastname;
                localStorage.status = "0";
                document.getElementById('user').innerHTML = "ยินดีต้อนรับ "+localStorage.userID+" เขาสู่ระบบ";
                document.getElementById('eptype').innerHTML = localStorage.expertTeam;*/
  }else{
  alert("Error Password or Username");
  return false;
  }
  }
  
  
}

function login(){
if(document.forms["login"]["username"].value == "admin" && document.forms["login"]["passwd"].value == "1234"){
    alert("test");
    return false;
  }else{
  alert("Error Password or Username");
  return false;
}

}

function pluspr(){
	alert("บันทึกข้อมูลแล้ว!!");
  $.mobile.changePage('#pagepr');
}
function additem(){
  alert("จัดเก็บข้อมูลแล้ว!!");
$.mobile.changePage('#additem');
}
function scanadditem(){
  alert("M150");
  document.getElementById("noitems").value = "0001";
  document.getElementById("nameitems").value = "M150";
  document.getElementById("gradeitem").value = "A";
  document.getElementById("units").value = "ขวด";
  $("#itemdetail").show();
  $("#bt-scan").hide();
 $.mobile.changePage("#additem");
}

function select_wh(warehouse){
  alert("เลือกคลังสินค้าเสร็จแล้ว");
  var title = "รายการสินค้าที่นับแล้วในคลัง "+warehouse.value+" ในวันนี้";
  document.getElementById("titlecs").innerHTML = title;
  $.mobile.changePage("#countstock");
}

function scanshelves(){
  alert("ชั้นเก็บที่ A1");
  document.getElementById("shel").value = "A1";
  $("#shelves1").hide();
  $("#shelves2").show();
  $("#item1").show();
  $.mobile.changePage("#countitem");
}

function scanitem(){
  alert("สินค้าชื่อ M150");
  document.getElementById("items").value = "M150";
  document.getElementById("units").value = "ขวด";
  $("#item1").hide();
  $("#item2").show();
  $("#count").show();
  $("#unit").show();
  $.mobile.changePage("#countitem");
}

function saveitem(){
  alert("บันทึกรายการสินค้าที่ตรวจนับ");
  $("#shelves2").hide();
  $("#shelves1").show();
  $("#item1").hide();
  $("#item2").hide();
  $("#count").hide();
  $("#unit").hide();
  $.mobile.changePage("#countstock");
}
function select_warehouse(e){
alert(e.value);

  }