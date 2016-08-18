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