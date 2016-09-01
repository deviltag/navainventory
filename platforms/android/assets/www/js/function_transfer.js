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


                          var store_list_up= "<select id='whstore_up' class='whselect' onchange='select_shelfstore(this)'>";
                          var store_list_down= "<select id='whstore_down' class='whselect'  onchange='select_shelfstore(this)'>";
                          for(var i = 0;i<counts;i++){
                          store_list_up += "<option value='"+store.data[i].code+"'>"+store.data[i].code+" "+store.data[i].name+"</option>";
                          store_list_down += "<option value='"+store.data[i].code+"'>"+store.data[i].code+" "+store.data[i].name+"</option>";

                          }
                          store_list_up += "</select>";
                          store_list_down += "</select>";
                          document.getElementById("whtypestoreup").innerHTML = store_list_up;
                          document.getElementById("whtypestoredown").innerHTML = store_list_down;

                          wh_type_van();
                          //select_shelfstore();
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

                          var van_list_up= "<select id='whvan_up' class='whselect' onchange='select_shelfvan(this)'>";
                          var van_list_down= "<select id='whvan_down' class='whselect' onchange='select_shelfvan(this)'>";
                          for(var i = 0;i<countv;i++){
                          van_list_up += "<option value='"+van.data[i].code+"'>"+van.data[i].code+" "+van.data[i].location+"</option>";
                          van_list_down += "<option value='"+van.data[i].code+"'>"+van.data[i].code+" "+van.data[i].location+"</option>";

                          }
                          van_list_up += "</select>";
                          van_list_down += "</select>";
                          document.getElementById("whtypevanup").innerHTML = van_list_up;
                          document.getElementById("whtypevandown").innerHTML = van_list_down;
                            //$popUp1.popup("close");
                            select_shelfstore();
                            select_shelfvan();
                          },
                          error: function (error){
                          alertify.error(error);
                          }
                          });
                          return false;
}

function sh_type_van(whcode){
$.ajax({
                          url: localStorage.api_url_server+"NPReceiveWs/trn/searchshelf",
                          data: '{"accessToken":"","refCode":"'+whcode+'","search":""}',
                          contentType: "application/json; charset=utf-8",
                          dataType: "json",
                          type: "POST",
                          cache: false,
                          success: function(vansh){
                          console.log("vansh "+JSON.stringify(vansh));
                          var countv = vansh.data.length;

                          var vansh_list_up= "<select id='vshelfup' class='whselect'>";
                          var vansh_list_down= "<select id='vshelfdown' class='whselect'>";
                          for(var i = 0;i<countv;i++){
                          vansh_list_up += "<option value='"+vansh.data[i].code+"'>"+vansh.data[i].code+" "+vansh.data[i].name+"</option>";
                          vansh_list_down += "<option value='"+vansh.data[i].code+"'>"+vansh.data[i].code+" "+vansh.data[i].name+"</option>";

                          }
                          vansh_list_up += "</select>";
                          vansh_list_down += "</select>";
                          document.getElementById("shtypevanup").innerHTML = vansh_list_up;
                          document.getElementById("shtypevandown").innerHTML = vansh_list_down;
                            //$popUp1.popup("close");

                          },
                          error: function (error){
                          alertify.error(error);
                          }
                          });
                          return false;
}

function sh_type_store(whcode){
$.ajax({
                          url: localStorage.api_url_server+"NPReceiveWs/trn/searchshelf",
                          data: '{"accessToken":"","refCode":"'+whcode+'","search":""}',
                          contentType: "application/json; charset=utf-8",
                          dataType: "json",
                          type: "POST",
                          cache: false,
                          success: function(storesh){
                          console.log("storesh "+JSON.stringify(storesh));
                          var countv = storesh.data.length;

                          var storesh_list_up= "<select id='sshelfup' class='whselect'>";
                          var storesh_list_down= "<select id='sshelfdown' class='whselect'>";
                          for(var i = 0;i<countv;i++){
                          storesh_list_up += "<option value='"+storesh.data[i].code+"'>"+storesh.data[i].code+" "+storesh.data[i].name+"</option>";
                          storesh_list_down += "<option value='"+storesh.data[i].code+"'>"+storesh.data[i].code+" "+storesh.data[i].name+"</option>";

                          }
                          storesh_list_up += "</select>";
                          storesh_list_down += "</select>";
                          document.getElementById("shtypestoreup").innerHTML = storesh_list_up;
                          document.getElementById("shtypestoredown").innerHTML = storesh_list_down;
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

//=============================================================================================shelf store=============================================================================
function select_shelfstore(whStore){
var sstore = "";
if($.mobile.activePage.is('#transferup')){
if(whStore){
sstore = whStore.value;
}else{
var ss_up = document.getElementById("whstore_up");
sstore = ss_up.options[ss_up.selectedIndex].value;
}
}else if($.mobile.activePage.is('#transferdown')){
if(whStore){
sstore = whStore.value;
}else{
var ss_up = document.getElementById("whstore_down");
sstore = ss_up.options[ss_up.selectedIndex].value;
}
}
sh_type_store(sstore);
}
//=============================================================================================shelf van=============================================================================
function select_shelfvan(whVan){
var svan = "";
if($.mobile.activePage.is('#transferup')){
if(whVan){
svan = whVan.value;
}else{
var ss_up = document.getElementById("whvan_up");
svan = ss_up.options[ss_up.selectedIndex].value;
}
}else if($.mobile.activePage.is('#transferdown')){
if(whVan){
svan = whVan.value;
}else{
var ss_up = document.getElementById("whvan_down");
svan = ss_up.options[ss_up.selectedIndex].value;
}
}
sh_type_van(svan);
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
                          var item_t_list="";
                          var stock_item =0;
                          if(stkRemain==0){
                            item_t_list += "<p>ชื่อสินค้า : "+item_t.data[0].itemName+"</p>";
                            item_t_list += "<p>หน่วยนับ : "+item_t.data[0].unitCode+"</p>";
                            item_t_list += "<p style='color:red;'>จำนวนคงเหลือ : ไม่มีสินค้า</p>";
                            item_t_list += "<p style='color:red; text-align:center;'>** สินค้าไม่พอสำหรับการโอน **</p>";
                            }else{
                            item_t_list += "<p>ชื่อสินค้า : "+item_t.data[0].itemName+"</p>";
                            item_t_list += "<p>หน่วยนับ : "+item_t.data[0].unitCode+"</p>";
                            item_t_list += "<p>จำนวนคงเหลือ : "+item_t.data[0].stkRemain+"</p>";
                            }
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
//========================================================================== เลือกคลังโอนขึ้น ============================================================================
function tranfer_up_select(){
document.getElementById("item_show_up").innerHTML = "";
document.getElementById("item_show_down").innerHTML = "";

var s_up = document.getElementById("whstore_up");
var strstore_up = s_up.options[s_up.selectedIndex].value;
localStorage.transferup_from = strstore_up;

var v_up = document.getElementById("whvan_up");
var strvan_up = v_up.options[v_up.selectedIndex].value;
localStorage.transferup_to = strvan_up;

var ss_up = document.getElementById("sshelfup");
var sstrstore_up = ss_up.options[ss_up.selectedIndex].value;
localStorage.transfersup_from = sstrstore_up;

var vv_up = document.getElementById("vshelfup");
var vstrvan_up = vv_up.options[vv_up.selectedIndex].value;
localStorage.transfersup_to = vstrvan_up;

var r = confirm("ต้องการโอนสินค้าจากคลัง "+localStorage.transferup_from+" ชั้นเก็บ "+localStorage.transfersup_from+" ไปยัง "+localStorage.transferup_to+" ชั้นเก็บ "+localStorage.transfersup_to+" ใช่หรือไม่ !!");
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
                                                    data: '{"accessToken":"","docNo":"'+localStorage.transferNo+'","barCode":"'+localStorage.transferBarcode+'","itemCode":"'+localStorage.transferItemcode+'","docDate":"'+date+'","fromWHCode":"'+localStorage.transferup_from+'","fromShelfCode":"'+localStorage.transfersup_from+'","toWHCode":"'+localStorage.transferup_to+'","toShelfCode":"'+localStorage.transfersup_to+'","qty":"'+document.getElementById("amount_up_item").value+'","refNo":""}',
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
                          data: '{"accessToken":"","docNo":"'+localStorage.transferNo+'","barCode":"'+localStorage.transferBarcode+'","itemCode":"'+localStorage.transferItemcode+'","docDate":"'+date+'","fromWHCode":"'+localStorage.transferup_from+'","fromShelfCode":"'+localStorage.transferup_from+'","toWHCode":"'+localStorage.transferup_to+'","toShelfCode":"'+localStorage.transferup_to+'","qty":"'+document.getElementById("amount_up_item").value+'","refNo":""}',
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
//========================================================================== บันทึก โอนขึ้นรถ ============================================================================
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
                          alertify.success("บันทึกใบโอนสินค้าเรียบร้อยแล้ว");
                          },
                          error: function (error){
                          alertify.error("error");
                          }
                          });
}else{
alertify.error("ยังไม่มีการทำใบรับสินค้า");
}
}
//========================================================================== เลือกคลังโอนขึ้น ============================================================================


function tranfer_down_select(){
document.getElementById("item_show_up").innerHTML = "";
document.getElementById("item_show_down").innerHTML = "";

var v_down = document.getElementById("whvan_down");
var strvan_down = v_down.options[v_down.selectedIndex].value;
localStorage.transferdown_from = strvan_down;

var s_down = document.getElementById("whstore_down");
var strstore_down = s_down.options[s_down.selectedIndex].value;
localStorage.transferdown_to = strstore_down;


var ss_down = document.getElementById("sshelfdown");
var sstrstore_down = ss_down.options[ss_down.selectedIndex].value;
localStorage.transfersdown_from = sstrstore_down;

var vv_down = document.getElementById("vshelfdown");
var vstrvan_down = vv_down.options[vv_down.selectedIndex].value;
localStorage.transfersdown_to = vstrvan_down;

var d = confirm("ต้องการโอนสินค้าจากคลัง "+localStorage.transferdown_from+" ชั้นเก็บ "+localStorage.transfersdown_from+" ไปยัง "+localStorage.transferdown_to+" ชั้นเก็บ "+localStorage.transfersdown_to+"  ใช่หรือไม่ !!");
            if (d == true) {
               $.mobile.changePage("#transferdown_item",{transition: 'slidefade'});
            } else {
                return false;
            }
}
//========================================================================== โอนลงรถ ============================================================================
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
                                                    data: '{"accessToken":"","docNo":"'+localStorage.transferNo+'","barCode":"'+localStorage.transferBarcode+'","itemCode":"'+localStorage.transferItemcode+'","docDate":"'+date+'","fromWHCode":"'+localStorage.transferdown_from+'","fromShelfCode":"'+localStorage.transfersdown_from+'","toWHCode":"'+localStorage.transferdown_to+'","toShelfCode":"'+localStorage.transfersdown_from+'","qty":"'+document.getElementById("amount_down_item").value+'","refNo":""}',
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
                          data: '{"accessToken":"","docNo":"'+localStorage.transferNo+'","barCode":"'+localStorage.transferBarcode+'","itemCode":"'+localStorage.transferItemcode+'","docDate":"'+date+'","fromWHCode":"'+localStorage.transferdown_from+'","fromShelfCode":"'+localStorage.transfersdown_from+'","toWHCode":"'+localStorage.transferdown_to+'","toShelfCode":"'+localStorage.transfersdown_to+'","qty":"'+document.getElementById("amount_down_item").value+'","refNo":""}',
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
//========================================================================== บันทึก โอนลงรถ ============================================================================
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
                          alertify.success("บันทึกใบโอนสินค้าเรียบร้อยแล้ว");
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