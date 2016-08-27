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

       //alert(page);
       console.log("count : " + page);
switch(page){

             case "stock"   :
                              $.ajax({
                                      url: localStorage.api_url_server+"NPInventoryWs/pr/searchWH",
                                      data: '{"accessToken":"","search":"'+ci.scanResult+'"}',
                                      contentType: "application/json; charset=utf-8",
                                      dataType: "json",
                                      type: "POST",
                                      cache: false,
                                      success: function(result){
                                            console.log(JSON.stringify(result.warehouseList));
                                            if(JSON.stringify(result.warehouseList)==="[]"){
                                                alertify.alert("ไม่มีข้อมูลคลังสินค้า");
                                            }else{
                                            var whName = "";
                                            var whLocal = "";
                                            $.each(result.warehouseList, function(key, val) {
                                                  whName = val['whName'].trim();
                                                  whLocal = val['location'].trim();
                                            });

                                                    $.ajax({
                                                               url: localStorage.api_url_server+""+localStorage.api_url_gendocno,
                                                               data: '{"type":"3","search":"58089"}',
                                                               contentType: "application/json; charset=utf-8",
                                                               dataType: "json",
                                                               type: "POST",
                                                               cache: false,
                                                               success: function(Is){
                                                                    console.log(Is.docno);
                                                                    document.getElementById("valdocIS").value = Is.docno;
                                                                    document.getElementById("docIS").innerHTML = Is.docno;
                                                               },
                                                               error: function (error) {
                                                                    alertify.error("can't call api");
                                                               }

                                                    });
                                            document.getElementById("wh").innerHTML = "คลัง : "+whName+"  "+whLocal;
                                            document.getElementById("wh2").innerHTML = "คลัง : "+whName+"  "+whLocal;
                                            document.getElementById("whvalue").value = whName;

                                            $.mobile.changePage("#countstock");
                                            }
                                      },
                                      error: function (error) {
                                            alertify.error("can't call api");
                                      }

                              });

                            break;

             case "shelves" :
                              var stockWH = document.getElementById("whvalue").value;
                              $.ajax({
                                      url: localStorage.api_url_server+"NPInventoryWs/pr/searchShelf",
                                      data: '{"accessToken":"38850025531385","searchWH":"'+stockWH+'","searchShelf":"'+ci.scanResult+'"}',
                                      contentType: "application/json; charset=utf-8",
                                      dataType: "json",
                                      type: "POST",
                                      cache: false,
                                      success: function(result){
                                            console.log(JSON.stringify(result.shelfList));
                                            if(JSON.stringify(result.shelfList)=="[]"){
                                                alertify.alert("ไม่มีข้อมูลชั้นเก็บสินค้า");
                                            }else{
                                            var shelName = "";
                                            $.each(result.shelfList, function(key, val) {
                                                  shelName = val['shelfName'].trim();
                                            });

                                            document.getElementById("shel").value = shelName;
                                            document.getElementById("CTshelves").innerHTML = shelName;
                                            document.getElementById("CTitemno").innerHTML = "** SCANBARCODE ITEM **";
                                            document.getElementById("CTitemname").innerHTML = "";
                                            document.getElementById("CTunit").innerHTML = "";
                                            document.getElementById("itemNo").value = "";
                                            document.getElementById("itemsName").value = "";
                                            document.getElementById("Cunit").value = "";
                                            document.getElementById("counts").value = "";

                                            $("#count1").show();
                                            $("#count2").hide();
                                            $.mobile.changePage("#countitem");
                                            }
                                      },
                                      error: function (error) {
                                            alertify.error("can't call api");
                                      }

                              });
                    	 break;
             case "countitem" :
                                   var DocNo = document.getElementById("valdocIS").value;
                                   $.ajax({
                                           url: localStorage.api_url_server+""+localStorage.api_url_search_item_pr,
                                           data: '{"barcode":"'+ci.scanResult+'","docno":"'+DocNo+'","type":"3"}',
                                           contentType: "application/json; charset=utf-8",
                                           dataType: "json",
                                           type: "POST",
                                           cache: false,
                                           success: function(result){
                                                //console.log(JSON.stringify(result));
                                                console.log(JSON.stringify(result.listBarcode));
                                                var itemcode = "";
                                                var itemName = "";
                                                var range = "";
                                                var cntitem = "";
                                                var units = "";

                                                if(result.listBarcode==null){
                                                    console.log("data listbarcode : null");

                                                    $.each(result.listPRBarcode, function(key, val) {
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
                                                }
                                                $("#count1").hide();
                                                $("#count2").show();

                                                document.getElementById("CTitemno").innerHTML = itemcode;
                                                document.getElementById("CTitemname").innerHTML = itemName;
                                                document.getElementById("CTunit").innerHTML = units;

                                                document.getElementById("itemNo").value = itemcode;
                                                document.getElementById("itemsName").value = itemName;
                                                document.getElementById("Cunit").value = units;
                                                document.getElementById("counts").value = cntitem;
                                                $('#counts').focus();

                                                $.mobile.changePage("#countitem");
                                           },
                                           error: function (error) {
                                           alertify.error("can't call api");
                                           $.mobile.changePage("#countitem");
                                           }

                                        });

                         break;
           	}
});

function backstock(){
   // alert("back");
    //document.getElementById("whvalue").value
    $.mobile.changePage("#countstock");
    //window.location="#stock";
}

function savestock(){
    var DocNo = document.getElementById("valdocIS").value;
    var sv = document.getElementById("shel").value;
    var noitem = document.getElementById("itemNo").value;
    var wh = document.getElementById("whvalue").value;
    var citem = document.getElementById("counts").value;
    var uitem = document.getElementById("Cunit").value;
    if(citem == ""||noitem == ""){
    alert("กรุณากรอกข้อมูลให้ครบด้วย !!");
    }else{
    console.log('result:[{"docNo":"'+DocNo+'","itemCode":"'+noitem+'","unitcode":"'+uitem+'","whCode":"'+wh+'","shelfCode":"'+sv+'","qty":"'+citem+'"}]');

         $.ajax({
                 url: localStorage.api_url_server+"NPInventoryWs/pr/insertIS",
                 data: '{"docNo":"'+DocNo+'","itemCode":"'+noitem+'","unitcode":"'+uitem+'","whCode":"'+wh+'","shelfCode":"'+sv+'","qty":"'+citem+'"}',
                 contentType: "application/json; charset=utf-8",
                 dataType: "json",
                 type: "POST",
                 cache: false,
                 success: function(result){
                    console.log(JSON.stringify(result));
                    document.getElementById("CTitemno").innerHTML = "** SCANBARCODE ITEM **";
                    document.getElementById("CTitemname").innerHTML = "";
                    document.getElementById("CTunit").innerHTML = "";
                    document.getElementById("itemNo").value = "";
                    document.getElementById("itemsName").value = "";
                    document.getElementById("Cunit").value = "";
                    document.getElementById("counts").value = "";

                    $("#count1").show();
                    $("#count2").hide();
                    $("#scanitemcode").show();
                    alertify.success("บันทีกข้อมูลเรียบร้อยแล้ว!");
                    $.mobile.changePage("#countitem");
                 },
                 error: function (error) {
                    alertify.error("can't call api");
                    $.mobile.changePage("#countitem");
                 }
            });
    }

}

function savedata(){

}

function editstock(){
       document.getElementById("Eshel").value = "WH1";
       document.getElementById("EitemNo").value = "5122456333";
       document.getElementById("EitemsName").value = "M150";
       document.getElementById("Ecounts").value = "56";
       document.getElementById("ECunit").value = "ขวด";

       document.getElementById("ECTshelves").innerHTML = "WH1";
       document.getElementById("ECTitemno").innerHTML = "5122456333";
       document.getElementById("ECTitemname").innerHTML = "M150";
       document.getElementById("ECTunit").innerHTML = "ขวด";
   $.mobile.changePage("#stockedit");
}

function deleteitem(){
    if(confirm("คุณต้องการลบรายการนับสินค้ารายการนี้ใช่หรือไม่!!")){
        alert("ลบเรียบร้อย!!");
        $.mobile.changePage("#countstock");
    }else{
        $.mobile.changePage("#stockedit");
    }
}