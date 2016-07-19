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

       //alert(page);
       console.log("count : " + page);
switch(page){
             case "shelves" :
                            alert("ชั้นเก็บที่ : "+ ci.scanResult);
                            document.getElementById("shel").value = ci.scanResult;
                            document.getElementById("CTshelves").innerHTML = ci.scanResult;

                            $("#itemcnt").hide();
                            $("#count2").hide();
                            $("#scanitemcode").show();
                            $.mobile.changePage("#countitem");
                    	 break;
             case "countitem" :
                            $("#itemcnt").show();
                            $("#scanitemcode").hide();
                            $("#count1").hide();
                            $("#count2").show();

                            document.getElementById("CTitemno").innerHTML = ci.scanResult;
                            document.getElementById("CTitemname").innerHTML = "M150";
                            document.getElementById("CTunit").innerHTML = "ขวด";

                            document.getElementById("itemNo").value = ci.scanResult;
                            document.getElementById("itemsName").value = "M150";
                            document.getElementById("Cunit").value = "ขวด";
                                window.onload = function() {
                                  document.getElementById("myinputbox").focus();
                                }
                            $.mobile.changePage("#countitem");
                         break;
           	}
});

function select_wh(warehouse){
    alert(warehouse.value);
    document.getElementById("wh").innerHTML = "คลัง : "+warehouse.value;
    $.mobile.changePage("#countstock");
}

function skipshelves(){
    if (confirm('คุณไม่ต้องการเลือกชั้นเก็บใช่หรือไม่ ?')) {
        document.getElementById("shel").value = "0";
        document.getElementById("CTshelves").innerHTML = "ไม่มีชั้นเก็บ";
        $.mobile.changePage("#countitem");
        $("#count1").show();
        $("#count2").hide();
        $("#itemcnt").hide();
        $("#scanitemcode").show();
    } else {
        $.mobile.changePage("#shelves");
    }

}

function backstock(){
   // alert("back");
    document.getElementById("defult").selected = "true";
    $.mobile.changePage("#stock");
    //window.location="#stock";
}

function savestock(){

    var sv = document.getElementById("shel").value;
    var noitem = document.getElementById("itemNo").value;
    var nitem = document.getElementById("itemsName").value;
    var citem = document.getElementById("counts").value;
    var uitem = document.getElementById("Cunit").value;
    if(citem == ""){
    alert("กรุณากรอกข้อมูลให้ครบด้วย !!");
    }else{
    alert('result:[{"shelves":"'+sv+'","itemNo":"'+noitem+'","itemName":"'+nitem+'","Citem":"'+citem+'","Cunit":"'+uitem+'"}]');
    document.getElementById("counts").value = "";
    $("#count1").show();
    $("#count2").hide();
    $("#itemcnt").hide();
    $("#scanitemcode").show();
    $.mobile.changePage("#countitem");
    }

}