window.addEventListener('native.onscanbarcode', function (schitem) {
       var page = "";
       //alert(pr.scanResult);
       console.log(schitem.scanResult);
       localStorage.barcode = schitem.scanResult;

       if(page == ""){
         page = $.mobile.activePage.attr('id');
       }
       $(document).on("pageshow", function (e, data) {
          page = $(this)[0].activeElement.id;
       });
        switch(page){
                    case "searchitem" :
                                        var valwh = document.getElementById("valwh").value;
                                        var tiwh = "";
                                        var itemdetail = "";
                                        if(valwh==""){

                                         $.ajax({
                                                url: localStorage.api_url_server+"NPInventoryWs/pr/searchWH",
                                                data: '{"accessToken":"","search":"V1"}',
                                                contentType: "application/json; charset=utf-8",
                                                dataType: "json",
                                                type: "POST",
                                                cache: false,
                                                   success: function(result){
                                                       var whName = "";
                                                       var whLoca = "";
                                                       var res = JSON.stringify(result.warehouseList);
                                                       if(res != "[]"){
                                                            $.each(result.warehouseList, function(key, wh) {
                                                                whName = wh['whName'];
                                                                whLoca = wh['location'];
                                                            });
                                                            document.getElementById("de-wh").innerHTML = "<b>คลัง : </b>&nbsp;&nbsp;"+whName+" <i>( "+whLoca+" )</i>";
                                                            document.getElementById("de-wh").style.textAlign = "left";
                                                            document.getElementById("valwh").value =  localStorage.barcode;
                                                            $("#bt-wh").hide();
                                                            $("#bt-item").show();
                                                            $("#de-wh").show();
                                                            $("#itemdtail").show();
                                                           // console.log("whname = "+whName);
                                                           // console.log("whname = "+whLoca);
                                                       }else{
                                                            console.log("ไม่มีข้อมูล");
                                                       }

                                                    },
                                                   error: function (error) {
                                                        console.log(JSON.stringify(error));
                                                    }

                                              });


                                        }else{
                                            itemdetail += '<div class="ui-grid-a" style="padding-bottom:5%;">';
                                            itemdetail += '<div class="ui-block-a" style="width:35%; font-weight: bold;">';
                                            itemdetail += 'รหัส :</div>';
                                            itemdetail += '<div class="ui-block-b" style="text-align:left; padding-left:2%; width:65%;">';
                                            itemdetail += localStorage.barcode+'</div>';
                                            itemdetail += '</div>';

                                            itemdetail += '<div class="ui-grid-a" style="padding-bottom:5%;">';
                                            itemdetail += '<div class="ui-block-a" style="width:35%; font-weight: bold;">';
                                            itemdetail += 'ชื่อ :</div>';
                                            itemdetail += '<div class="ui-block-b" style="text-align:left; padding-left:2%; width:65%;">';
                                            itemdetail += '......</div>';
                                            itemdetail += '</div>';

                                            itemdetail += '<div class="ui-grid-a" style="padding-bottom:5%;">';
                                            itemdetail += '<div class="ui-block-a" style="width:35%; font-weight: bold;">';
                                            itemdetail += 'ราคา :</div>';
                                            itemdetail += '<div class="ui-block-b" style="text-align:left; padding-left:2%; width:65%;">';
                                            itemdetail += '......</div>';
                                            itemdetail += '</div>';

                                            itemdetail += '<div class="ui-grid-a" style="padding-bottom:5%;">';
                                            itemdetail += '<div class="ui-block-a" style="width:35%; font-weight: bold;">';
                                            itemdetail += 'หน่วยนับ :</div>';
                                            itemdetail += '<div class="ui-block-b" style="text-align:left; padding-left:2%; width:65%;">';
                                            itemdetail += '......</div>';
                                            itemdetail += '</div>';

                                            itemdetail += '<div class="ui-grid-a" style="padding-bottom:5%;">';
                                            itemdetail += '<div class="ui-block-a" style="width:35%; font-weight: bold;">';
                                            itemdetail += 'คลัง :</div>';
                                            itemdetail += '<div class="ui-block-b" style="text-align:left; padding-left:2%; width:65%;">';
                                            itemdetail += '......</div>';
                                            itemdetail += '</div>';

                                            itemdetail += '<div class="ui-grid-a" style="padding-bottom:5%;">';
                                            itemdetail += '<div class="ui-block-a" style="width:35%; font-weight: bold;">';
                                            itemdetail += 'ชั้นเก็บ :</div>';
                                            itemdetail += '<div class="ui-block-b" style="text-align:left; padding-left:2%; width:65%;">';
                                            itemdetail += '......</div>';
                                            itemdetail += '</div>';

                                            itemdetail += '<div class="ui-grid-a" style="padding-bottom:5%;">';
                                            itemdetail += '<div class="ui-block-a" style="width:35%; font-weight: bold;">';
                                            itemdetail += 'เกรด :</div>';
                                            itemdetail += '<div class="ui-block-b" style="text-align:left; padding-left:2%; width:65%;">';
                                            itemdetail += '......</div>';
                                            itemdetail += '</div>';

                                            itemdetail += '<div class="ui-grid-a" style="padding-bottom:5%;">';
                                            itemdetail += '<div class="ui-block-a" style="width:35%; font-weight: bold;">';
                                            itemdetail += 'เจ้าหนี้ :</div>';
                                            itemdetail += '<div class="ui-block-b" style="text-align:left; padding-left:2%; width:65%;">';
                                            itemdetail += '......</div>';
                                            itemdetail += '</div>';

                                            itemdetail += '<div class="ui-grid-a">';
                                            itemdetail += '<div class="ui-block-a" style="width:35%; font-weight: bold;">';
                                            itemdetail += 'ยอดคงเหลือ :</div>';
                                            itemdetail += '<div class="ui-block-b" style="text-align:left; padding-left:2%; width:65%;">';

                                                    itemdetail += '<div class="ui-grid-a" style="padding-bottom:5%;">';
                                                    itemdetail += '<div class="ui-block-a" style="text-align:right;">';
                                                    itemdetail += 'รับล่าสุด :</div>';
                                                    itemdetail += '<div class="ui-block-b" style="text-align:left; padding-left:2%;">';
                                                    itemdetail += '......</div>';
                                                    itemdetail += '</div>';

                                                    itemdetail += '<div class="ui-grid-a" style="padding-bottom:5%;">';
                                                    itemdetail += '<div class="ui-block-a" style="text-align:right;">';
                                                    itemdetail += 'ขายล่าสุด :</div>';
                                                    itemdetail += '<div class="ui-block-b" style="text-align:left; padding-left:2%;">';
                                                    itemdetail += '......</div>';
                                                    itemdetail += '</div>';

                                                    itemdetail += '<div class="ui-grid-a" style="padding-bottom:5%;">';
                                                    itemdetail += '<div class="ui-block-a" style="text-align:right;">';
                                                    itemdetail += 'โอนล่าสุด :</div>';
                                                    itemdetail += '<div class="ui-block-b" style="text-align:left; padding-left:2%;">';
                                                    itemdetail += '......</div>';
                                                    itemdetail += '</div>';

                                            itemdetail += '</div>';
                                            itemdetail += '</div>';

                                            document.getElementById("de-item").innerHTML = itemdetail;
                                            document.getElementById("itemdtail").style.textAlign = "right";
                                            $("#bt-item").hide();
                                            $("#de-item").show();
                                        }


                                    break;
                    }
});

function rewh(){

     document.getElementById("valwh").value = "";
     document.getElementById("bt-item").style.textAlign = "center";
     document.getElementById("bt-wh").style.textAlign = "center";
     $("#itemdtail").hide();
     $("#de-wh").hide();
     $("#bt-item").hide();
     $("#bt-wh").show();
     $("#de-item").hide();
     $.mobile.changePage("#searchitem");
}