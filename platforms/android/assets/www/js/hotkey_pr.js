document.addEventListener("keydown", function(event) {
        console.log(event.keyCode);
        var page="";
        page = $.mobile.activePage.attr('id');
        console.log(page);

            if(page=="pagepr"){
                switch (event.keyCode){
                    case 0 :
                            console.log("pluspr");
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
                            return false;
                            break;

                }
            }else if(page=="pluspr"){
                switch(event.keyCode){
                    case 13 :
                            console.log("add pr");
                            pluspr();

                            break;
                }
            }else if(page=="additem"){

                switch(event.keyCode){
                    case 13 :
                            console.log("add item");
                            clicksubmit();
                            break;
                }

            }

});

//document.addEventListener("deviceready", onDeviceReady, false);

//function onDeviceReady(){
    document.addEventListener("backbutton", function(pr){
    //var page="";
    // page = $.mobile.activePage.attr('id');
    //console.log(page);
        if($.mobile.activePage.is('#listpr')){
               $.mobile.changePage("#pagepr",{transition: 'slidefade',reverse: true});
        }else if($.mobile.activePage.is('#pluspr')){
               backdetail();
        }else if($.mobile.activePage.is('#additem')){
               $.mobile.changePage("#pluspr",{transition: 'slidefade',reverse: true} );
        }
        /*switch(page){
            //case "pagepr" : $.mobile.changePage("#pagetwo",{transition: 'slidefade',reverse: true});
            //               return false
            //               break;
            case "listpr" : $.mobile.changePage("#pagepr",{transition: 'slidefade',reverse: true});
                           break;
            case "pluspr" : backdetail();
                            break;
            case "additem" : $.mobile.changePage("#pluspr",{transition: 'slidefade',reverse: true} );
                           break;

            default : $.mobile.changePage("#"+page);
                      break;
        }*/
    }, false);

