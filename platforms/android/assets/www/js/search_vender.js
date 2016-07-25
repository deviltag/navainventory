$(document).ready(function(){

                $.ajax({
                   url: "http://qserver.nopadol.com:8080/NPReceiveWs/po/vendor",
                   data: '{"accessToken":"","search":""}',
                   contentType: "application/json; charset=utf-8",
                   dataType: "json",
                   type: "POST",
                   cache: false,
                   success: function(result){
                        //console.log(JSON.stringify(result));
                        var prl = JSON.stringify(result);
                        var prlp = prl.split(":[");
                        var str = prlp[1].split("]}");
                        prl = "["+str[0]+"]";
                        var js = jQuery.parseJSON(prl);
                        //console.log(JSON.stringify(js));
                        //document.getElementById("PO").innerHTML = JSON.stringify(js);
                        var count = js.length;
                          //console.log(count);
                          var po = "";
                          for(var i = 0;i<js.length;i++){
                            //console.log(js[i].code);
                            po += '<a href="#" data-transition="slidefade" class="ui-btn" onclick="select_vender(';
                            po += "'"+js[i].code+"')";
                            po += '">'+js[i].name+'</a>';

                          }
                        document.getElementById("polist").innerHTML = po;
                           },
                    error: function (error){
                        console.log(error);
                    }

                });

});

function searchpo(){
        //alert(search_po.search.value)
        $.ajax({
                   url: "http://qserver.nopadol.com:8080/NPReceiveWs/po/vendor",
                   data: '{"accessToken":"","search":"'+search_po.search.value+'"}',
                   contentType: "application/json; charset=utf-8",
                   dataType: "json",
                   type: "POST",
                   cache: false,
                   success: function(result){
                        //console.log(JSON.stringify(result));
                        var prl = JSON.stringify(result);
                        var prlp = prl.split(":[");
                        var str = prlp[1].split("]}");
                        prl = "["+str[0]+"]";
                        var js = jQuery.parseJSON(prl);
                        //console.log(JSON.stringify(js));
                        //document.getElementById("PO").innerHTML = JSON.stringify(js);
                        var count = js.length;
                          //console.log(count);
                          var po = "";
                          for(var i = 0;i<js.length;i++){
                            //console.log(js[i].code);
                            po += '<a href="#" data-transition="slidefade" class="ui-btn" onclick="select_vender(';
                            po += "'"+js[i].code+"')";
                            po += '">'+js[i].name+'</a>';
                          }
                        document.getElementById("polist").innerHTML = po;
                    },
                    error: function (error){
                        console.log(error);
                    }
                });

}
function select_vender(po_number){
    //alert(po_number);
    //console.log(po_no);
    //document.getElementById("po_no").value=po_no;
        alert("click : "+ po_number)
     $.ajax({
                   url: "http://qserver.nopadol.com:8080/NPReceiveWs/po/vendorpo",
                   data: '{"accessToken":"","search":"'+po_number+'"}',
                   contentType: "application/json; charset=utf-8",
                   dataType: "json",
                   type: "POST",
                   cache: false,
                   success: function(result){

                        //console.log(JSON.stringify(result));
                        var prl = JSON.stringify(result);
                        var prlp = prl.split(":[");
                        var str = prlp[1].split("]}");
                        prl = "["+str[0]+"]";
                        var js = jQuery.parseJSON(prl);
                        //console.log(JSON.stringify(js));
                        //document.getElementById("PO").innerHTML = JSON.stringify(js);
                        var count = js.length;
                          //console.log(count);
                          var po_ven = "";
                          var po_header = "";

                          for(var i = 0;i<js.length;i++){
                            //console.log(js[i].code);
                            po_ven += '<a href="#" data-transition="slidefade" class="ui-btn" onclick="select_op_vender(';
                            po_ven += "'"+js[i].docNo+"')";
                            po_ven += '">'+js[i].docNo+'</a>';
                            po_header = "ชื่อ vender : "+js[i].apName;

                          }
                        document.getElementById("po_head").innerHTML = po_header;
                        document.getElementById("po_detail").innerHTML = po_ven;
                        $.mobile.changePage("#receive_item");
                    },
                    error: function (error){
                        console.log(error);
                    }
                });

                //$.mobile.changePage("#receive_item");
}
function select_op_vender(get_detail){
	$.ajax({
                                                     url: "http://qserver.nopadol.com:8080/NPReceiveWs/po/podetails",
                                                     data: '{"accessToken":"","search":"'+get_detail+'"}',
                                                     contentType: "application/json; charset=utf-8",
                                                     dataType: "json",
                                                     type: "POST",
                                                     cache: false,
                                                     success: function(po_detail){
                                                     //console.log(JSON.stringify(po_detail));
                                                     console.log(po_detail.resp.isSuccess);
                                                     if(po_detail.resp.isSuccess==1){
                                                     var po_d = JSON.stringify(po_detail);
                                                     var po_ds = po_d.split(":[");
                                                     var str = po_ds[1].split("]}");
                                                     po_d = "["+str[0]+"]";
                                                     var js = jQuery.parseJSON(po_d);
                                                    // alert(JSON.stringify(po_detail.isSuccess));
                                                     //console.log(JSON.stringify(js));
                                                                            //document.getElementById("PO").innerHTML = JSON.stringify(js);
                                                     var count = js.length;
                                                                                 var po_de_head = "";                         //console.log(count);
                                                                                 var po_de = "";

                                                                                 po_de_head += "<h2 class='sub_title'>เลขที่ PO :"+po_detail.docNo+"</h2>";
                                                                                 po_de_head += "<p> วันที่ออกเอกสาร :"+po_detail.docDate+"</p>";
                                                                                 po_de_head += "<p>รหัสเจ้าหนี้ :"+po_detail.apCode+"</p>";
                                                                                 po_de_head += "<p>ชื่อเจ้าหนี้ :"+po_detail.apName+"</p>";
                                                                                 po_de_head += "<p>ราคารวม :"+po_detail.sumOfItemAmount.toLocaleString()+" บาท</p>";
                                                                                 po_de_head += "<p>ราคารวมภาษี :"+po_detail.totalAmount.toLocaleString()+" บาท</p>";



                                                                                 po_de += '<label><div class="ui-grid-c" style="text-align:center;  font-size:14px;">';
                                                                                 po_de += '<div class="ui-block-a"><b>สินค้า</b></div>';
                                                                                 po_de += '<div class="ui-block-b"><b>จำนวน</b></div>';
                                                                                 po_de += '<div class="ui-block-c"><b>ราคา/หน่วย</b></div>';
                                                                                 po_de += '<div class="ui-block-d"><b>รวม</b></div></div></label><hr>';
                                                                                 for(var i = 0;i<js.length;i++){
                                                                                 //console.log(js[i].code);
                                                                                 po_de += '<div class="ui-grid-c" style="text-align:center; font-size:12px;">'
                                                                                 po_de += '<div class="ui-block-a">'+js[i].itemName+'</div>';
                                                                                 po_de += '<div class="ui-block-b">'+js[i].qty+' '+js[i].unitCode+'</div>';
                                                                                 po_de += '<div class="ui-block-c">'+js[i].price.toLocaleString()+' บาท</div>';
                                                                                 po_de += '<div class="ui-block-d">'+js[i].amount.toLocaleString()+' บาท</div></div><hr>';

                                                                                                 }
                                                                                 po_de += '</table>';
                                                                                 document.getElementById("po_head").innerHTML = po_de_head;
                                                                                 document.getElementById("po_detail").innerHTML = po_de;
                                                                                 $.mobile.changePage("#receive_item");
                                                                                 }else if(po_detail.resp.isSuccess==0){alert("Barcode ไม่ถูกต้อง !!");}
                                                                                 },
                                                                                 error: function (error){
                                                                                 alert(error);
                                                                                }


                                                 });
}