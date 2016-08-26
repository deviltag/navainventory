window.addEventListener('native.onscanbarcode', function (t) {
       //alert(e.scanResult);
       var page = "";
       if(page == ""){
         page = $.mobile.activePage.attr('id');
       }
       $(document).on("pageshow", function (t, data) {
          page = $(this)[0].activeElement.id;
       });
       //alert(page);
                			//document.getElementById("noitems").value = e.scanResult;
       switch(page){
            case "transferup_item" :
                         document.getElementById("product_scan_up").value=t.scanResult;
                         break;
            case "transfer_normal_from" :
                          search_wh("from",t.scanResult);
                          break;
            case "transfer_normal_to" :
                          search_wh("to",t.scanResult);
                          break;

       }






});
function search_wh(type,wh_code){
$.ajax({
                          url: localStorage.api_url_server+"NPInventoryWs/pr/searchWH",
                          data: '{"accessToken":"","search":"'+wh_code+'"}',
                          contentType: "application/json; charset=utf-8",
                          dataType: "json",
                          type: "POST",
                          cache: false,
                          success: function(wh){
                          console.log(wh);
                          //"whCode": "A01","whName": "A01 ","location": "บริษัท เบทาโกร(ลำพูน)"
                          var wh_l = JSON.stringify(wh);
                          var wh_ls = wh_l.split(":[");
                          var strwh = wh_ls[1].split("]}");
                          wh_l = "["+strwh[0]+"]";
                          var whl = jQuery.parseJSON(wh_l);
                          console.log(JSON.stringify(whl));
                          var count = whl.length;
                          var wh_list= "";
                          var wh_code_n= "";
                          for(var i = 0;i<count;i++){
                            wh_list += "<p>รหัสคลัง : "+whl[i].whCode+"</p><br>";
                            wh_list += "<p>ชื่อคลัง : "+whl[i].whName+"</p><br>";
                            wh_list += "<p>สถานที่ : "+whl[i].location+"</p><br>";
                            wh_code_n = whl[i].whCode;
                          }
                          if(type=="from"){
                          document.getElementById("transfer_nor_from").innerHTML = wh_list;
                          localStorage.transfer_nor_from = wh_code_n;
                          alert(localStorage.transfer_nor_from);
                          }else if(type=="to"){
                          localStorage.transfer_nor_to = wh_code_n;
                          alert(localStorage.transfer_nor_to)
                          document.getElementById("transfer_nor_to").innerHTML = wh_list;
                          }


                          },
                          error: function (error){
                          alertify.error(error);
                          }
                          });
}

function get_nor_wh_from(){
alert("xxx");
}