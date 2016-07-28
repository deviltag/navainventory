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
function submit_scan(){
var d = new Date();
var curr_date = d.getDate();
var curr_month = d.getMonth();
var curr_year = d.getFullYear();
var date = curr_date + "/" + curr_month
+ "/" + curr_year;
if(localStorage.receivestatus=="0"){
$.ajax({
         url: "http://qserver.nopadol.com:8080/NPReceiveWs/rc/insert",
         data: '{"accessToken":"","docDate":"'+date+'","apCode":"'+localStorage.apcode+'","poRefNo":"'+localStorage.porefno+'","userID":"admin"}',
         contentType: "application/json; charset=utf-8",
         dataType: "json",
         type: "POST",
         cache: false,
         success: function(insert_res){
         console.log(insert_res);
         $.ajax({
                  url: "http://qserver.nopadol.com:8080/NPReceiveWs/rc/additem",
                  data: '{"accessToken":"","docNo":"'+insert_res.docNo+'","docDate":"'+date+'","apCode":"'+localStorage.apcode+'","poRefNo":"'+localStorage.porefno+'","barCode":"'+localStorage.barCode_rv+'","itemCode":"'+localStorage.itemCode_rv+'","itemName":"'+localStorage.itemName_rv+'","qty":"'+document.getElementById("amount_scanner").value+'","unitCode":"'+localStorage.unitCode_rv+'","lineNumber":"0","userID":"admin"}',
                         //{"accessToken":"","docNo":"testnava","docDate":"28/07/2016","apCode":"AP-0007","poRefNo":"PO5806-0033","barCode":"1000040","itemCode":"z4","itemName":"เครื่องรับธนบัตร","qty":"10","unitCode":"เครื่อง","lineNumber":"0","userID":"admin"}
                  contentType: "application/json; charset=utf-8",
                  dataType: "json",
                  type: "POST",
                  cache: false,
                  success: function(additem_res){
                  console.log(additem_res);
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
//localStorage.receivestatus = "1";
//alert(localStorage.receivestatus)
}else{

}

//alert('{"accessToken":"","docNo":"","docDate":"'+date+'","apCode":"'+localStorage.apcode+'","poRefNo":"'+localStorage.porefno+'","barCode":"'+localStorage.barCode_rv+'""itemCode":"'+localStorage.itemCode_rv+'","itemName":"'+localStorage.itemName_rv+'","qty":"'+document.getElementById("amount_scanner").value+'","unitCode":"'+localStorage.unitCode_rv+'","lineNumber":"0","userID":"admin"}')
}

function submit_receive(){
localStorage.receivestatus = "0";
alert(localStorage.receivestatus)

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
                          //alert(e.scanResult)
                         /* $.ajax({
                          url: "http://qserver.nopadol.com:8080/NPReceiveWs/po/podetails",
                          data: '{"accessToken":"","search":"'+e.scanResult+'"}',
                          contentType: "application/json; charset=utf-8",
                          dataType: "json",
                          type: "POST",
                          cache: false,
                          success: function(po_detail){
                          //console.log(JSON.stringify(po_detail));
                          var po_d = JSON.stringify(po_detail);
                          var po_ds = po_d.split(":[");
                          var str = po_ds[1].split("]}");
                          po_d = "["+str[0]+"]";
                          var js = jQuery.parseJSON(po_d);
                          console.log(JSON.stringify(js));
                          //document.getElementById("PO").innerHTML = JSON.stringify(js);
                          var count = js.length;
                          var po_de_head = "";                         //console.log(count);
                          var po_de = "";
                          po_de_head += "<h2 class='sub_title'>เลขที่ PO :"+po_detail.docNo+"</h2>";
                          po_de_head += "<p> วันที่ออกเอกสาร :"+po_detail.docDate+"</p>";
                          po_de_head += "<p>รหัสเจ้าหนี้ :"+po_detail.apCode+"</p>";
                          po_de_head += "<p>ชื่อเจ้าหนี้ :"+po_detail.apName+"</p>";
                          po_de_head += "<p>ราคารวม :"+po_detail.sumOfItemAmount.toLocaleString()+" บาท</p>";
                          po_de_head += "<p>ราคารวมภาษี :"+po_detail.totalAmount.toLocaleString()+" บาท</p>";
                          po_de += '<label><div class="ui-grid-c" style="text-align:center;  font-size:14px;">';
                          po_de += '<div class="ui-block-a"><b>สินค้า</b></div>';
                          po_de += '<div class="ui-block-b"><b>จำนวน</b></div>';
                          po_de += '<div class="ui-block-c"><b>ราคา/หน่วย</b></div>';
                          po_de += '<div class="ui-block-d"><b>รวม</b></div></div></label><hr>';
                            for(var i = 0;i<js.length;i++){
                                console.log(js[i].code);
                                po_de += '<div class="ui-grid-c" style="text-align:center; font-size:12px;">'
                                po_de += '<div class="ui-block-a">'+js[i].itemName+'</div>';
                                po_de += '<div class="ui-block-b">'+js[i].qty+' '+js[i].unitCode+'</div>';
                                po_de += '<div class="ui-block-c">'+js[i].price.toLocaleString()+' บาท</div>';
                                po_de += '<div class="ui-block-d">'+js[i].amount.toLocaleString()+' บาท</div></div><hr>';
                                 }
                            po_de += '</table>';
                            document.getElementById("po_head").innerHTML = po_de_head;
                            document.getElementById("po_detail").innerHTML = po_de;
                            $.mobile.changePage("#receive_item");
                          },
                          error: function (error){
                          alert(error);
                          }
                          });
                          alert("scan : "+e.scanResult)
                          $.mobile.changePage("#receive_item");

                          paramiter insert receive
                          DocNo varchar(25),
                          DocDate varchar(25),
                          ApCode as varchar(25),
                          PORefNo as varchar(25),
                          UserID varchar(25)

                          */
                           break;
             case "receive_scan" :
                           document.getElementById("test_scanner").value=e.scanResult;
                           $("#receive2").show();
                           $("#scan_cancel").show();
                           $("#scan_btn").hide();
                           break;
             case "receive_item" :
             var result_scanner = "";
             $.ajax({
                                       url: "http://qserver.nopadol.com:8080/NPReceiveWs/rc/item",
                                       data: '{"accessToken":"","docNo":"","barCode":"'+e.scanResult+'"}',
                                       contentType: "application/json; charset=utf-8",
                                       dataType: "json",
                                       type: "POST",
                                       cache: false,
                                       success: function(item){

                                       console.log(item);
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
                                       $.mobile.changePage("#receive_scan")
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