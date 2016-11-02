$(document).on("pageshow","#countitem", function(){
    //$("#btnpopup").on("click", function(){
        $("#scitemsh").show();
        $("#cntitem").hide();
        //setTimeout(function(){  $("#p").popup("close"); }, 5000);
   // });
});

window.addEventListener('native.onscanbarcode', function (ci) {

       var page = "";
       //alert(ci.scanResult);
       console.log("count : "+ci.scanResult);

       if(page == ""){
         page = $.mobile.activePage.attr('id');
       }
       $(document).on("pageshow", function (c, data) {
          page = $(this)[0].activeElement.id;
       });
       console.log("count : " + page);
       localStorage.barcode = ci.scanResult;
       console.log("จำนวนตัวอักษร "+localStorage.barcode.length);
       var len = localStorage.barcode.length;
switch(page){

             case "stock"   :  loading();
                               searchWHis(localStorage.barcode);
                            break;
             case "shelves" : loading();
                              searchSHis(localStorage.barcode);
                    	    break;
             case "countitem" : loading();
                                if(len<13){
                                    alertify.set({ labels: {
                                        ok     : "yes",
                                        cancel : "no"
                                    } });
                                    alertify.confirm("ท่านต้องการเปลี่ยนชั้นเก็บหรือไม่ ?", function (e){
                                        if(e){
                                            searchSHis(localStorage.barcode);
                                        }else{
                                            ///
                                        }
                                    });
                                }else{
                                    searchItem(localStorage.barcode);
                                }



                            break;
           	}
});

function searchWHis(barcode){
 //$('#load_wh').popup('open');
 setTimeout(function(){
 console.log("cswh");
    document.activeElement.blur();
        $.ajax({
               url: localStorage.api_url_server+""+localStorage.api_url_searchwh_is,
               data: '{"accessToken":"","search":"'+barcode+'"}',
               contentType: "application/json; charset=utf-8",
               dataType: "json",
               type: "POST",
               cache: false,
               success: function(result){
                      console.log(JSON.stringify(result.warehouseList));
                      if(JSON.stringify(result.warehouseList)==="[]"){
                           alertify.alert("ไม่มีข้อมูลคลังสินค้าของ "+barcode);
                           closeload();
                      }else{
                           var whName = "";
                           var whLocal = "";
                           $.each(result.warehouseList, function(key, val) {
                           if(val['whName']!=null&&val['localtion']){
                                whName = val['whName'].trim();
                                whLocal = val['location'].trim();
                           }else{
                                whName = val['whName'];
                                whLocal = val['location'];
                           }

                           });

                          $.ajax({
                                 url: localStorage.api_url_server+""+localStorage.api_url_gendocno,
                                 data: '{"type":"3","search":"'+localStorage.username+'"}',
                                 contentType: "application/json; charset=utf-8",
                                 dataType: "json",
                                 type: "POST",
                                 cache: false,
                                 success: function(Is){
                                       console.log(Is.docno);
                                       document.getElementById("valdocIS").value = Is.docno;
                                       document.getElementById("docIS").innerHTML = Is.docno;
                                       isList();
                                 },
                                 error: function (error) {
                                     alertify.error("can't call api");
                                 }

                          });

                          document.getElementById("wh").innerHTML = "คลัง : "+whName+"  "+whLocal;
                          document.getElementById("whvalue").value = whName;
                          isList();
                          $.mobile.changePage("#countstock");
                          closeload();
                      }
               },
               error: function (error) {
                  alertify.error("can't call api");
                  closeload();
               }
        });
    }, 1500);

}
function searchSHis(shelfCode){
    var stockWH = document.getElementById("whvalue").value;
    setTimeout(function(){
    $.ajax({
        url: localStorage.api_url_server+""+localStorage.api_url_searchshelf_is,
        data: '{"accessToken":"38850025531385","searchWH":"'+stockWH+'","searchShelf":"'+shelfCode+'"}',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        type: "POST",
        cache: false,
        success: function(result){
            console.log(JSON.stringify(result.shelfList));
            if(JSON.stringify(result.shelfList)=="[]"){
                 alertify.alert("ไม่มีข้อมูลชั้นเก็บสินค้าของ "+shelfCode);
                 closeload();
            }else{
                 var shelName = "";
                 $.each(result.shelfList, function(key, val) {
                       shelName = val['shelfName'].trim();
                 });
                 var main =  document.getElementsByClassName('CTshelves');
                 for(var i = 0; i < main.length; i++){
                     main[i].innerHTML = shelName;
                 }
                 document.getElementById("shel").value = shelName;
                // document.getElementById("CTshelves").innerHTML = shelName;
                 document.getElementById("barcodetext").innerHTML = "";
                 document.getElementById("CTitemno").innerHTML = "<font color='red'>** SCANBARCODE ITEM **</font>";
                 document.getElementById("CTitemname").innerHTML = "";
                 document.getElementById("CTunit").innerHTML = "";
                 document.getElementById("itemNo").value = "";
                 document.getElementById("itemsName").value = "";
                 document.getElementById("Cunit").value = "";
                 document.getElementById("counts").value = "";
                 $("#count1").show();
                 $("#count2").hide();
                 $.mobile.changePage("#countitem");
                 document.getElementById("counts").disabled = true;
                 document.activeElement.blur();


                 closeload();
            }
        },
        error: function (error) {
            alertify.error("can't call api");
            closeload();
        }

    });
    }, 1500);
}

function searchItem(itemCode){
    document.activeElement.blur();
    var DocNo = document.getElementById("valdocIS").value;
    var shel = document.getElementById("shel").value;
    console.log('{"barcode":"'+itemCode+'","docno":"'+DocNo+'","type":"3","shelfcode":"'+shel+'"}');
    setTimeout(function(){
    $.ajax({
           url: localStorage.api_url_server+""+localStorage.api_url_search_item_pr,
           data: '{"barcode":"'+itemCode+'","docno":"'+DocNo+'","type":"3","shelfcode":"'+shel+'"}',
           contentType: "application/json; charset=utf-8",
           dataType: "json",
           type: "POST",
           cache: false,
           success: function(result){
                 console.log(JSON.stringify(result.listBarcode));
                 if(JSON.stringify(result.listBarcode)==="[]"){
                     alertify.alert("บาร์โค้ด "+itemCode+" ไม่มีอยู่ในทะเบียนสินค้า");
                     closeload();
                 }else{
                     var itemcode = "";
                     var itemName = "";
                     var range = "";
                     var cntitem = "";
                     var units = "";

                     if(result.listBarcode==null){
                         console.log("data listbarcode : null");
                         $.each(result.listISBarcode, function(key, val) {
                             itemcode = val['itemcode'];
                             itemName = val['itemname'];
                             range = val['range'];
                             if(val['qty']==0){
                               cntitem = "";
                             }else{
                               cntitem = val['qty'];
                             }
                             units = val['unitcode'];
                             apcode = val['apCode'];
                             apname = val['apName'];
                             console.log(cntitem);
                         });
                     }else{
                         $.each(result.listBarcode, function(key, val) {
                         itemcode = val['itemcode'];
                         itemName = val['itemname'];
                         range = val['range'];
                         if(val['qty']==0){
                            cntitem = "";
                         }else{
                            cntitem = val['qty'];
                         }
                            units = val['unitcode'];
                            apcode = val['apCode'];
                            apname = val['apName'];
                         });
                         console.log(cntitem);
                     }
                     $("#scitemsh").hide();
                     $("#cntitem").show();
                     $("#count1").hide();
                     $("#count2").show();

                     document.getElementById("CTitemno").innerHTML = itemcode;
                     document.getElementById("CTitemname").innerHTML = itemName;
                     document.getElementById("CTunit").innerHTML = units;
                     document.getElementById("barcodetext").innerHTML = itemCode;
                     document.getElementById("itemNo").value = itemcode;
                     document.getElementById("itemsName").value = itemName;
                     document.getElementById("Cunit").value = units;
                     document.getElementById("counts").value = cntitem;
                     document.getElementById("counts").disabled = false;
                     closeload();
                     //$(document).on('pageshow', '#countitem', function(){
                     //$('#counts').focus();

                     //});
                     //$.mobile.changePage("#countitem");
                 }
           },
           error: function (error) {
                 alertify.error("can't call api");
                 closeload();
                 $("#scitemsh").show();
                 $("#cntitem").hide();
                 $.mobile.changePage("#countitem");
           }

    });
    }, 1500);
}

function backstock(){
    isList();
    $.mobile.changePage('#countstock',{transition: 'slidefade',reverse: true});
    //window.location="#stock";
}

function savestock(){
    loading();
    setTimeout(function(){
    var DocNo = document.getElementById("valdocIS").value;
    var sv = document.getElementById("shel").value;
    var noitem = document.getElementById("itemNo").value;
    var wh = document.getElementById("whvalue").value;
    var citem = document.getElementById("counts").value;
    var uitem = document.getElementById("Cunit").value;
    var userID = localStorage.username;
    if(citem == ""||noitem == ""){
    //alert("กรุณากรอกข้อมูลให้ครบด้วย !!");
    }else{
    console.log('result:[{"docNo":"'+DocNo+'","user":"'+userID+'","itemCode":"'+noitem+'","unitcode":"'+uitem+'","whCode":"'+wh+'","shelfCode":"'+sv+'","qty":"'+citem+'"}]');

         $.ajax({
                 url: localStorage.api_url_server+"NPInventoryWs/V1/is/insertIS",
                 data: '{"docNo":"'+DocNo+'","user":"'+userID+'","itemCode":"'+noitem+'","unitcode":"'+uitem+'","whCode":"'+wh+'","shelfCode":"'+sv+'","qty":"'+citem+'"}',
                 contentType: "application/json; charset=utf-8",
                 dataType: "json",
                 type: "POST",
                 cache: false,
                 success: function(result){
                    console.log(JSON.stringify(result));

                    document.getElementById("CTitemno").innerHTML = "<font color='red'>** SCANBARCODE ITEM **</font>";
                    document.getElementById("CTitemname").innerHTML = "";
                    document.getElementById("CTunit").innerHTML = "";
                    document.getElementById("itemNo").value = "";
                    document.getElementById("itemsName").value = "";
                    document.getElementById("Cunit").value = "";
                    document.getElementById("counts").value = "";
                    document.getElementById("barcodetext").innerHTML = "";

                    $("#scitemsh").show();
                    $("#cntitem").hide();
                    $("#count1").show();
                    $("#count2").hide();
                    $("#scanitemcode").show();
                    alertify.success("บันทีกข้อมูลเรียบร้อยแล้ว!");
                    document.getElementById("counts").disabled = true;


                   // $.mobile.changePage("#countitem");
                    closeload();

                 },
                 error: function (error) {
                    $("#scanPopup").popup("open");
                    alertify.error("can't call api");
                    closeload();

                   // $.mobile.changePage("#countitem");
                 }
            });
    }
    }, 1500);

}

function savedata(){
    loading();
    setTimeout(function(){
    var DocNo = document.getElementById("valdocIS").value;
    var UserID = localStorage.username;
    console.log('Update IS :{"DocNo":"'+DocNo+'","userID":"'+UserID+'","isCancel":"0"}');
    $.ajax({
        url: localStorage.api_url_server+""+localStorage.api_url_confirm_is,
        data: '{"docNo":"'+DocNo+'","user":"'+UserID+'","isCancel":"0"}',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        type: "POST",
        cache: false,
        success: function(result){
            console.log(JSON.stringify(result));
            $.mobile.changePage("#stock",{transition: 'slidefade'});
            document.getElementById("valdocIS").value = "";
            document.getElementById("shel").value = "";
            document.getElementById("itemNo").value = "";
            document.getElementById("whvalue").value = "";
            document.getElementById("counts").value = "";
            document.getElementById("Cunit").value = "";
            document.getElementById("barcodetext").innerHTML = "";
            alertify.success("บันทึกใบนับที่ "+DocNo+" แล้ว");
            closeload();
        },
        error: function(err){
            alertify.alert("Update IS ERROR!!");
            closeload();
            $.mobile.changePage("#countitem",{transition: 'slidefade'});
        }
    });
    closeload();
    $.mobile.changePage("#stock",{transition: 'slidefade'});
    }, 1500);
}

function isList(){
    console.log("list is detail");
    loading();
    setTimeout(function(){
    var DocNo = document.getElementById("valdocIS").value;
    $.ajax({
            url: localStorage.api_url_server+"NPInventoryWs/V1/is/isList",
            data: '{"accessToken":"","docNo":"'+DocNo+'"}',
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            type: "POST",
            cache: false,
            success: function(result){
                console.log(JSON.stringify(result.listData));
                var detail = "";
                var wh = document.getElementById("whvalue").value;
                if(JSON.stringify(result.listData)!="[]"){
                    $.each(result.listData, function(key,val){
                                    itemno = val['itemCode'];

                                    if(itemno==null){
                                         sitemno=itemno;
                                    }else{
                                         sitemno = Math.ceil(itemno.length/6);
                                         console.log(sitemno);
                                    }
                                    var s = 0;
                                    var str1 = "";
                                    if(sitemno!=null){
                                      for(var i = 0;i<sitemno;i++){
                                           str1 += itemno.substr(s,6)+"<br>";
                                           s += 6;
                                      }
                                    }else{
                                      str1=sitemno;
                                    }

                                        detail += `<label class="csdelete" csdelete-id="`+DocNo+`/`+wh+`/`+val['shelfCode']+`/`+val['itemCode']+`" csdelete-detail-id="`+val['itemCode']+`" id="`+val['itemCode']+`" style="text-align:center; border-bottom:1px gray dashed;">`;
                                             detail += '<div class="ui-grid-d">';
                                              detail += '<div class="ui-block-a">';
                                                     detail += str1;
                                              detail += '</div>';
                                              detail += '<div class="ui-block-b">';
                                                     detail += val['itemName'];
                                              detail += '</div>';
                                              detail += '<div class="ui-block-c">';
                                                     detail += val['shelfCode'];
                                              detail += '</div>';
                                              detail += '<div class="ui-block-d">';
                                                     detail += val['diffQty']+"  "+val['unitCode'];
                                              detail += '</div>';
                                              detail += '<div class="ui-block-e">';

                                                if(val['diffQty']!="0"){
                                                    detail += '<img src="images/Alert.png" width="24">';
                                                }else if(val['diffQty']=="0"){
                                                    detail += '<img src="images/check.png" width="24">';
                                                }

                                              detail += '</div>';
                                             detail += '</div>';
                                        detail += '</label>';
                                    });
                }else{
                    detail = `<label style="border-bottom:1px dashed black; padding:2%; color:red; text-align:center">
                                          <h5>** ยังไม่มีข้อมูลสินค้าที่นับในใบนับนี้ **</h5>
                              </label>`;
                }

                document.getElementById("csdetail").innerHTML = detail;
                closeload();
                $.mobile.changePage("#countstock",{transition: 'slidefade'});
            },
            error: function(err){
                alertify.alert("Update IS ERROR!!");
                closeload();
                $.mobile.changePage("#countstock",{transition: 'slidefade'});
            }
        });
    }, 1500);
}


function CSback(){
    alertify.set({ labels: {
        ok     : "yes",
        cancel : "no"
    } });
    alertify.confirm( "ท่านไม่ต้องการเพิ่มสินค้าแล้วใช่หรือไม่ ?", function (e) {
        if (e) {
            $.mobile.changePage("#countstock",{transition: 'slidefade'});
        } else {
            //after clicking Cancel
        }
    });
}

function selsh(){
          /*loading();
          setTimeout(function(){ document.getElementById("shel").value = "-";
                               document.getElementById("CTshelves").innerHTML = "-";
                               document.getElementById("barcodetext").innerHTML = "";
                               document.getElementById("CTitemno").innerHTML = "<font color='red'>** SCANBARCODE ITEM **</font>";
                               document.getElementById("CTitemname").innerHTML = "";
                               document.getElementById("CTunit").innerHTML = "";
                               document.getElementById("itemNo").value = "";
                               document.getElementById("itemsName").value = "";
                               document.getElementById("Cunit").value = "";
                               document.getElementById("counts").value = "";
                               $("#count1").show();
                               $("#count2").hide();
                               document.getElementById("counts").disabled = true;
                               $.mobile.changePage("#countitem");
                               document.activeElement.blur();
                               }, 1500);*/

}

var body = document.querySelector('body');
body.onkeydown = function () {
    var item = document.getElementById("itemNo").value;
    var page = "";
 	if(page == ""){
             page = $.mobile.activePage.attr('id');
    }
    if(page=="countitem"){
     //document.activeElement.blur();
        if(item){
            if (event.keyCode < 48 || event.keyCode > 57){
            	 if(event.keyCode == 8){
                     event.returnValue = true;
                     var str = document.getElementById("counts").value;
                     if(str!=""){
                       var newStr = str.substring(0, str.length-1);
                       document.getElementById("counts").value = newStr;
                       return false;
                     }

                 }else{
                     event.returnValue = false;
                 }
            }else{
               // document.activeElement.blur();

               // $('#counts').focus();
                event.returnValue = true;
                document.getElementById("counts").value += String.fromCharCode(event.keyCode);
                return false;
            }
        }
    }

}

function c_s(){
    alertify.set({ labels: {
        ok     : "บันทึก",
        cancel : "ยกเลิกใบนับ"
    } });
    alertify.confirm("ท่านต้องการบันทึกใบนับสต๊อกหรือไม่ ?", function (e) {
        if (e) {
            savedata();
            //alertify.success("บันทึกเรียบร้อย");
        } else {
            var DocNo = document.getElementById("valdocIS").value;
                var UserID = localStorage.username;
                console.log('Update IS :{"DocNo":"'+DocNo+'","userID":"'+UserID+'","isCancel":"1"}');
                $.ajax({
                    url: localStorage.api_url_server+""+localStorage.api_url_confirm_is,
                    data: '{"docNo":"'+DocNo+'","user":"'+UserID+'","isCancel":"1"}',
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    type: "POST",
                    cache: false,
                    success: function(result){
                        console.log(JSON.stringify(result));
                        $.mobile.changePage("#stock",{transition: 'slidefade'});
                        document.getElementById("valdocIS").value = "";
                        document.getElementById("shel").value = "";
                        document.getElementById("itemNo").value = "";
                        document.getElementById("whvalue").value = "";
                        document.getElementById("counts").value = "";
                        document.getElementById("Cunit").value = "";
                        alertify.error("ยกเลิกใบนับเรียบร้อย");
                    },
                    error: function(err){
                        alertify.alert("Update IS ERROR!!");
                        $.mobile.changePage("#countstock",{transition: 'slidefade'});
                    }
                });
                $.mobile.changePage("#stock",{transition: 'slidefade'});
                 return false;
        }
    });
}

var $load;
function loading(){
        $load = $("<div>").popup({
        dismissible: false,
        theme: "a",
        positionto: "window",
        transition: "flip",
        }).css({
               'background': '#F8F8FF',
               '-webkit-box-shadow':  '0px 0px 0px 9999px rgba(0, 0, 0, 0.5)',
               'box-shadow':  '0px 0px 0px 9999px rgba(0, 0, 0, 0.5)',
               'width' : 250,
               'margin-left' : '1%'
               });

        $("<img>", {
                    src: "images/loading2.gif"
                    }).appendTo($load);
        $load.popup('open');
}

function closeload(){
    $load.popup("close");
}

////////////////////////////////////////////////////////////
$(document).on('taphold', '.csdelete', function() {
      console.log("this hold");
      var link_name = $(this).attr('csdelete-id');
      console.log(link_name);
      var link_data = $(this).attr('csdelete-detail-id');
      var link_id = $(this).attr('id');
      var data = link_name.split("/");
      var $csd = $("<div/>").popup({
        dismissible: true,
        //theme: "a",
        transition: "pop",
        arrow: "b",
        positionTo: '#'+link_id
        }).on("popupafterclose", function () {
    //remove the popup when closing
    $(this).remove();
    }).css({
   'padding': '10%',
   'color': '#fff',
   'background': 'red'
   });
    console.log(link_name);
    console.log('#'+link_id);
    $("<a>", {
    text: "Delete",
    href: "#",
    onclick: "csDeletitem('"+data[0]+"','"+data[1]+"', '"+data[2]+"','"+data[3]+"');"
    }).appendTo($csd);

    $csd.popup('open').enhanceWithin();

    });

function csDeletitem(DocNo,wh,sh,itemCode){
    console.log(DocNo+"/"+wh+"/"+sh+"/"+itemCode);
    alertify.success("ลบรายการเรียบร้อยแล้ว");
    isList();
}