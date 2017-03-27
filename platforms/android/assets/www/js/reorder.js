/*
if(localStorage.profit == "np"){
    var profit = "S01";
}else{
    var profit = localStorage.profit;
}
console.log(localStorage.profit);
*/
function listreorder(){
var search = document.getElementById("search_reorder").value;
console.log('{"access_token":"'+localStorage.token+'","profit_code":"'+localStorage.profit+'","search":"'+search+'"}');

$.ajax({
                        url: localStorage.api_url_server+"ReOrderWS/reorder/search_reorder",
                        data: '{"access_token":"'+localStorage.token+'","profit_code":"'+localStorage.profit+'","search":"'+search+'"}',
                        contentType: "application/json; charset=utf-8",
                        dataType: "json",
                        type: "POST",
                        cache: false,
                        success: function(result){
                        console.log(result);
                        var reorder_list = "";
                        for(var i = 0; i < result.list_reorder.length; i++){
                            reorder_list += "<a href='#' class='ui-btn ui-corner-all ui-shadow todo-cclist' data-cancellist='cl"+result.list_reorder[i].doc_no+"' data-cancelistcode='"+result.list_reorder[i].doc_no+"' id='cl"+result.list_reorder[i].doc_no+"'";
                            reorder_list += 'onclick="reorder_detail('+"'"+result.list_reorder[i].doc_no+"'"+')">'+result.list_reorder[i].doc_no+' '+result.list_reorder[i].work_man+'<br>'+result.list_reorder[i].doc_no+'</a>';
                        }
                        document.getElementById("list_reorder").innerHTML = reorder_list;
                        $.mobile.changePage('#listreorder',{transition: 'slidefade'});
                        },
                        error: function (error){
                        switch_url();
                        listreorder();
                        }
                        });



}

function searchitem_wt(){
getItemReorder(document.getElementById("itemcode").value);
}

function getItemReorder(search){
document.activeElement.blur();

	$.ajax({
                        url: localStorage.api_url_server+"ReOrderWS/reorder/itemdetails",
                        data: '{"access_token":"'+localStorage.token+'","profit_code":"S01","search":"'+search+'"}',
                        contentType: "application/json; charset=utf-8",
                        dataType: "json",
                        type: "POST",
                        cache: false,
                        success: function(result){
                        console.log(result);
                        if(result.item_code == "" || result.item_code == null){
                        alertify.error("บาร์โค๊ดไม่ถูกต้อง !!")
                        }else{
                        document.getElementById("itemname").value =  result.item_name;
                        document.getElementById("itemcode").value =  result.item_code;
                        document.getElementById("itemprice").value =  result.item_price;
                        document.getElementById("unitcode").value =  result.item_unit_code;
                        document.getElementById("buypoint").value =  result.order_point;
                        document.getElementById("min").value =  result.stock_min;
                        document.getElementById("max").value =  result.stock_max;
                        document.getElementById("balance").value =  result.stockQty;
                        document.getElementById("po").value =  result.po_remain;
                        document.getElementById("sale3m").value =  result.sum_cashsale_3month;
                        document.getElementById("frequency").value =  result.freq_3month;
                        document.getElementById("buy").value =  result.pr_qty;

                        var stk_show ='<div class="row" style="font-size:14px; background:#ccc; border-radius:5px;">';
                            stk_show +='<div class="col-md-8 col-xs-8" style="background:#ccf; border-radius:5px;">';
                            stk_show +='<div class="row">';
                            stk_show +='<div class="col-md-6 col-xs-6">คลัง</div>';
                            stk_show +='<div class="col-md-6 col-xs-6">คงเหลือ</div>';
                            stk_show +='</div>';
                            //stk_show +='<div class="table-overflow">';
                            for(var i = 0; i < result.listStk.length; i++){
                            stk_show +='<div class="row">';
                            stk_show +='<div class="col-md-6 col-xs-6">'+result.listStk[i].whCode+' / '+result.listStk[i].shelfCode+'</div>';
                            stk_show +='<div class="col-md-6 col-xs-6">'+result.listStk[i].qty+'</div>';
                            stk_show +='</div>';
                            }
                            stk_show +='</div>';
                            //stk_show +='</div>';

                            stk_show +='<div class="col-md-4 col-xs-4" style="background:#cfc; border-radius:5px; padding-top:7px;">';
                            stk_show +='<div class="row">';
                            stk_show +='<div class="col-md-12 col-xs-12">ที่เก็บ</div>';
                            stk_show +='</div>';
                            stk_show +='<div class="table-overflow">';
                            for(var j = 0; j < result.lishShelfID.length; j++){
                            stk_show +='<div class="row">';
                            stk_show +='<div class="col-md-12 col-xs-12">'+result.lishShelfID[j].shelfID+'</div>';
                            stk_show +='</div>';
                            }
                            stk_show +='</div>';
                            stk_show +='</div>';
                            stk_show +='</div>';
                        document.getElementById("stock_show").innerHTML =  stk_show;
                        $("#newreorder").bind('pageshow', function() {
                         $('#count').focus();
                         });
                        $('#count').focus();
                        /*document.getElementById("count").focus();
                        $("#newreorder").bind('pageshow', function() {

                        });*/
                        }
                        },
                        error: function (error){
                        switch_url();
                        alertify.alert(error);
                        }
                        });
}

function genDocNo(){
 if(document.getElementById("count").value == ""){
     alertify.error("กรุณาระบุจำนวนที่นับได้ !!");
     document.getElementById("count").focus();
 }else if(document.getElementById("want").value == ""){
     alertify.error("กรุณาระบุจำนวนที่ต้องการ !!");
     document.getElementById("want").focus();
 }else{

    if(localStorage.dc_reorder){
    insert_item(localStorage.dc_reorder);
    }else{
$.ajax({
                        url: localStorage.api_url_server+"ReOrderWS/reorder/gendocno",
                        data: '{"access_token":"'+localStorage.token+'","profit_code":"'+localStorage.profit+'"}',
                        contentType: "application/json; charset=utf-8",
                        dataType: "json",
                        type: "POST",
                        cache: false,
                        success: function(result){
                        console.log(result.doc_no);
                        localStorage.dc_reorder = result.doc_no;
                        insert_head(result.doc_no);
                        },
                        error: function (error){
                        switch_url();
                        getItemReorder(search);
                        }
                        });
        }
    }
}

function insert_head(docNo){

    $.ajax({
                        url: localStorage.api_url_server+"ReOrderWS/reorder/insert_head",
                        data: '{"access_token":"'+localStorage.token+'","doc_no":"'+docNo+'","doc_date":"'+date+'","person_code":"'+localStorage.username+'","user_code":"'+localStorage.username+'"}',
                        contentType: "application/json; charset=utf-8",
                        dataType: "json",
                        type: "POST",
                        cache: false,
                        success: function(result){
                        console.log(result);
                        if(result.doc_no == "" || result.doc_no == null){
                        alertify.error("!!")
                        }else{
                        insert_item(result.doc_no);
                        }
                        },
                        error: function (error){
                        switch_url();
                        insert_head(docNo);
                        }
                        });
}

function insert_item(dc){
var count = document.getElementById("count").value;
var want = document.getElementById("want").value;
var itemcode = document.getElementById("itemcode").value;
var unitcode = document.getElementById("unitcode").value;
console.log('{"access_token":"'+localStorage.token+'","doc_no":"'+dc+'","doc_date":"'+date+'","user_code":"'+localStorage.username+'","item":[{"item_code":"'+itemcode+'","unit_code":"'+unitcode+'","item_qty":"'+want+'","item_count":"'+count+'","line_number":"'+localStorage.reorder_line_number+'"}]}');

        $.ajax({
              url: localStorage.api_url_server+"ReOrderWS/reorder/insert_item",
              data: '{"access_token":"'+localStorage.token+'","doc_no":"'+dc+'","doc_date":"'+date+'","user_code":"'+localStorage.username+'","item":[{"item_code":"'+itemcode+'","unit_code":"'+unitcode+'","item_qty":"'+want+'","item_count":"'+count+'","line_number":"'+localStorage.reorder_line_number+'"}]}',
              contentType: "application/json; charset=utf-8",
              dataType: "json",
              type: "POST",
              cache: false,
              success: function(result){
              console.log(result);
              reorder_detail(dc);
              cleartext();

              },
              error: function (error){
              switch_url();
              insert_item(dc);
              }
              });
}

function reorder_detail(dcn){
         localStorage.dc_reorder = dcn;
    $.ajax({
                        url: localStorage.api_url_server+"ReOrderWS/reorder/reorder_details",
                        data: '{"access_token":"'+localStorage.token+'","profit_code":"'+localStorage.profit+'","search":"'+dcn+'"}',
                        contentType: "application/json; charset=utf-8",
                        dataType: "json",
                        type: "POST",
                        cache: false,
                        success: function(result){
                        console.log(result);
                        var detail = "";
                        detail += "<h4>"+result.doc_no+"</h4>";
                        detail += "<p>"+convertDateDmyth(result.doc_date)+"</p>";
                        detail += "<p>"+result.person_code+" - "+result.person_name+"</p>";
                        localStorage.reorder_line_number = result.item.length;
                        if(result.item.length == 0){
                             detail +="<div class='row reorder_detail'><div class='col-xs-12'>ไม่มีข้อมูลสินค้า</div></div>";
                        }else{
                            for(var i = 0; i < result.item.length; i++){
                                detail +="<div class='row reorder_detail todo-ccitem' data-cancelitem='ci"+result.item[i].item_code+"' data-cancelitemcode='"+result.item[i].item_code+"' data-cancelitemqty='"+result.item[i].item_qty+"' data-cancelitemunitcode='"+result.item[i].unit_code+"' data-cancelitemunitdcno='"+result.doc_no+"' id='ci"+result.item[i].item_code+"'>";
                                detail +="<div class='col-xs-12'>"+result.item[i].item_code+" "+result.item[i].item_name+"</div>";
                                detail +="<div class='col-xs-12'>"+result.item[i].item_qty+" "+result.item[i].unit_code+"</div>";
                                detail +="</div>";

                            }
                        }
                        $.mobile.changePage('#reorderListitem',{transition: 'slidefade'});
                        document.getElementById("show_reorder_detail").innerHTML = detail;
                        },
                        error: function (error){
                        switch_url();
                        reorder_detail(dcn);
                        }
                        });
}

function chk_item(bar){
    $.ajax({
                        url: localStorage.api_url_server+"ReOrderWS/reorder/reorder_details",
                        data: '{"access_token":"'+localStorage.token+'","profit_code":"'+localStorage.profit+'","search":"'+localStorage.dc_reorder+'"}',
                        contentType: "application/json; charset=utf-8",
                        dataType: "json",
                        type: "POST",
                        cache: false,
                        success: function(result){
                        console.log(result);
                            for(var i = 0; i < result.item.length; i++){
                                if(bar==result.item[i].item_code){
                                    var i_code = result.item[i].item_code;
                                    var i_name = result.item[i].item_name;
                                }
                            }
                                   switch(bar){
                                   case i_code :
                                       alertify.confirm( "ต้องการเปลี่ยนแปลงข้อมูล "+i_name+"หรือไม่", function (e) {
                                       if(e){
                                            //after clicking OK
                                            $.mobile.changePage('#newreorder',{transition: 'slidefade'});
                                            getItemReorder(bar);

                                       }else{
                                            //after clicking Cancel
                                       }
                                       });
                                        break;
                                   default:
                                        $.mobile.changePage('#newreorder',{transition: 'slidefade'});
                                        getItemReorder(bar);

                                    }
                                /*if(bar==result.item[i].item_code){

                                    localStorage.reorder_line_number = result.item[i].line_number;
                                    alertify.confirm( "ต้องการเปลี่ยนแปลงข้อมูล "+result.item[i].item_name+"หรือไม่", function (e) {
                                        if(e){
                                            //after clicking OK
                                            getItemReorder(bar);
                                            $.mobile.changePage('#newreorder',{transition: 'slidefade'});
                                        }else{
                                            //after clicking Cancel
                                        }
                                    });

                                }else{
                                    getItemReorder(bar);
                                    $.mobile.changePage('#newreorder',{transition: 'slidefade'});
                                }*/



                        //getItemReorder(bar);

                        },
                        error: function (error){
                        switch_url();
                        chk_item(bar);
                        }
                        });
}
function save_reorder(){
        localStorage.reorder_line_number=0;
        localStorage.dc_reorder="";
        alertify.success("บันทึกข้อมูลเรียบร้อยแล้ว");
        $.mobile.changePage('#listreorder',{transition: 'slidefade'});

}

function cleartext(){
                        document.getElementById("itemname").value =  "";
                        document.getElementById("itemcode").value =  "";
                        document.getElementById("itemprice").value =  "";
                        document.getElementById("unitcode").value =  "";
                        document.getElementById("buypoint").value =  "";
                        document.getElementById("min").value =  "";
                        document.getElementById("max").value =  "";
                        document.getElementById("balance").value =  "";
                        document.getElementById("po").value =  "";
                        document.getElementById("sale3m").value =  "";
                        document.getElementById("frequency").value =  "";
                        document.getElementById("buy").value =  "";
                        document.getElementById('count').value = "";
                        document.getElementById('want').value = "";
}

function convertDateDmyth(datess){
            var dates = new Date(datess);
            var listmonth = ["มกราคม","กุมภาพันธ์","มีนาคม","เมษายน","พฤษภาคม","มิถุนายน",
            "กรกฎาคม","สิงหาคม","กันยายน","ตุลาคม","พฤศจิกายน","ธันวาคม"][dates.getMonth()];

            var datestr = dates.getDate()+' '+listmonth + ' ' + (dates.getFullYear()+543);
            return datestr;

}

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

             case "newreorder" :
                           getItemReorder(e.scanResult);
                           break;
             case "reorderListitem" :
                           chk_item(e.scanResult);
                           document.getElementById('count').value = "";
                           document.getElementById('want').value = "";
                           //$.mobile.changePage('#newreorder',{transition: 'slidefade'});
                           break;

       }






});

//========================================================= cancel item reorder =================================================================
$(document).on('taphold', '.todo-ccitem', function() {
       // console.log("DEBUG - Go popup");
      var ci_code = $(this).attr('data-cancelitemcode');
      var ci_item = $(this).attr('data-cancelitem');
      var ci_qty = $(this).attr('data-cancelitemqty');
      var ci_unit = $(this).attr('data-cancelitemunitcode');
      var ci_docno = $(this).attr('data-cancelitemunitdcno');


      var $popUp = $("<div/>").popup({
        dismissible: true,

        //theme: "a",
        transition: "pop",
        arrow: "b",
        positionTo: '#'+ci_item
        }).on("popupafterclose", function () {
    //remove the popup when closing
    $(this).remove();
    }).css({
   'padding': '15%',
   'color': '#fff',
   'background': 'red'
   });
    console.log(ci_qty);
    console.log('#'+ci_item);
    $("<a>", {
    text: "Cancel item",
    href: "#",
    onclick: 'cc_item('+"'"+ci_code+"'"+','+"'"+ci_qty+"'"+','+"'"+ci_unit+"'"+','+"'"+ci_docno+"'"+');'
    }).appendTo($popUp);

    $popUp.popup('open').enhanceWithin();

    });

function cc_item(itemcode,qty,unit,docNo){
    alertify.confirm( "ต้องการลบข้อมูล "+itemcode+"หรือไม่", function (e) {
    if (e) {
console.log('{"access_token":"'+localStorage.token+'","doc_no":"'+docNo+'","item_code":"'+itemcode+'","item_unitcode":"'+unit+'"}');
        $.ajax({
              url: localStorage.api_url_server+"ReOrderWS/reorder/cancel_reorderitem",
              data: '{"access_token":"'+localStorage.token+'","doc_no":"'+docNo+'","item_code":"'+itemcode+'","item_unitcode":"'+unit+'"}',
              //{"access_token":"","doc_no":"S01-PRH6001-00033","item_code":"0000126","item_unitcode":"อัน"}
              contentType: "application/json; charset=utf-8",
              dataType: "json",
              type: "POST",
              cache: false,
              success: function(result){
              console.log(result);
              if(result.success == true){
                reorder_detail(docNo);
                alertify.success("ลบข้อมูลเรียบร้อยแล้ว");
              }else{
                alertify.alert(result.message);
              }
              },
              error: function (error){
              switch_url();
              cc_item(itemcode,qty,unit,docNo);
              }
              });
    }else{
    }
    });
}

//========================================================= cancel list reorder =================================================================
$(document).on('taphold', '.todo-cclist', function() {
       // console.log("DEBUG - Go popup");
      var cl_code = $(this).attr('data-cancelistcode');
      var cl_list = $(this).attr('data-cancellist');
      var $popUp = $("<div/>").popup({
        dismissible: true,

        //theme: "a",
        transition: "pop",
        arrow: "b",
        positionTo: '#'+cl_list
        }).on("popupafterclose", function () {
    //remove the popup when closing
    $(this).remove();
    }).css({
   'padding': '15%',
   'color': '#fff',
   'background': 'red'
   });
    console.log(cl_code);
    console.log('#'+cl_list);
    $("<a>", {
    text: "Cancel",
    href: "#",
    onclick: 'cc_list('+"'"+cl_code+"'"+');'
    }).appendTo($popUp);

    $popUp.popup('open').enhanceWithin();

    });

function cc_list(dc_no){
    alertify.confirm( "ต้องการลบข้อมูล "+dc_no+"หรือไม่", function (e) {
    if (e) {

console.log('{"access_token":"'+localStorage.token+'","doc_no":"'+dc_no+'","cancel_code":"'+localStorage.username+'"}');
        $.ajax({
              url: localStorage.api_url_server+"ReOrderWS/reorder/cancel_reorder",
              data: '{"access_token":"'+localStorage.token+'","doc_no":"'+dc_no+'","cancel_code":"'+localStorage.username+'"}',
              contentType: "application/json; charset=utf-8",
              dataType: "json",
              type: "POST",
              cache: false,
              success: function(result){
              console.log(result);
              if(result.success == true){
                listreorder();
                alertify.success("ลบข้อมูลเรียบร้อยแล้ว");
              }else{
                alertify.alert(result.message);
              }

              },
              error: function (error){
              switch_url();
              cc_list(dc_no);
              }
              });
    }else{
    }
    });
}

function back_detail(){
navigator.app.backHistory();
}
function back_reorderlist(){
    if( localStorage.dc_reorder){
        save_reorder();
    }else{
        listreorder();
    }
}
function cc_focus(){
    $("#newreorder").bind('pageshow', function() {
        $('#itemcode').focus();
    });

}
function back_newreorder(){
if(localStorage.dc_reorder==""){
                $.mobile.changePage('#listreorder',{transition: 'slidefade',reverse: true});
            }else{
                reorder_detail(localStorage.dc_reorder);
                $.mobile.changePage('#reorderListitem',{transition: 'slidefade',reverse: true});
            }
}