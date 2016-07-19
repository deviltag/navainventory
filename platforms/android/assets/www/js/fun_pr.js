window.addEventListener('native.onscanbarcode', function (pr) {
       var page = "";
       //alert(pr.scanResult);
       console.log(pr.scanResult);
       localStorage.barcode = pr.scanResult;

       if(page == ""){
         page = $.mobile.activePage.attr('id');
       }
       $(document).on("pageshow", function (e, data) {
          page = $(this)[0].activeElement.id;
       });

       //alert(page);
                			//document.getElementById("noitems").value = pr.scanResult;
       switch(page){
            /* case "pageone" :
                                $.ajax({
                                    url: "http://nava.work:8080/api/v1/login",
                                    data: '{"name":"tom","password":"1234"}',
                                    contentType: "Content-Type: application/json",
                                    dataType: "json",
                                    type: "POST",
                                    cache: false,
                                       success: function(result){
                                        //var obj = JSON.stringify(result);
                                        alert("login : "+result.Message+" สถานะ : "+result.Status);
                                        console.log(result);
                                        $.mobile.changePage("#pagetwo");
                                        },
                                       error: function (error) {
                                        alert("can't call api");
                                        $.mobile.changePage("#pagetwo");
                                        }

                                  });

                                  return false;
                                 // $.mobile.changePage("#pagetwo");

                			 break;*/
             case "additem" : //alert("M150");
                                 document.getElementById("noitems").value = pr.scanResult;
                                 document.getElementById("nameitems").value = "M150";
                                 document.getElementById("gradeitem").value = "A";
                                 document.getElementById("units").value = "ขวด";
                                 document.getElementById("citem").value = "";

                                 document.getElementById("Tnoitem").innerHTML = "<b>รหัสสินค้า : </b>"+pr.scanResult;
                                 document.getElementById("TNameitem").innerHTML = "<b>ชื่อสินค้า : </b>M150";
                                 document.getElementById("Tgrade").innerHTML = "<b>เกรด : </b>A";
                                 document.getElementById("Tunit").innerHTML = "<b>หน่วยนับ : </b>ขวด";

                                 $("#itemdetail").show();
                                 $("#scanbaritem").hide();
                                 document.getElementById("citem").focus();
                                 $.mobile.changePage("#additem");

                             break;
                			}
});

function additem(){
  alert("เพิ่มสินค้า!!");

  document.getElementById("noitems").value = "";
  $("#scanbaritem").show();
  $("#itemdetail").hide();
  $.mobile.changePage('#additem');
}

function clicksubmit(){
    var no = document.getElementById("noitems").value;
    var name = document.getElementById("nameitems").value;
    var grade = document.getElementById("gradeitem").value;
    var cnt = document.getElementById("citem").value;
    var units = document.getElementById("units").value;

   if(no==""){
       alert("ท่านยังไม่ได้ scan สินค้า กรุณา scan สินค้าด้วย");
       $ .mobile.changePage("#additem");
   }else{
        if(cnt == ""){
            alert("ท่านยังไม่ได้กรอกจำนวนสินค้า กรุณากรอกจำนวนให้ถูกต้อง!!");
            $.mobile.changePage("#additem");
        }else{
            alert("บันทึกข้อมูลแล้ว!!");
            alert("รหัสสินค้า: "+no+", ชื่อสินค้า: "+name+", เกรด: "+grade+", จำนวน: "+cnt+", หน่วยนับ: "+units);
                document.getElementById("noitems").value = "";
                $("#itemdetail").hide();
                $("#scanbaritem").show();
                $ .mobile.changePage("#additem");
        }

    }
}

function pluspr(){
    alert("บันทึกข้อมูลแล้ว!!");
    $("#itemdetail").hide();
    $("#scanbaritem").show();
    $.mobile.changePage('#pagepr');
}
