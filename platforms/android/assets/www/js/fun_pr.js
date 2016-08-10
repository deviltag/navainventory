localStorage.apcode = "";
localStorage.apname = "";
window.addEventListener('native.onscanbarcode', function (pr) {
       var page = "";
       //alert(pr.scanResult);
       console.log(pr.scanResult);
       localStorage.barcode = pr.scanResult;

       if(page == ""){
         page = $.mobile.activePage.attr('id');
       }
       $(document).on("pageshow", function (e, data) {
          page = $(this)[0].activeElement.id;
       });

       console.log(page);
                			//document.getElementById("noitems").value = pr.scanResult;
       switch(page){
             case "pageone" :
             //alert(localStorage.api_url_server_nava+""+localStorage.api_url_login)
                                $.ajax({
                                    url: localStorage.api_url_server_nava+""+localStorage.api_url_login,
                                    data: '{"name":"tom","password":"1234"}',
                                    contentType: "application/json; charset=utf-8",
                                    dataType: "json",
                                    type: "POST",
                                    cache: false,
                                       success: function(result){
                                        //var obj = JSON.stringify(result);
                                        alertify.success("login : "+result.Message+" สถานะ : "+result.Status);
                                        console.log(result);
                                        $.mobile.changePage("#pagetwo");
                                        },
                                       error: function (error) {
                                       alertify.error("can't call api");
                                        //alert("can't call api");
                                        $.mobile.changePage("#pagetwo");
                                        }

                                  });

                                  return false;
                                 // $.mobile.changePage("#pagetwo");

                			 break;
             case "pluspr" : //alert("M150");
                             console.log(document.getElementById("DocNo").value);
                             var DocNo = document.getElementById("DocNo").value;
                                $.ajax({
                                           url: localStorage.api_url_server+""+localStorage.api_url_search_item_pr,
                                           data: '{"barcode":"'+pr.scanResult+'","docno":"'+DocNo+'"}',
                                           contentType: "application/json; charset=utf-8",
                                           dataType: "json",
                                           type: "POST",
                                           cache: false,
                                           success: function(result){
                                                //console.log(JSON.stringify(result));
                                                //console.log(JSON.stringify(result.listBarcode));
                                                var itemcode = "";
                                                var itemName = "";
                                                var range = "";
                                                var cntitem = "";
                                                var units = "";
                                                var apcode = "";
                                                var apname = "";
                                                if(result.listBarcode==null){
                                                    console.log("data listbarcode : null");

                                                    $.each(result.listPRBarcode, function(key, val) {
                                                           itemcode = val['itemcode'];
                                                           itemName = val['itemname'];
                                                           range = val['range'];
                                                           cntitem = val['qty'];
                                                           units = val['unitcode'];
                                                           apcode = val['apCode'];
                                                           apname = val['apName'];

                                                    });

                                                }else{
                                                    $.each(result.listBarcode, function(key, val) {
                                                        itemcode = val['itemcode'];
                                                        itemName = val['itemname'];
                                                        range = val['range'];
                                                        cntitem = val['qty'];
                                                        units = val['unitcode'];
                                                        apcode = val['apCode'];
                                                        apname = val['apName'];
                                                    });
                                                }
                                                if(localStorage.apcode == ""){
                                                    if(apcode==0){
                                                        var ven = "กรุณากรอกข้อมูลเจ้าหนี้";
                                                        var venname = "-- ชื่อเจ้าหนี้ --";
                                                        document.getElementById("vender").value = localStorage.apcode;
                                                        document.getElementById("vender").placeholder = ven;
                                                        document.getElementById("nameven").innerHTML = venname;
                                                        document.getElementById("apCodeven").value = "null";
                                                    }else{
                                                        var ven = apcode;
                                                        var venname = apname;
                                                        localStorage.apcode = ven;
                                                        localStorage.apname = venname;
                                                        document.getElementById("vender").value = localStorage.apcode;
                                                        document.getElementById("apCodeven").value = localStorage.apcode;
                                                        document.getElementById("nameven").innerHTML = venname;
                                                    }

                                                }else{
                                                    document.getElementById("vender").value = localStorage.apcode;

                                                }
                                                console.log(localStorage.apcode);
                                                $("#additem").bind('pageshow', function() {
                                                    $('#citem').focus();
                                                });
                                                document.getElementById("DocNo").value = DocNo;
                                                document.getElementById("noitems").value = pr.scanResult;
                                                document.getElementById("nameitems").value = itemName;
                                                document.getElementById("gradeitem").value = range;
                                                document.getElementById("units").value = units;
                                                if(cntitem==0){
                                                    document.getElementById("citem").value = "";
                                                }else{
                                                    document.getElementById("citem").value = cntitem;
                                                }

                                                document.getElementById("Tnoitem").innerHTML = pr.scanResult;
                                                document.getElementById("TNameitem").innerHTML = itemName;
                                                document.getElementById("Tgrade").innerHTML = range;
                                                document.getElementById("Tunit").innerHTML = units;
                                           },
                                           error: function (error) {
                                           alertify.error("can't call api");
                                           $.mobile.changePage("#pluspr");
                                           }

                                        });




                                 $("#itemdetail").show();
                                 $("#scanbaritem").hide();
                                 //document.getElementById("citem").focus();
                                 $.mobile.changePage("#additem");



                             break;

             case "additem" : //alert("M150");
                                          console.log(document.getElementById("DocNo").value);
                                          var DocNo = document.getElementById("DocNo").value;
                                             $.ajax({
                                                        url: localStorage.api_url_server+""+localStorage.api_url_search_item_pr,
                                                        data: '{"docno":"'+DocNo+'","barcode":"'+pr.scanResult+'"}',
                                                        contentType: "application/json; charset=utf-8",
                                                        dataType: "json",
                                                        type: "POST",
                                                        cache: false,
                                                        success: function(result){
                                                             //console.log(JSON.stringify(result));
                                                             //console.log(JSON.stringify(result.listBarcode));
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
                                                                       cntitem = val['qty'];
                                                                       units = val['unitcode'];
                                                                       apcode = val['apCode'];
                                                                       apname = val['apName'];

                                                                });

                                                            }else{
                                                                $.each(result.listBarcode, function(key, val) {
                                                                    itemcode = val['itemcode'];
                                                                    itemName = val['itemname'];
                                                                    range = val['range'];
                                                                    cntitem = val['qty'];
                                                                    units = val['unitcode'];
                                                                    apcode = val['apCode'];
                                                                    apname = val['apName'];
                                                                });
                                                            }
                                                            if(localStorage.apcode == ""){
                                                                if(apcode==0){
                                                                    var ven = "กรุณากรอกข้อมูลเจ้าหนี้";
                                                                    var venname = "-- ชื่อเจ้าหนี้ --";
                                                                    document.getElementById("vender").value = localStorage.apcode;
                                                                    document.getElementById("vender").placeholder = ven;
                                                                    document.getElementById("nameven").innerHTML = venname;
                                                                }else{
                                                                    var ven = apcode;
                                                                    var venname = apname;
                                                                    localStorage.apcode = ven;
                                                                    localStorage.apname = venname;
                                                                    document.getElementById("vender").value = localStorage.apcode;
                                                                    document.getElementById("apCodeven").value = localStorage.apcode;
                                                                    document.getElementById("nameven").innerHTML = venname;
                                                                }

                                                            }else{
                                                                document.getElementById("vender").value = localStorage.apcode;

                                                            }
                                                            $("#additem").bind('pageshow', function() {
                                                                $('#citem').focus();
                                                            });
                                                             document.getElementById("DocNo").value = DocNo;
                                                             document.getElementById("noitems").value = pr.scanResult;
                                                             document.getElementById("nameitems").value = itemName;
                                                             document.getElementById("gradeitem").value = range;
                                                             document.getElementById("units").value = units;
                                                             if(cntitem==0){
                                                                 document.getElementById("citem").value = "";
                                                             }else{
                                                                 document.getElementById("citem").value = cntitem;
                                                             }

                                                             document.getElementById("Tnoitem").innerHTML = pr.scanResult;
                                                             document.getElementById("TNameitem").innerHTML = itemName;
                                                             document.getElementById("Tgrade").innerHTML = range;
                                                             document.getElementById("Tunit").innerHTML = units;
                                                        },
                                                        error: function (error) {
                                                        alertify.error("can't call api");
                                                        $.mobile.changePage("#pluspr");
                                                        }

                                                     });




                                              $("#itemdetail").show();
                                              $("#scanbaritem").hide();
                                              //document.getElementById("citem").focus();
                                              $.mobile.changePage("#additem");



                                          break;



                             			}
});
//function prlist(){
            $.ajax({
                   url: localStorage.api_url_server+localStorage.api_url_prlist,
                   data: '{"type":"0","search":"58089"}',
                   contentType: "application/json; charset=utf-8",
                   dataType: "json",
                   type: "POST",
                   cache: false,
                   success: function(result){
                        //console.log(JSON.stringify(result));
                        var prl = JSON.stringify(result);
                        //console.log(prl);
                        var prlp = prl.split(":[");
                        var str = prlp[1].split("]}");
                        prl = "["+str[0]+"]";
                        var js = jQuery.parseJSON(prl);
                        var prlist = "";
                        var wdate = "";
                        var x = 1;
                        $.each(js, function(key, val) {
                           //console.log(val['docNo']);

                           prlist += '<label class="todo-listview" data-view-id="';
                           prlist += "'"+val['docNo']+"'";
                           prlist += '" data-row-id="'+x+'" id="'+x+'"><a href="#" onclick="prdetail(';
                           prlist += "'"+val['docNo']+"'";
                           prlist += ')" ><div class="ui-grid-c" style="text-align:center; font-size:14px;">';
                           prlist += '<div class="ui-block-a" data-view-id="1">'+val['docNo']+'</div>';

                           var wantDate = val['wantDate'];
                           if(wantDate!=null){
                           wdate = val['wantDate'].split("-");
                           day = wdate[2];
                           month = wdate[1];
                           year = (parseInt(wdate[0])+543);

                           wantDate = day+"/"+month+"/"+year;
                           }

                           prlist += '<div class="ui-block-b">'+wantDate+'</div>';
                           prlist += '<div class="ui-block-c">'+val['diffDate']+' วัน</div>';
                               switch (val['status']){
                                    case 1 : var status = "<img src='images/Warning.png' width='24'>";
                                            break;
                                    case 2 : var status = "<img src='images/quick.png' width='24'>";
                                            break;
                                    default: var status = "";
                                            break;
                               }
<<<<<<< HEAD
                                    var today = new Date();
                                    var dd = today.getDate();
                                    var mm = today.getMonth()+1; //January is 0!

                                    var yyyy = today.getFullYear();
                                    if(dd<10){
                                        dd='0'+dd
                                    }
                                    if(mm<10){
                                        mm='0'+mm
                                    }
                                    var n = yyyy+'-'+mm+'-'+dd;
=======
                                   var d = new Date();
                                   var today = d.getDate().length;
                                    if(today<1){today="0"+d.getDate();}else{today=d.getDate();}
                                   var tomonth = d.getMonth().length;
                                    if(tomonth<1){tomonth="0"+(d.getMonth()+1);}else{tomonth="0"+d.getMonth();}
                                   var n = d.getFullYear()+"-"+tomonth+"-"+today;
>>>>>>> origin/master
                                   //console.log(n);
                                   switch (val['docDate']){
                                        case n :
                                               status += "<img src='images/New.png' width='24'>";
                                               break;
                                   }

                           prlist += '<div class="ui-block-d">'+status+'</div>';
                           prlist += '</div></label></a><hr>';
                            x++;
                        });
                        document.getElementById("prlist").innerHTML = prlist;

                        //console.log(JSON.stringify(js));

                      //  $.mobile.changePage("#pagepr");
                           },
                        error: function (error){
                        console.log(JSON.stringify(error));
<<<<<<< HEAD
                        alertify.error("api qserver can't connect!!");
=======
                        alert("api qserver this not connected!!");
>>>>>>> origin/master
                       // $.mobile.changePage("#pagepr");
                   }

                   });
//}
//window.setInterval(prlist, 1000);

$(document).on('taphold', '.todo-listview', function() {
       // console.log("DEBUG - Go popup");
      var link_name = $(this).attr('data-view-id');
      var link_id = $(this).attr('data-row-id');
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
   'padding': '10%',
   'color': '#fff',
   'background': 'red'
   });
    console.log('#'+link_id);
    $("<a>", {
    text: "Cancel",
    href: "#",
    onclick: "cancelPR("+link_name+");"
    }).appendTo($popUp);

    $popUp.popup('open').enhanceWithin();

    });
function cancelPR(Docno){
  //alert(Docno);
$.ajax({
    url: localStorage.api_url_server+"NPInventoryWs/pr/cancelPR",
    data: '{"accessToken": "","docNo": "'+Docno+'","userID": "58089","isCancel": "1"}',
    contentType: "application/json; charset=utf-8",
    dataType: "json",
    type: "POST",
    cache: false,
    success: function(isCancel){
    console.log(isCancel);
    $.ajax({
           url: localStorage.api_url_server+localStorage.api_url_prlist,
           data: '{"type":"0","search":"58089"}',
           contentType: "application/json; charset=utf-8",
           dataType: "json",
           type: "POST",
           cache: false,
           success: function(result){
               //console.log(JSON.stringify(result));
               var prl = JSON.stringify(result);
               //console.log(prl);
               var prlp = prl.split(":[");
               var str = prlp[1].split("]}");
               prl = "["+str[0]+"]";
               var js = jQuery.parseJSON(prl);
               var prlist = "";
               var wdate = "";
               var x = 1;
                  $.each(js, function(key, val) {
                  //console.log(val['docNo']);

                  prlist += '<label class="todo-listview" data-view-id="';
                  prlist += "'"+val['docNo']+"'";
                  prlist += '" data-row-id="'+x+'" id="'+x+'"><a href="#" onclick="prdetail(';
                  prlist += "'"+val['docNo']+"'";
                  prlist += ')" ><div class="ui-grid-c" style="text-align:center; font-size:14px;">';
                  prlist += '<div class="ui-block-a" data-view-id="1">'+val['docNo']+'</div>';

                  var wantDate = val['wantDate'];
                  if(wantDate!=null){
                  wdate = val['wantDate'].split("-");
                  day = wdate[2];
                  month = wdate[1];
                  year = (parseInt(wdate[0])+543);

                  wantDate = day+"/"+month+"/"+year;
                  }

                  prlist += '<div class="ui-block-b">'+wantDate+'</div>';
                  prlist += '<div class="ui-block-c">'+val['diffDate']+' วัน</div>';
                  switch (val['status']){
                      case 1 : var status = "<img src='images/Warning.png' width='24'>";
                               break;
                      case 2 : var status = "<img src='images/quick.png' width='24'>";
                               break;
                      default: var status = "";
                               break;
                  }
<<<<<<< HEAD
                    var today = new Date();
                    var dd = today.getDate();
                    var mm = today.getMonth()+1; //January is 0!

                    var yyyy = today.getFullYear();
                    if(dd<10){
                        dd='0'+dd
                    }
                    if(mm<10){
                        mm='0'+mm
                    }
                    var n = yyyy+'-'+mm+'-'+dd;
=======
                   var d = new Date();
                   var today = d.getDate().length;
                   if(today<1){today="0"+d.getDate();}else{today=d.getDate();}
                   var tomonth = d.getMonth().length;
                   if(tomonth<1){tomonth="0"+(d.getMonth()+1);}else{tomonth="0"+d.getMonth();}
                   var n = d.getFullYear()+"-"+tomonth+"-"+today;
>>>>>>> origin/master
                  //console.log(n);
                  switch (val['docDate']){
                      case n :
                               status += "<img src='images/New.png' width='24'>";
                               break;
                  }

                           prlist += '<div class="ui-block-d">'+status+'</div>';
                           prlist += '</div></label></a><hr>';
                            x++;
                        });
                        document.getElementById("prlist").innerHTML = prlist;

                        //console.log(JSON.stringify(js));

                       $.mobile.changePage("#pagepr");
                           },
                   error: function (error){
                        console.log(JSON.stringify(error));
                       // $.mobile.changePage("#pagepr");
                   }

                   });
    },
    error: function(error){
        console.log(JSON.stringify(error));
    }

});
  }



function backdetail(){
    console.log("backlink");
    var Docno = document.getElementById("DocNo").value;
     $.ajax({
            url: localStorage.api_url_server+""+localStorage.api_url_prdetail,
            data: '{"type":"0","searchDocno":"'+Docno+'"}',
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            type: "POST",
            cache: false,
            success: function(result){
                     var prl = JSON.stringify(result);
                     var prlp = prl.split(":[");
                     var str = prlp[1].split("]}");
                     prl = "["+str[0]+"]";
                     var js = jQuery.parseJSON(prl);
                     console.log(js);
                     if(JSON.stringify(js)=="[]"){
                        if (confirm('รายการนี้ไม่สมบูรณ์ ท่านต้องการยกเลิกการทำรายการนี้หรือไม่ ?')) {
                        var Docno = document.getElementById("DocNo").value;
                        cancelPR(Docno);
                        console.log("cancel pr");
                        }else{
                           $.mobile.changePage("#pluspr",{transition: 'slidefade',reverse: true});
                        }
                     }else{
                        if (confirm('ใบ PR นี้มีสินค้าอยู่ ท่านต้องกายกเลิกหรือไม่ ?')) {
                        var Docno = document.getElementById("DocNo").value;
                        cancelPR(Docno);
                        console.log("cancel pr");
                        }else{
                            $.mobile.changePage("pluspr",{transition: 'slidefade',reverse: true});
                        }
                     }
            }
     });

}


function prdetail(DocNo){
    //alert(DocNo);
    //document.getElementById("LDocNo").value = DocNo;
    $.ajax({
                       url: localStorage.api_url_server+""+localStorage.api_url_prdetail,
                       data: '{"type":"0","searchDocno":"'+DocNo+'"}',
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
                            var no = "";
                            var wdate = "";
                            var state = "";
                            var dif = "";
                            var ite = 1;
                            var detail = "";

                           console.log(JSON.stringify(js));
<<<<<<< HEAD
                            var today = new Date();
                            var dd = today.getDate();
                            var mm = today.getMonth()+1; //January is 0!

                            var yyyy = today.getFullYear();
                            if(dd<10){
                                dd='0'+dd
                            }
                            if(mm<10){
                                mm='0'+mm
                            }
                            var n = yyyy+'-'+mm+'-'+dd;
=======
                            var d = new Date();
                            var today = d.getDate().length;
                            if(today<1){today="0"+d.getDate();}else{today=d.getDate();}
                            var tomonth = d.getMonth().length;
                            if(tomonth<1){tomonth="0"+(d.getMonth()+1);}else{tomonth="0"+d.getMonth();}
                            var n = d.getFullYear()+"-"+tomonth+"-"+today;
>>>>>>> origin/master
                            console.log(n);
                            var state = "";
                           $.each(js, function(key, val) {

                               switch (val['status']){
                                    case 1 : state = "<img src='images/Warning.png' width='24'> ค้าง";
                                            break;
                                    case 2 : state = "<img src='images/quick.png' width='24'> ด่วน";
                                            break;
                                    default : state = "";
                                            break;
                               }


                                   switch (val['docDate']){
                                        case n :
                                               state += "<img src='images/New.png' width='24'>ใหม่";
                                               break;
                                   }

                                no = val['docNo'];

                               wdate = val['wantDate'];
                               if(wdate!=null){
                               wdate = val['wantDate'].split("-");
                               day = wdate[2];
                               month = wdate[1];
                               year = (parseInt(wdate[0])+543);

                               wdate = day+"/"+month+"/"+year;
                               }
                                var itemno = val['itemcode'];
                                if(val['iscancel']==1){
                                    var blur = 'class="todo-detailitem-hold blur"';
                                }else{
                                    var blur = 'class="todo-detailitem"';
                                }
                               // wdate = val['wantDate'];
                                //state = val['status'];
                                dif = val['diffdate'];
                                detail +='<label '+blur+' data-item-id="'+val['docNo']+'/'+itemno+'/'+val['itemname']+'/'+val['qty']+'/'+val['unitcode']+'" data-detail-id="i'+ite+'" id="i'+ite+'" style="border-bottom:1.5px dashed black; padding-bottom:5%; margin-bottom:4%;">';
                                detail += "<div class='ui-grid-a' style='margin-top:2%; margin-left:0;'>";
                                detail += "<div class='ui-block-a' style='text-align:right; padding-right:10%;'><b>รหัสสินค้า</b></div><div class='ui-block-b'>"+val['itemcode']+"</div>";
                                detail += "</div>";

                                detail += "<div class='ui-grid-a' style='margin-top:2%; margin-left:0;'>";
                                detail += "<div class='ui-block-a' style='text-align:right; padding-right:10%;'><b>ชื่อสินค้า</b></div><div class='ui-block-b'>"+val['itemname']+"</div>";
                                detail += "</div>";

                                detail += "<div class='ui-grid-a' style='margin-top:2%; margin-left:0;'>";
                                detail += "<div class='ui-block-a' style='text-align:right; padding-right:10%;'><b>Range</b></div><div class='ui-block-b'>"+val['range']+"</div>";
                                detail += "</div>";

                                detail += "<div class='ui-grid-a' style='margin-top:2%; margin-left:0;'>";
                                detail += "<div class='ui-block-a' style='text-align:right; padding-right:10%;'><b>จำนวน</b></div><div class='ui-block-b'>"+val['qty']+"&nbsp;"+val['unitcode']+"</div>";
                                detail += "</div></label>";

                                ite++;

                            });

                            document.getElementById("LDocNo").innerHTML = no;
                            document.getElementById("wantdate").innerHTML = wdate;
                            document.getElementById("status").innerHTML = state;
                            document.getElementById("diffdate").innerHTML = dif;

                            document.getElementById("prldetail").innerHTML = detail;

                            $.mobile.changePage("#listpr");
                               },
                       error: function (error){
                            console.log(error);
                            $.mobile.changePage("#pagepr");
                       }

           });

   // $.mobile.changePage("#listpr");
}
////////////////////////////////////////////////////////////
$(document).on('taphold', '.todo-detailitem', function() {
      console.log("this hold");
      var link_name = $(this).attr('data-item-id');
      var link_data = $(this).attr('data-detail-id');
      var link_id = $(this).attr('id');
      var data = link_name.split("/");
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
   'padding': '10%',
   'color': '#fff',
   'background': 'red'
   });
    console.log(link_name);
    console.log('#'+link_id);
    $("<a>", {
    text: "Cancel",
    href: "#",
    onclick: "MyItemdetail('"+data[0]+"','"+data[1]+"', '"+data[2]+"', "+data[3]+", '"+data[4]+"');"
    }).appendTo($popUp);

    $popUp.popup('open').enhanceWithin();

    });

function MyItemdetail(DocNo, itemcode, itemname, qty, unitcode){
    console.log("detailItem "+DocNo+" "+itemcode+" "+itemname+" "+qty+" "+unitcode+" isCancel:1");
    $.ajax({
           url: localStorage.api_url_server+""+localStorage.api_url_insertpr,
           data: '{"docNo":"'+DocNo+'","itemCode":"'+itemcode+'","itemName":"'+itemname+'","unitcode":"'+unitcode+'","qty":"'+qty+'","isCancel":"1"}',
           contentType: "application/json; charset=utf-8",
           dataType: "json",
           type: "POST",
           cache: false,
           success: function(result){
                console.log(JSON.stringify(result));
                $.ajax({
                       url: localStorage.api_url_server+""+localStorage.api_url_prdetail,
                       data: '{"type":"0","searchDocno":"'+DocNo+'"}',
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
                            var no = "";
                            var wdate = "";
                            var state = "";
                            var dif = "";
                            var ite = 1;
                            var detail = "";

                      //     console.log(JSON.stringify(js));

                           $.each(js, function(key, val) {
                               switch (val['status']){
                                    case 1 : state = "<img src='images/Warning.png' width='24'> ค้าง";
                                            break;
                                    case 2 : state = "<img src='images/quick.png' width='24'> ด่วน";
                                            break;
                                    default : state = "";
                                            break;
                               }
<<<<<<< HEAD
                                    var today = new Date();
                                    var dd = today.getDate();
                                    var mm = today.getMonth()+1; //January is 0!

                                    var yyyy = today.getFullYear();
                                    if(dd<10){
                                        dd='0'+dd
                                    }
                                    if(mm<10){
                                        mm='0'+mm
                                    }
                                    var n = yyyy+'-'+mm+'-'+dd;
                                   console.log(n);
=======
                                   var d = new Date();
                                   var today = d.getDate().length;
                                    if(today<1){today="0"+d.getDate();}else{today=d.getDate();}
                                   var tomonth = d.getMonth().length;
                                    if(tomonth<1){tomonth="0"+(d.getMonth()+1);}else{tomonth="0"+d.getMonth();}
                                   var n = d.getFullYear()+"-"+tomonth+"-"+today;
>>>>>>> origin/master
                                   switch (val['docDate']){
                                        case n :
                                               state += ",<img src='images/New.png' width='24'> ใหม่";
                                               break;
                                   }
                                no = val['docNo'];

                               wdate = val['wantDate'];
                               if(wdate!=null){
                               wdate = val['wantDate'].split("-");
                               day = wdate[2];
                               month = wdate[1];
                               year = (parseInt(wdate[0])+543);

                               wdate = day+"/"+month+"/"+year;
                               }
                                var itemno = val['itemcode'];

                                if(val['iscancel']==1){
                                    var blur = 'class="todo-detailitem-hold blur"';
                                }else{
                                    var blur = 'class="todo-detailitem"';
                                }
                               // wdate = val['wantDate'];
                                //state = val['status'];
                                dif = val['diffdate'];
                                detail +='<label '+blur+' data-item-id="'+val['docNo']+'/'+itemno+'/'+val['itemname']+'/'+val['qty']+'/'+val['unitcode']+'" data-detail-id="i'+ite+'" id="i'+ite+'" style="border-bottom:1.5px dashed black; padding-bottom:5%; margin-bottom:4%;">';
                                detail += "<div class='ui-grid-a' style='margin-top:2%; margin-left:0;'>";
                                detail += "<div class='ui-block-a' style='text-align:right; padding-right:10%;'><b>รหัสสินค้า</b></div><div class='ui-block-b'>"+val['itemcode']+"</div>";
                                detail += "</div>";

                                detail += "<div class='ui-grid-a' style='margin-top:2%; margin-left:0;'>";
                                detail += "<div class='ui-block-a' style='text-align:right; padding-right:10%;'><b>ชื่อสินค้า</b></div><div class='ui-block-b'>"+val['itemname']+"</div>";
                                detail += "</div>";

                                detail += "<div class='ui-grid-a' style='margin-top:2%; margin-left:0;'>";
                                detail += "<div class='ui-block-a' style='text-align:right; padding-right:10%;'><b>Range</b></div><div class='ui-block-b'>"+val['range']+"</div>";
                                detail += "</div>";

                                detail += "<div class='ui-grid-a' style='margin-top:2%; margin-left:0;'>";
                                detail += "<div class='ui-block-a' style='text-align:right; padding-right:10%;'><b>จำนวน</b></div><div class='ui-block-b'>"+val['qty']+"&nbsp;"+val['unitcode']+"</div>";
                                detail += "</div></label>";

                                ite++;

                            });

                            document.getElementById("LDocNo").innerHTML = no;
                            document.getElementById("wantdate").innerHTML = wdate;
                            document.getElementById("status").innerHTML = state;
                            document.getElementById("diffdate").innerHTML = dif;

                            document.getElementById("prldetail").innerHTML = detail;

                            $.mobile.changePage("#listpr");
                               },
                       error: function (error){
                            console.log(error);
                            $.mobile.changePage("#pagepr");
                       }

           });
                  },
                  error: function (error){
                         console.log(error);
                  }

    });


  }
//////////////////////////// hold ///////////////////////////////////

$(document).on('taphold', '.todo-detailitem-hold', function() {
      console.log("cancel hold");
      var link_name = $(this).attr('data-item-id');
      var link_data = $(this).attr('data-detail-id');
      var link_id = $(this).attr('id');
      var data = link_name.split("/");
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
   'padding': '10%',
   'color': '#fff',
   'background': 'red',
   'width': '100%'
   });
    console.log(link_name);
    console.log('#'+link_id);
    $("<a>", {
    text: "Return",
    href: "#",
    onclick: "MyItemhold('"+data[0]+"','"+data[1]+"', '"+data[2]+"', "+data[3]+", '"+data[4]+"');"
    }).appendTo($popUp);

    $popUp.popup('open').enhanceWithin();

    });
function MyItemhold(DocNo, itemcode, itemname, qty, unitcode){
    console.log("detailItem "+DocNo+" "+itemcode+" "+itemname+" "+qty+" "+unitcode+" isCancel:'0'");
    $.ajax({
           url: localStorage.api_url_server+""+localStorage.api_url_insertpr,
           data: '{"docNo":"'+DocNo+'","itemCode":"'+itemcode+'","itemName":"'+itemname+'","unitcode":"'+unitcode+'","qty":"'+qty+'","isCancel":"0"}',
           contentType: "application/json; charset=utf-8",
           dataType: "json",
           type: "POST",
           cache: false,
           success: function(result){
                console.log(JSON.stringify(result));
                $.ajax({
                       url: localStorage.api_url_server+""+localStorage.api_url_prdetail,
                       data: '{"type":"0","searchDocno":"'+DocNo+'"}',
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
                            var no = "";
                            var wdate = "";
                            var state = "";
                            var dif = "";
                            var ite = 1;
                            var detail = "";

                      //     console.log(JSON.stringify(js));

                           $.each(js, function(key, val) {
                               switch (val['status']){
                                    case 1 : state = "<img src='images/Warning.png' width='24'> ค้าง";
                                            break;
                                    case 2 : state = "<img src='images/quick.png' width='24'> ด่วน";
                                            break;
                                    default : state = "";
                                            break;
                               }
<<<<<<< HEAD
                                    var today = new Date();
                                    var dd = today.getDate();
                                    var mm = today.getMonth()+1; //January is 0!

                                    var yyyy = today.getFullYear();
                                    if(dd<10){
                                        dd='0'+dd
                                    }
                                    if(mm<10){
                                        mm='0'+mm
                                    }
                                    var n = yyyy+'-'+mm+'-'+dd;
                                   console.log(n);
=======
                                    var d = new Date();
                                   var today = d.getDate().length;
                                    if(today<1){today="0"+d.getDate();}else{today=d.getDate();}
                                   var tomonth = d.getMonth().length;
                                    if(tomonth<1){tomonth="0"+(d.getMonth()+1);}else{tomonth="0"+d.getMonth();}
                                   var n = d.getFullYear()+"-"+tomonth+"-"+today;
>>>>>>> origin/master
                                   switch (val['docDate']){
                                        case n :
                                               state += ",<img src='images/New.png' width='24'> ใหม่";
                                               break;
                                   }
                                no = val['docNo'];

                               wdate = val['wantDate'];
                               if(wdate!=null){
                               wdate = val['wantDate'].split("-");
                               day = wdate[2];
                               month = wdate[1];
                               year = (parseInt(wdate[0])+543);

                               wdate = day+"/"+month+"/"+year;
                               }
                                var itemno = val['itemcode'];
                                if(val['iscancel']==1){
                                    var blur = 'class="todo-detailitem-hold blur"';
                                }else{
                                    var blur = 'class="todo-detailitem"';
                                }
                               // wdate = val['wantDate'];
                                //state = val['status'];
                                dif = val['diffdate'];
                                detail +='<label '+blur+' data-item-id="'+val['docNo']+'/'+itemno+'/'+val['itemname']+'/'+val['qty']+'/'+val['unitcode']+'" data-detail-id="i'+ite+'" id="i'+ite+'" style="border-bottom:1.5px dashed black; padding-bottom:5%; margin-bottom:4%;">';
                                detail += "<div class='ui-grid-a' style='margin-top:2%; margin-left:0;'>";
                                detail += "<div class='ui-block-a' style='text-align:right; padding-right:10%;'><b>รหัสสินค้า</b></div><div class='ui-block-b'>"+val['itemcode']+"</div>";
                                detail += "</div>";

                                detail += "<div class='ui-grid-a' style='margin-top:2%; margin-left:0;'>";
                                detail += "<div class='ui-block-a' style='text-align:right; padding-right:10%;'><b>ชื่อสินค้า</b></div><div class='ui-block-b'>"+val['itemname']+"</div>";
                                detail += "</div>";

                                detail += "<div class='ui-grid-a' style='margin-top:2%; margin-left:0;'>";
                                detail += "<div class='ui-block-a' style='text-align:right; padding-right:10%;'><b>Range</b></div><div class='ui-block-b'>"+val['range']+"</div>";
                                detail += "</div>";

                                detail += "<div class='ui-grid-a' style='margin-top:2%; margin-left:0;'>";
                                detail += "<div class='ui-block-a' style='text-align:right; padding-right:10%;'><b>จำนวน</b></div><div class='ui-block-b'>"+val['qty']+"&nbsp;"+val['unitcode']+"</div>";
                                detail += "</div></label>";

                                ite++;

                            });

                            document.getElementById("LDocNo").innerHTML = no;
                            document.getElementById("wantdate").innerHTML = wdate;
                            document.getElementById("status").innerHTML = state;
                            document.getElementById("diffdate").innerHTML = dif;

                            document.getElementById("prldetail").innerHTML = detail;

                            $.mobile.changePage("#listpr");
                               },
                       error: function (error){
                            console.log(error);
                            $.mobile.changePage("#pagepr");
                       }

           });
                  },
                  error: function (error){
                         console.log(error);
                  }

    });


  }
///////////////////////////////////////////////////////////////



function clicksubmit(){
    console.log(document.getElementById("DocNo").value);
    var DocNo = document.getElementById("DocNo").value;
    var no = document.getElementById("noitems").value;
    var name = document.getElementById("nameitems").value;
    var grade = document.getElementById("gradeitem").value;
    var cnt = document.getElementById("citem").value;
    var units = document.getElementById("units").value;

   if(no==""){
       alertify.alert("ท่านยังไม่ได้ scan สินค้า กรุณา scan สินค้าด้วย");
       $ .mobile.changePage("#additem");
   }else{
        if(cnt == ""){
            alertify.alert("ท่านยังไม่ได้กรอกจำนวนสินค้า กรุณากรอกจำนวนให้ถูกต้อง!!");
            $.mobile.changePage("#additem");
        }else{


                               $.ajax({
                                           url: localStorage.api_url_server+""+localStorage.api_url_insertpr,
                                           data: '{"docNo":"'+DocNo+'","itemCode":"'+no+'","itemName":"'+name+'","unitcode":"'+units+'","qty":"'+cnt+'","isCancel":"0"}',
                                           contentType: "application/json; charset=utf-8",
                                           dataType: "json",
                                           type: "POST",
                                           cache: false,
                                           success: function(result){
                                                console.log(JSON.stringify(result));
                                                 $.ajax({
                                                                       url: localStorage.api_url_server+""+localStorage.api_url_prdetail,
                                                                       data: '{"type":"0","searchDocno":"'+DocNo+'"}',
                                                                       contentType: "application/json; charset=utf-8",
                                                                       dataType: "json",
                                                                       type: "POST",
                                                                       cache: false,
                                                                       success: function(result){
                                                                              var prl = JSON.stringify(result);
                                                                              var prlp = prl.split(":[");
                                                                              var str = prlp[1].split("]}");
                                                                              prl = "["+str[0]+"]";
                                                                              var js = jQuery.parseJSON(prl);
                                                                              var itemno = "";
                                                                              var itemname = "";
                                                                              var cnt = "";
                                                                              var range = "";
                                                                              var sitemno = "";
                                                                              var detail = "";
                                                                              var ite = 1;
                                                                                    $.each(js, function(key, val) {
                                                                                    itemno = val['itemcode'];
                                                                                    itemname = val['itemname'];
                                                                                    cnt = val['qty']+" "+val['unitcode'];
                                                                                    range = val['range'];
                                                                                    sitemno = Math.ceil(itemno.length/10);
                                                                                        var s = 0;
                                                                                        var l = 8;
                                                                                        var str1 = "";
                                                                                        for(var i = 0;i<sitemno;i++){
                                                                                             str1 += itemno.substr(s,l)+"<br>";
                                                                                             s += 8;
                                                                                             l += 8;
                                                                                        }
                                                                                        if(val['iscancel']==1){
                                                                                            var blur = 'class="todo-itemview blur"';
                                                                                        }else{
                                                                                            var blur = 'class="todo-itemview-hold"';
                                                                                        }
                                                                                        console.log(str1);
                                                                                            detail += '<label '+blur+' data-item-id="'+val['docNo']+'/'+itemno+'/'+val['itemname']+'/'+val['qty']+'/'+val['unitcode']+'" data-itemrow-id="i'+ite+'" id="i'+ite+'"><a href="#">';
                                                                                            detail += "<div class='ui-grid-c' style='border-bottom:1px dashed black; padding:2%; text-align:center; font-size:14px;'>";
                                                                                            detail += "<div class='ui-block-a' style='width:30%;'>"+str1+"</div>";
                                                                                            detail += "<div class='ui-block-b' style='width:28%;'>"+itemname+"</div>";
                                                                                            detail += "<div class='ui-block-c' style='width:18%;'>"+cnt+'</div>';
                                                                                            detail += "<div class='ui-block-d' style='width:24%;'>"+range+"</div>";
                                                                                            detail += "</div></a></label>";

                                                                                            ite++;

                                                                                        });

                                                                                        document.getElementById("sumitem").innerHTML = detail;
                                                                                        alertify.success("บันทึกข้อมูลแล้ว!!");
                                                                                        //alert("รหัสสินค้า: "+no+", ชื่อสินค้า: "+name+", เกรด: "+grade+", จำนวน: "+cnt+", หน่วยนับ: "+units+",DocPR :"+DocNo);

                                                                                        $.mobile.changePage("#pluspr");
                                                                                            },
                                                                                        error: function (error){
                                                                                            console.log(error);
                                                                                            $.mobile.changePage("#pluspr");
                                                                                        }

                                                                       });
                                           },
                                           error: function (error){
                                                console.log(error);
                                           }

                               });

                document.getElementById("noitems").value = "";
                document.getElementById("nameitems").value = "";
                document.getElementById("gradeitem").value = "";
                document.getElementById("units").value = "";
                document.getElementById("citem").value = "";

                document.getElementById("Tnoitem").innerHTML = "-- SCAN สินค้า --";
                document.getElementById("TNameitem").innerHTML = "";
                document.getElementById("Tgrade").innerHTML = "";
                document.getElementById("Tunit").innerHTML = "";
                $("#itemdetail").show();


        }

   }
}

function sumdetail(){

$.ajax({
           url: localStorage.api_url_server+""+localStorage.api_url_gendocno,
           data: '{"type":"0","search":"58089"}',
           contentType: "application/json; charset=utf-8",
           dataType: "json",
           type: "POST",
           cache: false,
           success: function(result){
                console.log(result.docno);
                var DocNo = result.docno;
                document.getElementById("titelpr").innerHTML = '<img src="images/PRicon.png"><b>'+result.docno+'</b>';
                document.getElementById("DocNo").value = DocNo;
                var sel = 'วันที่ต้องการ :<select id="defdate" name="date">';
                    sel += '<option value="1">1 วัน</option>';
                    sel += '<option value="3">3 วัน</option>';
                    sel += '<option value="5">5 วัน</option>';
                    sel += '<option value="7">7 วัน</option></select>';
                document.getElementById("discript").value = "";
                document.getElementById("switch").checked = false;

                $.ajax({
                       url: localStorage.api_url_server+""+localStorage.api_url_prdetail,
                       data: '{"type":"0","searchDocno":"'+DocNo+'"}',
                       contentType: "application/json; charset=utf-8",
                       dataType: "json",
                       type: "POST",
                       cache: false,
                       success: function(result){
                       var prl = JSON.stringify(result);
                       var prlp = prl.split(":[");
                       var str = prlp[1].split("]}");
                       prl = "["+str[0]+"]";
                       var js = jQuery.parseJSON(prl);
                       var itemno = "";
                       var itemname = "";
                       var cnt = "";
                       var range = "";
                       var sitemno = "";
                       var detail = "";
                       var ite = 1;
                             $.each(js, function(key, val) {
                             itemno = val['itemcode'];
                             itemname = val['itemname'];
                             cnt = val['qty']+" "+val['unitcode'];
                             range = val['range'];
                             sitemno = Math.ceil(itemno.length/10);
                             var s = 0;
                             var l = 8;
                             var str1 = "";
                             for(var i = 0;i<sitemno;i++){
                                  str1 += itemno.substr(s,l)+"<br>";
                                  s += 8;
                                  l += 8;
                             }
                             console.log(str1);
                                  detail += '<label class="todo-itemview" data-item-id="'+itemno+'" data-itemrow-id="i'+ite+'" id="i'+ite+'"><a href="#">';
                                  detail += "<div class='ui-grid-c' style='border-bottom:1px dashed black; padding:2%; text-align:center; font-size:14px;'>";
                                  detail += "<div class='ui-block-a' style='width:30%;'>"+str1+"</div>";
                                  detail += "<div class='ui-block-b' style='width:28%;'>"+itemname+"</div>";
                                  detail += "<div class='ui-block-c' style='width:18%;'>"+cnt+'</div>';
                                  detail += "<div class='ui-block-d' style='width:24%;'>"+range+"</div>";
                                  detail += "</div></a></label>";

                                  ite++;

                             });

                                document.getElementById("sumitem").innerHTML = detail;

                                $.mobile.changePage("#pluspr");
                                   },
                           error: function (error){
                                console.log(error);
                                $.mobile.changePage("#pluspr");
                           }

               });
           },
           error: function (error){
                console.log(error);
                $.mobile.changePage("#pagepr");
           }

    });


}

function pluspr(){

    var Docno = document.getElementById("DocNo").value;
    var apCode = document.getElementById("apCodeven").value;
    console.log(Docno);
    console.log(document.getElementById("apCodeven").value);
    if(apCode){
        apCode = apCode;
    }else{
        apCode = "null";
    }
    $.ajax({
            url: localStorage.api_url_server+""+localStorage.api_url_prdetail,
            data: '{"type":"0","searchDocno":"'+Docno+'"}',
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            type: "POST",
            cache: false,
            success: function(result){
                var prl = JSON.stringify(result);
                var prlp = prl.split(":[");
                var str = prlp[1].split("]}");
                prl = "["+str[0]+"]";
                var js = jQuery.parseJSON(prl);
                console.log(js);
                if(JSON.stringify(js)=="[]"){
<<<<<<< HEAD
                    alertify.alert("ยังไม่มีรายการสินค้าในใบ PR นี้ กรุณาสั่งสินค้าอย่างน้อย 1 รายการ");
=======
                    alert("ยังไม่มีรายการสินค้าในใบ PR นี้ กรุณาสั่งสินค้าอย่างน้อย 1 รายการ");
>>>>>>> origin/master
                }else{
                        var wday = document.getElementById("defdate").value;
                        var discript = document.getElementById("discript").value;
                        var priority = document.getElementById("switch").checked;
                        if(priority==true){
                            priority = 1;
                        }else{
                            priority = 0;
                        }
                        if(discript==""||apCode == "null"){
<<<<<<< HEAD
                            alertify.alert("กรุณากรอกข้อมูลให้ครบถ้วน");
=======
                            alert("กรุณากรอกข้อมูลให้ครบถ้วน");
>>>>>>> origin/master
                        }else{
                                $.ajax({
                                           url: localStorage.api_url_server+"NPInventoryWs/pr/updatePR",
                                           data: '{"docNo": "'+Docno+'","workman":"58089","wantday":"'+wday+'","description":"'+discript+'","priority":"'+priority+'","isCancel":"0","apCode":"'+apCode+'"}',
                                           contentType: "application/json; charset=utf-8",
                                           dataType: "json",
                                           type: "POST",
                                           cache: false,
                                           success: function(result){
                                           var status = JSON.stringify(result);
                                           console.log(Docno+","+wday+","+discript+","+priority+",apcode :"+apCode);

                                           $.ajax({
                                                   url: localStorage.api_url_server+localStorage.api_url_prlist,
                                                   data: '{"type":"0","search":"58089"}',
                                                   contentType: "application/json; charset=utf-8",
                                                   dataType: "json",
                                                   type: "POST",
                                                   cache: false,
                                                   success: function(result){
                                                        //console.log(JSON.stringify(result));
                                                        var prl = JSON.stringify(result);
                                                        //console.log(prl);
                                                        var prlp = prl.split(":[");
                                                        var str = prlp[1].split("]}");
                                                        prl = "["+str[0]+"]";
                                                        var js = jQuery.parseJSON(prl);
                                                        var prlist = "";
                                                        var wdate = "";
                                                        var x = 1;
                                                        $.each(js, function(key, val) {
                                                           //console.log(val['docNo']);

                                                           prlist += '<label class="todo-listview" data-view-id="';
                                                           prlist += "'"+val['docNo']+"'";
                                                           prlist += '" data-row-id="'+x+'" id="'+x+'"><a href="#" onclick="prdetail(';
                                                           prlist += "'"+val['docNo']+"'";
                                                           prlist += ')" ><div class="ui-grid-c" style="text-align:center; font-size:14px;">';
                                                           prlist += '<div class="ui-block-a" data-view-id="1">'+val['docNo']+'</div>';

                                                           var wantDate = val['wantDate'];
                                                           if(wantDate!=null){
                                                           wdate = val['wantDate'].split("-");
                                                           day = wdate[2];
                                                           month = wdate[1];
                                                           year = (parseInt(wdate[0])+543);

                                                           wantDate = day+"/"+month+"/"+year;
                                                           }

                                                           prlist += '<div class="ui-block-b">'+wantDate+'</div>';
                                                           prlist += '<div class="ui-block-c">'+val['diffDate']+' วัน</div>';
                                                               switch (val['status']){
                                                                    case 1 : var status = "<img src='images/Warning.png' width='24'>";
                                                                            break;
                                                                    case 2 : var status = "<img src='images/quick.png' width='24'>";
                                                                            break;
                                                                    default : var status = "";
                                                                            break;
                                                               }
<<<<<<< HEAD
                                                                    var today = new Date();
                                                                    var dd = today.getDate();
                                                                    var mm = today.getMonth()+1; //January is 0!

                                                                    var yyyy = today.getFullYear();
                                                                    if(dd<10){
                                                                        dd='0'+dd
                                                                    }
                                                                    if(mm<10){
                                                                        mm='0'+mm
                                                                    }
                                                                    var n = yyyy+'-'+mm+'-'+dd;
=======
                                                                   var d = new Date();
                                                                   var today = d.getDate().length;
                                                                    if(today<1){today="0"+d.getDate();}else{today=d.getDate();}
                                                                   var tomonth = d.getMonth().length;
                                                                    if(tomonth<1){tomonth="0"+(d.getMonth()+1);}else{tomonth="0"+d.getMonth();}
                                                                   var n = d.getFullYear()+"-"+tomonth+"-"+today;
>>>>>>> origin/master
                                                                   console.log(val['docDate']+"/"+n);
                                                                   switch (val['docDate']){
                                                                        case n :
                                                                               status += "<img src='images/New.png' width='24'>";
                                                                               break;
                                                                   }

                                                           prlist += '<div class="ui-block-d">'+status+'</div>';
                                                           prlist += '</div></label></a><hr>';
                                                            x++;
                                                        });
                                                        document.getElementById("prlist").innerHTML = prlist;
                                                        localStorage.apcode="";
                                                        //console.log(JSON.stringify(js));

                                                      //  $.mobile.changePage("#pagepr");
                                                           },
                                                   error: function (error){
                                                        console.log(JSON.stringify(error));
                                                       // $.mobile.changePage("#pagepr");
                                                   }

                                                   });
<<<<<<< HEAD
                                           alertify.success("บันทึกข้อมูลเรียบร้อยแล้ว");
=======
                                           alert("บันทึกข้อมูลเรียบร้อยแล้ว");
>>>>>>> origin/master
                                           $.mobile.changePage("#pagepr");
                                           },
                                           error: function (error){
                                             console.log(JSON.stringify(error));
                                             $.mobile.changePage("#pluspr");
                                           }

                                   });

                        }
                }
            }
    });
}


$(document).on('taphold', '.todo-itemview-hold', function() {
       // console.log("DEBUG - Go popup");
       console.log('hold');
      var link_name = $(this).attr('data-item-id');
      var link_id = $(this).attr('data-itemrow-id');
      var data = link_name.split("/");
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
   'padding': '10%',
   'color': '#fff',
   'background': 'red'
   });
    console.log(link_name);
    console.log('#'+link_id);
    $("<a>", {
    text: "Cancel",
    href: "#",
    onclick: "MyItem('"+data[0]+"','"+data[1]+"', '"+data[2]+"', "+data[3]+", '"+data[4]+"');"
    }).appendTo($popUp);

    $popUp.popup('open').enhanceWithin();

    });
function MyItem(DocNo, itemcode, itemname, qty, unitcode){
    //alert("cancel "+DocNo+" "+itemcode+" "+itemname+" "+qty+" "+unitcode+" isCancel:'1'");
    $.ajax({
           url: localStorage.api_url_server+""+localStorage.api_url_insertpr,
           data: '{"docNo":"'+DocNo+'","itemCode":"'+itemcode+'","itemName":"'+itemname+'","unitcode":"'+unitcode+'","qty":"'+qty+'","isCancel":"1"}',
           contentType: "application/json; charset=utf-8",
           dataType: "json",
           type: "POST",
           cache: false,
           success: function(result){
                console.log(JSON.stringify(result));
                $.ajax({
                        url: localStorage.api_url_server+""+localStorage.api_url_prdetail,
                        data: '{"type":"0","searchDocno":"'+DocNo+'"}',
                        contentType: "application/json; charset=utf-8",
                        dataType: "json",
                        type: "POST",
                        cache: false,
                        success: function(result){
                            var prl = JSON.stringify(result);
                            var prlp = prl.split(":[");
                            var str = prlp[1].split("]}");
                            prl = "["+str[0]+"]";
                            var js = jQuery.parseJSON(prl);
                            var itemno = "";
                            var itemname = "";
                            var cnt = "";
                            var range = "";
                            var sitemno = "";
                            var detail = "";
                            var ite = 1;
                                $.each(js, function(key, val) {
                                itemno = val['itemcode'];
                                itemname = val['itemname'];
                                cnt = val['qty']+" "+val['unitcode'];
                                range = val['range'];
                                sitemno = Math.ceil(itemno.length/10);
                                var s = 0;
                                var l = 8;
                                var str1 = "";
                                for(var i = 0;i<sitemno;i++){
                                    str1 += itemno.substr(s,l)+"<br>";
                                    s += 8;
                                    l += 8;
                                }
                                if(val['iscancel']==1){
                                   var blur = 'class="todo-itemview blur"';
                                }else{
                                   var blur = 'class="todo-itemview-hold"';
                                }
                                console.log(str1);
                                detail += '<label '+blur+' data-item-id="'+val['docNo']+'/'+itemno+'/'+val['itemname']+'/'+val['qty']+'/'+val['unitcode']+'" data-itemrow-id="i'+ite+'" id="i'+ite+'"><a href="#">';
                                detail += "<div class='ui-grid-c' style='border-bottom:1px dashed black; padding:2%; text-align:center; font-size:14px;'>";
                                detail += "<div class='ui-block-a' style='width:30%;'>"+str1+"</div>";
                                detail += "<div class='ui-block-b' style='width:28%;'>"+itemname+"</div>";
                                detail += "<div class='ui-block-c' style='width:18%;'>"+cnt+'</div>';
                                detail += "<div class='ui-block-d' style='width:24%;'>"+range+"</div>";
                                detail += "</div></a></label>";
                                ite++;

                            });

                            document.getElementById("sumitem").innerHTML = detail;

                            $.mobile.changePage("#pluspr");
                            },
                            error: function (error){
                                 console.log(error);
                                 $.mobile.changePage("#pluspr");
                            }

                        });
                  },
                  error: function (error){
                         console.log(error);
                  }

    });
  }

$(document).on('taphold', '.todo-itemview', function() {
       // console.log("DEBUG - Go popup");
      var link_name = $(this).attr('data-item-id');
      var link_id = $(this).attr('data-itemrow-id');
      var data = link_name.split("/");
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
   'padding': '10%',
   'color': '#fff',
   'background': 'red'
   });
    console.log(link_name);
    console.log('#'+link_id);
    $("<a>", {
    text: "Return",
    href: "#",
    onclick: "MyItemReturn('"+data[0]+"','"+data[1]+"', '"+data[2]+"', "+data[3]+", '"+data[4]+"');"
    }).appendTo($popUp);

    $popUp.popup('open').enhanceWithin();

    });

function MyItemReturn(DocNo, itemcode, itemname, qty, unitcode){
    $.ajax({
           url: localStorage.api_url_server+""+localStorage.api_url_insertpr,
           data: '{"docNo":"'+DocNo+'","itemCode":"'+itemcode+'","itemName":"'+itemname+'","unitcode":"'+unitcode+'","qty":"'+qty+'","isCancel":"0"}',
           contentType: "application/json; charset=utf-8",
           dataType: "json",
           type: "POST",
           cache: false,
           success: function(result){
                console.log(JSON.stringify(result));
                $.ajax({
                        url: localStorage.api_url_server+""+localStorage.api_url_prdetail,
                        data: '{"type":"0","searchDocno":"'+DocNo+'"}',
                        contentType: "application/json; charset=utf-8",
                        dataType: "json",
                        type: "POST",
                        cache: false,
                        success: function(result){
                            var prl = JSON.stringify(result);
                            var prlp = prl.split(":[");
                            var str = prlp[1].split("]}");
                            prl = "["+str[0]+"]";
                            var js = jQuery.parseJSON(prl);
                            var itemno = "";
                            var itemname = "";
                            var cnt = "";
                            var range = "";
                            var sitemno = "";
                            var detail = "";
                            var ite = 1;
                            $.each(js, function(key, val) {
                                 itemno = val['itemcode'];
                                 itemname = val['itemname'];
                                 cnt = val['qty']+" "+val['unitcode'];
                                 range = val['range'];
                                 sitemno = Math.ceil(itemno.length/10);
                                 var s = 0;
                                 var l = 8;
                                 var str1 = "";
                                 for(var i = 0;i<sitemno;i++){
                                     str1 += itemno.substr(s,l)+"<br>";
                                     s += 8;
                                     l += 8;
                                 }
                                 if(val['iscancel']==1){
                                       var blur = 'class="todo-itemview blur"';
                                 }else{
                                       var blur = 'class="todo-itemview-hold"';
                                 }
                                    console.log(str1);
                                    detail += '<label '+blur+' data-item-id="'+val['docNo']+'/'+itemno+'/'+val['itemname']+'/'+val['qty']+'/'+val['unitcode']+'" data-itemrow-id="i'+ite+'" id="i'+ite+'"><a href="#">';
                                    detail += "<div class='ui-grid-c' style='border-bottom:1px dashed black; padding:2%; text-align:center; font-size:14px;'>";
                                    detail += "<div class='ui-block-a' style='width:30%;'>"+str1+"</div>";
                                    detail += "<div class='ui-block-b' style='width:28%;'>"+itemname+"</div>";
                                    detail += "<div class='ui-block-c' style='width:18%;'>"+cnt+'</div>';
                                    detail += "<div class='ui-block-d' style='width:24%;'>"+range+"</div>";
                                    detail += "</div></a></label>";

                                        ite++;

                            });

                    document.getElementById("sumitem").innerHTML = detail;
                    $.mobile.changePage("#pluspr");
                    },
                    error: function (error){
                           console.log(error);
                           $.mobile.changePage("#pluspr");
                    }
                });
           }

    });
}

function searchapcode(){
    var valapCode = document.getElementById("vender").value;
    $.ajax({
           url: localStorage.api_url_server+"NPInventoryWs/pr/searchVendor",
           data: '{"search":"'+valapCode+'"}',
           contentType: "application/json; charset=utf-8",
           dataType: "json",
           type: "POST",
           cache: false,
           success: function(apcode){
                var ap = JSON.stringify(apcode);
                var apC = ap.split(":[");
                var str = apC[1].split("]}");
                ap = "["+str[0]+"]";
                var js = jQuery.parseJSON(ap);
                //console.log(JSON.stringify(apcode));
                var textven = "";
                var name = "";
                $.each(js, function(key, val) {
                     textven = val['apCode'];
                     name = val['apName'];
                });
                    document.getElementById("apCodeven").value = textven;
                    document.getElementById("nameven").innerHTML = name;
           }
    });


}