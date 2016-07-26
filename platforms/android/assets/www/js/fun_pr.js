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

       alert(page);
                			//document.getElementById("noitems").value = pr.scanResult;
       switch(page){
             case "pageone" :
                                $.ajax({
                                    url: "http://nava.work:8000/api/v1/user/login",
                                    data: '{"name":"tom","password":"1234"}',
                                    contentType: "application/json; charset=utf-8",
                                    dataType: "json",
                                    type: "POST",
                                    cache: false,
                                       success: function(result){
                                        //var obj = JSON.stringify(result);
                                        alert("login : "+result.Message+" สถานะ : "+result.Status);
                                        console.log(result);
                                        $.mobile.changePage("#pagetwo");
                                        },
                                       error: function (error) {
                                        alert("can't call api");
                                        $.mobile.changePage("#pagetwo");
                                        }

                                  });

                                  return false;
                                 // $.mobile.changePage("#pagetwo");

                			 break;
             case "pluspr" : //alert("M150");

                                $.ajax({
                                           url: "http://qserver.nopadol.com:8080/NPInventoryWs/pr/searchItem",
                                           data: '{"docno":"test","barcode":"'+pr.scanResult+'"}',
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

                                                $.each(result.listBarcode, function(key, val) {
                                                    itemcode = val['itemCode'];
                                                    itemName = val['itemName'];
                                                    range = val['range'];
                                                    cntitem = val['qty'];
                                                    units = val['unitcode'];
                                                });

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
                                           alert("can't call api");
                                           $.mobile.changePage("#pagetwo");
                                           }

                                        });




                                 $("#itemdetail").show();
                                 $("#scanbaritem").hide();
                                 //document.getElementById("citem").focus();
                                 $.mobile.changePage("#additem");

                             break;
                			}
});

/*function additem(){
  alert("เพิ่มสินค้า!!");

  document.getElementById("noitems").value = "";
  $("#itemdetail").show();
  $.mobile.changePage('#additem');
}*/
function PR_list(){
            $.ajax({
                   url: "http://qserver.nopadol.com:8080/NPInventoryWs/pr/prList",
                   data: '{"type":"0","search":"58089"}',
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
                        var prlist = "";
                        $.each(js, function(key, val) {
                           console.log(val['docNo']);

                           prlist += '<a href="#" onclick="prdetail(';
                           prlist += "'"+val['docNo']+"'";
                           prlist += ')"><label><div class="ui-grid-c" style="text-align:center; font-size:14px;">';
                           prlist += '<div class="ui-block-a">'+val['docNo']+'</div>';

                           var wdate = val['wantDate'].split("-");
                           day = wdate[2];
                           month = wdate[1];
                           year = (parseInt(wdate[0])+543);

                           wantDate = day+"/"+month+"/"+year;

                           prlist += '<div class="ui-block-b">'+wantDate+'</div>';
                           prlist += '<div class="ui-block-c">'+val['diffDate']+' วัน</div>';

                           switch (val['status']){
                                case 1 : var status = "<img src='images/Warning.png' width='24'>";
                                        break;
                                case 2 : var status = "<img src='images/quick.png width='24'>";
                                        break;
                                case 3 : var status = "<img src='images/New.png width='24'>";
                                        break;
                           }

                           prlist += '<div class="ui-block-d">'+status+'</div>';
                           prlist += '</div></label></a><hr>';

                        });
                        document.getElementById("prlist").innerHTML = prlist;

                        //console.log(JSON.stringify(js));

                        $.mobile.changePage("#pagepr");
                           },
                   error: function (error){
                        console.log(JSON.stringify(error));
                        $.mobile.changePage("#pagepr");
                   }

                   });

            return false;
}

function prdetail(DocNo){
    alert(DocNo);

    $.ajax({
                       url: "http://qserver.nopadol.com:8080/NPInventoryWs/pr/prDetail",
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

                            var detail = "";

                           console.log(JSON.stringify(js));

                           $.each(js, function(key, val) {
                                no = val['docNo'];
                                wdate = val['wantDate'];
                                state = val['status'];
                                dif = val['diffdate'];

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
                                detail += "</div><hr style='border:1px dashed;'>";

                            });

                            document.getElementById("DocNo").innerHTML = no;
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

function clicksubmit(){
    var no = document.getElementById("noitems").value;
    var name = document.getElementById("nameitems").value;
    var grade = document.getElementById("gradeitem").value;
    var cnt = document.getElementById("citem").value;
    var units = document.getElementById("units").value;

   if(no==""){
       alert("ท่านยังไม่ได้ scan สินค้า กรุณา scan สินค้าด้วย");
       $ .mobile.changePage("#additem");
   }else{
        if(cnt == ""){
            alert("ท่านยังไม่ได้กรอกจำนวนสินค้า กรุณากรอกจำนวนให้ถูกต้อง!!");
            $.mobile.changePage("#additem");
        }else{
            alert("บันทึกข้อมูลแล้ว!!");
            alert("รหัสสินค้า: "+no+", ชื่อสินค้า: "+name+", เกรด: "+grade+", จำนวน: "+cnt+", หน่วยนับ: "+units);
                document.getElementById("noitems").value = "";
                document.getElementById("nameitems").value = "";
                document.getElementById("gradeitem").value = "";
                document.getElementById("units").value = "";
                document.getElementById("citem").value = "";

                document.getElementById("Tnoitem").innerHTML = "";
                document.getElementById("TNameitem").innerHTML = "";
                document.getElementById("Tgrade").innerHTML = "";
                document.getElementById("Tunit").innerHTML = "";
                $("#itemdetail").show();
                $ .mobile.changePage("#pluspr");
        }

    }
}

function pluspr(){
    alert("บันทึกข้อมูลแล้ว!!");
    $("#itemdetail").show();
    $.mobile.changePage('#pagepr');
}
