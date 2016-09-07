function wh_normal(){
$.ajax({
                          url: localStorage.api_url_server+""+localStorage.api_url_searchwh_tf,
                          data: '{"accessToken":"","type":"0","search":""}',
                          contentType: "application/json; charset=utf-8",
                          dataType: "json",
                          type: "POST",
                          cache: false,
                          success: function(whnormal){
                          console.log("whnormal "+JSON.stringify(whnormal));
                          var counts = whnormal.data.length;


                          var wh_normal_up= "<select id='whnormal_up' class='whselect' data-role='none' onchange='select_shelfnormalup(this)'>";
                          var wh_normal_down= "<select id='whnormal_down' class='whselect' data-role='none'  onchange='select_shelfnormaldown(this)'>";
                            var loname = "";
                          for(var i = 0;i<counts;i++){

                            if(whnormal.data[i].location == null){
                                loname = "-";
                            }else{
                                loname = whnormal.data[i].location;
                            }
                          wh_normal_up += "<option value='"+whnormal.data[i].code+"'>"+whnormal.data[i].name+" "+loname+"</option>";
                          wh_normal_down += "<option value='"+whnormal.data[i].code+"'>"+whnormal.data[i].name+" "+loname+"</option>";

                          }
                          wh_normal_up += "</select>";
                          wh_normal_down += "</select>";
                          document.getElementById("wh_normaleup").innerHTML = wh_normal_up;
                          document.getElementById("wh_normaledown").innerHTML = wh_normal_down;

                          select_shelfnormalup();

                          },
                          error: function (error){
                          alertify.error(error);
                          }
                          });
                          return false;
}

//======================================================================== select sh normal up ===============================================================
function select_shelfnormalup(whnormal_up){
var snormal_up = "";
if(whnormal_up){
snormal_up = whnormal_up.value;
}else{
var sn_up = document.getElementById("whnormal_up");
snormal_up = sn_up.options[sn_up.selectedIndex].value;
}
sh_normal_up(snormal_up);
}
//======================================================================== select sh normal down ===============================================================
function select_shelfnormaldown(whnormal_down){
var snormal_down = "";
if(whnormal_down){
snormal_down = whnormal_down.value;
}else{
var sn_down = document.getElementById("whnormal_down");
snormal_down = sn_down.options[sn_down.selectedIndex].value;
}
sh_normal_down(snormal_down);
}
//======================================================================== show sh normal up ===============================================================
function sh_normal_up(whcode_upn){
$.ajax({
                          url: localStorage.api_url_server+""+localStorage.api_url_searchshelf_tf,
                          data: '{"accessToken":"","refCode":"'+whcode_upn+'","search":""}',
                          contentType: "application/json; charset=utf-8",
                          dataType: "json",
                          type: "POST",
                          cache: false,
                          success: function(shnormal_up){
                          console.log("shnormal_up "+JSON.stringify(shnormal_up));
                          var countv = shnormal_up.data.length;

                          var sshnormal_up= "<select id='showshnormal_up' data-role='none' class='whselect'>";
                          for(var i = 0;i<countv;i++){

                          sshnormal_up += "<option value='"+shnormal_up.data[i].code+"'>"+shnormal_up.data[i].code+" "+shnormal_up.data[i].name+"</option>";
                          }
                          sshnormal_up += "</select>";
                          document.getElementById("shnormal_up").innerHTML = sshnormal_up;
                            //$popUp1.popup("close");
                            select_shelfnormaldown();
                          },
                          error: function (error){
                          alertify.error(error);
                          }
                          });
                          return false;
}
//======================================================================== show sh normal down ===============================================================
function sh_normal_down(whcode_downn){
$.ajax({
                          url: localStorage.api_url_server+""+localStorage.api_url_searchshelf_tf,
                          data: '{"accessToken":"","refCode":"'+whcode_downn+'","search":""}',
                          contentType: "application/json; charset=utf-8",
                          dataType: "json",
                          type: "POST",
                          cache: false,
                          success: function(shnormal_down){
                          console.log("shnormal_down "+JSON.stringify(shnormal_down));
                          var countv = shnormal_down.data.length;

                          var sshnormal_down= "<select id='showshnormal_down' data-role='none' class='whselect'>";
                          for(var i = 0;i<countv;i++){
                          sshnormal_down += "<option value='"+shnormal_down.data[i].code+"'>"+shnormal_down.data[i].code+" "+shnormal_down.data[i].name+"</option>";
                          }
                          sshnormal_down += "</select>";
                          document.getElementById("shnormal_down").innerHTML = sshnormal_down;
                          $.mobile.changePage('#transfer_normal',{transition: 'slidefade',reverse: true});
                          },
                          error: function (error){
                          alertify.error(error);
                          }
                          });
                          return false;

}
//===============================================================transfer normal====================================================================
function transfer_normal(){

var whn_from = document.getElementById("whnormal_up");
var whns_from = whn_from.options[whn_from.selectedIndex].value;
localStorage.transfernormalwh_from = whns_from;

var whn_to = document.getElementById("whnormal_down");
var whns_to = whn_to.options[whn_to.selectedIndex].value;
localStorage.transfernormalwh_to = whns_to;


var swhn_to = document.getElementById("showshnormal_up");
var shn_from = swhn_to.options[swhn_to.selectedIndex].value;
localStorage.transfernormalsh_from = shn_from;

var vwhn_from = document.getElementById("showshnormal_down");
var shn_to = vwhn_from.options[vwhn_from.selectedIndex].value;
localStorage.transfernormalsh_to = shn_to;

var d = confirm("ต้องการโอนสินค้าจากคลัง "+localStorage.transfernormalwh_from+" ชั้นเก็บ "+localStorage.transfernormalsh_from+" ไปยัง "+localStorage.transfernormalwh_to+" ชั้นเก็บ "+localStorage.transfernormalsh_to+"  ใช่หรือไม่ !!");
            if (d == true) {
               $.mobile.changePage("#transfer_normal_item",{transition: 'slidefade'});
            } else {
                return false;
            }
}
//========================================================get item transfer normal=============================================================================
function get_item_transfer(bar){
$.ajax({
                          url: localStorage.api_url_server+""+localStorage.api_url_searchitem_tf,
                          data: '{"accessToken":"","type":"1","whCode":"'+localStorage.transfernormalwh_from+'","shelf":"'+localStorage.transfernormalsh_from+'","search":"'+bar+'"}',
                          contentType: "application/json; charset=utf-8",
                          dataType: "json",
                          type: "POST",
                          cache: false,
                          success: function(item_n){
                          console.log(item_n);
                          var item_n_list="";
                          var stock_item =0;
                          if(item_n.data[0].stkRemain==0){
                            item_n_list += "<p>ชื่อสินค้า : "+item_n.data[0].itemName+"</p>";
                            item_n_list += "<p>หน่วยนับ : "+item_n.data[0].unitCode+"</p>";
                            item_n_list += "<p style='color:red;'>จำนวนคงเหลือ : ไม่มีสินค้า</p>";
                            item_n_list += "<p style='color:red; text-align:center;'>** สินค้าไม่พอสำหรับการโอน **</p>";
                            }else{
                            item_n_list += "<p>ชื่อสินค้า : "+item_n.data[0].itemName+"</p>";
                            item_n_list += "<p>หน่วยนับ : "+item_n.data[0].unitCode+"</p>";
                            item_n_list += "<p>จำนวนคงเหลือ : "+item_n.data[0].stkRemain+"</p>";
                            }
                            stock_item = item_n.data[0].stkRemain;
                            localStorage.transferBarcode =item_n.data[0].barCode;
                            localStorage.transferItemcode =item_n.data[0].itemCode;

                          document.getElementById("stock_show_n").value = stock_item;
                          document.getElementById("item_show_n").innerHTML = item_n_list;
                          $('#amount_n_item').focus();


                          },
                          error: function (error){
                          alertify.error("error");
                          }
                          });
}

//======================================================submit transfer normal==================================================================================
function submit_transfernormal(){
var amountnormal = document.getElementById("amount_n_item").value;
var stocknormal = document.getElementById("stock_show_n").value;
if(amountnormal==""||amountnormal==null){
alertify.error("กรุณากรอกจำนวนที่ต้องการ");
  $('#amount_normal_item').focus();
}else if(parseInt(amountnormal) > parseInt(stocknormal)){
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
                          localStorage.transferNo = trf_h.docNo;

                          $.ajax({
                                                    url: localStorage.api_url_server+""+ localStorage.api_url_manageitem_tf,
                                                    data: '{"accessToken":"","docNo":"'+localStorage.transferNo+'","barCode":"'+localStorage.transferBarcode+'","itemCode":"'+localStorage.transferItemcode+'","docDate":"'+date+'","fromWHCode":"'+localStorage.transfernormalwh_from+'","fromShelfCode":"'+localStorage.transfernormalsh_from+'","toWHCode":"'+localStorage.transfernormalwh_to+'","toShelfCode":"'+localStorage.transfernormalsh_to+'","qty":"'+amountnormal+'","refNo":"","isCancel":"0"}',
                                                    contentType: "application/json; charset=utf-8",
                                                    dataType: "json",
                                                    type: "POST",
                                                    cache: false,
                                                    success: function(trf_i){
                                                    console.log(trf_i);
                                                    alertify.success("บันทึกข้อมูลเรียบร้อยแล้ว"+localStorage.transferNo);
                                                    localStorage.transferstatus="1";
                                                    document.getElementById("amount_normal_item").value ="";
                                                    search_detailnormal(localStorage.transferNo)
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

}
}
}