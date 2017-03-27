$(document).ready(function(){
  var _originalSize = $(window).width() + $(window).height()
  $(window).resize(function(){
    if($(window).width() + $(window).height() != _originalSize){
      console.log("keyboard show up");
      var footer = document.getElementsByClassName("footer");
      for(var i = 0; i < footer.length; i++){
        footer[i].style.display = "none";
      }
    }else{
      console.log("keyboard closed");
      var footer = document.getElementsByClassName("footer");
            for(var i = 0; i < footer.length; i++){
              footer[i].style.display = "block";
            }
    }
  });

});

function sec_wh(){
 var select_wh = "";
 console.log('{"accessToken":"'+localStorage.token+'","search":"","branch":"'+localStorage.branch+'"}');
              $.ajax({
                      url: localStorage.api_url_server+"NPInventoryWs/V2/is/searchWH",
                      data: '{"accessToken":"'+localStorage.token+'","search":"","branch":"'+localStorage.branch+'"}',
                      contentType: "application/json; charset=utf-8",
                      dataType: "json",
                      type: "POST",
                      cache: false,
                      success: function(result){
                          console.log(JSON.stringify(result.data));
                               select_wh += `<select name="wh" class="bt-cmp" style="width:100%; height:50px;" data-role="none">`;
                               $.each(result.data, function(key, val) {
                                      select_wh += `<option value="`+val['whCode']+`">คลัง `+val['whCode']+`</option>`;
                               });
                               select_wh += `</select>`;
                               document.getElementById("wh_list").innerHTML = select_wh;
                               $.mobile.changePage('#stock',{transition: 'slidefade'});
                      },
                      error: function (err){
                          console.log(JSON.stringify(err));
                         // alertify.alert("การเชื่อมต่อฐานข้อมูลมีปัญหา กรุณาตรวจสอบการเชื่อมต่ออินเตอร์เน็ตของท่าน");
                         switch_url();
                         sec_wh();
                        //  $load.popup("close");
                      }
              });
}
function search_wh(){
    searchWHis($('select[name="wh"] :selected').attr('value'));
}

function sec_sh(){
 var stockWH = document.getElementById("whvalue").value;
 var select_sh = "";
              $.ajax({
                      url: localStorage.api_url_server+"NPInventoryWs/V2/is/searchShelf",
                      data: '{"accessToken":"'+localStorage.token+'","searchWH":"'+stockWH+'","searchShelf":""}',
                      contentType: "application/json; charset=utf-8",
                      dataType: "json",
                      type: "POST",
                      cache: false,
                      success: function(result){
                         // console.log(JSON.stringify(result.data));
                               select_sh += `<select name="sh" class="bt-cmp" style="width:100%; height:50px;" data-role="none">`;
                               $.each(result.data, function(key, val) {
                                      select_sh += `<option value="`+val['shelfCode']+`">ชั้นเก็บ `+val['shelfName']+`</option>`;
                               });
                               select_sh += `</select>`;
                               document.getElementById("shel").innerHTML = select_sh;
                               $.mobile.changePage('#shelves',{transition: 'slidefade'});
                      },
                      error: function (err){
                          console.log(JSON.stringify(err));
                          switch_url();
                          sec_sh();
                          //alertify.alert("การเชื่อมต่อฐานข้อมูลมีปัญหา กรุณาตรวจสอบการเชื่อมต่ออินเตอร์เน็ตของท่าน");
                        //  $load.popup("close");
                      }
              });
}
function search_shel(){
    searchSHis($('select[name="sh"] :selected').attr('value'));
}

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
                                if(len<=3){
                                    alertify.set({ labels: {
                                        ok     : "yes",
                                        cancel : "no"
                                    } });
                                    alertify.confirm("ท่านต้องการเปลี่ยนชั้นเก็บหรือไม่ ?", function (e){
                                        if(e){
                                            searchSHis(localStorage.barcode);
                                        }else{
                                            closeload();
                                        }
                                    });
                                }else{
                                    searchItem(localStorage.barcode);
                                }
                            break;
               case "Sscanitem" : loading();
                                  if(len<=3){
                                     alertify.set({ labels: {
                                          ok     : "yes",
                                          cancel : "no"
                                     } });
                                        alertify.confirm("ท่านต้องการเปลี่ยนชั้นเก็บหรือไม่ ?", function (e){
                                     if(e){
                                        searchSHis(localStorage.barcode);
                                     }else{
                                        closeload();
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
 document.addEventListener("keydown", function(event) {
    event.returnValue = true;
 });


   // document.activeElement.blur();
        $.ajax({
               url: localStorage.api_url_server+""+localStorage.api_url_searchwh_is,
               data: '{"accessToken":"'+localStorage.token+'","search":"'+barcode+'","branch":"'+localStorage.branch+'"}',
               contentType: "application/json; charset=utf-8",
               dataType: "json",
               type: "POST",
               cache: false,
               success: function(result){
                      console.log(JSON.stringify(result.data));
                      console.log(localStorage.api_url_server+""+localStorage.api_url_searchwh_is);
                      console.log('{"accessToken":"'+localStorage.token+'","search":"'+barcode+'","branch":"'+localStorage.branch+'"}');
                      if(JSON.stringify(result.data)==="[]"||JSON.stringify(result.data)==="null"){
                           alertify.alert("ไม่มีข้อมูลคลังสินค้าของ "+barcode);
                           closeload();
                      }else{
                           var whName = "";
                           var whLocal = "";
                           var whCode = "";
                           $.each(result.data, function(key, val) {
                           if(val['whName']!=null&&val['localtion']){
                                whName = val['whName'].trim();
                                whLocal = val['location'].trim();
                                whCode = val['whCode'].trim();
                           }else{
                                whName = val['whName'];
                                whLocal = val['location'];
                                whCode = val['whCode'];
                           }

                           });
                          console.log("gendocNo inspect "+localStorage.api_url_server+localStorage.api_url_gendocno);
                          console.log("payload genDN inspect "+'{"accessToken":"'+localStorage.token+'","type":"3","search":"'+localStorage.username+'","branch":"'+localStorage.branch+'"}')
                          $.ajax({
                                 url: localStorage.api_url_server+""+localStorage.api_url_gendocno,
                                 data: '{"accessToken":"'+localStorage.token+'","type":"3","search":"'+localStorage.username+'","branch":"'+localStorage.branch+'"}',
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
                                     //alertify.error("can't call api");
                                     console.log("api gen docNo" + JSON.stringify(error));
                                     switch_url();
                                     searchWHis(barcode);
                                 }

                          });
                            if(whName==null){
                                whName = "ไม่มีข้อมูล";
                            }
                            if(whLocal==null){
                                whLocal = "ไม่มีข้อมูล";
                            }
                          document.getElementById("wh").innerHTML = "คลัง : "+whName+"  "+whLocal;
                          document.getElementById("whvalue").value = whCode;
                          isList();
                          $.mobile.changePage("#countstock");
                          closeload();
                      }
               },
               error: function (error) {
                  console.log("api gen Wh" + JSON.stringify(error));
                  switch_url();
                  searchWHis(barcode);
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
        data: '{"accessToken":"'+localStorage.token+'","searchWH":"'+stockWH+'","searchShelf":"'+shelfCode+'"}',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        type: "POST",
        cache: false,
        success: function(result){
            console.log(JSON.stringify(result.data));
            console.log(localStorage.api_url_server+""+localStorage.api_url_searchshelf_is);
            console.log('{"accessToken":"'+localStorage.token+'","searchWH":"'+stockWH+'","searchShelf":"'+shelfCode+'"}');
            if(JSON.stringify(result.data)=="[]"){
                 alertify.alert("ไม่มีข้อมูลชั้นเก็บสินค้าของ "+shelfCode);
                 closeload();
            }else{
                 var shelName = "";
                 var shelfCode = "";
                 $.each(result.data, function(key, val) {
                       shelName = val['shelfName'].trim();
                       shelfCode = val['shelfCode'].trim();
                 });
                 var main =  document.getElementsByClassName('CTshelves');
                 for(var i = 0; i < main.length; i++){
                     main[i].innerHTML = shelName;
                     main[0].style.color = localStorage.fontColor;
                 }
                 document.getElementById("shel").value = shelfCode;
                // document.getElementById("CTshelves").innerHTML = shelName;
                /* document.getElementById("barcodetext").innerHTML = "";
                 document.getElementById("CTitemno").innerHTML = "<font color='red'>** SCANBARCODE ITEM **</font>";
                 document.getElementById("CTitemname").innerHTML = "";
                 document.getElementById("CTunit").innerHTML = "";
                 document.getElementById("itemNo").value = "";
                 document.getElementById("itemsName").value = "";
                 document.getElementById("Cunit").value = "";
                 document.getElementById("counts").value = "";*/
                 clear_manual();
                 $.mobile.changePage("#Sscanitem",{transition: 'slidefade',reverse: true});
                // document.getElementById("counts").disabled = true;
                // document.activeElement.blur();


                 closeload();
            }
        },
        error: function (error) {
            console.log("api gen SH" + JSON.stringify(error));
            switch_url();
            searchSHis(shelfCode);
            closeload();
        }

    });
    }, 1500);
}

function Select_item(itemCode){
    loading();
    searchItem(itemCode);
}

function searchItem(itemCode){

    var DocNo = document.getElementById("valdocIS").value;
    var shel = document.getElementById("shel").value;
    console.log('{"barcode":"'+itemCode+'","docno":"'+DocNo+'","type":"3","shelfcode":"'+shel+'","branch":"'+localStorage.branch+'"}');
    setTimeout(function(){
    $.ajax({
           url: localStorage.api_url_server+""+localStorage.api_url_search_item_pr,
           data: '{"accessToken":"'+localStorage.token+'","barcode":"'+itemCode+'","docno":"'+DocNo+'","type":"3","shelfcode":"'+shel+'","branch":"'+localStorage.branch+'"}',
           contentType: "application/json; charset=utf-8",
           dataType: "json",
           type: "POST",
           cache: false,
           success: function(result){
                 console.log(JSON.stringify(result.itemcode));
                 console.log(localStorage.api_url_server+""+localStorage.api_url_search_item_pr);

                 if(JSON.stringify(result.itemcode)==="[]"){
                     alertify.alert("บาร์โค้ด "+itemCode+" ไม่มีอยู่ในทะเบียนสินค้า");
                     //closeload();
                 }else{
                     var itemcode = "";
                     var itemName = "";
                     var range = "";
                     var cntitem = "";
                     var units = "";
                     var old_cnt = "";
                     var whCode = "";

                     if(result.itemcode==null){
                         console.log("data itemcode : null");
                         $.each(result.listISBarcode, function(key, val) {
                             itemcode = val['itemcode'];
                             itemName = val['itemname'];
                             range = val['range'];
                             if(val['qty']==0){
                               cntitem = "";
                               old_cnt = "-";
                             }else{
                               old_cnt = val['qty'];
                               cntitem = val['qty'];
                             }
                             units = val['unitcode'];
                             apcode = val['apCode'];
                             apname = val['apName'];
                             console.log(cntitem);
                             console.log(old_cnt);
                         });
                     }else{
                       //  $.each(result.listBarcode, function(key, val) {
                         itemcode = result.itemcode;
                         itemName = result.itemname;
                         range = result.range;
                         if(result.qty==0){
                            cntitem = "";
                            old_cnt = "-";
                         }else{
                            cntitem = result.qty;
                            old_cnt = result.qty;
                         }
                            units = result.unitcode;
                            apcode = result.apCode;
                            apname = result.apName;
                        // });
                         console.log(cntitem);
                         console.log(old_cnt);
                         var ra = 1;
                         var ch = 0;
                         $.each(result.listWH,function(k,v){
                            ch = ra%2;
                            if(ch!=0){
                                whCode += v['whcode'];
                            }else{
                                whCode += ", "+v['whcode'];
                            }
                            ra++;
                         });
                     }
                     $.mobile.changePage("#countitem",{transition: 'slidefade',reverse: true});

                     document.getElementById("CTitemno").innerHTML = itemcode;
                     document.getElementById("CTitemname").innerHTML = itemName;
                     document.getElementById("CTunit").innerHTML = units;
                     document.getElementById("CTwhcode").innerHTML = whCode;
                     document.getElementById("barcodetext").innerHTML = itemCode;
                     document.getElementById("itemNo").value = itemcode;
                     document.getElementById("itemsName").value = itemName;
                     document.getElementById("Cunit").value = units;
                     document.getElementById("counts").value = "";

                     document.getElementById("Voldcnt").value = cntitem;
                     document.getElementById("oldcnt").innerHTML = old_cnt;

                     document.getElementById("counts").autofocus = true;
                     localStorage.enter = null;
                     counts_focus();

                 }
           closeload();
           },
           error: function (error) {
                 console.log("api gen ITEM" + JSON.stringify(error));
                 switch_url();
                 searchItem(itemCode);
                 closeload();
                 $.mobile.changePage("#Sscanitem",{transition: 'slidefade',reverse: true});
           }

    });
    }, 1500);
}
function counts_focus(){
    $("#countitem").bind('pageshow', function() {
        $('#counts').focus();
    });
}
function like_item(){
    var itemdata = document.getElementById("manual_searchItem").value;
    var itemlist = "";
    $.ajax({
               url: localStorage.api_url_server+"NPInventoryWs/V2/inven/searchItemMaster",
               data: '{"accessToken":"'+localStorage.token+'","search":"'+itemdata+'"}',
               contentType: "application/json; charset=utf-8",
               dataType: "json",
               type: "POST",
               cache: false,
               success: function(result){
                    console.log(JSON.stringify(result.itemMasterList));
                    if(JSON.stringify(result.itemMasterList)=="[]"){
                       itemlist = `<label style='width:100%; color:red;'> ** ไม่มีข้อมูลที่ค้นหา ** </label>`;
                    }else{
                       $.each(result.itemMasterList, function(key,val){
                           itemlist += `<label style='width:100%; font-size:12px; border-bottom:1px dashed gray;'
                                        onclick="Select_item('`+val['itemCode'].trim()+`')">
                                           <div class="ui-grid-b">
                                                 <div class="ui-block-a" style="width:35%;">`+
                                                   val['itemCode'].trim()+
                                                 `</div>
                                                 <div class="ui-block-b" style="width:40%;">`
                                                    +val['itemName'].trim()+
                                                 `</div>
                                                 <div class="ui-block-c" style="width:25%; text-align:center;">`
                                                    +val['unitCode'].trim()+
                                                  `</div>
                                               </div>
                                             </div>
                                        </label>`;
                       });
                    }

                    document.getElementById("like_itemlist").innerHTML = itemlist;
               },
               error: function(err){
                    console.log("api gen Like_item" + JSON.stringify(error));
                    switch_url();
                    like_item();
               }
       });

}

function backstock(){
    loading();
    isList();
    $.mobile.changePage('#countstock',{transition: 'slidefade',reverse: true});
    //window.location="#stock";
}

function savestock(){
   var oldc = document.getElementById("Voldcnt").value;
   console.log(oldc);
   if(oldc!=""){
    alertify.set({ labels: {
        ok     : "แทนที่",
        cancel : "บวกเพิ่ม"
    } });
    alertify.confirm( "ท่านต้องการบวกเพิ่มหรือแทนที่จำนวนที่นับได้ ?", function (e) {
        if (e) {
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
                  document.addEventListener("keydown", function(event) {
                     event.returnValue = true;
                  });
                      $.ajax({
                              url: localStorage.api_url_server+"NPInventoryWs/V2/is/insertIS",
                              data: '{"accessToken":"'+localStorage.token+'","docNo":"'+DocNo+'","user":"'+userID+'","itemCode":"'+noitem+'","unitcode":"'+uitem+'","whCode":"'+wh+'","shelfCode":"'+sv+'","qty":"'+citem+'"}',
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

                                 $("#scanitemcode").show();
                                 alertify.success("บันทีกข้อมูลเรียบร้อยแล้ว!");
                                 //document.getElementById("counts").disabled = true;
                                 clear_manual();
                                 localStorage.enter = null;

                                 $.mobile.changePage("#Sscanitem");
                                 closeload();

                              },
                              error: function (error) {
                                 $("#scanPopup").popup("open");
                                 console.log("api gen savestock" + JSON.stringify(error));
                                 switch_url();
                                 savestock();
                                 closeload();
                                 localStorage.enter = null;
                                 //$.mobile.changePage("#countitem");
                              }
                         });
                 }
                 }, 1500);

        } else {
                loading();
                setTimeout(function(){
                var DocNo = document.getElementById("valdocIS").value;
                var sv = document.getElementById("shel").value;
                var noitem = document.getElementById("itemNo").value;
                var wh = document.getElementById("whvalue").value;
                var citem = parseInt(document.getElementById("counts").value)+parseInt(oldc);
                var uitem = document.getElementById("Cunit").value;
                var userID = localStorage.username;
                if(citem == ""||noitem == ""){
                //alert("กรุณากรอกข้อมูลให้ครบด้วย !!");
                }else{
                console.log('result:[{"docNo":"'+DocNo+'","user":"'+userID+'","itemCode":"'+noitem+'","unitcode":"'+uitem+'","whCode":"'+wh+'","shelfCode":"'+sv+'","qty":"'+citem+'"}]');
                 document.addEventListener("keydown", function(event) {
                    event.returnValue = true;
                 });
                     $.ajax({
                             url: localStorage.api_url_server+"NPInventoryWs/V2/is/insertIS",
                             data: '{"accessToken":"'+localStorage.token+'","docNo":"'+DocNo+'","user":"'+userID+'","itemCode":"'+noitem+'","unitcode":"'+uitem+'","whCode":"'+wh+'","shelfCode":"'+sv+'","qty":"'+citem+'"}',
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

                                $("#scanitemcode").show();
                                alertify.success("บันทีกข้อมูลเรียบร้อยแล้ว!");
                                //document.getElementById("counts").disabled = true;
                                clear_manual();
                                localStorage.enter = null;

                                $.mobile.changePage("#Sscanitem");
                                closeload();

                             },
                             error: function (error) {
                                $("#scanPopup").popup("open");
                                console.log("api gen savestock" + JSON.stringify(error));
                                switch_url();
                                savestock();
                                closeload();
                                localStorage.enter = null;
                                //$.mobile.changePage("#countitem");
                             }
                        });
                }
                }, 1500);

        }
    });
   }else{
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
     document.addEventListener("keydown", function(event) {
        event.returnValue = true;
     });
         $.ajax({
                 url: localStorage.api_url_server+"NPInventoryWs/V2/is/insertIS",
                 data: '{"accessToken":"'+localStorage.token+'","docNo":"'+DocNo+'","user":"'+userID+'","itemCode":"'+noitem+'","unitcode":"'+uitem+'","whCode":"'+wh+'","shelfCode":"'+sv+'","qty":"'+citem+'"}',
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

                    $("#scanitemcode").show();
                    alertify.success("บันทีกข้อมูลเรียบร้อยแล้ว!");
                    //document.getElementById("counts").disabled = true;
                    clear_manual();
                    localStorage.enter = null;

                    $.mobile.changePage("#Sscanitem");
                    closeload();

                 },
                 error: function (error) {
                    $("#scanPopup").popup("open");
                    console.log("api gen savestock" + JSON.stringify(error));
                    switch_url();
                    savestock();
                    closeload();
                    localStorage.enter = null;
                    //$.mobile.changePage("#countitem");
                 }
            });
    }
    }, 1500);

   }
}

function savedata(){
     document.addEventListener("keydown", function(event) {
        event.returnValue = true;
     });
    var update = document.getElementById("stupdate").value
    if(update==0){
    loading();
    setTimeout(function(){
         var DocNo = document.getElementById("valdocIS").value;
            var UserID = localStorage.username;
            console.log('Update IS :{"DocNo":"'+DocNo+'","userID":"'+UserID+'","isCancel":"0"}');
            $.ajax({
                url: localStorage.api_url_server+""+localStorage.api_url_confirm_is,
                data: '{"accessToken":"'+localStorage.token+'","docNo":"'+DocNo+'","user":"'+UserID+'","isCancel":"0"}',
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
                    localStorage.enter = null;

                },
                error: function(err){
                    console.log("api gen savedata" + JSON.stringify(error));
                    switch_url();
                    savedata();
                    closeload();
                    localStorage.enter = null;
                    $.mobile.changePage("#countitem",{transition: 'slidefade'});
                }
            });
            closeload();
            $.mobile.changePage("#stock",{transition: 'slidefade'});
            localStorage.enter = null;
        }, 1500);
    }else{
         alertify.alert("ไม่มีรายการสินค้า ไม่สามารถบันทึกได้ กรุณาเพิ่มรายการสินค้า");
         localStorage.enter = null;
    }
}

function isList(){
    console.log("list is detail");
    loading();
    setTimeout(function(){
    var DocNo = document.getElementById("valdocIS").value;
    $.ajax({
            url: localStorage.api_url_server+"NPInventoryWs/V2/is/isList",
            data: '{"accessToken":"'+localStorage.token+'","docNo":"'+DocNo+'"}',
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

                                        detail += `<label class="csdelete" csdelete-id="`+DocNo+`/`+wh+`/`+val['shelfCode']+`/`+val['itemCode']+`/`+val['unitCode']+`" csdelete-detail-id="`+val['itemCode']+`" id="`+val['itemCode']+`" style="text-align:center; border-bottom:1px gray dashed;">`;
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
                                                     detail += val['inspectQty']+"  "+val['unitCode'];
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
                    document.getElementById("stupdate").value = 0;
                    localStorage.enter = null;
                }else{
                    detail = `<label style="border-bottom:1px dashed black; padding:2%; color:red; text-align:center">
                                          <h5>** ยังไม่มีข้อมูลสินค้าที่นับในใบนับนี้ **</h5>
                              </label>`;
                    document.getElementById("stupdate").value = 1;
                    localStorage.enter = null;
                }

                document.getElementById("csdetail").innerHTML = detail;
                closeload();
                $.mobile.changePage("#countstock",{transition: 'slidefade'});
                return false;
            },
            error: function(err){
                console.log("api isList" + JSON.stringify(error));
                switch_url();
                isList();
                closeload();
                $.mobile.changePage("#countstock",{transition: 'slidefade'});
                localStorage.enter = null;
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
             loading();
             backstock();
             return false;
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
                    data: '{"accessToken":"'+localStorage.token+'","docNo":"'+DocNo+'","user":"'+UserID+'","isCancel":"1"}',
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
                        console.log("api gen savedata" + JSON.stringify(error));
                        switch_url();
                        c_s();
                        $.mobile.changePage("#stock",{transition: 'slidefade'});
                    }
                });
                $.mobile.changePage("#stock",{transition: 'slidefade'});
                 return false;
        }
    });
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
    onclick: "csDeletitem('"+data[0]+"','"+data[1]+"', '"+data[2]+"','"+data[3]+"','"+data[4]+"');"
    }).appendTo($csd);

    $csd.popup('open').enhanceWithin();

    });

function csDeletitem(DocNo,wh,sh,itemCode,unitCode){
       var $loadde = $("<div>").popup({
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
            $loadde.popup('open');

        console.log(DocNo+"/"+wh+"/"+sh+"/"+itemCode+"/"+unitCode);
        $.ajax({
                url: localStorage.api_url_server+"NPInventoryWs/V2/is/deleteItem",
                data: '{"accessToken":"'+localStorage.token+'","docNo":"'+DocNo+'","itemCode":"'+itemCode+'","unitCode":"'+unitCode+'","whCode":"'+wh+'","shelfCode":"'+sh+'"}',
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                type: "POST",
                cache: false,
                success: function(result){
                    console.log(JSON.stringify(result));
                    alertify.success("ลบรายการเรียบร้อยแล้ว");
                    isList();
                     $loadde.popup("close");
                },
                error: function(err){
                    console.log("api gen csDeletitem" + JSON.stringify(error));
                    witch_url();
                    csDeletitem(DocNo,wh,sh,itemCode,unitCode);
                    closeload();
                }
            });

}

function clear_manual(){
     var declear = "";
     declear += `<label style='width:100%; color:red; text-align:center;'> ** รายการสินค้าที่ค้นหาได้ ** </label>`;
     document.getElementById("manual_searchItem").value = "";
     document.getElementById("like_itemlist").innerHTML = declear;
}

function CMSback(){
    alertify.set({ labels: {
            ok     : "yes",
            cancel : "no"
        } });
        alertify.confirm( "ท่านต้องการค้นหาสินค้าใหม่ใช่หรือไม่ ?", function (e) {
        if(e){
             clear_manual();
             $("#scitemsh").show();
             $("#cntitem").hide();
             $("#count1").show();
             $("#count2").hide();
             $("#scanitemcode").show();
            // document.getElementById("counts").disabled = true;
             localStorage.enter = null;
             $.mobile.changePage("#Sscanitem",{transition: 'slidefade'});
        }else{

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