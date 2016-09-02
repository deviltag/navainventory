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
            case "transferup_detail" :
                        get_item_transfer("up",t.scanResult);
                        $.mobile.changePage("#transferup_item",{transition: 'slidefade'});
                        break;
            case "transferdown_detail" :
                        get_item_transfer("down",t.scanResult);
                        $.mobile.changePage("#transferdown_item",{transition: 'slidefade'});
                        break;
            case "transfer_detail" :
                          get_item_transferedit(t.scanResult);
                          $.mobile.changePage("#transfer_item",{transition: 'slidefade'});
                          break;
            case "transfer_item" :
                          get_item_transferedit(t.scanResult);
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
var date = curr_date + "-" + curr_month
+ "-" + curr_year;

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
                            select_shelfstore();

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

//=============================================get_item====================================================================
function get_item_transfer(wh,bar){
if(wh=="up"){
whcode = localStorage.transferup_from;
swhcode = localStorage.transfersup_from;
}else if(wh=="down"){
whcode = localStorage.transferdown_from;
swhcode = localStorage.transfersdown_from;
}
$.ajax({
                          url: localStorage.api_url_server+"NPReceiveWs/trn/searchitemstock",
                          data: '{"accessToken":"","type":"1","whCode":"'+whcode+'","shelf":"'+swhcode+'","search":"'+bar+'"}',
                          contentType: "application/json; charset=utf-8",
                          dataType: "json",
                          type: "POST",
                          cache: false,
                          success: function(item_t){
                          console.log(item_t);
                          var item_t_list="";
                          var stock_item =0;
                          if(item_t.data[0].stkRemain==0){
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


//=============================================get_itemedit====================================================================
function get_item_transferedit(bar){

$.ajax({
                          url: localStorage.api_url_server+"NPReceiveWs/trn/searchitemstock",
                          data: '{"accessToken":"","type":"1","whCode":"'+localStorage.fromWHd+'","shelf":"'+localStorage.fromSHd+'","search":"'+bar+'"}',
                          contentType: "application/json; charset=utf-8",
                          dataType: "json",
                          type: "POST",
                          cache: false,
                          success: function(item_e){
                          console.log(item_e);
                          var item_e_list="";
                          var stock_item =0;
                          if(item_e.data[0].stkRemain==0){
                            item_e_list += "<p>ชื่อสินค้า : "+item_e.data[0].itemName+"</p>";
                            item_e_list += "<p>หน่วยนับ : "+item_e.data[0].unitCode+"</p>";
                            item_e_list += "<p style='color:red;'>จำนวนคงเหลือ : ไม่มีสินค้า</p>";
                            item_e_list += "<p style='color:red; text-align:center;'>** สินค้าไม่พอสำหรับการโอน **</p>";
                            }else{
                            item_e_list += "<p>ชื่อสินค้า : "+item_e.data[0].itemName+"</p>";
                            item_e_list += "<p>หน่วยนับ : "+item_e.data[0].unitCode+"</p>";
                            item_e_list += "<p>จำนวนคงเหลือ : "+item_e.data[0].stkRemain+"</p>";
                            }
                            stock_iteme = item_e.data[0].stkRemain;
                            localStorage.transfereBarcode =item_e.data[0].barCode;
                            localStorage.transfereItemcode =item_e.data[0].itemCode;

                          document.getElementById("stock_show_edit").value = stock_iteme;
                          document.getElementById("item_show_edit").innerHTML = item_e_list;
                          if($.mobile.activePage.is('#transfer_item')){
                          $('#amount_edit_item').focus();
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
                                                    data: '{"accessToken":"","docNo":"'+localStorage.transferNo+'","barCode":"'+localStorage.transferBarcode+'","itemCode":"'+localStorage.transferItemcode+'","docDate":"'+date+'","fromWHCode":"'+localStorage.transferup_from+'","fromShelfCode":"'+localStorage.transfersup_from+'","toWHCode":"'+localStorage.transferup_to+'","toShelfCode":"'+localStorage.transfersup_to+'","qty":"'+amountup+'","refNo":"","isCancel":"0"}',
                                                    contentType: "application/json; charset=utf-8",
                                                    dataType: "json",
                                                    type: "POST",
                                                    cache: false,
                                                    success: function(trf_i){
                                                    console.log(trf_i);
                                                    alertify.success("บันทึกข้อมูลเรียบร้อยแล้ว"+localStorage.transferNo);
                                                    localStorage.transferstatus="1";
                                                    search_detailup(localStorage.transferNo)
                                                    //$.mobile.changePage("#transferup",{transition: 'slidefade'});


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
//console.log('{"accessToken":"","docNo":"'+localStorage.transferNo+'","barCode":"'+localStorage.transferBarcode+'","itemCode":"'+localStorage.transferItemcode+'","docDate":"'+date+'","fromWHCode":"'+localStorage.transferup_from+'","fromShelfCode":"'+localStorage.transfersup_from+'","toWHCode":"'+localStorage.transferup_to+'","toShelfCode":"'+localStorage.transfersup_to+'","qty":"'+amountup+'","refNo":"","isCancel":"0"}')
 $.ajax({
                          url: localStorage.api_url_server+"NPReceiveWs/trn/manageitem",
                          data: '{"accessToken":"","docNo":"'+localStorage.transferNo+'","barCode":"'+localStorage.transferBarcode+'","itemCode":"'+localStorage.transferItemcode+'","docDate":"'+date+'","fromWHCode":"'+localStorage.transferup_from+'","fromShelfCode":"'+localStorage.transfersup_from+'","toWHCode":"'+localStorage.transferup_to+'","toShelfCode":"'+localStorage.transfersup_to+'","qty":"'+amountup+'","refNo":"","isCancel":"0"}',
                          contentType: "application/json; charset=utf-8",
                          dataType: "json",
                          type: "POST",
                          cache: false,
                          success: function(trf_i){
                          console.log(trf_i);
                          alertify.success("บันทึกข้อมูลเรียบร้อยแล้ว"+localStorage.transferNo);
                          $.mobile.changePage("#transferup",{transition: 'slidefade'});
                          search_detailup(localStorage.transferNo)
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
                                                    data: '{"accessToken":"","docNo":"'+localStorage.transferNo+'","barCode":"'+localStorage.transferBarcode+'","itemCode":"'+localStorage.transferItemcode+'","docDate":"'+date+'","fromWHCode":"'+localStorage.transferdown_from+'","fromShelfCode":"'+localStorage.transfersdown_from+'","toWHCode":"'+localStorage.transferdown_to+'","toShelfCode":"'+localStorage.transfersdown_from+'","qty":"'+amountdown+'","refNo":"","isCancel":"0"}',
                                                    contentType: "application/json; charset=utf-8",
                                                    dataType: "json",
                                                    type: "POST",
                                                    cache: false,
                                                    success: function(trf_i){
                                                    console.log(trf_i);
                                                    alertify.success("บันทึกข้อมูลเรียบร้อยแล้ว"+localStorage.transferNo);
                                                    localStorage.transferstatus="1";
                                                    search_detaildown(localStorage.transferNo)
                                                    //$.mobile.changePage("#transferup",{transition: 'slidefade'});

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
                          data: '{"accessToken":"","docNo":"'+localStorage.transferNo+'","barCode":"'+localStorage.transferBarcode+'","itemCode":"'+localStorage.transferItemcode+'","docDate":"'+date+'","fromWHCode":"'+localStorage.transferdown_from+'","fromShelfCode":"'+localStorage.transfersdown_from+'","toWHCode":"'+localStorage.transferdown_to+'","toShelfCode":"'+localStorage.transfersdown_to+'","qty":"'+amountdown+'","refNo":"","isCancel":"0"}',
                          contentType: "application/json; charset=utf-8",
                          dataType: "json",
                          type: "POST",
                          cache: false,
                          success: function(trf_i){
                          console.log(trf_i);
                          alertify.success("บันทึกข้อมูลเรียบร้อยแล้ว"+localStorage.transferNo);
                          search_detaildown(localStorage.transferNo)
                          //$.mobile.changePage("#transferup",{transition: 'slidefade'});

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
alertify.error("ท่านยังไม่ได้บันทึกใบโอนสินค้ากรุณาบันทึกก่อน");
return false;
}else{
if($.mobile.activePage.is('#transfer_detail')){
$.mobile.changePage("#transferlist",{transition: 'slidefade',reverse: true});
}else if($.mobile.activePage.is('#transferup_detail')){
$.mobile.changePage("#transferup",{transition: 'slidefade',reverse: true});
}else if($.mobile.activePage.is('#transferdown_detail')){
$.mobile.changePage("#transferdown",{transition: 'slidefade',reverse: true});
}
}
}
//=================================================================================================searchdetailup==============================================================================
function search_detailup(tfNo){
$.ajax({
                          url: localStorage.api_url_server+"NPReceiveWs/trn/searchdetails",
                          data: '{"accessToken":"","type":"","search":"'+tfNo+'"}',
                          contentType: "application/json; charset=utf-8",
                          dataType: "json",
                          type: "POST",
                          cache: false,
                          success: function(tf_h){
                          console.log(tf_h);
                          var tfh_show = "<p>เลขที่เอกสาร : "+tf_h.docNo+"</p>";
                          tfh_show += "<p>วันที่ทำเอกสาร : "+tf_h.docDate+"</p>";
                          tfh_show += "<p>มูลค่ารวม : "+tf_h.sumOfAmount+" บาท</p>";

                          var count = tf_h.data.length;
                          var tfd_show = '<hr>';
                          tfd_show += '<label><div class="ui-grid-c" style="text-align:center;  font-size:14px;">';
                          tfd_show += '<div class="ui-block-a"><b>สินค้า</b></div>';
                          tfd_show += '<div class="ui-block-b"><b>จำนวน</b></div>';
                          tfd_show += '<div class="ui-block-c"><b>จากคลัง/ชั้นเก็บ</b></div>';
                          tfd_show += '<div class="ui-block-d"><b>เข้าคลัง/ชั้นเก็บ</b></div>';
                          tfd_show += '</div></label><hr>';

                          for(var i = 0;i<count;i++){
                          tfd_show += '<div class="ui-grid-c" style="text-align:center; font-size:12px;">';
                           //tfd_show += "<p>"+tf_h.data[i].itemCode+"</a>";
                           tfd_show += '<div class="ui-block-a">'+tf_h.data[i].itemName+'</div>';
                           tfd_show += '<div class="ui-block-b"> '+tf_h.data[i].qty+' '+tf_h.data[i].unitCode+' </div>';
                           tfd_show += '<div class="ui-block-c"> '+tf_h.data[i].fromWH+'/'+tf_h.data[i].fromShelf+'</div>';
                           tfd_show += '<div class="ui-block-d"> '+tf_h.data[i].toWH+'/'+tf_h.data[i].toShelf+'</div></div><hr>';

                          }
                          tfd_show += '</div>';

                          document.getElementById("show_hdetail_tfup").innerHTML = tfh_show;
                          document.getElementById("show_detail_tfup").innerHTML = tfd_show;
                          $.mobile.changePage("#transferup_detail",{transition: 'slidefade'});

                          },
                          error: function (error){
                          alertify.error("error");
                          }
                          });

}

//=================================================================================================searchdetailup==============================================================================
function search_detaildown(tfNo){
$.ajax({
                          url: localStorage.api_url_server+"NPReceiveWs/trn/searchdetails",
                          data: '{"accessToken":"","type":"0","search":"'+tfNo+'"}',
                          contentType: "application/json; charset=utf-8",
                          dataType: "json",
                          type: "POST",
                          cache: false,
                          success: function(tf_h){
                          console.log(tf_h);
                          var tfh_show = "<p>เลขที่เอกสาร : "+tf_h.docNo+"</p>";
                          tfh_show += "<p>วันที่ทำเอกสาร : "+tf_h.docDate+"</p>";
                          tfh_show += "<p>มูลค่ารวม : "+tf_h.sumOfAmount+" บาท</p>";

                          var count = tf_h.data.length;
                          var tfd_show = '<hr>';
                          tfd_show += '<label><div class="ui-grid-c" style="text-align:center;  font-size:14px;">';
                          tfd_show += '<div class="ui-block-a"><b>สินค้า</b></div>';
                          tfd_show += '<div class="ui-block-b"><b>จำนวน</b></div>';
                          tfd_show += '<div class="ui-block-c"><b>จากคลัง/ชั้นเก็บ</b></div>';
                          tfd_show += '<div class="ui-block-d"><b>เข้าคลัง/ชั้นเก็บ</b></div>';
                          tfd_show += '</div></label><hr>';

                          for(var i = 0;i<count;i++){
                          tfd_show += '<div class="ui-grid-c" style="text-align:center; font-size:12px;">';
                           //tfd_show += "<p>"+tf_h.data[i].itemCode+"</a>";
                           tfd_show += '<div class="ui-block-a">'+tf_h.data[i].itemName+'</div>';
                           tfd_show += '<div class="ui-block-b"> '+tf_h.data[i].qty+' '+tf_h.data[i].unitCode+' </div>';
                           tfd_show += '<div class="ui-block-c"> '+tf_h.data[i].fromWH+'/'+tf_h.data[i].fromShelf+'</div>';
                           tfd_show += '<div class="ui-block-d"> '+tf_h.data[i].toWH+'/'+tf_h.data[i].toShelf+'</div></div><hr>';

                          }
                          tfd_show += '</div>';

                          document.getElementById("show_hdetail_tfdown").innerHTML = tfh_show;
                          document.getElementById("show_detail_tfdown").innerHTML = tfd_show;
                          $.mobile.changePage("#transferdown_detail",{transition: 'slidefade'});

                          },
                          error: function (error){
                          alertify.error("error");
                          }
                          });

}
//=================================================================================================searchdetail==============================================================================
function search_detail(tfNo,type){
if(type){
types = type;
}else{types ="1";}
$.ajax({
                          url: localStorage.api_url_server+"NPReceiveWs/trn/searchdetails",
                          data: '{"accessToken":"","type":"'+types+'","search":"'+tfNo+'"}',
                          contentType: "application/json; charset=utf-8",
                          dataType: "json",
                          type: "POST",
                          cache: false,
                          success: function(tf_h){
                          console.log(tf_h);
                          var tfh_show = "<p>เลขที่เอกสาร : "+tf_h.docNo+"</p>";
                          tfh_show += "<p>วันที่ทำเอกสาร : "+tf_h.docDate+"</p>";
                          tfh_show += "<p>มูลค่ารวม : "+tf_h.sumOfAmount+" บาท</p>";
                            localStorage.docnod = tf_h.docNo;
                          var count = tf_h.data.length;
                          var tfd_show = '<hr>';
                          tfd_show += '<label><div class="ui-grid-c" style="text-align:center;  font-size:14px;">';
                          tfd_show += '<div class="ui-block-a"><b>สินค้า</b></div>';
                          tfd_show += '<div class="ui-block-b"><b>จำนวน</b></div>';
                          tfd_show += '<div class="ui-block-c"><b>จากคลัง/ชั้นเก็บ</b></div>';
                          tfd_show += '<div class="ui-block-d"><b>เข้าคลัง/ชั้นเก็บ</b></div>';
                          tfd_show += '</div></label><hr>';

                          for(var i = 0;i<count;i++){
                          tfd_show += '<div class="ui-grid-c" style="text-align:center; font-size:12px;">';
                           //tfd_show += "<p>"+tf_h.data[i].itemCode+"</a>";
                           tfd_show += '<div class="ui-block-a">'+tf_h.data[i].itemName+'</div>';
                           tfd_show += '<div class="ui-block-b"> '+tf_h.data[i].qty+' '+tf_h.data[i].unitCode+' </div>';
                           tfd_show += '<div class="ui-block-c"> '+tf_h.data[i].fromWH+'/'+tf_h.data[i].fromShelf+'</div>';
                           tfd_show += '<div class="ui-block-d"> '+tf_h.data[i].toWH+'/'+tf_h.data[i].toShelf+'</div></div><hr>';


                           localStorage.fromWHd = tf_h.data[i].fromWH;
                           localStorage.fromSHd = tf_h.data[i].fromShelf;
                           localStorage.toWHd = tf_h.data[i].toWH;
                           localStorage.toSHd = tf_h.data[i].toShelf;


                          }
                          tfd_show += '</div>';

                          document.getElementById("show_hdetail_tf").innerHTML = tfh_show;
                          document.getElementById("show_detail_tf").innerHTML = tfd_show;
                          $.mobile.changePage("#transfer_detail",{transition: 'slidefade'});

                          },
                          error: function (error){
                          alertify.error("error");
                          }
                          });

}
//=================================================================================================searchdetail==============================================================================

function search_tf(){
$.ajax({
                          url: localStorage.api_url_server+"NPReceiveWs/trn/search",
                          data: '{"accessToken":"","type":"1","search":""}',
                          contentType: "application/json; charset=utf-8",
                          dataType: "json",
                          type: "POST",
                          cache: false,
                          success: function(tf_l){
                          console.log(tf_l);
                          var count = tf_l.data.length;
                          var tf_list ="";
                          for(var i = 0;i<count;i++){
                          tf_list += '<a href="#" class="ui-btn ui-corner-all" onclick="search_detail(';
                          tf_list += "'"+tf_l.data[i].docNo+"')";
                          tf_list += '">'+tf_l.data[i].docNo+'</a>';

                          }
                          document.getElementById("show_tflist").innerHTML = tf_list;
                          $.mobile.changePage("#transferlist",{transition: 'slidefade'});


                          },
                          error: function (error){
                          alertify.error("error");
                          }
                          });

}
//=================================================================================================submit edit==============================================================
function transfer_edit(){
var amountedit = document.getElementById("amount_edit_item").value;
var stockedit = document.getElementById("stock_show_edit").value;
console.log('{"accessToken":"","docNo":"'+localStorage.docnod+'","barCode":"'+localStorage.transferBarcode+'","itemCode":"'+localStorage.transferItemcode+'","docDate":"'+date+'","fromWHCode":"'+localStorage.fromWHd+'","fromShelfCode":"'+localStorage.fromSHd+'","toWHCode":"'+localStorage.toWHd+'","toShelfCode":"'+localStorage.toSHd+'","qty":"'+amountedit+'","refNo":"","isCancel":"0"}')

if(amountedit==""||amountedit==null){
alertify.error("กรุณากรอกจำนวนที่ต้องการ");
  $('#amount_edit_item').focus();
}else if(parseInt(amountedit) > parseInt(stockedit)){
alertify.error("กรุณากรอกจำนวนที่ถูกต้อง !!");
return false;
}else{
$.ajax({
                          url: localStorage.api_url_server+"NPReceiveWs/trn/manageitem",
                          data: '{"accessToken":"","docNo":"'+localStorage.docnod+'","barCode":"'+localStorage.transferBarcode+'","itemCode":"'+localStorage.transferItemcode+'","docDate":"'+date+'","fromWHCode":"'+localStorage.fromWHd+'","fromShelfCode":"'+localStorage.fromSHd+'","toWHCode":"'+localStorage.toWHd+'","toShelfCode":"'+localStorage.toSHd+'","qty":"'+amountedit+'","refNo":"","isCancel":"0"}',
                          contentType: "application/json; charset=utf-8",
                          dataType: "json",
                          type: "POST",
                          cache: false,
                          success: function(trf_i){
                          console.log(trf_i);
                          alertify.success("บันทึกข้อมูลเรียบร้อยแล้ว"+localStorage.transferNo);
                          $.mobile.changePage("#transfer_detail",{transition: 'slidefade'});
                          search_detail(localStorage.docnod,"0")
                          },
                          error: function (error){
                          alertify.error("error");
                          }
                          });
                          }
}
//==========================================================================save_edit====================================================
function save_edit(){
if(localStorage.docnod == ""){
alertify.error("ใบโอนสินค้าถูกบันทึกแล้ว");
return false;
}else{
$.ajax({
                          url: localStorage.api_url_server+"NPReceiveWs/trn/insert",
                          data: '{"accessToken":"","docNo":"'+localStorage.docnod+'","docDate":"'+date+'","isCompleteSave":"1","creatorCode":"'+localStorage.username+'","refNo":""}',
                          contentType: "application/json; charset=utf-8",
                          dataType: "json",
                          type: "POST",
                          cache: false,
                          success: function(trf_h){
                          search_detail(localStorage.docnod,"1")
                          console.log(trf_h);
                          localStorage.docnod = "";
                          alertify.success("บันทึกใบโอนสินค้าเรียบร้อยแล้ว");
                          },
                          error: function (error){
                          alertify.error("error");
                          }
                          });
          }
}
