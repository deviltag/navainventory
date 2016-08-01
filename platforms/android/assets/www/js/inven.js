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
/*
function pluspr(){
	alert("บันทึกข้อมูลแล้ว!!");
  $.mobile.changePage('#pagepr');
}

  function additem(){
  alert("เพิ่มสินค้า!!");
  document.getElementById("noitems").value = "";
  $("#itemdetail").hide();
  $("#bt-scan").show();
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
*/
function select_warehouse(e){
alert(e.value);

  }
function scan_receive(){
  $("#receive2").show();
  $("#scan_cancel").show();
  $("#scan_btn").hide();
}
function cancel_scan(){
  document.getElementById("test_scanner").value = "";
  $("#receive2").hide();
  $("#scan_cancel").hide();
  $("#scan_btn").show();
}
function testtttt(){
localStorage.receivestatus = "0";
alert(localStorage.receivestatus)

}
function submit_scan(){
var d = new Date();
var curr_date = d.getDate();
var curr_month = d.getMonth();
var curr_year = d.getFullYear();
var date = curr_date + "/" + curr_month
+ "/" + curr_year;
if(localStorage.receivestatus=="0"){
alert(localStorage.receivestatus+" ยังไม่มีใบ")
$.ajax({
         url: localStorage.api_url_server+""+localStorage.api_url_insert,
         data: '{"accessToken":"","docDate":"'+date+'","poRefNo":"'+localStorage.porefno+'","isCompleteSave":"0","userID":"admin"}',
         //{"accessToken":"","docDate":"28/07/2016","poRefNo":"PO5806-0033","isCompleteSave":"0","userID":"admin"}
         contentType: "application/json; charset=utf-8",
         dataType: "json",
         type: "POST",
         cache: false,
         success: function(insert_res){
         console.log(insert_res);
         localStorage.receiveNumber = insert_res.docNo;
         $.ajax({
                  url: localStorage.api_url_server+""+localStorage.api_url_additem,
                  data: '{"accessToken":"","docNo":"'+insert_res.docNo+'","docDate":"'+date+'","poRefNo":"'+localStorage.porefno+'","barCode":"'+localStorage.barCode_rv+'","qty":"'+document.getElementById("amount_scanner").value+'","userID":"admin"}',
                         //{"accessToken":"","docNo":"testnava","docDate":"28/07/2016","poRefNo":"PO5806-0033","barCode":"1000040","qty":"10","userID":"admin"}
                  contentType: "application/json; charset=utf-8",
                  dataType: "json",
                  type: "POST",
                  cache: false,
                  success: function(additem_res){
                  console.log(additem_res);
                  alert("บันทึกข้อมูลเรียบร้อยแล้ว !!");
                  document.getElementById("amount_scanner").value = "";
                  document.getElementById("product_show").innerHTML = "";
                  search_rc_no();
                  $.mobile.changePage("#receive_item");

                  },
                  error: function (error){
                  alert(error);
                  }
                  });

         },
         error: function (error){
         alert(error);
         }
         });


        //alert('"accessToken":"","Docdate":"'+date+'","apCode":"'+localStorage.apcode+'","PoRefNo":"'+localStorage.porefno+'","userID":"admin"')
        localStorage.receivestatus = "1";

        }else{
        alert(localStorage.receivestatus+" มีใบแล้ว")

        $.ajax({
                          url: localStorage.api_url_server+""+localStorage.api_url_additem,
                          data: '{"accessToken":"","docNo":"'+localStorage.receiveNumber+'","docDate":"'+date+'","poRefNo":"'+localStorage.porefno+'","barCode":"'+localStorage.barCode_rv+'","qty":"'+document.getElementById("amount_scanner").value+'","userID":"admin"}',
                                 //{"accessToken":"","docNo":"testnava","docDate":"28/07/2016","poRefNo":"PO5806-0033","barCode":"1000040","qty":"10","userID":"admin"}
                          contentType: "application/json; charset=utf-8",
                          dataType: "json",
                          type: "POST",
                          cache: false,
                          success: function(additem_res){
                          console.log(additem_res);
                          alert("บันทึกข้อมูลเรียบร้อยแล้ว !!");
                          document.getElementById("amount_scanner").value = "";
                          document.getElementById("product_show").innerHTML = "";
                          search_rc_no();
                          $.mobile.changePage("#receive_item");

                          },
                          error: function (error){
                          alert(error);
                          }
                          });


}

//alert('{"accessToken":"","docNo":"","docDate":"'+date+'","apCode":"'+localStorage.apcode+'","poRefNo":"'+localStorage.porefno+'","barCode":"'+localStorage.barCode_rv+'""itemCode":"'+localStorage.itemCode_rv+'","itemName":"'+localStorage.itemName_rv+'","qty":"'+document.getElementById("amount_scanner").value+'","unitCode":"'+localStorage.unitCode_rv+'","lineNumber":"0","userID":"admin"}')
}

function submit_receive(){
var d = new Date();
var curr_date = d.getDate();
var curr_month = d.getMonth();
var curr_year = d.getFullYear();
var date = curr_date + "/" + curr_month
+ "/" + curr_year;
            $.ajax({
                     url: localStorage.api_url_server+""+localStorage.api_url_insert,
                     data: '{"accessToken":"","docDate":"'+date+'","poRefNo":"'+localStorage.porefno+'","isCompleteSave":"1","userID":"admin"}',
                     //{"accessToken":"","docDate":"28/07/2016","poRefNo":"PO5806-0033","isCompleteSave":"0","userID":"admin"}
                     contentType: "application/json; charset=utf-8",
                     dataType: "json",
                     type: "POST",
                     cache: false,
                     success: function(receive_success){
                     console.log(receive_success);
                     alert("บันทึกใบรับเข้าเรียบร้อยแล้ว");
                     },
                     error: function (error){
                     alert(error);
                     }
                     });

            localStorage.receivestatus = "0";
            //alert(localStorage.receivestatus+" save complete!!")
            search_rc_no();

}
/*function test(){
 window.addEventListener("native.onscanbarcode",function(t){
        document.getElementById("test_scanner").value=t.scanResult;
        })
return false;
}​*/
/*
$(document).on("pageshow", function (e, data) {
 var page = $(this)[0].activeElement.id;
//alert(page);
window.addEventListener("native.onscanbarcode",function(s){

           if(page=="receive_scan"){
           document.getElementById("test_scanner").value=s.scanResult;
           $("#receive2").show();
           $("#scan_cancel").show();
           $("#scan_btn").hide();
           }else{
           document.getElementById("test_scanner").value="";
           $("#receive2").hide();
           $("#scan_cancel").hide();
           $("#scan_btn").show();
           }
           if(page=="transferup_item"){
           document.getElementById("product_scan_up").value=s.scanResult;
           }else{
           document.getElementById("product_scan_up").value="";
           }


            })

});*/
window.addEventListener('native.onscanbarcode', function (e) {
       //alert(e.scanResult);
       var page = "";
       if(page == ""){
         page = $.mobile.activePage.attr('id');
       }
       $(document).on("pageshow", function (e, data) {
          page = $(this)[0].activeElement.id;
       });
       //alert(page);
                			//document.getElementById("noitems").value = e.scanResult;
       switch(page){
              case "pageone" :

                           $.mobile.changePage("#pagetwo");

                		   break;
              case "receive" :
                          select_op_vender(e.scanResult);
                           break;
             case "receive_scan" :
                           var result_scanner = "";
                           $.ajax({
                                                                  url: localStorage.api_url_server+""+localStorage.api_url_serchitem,
                                                                  data: '{"accessToken":"","docNo":"","barCode":"'+e.scanResult+'"}',
                                                                  contentType: "application/json; charset=utf-8",
                                                                  dataType: "json",
                                                                  type: "POST",
                                                                  cache: false,
                                                                  success: function(item){

                                                                  console.log(item);
                                                                  if(item.barCode== null){
                                                                  alert("Barcode ไม่ถูกต้อง !!")
                                                                  }else{
                                                                  //console.log(item.itemName);
                                                                  console.log(JSON.stringify(item));
                                                                  result_scanner +="<p>รหัสสินค้า : "+e.scanResult+"</p>";
                                                                  result_scanner +="<p>ชื่อสินค้า : "+item.itemName+"</p>";
                                                                  result_scanner +="<p>หน่วยสินค้า : "+item.unitCode+"</p>";

                                                                  localStorage.itemCode_rv = item.itemCode
                                                                  localStorage.barCode_rv = item.barCode
                                                                  localStorage.itemName_rv = item.itemName
                                                                  localStorage.unitCode_rv = item.unitCode

                                                                  //if(item.qtyRC==0){
                                                                  //document.getElementById("amount_scanner").value = "";
                                                                  //}else{document.getElementById("amount_scanner").value = item.qtyRC;}
                                                                  document.getElementById("product_show").innerHTML = result_scanner;
                                                                  }
                                                                  },
                                                                  error: function (error){
                                                                  alert(error);
                                                                  }
                                                                  });
                           break;
             case "receive_item" :
                           var result_scanner = "";
                           $.ajax({
                                       url: localStorage.api_url_server+""+localStorage.api_url_serchitem,
                                       data: '{"accessToken":"","docNo":"","barCode":"'+e.scanResult+'"}',
                                       contentType: "application/json; charset=utf-8",
                                       dataType: "json",
                                       type: "POST",
                                       cache: false,
                                       success: function(item){

                                       console.log(item);
                                       if(item.barCode== null){
                                       alert("Barcode ไม่ถูกต้อง !!")
                                       }else{
                                       //console.log(item.itemName);
                                       //console.log(JSON.stringify(item));
                                       result_scanner +="<p>รหัสสินค้า : "+e.scanResult+"</p>";
                                       result_scanner +="<p>ชื่อสินค้า : "+item.itemName+"</p>";
                                       result_scanner +="<p>หน่วยสินค้า : "+item.unitCode+"</p>";

                                       localStorage.itemCode_rv = item.itemCode
                                       localStorage.barCode_rv = item.barCode
                                       localStorage.itemName_rv = item.itemName
                                       localStorage.unitCode_rv = item.unitCode

                                       if(item.qtyRC==0){
                                       document.getElementById("amount_scanner").value = "";
                                       }else{document.getElementById("amount_scanner").value = item.qtyRC;}
                                       document.getElementById("product_show").innerHTML = result_scanner;
                                       $.mobile.changePage("#receive_scan")}
                                       },
                                       error: function (error){
                                       alert(error);
                                       }
                                       });
                           /*
                           result_scanner +="<p>"+e.scanResult+"</p>";
                           result_scanner +="<p>test</p>";
                           result_scanner +="<p>หน่วย</p>";
                           document.getElementById("amount_scanner").value=10;
                           document.getElementById("product_show").innerHTML = result_scanner;
                           $("#receive2").show();
                           $("#scan_cancel").show();
                           $("#scan_btn").hide();
                           $.mobile.changePage("#receive_scan")*/
                           break;
             case "transferup_item" :
                           document.getElementById("product_scan_up").value=e.scanResult;
                           break;
                			}






});