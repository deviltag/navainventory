$(document).scannerDetection({
    onComplete: function(barcode, qty){
        send_barcode(barcode);
    },
    onError: function(string){
        send_barcode(string);
    }
});

function send_barcode(barcode){
     var page = "";
     if(page == ""){
        page = $.mobile.activePage.attr('id');
     }
     $(document).on("pageshow", function (c, data) {
        page = $(this)[0].activeElement.id;
     });

     console.log("page bluetooth "+page);
     console.log("barcode in page "+barcode);
      switch(page){
                 case "pageone" : if ($("#username").is(":focus")) {
                                    // rslogin(barcode);
                                  }else  if ($("#passwd").is(":focus")){

                                  }else{
                                    rslogin(barcode);
                                  }
                                     break;
                /* case "pagelogin" : if ($("input").is(":focus")) {
                                      //
                                    }else{
                                       rslogin(barcode);
                                    }
                                    /*var cls = document.getElementsByClassName('cmsel');
                                    for(var i = 0; i < cls.length; i++){
                                    cls[i].innerHTML = `<select name="company" style=" width:100%; border:0; padding: 5%; background: #fff center; border-radius: 5px; margin-bottom:5%; margin-top:0%;">
                                                        <option value="1">บริษัท นพดลพานิช จำกัด</option>
                                                        <option value="2">บริษัท นวเวนดิ้ง จำกัด</option>
                                                        </select>`;
                                    }*/
                                   // break;
                case "pluspr" : if ($("input").is(":focus")) {
                                                                       //
                                  }else{
                                    additems(barcode);
                                  }
                                  break;

                case "additem" : if ($("input").is(":focus")) {
                                                                                                         //
                                  }else{
                                    document.activeElement.blur();
                                    additems(barcode);
                                  }
                                  break;
                case "stock"   :if ($("input").is(":focus")) {
                                                                                                        //
                                 }else{
                                    loading();
                                    searchWHis(barcode);
                                 }
                                    break;
                case "shelves" : if ($("input").is(":focus")) {
                                                                                                                                          //
                                  }else{
                                        loading();
                                        searchSHis(barcode);
                                  }
                    	    break;
                case "Sscanitem" :if ($("#manual_searchItem").is(":focus")) {
                                                                                                                                                                                               //
                                   }else{
                                        loading();
                                        var len = barcode.length;
                                        if(len<=3){
                                            alertify.set({ labels: {
                                                          ok     : "yes",
                                                          cancel : "no"
                                            } });
                                            alertify.confirm("ท่านต้องการเปลี่ยนชั้นเก็บหรือไม่ ?", function (e){
                                            if(e){
                                               searchSHis(barcode);
                                            }else{
                                               closeload();
                                            }
                                            });
                                        }else{
                                               searchItem(barcode);
                                        }
                                   }
                                   break;
                case "countitem" :if ($("#counts").is(":focus")) {
                                                                                                                                                                              //
                                   }else{
                                        loading();
                                        var len = barcode.length;
                                        if(len<=3){
                                            alertify.set({ labels: {
                                                ok     : "yes",
                                                cancel : "no"
                                            } });
                                            alertify.confirm("ท่านต้องการเปลี่ยนชั้นเก็บหรือไม่ ?", function (e){
                                                if(e){
                                                    searchSHis(barcode);
                                                }else{
                                                    closeload();
                                                }
                                            });
                                        }else{
                                            searchItem(barcode);
                                        }
                                    }
                                    break;
                case "searchitem" :if ($("input").is(":focus")) {
                                                                                                                                                                              //
                                    }else{
                                        itemProfile(barcode);
                                    }
                                    break;
                case "transferup_item" :
                             get_item_transfer("up",barcode);
    
                             break;
                case "transferdown_item" :
                             get_item_transfer("down",barcode);
                             break;
                case "transferup_detail" :
                            get_item_transfer("up",barcode);
                            document.getElementById("amount_up_item").value ="";
                            $.mobile.changePage("#transferup_item",{transition: 'slidefade'});
                            amountup_focus();
                            break;
                case "transferdown_detail" :
                            get_item_transfer("down",barcode);
                            document.getElementById("amount_down_item").value ="";
                            $.mobile.changePage("#transferdown_item",{transition: 'slidefade'});
                            amountdown_focus();
                            break;
                case "transfer_detail" :
                              get_item_transferedit(barcode);
                              document.getElementById("amount_edit_item").value ="";
                              $.mobile.changePage("#transfer_item",{transition: 'slidefade'});
                              amountedit_focus();
                              break;
                case "transfer_item" :
                              get_item_transferedit(barcode);
                              break;
                case "transfer_normal_people" :
                              if($("#person").is(":focus")){
                              }else{
                              get_people(barcode);
                              }
                              break;
                case "transfer_normal_item" :
                              //alert(barcode)
                              if($("#amount_n_item").is(":focus")){
                              }else{
                              get_item_transfer_normal(barcode);
                              }
                              break;
                case "transfer_normal_detail" :
                              get_item_transfer_normal(barcode);
                              document.getElementById("amount_n_item").value ="";
                              $.mobile.changePage("#transfer_normal_item",{transition: 'slidefade'});
                              amountnormal_focus();
                              break;
                case "transfer_damage_item" :
                              get_item_transfer_damage(barcode);
                              break;
                case "transfer_damage_detail" :
                              get_item_transfer_damage(barcode);
                              document.getElementById("amount_damage").value ="";
                              $.mobile.changePage("#transfer_damage_item",{transition: 'slidefade'});
                              amountdamage_focus();
                              break;
                case "transfer_normal_confirm" :
                              get_salecode(barcode);
                              break;
                 case "newreorder" :
                              if ($("#itemcode").is(":focus")) {

                              }else if ($("#count").is(":focus")) {

                              }else if($("#want").is(":focus")) {

                              }else{
                              getItemReorder(barcode);
                              }
                              break;

            }
}