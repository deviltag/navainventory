document.addEventListener("keydown", function(event) {
        console.log(event.keyCode);
        var page="";
        page = $.mobile.activePage.attr('id');
        console.log(page);

            if(page=="pagetwo"){
                switch (event.keyCode){
                    case 49: $.mobile.changePage("#pagepr",{transition: 'slidefade'});
                            break;
                    case 50: $.mobile.changePage("#receive",{transition: 'slidefade'});
                             focus_search();
                            break;
                    case 51: $.mobile.changePage("#stock",{transition: 'slidefade'});
                            break;
                    case 52: $.mobile.changePage("#transfer",{transition: 'slidefade'});
                            break;
                    default: $.mobile.changePage("#pagetwo",{transition: 'slidefade'});
                            break;
                }
            }else if(page=="transfer"){
                switch (event.keyCode){
                    case 49: $.mobile.changePage("#transferup",{transition: 'slidefade'});
                            break;
                    case 50: $.mobile.changePage("#transferdown",{transition: 'slidefade'});
                            break;
                    case 51: $.mobile.changePage("#transfer_damage",{transition: 'slidefade'});
                            break;
                    case 52: $.mobile.changePage("#transfer_isp",{transition: 'slidefade'});
                            break;
                    case 53: $.mobile.changePage("#transfer_rtv",{transition: 'slidefade'});
                            break;
                    case 54: $.mobile.changePage("#transfer_normal",{transition: 'slidefade'});
                            break;
                    default: $.mobile.changePage("#transfer",{transition: 'slidefade'});
                            break;
                }
            }else if(page=="receive"){
                switch (event.keyCode){
                    case 13: searchpo();
                    return false;
                           break;
                    default:
                           break;
                    }
            }else if(page=="receive_item"){
                switch (event.keyCode){
                    case 13: $.mobile.changePage('#receive_search',{transition: 'slidefade'});
                    focus_search_item();
                    return false;
                            break;
                    default:
                            break;
                    }
            }else if(page=="receive_scan"){
                switch (event.keyCode){
                    case 13: submit_scan();
                    return false;
                            break;
                    default:
                            break;
                    }

            }else if(page=="receive_search"){
            switch (event.keyCode){
                   case 13: search_receive();
                   return false;
                          break;
                   default:
                          break;
                   }

            }else if(page=="receive_show"){
            switch (event.keyCode){
                   case 13: submit_receive();
                   return false;
                          break;
                   default:
                          break;
                   }
            }


});



document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady(){
    document.addEventListener("backbutton", function(e){

        if($.mobile.activePage.is('#pageone')){
           navigator.app.exitApp();
       }else if($.mobile.activePage.is('#pagetwo')){
            $.mobile.changePage('#pageone',{transition: 'slidefade',reverse: true});
           //alert("กรุณาออกจากระบบ !!");
           //return false;
       }else if($.mobile.activePage.is('#receive')){
            $.mobile.changePage('#pagetwo',{transition: 'slidefade',reverse: true});
       }else if($.mobile.activePage.is('#receive_listpo')){
            $.mobile.changePage('#receive',{transition: 'slidefade',reverse: true});
       }else if($.mobile.activePage.is('#receive_item')){
            $.mobile.changePage('#receive',{transition: 'slidefade',reverse: true});
       }else if($.mobile.activePage.is('#receive_scan')){
            $.mobile.changePage('#receive_item',{transition: 'slidefade',reverse: true});
       }else if($.mobile.activePage.is('#receive_show')){
            if(localStorage.receivestatus == "1"){
                alert("ยังไม่ได้บันทึกใบรับเข้า กรุณาบันทึกก่อน");
                return false;
            }else{$.mobile.changePage('#receive',{transition: 'slidefade',reverse: true});}
       }else if($.mobile.activePage.is('#transfer')){
            $.mobile.changePage('#pagetwo',{transition: 'slidefade',reverse: true});
       }else if($.mobile.activePage.is('#transferup')){
            $.mobile.changePage('#transfer',{transition: 'slidefade',reverse: true});
       }else if($.mobile.activePage.is('#transferup_item')){
            $.mobile.changePage('#transferup',{transition: 'slidefade',reverse: true});
       }else if($.mobile.activePage.is('#transferdown')){
            $.mobile.changePage('#transfer',{transition: 'slidefade',reverse: true});
       }else if($.mobile.activePage.is('#transferdown_item')){
            $.mobile.changePage('#transferdown',{transition: 'slidefade',reverse: true});
       }else if($.mobile.activePage.is('#transfer_damage')){
            $.mobile.changePage('#transfer',{transition: 'slidefade',reverse: true});
       }else if($.mobile.activePage.is('#transfer_damage_item')){
            $.mobile.changePage('#transfer_damage',{transition: 'slidefade',reverse: true});
       }else if($.mobile.activePage.is('#transfer_isp')){
            $.mobile.changePage('#transfer',{transition: 'slidefade',reverse: true});
       }else if($.mobile.activePage.is('#transfer_isp_item')){
            $.mobile.changePage('#transfer_isp',{transition: 'slidefade',reverse: true});
       }else if($.mobile.activePage.is('#transfer_normal')){
            $.mobile.changePage('#transfer',{transition: 'slidefade',reverse: true});
       }else if($.mobile.activePage.is('#transfer_normal_item')){
            $.mobile.changePage('#transfer_normal',{transition: 'slidefade',reverse: true});
       }else if($.mobile.activePage.is('#stock')){
            $.mobile.changePage('#pagetwo',{transition: 'slidefade',reverse: true});
       }else if($.mobile.activePage.is('#countstock')){
            $.mobile.changePage('#stock',{transition: 'slidefade',reverse: true});
       }else if($.mobile.activePage.is('#stockedit')){
            $.mobile.changePage('#countstock',{transition: 'slidefade',reverse: true});
       }else if($.mobile.activePage.is('#shelves')){
            $.mobile.changePage('#countstock',{transition: 'slidefade',reverse: true});
       }else if($.mobile.activePage.is('#countitem')){
            $.mobile.changePage('#shelves',{transition: 'slidefade',reverse: true});
       }else if($.mobile.activePage.is('#setting')){
            $.mobile.changePage('#pagetwo',{transition: 'slidefade',reverse: true});
       }else{

           navigator.app.backHistory()
       }/*else if($.mobile.activePage.is('#pagepr')){
                    $.mobile.changePage('#pagetwo',{transition: 'slidefade',reverse: true});
               }else if($.mobile.activePage.is('#listpr')){
                    $.mobile.changePage('#pagepr',{transition: 'slidefade',reverse: true});
               }else if($.mobile.activePage.is('#pluspr')){
                    $.mobile.changePage('#pagepr',{transition: 'slidefade',reverse: true});
               }else if($.mobile.activePage.is('#additem')){
                    $.mobile.changePage('#pluspr',{transition: 'slidefade',reverse: true});
               }*/



    }, false);
     document.addEventListener("menubutton", function(e){
     if($.mobile.activePage.is('#pageone')){alert("asd")}
     },false);
}
