function up_wh(){
console.log("updateITEM select wh..");
console.log(localStorage.api_url_server+"NPInventoryWs/V2/is/searchWH");
console.log('{"accessToken":"'+localStorage.token+'","search":""},"branch":"'+localStorage.branch+'"');
loading();
 var select_wh = "";
              $.ajax({
                      url: localStorage.api_url_server+"NPInventoryWs/V2/is/searchWH",
                      data: '{"accessToken":"'+localStorage.token+'","search":"","branch":"'+localStorage.branch+'"}',
                      contentType: "application/json; charset=utf-8",
                      dataType: "json",
                      type: "POST",
                      cache: false,
                      success: function(result){
                         // console.log(JSON.stringify(result.data));
                               select_wh += `<select name="wh" class="bt-cmp" style="width:100%; height:50px;" data-role="none">`;
                               $.each(result.data, function(key, val) {
                                      select_wh += `<option value="`+val['whCode']+`">คลัง `+val['whCode']+`</option>`;
                               });
                               select_wh += `</select>`;
                               document.getElementById("Up_wh_list").innerHTML = select_wh;
                               $.mobile.changePage('#Update_stock',{transition: 'slidefade'});
                      },
                      error: function (err){
                          console.log("error up_wh "+JSON.stringify(err));
                          switch_url();
                          up_wh();
                         // alertify.alert("การเชื่อมต่อฐานข้อมูลมีปัญหา กรุณาตรวจสอบการเชื่อมต่ออินเตอร์เน็ตของท่าน");
                          closeload();
                        //  $load.popup("close");
                      }
              });
}
function search_upwh(){
    loading();
    searchWHup($('select[name="wh"] :selected').attr('value'));
}

window.addEventListener('native.onscanbarcode', function (ci) {
       var page = "";
       //alert(ci.scanResult);
      // console.log("count : "+ci.scanResult);

       if(page == ""){
         page = $.mobile.activePage.attr('id');
       }
       $(document).on("pageshow", function (c, data) {
          page = $(this)[0].activeElement.id;
       });
     //  console.log("count : " + page);
       localStorage.barcode = ci.scanResult;
      // console.log("จำนวนตัวอักษร "+localStorage.barcode.length);
       var len = localStorage.barcode.length;
switch(page){

             case "Update_stock"  :  loading();
                                     searchWHup(localStorage.barcode);
                                     break;
             case "new_location"  :  loading();
                                     searchLCup(localStorage.barcode);
                                     break;
             case "sum_upitem"    :  loading();
                                     search_upitem(localStorage.barcode);
                                     break;
             case "search_upitem" :  loading();
                                     search_upitem(localStorage.barcode);
                                     break;
             case "up_detail"     :  loading();
                                     search_upitem(localStorage.barcode);
                                     closeload();
                                     break;
           	}
});

function searchWHup(barcode){
 //$('#load_wh').popup('open');
 setTimeout(function(){
 console.log("upcswh");
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
                      console.log('{"accessToken":"'+localStorage.token+'","search":"'+barcode+'"}');
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

                            if(whName==null){
                                whName = "ไม่มีข้อมูล";
                            }
                            if(whLocal==null){
                                whLocal = "ไม่มีข้อมูล";
                            }
                          document.getElementById("up_itemwh").value = whCode;
                          document.getElementById("up_searchLocal").value = "";
                          document.getElementById("like_locallist").innerHTML = `<label style='width:100%; color:red; text-align:center;'> ** รายการที่เก็บสินค้าที่ค้นหาได้ ** </label>`;
                       //   sec_sh();
                          $.mobile.changePage('#new_location',{transition: 'slidefade'});
                      //    closeload();
                      }
               },
               error: function (error) {
                  //alertify.error("can't call api");
                  console.log("can't call pai func searchWHup");
                  switch_url();
                  searchWHup(barcode);
                  closeload();
               }
        });
    }, 1500);

}
/*
function sec_sh(){
 var stockWH = document.getElementById("up_itemwh").value;
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
                               document.getElementById("up_shel").innerHTML = select_sh;
                               $.mobile.changePage('#new_location',{transition: 'slidefade'});
                      },
                      error: function (err){
                          console.log(JSON.stringify(err));
                          alertify.alert("การเชื่อมต่อฐานข้อมูลมีปัญหา กรุณาตรวจสอบการเชื่อมต่ออินเตอร์เน็ตของท่าน");
                        //  $load.popup("close");
                      }
              });
}*/
/*function search_upshel(){
    loading();
    searchLCup($('select[name="sh"] :selected').attr('value'));
}*/


function searchLCup(localCode){
    loading();
    var stockWH = document.getElementById("up_itemwh").value;
    console.log(localStorage.api_url_server+"NPInventoryWs/V2/inven/searchShelfLocation");
    console.log('{"accessToken":"'+localStorage.token+'","searchWH":"'+stockWH+'","searchLocation":"'+localCode+'"}');
    setTimeout(function(){
    $.ajax({
        url: localStorage.api_url_server+"NPInventoryWs/V2/inven/searchShelfLocation",
        data: '{"accessToken":"'+localStorage.token+'","searchWH":"'+stockWH+'","searchLocation":"'+localCode+'"}',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        type: "POST",
        cache: false,
        success: function(result){
            console.log(JSON.stringify(result.locationList));

            if(JSON.stringify(result.locationList)=="[]"){
                 alertify.alert("ไม่มีข้อมูลชั้นเก็บสินค้าของ "+localCode);
                 $.mobile.changePage('#new_location',{transition: 'slidefade'});
                 closeload();
            }else{
                 var localName = "";
                 var localfCode = "";
                 $.each(result.locationList, function(key, val) {
                       localName = val['locationName'].trim();
                       localfCode = val['locationCode'].trim();
                 });
                 var main =  document.getElementsByClassName('CTshelves');
                 for(var i = 0; i < main.length; i++){
                     main[i].innerHTML = localName;
                     main[0].style.color = localStorage.fontColor;
                 }
                 document.getElementById("upitem_wh").innerHTML = "คลัง : "+stockWH;
                 document.getElementById("upitem_local").innerHTML = "ที่เก็บใหม่ : "+localName;

                 document.getElementById("up_whvalue").value = stockWH;
                 document.getElementById("localvalue").value = localfCode;
                 loca_item = [];
                 summary_list();
                // document.getElementById("CTshelves").innerHTML = shelName;
                /* document.getElementById("barcodetext").innerHTML = "";*/
                /* document.getElementById("CTitemname").innerHTML = "";
                 document.getElementById("CTunit").innerHTML = "";
                 document.getElementById("itemNo").value = "";
                 document.getElementById("itemsName").value = "";
                 document.getElementById("Cunit").value = "";
                 document.getElementById("counts").value = "";*/
           //      clear_manual();
                 $.mobile.changePage("#sum_upitem",{transition: 'slidefade',reverse: true});
                // summary_list();
                // document.getElementById("counts").disabled = true;
                // document.activeElement.blur();


                 closeload();
            }
        },
        error: function (error) {
            //alertify.error("can't call api");
            switch_url();
            searchLCup(localCode);
            console.log("can't call api func searchLCup");
            closeload();
        }

    });
    }, 1500);
}

function search_upitem(itemCode){
    var upwh = document.getElementById("up_itemwh").value;
    var vlocal = document.getElementById("localvalue").value;
    console.log('{"accessToken":"'+localStorage.token+'","searchWH":"'+upwh+'","searchLocation":"'+vlocal+'","searchItem":"'+itemCode+'"}');
    setTimeout(function(){
    var isset = false;

    $.ajax({
           url: localStorage.api_url_server+"NPInventoryWs/V2/inven/searchItemLocation",
           data: '{"accessToken":"'+localStorage.token+'","searchWH":"'+upwh+'","searchLocation":"'+vlocal+'","searchItem":"'+itemCode+'","type":"1"}',
           contentType: "application/json; charset=utf-8",
           dataType: "json",
           type: "POST",
           cache: false,
           success: function(result){
                 loading();
                 console.log(JSON.stringify(result.listItemLocation));
                 //console.log(localStorage.api_url_server+""+localStorage.api_url_search_item_pr);

                 if(JSON.stringify(result.listItemLocation)==="[]"){
                     alertify.alert("บาร์โค้ด "+itemCode+" ไม่มีอยู่ในทะเบียนสินค้า");
                     //$.mobile.changePage("#sum_upitem",{transition: 'slidefade',reverse: true});
                     closeload();
                 }else{
                     var itemcode = "";
                     var itemName = "";
                     var unitCode = "";
                     $.each(result.listItemLocation, function(key,val){
                       itemcode = val['itemCode'];
                       itemName = val['itemName'];
                       unitCode = val['unitCode'];
                     });

                     $.each(loca_item, function(key,val){
                             if(val['item_code']==itemcode){
                                 isset = true;
                                 return false;
                             }
                     });
                     if(isset==false){
                         document.getElementById("UPitemno").innerHTML = itemcode;
                         document.getElementById("UPitemname").innerHTML = itemName;
                         document.getElementById("UPunit").innerHTML = unitCode;
                         document.getElementById("barcodeuptext").innerHTML = itemCode;

                         document.getElementById("UP_itemNo").value = itemcode;
                         document.getElementById("UP_itemsName").value = itemName;
                         document.getElementById("UP_unit").value = unitCode;

                         localStorage.enter = null;
                         $.mobile.changePage("#up_detail",{transition: 'slidefade',reverse: true});
                     }else{
                             alertify.error("สินค้ารหัสนี้มีอยู่แล้ว");

                             var isset_item = setInterval(function(){
                                              if ($('#'+itemcode).hasClass('c1')){
                                                 $('#'+itemcode).removeClass('c1');
                                                 window.location.hash = '#'+itemcode;0
                                              }else{
                                                 $('#'+itemcode).addClass('c1');
                                                 window.location.hash = '#'+itemcode;
                                              }
                                              },1000);
                             setTimeout(function(){
                                clearInterval(isset_item);
                             },5000);
                             $.mobile.changePage("#sum_upitem",{transition: 'slidefade',reverse: true});
                          }
                 }
           },
           error: function (error) {
                // alertify.error("can't call api");
                 console.log("can't call api func search_upitem");
                 switch_url();
                 search_upitem(itemCode);
                 closeload();
                 $.mobile.changePage("#sum_upitem",{transition: 'slidefade',reverse: true});
                 summary_list();
           }

    });

    }, 1500);

}

function like_upitem(){
    var upwh = document.getElementById("up_itemwh").value;
    var local = document.getElementById("localvalue").value;
    var vitem = document.getElementById("up_searchItem").value;
    var itemlist = "<label style='width:100%; color:red; text-align:center;'><img src='images/ajax_loader.gif' width='20%'></label>";
    if(vitem != ""){
    console.log('{"accessToken":"'+localStorage.token+'","searchWH":"'+upwh+'","searchLocation":"'+local+'","searchItem":"'+vitem+'","type":"0"}');
    $.ajax({
               url: localStorage.api_url_server+"NPInventoryWs/V2/inven/searchItemLocation",
               data: '{"accessToken":"'+localStorage.token+'","searchWH":"'+upwh+'","searchLocation":"'+local+'","searchItem":"'+vitem+'","type":"0"}',
               contentType: "application/json; charset=utf-8",
               dataType: "json",
               type: "POST",
               cache: false,
               success: function(result){
                    console.log(JSON.stringify(result.listItemLocation));
                    if(JSON.stringify(result.listItemLocation)=="[]"){
                   //    alert("fun like up");
                       itemlist = `<label style='width:100%; color:red; text-align:center;'> ** ไม่มีข้อมูลที่ค้นหา ** </label>`;
                    }else{
                       itemlist = "";
                       $.each(result.listItemLocation, function(key,val){
                           if(val['itemCode']==""){
                           itemlist = `<label style='width:100%; color:red; text-align:center;'> ** ไม่มีข้อมูลที่ค้นหา ** </label>`;
                           }else{

                           itemlist += `<label style='width:100%; font-size:14px; border-bottom:1px dashed gray;'
                                        onclick="search_upitem('`+val['itemCode'].trim()+`')">
                                           <div class="ui-grid-b">
                                                 <div class="ui-block-a" style="width:35%; padding:2%; word-wrap:break-word;">`
                                                   +val['itemCode'].trim()+
                                                 `</div>
                                                 <div class="ui-block-b" style="width:40%; word-wrap:break-word;">`
                                                    +val['itemName'].trim()+
                                                 `</div>
                                                 <div class="ui-block-c" style="width:25%; text-align:center; word-wrap:break-word;">`
                                                    +val['unitCode'].trim()+
                                                  `</div>
                                             </div>
                                        </label>`;
                           }
                       });
                    }

                    document.getElementById("like_upitemlist").innerHTML = itemlist;
               },
               error: function(err){
                    console.log("can't call api func like_upitem");
                    switch_url();
                    like_upitem();
               }
       });
    }else{
        document.getElementById("like_upitemlist").innerHTML = "<label style='width:100%; color:red; text-align:center;'> ** รายการสินค้าที่ค้นหาได้ ** </label>";
    }
}

function like_uplocal(){
    var upwh = document.getElementById("up_itemwh").value;
    var vlocal = document.getElementById("up_searchLocal").value;
    var locallist = "<label style='width:100%; color:red; text-align:center;'><img src='images/ajax_loader.gif' width='20%'></label>";
    if(vlocal!=""){
    $.ajax({
               url: localStorage.api_url_server+"NPInventoryWs/V2/inven/searchShelfLocation",
               data: '{"accessToken":"'+localStorage.token+'","searchWH":"'+upwh+'","searchLocation":"'+vlocal+'"}',
               contentType: "application/json; charset=utf-8",
               dataType: "json",
               type: "POST",
               cache: false,
               success: function(result){
                    console.log(JSON.stringify(result.locationList));
                    if(JSON.stringify(result.locationList)=="[]"){
                   //    alert("fun like up");
                       locallist = `<label style='width:100%; color:red; text-align:center;'> ** ไม่มีข้อมูลที่ค้นหา ** </label>`;
                    }else{
                       locallist = "";
                       $.each(result.locationList, function(key,val){
                           if(val['locationCode']==""){
                           locallist = `<label style='width:100%; color:red; text-align:center;'> ** ไม่มีข้อมูลที่ค้นหา ** </label>`;
                           }else{
                           locallist += `<label style='width:100%; font-size:14px; border-bottom:1px dashed gray;'
                                        onclick="searchLCup('`+val['locationCode'].trim()+`')">
                                           <div class="ui-grid-a">
                                                 <div class="ui-block-a" style="padding:2% 0% 2% 5%;">`+
                                                   val['locationCode'].trim()+
                                                 `</div>
                                                 <div class="ui-block-b" style="padding:2% 0% 2% 5%;">`
                                                    +val['locationName'].trim()+
                                                 `</div>
                                             </div>
                                        </label>`;
                           }
                       });
                    }

                    document.getElementById("like_locallist").innerHTML = locallist;
               },
               error: function(err){
                    //console.log(JSON.stringify(err));
                    console.log("can't call api func like_uplocal");
                    switch_url();
                    like_uplocal();
               }
       });
    }else{
        document.getElementById("like_locallist").innerHTML = "<label style='width:100%; color:red; text-align:center;'> ** รายการที่เก็บสินค้าที่ค้นหาได้ ** </label>";
    }
}
var loca_item = [];
function add_location(){
    loading();
    var wh = document.getElementById("up_itemwh").value;
    var loca = document.getElementById("localvalue").value;
    var user = localStorage.username;
    var itemCode = document.getElementById("UP_itemNo").value;
    var itemName = document.getElementById("UP_itemsName").value;
    var unitCode = document.getElementById("UP_unit").value;
    console.log('{"accessToken":"'+localStorage.token+'","itemCode":"'+itemCode+'","unitCode":"'+unitCode+'","whCode":"'+wh+'","shelfCode":"'+loca+'","user":"'+user+'"}');
    $.ajax({
                   url: localStorage.api_url_server+"NPInventoryWs/V2/inven/insertItemLocation",
                   data: '{"accessToken":"'+localStorage.token+'","itemCode":"'+itemCode+'","unitCode":"'+unitCode+'","whCode":"'+wh+'","shelfCode":"'+loca+'","user":"'+user+'"}',
                   contentType: "application/json; charset=utf-8",
                   dataType: "json",
                   type: "POST",
                   cache: false,
                   success: function(result){
                        loca_item.push({"item_code":itemCode,"item_name":itemName,"unit":unitCode});
                        $.mobile.changePage("#sum_upitem",{transition: 'slidefade',reverse: true});
                        summary_list();
                        alertify.success("เพิ่มที่เก็บใหม่เรียบร้อยแล้ว");
                   },
                   error: function(err){
                        /*console.log(JSON.stringify(err));
                        alertify.alert("อินเตอร์เน็ตหรือเชิร์ฟเวอร์อาจมีปัญหา กรุณาตรวจสอบอินเตอร์เน็ตหรือติดต่อแผนก IT");*/
                        console.log("can't call api func add_location");
                        switch_url();
                        add_location();
                        closeload();
                   }
           });
}

function summary_list(){
    console.log(JSON.stringify(loca_item));
    var data = "";
    $.each(loca_item, function(key,val){
        data += `<div class="ui-grid-b" id="`+val['item_code']+`" style="text-align:center; border-bottom:1px gray dashed; font-size:12px;">
                   <div class="ui-block-a" style="word-wrap:break-word;">
                    `+val['item_code']+`
                   </div>
                   <div class="ui-block-b" style="word-wrap:break-word; text-align:left;">
                    `+val['item_name']+`
                   </div>
                   <div class="ui-block-c" style="word-wrap:break-word;">
                    `+val['unit']+`
                   </div>
                 </div>`;
    });
    document.getElementById("up_itemlist").innerHTML = data;
}

function bt_loca(){
    document.getElementById("up_searchLocal").value = "";
    document.getElementById("like_locallist").innerHTML = `<label style='width:100%; color:red; text-align:center;'> ** รายการที่เก็บสินค้าที่ค้นหาได้ ** </label>`;
    $.mobile.changePage("#new_location",{transition: 'slidefade',reverse: true});
}

function searchUpitem(){
    document.getElementById("up_searchItem").value = "";
    document.getElementById("like_upitemlist").innerHTML = `<label style='width:100%; color:red; text-align:center;'> ** รายการสินค้าที่ค้นหาได้ ** </label>`;
    $.mobile.changePage("#search_upitem",{transition: 'slidefade',reverse: true});
}

function bt_summary(){
    summary_list();
    $.mobile.changePage("#sum_upitem",{transition: 'slidefade',reverse: true});

}