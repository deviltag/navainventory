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
                            document.getElementById("CTitemno").innerHTML = "** SCANBARCODE ITEM **";
                            document.getElementById("CTitemname").innerHTML = "";
                            document.getElementById("CTunit").innerHTML = "";

                            document.getElementById("itemNo").value = "";
                            document.getElementById("itemsName").value = "";
                            document.getElementById("Cunit").value = "";

                            $("#count1").show();
                            $("#count2").hide();
                            $.mobile.changePage("#countitem");
                    	 break;
             case "countitem" :

                            $("#count1").hide();
                            $("#count2").show();

                            document.getElementById("CTitemno").innerHTML = ci.scanResult;
                            document.getElementById("CTitemname").innerHTML = "M150";
                            document.getElementById("CTunit").innerHTML = "ขวด";

                            document.getElementById("itemNo").value = ci.scanResult;
                            document.getElementById("itemsName").value = "M150";
                            document.getElementById("Cunit").value = "ขวด";

                            $.mobile.changePage("#countitem");
                         break;
           	}
});

function select_wh(warehouse){
    alert(warehouse.value);
    document.getElementById("wh").innerHTML = "คลัง : "+warehouse.value;
    document.getElementById("wh2").innerHTML = "คลัง : "+warehouse.value;
   // document.getElementById("wh").value = "คลัง : "+warehouse.value;
    $.mobile.changePage("#countstock");
}

function skipshelves(){
    if (confirm('คุณไม่ต้องการเลือกชั้นเก็บใช่หรือไม่ ?')) {
        document.getElementById("shel").value = "0";
        document.getElementById("CTshelves").innerHTML = "ไม่มีชั้นเก็บ";
        document.getElementById("CTitemno").innerHTML = "** SCANBARCODE ITEM **";
        document.getElementById("CTitemname").innerHTML = "";
        document.getElementById("CTunit").innerHTML = "";
        document.getElementById("itemNo").value = "";
        document.getElementById("itemsName").value = "";
        document.getElementById("Cunit").value = "";
        document.getElementById("counts").value = "";
        $.mobile.changePage("#countitem");
        $("#count1").show();
        $("#count2").hide();
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
    if(citem == ""||noitem == ""){
    alert("กรุณากรอกข้อมูลให้ครบด้วย !!");
    }else{
    alert('result:[{"shelves":"'+sv+'","itemNo":"'+noitem+'","itemName":"'+nitem+'","Citem":"'+citem+'","Cunit":"'+uitem+'"}]');
    document.getElementById("CTitemno").innerHTML = "** SCANBARCODE ITEM **";
    document.getElementById("CTitemname").innerHTML = "";
    document.getElementById("CTunit").innerHTML = "";
    document.getElementById("itemNo").value = "";
    document.getElementById("itemsName").value = "";
    document.getElementById("Cunit").value = "";
    document.getElementById("counts").value = "";

    $("#count1").show();
    $("#count2").hide();
    $("#scanitemcode").show();
    $.mobile.changePage("#countitem");
    }

}

function savedata(){

}

function editstock(){
       document.getElementById("Eshel").value = "WH1";
       document.getElementById("EitemNo").value = "5122456333";
       document.getElementById("EitemsName").value = "M150";
       document.getElementById("Ecounts").value = "56";
       document.getElementById("ECunit").value = "ขวด";

       document.getElementById("ECTshelves").innerHTML = "WH1";
       document.getElementById("ECTitemno").innerHTML = "5122456333";
       document.getElementById("ECTitemname").innerHTML = "M150";
       document.getElementById("ECTunit").innerHTML = "ขวด";
   $.mobile.changePage("#stockedit");
}

function deleteitem(){
    if(confirm("คุณต้องการลบรายการนับสินค้ารายการนี้ใช่หรือไม่!!")){
        alert("ลบเรียบร้อย!!");
        $.mobile.changePage("#countstock");
    }else{
        $.mobile.changePage("#stockedit");
    }
}