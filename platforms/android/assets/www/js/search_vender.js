$(document).ready(function(){


               /* $.ajax({
                   url: localStorage.api_url_server+localStorage.api_url_vender,
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
                            po += '<a href="#" data-transition="slidefade" class="ui-btn ui-corner-all" onclick="select_vender(';
                            po += "'"+js[i].code+"')";
                            po += '">'+js[i].name+'</a>';

                          }
                        document.getElementById("polist").innerHTML = po;
                           },
                    error: function (error){
                        console.log(error);
                    }

                });*/

searchpo();
});

function searchpo(){
//alert(localStorage.api_url_server+""+localStorage.api_url_vender);
        //alert(search_po.search.value)
        $.ajax({
                   url: localStorage.api_url_server+""+localStorage.api_url_vender,
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
                            po += '<a href="#" data-transition="slidefade" class="ui-btn ui-corner-all" onclick="select_vender(';
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
                   url: localStorage.api_url_server+""+localStorage.api_url_poList,
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
                            po_ven += '<a href="#" data-transition="slidefade" class="ui-btn ui-corner-all" onclick="select_op_vender(';
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
                                                     url: localStorage.api_url_server+""+localStorage.api_url_poDetail,
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
                                                     //alert(count)
                                                                                 var po_de_head = "";                         //console.log(count);
                                                                                 var po_de = "";

                                                                                 po_de_head += "<h2 class='sub_title'>เลขที่ PO :"+po_detail.docNo+"</h2>";
                                                                                 po_de_head += "<p> วันที่ออกเอกสาร :"+po_detail.docDate+"</p>";
                                                                                 po_de_head += "<p>รหัสเจ้าหนี้ :"+po_detail.apCode+"</p>";
                                                                                 po_de_head += "<p>ชื่อเจ้าหนี้ :"+po_detail.apName+"</p>";
                                                                                 po_de_head += "<p>ราคารวม :"+po_detail.sumOfItemAmount.toLocaleString()+" บาท</p>";
                                                                                 po_de_head += "<p>ราคารวมภาษี :"+po_detail.totalAmount.toLocaleString()+" บาท</p>";
                                                                                 localStorage.apcode = po_detail.apCode;
                                                                                 localStorage.porefno = po_detail.docNo;




                                                                                 po_de += '<label><div class="ui-grid-d" style="text-align:center;  font-size:14px;">';
                                                                                 po_de += '<div class="ui-block-a"><b>สินค้า</b></div>';
                                                                                 po_de += '<div class="ui-block-b"><b>จำนวน</b></div>';
                                                                                 po_de += '<div class="ui-block-c"><b>ราคา/หน่วย</b></div>';
                                                                                 po_de += '<div class="ui-block-d"><b>ราคา</b></div>';
                                                                                 po_de += '<div class="ui-block-e"><b>สถานะ</b></div></div></label><hr>';
                                                                                 for(var i = 0;i<js.length;i++){
                                                                                 //console.log(js[i].code);
                                                                                 po_de += '<div class="ui-grid-d" style="text-align:center; font-size:12px;">'
                                                                                 po_de += '<div class="ui-block-a"> '+js[i].itemName+' </div>';
                                                                                 po_de += '<div class="ui-block-b"> '+js[i].remainQty+' '+js[i].unitCode+' </div>';
                                                                                 po_de += '<div class="ui-block-c"> '+js[i].price.toLocaleString()+' </div>';
                                                                                 po_de += '<div class="ui-block-d"> '+js[i].amount.toLocaleString()+' </div>';

                                                                                 po_de += '<div class="ui-block-d"><img src="images/Warning.png" class="receive_status"></div></div><hr>';

                                                                                 //po_de += '<div class="ui-block-d">'+js[i].amount.toLocaleString()+' บาท</div></div><hr>';

                                                                                                 }
                                                                                 //po_de += '</table>';
                                                                                  po_de +='<a href="#" onclick="search_rc_no()" class="ui-btn ui-corner-all">แสดงใบรับสินค้า</a>';
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

function search_rc_no(rc_no){
if(localStorage.receiveNumber){
                alert(localStorage.porefno+" "+localStorage.receiveNumber);

	                $.ajax({
                                                     url: localStorage.api_url_server+""+localStorage.api_url_search,
                                                     data: '{"accessToken":"","docNo":"'+localStorage.porefno+'","recNo":"'+localStorage.receiveNumber+'"}',
                                                     //{"accessToken":"","docNo":"'+localStorage.porefno+'","recNo":"'+localStorage.receiveNumber+'"}
                                                     contentType: "application/json; charset=utf-8",
                                                     dataType: "json",
                                                     type: "POST",
                                                     cache: false,
                                                     success: function(rc_detail){
                                                     console.log(JSON.stringify(rc_detail));
                                                     //console.log(rc_detail.resp.isSuccess);
                                                     if(rc_detail.resp.isSuccess==1){
                                                     var rc_d = JSON.stringify(rc_detail);
                                                     var rc_ds = rc_d.split(":[");
                                                     var str = rc_ds[1].split("]}");
                                                     rc_d = "["+str[0]+"]";
                                                     var js = jQuery.parseJSON(rc_d);
                                                    // alert(JSON.stringify(rc_detail.isSuccess));
                                                     //console.log(JSON.stringify(js));
                                                                            //document.getElementById("PO").innerHTML = JSON.stringify(js);
                                                     var count = js.length;
                                                     //alert(count)
                                                                                 var rc_de_head = "";                         //console.log(count);
                                                                                 var rc_de = "";
                                                                                 rc_de_head += "<h2 class='sub_title'>เลขที่ ใบรับเข้า :"+localStorage.receiveNumber+"</h2>";
                                                                                 rc_de_head += "<h2 class='sub_title'>เลขที่ PO :"+rc_detail.docNo+"</h2>";
                                                                                 rc_de_head += "<p> วันที่ออกเอกสาร :"+rc_detail.docDate+"</p>";
                                                                                 rc_de_head += "<p>รหัสเจ้าหนี้ :"+rc_detail.apCode+"</p>";
                                                                                 rc_de_head += "<p>ชื่อเจ้าหนี้ :"+rc_detail.apName+"</p>";
                                                                                 rc_de_head += "<p>ราคารวม :"+rc_detail.sumOfItemAmount.toLocaleString()+" บาท</p>";
                                                                                 rc_de_head += "<p>ราคารวมภาษี :"+rc_detail.totalAmount.toLocaleString()+" บาท</p>";
                                                                                 localStorage.apcode = rc_detail.apCode;
                                                                                 localStorage.porefno = rc_detail.docNo;




                                                                                 rc_de += '<label><div class="ui-grid-d" style="text-align:center;  font-size:14px;">';
                                                                                 rc_de += '<div class="ui-block-a"><b>สินค้า</b></div>';
                                                                                 rc_de += '<div class="ui-block-b"><b>จำนวน</b></div>';
                                                                                 rc_de += '<div class="ui-block-c"><b>ราคา/หน่วย</b></div>';
                                                                                 rc_de += '<div class="ui-block-d"><b>จำนวนรับเข้า</b></div>';
                                                                                 rc_de += '<div class="ui-block-e"><b>สถานะ</b></div></div></label><hr>';
                                                                                 for(var i = 0;i<js.length;i++){
                                                                                 //console.log(js[i].code);
                                                                                 rc_de += '<div class="ui-grid-d" style="text-align:center; font-size:12px;">'
                                                                                 rc_de += '<div class="ui-block-a">'+js[i].itemName+'</div>';
                                                                                 rc_de += '<div class="ui-block-b"> '+js[i].remainQty+' '+js[i].unitCode+' </div>';
                                                                                 rc_de += '<div class="ui-block-c"> '+js[i].price.toLocaleString()+' </div>';
                                                                                 rc_de += '<div class="ui-block-d"> '+js[i].rcQty+' </div>';
                                                                                 //rc_de += '<div class="ui-block-d"> '+js[i].amount.toLocaleString()+' </div>';

                                                                                  if(js[i].status==0){
                                                                                    rc_de += '<div class="ui-block-d"><img src="images/Warning.png" class="receive_status"></div></div><hr>';
                                                                                  }else if(js[i].status==1){
                                                                                    rc_de += '<div class="ui-block-d"><img src="images/tick.png" class="receive_status"></div></div><hr>';
                                                                                  }else if(js[i].status==2){
                                                                                    rc_de += '<div class="ui-block-d"><img src="images/minus.png" class="receive_status"></div></div><hr>';
                                                                                  }else if(js[i].status==3){
                                                                                    rc_de += '<div class="ui-block-d"><img src="images/plus.png" class="receive_status"></div></div><hr>';
                                                                                  }else if(js[i].status==4){
                                                                                    rc_de += '<div class="ui-block-d"><img src="images/private.png" class="receive_status"></div></div><hr>';
                                                                                  }
                                                                                 //rc_de += '<div class="ui-block-d">'+js[i].amount.toLocaleString()+' บาท</div></div><hr>';

                                                                                                 }
                                                                                 //rc_de += '</table>';
                                                                                 document.getElementById("po_head").innerHTML = rc_de_head;
                                                                                 document.getElementById("po_detail").innerHTML = rc_de;
                                                                                 $.mobile.changePage("#receive_item");
                                                                                 }else if(rc_detail.resp.isSuccess==0){alert("Barcode ไม่ถูกต้อง !!");}
                                                                                 },
                                                                                 error: function (error){
                                                                                 alert(error);
                                                                                }


                                                 });
                                                 }else{
                                                 alert("ไม่มีใบรับเข้า !!");
                                                 }
}

function search_receive(){
se_item ="";
se_item +="<a href='#' class='ui-btn ui-corner-all'>item 1</a>";
se_item +="<a href='#' class='ui-btn ui-corner-all'>item 2</a>";
se_item +="<a href='#' class='ui-btn ui-corner-all'>item 3</a>";
document.getElementById("show_search_item").innerHTML = se_item;
}