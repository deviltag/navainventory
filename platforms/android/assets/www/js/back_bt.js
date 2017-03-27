document.addEventListener("keydown", function(event) {
        console.log(event.keyCode);
        if($.mobile.activePage.is("#pageone")){
            if(event.keyCode==13){
                if ($("#username").is(":focus")) {
                   $('#passwd').focus();
                }else if ($("#passwd").is(":focus")) {
                     console.log("login");
                     cnklogin();
                }
            }
        }else if($.mobile.activePage.is("#pagetwo")){
            switch(event.keyCode){
                case 49 :listreorder();
                        break;
                case 50 :sec_wh();
                        break;
                case 51 :$.mobile.changePage('#transfer_normal',{transition: 'slidefade',reverse: true});
                        wh_normal();
                        break;
                case 52 :rewh();
                        break;
                case 53 :Check_user();
                        break;
                case 54 :up_wh();
                        break;
                case 55 :listpromotion();
                        $.mobile.changePage('#promotionRequest',{transition: 'slidefade',reverse: true});
                        break;
                case 56 :search_label();
                         $.mobile.changePage('#newlabelRequest',{transition: 'slidefade',reverse: true});
                        break;
            }
        }else if($.mobile.activePage.is("#newreorder")){
            if(event.keyCode==13){
                if($("#itemcode").is(":focus")){
                    searchitem_wt();
                }else if ($("#count").is(":focus")){
                    $("#want").focus();

                }else if($("#want").is(":focus")) {
                    genDocNo();
                }else{
                    $("#count").focus();
                }
            }
        }else if($.mobile.activePage.is("#reorderListitem")){
            if(event.keyCode==13){
                save_reorder();
            }
        }else if($.mobile.activePage.is('#Update_stock')){
            if(event.keyCode==13){
                search_upwh();
            }
        }else if($.mobile.activePage.is('#up_detail')){
            if(event.keyCode==13){
                 add_location();
            }
        }else if($.mobile.activePage.is('#sum_upitem')){
            if(event.keyCode==0){
                 searchUpitem();
            }
        }else if($.mobile.activePage.is('#transfer_normal_people')){
            if(event.keyCode==13){
                if($("#person").is(":focus")){
                 get_people();
                }else{
                transfer_normal_persons();
                }
            }
        }else if($.mobile.activePage.is('#transfer_normal')){
            if(event.keyCode==13){
            transfer_normal();
            }
        }else if($.mobile.activePage.is('#transfer_normal_item')){
            if(event.keyCode==13){
            submit_transfer_normal();
            }
        }else if($.mobile.activePage.is('#transfer_normal_detail')){
            if(event.keyCode==13){
            insert_des();
            }
        }else if($.mobile.activePage.is('#transfer_normal_des')){
            if(event.keyCode==13){
            save_des();
            }
        }else if($.mobile.activePage.is('#transfer_normal_confirm')){
            if(event.keyCode==13){
            save_normal();
            }
        }else if($.mobile.activePage.is('#mg_upsubmit')){
            if(event.keyCode==13){
                update_newloca();
            }
        }else if($.mobile.activePage.is('#countitem')){
            if(event.keyCode==13){
               savestock();
            }
        }else if($.mobile.activePage.is('#labelRequest')){
            if(event.keyCode==13){
                $.mobile.changePage('#newlabelRequest',{transition: 'slidefade'});
            }
        }else if($.mobile.activePage.is('#newlabelRequest')){
            if(event.keyCode==13){
               if($("#itemcode_label").is(":focus")){
                    getitem_label();
               }else if($("#amount_request").is(":focus")){
                    insert_label();
               }else{
                     save_label();
               }
            }
        }else if($.mobile.activePage.is('#itemlabelRequest')){
            if(event.keyCode==13){

            }
        }else if($.mobile.activePage.is('#promotionRequest')){
            if(event.keyCode==13){
                if($("#searchpromotion").is(":focus")){
                    listpromotion();
                }else{
                    promotion_list();
                    $.mobile.changePage('#newpromotionRequest',{transition: 'slidefade'});
                }
            }
        }else if($.mobile.activePage.is('#newpromotionRequest')){
            if(event.keyCode==13){
                $.mobile.changePage('#itempromotionRequest',{transition: 'slidefade'});
                $("#itemcode_promotion").focus();
            }
        }else if($.mobile.activePage.is('#itempromotionRequest')){
            if(event.keyCode==13){
               if($("#itemcode_promotion").is(":focus")){
                    $("#discount_promotion").focus();
               }else if($("#discount_promotion").is(":focus")){
                     $("#description_promotion").focus();
               }else if($("#description_promotion").is(":focus")){
                     insertPromotion();
               }else if($("#searchItemP").is(":focus")){
                     searchItemPromotion();
               }else{
                    insertPromotion();
               }
            }
        }else if($.mobile.activePage.is('#detailpromotionRequest')){
            if(event.keyCode==13){
                 save_promotion();
            }
        }
});

    document.addEventListener("backbutton", function(e){

        if($.mobile.activePage.is('#pageone')){
            var r = confirm("ต้องการออกจากโปรแกรมหรือไม่ !");
            if (r == true) {
                navigator.app.exitApp();
            } else {
                return false;
            }

       }if($.mobile.activePage.is('#pagelogin')){
            $.mobile.changePage('#pageone',{transition: 'slidefade',reverse: true});
            return false;
       }else if($.mobile.activePage.is('#pagetwo')){
            logout();
       }else if($.mobile.activePage.is('#pagepr')){
            $.mobile.changePage('#pagetwo',{transition: 'slidefade',reverse: true});
            return false;
       }else if($.mobile.activePage.is('#receive')){
            $.mobile.changePage('#pagetwo',{transition: 'slidefade',reverse: true});
            return false;
       }else if($.mobile.activePage.is('#receive_listpo')){
            $.mobile.changePage('#receive',{transition: 'slidefade',reverse: true});
            return false;
       }else if($.mobile.activePage.is('#receive_item')){
            $.mobile.changePage('#receive',{transition: 'slidefade',reverse: true});
            return false;
       }else if($.mobile.activePage.is('#receive_scan')){
           check_back_receive();
           return false;
       }else if($.mobile.activePage.is('#receive_show')){
            if(localStorage.receivestatus == "1"){
                alertify.error("ยังไม่ได้บันทึกใบรับเข้า กรุณาบันทึกก่อน");
                return false;
            }else{
                $.mobile.changePage('#receive',{transition: 'slidefade',reverse: true});
                return false;
            }
       }else if($.mobile.activePage.is('#receive_list')){
            $.mobile.changePage('#receive',{transition: 'slidefade',reverse: true});
            return false;
       }else if($.mobile.activePage.is('#receive_scan_edit')){
            $.mobile.changePage('#receive_list_detail_edit',{transition: 'slidefade',reverse: true});
            return false;
       }else if($.mobile.activePage.is('#receive_list_detail_edit')){
            $.mobile.changePage('#receive',{transition: 'slidefade',reverse: true});
            return false;
       }else if($.mobile.activePage.is('#receive_list_detail')){
            $.mobile.changePage('#receive_list',{transition: 'slidefade',reverse: true});
            return false;
       }else if($.mobile.activePage.is('#transfer')){
            $.mobile.changePage('#pagetwo',{transition: 'slidefade',reverse: true});
            return false;
       }else if($.mobile.activePage.is('#transferlist')){
            $.mobile.changePage('#transfer_normal',{transition: 'slidefade',reverse: true});
            return false;
       }else if($.mobile.activePage.is('#transfer_detail')){
            checkstatus();
            return false;
       }else if($.mobile.activePage.is('#transfer_details')){
             $.mobile.changePage('#transferlist',{transition: 'slidefade',reverse: true});
             return false;
       }else if($.mobile.activePage.is('#transfer_item')){
             $.mobile.changePage('#transfer_detail',{transition: 'slidefade',reverse: true});
             return false;
       }else if($.mobile.activePage.is('#transferup')){
            $.mobile.changePage('#transfer',{transition: 'slidefade',reverse: true});
            return false;
       }else if($.mobile.activePage.is('#transferup_item')){
            check_cancel();
            return false;
       }else if($.mobile.activePage.is('#transferup_detail')){
            checkstatus();
            return false;
       }else if($.mobile.activePage.is('#transferdown')){
            $.mobile.changePage('#transfer',{transition: 'slidefade',reverse: true});
            return false;
       }else if($.mobile.activePage.is('#transferdown_item')){
            check_cancel();
            return false;
       }else if($.mobile.activePage.is('#transferdown_detail')){
            checkstatus();
            return false;
       }else if($.mobile.activePage.is('#transfer_damage')){
            $.mobile.changePage('#transfer',{transition: 'slidefade',reverse: true});
            return false;
       }else if($.mobile.activePage.is('#transfer_damage_item')){
            check_cancel_damage();
            return false;
       }else if($.mobile.activePage.is('#transfer_damage_detail')){
            checkstatus_damage();
            return false;
       }else if($.mobile.activePage.is('#transfer_isp')){
            $.mobile.changePage('#transfer',{transition: 'slidefade',reverse: true});
            return false;
       }else if($.mobile.activePage.is('#transfer_isp_item')){
            $.mobile.changePage('#transfer_isp',{transition: 'slidefade',reverse: true});
            return false;
       }else if($.mobile.activePage.is('#transfer_rtv')){
            $.mobile.changePage('#transfer',{transition: 'slidefade',reverse: true});
            return false;
       }else if($.mobile.activePage.is('#transfer_rtv_item')){
            $.mobile.changePage('#transfer_rtv',{transition: 'slidefade',reverse: true});
            return false;
       }else if($.mobile.activePage.is('#transfer_normal')){
            $.mobile.changePage('#pagetwo',{transition: 'slidefade',reverse: true});
            return false;
       }else if($.mobile.activePage.is('#transfer_normal_people')){
            $.mobile.changePage('#transfer_normal',{transition: 'slidefade',reverse: true});
            return false;
       }else if($.mobile.activePage.is('#transfer_normal_item')){
            check_cancel_normal();
            return false;
       }else if($.mobile.activePage.is('#transfer_normal_detail')){
            checkstatus_normal();
            return false;
       }else if($.mobile.activePage.is('#transfer_normal_des')){
            $.mobile.changePage('#transfer_normal_detail',{transition: 'slidefade',reverse: true});
            return false;
       }else if($.mobile.activePage.is('#transfer_normal_confirm')){
            $.mobile.changePage('#transfer_normal_des',{transition: 'slidefade',reverse: true});
       }else if($.mobile.activePage.is('#stock')){
            $.mobile.changePage('#pagetwo',{transition: 'slidefade',reverse: true});
            return false;
       }else if($.mobile.activePage.is('#shelves')){
            backstock();
            return false;
       }else if($.mobile.activePage.is('#countitem')){
            CSback();
            return false;
       }else if($.mobile.activePage.is('#Sscanitem')){
            CSback();
            return false;
       }else if($.mobile.activePage.is('#setting')){
            $.mobile.changePage('#pagetwo',{transition: 'slidefade',reverse: true});
            return false;
       }else if($.mobile.activePage.is('#searchitem')){
             backhome();
             return false;
       }else if($.mobile.activePage.is('#stock')){
            $.mobile.changePage('#pagetwo',{transition: 'slidefade',reverse: true});
            return false;
       }else if($.mobile.activePage.is('#Update_stock')){
            $.mobile.changePage('#pagetwo',{transition: 'slidefade',reverse: true});
            return false;
       }else if($.mobile.activePage.is('#new_location')){
            up_wh();
            return false;
       }else if($.mobile.activePage.is('#sum_upitem')){
            bt_loca();
            return false;
       }else if($.mobile.activePage.is('#search_upitem')){
            bt_summary();
            return false;
       }else if($.mobile.activePage.is('#up_detail')){
            bt_summary();
            return false;
       }else if($.mobile.activePage.is('#receive_search')){
            navigator.app.backHistory();
            return false;
       }else if($.mobile.activePage.is('#listreorder')){
            $.mobile.changePage('#pagetwo',{transition: 'slidefade',reverse: true});
            return false;
       }else if($.mobile.activePage.is('#historyDetail')){
            $.mobile.changePage('#listreorder',{transition: 'slidefade',reverse: true});
            return false;
       }else if($.mobile.activePage.is('#newreorder')){
            if(localStorage.dc_reorder==""){
                $.mobile.changePage('#listreorder',{transition: 'slidefade',reverse: true});
            }else{
                reorder_detail(localStorage.dc_reorder);
                $.mobile.changePage('#reorderListitem',{transition: 'slidefade',reverse: true});
            }
            return false;
       }else if($.mobile.activePage.is('#mg_loca')){
            $.mobile.changePage('#pagetwo',{transition: 'slidefade',reverse: true});
            return false;
       }else if($.mobile.activePage.is('#mg_locadetail')){
            Check_user();
            return false;
       }else if($.mobile.activePage.is('#mg_scanloca')){
            searchMGItem(document.getElementById('MG_itemNo').value);
            return false;
       }else if($.mobile.activePage.is('#mg_upsubmit')){
            searchMGItem(document.getElementById('MG_itemNo').value);
            return false;
       }else if($.mobile.activePage.is('#reorderListitem')){
            //$.mobile.changePage('#newreorder',{transition: 'slidefade',reverse: true});
            //navigator.app.backHistory();
            back_reorderlist();
            return false;
       }else if($.mobile.activePage.is('#labelRequest')){
            $.mobile.changePage('#pagetwo',{transition: 'slidefade',reverse: true});
            return false;
       }else if($.mobile.activePage.is('#newlabelRequest')){
            $.mobile.changePage('#pagetwo',{transition: 'slidefade',reverse: true});
            return false;
       }else if($.mobile.activePage.is('#itemlabelRequest')){
            $.mobile.changePage('#newlabelRequest',{transition: 'slidefade',reverse: true});
            return false;
       }else if($.mobile.activePage.is('#promotionRequest')){
            $.mobile.changePage('#pagetwo',{transition: 'slidefade',reverse: true});
            return false;
       }else if($.mobile.activePage.is('#newpromotionRequest')){
            backheadPro();
            return false;
       }else if($.mobile.activePage.is('#itempromotionRequest')){
            if($("#searchItemP").is(":focus")){
                $('#searchlistItem').modal('hide');
            }else{
                backitemPro();
            }
            return false;
       }else if($.mobile.activePage.is('#detailpromotionRequest')){
            checkBackP();
            return false;
       }
    }, false);


