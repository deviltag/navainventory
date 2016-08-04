document.addEventListener("keydown", function(event) {
        console.log(event.keyCode);
        var page="";
        page = $.mobile.activePage.attr('id');
        console.log(page);

            if(page=="pagetwo"){
                switch (event.keyCode){
                    case 49: $.mobile.changePage("#pagepr");
                            break;
                    case 50: $.mobile.changePage("#receive");
                            break;
                    case 51: $.mobile.changePage("#stock");
                            break;
                    case 52: $.mobile.changePage("#transfer");
                            break;
                    default: $.mobile.changePage("#pagetwo");
                            break;
                }
            }

            if(page=="transfer"){
                switch (event.keyCode){
                    case 49: $.mobile.changePage("#transferup");
                            break;
                    case 50: $.mobile.changePage("#transferdown");
                            break;
                    case 52: $.mobile.changePage("#damage");
                            break;
                    case 53: $.mobile.changePage("#isp");
                            break;
                    case 55: $.mobile.changePage("#rtv");
                            break;
                    case 56: $.mobile.changePage("#transfer_normal");
                            break;
                    default: $.mobile.changePage("#transfer");
                            break;
                }
            }
});

document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady(){
    document.addEventListener("backbutton", function(e){
       if($.mobile.activePage.is('#pageone')){
           navigator.app.exitApp();
       }
       else if($.mobile.activePage.is('#receive_show')){
       if(localStorage.receivestatus == "1"){
           alert("ยังไม่ได้บันทึกใบรับเข้า กรุณาบันทึกก่อน");
           return false;
       }else{$.mobile.changePage("#receive");}
       }else{
           navigator.app.backHistory()
       }
    }, false);
}