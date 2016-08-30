$(document).ready(function(){

if(localStorage.transferstatus == null ||localStorage.transferstatus == "" ){
localStorage.transferstatus = "0";
}
});

window.addEventListener('native.onscanbarcode', function (t) {
       //alert(e.scanResult);
       var page = "";
       if(page == ""){
         page = $.mobile.activePage.attr('id');
       }
       $(document).on("pageshow", function (t, data) {
          page = $(this)[0].activeElement.id;
       });
       //alert(page);
                			//document.getElementById("noitems").value = e.scanResult;
       switch(page){
            case "transferup_item" :
                         get_item_transfer("up",t.scanResult);
                         break;
            case "transferdown_item" :
                         get_item_transfer("down",t.scanResult);
                         break;
            case "transfer_normal_from" :
                          search_wh("from",t.scanResult);
                          break;
            case "transfer_normal_to" :
                          search_wh("to",t.scanResult);
                          break;


       }






});
/*function search_wh(type,wh_code){
$.ajax({
                          url: localStorage.api_url_server+"NPReceiveWs/trn/searchwarehouse",
                          data: '{"accessToken":"","search":"'+wh_code+'"}',
                          contentType: "application/json; charset=utf-8",
                          dataType: "json",
                          type: "POST",
                          cache: false,
                          success: function(wh){
                          console.log(wh);
                          //"whCode": "A01","whName": "A01 ","location": "บริษัท เบทาโกร(ลำพูน)"
                          var wh_l = JSON.stringify(wh);
                          var wh_ls = wh_l.split(":[");
                          var strwh = wh_ls[1].split("]}");
                          wh_l = "["+strwh[0]+"]";
                          var whl = jQuery.parseJSON(wh_l);
                          console.log(JSON.stringify(whl));
                          var count = whl.length;
                          var wh_list= "";
                          var wh_code_n= "";
                          for(var i = 0;i<count;i++){
                            wh_list += "<p>รหัสคลัง : "+whl[i].whCode+"</p><br>";
                            wh_list += "<p>ชื่อคลัง : "+whl[i].whName+"</p><br>";
                            wh_list += "<p>สถานที่ : "+whl[i].location+"</p><br>";
                            wh_code_n = whl[i].whCode;
                          }
                          if(type=="from"){
                          document.getElementById("transfer_nor_from").innerHTML = wh_list;
                          localStorage.transfer_nor_from = wh_code_n;
                          alert(localStorage.transfer_nor_from);
                          }else if(type=="to"){
                          localStorage.transfer_nor_to = wh_code_n;
                          alert(localStorage.transfer_nor_to)
                          document.getElementById("transfer_nor_to").innerHTML = wh_list;
                          }


                          },
                          error: function (error){
                          alertify.error(error);
                          }
                          });
}*/

var d = new Date();
var curr_date = d.getDate();
var curr_month = d.getMonth()+1;
var curr_year = d.getFullYear();
var date = curr_date + "/" + curr_month
+ "/" + curr_year;

function openwh(){

wh_type_store();



}

function wh_type_store(){

$.ajax({
                          url: localStorage.api_url_server+"NPReceiveWs/trn/searchwarehouse",
                          data: '{"accessToken":"","type":"1","search":""}',
                          contentType: "application/json; charset=utf-8",
                          dataType: "json",
                          type: "POST",
                          cache: false,
                          success: function(store){
                          console.log("STORE "+JSON.stringify(store));
                          var counts = store.data.length;

                          var store_list_up= "<select id='whstore_up' class='whselect'>";
                          var store_list_down= "<select id='whstore_down' class='whselect'>";
                          for(var i = 0;i<counts;i++){
                          store_list_up += "<option value='"+store.data[i].code+"'>"+store.data[i].code+" "+store.data[i].name+"</option>";
                          store_list_down += "<option value='"+store.data[i].code+"'>"+store.data[i].code+" "+store.data[i].name+"</option>";

                          }
                          store_list_up += "</select>";
                          store_list_down += "</select>";
                          document.getElementById("whtypestoreup").innerHTML = store_list_up;
                          document.getElementById("whtypestoredown").innerHTML = store_list_down;
                          wh_type_van();
                          },
                          error: function (error){
                          alertify.error(error);
                          }
                          });
                          return false;
}

function wh_type_van(){
$.ajax({
                          url: localStorage.api_url_server+"NPReceiveWs/trn/searchwarehouse",
                          data: '{"accessToken":"","type":"2","search":""}',
                          contentType: "application/json; charset=utf-8",
                          dataType: "json",
                          type: "POST",
                          cache: false,
                          success: function(van){
                          console.log("VAN "+JSON.stringify(van));
                          var countv = van.data.length;

                          var van_list_up= "<select id='whvan_up' class='whselect'>";
                          var van_list_down= "<select id='whvan_down' class='whselect'>";
                          for(var i = 0;i<countv;i++){
                          van_list_up += "<option value='"+van.data[i].code+"'>"+van.data[i].code+" "+van.data[i].location+"</option>";
                          van_list_down += "<option value='"+van.data[i].code+"'>"+van.data[i].code+" "+van.data[i].location+"</option>";

                          }
                          van_list_up += "</select>";
                          van_list_down += "</select>";
                          document.getElementById("whtypevanup").innerHTML = van_list_up;
                          document.getElementById("whtypevandown").innerHTML = van_list_down;
                            //$popUp1.popup("close");
                          },
                          error: function (error){
                          alertify.error(error);
                          }
                          });
                          return false;
}


function wh_type_machine(){
$.ajax({
                          url: localStorage.api_url_server+"NPReceiveWs/trn/searchwarehouse",
                          data: '{"accessToken":"","type":"3","search":""}',
                          contentType: "application/json; charset=utf-8",
                          dataType: "json",
                          type: "POST",
                          cache: false,
                          success: function(machine){
                          console.log("Mac "+JSON.stringify(machine));

                          var countv = machine.data.length;

                          var machine_list= "<select id='whmachine' class='whselect'>";
                          for(var i = 0;i<countv;i++){
                          machine_list += "<option value='"+machine.data[i].code+"'>"+machine.data[i].code+" "+machine.data[i].location+"</option>";

                          }
                          machine_list += "</select>";
                          document.getElementsByClassName("whtypemachine").innerHTML = machine_list;
                          },
                          error: function (error){
                          alertify.error(error);
                          }
                          });
                          return false;
}


function get_item_transfer(wh,bar){
if(wh=="up"){
whcode = localStorage.transferup_from;
}else if(wh=="down"){
whcode = localStorage.transferdown_from;
}
$.ajax({
                          url: localStorage.api_url_server+"NPReceiveWs/trn/searchitemstock",
                          data: '{"accessToken":"","type":"1","whCode":"'+whcode+'","shelf":"-","search":"'+bar+'"}',
                          contentType: "application/json; charset=utf-8",
                          dataType: "json",
                          type: "POST",
                          cache: false,
                          success: function(item_t){
                          console.log(item_t);
                          //"whCode": "A01","whName": "A01 ","location": "บริษัท เบทาโกร(ลำพูน)"
                          /*var item_t_l = JSON.stringify(item_t);
                          var item_t_ls = item_t_l.split(":[");
                          var stritem_t = item_t_ls[1].split("]}");
                          item_t_l = "["+stritem_t[0]+"]";
                          var item_tl = jQuery.parseJSON(item_t_l);
                          console.log(JSON.stringify(item_tl));*/

                          var item_t_list="";
                          var stock_item =0;
                            item_t_list += "<p>ชื่อสินค้า : "+item_t.data[0].itemName+"</p>";
                            item_t_list += "<p>หน่วยนับ : "+item_t.data[0].unitCode+"</p>";
                            item_t_list += "<p>จำนวนคงเหลือ : "+item_t.data[0].stkRemain+"</p>";
                            stock_item = item_t.data[0].stkRemain;
                            localStorage.transferBarcode =item_t.data[0].barCode;
                            localStorage.transferItemcode =item_t.data[0].itemCode;

                          document.getElementById("stock_show_up").value = stock_item;
                          document.getElementById("stock_show_down").value = stock_item;
                          document.getElementById("item_show_up").innerHTML = item_t_list;
                          document.getElementById("item_show_down").innerHTML = item_t_list;
                          if($.mobile.activePage.is('#transferup_item')){
                          $('#amount_up_item').focus();
                          }else if($.mobile.activePage.is('#transferdown_item')){
                          $('#amount_down_item').focus();
                          }

                          },
                          error: function (error){
                          alertify.error("error");
                          }
                          });
}
function tranfer_up_select(){
document.getElementById("item_show_up").innerHTML = "";
document.getElementById("item_show_down").innerHTML = "";

var s_up = document.getElementById("whstore_up");
var strstore_up = s_up.options[s_up.selectedIndex].value;
localStorage.transferup_from = strstore_up;
var v_up = document.getElementById("whvan_up");
var strvan_up = v_up.options[v_up.selectedIndex].value;
localStorage.transferup_to = strvan_up;
var r = confirm("ต้องการโอนสินค้าจากคลัง "+localStorage.transferup_from+" ไปยัง "+localStorage.transferup_to+" ใช่หรือไม่ !!");
            if (r == true) {
               $.mobile.changePage("#transferup_item",{transition: 'slidefade'});
            } else {
                return false;
            }
}
//========================================================================== โอนขึ้นรถ ============================================================================
function submit_transferup(){
var amountup = document.getElementById("amount_up_item").value;
var stockup = document.getElementById("stock_show_up").value;
if(amountup==""||amountup==null){
alertify.error("กรุณากรอกจำนวนที่ต้องการ");
  $('#amount_up_item').focus();
}else if(parseInt(amountup) > parseInt(stockup)){
alertify.error("กรุณากรอกจำนวนที่ถูกต้อง !!");
return false;
}else{
if(localStorage.transferstatus=="0"){
$.ajax({
                          url: localStorage.api_url_server+"NPReceiveWs/trn/insert",
                          data: '{"accessToken":"","docNo":"","docDate":"'+date+'","isCompleteSave":"0","creatorCode":"'+localStorage.username+'","refNo":""}',
                          contentType: "application/json; charset=utf-8",
                          dataType: "json",
                          type: "POST",
                          cache: false,
                          success: function(trf_h){
                          console.log(trf_h);
                          localStorage.transferNo = trf_h.docNo;

                          $.ajax({
                                                    url: localStorage.api_url_server+"NPReceiveWs/trn/manageitem",
                                                    data: '{"accessToken":"","docNo":"'+localStorage.transferNo+'","barCode":"'+localStorage.transferBarcode+'","itemCode":"'+localStorage.transferItemcode+'","docDate":"'+date+'","fromWHCode":"'+localStorage.transferup_from+'","fromShelfCode":"","toWHCode":"'+localStorage.transferup_to+'","toShelfCode":"","qty":"'+document.getElementById("amount_up_item").value+'","refNo":""}',
                                                    contentType: "application/json; charset=utf-8",
                                                    dataType: "json",
                                                    type: "POST",
                                                    cache: false,
                                                    success: function(trf_i){
                                                    console.log(trf_i);
                                                    alert("บันทึกข้อมูลเรียบร้อยแล้ว"+localStorage.transferNo);
                                                    localStorage.transferstatus="1";
                                                    $.mobile.changePage("#transferup",{transition: 'slidefade'});


                                                    },
                                                    error: function (error){
                                                    alertify.error("error");
                                                    }
                                                    });
                          },
                          error: function (error){
                          alertify.error("error");
                          }
                          });
}else{
 $.ajax({
                          url: localStorage.api_url_server+"NPReceiveWs/trn/manageitem",
                          data: '{"accessToken":"","docNo":"'+localStorage.transferNo+'","barCode":"'+localStorage.transferBarcode+'","itemCode":"'+localStorage.transferItemcode+'","docDate":"'+date+'","fromWHCode":"'+localStorage.transferup_from+'","fromShelfCode":"","toWHCode":"'+localStorage.transferup_to+'","toShelfCode":"","qty":"'+document.getElementById("amount_up_item").value+'","refNo":""}',
                          contentType: "application/json; charset=utf-8",
                          dataType: "json",
                          type: "POST",
                          cache: false,
                          success: function(trf_i){
                          console.log(trf_i);
                          alert("บันทึกข้อมูลเรียบร้อยแล้ว"+localStorage.transferNo);
                          $.mobile.changePage("#transferup",{transition: 'slidefade'});

                          },
                          error: function (error){
                          alertify.error("error");
                          }
                          });

}
}
}
function save_up(){
if( localStorage.transferstatus=="1"){
$.ajax({
                          url: localStorage.api_url_server+"NPReceiveWs/trn/insert",
                          data: '{"accessToken":"","docNo":"'+localStorage.transferNo+'","docDate":"'+date+'","isCompleteSave":"1","creatorCode":"'+localStorage.username+'","refNo":""}',
                          contentType: "application/json; charset=utf-8",
                          dataType: "json",
                          type: "POST",
                          cache: false,
                          success: function(trf_h){
                          console.log(trf_h);
                          localStorage.transferNo = "";
                          localStorage.transferstatus = "0";
                          alertify.success("บันทึกใบรับเข้าเรียบร้อยแล้ว");
                          },
                          error: function (error){
                          alertify.error("error");
                          }
                          });
}else{
alertify.error("ยังไม่มีการทำใบรับสินค้า");
}
}
//========================================================================== โอนลงรถ ============================================================================

function tranfer_down_select(){
document.getElementById("item_show_up").innerHTML = "";
document.getElementById("item_show_down").innerHTML = "";

var v_down = document.getElementById("whvan_down");
var strvan_down = v_down.options[v_down.selectedIndex].value;
localStorage.transferdown_from = strvan_down;

var s_down = document.getElementById("whstore_down");
var strstore_down = s_down.options[s_down.selectedIndex].value;
localStorage.transferdown_to = strstore_down;
var d = confirm("ต้องการโอนสินค้าจากคลัง "+localStorage.transferdown_from+" ไปยัง "+localStorage.transferdown_to+" ใช่หรือไม่ !!");
            if (d == true) {
               $.mobile.changePage("#transferdown_item",{transition: 'slidefade'});
            } else {
                return false;
            }
}

function submit_transferdown(){
var amountdown = document.getElementById("amount_down_item").value;
var stockdown = document.getElementById("stock_show_down").value;
if(amountdown==""||amountdown==null){
alertify.error("กรุณากรอกจำนวนที่ต้องการ");
  $('#amount_down_item').focus();
}else if(parseInt(amountdown) > parseInt(stockdown)){
alertify.error("กรุณากรอกจำนวนที่ถูกต้อง !!");
return false;
}else{
if(localStorage.transferstatus=="0"){
$.ajax({
                          url: localStorage.api_url_server+"NPReceiveWs/trn/insert",
                          data: '{"accessToken":"","docNo":"","docDate":"'+date+'","isCompleteSave":"0","creatorCode":"'+localStorage.username+'","refNo":""}',
                          contentType: "application/json; charset=utf-8",
                          dataType: "json",
                          type: "POST",
                          cache: false,
                          success: function(trf_h){
                          console.log(trf_h);
                          localStorage.transferNo = trf_h.docNo;

                          $.ajax({
                                                    url: localStorage.api_url_server+"NPReceiveWs/trn/manageitem",
                                                    data: '{"accessToken":"","docNo":"'+localStorage.transferNo+'","barCode":"'+localStorage.transferBarcode+'","itemCode":"'+localStorage.transferItemcode+'","docDate":"'+date+'","fromWHCode":"'+localStorage.transferdown_from+'","fromShelfCode":"-","toWHCode":"'+localStorage.transferdown_to+'","toShelfCode":"-","qty":"'+document.getElementById("amount_down_item").value+'","refNo":""}',
                                                    contentType: "application/json; charset=utf-8",
                                                    dataType: "json",
                                                    type: "POST",
                                                    cache: false,
                                                    success: function(trf_i){
                                                    console.log(trf_i);
                                                    alert("บันทึกข้อมูลเรียบร้อยแล้ว"+localStorage.transferNo);
                                                    localStorage.transferstatus="1";
                                                    $.mobile.changePage("#transferup",{transition: 'slidefade'});

                                                    },
                                                    error: function (error){
                                                    alertify.error("error");
                                                    }
                                                    });
                          },
                          error: function (error){
                          alertify.error("error");
                          }
                          });
}else{
 $.ajax({
                          url: localStorage.api_url_server+"NPReceiveWs/trn/manageitem",
                          data: '{"accessToken":"","docNo":"'+localStorage.transferNo+'","barCode":"'+localStorage.transferBarcode+'","itemCode":"'+localStorage.transferItemcode+'","docDate":"'+date+'","fromWHCode":"'+localStorage.transferdown_from+'","fromShelfCode":"-","toWHCode":"'+localStorage.transferdown_to+'","toShelfCode":"-","qty":"'+document.getElementById("amount_down_item").value+'","refNo":""}',
                          contentType: "application/json; charset=utf-8",
                          dataType: "json",
                          type: "POST",
                          cache: false,
                          success: function(trf_i){
                          console.log(trf_i);
                          alert("บันทึกข้อมูลเรียบร้อยแล้ว"+localStorage.transferNo);
                          $.mobile.changePage("#transferup",{transition: 'slidefade'});

                          },
                          error: function (error){
                          alertify.error("error");
                          }
                          });

}
}
}

function save_down(){
if( localStorage.transferstatus=="1"){
$.ajax({
                          url: localStorage.api_url_server+"NPReceiveWs/trn/insert",
                          data: '{"accessToken":"","docNo":"'+localStorage.transferNo+'","docDate":"'+date+'","isCompleteSave":"1","creatorCode":"'+localStorage.username+'","refNo":""}',
                          contentType: "application/json; charset=utf-8",
                          dataType: "json",
                          type: "POST",
                          cache: false,
                          success: function(trf_h){
                          console.log(trf_h);
                          localStorage.transferNo = "";
                          localStorage.transferstatus = "0";
                          alertify.success("บันทึกใบรับเข้าเรียบร้อยแล้ว");
                          },
                          error: function (error){
                          alertify.error("error");
                          }
                          });
}else{
alertify.error("ยังไม่มีการทำใบรับสินค้า");
}
}
function checkstatus(){
if(localStorage.transferstatus=="1"){
alert("ท่านยังไม่ได้บันทึกใบโอนสินค้ากรุณาบันทึกก่อน");
return false;
}else{
$.mobile.changePage("#transfer",{transition: 'slidefade',reverse: true});
}
}