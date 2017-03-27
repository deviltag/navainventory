function Check_user(){

        document.getElementById("mg_searchItem").value = "";
        like_mgitem();
        $.mobile.changePage("#mg_loca",{transition: 'slidefade',reverse: true});

}

window.addEventListener('native.onscanbarcode', function (mg) {
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
       localStorage.barcode = mg.scanResult;
      // console.log("จำนวนตัวอักษร "+localStorage.barcode.length);
       var len = localStorage.barcode.length;
switch(page){
             case "mg_loca"       : loading();
                                    searchMGItem(localStorage.barcode);
                                    break;
             case "mg_locadetail" : loading();
                                    searchMGItem(localStorage.barcode);
                                    break;

           	}
});

function searchMGItem(barcode){
        loading();
        console.log('{"accessToken":"'+localStorage.token+'","searchItem": "'+barcode+'"}');
        setTimeout(function(){
        $.ajax({
               url: localStorage.api_url_server+"NPInventoryWs/V2/inven/searchScanBarCodeLogs",
               data: '{"accessToken":"'+localStorage.token+'","searchItem": "'+barcode+'","branch":"'+localStorage.branch+'"}',
               contentType: "application/json; charset=utf-8",
               dataType: "json",
               type: "POST",
               cache: false,
               success: function(result){
                     loading();
                     console.log(JSON.stringify(result.itemCode));
                     //console.log(localStorage.api_url_server+""+localStorage.api_url_search_item_pr);

                     if(JSON.stringify(result.itemCode)===""||JSON.stringify(result.itemCode)==="null"){
                         alertify.alert("บาร์โค้ด "+barcode+" ไม่มีอยู่ในทะเบียนสินค้า");
                         $.mobile.changePage("#mg_loca",{transition: 'slidefade',reverse: true});
                     }else{
                          var locadata = "";
                          if(JSON.stringify(result.listScanBarcode)==="[]"){
                                 locadata = `
                                             <div class="ui-grid-solo">
                                                  <div class="ui-block-a" style="text-align:center; color:red">
                                                    ไม่มีข้อมูลที่เก็บสินค้า
                                                  </div>
                                                </div>
                                            `;
                          }else{
                              $.each(result.listScanBarcode,function (key,val){
                                if(val['rowOrder']=="0"){
                                    locadata = `
                                                <div class="ui-grid-solo">
                                                     <div class="ui-block-a" style="text-align:center; color:red">
                                                         ** ไม่มีข้อมูลที่เก็บสินค้า **
                                                     </div>
                                                </div>
                                                `;
                                }else{
                                    var date = val['scanDateTime'].split("-");
                                    var scanDateTime = date[2]+"/"+date[1]+"/"+(parseInt(date[0])+543);
                                    locadata += `    <div class="ui-grid-d" style="width:100%; font-size:16px; padding:2% 0; border-bottom:1px dashed #000;">
                                                       <div class="ui-block-a" style="text-align:center; width:5%;">
                                                          <input type="checkbox" name="del" class="del" value="`+val['rowOrder']+`" data-role="none">
                                                       </div>
                                                       <div class="ui-block-b" style="text-align:center; width:20%;">
                                                          `+val['whCode']+`
                                                       </div>
                                                       <div class="ui-block-c" style="word-wrap:break-word; text-align:center; width:30%;" onclick="new_loca('`+val['shelfCode']+`','`+val['rowOrder']+`')">
                                                          `+val['shelfCode']+`
                                                       </div>
                                                       <div class="ui-block-d" style="word-wrap:break-word; width:30%;" onclick="new_loca('`+val['shelfCode']+`','`+val['rowOrder']+`')">
                                                          `+scanDateTime+`
                                                       </div>
                                                       <div class="ui-block-e" style="text-align:center; width:15%;">
                                                          <img src="images/bin_loca.png" onclick="delete_location(`+val['rowOrder']+`,'`+val['shelfCode']+`')">
                                                       </div>
                                                     </div>
                                                `;
                                }
                              });

                          }
                          document.getElementById("MGitemno").innerHTML = result.itemCode;
                          document.getElementById("MGitemname").innerHTML = result.itemName;
                          document.getElementById("MG_itemName").value = result.itemName;
                          document.getElementById("MGunit").innerHTML = result.unitCode;
                          document.getElementById("barcodemgtext").innerHTML = barcode;
                          document.getElementById("MG_itemNo").value = result.itemCode;

                          document.getElementById("mg_locationist").innerHTML = locadata;

                          document.getElementById("delete_all").style.display = "block";
                          document.getElementById("delete_action").style.display = "none";

                          var dele = document.getElementsByClassName("del");
                          for(i=0; i< dele.length; i++)
                          {
                              dele[i].style.display="none";
                          }

                          $.mobile.changePage("#mg_locadetail",{transition: 'slidefade',reverse: true});
                          localStorage.enter = null;


                     }
               },
               error: function (error) {
                     console.log("can't call api func searchMGItem");
                     switch_url();
                     searchMGItem(barcode);
                     closeload();
                     $.mobile.changePage("#mg_loca",{transition: 'slidefade',reverse: true});
                     //summary_list();
               }

        });

        }, 1500);

}

function like_mgitem(){
    var itemCode = document.getElementById("mg_searchItem").value;
    var detail = "<label style='text-align:center; width:100%;'><img src='images/ajax_loader.gif' width='10%'></label>";
    document.getElementById("like_mgitemlist").innerHTML = detail;
    if(itemCode!=""){
    $.ajax({
            url: localStorage.api_url_server+"NPInventoryWs/V2/inven/searchLikeItem",
            data: '{"accessToken":"'+localStorage.token+'","searchItem":"'+itemCode+'"}',
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            type: "POST",
            cache: false,
            success: function(result){
                console.log(JSON.stringify(result.listLikeItem));
                if(JSON.stringify(result.listLikeItem)=="[]"){
                //    alert("fun like up");
                  itemlist = `<label style='width:100%; color:red; text-align:center;'> ** ไม่มีข้อมูลที่ค้นหา ** </label>`;
                }else{
                  itemlist = "";
                  $.each(result.listLikeItem, function(key,val){
                  if(val['itemCode']==""){
                     itemlist = `<label style='width:100%; color:red; text-align:center;'> ** ไม่มีข้อมูลที่ค้นหา ** </label>`;
                  }else{

                     itemlist += `<label style='width:100%; font-size:14px; border-bottom:1px dashed gray;'
                                  onclick="searchMGItem('`+val['itemCode']+`')">
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

                        document.getElementById("like_mgitemlist").innerHTML = itemlist;
                   },
                   error: function(err){
                        console.log("can't call api func like_mgitem");
                        switch_url();
                        like_mgitem();
                   }
           });
        }else{
            document.getElementById("like_mgitemlist").innerHTML = "<label style='width:100%; color:red; text-align:center;'> ** รายการสินค้าที่ค้นหาได้ ** </label>";
        }
}

function delete_location(rowOrder,location){
    console.log("delete "+rowOrder);
    var itemCode = document.getElementById("MG_itemNo").value;
    alertify.set({ labels: {
                       ok     : "yes",
                       cancel : "no"
                 } });
    alertify.confirm("ท่านต้องการลบที่เก็บ "+location+" นี้หรือไม่ ?", function (e){
            if(e){
                  var dele = document.getElementsByClassName("del");
                           for(i=0; i< dele.length; i++)
                           {
                              dele[i].style.display="none";
                              dele[i].checked = false;
                           }
                      $.ajax({
                                  url: localStorage.api_url_server+"NPInventoryWs/V2/inven/DeleteItemLocation",
                                  data: '{"accessToken":"'+localStorage.token+'","itemCode":"'+itemCode+'","rowOrder":"'+rowOrder+'"}',
                                  contentType: "application/json; charset=utf-8",
                                  dataType: "json",
                                  type: "POST",
                                  cache: false,
                                  success: function(result){
                                    alertify.success("ลบที่เก็บสินค้าที่ต้องการ เรียบร้อยแล้ว!!");
                                    searchMGItem(itemCode);
                                  },
                                  error: function(err){
                                    console.log("can't call api func delete_location");
                                    switch_url();
                                    delete_location(rowOrder,location);
                                  }
                              });
            }else{

            }
    });

}

function delete_show(){
    var nodata = document.getElementById("mg_locationist").textContent;
     if(nodata.length==343){
         alertify.alert("ไม่มีข้อมูลที่เก็บสินค้า");
     }else{
         var dele = document.getElementsByClassName("del");
         for(i=0; i< dele.length; i++)
         {
            dele[i].style.display="block";
            dele[i].checked = true;
         }
         document.getElementById("delete_all").style.display = "none";
         document.getElementById("delete_action").style.display = "block";
     }
}

function delete_all(){
     var delength = $("input[name='del']:checked").length;

     if(delength == 0){
        alertify.alert("กรุณาเลือกที่เก็บที่ต้องการลบ");
     }else{
         alertify.set({ labels: {
                                    ok     : "yes",
                                    cancel : "no"
                              } });
         alertify.confirm("ท่านต้องการลบที่เก็บทั้งหมด "+delength+" รายการหรือไม่ ?", function (e){
               if(e){
                    var itemCode = document.getElementById("MG_itemNo").value;
                    for(var i = 0; i < delength; i++){
                       var rowOrder = $("input[name='del']:checked")[i].value;
                       $.ajax({
                               url: localStorage.api_url_server+"NPInventoryWs/V2/inven/DeleteItemLocation",
                               data: '{"accessToken":"'+localStorage.token+'","itemCode":"'+itemCode+'","rowOrder":"'+rowOrder+'"}',
                               contentType: "application/json; charset=utf-8",
                               dataType: "json",
                               type: "POST",
                               cache: false,
                               success: function(result){
                                    console.log("delete location "+rowOrder+" success!");
                                   },
                                   error: function(err){
                                    var e = i;
                                      console.log("can't call api func delete_location");
                                      switch_url();
                                      delete_all();
                                   }
                               });
                    }

                    alertify.success("ลบที่เก็บ "+delength+" รายการสำเร็จ");
                    searchMGItem(itemCode);

               }else{

               }
         });
     }
}

function new_loca(locaCode,rowOrder){
    loading();
    console.log(locaCode+","+rowOrder);
    document.getElementById("mg_searchLoca").value = "";
    like_mgloca();
    setTimeout(function(){
     console.log("new location "+locaCode);
     document.getElementById("oldloca").innerHTML = locaCode;
     document.getElementById("old_Loca").value = locaCode;
     document.getElementById("old_rowLoca").value = rowOrder;
     $.mobile.changePage("#mg_scanloca",{transition: 'slidefade',reverse: true});
    },1500);
}

function like_mgloca(){
    var result_loca = document.getElementById("mg_searchLoca").value;
    var detail = "<label style='text-align:center; width:100%;'><img src='images/ajax_loader.gif' width='10%'></label>";
    document.getElementById("like_mglocallist").innerHTML = detail;
    if(result_loca!=""){
    $.ajax({
            url: localStorage.api_url_server+"NPInventoryWs/V2/inven/searchShelfLocation",
            data: '{"accessToken":"'+localStorage.token+'","searchWH":"","searchLocation":"'+result_loca+'"}',
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            type: "POST",
            cache: false,
            success: function(result){
                console.log(JSON.stringify(result.locationList));
                if(JSON.stringify(result.locationList)=="[]"){
                //    alert("fun like up");
                  localist = `<label style='width:100%; color:red; text-align:center;'> ** ไม่มีข้อมูลที่ค้นหา ** </label>`;
                }else{
                  localist = "";
                  $.each(result.locationList, function(key,val){
                  if(val['locationCode']==""){
                     localist = `<label style='width:100%; color:red; text-align:center;'> ** ไม่มีข้อมูลที่ค้นหา ** </label>`;
                  }else{
                     localist += `<label style='width:100%; font-size:14px; border-bottom:1px dashed gray;'
                                  onclick="show_deup('`+val['locationCode'].trim()+`')">
                                  <div class="ui-grid-a">
                                       <div class="ui-block-a" style="padding:2% 2% 2% 5%; word-wrap:break-word;">`
                                            +val['locationCode'].trim()+
                                       `</div>
                                       <div class="ui-block-b" style="padding:2% 2% 2% 5%; word-wrap:break-word;">`
                                            +val['locationName'].trim()+
                                       `</div>
                                  </div>
                                  </label>`;
                               }
                           });
                        }

                        document.getElementById("like_mglocallist").innerHTML = localist;
                   },
                   error: function(err){
                        console.log("can't call api func like_mgloca");
                        switch_url();
                        like_mgloca();
                   }
           });
        }else{
            document.getElementById("like_mglocallist").innerHTML = "<label style='width:100%; color:red; text-align:center;'> ** รายการที่เก็บสินค้าที่ค้นหาได้ ** </label>";
        }
}

function show_deup(locaCode){
    var oldLoca = document.getElementById("old_Loca").value;
    var newLoca = locaCode;
    var itemCode = document.getElementById("MG_itemNo").value;
    var itemName = document.getElementById("MG_itemName").value;
    loading();
    setTimeout(function(){
        document.getElementById("MGUPitemno").innerHTML = itemCode;
        document.getElementById("MGUPitemname").innerHTML = itemName;
        document.getElementById("MGOLDloca").innerHTML = oldLoca;
        document.getElementById("MGNEWloca").innerHTML = newLoca;
        document.getElementById("MG_newLoca").value = newLoca;
        $.mobile.changePage("#mg_upsubmit",{transition: 'slidefade',reverse: true});
    },1500);
}

function update_newloca(){
    var oldLoca = document.getElementById("old_Loca").value;
    var newLoca = document.getElementById("MG_newLoca").value;
    var itemCode = document.getElementById("MG_itemNo").value;
    var rowOrder = document.getElementById("old_rowLoca").value;
    alertify.set({ labels: {
                             ok     : "yes",
                             cancel : "no"
             } });
    alertify.confirm("ท่านต้องการเปลี่ยนที่เก็บจาก "+oldLoca+" เป็นที่เก็บ "+newLoca+" หรือไม่ ?", function (e){
             if(e){
                loading();
                console.log("itemCode:"+itemCode+",rowOrder:"+rowOrder+",location:"+newLoca);
                console.log(localStorage.api_url_server+"NPInventoryWs/V2/inven/UpdateItemLocation");
                $.ajax({
                        url: localStorage.api_url_server+"NPInventoryWs/V2/inven/UpdateItemLocation",
                        data: '{"accessToken":"'+localStorage.token+'","itemCode":"'+itemCode+'","rowOrder":"'+rowOrder+'","location":"'+newLoca+'"}',
                        contentType: "application/json; charset=utf-8",
                        dataType: "json",
                        type: "POST",
                        cache: false,
                        success: function(result){
                           console.log(JSON.stringify(result));
                           alertify.success("เปลี่ยนที่เก็บใหม่เรียบร้อยแล้ว!!");
                           searchMGItem(itemCode);
                        },
                        error: function(err){
                             console.log("can't call api func update_newloca");
                             switch_url();
                             update_newloca();
                             searchMGItem(itemCode);
                        }
                });

             }else{
                loading();
                searchMGItem(itemCode);
             }
    });
}