$('#itemcode_label').focus(function() {

});

$('#amount_request').focus(function() {

});

function add_item_label(){
if(document.getElementById("amount_request").value ==""){
    alertify.error("กรุณากรอกจำนวน");
     $('#amount_request').focus();
}else{
var items = [["รหัสสินค้า","ชื่อสินค้า","คลัง","หน่วยนับ","จำนวน"],
["2120250","นำยาเชื่อมท่อ","080","กระป๋อง","2"],["2120250","นำยาเชื่อมท่อ","080","กระป๋อง","2"],["2120250","นำยาเชื่อมท่อ","080","กระป๋อง","2"],["2120250","นำยาเชื่อมท่อ","080","กระป๋อง","2"],];
    var detail = "";

        items.push(["2120250","นำยาเชื่อมท่อ","080","กระป๋อง","2"]);
        detail = "";
        var counts = items.length;
    	for(var i = 0;i<counts;i++){
        	detail += "<div class='row' style='font-size:9px;'><div class='col-xs-2'>"+items[i][0]+"</div>";
        	detail += "<div class='col-xs-4'>"+items[i][1]+"</div>";
        	detail += "<div class='col-xs-2'>"+items[i][2]+"</div>";
        	detail += "<div class='col-xs-2'>"+items[i][3]+"</div>";
        	detail += "<div class='col-xs-1'>"+items[i][4]+"</div></div>";
        }
        document.getElementById("detail_labelRequest").innerHTML = detail;
    }

}

function save_label(){
    alertify.success("save label success");
        $.mobile.changePage('#labelRequest',{transition: 'slidefade'});

}

function getitem_label(search){
if(search){
    var searchs = search;
}else{
    var searchs = document.getElementById('itemcode_label').value;
}
        $.ajax({
                        url: localStorage.api_url_server+"ReOrderWS/reorder/itemdetails",
                        data: '{"access_token":"'+localStorage.token+'","profit_code":"'+localStorage.branch+'","search":"'+searchs+'"}',
                        contentType: "application/json; charset=utf-8",
                        dataType: "json",
                        type: "POST",
                        cache: false,
                        success: function(result){
                        console.log(result);
                        if(result.item_code == "" || result.item_code == null){
                        alertify.error("บาร์โค๊ดไม่ถูกต้อง !!")
                        }else{
                        document.getElementById("itemcode_label").value =  result.item_code;
                        document.getElementById("itemname_label").value =  result.item_name;
                        document.getElementById("barcode_label").value =  result.item_barcode;
                        document.getElementById("unitCode_label").value =  result.item_unit_code;


                        $("#newlabelRequest").bind('pageshow', function() {
                         $('#amount_request').focus();
                         });
                        $('#amount_request').focus();
                        }
                        },
                        error: function (error){
                        alertify.alert(error);
                        }
                        });
}

function insert_label(){
var itemcode = document.getElementById("itemcode_label").value;
var barcode = document.getElementById("barcode_label").value;
var pAmount = document.getElementById("amount_request").value;
var unit = document.getElementById("unitCode_label").value;
var P2 = document.getElementById("page1").options[document.getElementById("page1").selectedIndex].value;
var P1 = document.getElementById("page2").options[document.getElementById("page2").selectedIndex].value;
var labelType = P1+P2;
    if(document.getElementById("itemcode_label").value ==""){
        alertify.error("กรุณากรอก หรือสแกนสินค้าที่ต้องการ");
        document.getElementById("itemcode_label").focus();
    }else{
        console.log('{"accessToken":"'+localStorage.token+'","itemCode":"'+itemcode+'","barCode":"'+barcode+'","printQty":"'+pAmount+'","labelType":"'+labelType+'","unitCode":"'+unit+'","userID":"'+localStorage.username+'"}');
        $.ajax({
                            url: localStorage.api_url_server+"NPReceiveWs/rc/v2/label",
                            data: '{"accessToken":"'+localStorage.token+'","itemCode":"'+itemcode+'","barCode":"'+barcode+'","printQty":"'+pAmount+'","labelType":"'+labelType+'","unitCode":"'+unit+'","userID":"'+localStorage.username+'"}',
                            contentType: "application/json; charset=utf-8",
                            dataType: "json",
                            type: "POST",
                            cache: false,
                            success: function(result){
                            console.log(result);
                            document.getElementById("itemcode_label").value = "";
                            document.getElementById("barcode_label").value = "";
                            document.getElementById("itemname_label").value = "";
                            document.getElementById("unitCode_label").value = "";
                            document.getElementById("amount_request").value = "";
                            alertify.success("บันทึกเรียบร้อยแล้ว");
                            search_label();
                            },
                            error: function (error){
                            alertify.alert(error);
                            }
                            });
     }
}


function search_label(){
     $.ajax({
                            url: localStorage.api_url_server+"NPReceiveWs/rc/v2/searchlabel",
                            data: '{"accessToken":"'+localStorage.token+'","userCode":"'+localStorage.username+'"}',
                            contentType: "application/json; charset=utf-8",
                            dataType: "json",
                            type: "POST",
                            cache: false,
                            success: function(result){
                            console.log(result);
                                var length = result.label.length;
                                    /*detail = "<div class='row' style='font-size:9px; backgroung:red;'><div class='col-xs-2'>รหัสสินค้า</div>";
                                    detail += "<div class='col-xs-4'>ชื่อสินค้า</div>";
                                    detail += "<div class='col-xs-2'>ประเภทกระดาษ</div>";
                                    detail += "<div class='col-xs-1'>จำนวน</div>";
                                    detail += "<div class='col-xs-2'>หน่วยนับ</div></div>";
                                    */
                                    detail = "<table style='font-size:9px; width:100%;'class='table table-striped'><tr style='background:#24BEE5;'><td>รหัสสินค้า</td>";
                                    detail += "<td>ชื่อสินค้า</td>";
                                    detail += "<td>ประเภทกระดาษ</td>";
                                    detail += "<td>จำนวน</td>";
                                    detail += "<td>หน่วยนับ</td></tr>";
                                for(var i = 0;i<length;i++){
                                    detail += "<tr><td>"+result.label[i].itemCode+"</td>";
                                    detail += "<td>"+result.label[i].itemName+"</td>";
                                    detail += "<td>"+result.label[i].labelType+"</td>";
                                    detail += "<td>"+result.label[i].printQty+"</td>";
                                    detail += "<td>"+result.label[i].unitCode+"</td></tr>";
                                     /*
                                    detail += "<div class='row' style='font-size:9px;'><div class='col-xs-2'>"+result.label[i].itemCode+"</div>";
                                    detail += "<div class='col-xs-4'>"+result.label[i].itemName+"</div>";
                                    detail += "<div class='col-xs-2'>"+result.label[i].labelType+"</div>";
                                    detail += "<div class='col-xs-1'>"+result.label[i].printQty+"</div>";
                                    detail += "<div class='col-xs-2'>"+result.label[i].unitCode+"</div></div>";*/
                                }
                                detail += "</table>";
                                document.getElementById("detail_labelRequest").innerHTML = detail;
                                $("#newlabelRequest").bind('pageshow', function() {
                                    $('#itemcode_label').focus();
                                });
                                document.getElementById("itemcode_label").focus();


                            },
                            error: function (error){
                            alertify.alert(error);
                            }
                            });
}

