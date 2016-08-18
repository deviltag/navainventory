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
                                            document.getElementById("whtitle").innerHTML = "<b>คลัง : </b>WH1";
                                            document.getElementById("whtitle").style.textAlign = "left";
                                            document.getElementById("valwh").value =  localStorage.barcode;
                                            $("#itemdtail").show();
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

                                            document.getElementById("itemdtail").innerHTML = itemdetail;
                                            document.getElementById("itemdtail").style.textAlign = "right";
                                        }


                                    break;
                    }
});

function rewh(){
    var whdetail = "";
    var item = "";
    whdetail = '<font color="red">SCANBARCODE WAREHOUSE</font>';
    item = '<font color="red">SCANBARCODE ITEM</font>';

     document.getElementById("whtitle").innerHTML = whdetail;
     document.getElementById("valwh").value = "";
     document.getElementById("itemdtail").innerHTML = item;
     document.getElementById("whtitle").style.textAlign = "center";
     document.getElementById("itemdtail").style.textAlign = "center";
     $("#itemdtail").hide();
     $.mobile.changePage("#searchitem");
}