function wh_normal(){
$.ajax({
                          url: localStorage.api_url_server+""+localStorage.api_url_searchwh_tf,
                          data: '{"accessToken":"'+localStorage.token+'","type":"0","search":""}',
                          contentType: "application/json; charset=utf-8",
                          dataType: "json",
                          type: "POST",
                          cache: false,
                          success: function(whnormal){
                      //    console.log("whnormal "+JSON.stringify(whnormal));
                      //    var counts = whnormal.data.length;



                          var wh_normal_up = "<select id='whnormal_up' class='whselect' data-role='none' onchange='select_shelfnormalup(this)'>";
                          var wh_normal_down = "<select id='whnormal_down' class='whselect' data-role='none'  onchange='select_shelfnormaldown(this)'>";
                            var loname = "";

                          if(localStorage.branch == "S01"){
                            $.each( whnormal.data , function(key, val) {
                                  var n = val['code'].includes("1");
                                  if(n==true){
                                      if(val['location'] == null){
                                          loname = "-";
                                      }else{
                                          loname = val['location'];
                                      }

                                      var d = val['code'].includes("-A");
                                      if(d==true){
                                        wh_normal_up += "<option value='"+val['code']+"' selected='selected'>"+val['code']+" "+val['name']+"</option>";
                                        wh_normal_down += "<option value='"+val['code']+"' selected='selected'>"+val['code']+" "+val['name']+"</option>";
                                      }else{
                                          wh_normal_up += "<option value='"+val['code']+"'>"+val['code']+" "+val['name']+"</option>";
                                          wh_normal_down += "<option value='"+val['code']+"'>"+val['code']+" "+val['code']+"</option>";
                                      }
                                  }
                             });
                          }else
                          if(localStorage.branch == "S02"){
                            $.each( whnormal.data , function(key, val) {
                                  var n = val['code'].includes("2");
                                  if(n==true){
                                      if(val['location'] == null){
                                          loname = "-";
                                      }else{
                                          loname = val['location'];
                                      }
                                      var d = val['code'].includes("-A");
                                      if(d==true){
                                        wh_normal_up += "<option value='"+val['code']+"' selected='selected'>"+val['code']+" "+val['name']+"</option>";
                                        wh_normal_down += "<option value='"+val['code']+"' selected='selected'>"+val['code']+" "+val['name']+"</option>";
                                      }else{
                                        wh_normal_up += "<option value='"+val['code']+"'>"+val['code']+" "+val['name']+"</option>";
                                        wh_normal_down += "<option value='"+val['code']+"'>"+val['code']+" "+val['code']+"</option>";
                                      }
                                  }
                             });
                          }
                          /*for(var i = 0;i<counts;i++){

                            if(whnormal.data[i].location == null){
                                loname = "-";
                            }else{
                                loname = whnormal.data[i].location;
                            }
                          wh_normal_up += "<option value='"+whnormal.data[i].code+"'>"+whnormal.data[i].code+" "+whnormal.data[i].name+"</option>";

                          wh_normal_down += "<option value='"+whnormal.data[i].code+"'>"+whnormal.data[i].code+" "+whnormal.data[i].name+"</option>";

                          }*/
                          wh_normal_up += "</select>";
                          wh_normal_down += "</select>";
                          //console.log(wh_normal_up);
                          document.getElementById("wh_normaleup").innerHTML = wh_normal_up;
                          document.getElementById("wh_normaledown").innerHTML = wh_normal_down;

                          select_shelfnormalup();

                          },
                          error: function (error){
                          switch_url();
                          wh_normal();
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
//$("#whnormal_down").children("option[value=" +snormal_up+ "]").hide();
console.log(snormal_up);
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
                          data: '{"accessToken":"'+localStorage.token+'","refCode":"'+whcode_upn+'","search":""}',
                          contentType: "application/json; charset=utf-8",
                          dataType: "json",
                          type: "POST",
                          cache: false,
                          success: function(shnormal_up){
                          //console.log("shnormal_up "+JSON.stringify(shnormal_up));
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
                          switch_url();
                          sh_normal_up(whcode_upn);
                          }
                          });
                          return false;
}
//======================================================================== show sh normal down ===============================================================
function sh_normal_down(whcode_downn){
$.ajax({
                          url: localStorage.api_url_server+""+localStorage.api_url_searchshelf_tf,
                          data: '{"accessToken":"'+localStorage.token+'","refCode":"'+whcode_downn+'","search":""}',
                          contentType: "application/json; charset=utf-8",
                          dataType: "json",
                          type: "POST",
                          cache: false,
                          success: function(shnormal_down){
                          //console.log("shnormal_down "+JSON.stringify(shnormal_down));
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
                          switch_url();
                          sh_normal_down(whcode_downn);
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
               $.mobile.changePage("#transfer_normal_people",{transition: 'slidefade'});
               s_people_focus();
            } else {
                return false;
            }
}
//========================================================get item transfer normal=============================================================================
function get_item_transfer_normal(bar){
//alert(localStorage.transferstatus_n)
$.ajax({
                          url: localStorage.api_url_server+""+localStorage.api_url_searchitem_tf,
                          data: '{"accessToken":"'+localStorage.token+'","type":"1","whCode":"'+localStorage.transfernormalwh_from+'","shelf":"'+localStorage.transfernormalsh_from+'","search":"'+bar+'"}',
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
                            stock_item_n = item_n.data[0].stkRemain;
                            localStorage.transferBarcode_n =item_n.data[0].barCode;
                            localStorage.transferItemcode_n =item_n.data[0].itemCode;

                          document.getElementById("stock_show_n").value = stock_item_n;
                          document.getElementById("item_show_n").innerHTML = item_n_list;
                          $('#amount_n_item').focus();


                          },
                          error: function (error){
                          switch_url();
                          get_item_transfer_normal(bar);
                          }
                          });
}

//======================================================submit transfer normal==================================================================================
function submit_transfer_normal(){
var amountnormal = document.getElementById("amount_n_item").value;
var stocknormal = document.getElementById("stock_show_n").value;
if(amountnormal==""||amountnormal==null){
alertify.error("กรุณากรอกจำนวนที่ต้องการ");
  $('#amount_normal_item').focus();
}else if(parseInt(amountnormal) > parseInt(stocknormal)){
alertify.error("กรุณากรอกจำนวนที่ถูกต้อง !!");
return false;
}else{
if(localStorage.transferstatus_n=="0"){

        $.ajax({
                url: localStorage.api_url_server+"NPReceiveWs/trn/v2/gendocno",
                data: '{"accessToken":"'+localStorage.token+'","module":"","tableName":"BCSTKTRANSFER","type":"","header":"'+localStorage.profit.toUpperCase()+'-TH"}',
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                type: "POST",
                cache: false,
                success: function(trn_dc){
                console.log(trn_dc);
                localStorage.transferNo_n = trn_dc.data;
                console.log('{"accessToken":"'+localStorage.token+'","docNo":"'+trn_dc.data+'","docDate":"'+date+'","isCompleteSave":"0","creatorCode":"'+localStorage.username+'","refNo":"","docType":"6","myDescription":"","confirmCode":""}');
                $.ajax({
                          url: localStorage.api_url_server+""+localStorage.api_url_insert_tf,
                          data: '{"accessToken":"'+localStorage.token+'","docNo":"'+trn_dc.data+'","docDate":"'+date+'","isCompleteSave":"0","creatorCode":"'+localStorage.username+'","refNo":"","docType":"6","myDescription":"","confirmCode":""}',
                          contentType: "application/json; charset=utf-8",
                          dataType: "json",
                          type: "POST",
                          cache: false,
                          success: function(trf_h){
                          console.log(trf_h);
                          $.ajax({
                                                    url: localStorage.api_url_server+""+ localStorage.api_url_manageitem_tf,
                                                    data: '{"accessToken":"'+localStorage.token+'","docNo":"'+localStorage.transferNo_n+'","barCode":"'+localStorage.transferBarcode_n+'","itemCode":"'+localStorage.transferItemcode_n+'","docDate":"'+date+'","fromWHCode":"'+localStorage.transfernormalwh_from+'","fromShelfCode":"'+localStorage.transfernormalsh_from+'","toWHCode":"'+localStorage.transfernormalwh_to+'","toShelfCode":"'+localStorage.transfernormalsh_to+'","qty":"'+amountnormal+'","refNo":"","isCancel":"0","pickCode":"'+localStorage.person+'"}',
                                                    contentType: "application/json; charset=utf-8",
                                                    dataType: "json",
                                                    type: "POST",
                                                    cache: false,
                                                    success: function(trf_i){
                                                    console.log(trf_i);
                                                    console.log("บันทึกข้อมูลเรียบร้อยแล้ว "+localStorage.transferNo_n);
                                                    localStorage.transferstatus_n="1";
                                                    document.getElementById("amount_n_item").value="";
                                                    document.getElementById("item_show_n").innerHTML="";
                                                    document.getElementById("stock_show_n").value="";

                                                    search_detailnormal(localStorage.transferNo_n)
                                                    //$.mobile.changePage("#transferup",{transition: 'slidefade'});


                                                    },
                                                    error: function (error){
                                                    switch_url();
                                                    submit_transfer_normal();
                                                    }
                                                    });
                          },
                          error: function (error){
                          switch_url();
                          submit_transfer_normal();
                          }
                          });
                },
                error: function (error){
                switch_url();
                submit_transfer_normal();
                }
                });
}else{
                          $.ajax({
                                                    url: localStorage.api_url_server+""+ localStorage.api_url_manageitem_tf,
                                                    data: '{"accessToken":"'+localStorage.token+'","docNo":"'+localStorage.transferNo_n+'","barCode":"'+localStorage.transferBarcode_n+'","itemCode":"'+localStorage.transferItemcode_n+'","docDate":"'+date+'","fromWHCode":"'+localStorage.transfernormalwh_from+'","fromShelfCode":"'+localStorage.transfernormalsh_from+'","toWHCode":"'+localStorage.transfernormalwh_to+'","toShelfCode":"'+localStorage.transfernormalsh_to+'","qty":"'+amountnormal+'","refNo":"","isCancel":"0","pickCode":"'+localStorage.person+'"}',
                                                    contentType: "application/json; charset=utf-8",
                                                    dataType: "json",
                                                    type: "POST",
                                                    cache: false,
                                                    success: function(trf_i){
                                                    console.log(trf_i);
                                                    console.log("บันทึกข้อมูลเรียบร้อยแล้ว "+localStorage.transferNo_n);
                                                    localStorage.transferstatus_n="1";
                                                    document.getElementById("amount_n_item").value="";
                                                    search_detailnormal(localStorage.transferNo_n)
                                                    //$.mobile.changePage("#transferup",{transition: 'slidefade'});


                                                    },
                                                    error: function (error){
                                                    switch_url();
                                                    submit_transfer_normal();
                                                    }
                                                    });

}

/*$.ajax({
                          url: localStorage.api_url_server+""+localStorage.api_url_insert_tf,
                          data: '{"accessToken":"'+localStorage.token+'","docNo":"","docDate":"'+date+'","isCompleteSave":"0","creatorCode":"'+localStorage.username+'","refNo":"","docType":"6","myDescription":"","confirmCode":""}',
                          contentType: "application/json; charset=utf-8",
                          dataType: "json",
                          type: "POST",
                          cache: false,
                          success: function(trf_h){
                          console.log(trf_h);
                          localStorage.transferNo_n = trf_h.docNo;

                          $.ajax({
                                                    url: localStorage.api_url_server+""+ localStorage.api_url_manageitem_tf,
                                                    data: '{"accessToken":"'+localStorage.token+'","docNo":"'+localStorage.transferNo_n+'","barCode":"'+localStorage.transferBarcode_n+'","itemCode":"'+localStorage.transferItemcode_n+'","docDate":"'+date+'","fromWHCode":"'+localStorage.transfernormalwh_from+'","fromShelfCode":"'+localStorage.transfernormalsh_from+'","toWHCode":"'+localStorage.transfernormalwh_to+'","toShelfCode":"'+localStorage.transfernormalsh_to+'","qty":"'+amountnormal+'","refNo":"","isCancel":"0","pickCode":"'+localStorage.person+'"}',
                                                    contentType: "application/json; charset=utf-8",
                                                    dataType: "json",
                                                    type: "POST",
                                                    cache: false,
                                                    success: function(trf_i){
                                                    console.log(trf_i);
                                                    console.log("บันทึกข้อมูลเรียบร้อยแล้ว "+localStorage.transferNo_n);
                                                    localStorage.transferstatus_n="1";
                                                    document.getElementById("amount_n_item").value="";
                                                    document.getElementById("item_show_n").innerHTML="";
                                                    document.getElementById("stock_show_n").value="";

                                                    search_detailnormal(localStorage.transferNo_n)
                                                    //$.mobile.changePage("#transferup",{transition: 'slidefade'});


                                                    },
                                                    error: function (error){
                                                    alertify.error("network error!!");
                                                    }
                                                    });
                          },
                          error: function (error){
                          alertify.error("network error!!");
                          }
                          });
}else{
                          $.ajax({
                                                    url: localStorage.api_url_server+""+ localStorage.api_url_manageitem_tf,
                                                    data: '{"accessToken":"'+localStorage.token+'","docNo":"'+localStorage.transferNo_n+'","barCode":"'+localStorage.transferBarcode_n+'","itemCode":"'+localStorage.transferItemcode_n+'","docDate":"'+date+'","fromWHCode":"'+localStorage.transfernormalwh_from+'","fromShelfCode":"'+localStorage.transfernormalsh_from+'","toWHCode":"'+localStorage.transfernormalwh_to+'","toShelfCode":"'+localStorage.transfernormalsh_to+'","qty":"'+amountnormal+'","refNo":"","isCancel":"0","pickCode":"'+localStorage.person+'"}',
                                                    contentType: "application/json; charset=utf-8",
                                                    dataType: "json",
                                                    type: "POST",
                                                    cache: false,
                                                    success: function(trf_i){
                                                    console.log(trf_i);
                                                    console.log("บันทึกข้อมูลเรียบร้อยแล้ว "+localStorage.transferNo_n);
                                                    localStorage.transferstatus_n="1";
                                                    document.getElementById("amount_n_item").value="";
                                                    search_detailnormal(localStorage.transferNo_n)
                                                    //$.mobile.changePage("#transferup",{transition: 'slidefade'});


                                                    },
                                                    error: function (error){
                                                    alertify.error("network error!!");
                                                    }
                                                    });

}*/
}
}
//========================================================= search detail normal====================================================================
function search_detailnormal(tfNo){
$.ajax({
                          url: localStorage.api_url_server+""+localStorage.api_url_searchdetail_tf,
                          data: '{"accessToken":"'+localStorage.token+'","type":"","search":"'+tfNo+'"}',
                          contentType: "application/json; charset=utf-8",
                          dataType: "json",
                          type: "POST",
                          cache: false,
                          success: function(tf_n){
                          console.log(tf_n);
                          var tfnh_show = "<p>เลขที่เอกสาร n : "+tf_n.docNo+"</p>";
                          tfnh_show += "<p>วันที่ทำเอกสาร : "+tf_n.docDate+"</p>";
                          tfnh_show += "<p>มูลค่ารวม : "+tf_n.sumOfAmount+" บาท</p>";

                          var count = tf_n.data.length;
                          var tfnd_show = '<hr>';
                          tfnd_show += '<label><div class="ui-grid-c" style="text-align:center;  font-size:14px;">';
                          tfnd_show += '<div class="ui-block-a"><b>สินค้า</b></div>';
                          tfnd_show += '<div class="ui-block-b"><b>จำนวน</b></div>';
                          tfnd_show += '<div class="ui-block-c"><b>จากคลัง/ชั้นเก็บ</b></div>';
                          tfnd_show += '<div class="ui-block-d"><b>เข้าคลัง/ชั้นเก็บ</b></div>';
                          tfnd_show += '</div></label><hr>';

                          for(var i = 0;i<count;i++){
                          //tfnd_show += '<div class="ui-grid-c" style="text-align:center; font-size:12px;">';
                            if(tf_n.data[i].isCancel =="0"){
                                    tfnd_show += '<div class="ui-grid-c todo-cancelitemtransfern" data-cancelitemn-id="'+tf_n.data[i].barCode+'" data-cancelitemnrow-id="x'+tf_n.data[i].itemCode+'" id="x'+tf_n.data[i].itemCode+'" icode="'+tf_n.data[i].itemCode+'" bcode="'+tf_n.data[i].barCode+'" whfrom="'+tf_n.data[i].fromWH+'" shfrom="'+tf_n.data[i].fromShelf+'" whto="'+tf_n.data[i].toWH+'" shto="'+tf_n.data[i].toShelf+'" tfno="'+tf_n.docNo+'" rfno="'+tf_n.refDocNo+'" tfamount="'+tf_n.data[i].qty+'" style="text-align:center; font-size:12px;">';
                            }else{
                                    tfnd_show += '<div class="ui-grid-c todo-uncancelitemtransfernnosave blur" data-uncancelitemn-id="'+tf_n.data[i].barCode+'" data-uncancelitemrownn-id="z'+tf_n.data[i].itemCode+'" id="z'+tf_n.data[i].itemCode+'" icode="'+tf_n.data[i].itemCode+'" bcode="'+tf_n.data[i].barCode+'" whfrom="'+tf_n.data[i].fromWH+'" shfrom="'+tf_n.data[i].fromShelf+'" whto="'+tf_n.data[i].toWH+'" shto="'+tf_n.data[i].toShelf+'" tfno="'+tf_n.docNo+'" rfno="'+tf_n.refDocNo+'" tfamount="0" style="text-align:center; font-size:12px; color:#ccc;">';
                            }
                           //tfnd_show += "<p>"+tf_n.data[i].itemCode+"</a>";
                           tfnd_show += '<div class="ui-block-a">'+tf_n.data[i].itemName+'</div>';
                           tfnd_show += '<div class="ui-block-b"> '+tf_n.data[i].qty+' '+tf_n.data[i].unitCode+' </div>';
                           tfnd_show += '<div class="ui-block-c"> '+tf_n.data[i].fromWH+'/'+tf_n.data[i].fromShelf+'</div>';
                           tfnd_show += '<div class="ui-block-d"> '+tf_n.data[i].toWH+'/'+tf_n.data[i].toShelf+'</div></div><hr>';

                          }
                          tfnd_show += '</div>';

                          document.getElementById("show_hdetail_tfn").innerHTML = tfnh_show;
                          document.getElementById("show_detail_tfn").innerHTML = tfnd_show;
                          $.mobile.changePage("#transfer_normal_detail",{transition: 'slidefade'});

                          },
                          error: function (error){
                          switch_url();
                          search_detailnormal(tfNo);
                          }
                          });

}
//=============================================================================================== save transfer normal =========================================================
function save_normal(){
if(localStorage.transferstatus_n=="1"){
 if( document.getElementById("show_confirm").value == ""){
                          alertify.error("ผู้อนุมันติไม่สามารถยืนยันได้");
                          return false;
                          }else{
$.ajax({
                          url: localStorage.api_url_server+""+localStorage.api_url_insert_tf,
                          data: '{"accessToken":"'+localStorage.token+'","docNo":"'+localStorage.transferNo_n+'","docDate":"'+date+'","isCompleteSave":"1","creatorCode":"'+localStorage.username+'","refNo":"","docType":"6","myDescription":"'+localStorage.description+'","confirmCode":"'+document.getElementById('show_confirm').value+'"}',
                          contentType: "application/json; charset=utf-8",
                          dataType: "json",
                          type: "POST",
                          cache: false,
                          success: function(s_tfn){
                          console.log(s_tfn);
                          localStorage.transferstatus_n="0";
                          localStorage.transferNo_n = "";
                          document.getElementById("show_confirm").value = "";
                          document.getElementById("item_show_n").innerHTML = "";
                          document.getElementById("confirm").innerHTML = "";
                          document.getElementById("amount_n_item").value = "";
                          document.getElementById("person_name").innerHTML = "";
                          document.getElementById("show_people").innerHTML = "";
                          document.getElementById("person").value = "";

                          search_tf();
                          $.mobile.changePage("#transferlist",{transition: 'slidefade'});
                          alertify.success("บันทึกใบโอนสินค้าเรียบร้อยแล้ว");

                          },
                          error: function (error){
                          switch_url();
                          save_normal();
                          }
                          });
                          }
}else{
alertify.error("ใบโอนสินค้าถูกบันทึกแล้ว");
}
}
//============================================get people ========================================================================================
function get_people(barcode){
document.activeElement.blur();
var bar_p ="";
if(barcode){
bar_p = barcode
}else{
bar_p = document.getElementById('person').value;
}
//alert(bar_p);
//alert(localStorage.api_url_server+" , "+barcode +" , "+localStorage.token);
$.ajax({
                          url: localStorage.api_url_server+"NPReceiveWs/trn/v2/searchsale",
                          data: '{"accessToken":"'+localStorage.token+'","type":"0","search":"'+bar_p+'"}',
                          contentType: "application/json; charset=utf-8",
                          dataType: "json",
                          type: "POST",
                          cache: false,
                          success: function(people_code){
                          console.log(people_code);
                          var cnt = people_code.listData.length;
                          if(people_code.response.isSuccess=="1"){
                            if(people_code.listData.length==0){
                                alertify.error("ผู้จ่ายสินค้าไม่ถูกต้อง");
                                document.getElementById("person").value = "";
                                document.getElementById("show_people").innerHTML = "<h4>กรุณาสแกนผู้จ่ายสินค้าอีกครั้ง</h4>";
                                document.getElementById('person_name').innerHTML ="";
                                s_people_focus();
                            }else{
                              var people_s = "";
                              for(var i = 0;i<cnt;i++){
                                 people_s += '<div class="ui-btn" onclick="select_poeple(';
                                 people_s += "'"+people_code.listData[i].code+"','"+people_code.listData[i].name+"'";
                                 people_s += ')">รหัสพนักงาน : '+people_code.listData[i].code+'';
                                 people_s += "<br> ชื่อพนักงาน : "+people_code.listData[i].name+"</div>";

                                 }
                                 document.getElementById("show_people").innerHTML = people_s ;
                          }
                          }else{
                          alertify.error("Barcode ไม่ถูกต้อง !!");
                          }

                          },
                          error: function (error){
                          switch_url();
                          get_people(barcode);
                          }
                          });



}
//=================================================get sale code ==================================================================================
function get_salecode(barcode){
//alert(localStorage.api_url_server+" , "+barcode +" , "+localStorage.token);
$.ajax({
                          url: localStorage.api_url_server+"NPReceiveWs/trn/v2/saleapprove",
                          data: '{"accessToken":"'+localStorage.token+'","type":"1","search":"'+barcode+'"}',
                          contentType: "application/json; charset=utf-8",
                          dataType: "json",
                          type: "POST",
                          cache: false,
                          success: function(salecode){
                          console.log(salecode);
                          if(salecode.response.isSuccess=="1"){
                            if(salecode.listData.length==0){
                                alertify.error("ผู้อนุมัติไม่ถูกต้อง");
                                document.getElementById("confirm").innerHTML = "<h3>กรุณาสแกนผู้อนุมัตอีกครั้ง</h3>";
                                document.getElementById("show_confirm").innerHTML = "";
                            }else{
                              var sale = "";
                                 sale += "<p>รหัสพนักงาน : "+salecode.listData[0].code+"</p>";
                                 sale += "<p>ชื่อพนักงาน : "+salecode.listData[0].name+"</p>";
                                 document.getElementById("show_confirm").value = salecode.listData[0].code;
                                 document.getElementById("confirm").innerHTML = sale;
                          }
                          }else{
                          alertify.error("Barcode ไม่ถูกต้อง !!");
                          }

                          },
                          error: function (error){
                          switch_url();
                          get_salecode(barcode);
                          }
                          });



}
//======================================================================== cancel item normal ==================================================================================

    $(document).on('taphold', '.todo-cancelitemtransfern', function() {
           // console.log("DEBUG - Go popup");
          var link_name = $(this).attr('cancelitemn-id');
          var link_id = $(this).attr('data-cancelitemnrow-id');
          var itemcode = $(this).attr('icode');
          var barcode = $(this).attr('bcode');
          var whfrom = $(this).attr('whfrom');
          var shfrom = $(this).attr('shfrom');
          var whto = $(this).attr('whto');
          var shto = $(this).attr('shto');
          var tfno = $(this).attr('tfno');
          var rfno = $(this).attr('rfno');
          var tfamount = $(this).attr('tfamount');
          var $popUp = $("<div/>").popup({
            dismissible: true,

            //theme: "a",
            transition: "pop",
            arrow: "b",
            positionTo: '#'+link_id
            }).on("popupafterclose", function () {
        //remove the popup when closing
        $(this).remove();
        }).css({
       'padding': '15%',
       'color': '#fff',
       'background': 'red'
       });
        console.log('#'+link_id);
        $("<a>", {
        text: "Hold",
        href: "#",
        onclick: 'cancel_item_transfern('+"'"+itemcode+"'"+','+"'"+barcode+"'"+','+"'"+whfrom+"'"+','+"'"+shfrom+"'"+','+"'"+whto+"'"+','+"'"+shto+"'"+','+"'"+tfno+"'"+','+"'"+rfno+"'"+','+"'"+tfamount+"'"+');'
        }).appendTo($popUp);

        $popUp.popup('open').enhanceWithin();

        });

function cancel_item_transfern(itemCode,barcode,fromwh,fromsh,towh,tosh,docno,refno,amount){

if (confirm('ต้องการยกเลิกสินค้าหรือไม่ ??')) {

$.ajax({
                          url: localStorage.api_url_server+""+localStorage.api_url_manageitem_tf,
                          data: '{"accessToken":"'+localStorage.token+'","docNo":"'+docno+'","barCode":"'+barcode+'","itemCode":"'+itemCode+'","docDate":"'+date+'","fromWHCode":"'+fromwh+'","fromShelfCode":"'+fromsh+'","toWHCode":"'+towh+'","toShelfCode":"'+tosh+'","qty":"'+amount+'","refNo":"'+refno+'","isCancel":"1"}',
                          contentType: "application/json; charset=utf-8",
                          dataType: "json",
                          type: "POST",
                          cache: false,
                          success: function(cancel_i){
                          console.log(cancel_i);
                          alertify.success("ยกเลิกสินค้าเรียบร้อยแล้ว");
                          search_detailnormal(docno);
                          },
                          error: function (error){
                          switch_url();
                          cancel_item_transfern(itemCode,barcode,fromwh,fromsh,towh,tosh,docno,refno,amount);
                          }
                          });
                          }
}
//======================================================================== uncancel item normal ==================================================================================

    $(document).on('taphold', '.todo-uncancelitemtransfernnosave', function() {
           // console.log("DEBUG - Go popup");
          var link_name = $(this).attr('data-uncancelitemn-id');
          var link_id = $(this).attr('data-uncancelitemrownn-id');
          var itemcode = $(this).attr('icode');
          var barcode = $(this).attr('bcode');
          var whfrom = $(this).attr('whfrom');
          var shfrom = $(this).attr('shfrom');
          var whto = $(this).attr('whto');
          var shto = $(this).attr('shto');
          var tfno = $(this).attr('tfno');
          var rfno = $(this).attr('rfno');
          var tfamount = $(this).attr('tfamount');
          var $popUp = $("<div/>").popup({
            dismissible: true,

            //theme: "a",
            transition: "pop",
            arrow: "b",
            positionTo: '#'+link_id
            }).on("popupafterclose", function () {
        //remove the popup when closing
        $(this).remove();
        }).css({
       'padding': '15%',
       'color': '#fff',
       'background': 'green'
       });
        console.log('#'+link_id);
        $("<a>", {
        text: "Return",
        href: "#",
        onclick: 'uncanceln_nosave('+"'"+barcode+"'"+');'
        }).appendTo($popUp);

        $popUp.popup('open').enhanceWithin();

        });
function uncanceln_nosave(b){
    if (confirm('ต้องการ return สินค้าหรือไม่ ??')) {
            get_item_transfer_normal(b);
            $.mobile.changePage("#transfer_normal_item",{transition: 'slidefade'});
            document.getElementById("amount_n_item").value = "";
            amountnormal_focus();

    }
}

function amountnormal_focus(){
    $("#transfer_normal_item").bind('pageshow', function() {
        $('#amount_n_item').focus();
    });
}

function des_focus(){
    $("#transfer_normal_des").bind('pageshow', function() {
        $('#description').focus();
    });
}


function xxxzzz(z,x,c,v,b,n,m,a,s){
alert(z+" , "+x+" , "+c+" , "+v+" , "+b+" , "+n+" , "+m+" , "+a+" , "+s)
        }
//==================================== check cancel normal==============================================================================
function check_cancel_normal(){
if(localStorage.transferstatus_n=="1"){
$.mobile.changePage("#transfer_normal_detail",{transition: 'slidefade',reverse: true});
}else{
$.mobile.changePage("#transfer_normal_people",{transition: 'slidefade',reverse: true});
}

}

//==================================== check status normal==============================================================================
function checkstatus_normal(){
if(localStorage.transferstatus_n=="1"){
alertify.error("ท่านยังไม่ได้บันทึกใบโอนสินค้ากรุณาบันทึกก่อน");
return false;
}else{
$.mobile.changePage("#transfer_normal",{transition: 'slidefade',reverse: true});
}
}
//================================================================================= save des=================================================
function save_des(){

var select_des = document.getElementById("description");
var select_dess = select_des.options[select_des.selectedIndex].value;
if(select_dess=="-"){
alertify.error("กรุณาเลือกหมายเหตุที่ต้องการ");
}else{
if(select_dess == "0"){
if(document.getElementById("description_other").value==""){
alertify.error("กรุณากรอกหมายเหตุในการโอนย้ายสินค้า !!");
}else{
localStorage.description = document.getElementById("description_other").value;
$.mobile.changePage("#transfer_normal_confirm",{transition: 'slidefade'});
document.getElementById("description").options[document.getElementById("description").selectedIndex].value = localStorage.description;
}
}else{
localStorage.description = select_dess;
$.mobile.changePage("#transfer_normal_confirm",{transition: 'slidefade'});
document.getElementById("description").options[document.getElementById("description").selectedIndex].value = localStorage.description;
//alert(localStorage.description);
}

}
}

function selectdes(dess){
if(dess.value=="0"){
document.getElementById("description_other").style.display = "block";
}else{
document.getElementById("description_other").style.display = "none";
}
}

function tus0(){
localStorage.transferstatus_n = "0";
}
function insert_des(){
$.mobile.changePage("#transfer_normal_des",{transition: 'slidefade'});
des_focus();
}
function transfer_normal_persons(){
if(document.getElementById("person").value.length == 5 && document.getElementById("person_name").innerHTML!=""){
localStorage.person = document.getElementById("person").value;
$.mobile.changePage("#transfer_normal_item",{transition: 'slidefade'});
//alert(localStorage.person);
}else{
alertify.error("กรุณากรอกข้อมูลให้ถูกต้อง");
s_people_focus();
}
}
function select_poeple(p_code,p_name){
console.log(p_code,p_name);
document.getElementById('person').value = p_code;
document.getElementById('person_name').innerHTML = "ชื่อพนักงาน :<br>"+p_name;
}
function s_people_focus(){
    $("#transfer_normal_people").bind('pageshow', function() {
        $('#person').focus();
    });
}