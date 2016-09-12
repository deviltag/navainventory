var d = new Date();
var curr_date = d.getDate();
var curr_month = d.getMonth()+1;
var curr_year = d.getFullYear();
var date = curr_date + "-" + curr_month
+ "-" + curr_year;

function wh_dmg_from(){
$.ajax({
                          url: localStorage.api_url_server+""+localStorage.api_url_searchwh_tf,
                          data: '{"accessToken":"","type":"0","search":""}',
                          contentType: "application/json; charset=utf-8",
                          dataType: "json",
                          type: "POST",
                          cache: false,
                          success: function(whdmg_from){
                          console.log("whdmg_from "+JSON.stringify(whdmg_from));
                          var counts = whdmg_from.data.length;


                          var wh_dmg_from= "<select id='whdmg_from' class='whselect' data-role='none' onchange='select_shelfdmgfrom(this)'>";
                            var loname = "";
                          for(var i = 0;i<counts;i++){

                            if(whdmg_from.data[i].location == null){
                                loname = "-";
                            }else{
                                loname = whdmg_from.data[i].location;
                            }
                          wh_dmg_from += "<option value='"+whdmg_from.data[i].code+"'>"+whdmg_from.data[i].name+" "+loname+"</option>";
                            }
                          wh_dmg_from += "</select>";
                          document.getElementById("wh_dmgfrom").innerHTML = wh_dmg_from;

                          wh_dmg();

                          },
                          error: function (error){
                          alertify.error(error);
                          }
                          });
                          return false;
}
//======================================================================== wh damage ======================================================================
function wh_dmg(){
$.ajax({
                          url: localStorage.api_url_server+""+localStorage.api_url_searchwh_tf,
                          data: '{"accessToken":"","type":"1","search":""}',
                          contentType: "application/json; charset=utf-8",
                          dataType: "json",
                          type: "POST",
                          cache: false,
                          success: function(whdmg){
                          console.log("whdmg "+JSON.stringify(whdmg));
                          var counts = whdmg.data.length;


                          var wh_dmg= "<select id='whdmg' class='whselect' data-role='none' onchange='select_shelfdmg(this)'>";
                            var loname = "";
                          for(var i = 0;i<counts;i++){

                            if(whdmg.data[i].location == null){
                                loname = "-";
                            }else{
                                loname = whdmg.data[i].location;
                            }

                          wh_dmg += "<option value='"+whdmg.data[i].code+"'>"+whdmg.data[i].name+" "+loname+"</option>";
                            }
                          wh_dmg += "</select>";
                          document.getElementById("wh_dmg").innerHTML = wh_dmg;

                          select_shelfdmgfrom();

                          },
                          error: function (error){
                          alertify.error(error);
                          }
                          });
                          return false;
}
//======================================================================== select dmg ==============================================================================
function select_shelfdmgfrom(whdmg_from){
var damage_from = "";
if(whdmg_from){
damage_from = whdmg_from.value;
}else{
var dm_from = document.getElementById("whdmg_from");
damage_from = dm_from.options[dm_from.selectedIndex].value;
}
sh_damagefrom(damage_from);

}


function select_shelfdmg(whdmg){
var damage = "";
if(whdmg){
damage = whdmg.value;
}else{
var dm = document.getElementById("whdmg");
damage = dm.options[dm.selectedIndex].value;
}
sh_damage(damage);

}

//======================================================================== show sh damage from ===============================================================
function sh_damagefrom(whcode_dmgf){
$.ajax({
                          url: localStorage.api_url_server+""+localStorage.api_url_searchshelf_tf,
                          data: '{"accessToken":"","refCode":"'+whcode_dmgf+'","search":""}',
                          contentType: "application/json; charset=utf-8",
                          dataType: "json",
                          type: "POST",
                          cache: false,
                          success: function(shdmg_from){
                          //console.log("shdmg_from "+JSON.stringify(shdmg_from));
                          var countv = shdmg_from.data.length;

                          var sshdmg_from= "<select id='showshdmg_from' data-role='none' class='whselect'>";
                          for(var i = 0;i<countv;i++){

                          sshdmg_from += "<option value='"+shdmg_from.data[i].code+"'>"+shdmg_from.data[i].code+" "+shdmg_from.data[i].name+"</option>";
                          }
                          sshdmg_from += "</select>";
                          document.getElementById("shdmg_from").innerHTML = sshdmg_from;
                            //$popUp1.popup("close");
                            select_shelfdmg();
                          },
                          error: function (error){
                          alertify.error(error);
                          }
                          });
                          return false;
}

//======================================================================== show sh damage ===============================================================
function sh_damage(whcode_dmg){
$.ajax({
                          url: localStorage.api_url_server+""+localStorage.api_url_searchshelf_tf,
                          data: '{"accessToken":"","refCode":"'+whcode_dmg+'","search":""}',
                          contentType: "application/json; charset=utf-8",
                          dataType: "json",
                          type: "POST",
                          cache: false,
                          success: function(shdmg){
                          //console.log("shdmg "+JSON.stringify(shdmg));
                          var countv = shdmg.data.length;

                          var sshdmg= "<select id='showshdmg' data-role='none' class='whselect'>";
                          for(var i = 0;i<countv;i++){
                            if(shdmg.data[i].code=="DMG"){
                          sshdmg += "<option value='"+shdmg.data[i].code+"'>"+shdmg.data[i].code+" "+shdmg.data[i].name+"</option>";
                          }
                          }
                          sshdmg += "</select>";
                          document.getElementById("shdmg").innerHTML = sshdmg;
                            //$popUp1.popup("close");
                            //select_shelfdmgfrom();
                          },
                          error: function (error){
                          alertify.error(error);
                          }
                          });
                          return false;
}
//===============================================================transfer damage====================================================================
function transfer_dmg(){

var whdm_from = document.getElementById("whdmg_from");
var whdmg_from = whdm_from.options[whdm_from.selectedIndex].value;
localStorage.transferdamagewh_from = whdmg_from;

var whdm = document.getElementById("whdmg");
var whdmg = whdm.options[whdm.selectedIndex].value;
localStorage.transferdamagewh_to = whdmg;


var shdm_from = document.getElementById("showshdmg_from");
var shdmg_from = shdm_from.options[shdm_from.selectedIndex].value;
localStorage.transferdamagesh_from = shdmg_from;

var shdm = document.getElementById("showshdmg");
var shdmg = shdm.options[shdm.selectedIndex].value;
localStorage.transferdamagesh_to = shdmg;

var d = confirm("ต้องการโอนสินค้าจากคลัง "+localStorage.transferdamagewh_from+" ชั้นเก็บ "+localStorage.transferdamagesh_from+" ไปยัง "+localStorage.transferdamagewh_to+" ชั้นเก็บ "+localStorage.transferdamagesh_to+"  ใช่หรือไม่ !!");
            if (d == true) {
               $.mobile.changePage("#transfer_damage_item",{transition: 'slidefade'});
            } else {
                return false;
            }
}
//========================================================get item transfer damage=============================================================================
function get_item_transfer_damage(bar){
$.ajax({
                          url: localStorage.api_url_server+""+localStorage.api_url_searchitem_tf,
                          data: '{"accessToken":"","type":"1","whCode":"'+localStorage.transferdamagewh_from+'","shelf":"'+localStorage.transferdamagesh_from+'","search":"'+bar+'"}',
                          contentType: "application/json; charset=utf-8",
                          dataType: "json",
                          type: "POST",
                          cache: false,
                          success: function(item_d){
                          console.log(item_d);
                          var item_d_list="";
                          var stock_item =0;
                          if(item_d.data[0].stkRemain==0){
                            item_d_list += "<p>ชื่อสินค้า : "+item_d.data[0].itemName+"</p>";
                            item_d_list += "<p>หน่วยนับ : "+item_d.data[0].unitCode+"</p>";
                            item_d_list += "<p style='color:red;'>จำนวนคงเหลือ : ไม่มีสินค้า</p>";
                            item_d_list += "<p style='color:red; text-align:center;'>** สินค้าไม่พอสำหรับการโอน **</p>";
                            }else{
                            item_d_list += "<p>ชื่อสินค้า : "+item_d.data[0].itemName+"</p>";
                            item_d_list += "<p>หน่วยนับ : "+item_d.data[0].unitCode+"</p>";
                            item_d_list += "<p>จำนวนคงเหลือ : "+item_d.data[0].stkRemain+"</p>";
                            }
                            stock_item_d = item_d.data[0].stkRemain;
                            localStorage.transferBarcode_d =item_d.data[0].barCode;
                            localStorage.transferItemcode_d =item_d.data[0].itemCode;

                          document.getElementById("stock_show_d").value = stock_item_d;
                          document.getElementById("item_show_d").innerHTML = item_d_list;
                          $('#amount_damage').focus();


                          },
                          error: function (error){
                          alertify.error("error");
                          }
                          });
}
//======================================================submit transfer normal==================================================================================
function submit_transfer_damage(){
var amountdamage = document.getElementById("amount_damage").value;
var stockdamage = document.getElementById("stock_show_d").value;
if(amountdamage==""||amountdamage==null){
alertify.error("กรุณากรอกจำนวนที่ต้องการ");
  $('#amount_damage_item').focus();
}else if(parseInt(amountdamage) > parseInt(stockdamage)){
alertify.error("กรุณากรอกจำนวนที่ถูกต้อง !!");
return false;
}else{
if(localStorage.transferstatus=="0"){
$.ajax({
                          url: localStorage.api_url_server+""+localStorage.api_url_insert_tf,
                          data: '{"accessToken":"","docNo":"","docDate":"'+date+'","isCompleteSave":"0","creatorCode":"'+localStorage.username+'","refNo":""}',
                          contentType: "application/json; charset=utf-8",
                          dataType: "json",
                          type: "POST",
                          cache: false,
                          success: function(trf_h){
                          console.log(trf_h);
                          localStorage.transferdamage = trf_h.docNo;

                          $.ajax({
                                                    url: localStorage.api_url_server+""+ localStorage.api_url_manageitem_tf,
                                                    data: '{"accessToken":"","docNo":"'+localStorage.transferdamage+'","barCode":"'+localStorage.transferBarcode_d+'","itemCode":"'+localStorage.transferItemcode_d+'","docDate":"'+date+'","fromWHCode":"'+localStorage.transferdamagewh_from+'","fromShelfCode":"'+localStorage.transferdamagesh_from+'","toWHCode":"'+localStorage.transferdamagewh_to+'","toShelfCode":"'+localStorage.transferdamagesh_to+'","qty":"'+amountdamage+'","refNo":"","isCancel":"0"}',
                                                    contentType: "application/json; charset=utf-8",
                                                    dataType: "json",
                                                    type: "POST",
                                                    cache: false,
                                                    success: function(trf_i){
                                                    console.log(trf_i);
                                                    alertify.success("บันทึกข้อมูลเรียบร้อยแล้ว"+localStorage.transferdamage);
                                                    localStorage.transferstatus="1";
                                                    document.getElementById("amount_damage").value="";
                                                    search_detaildamage(localStorage.transferdamage)
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
                                                    url: localStorage.api_url_server+""+ localStorage.api_url_manageitem_tf,
                                                    data: '{"accessToken":"","docNo":"'+localStorage.transferdamage+'","barCode":"'+localStorage.transferBarcode_d+'","itemCode":"'+localStorage.transferItemcode_d+'","docDate":"'+date+'","fromWHCode":"'+localStorage.transferdamagewh_from+'","fromShelfCode":"'+localStorage.transferdamagesh_from+'","toWHCode":"'+localStorage.transferdamagewh_to+'","toShelfCode":"'+localStorage.transferdamagesh_to+'","qty":"'+amountdamage+'","refNo":"","isCancel":"0"}',
                                                    contentType: "application/json; charset=utf-8",
                                                    dataType: "json",
                                                    type: "POST",
                                                    cache: false,
                                                    success: function(trf_i){
                                                    console.log(trf_i);
                                                    alertify.success("บันทึกข้อมูลเรียบร้อยแล้ว"+localStorage.transferdamage);
                                                    localStorage.transferstatus="1";
                                                    document.getElementById("amount_damage").value="";
                                                    search_detaildamage(localStorage.transferdamage)
                                                    //$.mobile.changePage("#transferup",{transition: 'slidefade'});


                                                    },
                                                    error: function (error){
                                                    alertify.error("error");
                                                    }
                                                    });

}
}
}
//=============================================================================================== save transfer normal =========================================================
function save_damage(){
if( localStorage.transferstatus=="1"){
$.ajax({
                          url: localStorage.api_url_server+""+localStorage.api_url_insert_tf,
                          data: '{"accessToken":"","docNo":"'+localStorage.transferdamage+'","docDate":"'+date+'","isCompleteSave":"1","creatorCode":"'+localStorage.username+'","refNo":""}',
                          contentType: "application/json; charset=utf-8",
                          dataType: "json",
                          type: "POST",
                          cache: false,
                          success: function(s_tfn){
                          console.log(s_tfn);
                          localStorage.transferdamage = "";
                          localStorage.transferstatus = "0";
                          search_tf();
                          $.mobile.changePage("#transferlist",{transition: 'slidefade'});
                          alertify.success("บันทึกใบโอนสินค้าเรียบร้อยแล้ว");
                          },
                          error: function (error){
                          alertify.error("error");
                          }
                          });
}else{
alertify.error("ใบโอนสินค้าถูกบันทึกแล้ว");
}
}
//======================================== check cancel damage ===========================================================
function check_cancel_damage(){
if(localStorage.transferstatus=="1"){
$.mobile.changePage("#transfer_damage_detail",{transition: 'slidefade',reverse: true});
}else{
$.mobile.changePage("#transfer_damage",{transition: 'slidefade',reverse: true});
}

}
//==================================== check status damage==============================================================================
function checkstatus_damage(){
if(localStorage.transferstatus=="1"){
alertify.error("ท่านยังไม่ได้บันทึกใบโอนสินค้ากรุณาบันทึกก่อน");
return false;
}else{
$.mobile.changePage("#transfer_damage",{transition: 'slidefade',reverse: true});
}
}
//========================================================= focus ========================================================
function amountdamage_focus(){
    $("#transfer_damage_item").bind('pageshow', function() {
        $('#amount_damage').focus();
    });
}
