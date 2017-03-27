function add_item_promotion(){
var fruits = [["item1","Banana","item2","Banana"],
["item1","Orange","item2","Orange"],["item1","Apple","item2","Apple"],["item1","Mango","item2","Mango"],["item1","Mango","item2","Mango"],["item1","Mango","item2","Mango"]];
    var detail = "";

        fruits.push(["item1","kivi","item2","kivi"]);
        detail = "<table>";
        var counts = fruits.length;
    	for(var i = 0;i<counts;i++){
        	detail += "<tr><td>"+fruits[i][0]+"</td><td>"+fruits[i][1]+"</td><td>"+fruits[i][2]+"</td><td>"+fruits[i][3]+"</td></tr>";
        }
        detail += "</table>";
        $.mobile.changePage('#detailpromotionRequest',{transition: 'slidefade'});
        document.getElementById("detailPromotion").innerHTML = detail;

}

function save_promotion(){
    alertify.success("save promotion success");
        $.mobile.changePage('#promotionRequest',{transition: 'slidefade'});

}
function promotion_list(){

    $.ajax({
            url: localStorage.api_url_server+"NPExtentionWS/promotion/v1/campaign",
            data: '{"access_token":"'+localStorage.token+'"}',
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            type: "POST",
            cache: false,
            success: function(result){
            console.log(result);
            if(localStorage.docnoPromo){
                document.getElementById('savehead').style.display = 'block';
                document.getElementById('nextpro').style.display = 'none';
                document.getElementById('headselecepro').innerHTML = "แก้ไขเอกสารโปรโมชั่น";
            }else{
                document.getElementById('savehead').style.display = 'none';
                document.getElementById('nextpro').style.display = 'block';
                document.getElementById('headselecepro').innerHTML = "เลือกโปรโมชั่น";
            }

                var length = result.list_pm.length;
                var list = "<select class='whselect' id='promo' data-role='none'>";
                for(var i = 0;i<length;i++){

                list += '<option value="'+result.list_pm[i].pm_code+'">'+result.list_pm[i].pm_code+' / '+result.list_pm[i].pm_name+'</option>';

                }
                list += "</select>";
                document.getElementById('promotionList').innerHTML = list;
                promotion_typelist();


            },
            error: function (error){
            alertify.alert(error);
            }
            });
}

function promotion_typelist(){
    $.ajax({
            url: localStorage.api_url_server+"NPExtentionWS/promotion/v1/promotype",
            data: '{"access_token":"'+localStorage.token+'"}',
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            type: "POST",
            cache: false,
            success: function(result){
            console.log(result);

                var length = result.list_promotype.length;
                var pType = "<select class='whselect' id='promoT' data-role='none'>";
                for(var i = 0;i<length;i++){

                pType += '<option value="'+result.list_promotype[i].code+'">'+result.list_promotype[i].name+'</option>';

                }
                pType += "</select>";
                document.getElementById('promotionTypeList').innerHTML = pType;
                sectionList();

            },
            error: function (error){
            alertify.alert(error);
            }
            });
}

function sectionList(){
    $.ajax({
            url: localStorage.api_url_server+"NPExtentionWS/promotion/v1/secman",
            data: '{"access_token":"'+localStorage.token+'"}',
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            type: "POST",
            cache: false,
            success: function(result){
            console.log(result);

                var length = result.list_secman.length;
                var sec = "<select class='whselect' id='sectionP' data-role='none'>";
                for(var i = 0;i<length;i++){

                sec += '<option value="'+result.list_secman[i].secman_code+'">'+result.list_secman[i].secman_code+'</option>';

                }
                sec += "</select>";
                document.getElementById('sectionList').innerHTML = sec;


            },
            error: function (error){
            alertify.alert(error);
            }
            });
}

function searchItemPromotion(){
var searchp = document.getElementById('searchItemP').value;
console.log('{"access_token":"'+localStorage.token+'","search":"'+searchp+'"}');
$.ajax({
                   url: localStorage.api_url_server+"NPExtentionWS/promotion/v1/item",
                   data: '{"access_token":"'+localStorage.token+'","search":"'+searchp+'"}',
                   contentType: "application/json; charset=utf-8",
                   dataType: "json",
                   type: "POST",
                   cache: false,
                   success: function(result){
                   console.log(result);
                   var list = '<div style="width:80%; margin:10px auto;">';
                   var row = result.list_item.length;

                for(var i = 0;i<row;i++){
                   list += "<button class='btn btn-primary btn-sm btn-block' onclick='select_itemPromotion("+'"'+result.list_item[i].item_code+'","'+result.list_item[i].unit_code+'"'+")'>"+result.list_item[i].item_name+" / "+result.list_item[i].unit_code+"</button>";
                }
                   list += "</div>";
                   document.getElementById('listItem').innerHTML = list;
                    },
                    error: function (error){
                      //switch_api();
                      //searchpo();
                      console.log(error);
                      //alertify.error("network error!!");
                    }
                });
}

function select_itemPromotion(item,unit){
getitemsP(item,unit);
$('#searchlistItem').modal('hide');
//alert(item+" / "+unit);
}

function getitemsP(searchs,unit){
        $.ajax({
                        url: localStorage.api_url_server+"NPExtentionWS/promotion/v1/itemdetails",
                        data: '{"access_token":"'+localStorage.token+'","item_code":"'+searchs+'","unit_code":"'+unit+'"}',
                        contentType: "application/json; charset=utf-8",
                        dataType: "json",
                        type: "POST",
                        cache: false,
                        success: function(result){
                        console.log(result);
                        if(result.item_code == "" || result.item_code == null){
                        alertify.error("บาร์โค๊ดไม่ถูกต้อง !!");
                        $("#itempromotionRequest").bind('pageshow', function() {
                         $('#itemcode_promotion').focus();
                         });
                        $('#itemcode_promotion').focus();
                        return false;
                        }else{
                        document.getElementById("itemcode_promotion").value =  result.item_code;
                        document.getElementById("itemname_promotion").innerHTML =  "ชื่อสินค้า : "+result.item_name;
                        document.getElementById("price_promotion").innerHTML =  "ราคาปกติ : "+result.sale_price;
                        document.getElementById("priceForcal").value = result.sale_price;
                        document.getElementById("barcode_promotion").value =  result.item_code;
                        document.getElementById("unitcode_promotion").innerHTML = "หน่วยนับ :"+  result.unit_code;
                        document.getElementById("cal_promotion").innerHTML = "";
                        document.getElementById("discount_promotion").value = "";
                        document.getElementById("itemnameP").value = result.item_name;
                        document.getElementById("unitcodeP").value = result.unit_code;
                        document.getElementById("com_cash").value = result.comm_retail;
                        document.getElementById("com_credit").value = result.comm_wholesale;
                        document.getElementById("camp").value = result.comm_name;
                        document.getElementById("begin_promotion").value = convertDateDmyth(result.comm_begindate);
                        document.getElementById("end_promotion").value = convertDateDmyth(result.comm_enddate);
                        document.getElementById("description_promotion").value = "";


                        $("#itempromotionRequest").bind('pageshow', function() {
                         $('#discount_promotion').focus();
                         });
                        $('#discount_promotion').focus();
                        }
                        },
                        error: function (error){
                        alertify.alert(error);
                        }
                        });
}
function getitemsPscan(searchs){
if(searchs){
    var search = searchs;
}else{
    var search = document.getElementById('itemcode_promotion').value;
}
        $.ajax({
                        url: localStorage.api_url_server+"NPExtentionWS/promotion/v1/itembarcode",
                        data: '{"access_token":"'+localStorage.token+'","search":"'+search+'"}',
                        contentType: "application/json; charset=utf-8",
                        dataType: "json",
                        type: "POST",
                        cache: false,
                        success: function(result){
                        console.log(result);
                        if(result.item_code == "" || result.item_code == null){
                        alertify.error("บาร์โค๊ดไม่ถูกต้อง !!");
                        $("#itempromotionRequest").bind('pageshow', function() {
                         $('#itemcode_promotion').focus();
                         });
                        $('#itemcode_promotion').focus();
                        return false;
                        }else{
                        document.getElementById("itemcode_promotion").value =  result.item_code;
                        document.getElementById("itemname_promotion").innerHTML =  "ชื่อสินค้า : "+result.item_name;
                        document.getElementById("price_promotion").innerHTML =  "ราคาปกติ : "+result.sale_price;
                        document.getElementById("priceForcal").value = result.sale_price;
                        document.getElementById("barcode_promotion").value =  result.item_code;
                        document.getElementById("unitcode_promotion").innerHTML = "หน่วยนับ :"+  result.unit_code;
                        document.getElementById("cal_promotion").innerHTML = "";
                        document.getElementById("discount_promotion").innerHTML = "";
                        document.getElementById("itemnameP").value = result.item_name;
                        document.getElementById("unitcodeP").value = result.unit_code;
                        document.getElementById("com_cash").value = result.comm_retail;
                        document.getElementById("com_credit").value = result.comm_wholesale;
                        document.getElementById("camp").value = result.comm_name;
                        document.getElementById("begin_promotion").value = convertDateDmyth(result.comm_begindate);
                        document.getElementById("end_promotion").value = convertDateDmyth(result.comm_enddate);
                        localStorage.errorp = "0";


                        $("#itempromotionRequest").bind('pageshow', function() {
                         $('#discount_promotion').focus();
                         });
                        $('#discount_promotion').focus();
                        }
                        },
                        error: function (error){
                        alertify.alert(error);
                        }
                        });
}
function cal_discount(){
var price = document.getElementById("priceForcal").value;
var discount = document.getElementById("discount_promotion").value;


var cal = price-discount;

console.log(cal);

    document.getElementById("cal_promotion").innerHTML = "ราคาโปรโมชั่น : "+cal+" บาท";
    document.getElementById("promoPrice").value = cal;
    document.getElementById("disword").value = discount;
}

function discount3deegree(cb){
//alert(cb.checked);
var price = document.getElementById("priceForcal").value;
var dis = (price*3)/100;
var cal = price-dis;
if(price==""){
    alertify.error("กรุณากรอกสินค้าก่อน");
     document.getElementById("itemcode_promotion").focus();
     document.getElementById("register_dis").checked = false;
}else{
    if(cb.checked==true){
        document.getElementById("discount_promotion").disabled = true;
        document.getElementById("discount_promotion").value = dis;
        document.getElementById("cal_promotion").innerHTML = "ราคาโปรโมชั่น : "+cal+" บาท";
        document.getElementById("promoPrice").value = cal;
        document.getElementById("disword").value = "3%";
    }else{
        document.getElementById("discount_promotion").disabled = false;
        document.getElementById("discount_promotion").value = "";
        document.getElementById("cal_promotion").innerHTML = "";
        document.getElementById("promoPrice").value = "";
        document.getElementById("disword").value = "";
    }
}
}


function searchListItem(){
$('#searchlistItem').modal();

$('#searchlistItem').on('shown.bs.modal', function () {
    $('#searchItemP').focus();
})

}





function listpromotion(){
var search = document.getElementById('searchpromotion').value;
        $.ajax({
                        url: localStorage.api_url_server+"NPExtentionWS/promotion/v1/promotion",
                        data: '{"access_token":"'+localStorage.token+'","search":"'+search+'"}',
                        contentType: "application/json; charset=utf-8",
                        dataType: "json",
                        type: "POST",
                        cache: false,
                        success: function(result){
                        console.log(result);
                        var row = result.list_pm.length;
                        var list = "";
                        for(var i = 0;i<row;i++){
                        if(result.list_pm[i].is_cancel=="1"){
                            list += "<button style='font-size:10px; background:red;' class='btn btn-primary btn-sm btn-block todo-ccpro' data-cancelprolist='cp"+result.list_pm[i].doc_no+"' data-cancelprocode='"+result.list_pm[i].doc_no+"' id='cp"+result.list_pm[i].doc_no+"'";
                            list += "onclick='promodetail("+'"'+result.list_pm[i].doc_no+'"'+")'>"+result.list_pm[i].doc_no+" / "+convertDateDmyth(result.list_pm[i].start_promo)+"<br>"+result.list_pm[i].sec_name+" / "+result.list_pm[i].promotion_Code+"</button>";

                        }else if(result.list_pm[i].is_confirm=="2"){
                            list += "<button style='font-size:10px; background:#98FB98;' class='btn btn-primary btn-sm btn-block todo-ccpro' data-cancelprolist='cp"+result.list_pm[i].doc_no+"' data-cancelprocode='"+result.list_pm[i].doc_no+"' id='cp"+result.list_pm[i].doc_no+"'";
                            list += "onclick='promodetail("+'"'+result.list_pm[i].doc_no+'"'+")'>"+result.list_pm[i].doc_no+" / "+convertDateDmyth(result.list_pm[i].start_promo)+"<br>"+result.list_pm[i].sec_name+" / "+result.list_pm[i].promotion_Code+"</button>";

                        }else{

                            list += "<button style='font-size:10px;' class='btn btn-primary btn-sm btn-block todo-ccpro' data-cancelprolist='cp"+result.list_pm[i].doc_no+"' data-cancelprocode='"+result.list_pm[i].doc_no+"' id='cp"+result.list_pm[i].doc_no+"'";
                            list += "onclick='promodetail("+'"'+result.list_pm[i].doc_no+'"'+")'>"+result.list_pm[i].doc_no+" / "+convertDateDmyth(result.list_pm[i].start_promo)+"<br>"+result.list_pm[i].sec_name+" / "+result.list_pm[i].promotion_Code+"</button>";
                        }
                        }
                        promotion_list();
                        document.getElementById("promotionlistt").innerHTML = list;
                        },
                        error: function (error){
                        alertify.alert(error);
                        }
                        });
}

function promodetail(dcNo){
        $.ajax({
                        url: localStorage.api_url_server+"NPExtentionWS/promotion/v1/promodetails",
                        data: '{"access_token":"'+localStorage.token+'","search":"'+dcNo+'"}',
                        contentType: "application/json; charset=utf-8",
                        dataType: "json",
                        type: "POST",
                        cache: false,
                        success: function(result){
                        console.log(result);
                        /*if(localStorage.statuspromo == "1"){
                        document.getElementById('additemPro').style.display = 'block';
                        }else{
                        document.getElementById('additemPro').style.display = "none" ;
                        }*/

                        var promo_head = "<div style='font-size:13px;'>";
                        localStorage.docnoPromo = result.doc_no;
                        if(result.is_cancel == "1"){
                            promo_head += "<p>DocNo : "+result.doc_no+"&nbsp;&nbsp;";
                            promo_head += "&nbsp;&nbsp;&nbsp;<i class='glyphicon glyphicon-eye-open' data-toggle='collapse' data-target='#headhide'></i>";
                            promo_head += "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<img src='images/Cancel.jpg'></p>";
                            document.getElementById('additemPro').style.display = "none" ;

                        }else if(result.is_confirm == "2"){
                            promo_head += "<p>DocNo : "+result.doc_no+"&nbsp;&nbsp;";
                            promo_head += "&nbsp;&nbsp;&nbsp;<i class='glyphicon glyphicon-eye-open' data-toggle='collapse' data-target='#headhide'></i>";
                            promo_head += "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<img src='images/Confirm.jpg'></p>";
                            document.getElementById('additemPro').style.display = "none" ;
                        }else{
                            promo_head += "<p>DocNo : "+result.doc_no+"&nbsp;&nbsp;";
                            promo_head += "&nbsp;&nbsp;&nbsp;<i class='glyphicon glyphicon-eye-open' data-toggle='collapse' data-target='#headhide'></i>";
                            promo_head += "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<i class='glyphicon glyphicon-pencil' onclick='editHead();'></i>";
                            promo_head += "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<img src='images/New.jpg'></p>";
                            document.getElementById('additemPro').style.display = "block" ;
                        }
                        promo_head += "<p>วันที่ขอโปรโมชั่น : "+convertDateDmyth(result.start_promo)+"</p>";
                        promo_head += "<p>เลขที่โปรโมชั่น : "+result.promotion_Code+"</p>";
                        localStorage.promotion = result.promotion_Code;
                        promo_head += "<div class='collapse' id='headhide'><p>ชื่อ section : "+result.sec_name+"</p>";
                        promo_head += "<p>ผู้ทำเอกสาร : "+result.user_id+"</p>";
                        promo_head += "<p>จาก : "+convertDateDmyth(result.date_start)+" ถึง "+convertDateDmyth(result.date_end)+"</p></div>";
                        var row = result.list_item.length;
                        var promo_detail = "<div class='row' style='border:1px solid #fff; padding:2px 0 1px 0; width:100%; margin:0 auto;'>";
                        promo_detail += "<div class='col-xs-1'>ลำดับ</div><div class='col-xs-6'>ชื่อสินค้า</div><div class='col-xs-2'>ปกติ</div>";
                        promo_detail += "<div class='col-xs-2'>โปร</div></div>";
                        for(var i = 0;i<row;i++){
                        promo_detail += '<div style="border:1px solid #fff; padding:2px 0 1px 0; width:100%; margin:0 auto;">';
                        if(result.is_cancel == "1"){
                        promo_detail += '<div class="row" data-toggle="collapse" data-target="#detaiilhide'+i+'">';
                        }else if(result.is_confirm == "2"){
                            promo_detail += '<div class="row" data-toggle="collapse" data-target="#detaiilhide'+i+'">';
                        }else{
                            promo_detail += '<div class="row" ondblclick="cancelItemPro('+"'"+result.list_item[i].item_code+"','"+result.list_item[i].unit_code+"'"+')" data-toggle="collapse" data-target="#detaiilhide'+i+'">';
                        }

                        promo_detail += "<div class='col-xs-1'>"+(i+1)+"</div>";
                        promo_detail += "<div class='col-xs-6'>"+result.list_item[i].item_name+" </div>";
                        promo_detail += "<div class='col-xs-2'>"+result.list_item[i].normal_price.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")+"</div>";
                        promo_detail += "<div class='col-xs-2'>"+result.list_item[i].promotion_price.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")+"</div>";
                        promo_detail += '</div>';
                        promo_detail += '<div id="detaiilhide'+i+'" class="row collapse">';
                        promo_detail += "<div class='col-xs-1'>&nbsp;</div>";
                        promo_detail += "<div class='col-xs-3'>"+result.list_item[i].item_code+"</div>";
                        promo_detail += "<div class='col-xs-2'>"+result.list_item[i].unit_code+"</div>";
                        promo_detail += "<div class='col-xs-4'>ลด "+result.list_item[i].discount.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")+" บาท</div>";

                        promo_detail += '</div>';
                        promo_detail += '</div>';
                        localStorage.promoType = result.list_item[i].promo_type;


                        //document.getElementById("promoT").options[document.getElementById("promoT").selectedIndex].value = result.list_item[i].promo_type;
                        }
                        document.getElementById('promotion_head').innerHTML = promo_head;
                        document.getElementById('detailPromotion').innerHTML = promo_detail;

                        $.mobile.changePage('#detailpromotionRequest',{transition: 'slidefade'});

                        },
                        error: function (error){
                        alertify.alert(error);
                        }
                        });
}

function showdetailpromotion(){
document.getElementById('headhide').style.display = "block";
}

function insertPromotion(){
    if(document.getElementById("itemcode_promotion").value == ""){
        alertify.error("กรุณากรอกสินค้าให้ครบถ้วน");
        document.getElementById("itemcode_promotion").focus();
    }else if(document.getElementById("discount_promotion").value == ""){
        alertify.error("กรุณากรอกส่วนลด");
        document.getElementById("discount_promotion").focus();
    }else{
    if(localStorage.docnoPromo){
    $.ajax({
                            url: localStorage.api_url_server+"NPExtentionWS/promotion/v1/promodetails",
                            data: '{"access_token":"'+localStorage.token+'","search":"'+localStorage.docnoPromo+'"}',
                            contentType: "application/json; charset=utf-8",
                            dataType: "json",
                            type: "POST",
                            cache: false,
                            success: function(result){
                            console.log(result);
                            var row = result.list_item.length;
                            var count = 0;
                            for(var i = 0;i<row;i++){
                                if(document.getElementById('itemcode_promotion').value == result.list_item[i].item_code){
                                    count +=1;
                                }
                            }

                            if(count>0){
                            localStorage.errorp = "1";
                            insertSub_promotion(localStorage.docnoPromo);
                            }else{
                                insertSub_promotion(localStorage.docnoPromo);
                            }
                            },
                            error: function (error){
                            alertify.alert(error);
                            }
                            });

    }else{
    gendocNoPromotion();
    }
    }
}

function gendocNoPromotion(){
    if(localStorage.statuspromo == "1"){
        insertSub_promotion(localStorage.docnoPromo);
    }else{
        $.ajax({
                        url: localStorage.api_url_server+"NPExtentionWS/promotion/v1/docno",
                        data: '{"access_token":"'+localStorage.token+'"}',
                        contentType: "application/json; charset=utf-8",
                        dataType: "json",
                        type: "POST",
                        cache: false,
                        success: function(result){
                        console.log(result);

                        localStorage.docnoPromo = result.doc_no;
                        localStorage.statuspromo = "1";
                        insertHead_promotion(result.doc_no);

                        },
                        error: function (error){
                        alertify.alert(error);
                        }
                        });
    }
}

function insertHead_promotion(docNop){
var promo = document.getElementById("promo").options[document.getElementById("promo").selectedIndex].value;
var sectionP = document.getElementById("sectionP").options[document.getElementById("sectionP").selectedIndex].value;

    alert('{"access_token":"'+localStorage.token+'","check_Job":"1","new_docno":"'+docNop+'","start_promo":"'+date+'","sec_name":"'+sectionP+'","promotion_code":"'+promo+'","user_id":"'+localStorage.username+'"}');
    console.log('{"access_token":"'+localStorage.token+'","check_Job":"1","new_docno":"'+docNop+'","start_promo":"'+date+'","sec_name":"'+sectionP+'","promotion_code":"'+promo+'","user_id":"'+localStorage.username+'"}');

        $.ajax({
                        url: localStorage.api_url_server+"NPExtentionWS/promotion/v1/insert",
                        data: '{"access_token":"'+localStorage.token+'","check_Job":"1","new_docno":"'+docNop+'","start_promo":"'+date+'","sec_name":"'+sectionP+'","promotion_code":"'+promo+'","user_id":"'+localStorage.username+'"}',
                        contentType: "application/json; charset=utf-8",
                        dataType: "json",
                        type: "POST",
                        cache: false,
                        success: function(result){
                        console.log(result);
                        insertSub_promotion(result.doc_no);

                        },
                        error: function (error){
                        alertify.alert(error);
                        }
                        });

}

function insertSub_promotion(docNop){
var itemcode_promotion = document.getElementById("itemcode_promotion").value;
var itemname_promotion = document.getElementById("itemnameP").value;
var unitcode_promotion = document.getElementById("unitcodeP").value;
var Nprice = document.getElementById("priceForcal").value;
var discount = document.getElementById("discount_promotion").value;
var disWord = document.getElementById("disword").value;
var promoPrice = document.getElementById("promoPrice").value;
var my_description = document.getElementById("description_promotion").value;


if(localStorage.statuspromo == "1"){
    var protype = localStorage.promoType;
    var promo = localStorage.promotion;
}else{
    var protype = document.getElementById("promoT").options[document.getElementById("promoT").selectedIndex].value;
    var promo = document.getElementById("promo").options[document.getElementById("promo").selectedIndex].value;
}

if ($('#Brochure').is(":checked")){
    brochure = "1";
}else{
    brochure = "0";
}

        //NPExtentionWS/promotion/v1/manageitem

    alert('{"access_token":"'+localStorage.token+'","error":"'+localStorage.errorp+'","is_complete_save":"1","doc_no":"'+docNop+'","promotion_code":"'+promo+'","item_code":"'+itemcode_promotion+'","item_name":"'+itemname_promotion+'","unit_code":"'+unitcode_promotion+'","normal_price":"'+Nprice+'","from_qTY":"1","to_qty":"99999","discount":"'+discount+'","discount_type":"0","discount_Word":"'+disWord+'","promotion_price":"'+promoPrice+'","my_description":"'+my_description+'","is_cancel":"0","line_number":"0","is_brochure":"'+brochure+'","is_member":"0","promo_Type":"'+protype+'","hot_price":"","user_id":"'+localStorage.username+'"}');
    console.log('{"access_token":"'+localStorage.token+'","error":"'+localStorage.errorp+'","is_complete_save":"1","doc_no":"'+docNop+'","promotion_code":"'+promo+'","item_code":"'+itemcode_promotion+'","item_name":"'+itemname_promotion+'","unit_code":"'+unitcode_promotion+'","normal_price":"'+Nprice+'","from_qTY":"1","to_qty":"99999","discount":"'+discount+'","discount_type":"0","discount_Word":"'+disWord+'","promotion_price":"'+promoPrice+'","my_description":"'+my_description+'","is_cancel":"0","line_number":"0","is_brochure":"'+brochure+'","is_member":"0","promo_Type":"'+protype+'","hot_price":"","user_id":"'+localStorage.username+'"}');

    $.ajax({
                            url: localStorage.api_url_server+"NPExtentionWS/promotion/v1/manageitem",
                            data: '{"access_token":"'+localStorage.token+'","error":"'+localStorage.errorp+'","is_complete_save":"0","doc_no":"'+docNop+'","promotion_code":"'+promo+'","item_code":"'+itemcode_promotion+'","item_name":"'+itemname_promotion+'","unit_code":"'+unitcode_promotion+'","normal_price":"'+Nprice+'","from_qTY":"1","to_qty":"99999","discount":"'+discount+'","discount_type":"0","discount_Word":"'+disWord+'","promotion_price":"'+promoPrice+'","my_description":"'+my_description+'","is_cancel":"0","line_number":"","is_brochure":"'+brochure+'","is_member":"0","promo_Type":"'+protype+'","hot_price":"","user_id":"'+localStorage.username+'"}',
                            contentType: "application/json; charset=utf-8",
                            dataType: "json",
                            type: "POST",
                            cache: false,
                            success: function(result){
                            console.log(result);
                            if(result.resp.success==true){

                            promodetail(result.doc_no);
                            document.getElementById("itemcode_promotion").value =  "";
                            document.getElementById("itemname_promotion").innerHTML =  "";
                            document.getElementById("price_promotion").innerHTML =  "";
                            document.getElementById("priceForcal").value = "";
                            document.getElementById("barcode_promotion").value =  "";
                            document.getElementById("unitcode_promotion").innerHTML = "";
                            document.getElementById("cal_promotion").innerHTML = "";
                            document.getElementById("discount_promotion").value = "";
                            document.getElementById("itemnameP").value = "";
                            document.getElementById("unitcodeP").value = "";
                            document.getElementById("com_cash").value = "";
                            document.getElementById("com_credit").value = "";
                            document.getElementById("camp").value = "";
                            document.getElementById("begin_promotion").value = "";
                            document.getElementById("end_promotion").value = "";
                            document.getElementById("description_promotion").value = "";
                            localStorage.errorp = "0";
                            $('#register_dis').attr('checked', false);
                            $('#Brochure').attr('checked', false);


                            }else{
                            alertify.error(result.resp.message);
                            }

                            },
                            error: function (error){
                            alertify.alert(error);
                            }
                            });
}

function savePromotion(){
    alert("save!!!!");
    //clearStatusPromotion();
}

function clearStatusPromotion(){
    localStorage.statuspromo = "";
    localStorage.docnoPromo = "";
}

function backitemPro(){
    if(localStorage.docnoPromo){
        promodetail(localStorage.docnoPromo);
    }else{
        $.mobile.changePage('#newpromotionRequest',{transition: 'slidefade',reverse: true});
    }
}

function backheadPro(){
    if(localStorage.docnoPromo){
        promodetail(localStorage.docnoPromo);
    }else{
        $.mobile.changePage('#promotionRequest',{transition: 'slidefade',reverse: true});
    }
}

function editItemP(a){
    alert(a);

}

function checkBackP(){
if(localStorage.statuspromo == "1"){
    alertify.confirm( "ต้องการบันทึกเอกสารนี้หรือไม่่", function (e) {
        if (e) {
            savePromotion();
        }else{
            clearStatusPromotion();
        }
        });


}else{
 clearStatusPromotion();
    $.mobile.changePage('#promotionRequest',{transition: 'slidefade',reverse: true});
}
}

function editHeader(){
alert(localStorage.docnoPromo);
var promo = document.getElementById("promo").options[document.getElementById("promo").selectedIndex].value;
var sectionP = document.getElementById("sectionP").options[document.getElementById("sectionP").selectedIndex].value;

   console.log('{"access_token":"'+localStorage.token+'","check_Job":"1","new_docno":"'+localStorage.docnoPromo+'","start_promo":"'+date+'","sec_name":"'+sectionP+'","promotion_code":"'+promo+'","user_id":"'+localStorage.username+'"}');

        $.ajax({
                        url: localStorage.api_url_server+"NPExtentionWS/promotion/v1/insert",
                        data: '{"access_token":"'+localStorage.token+'","check_Job":"1","new_docno":"'+localStorage.docnoPromo+'","start_promo":"'+date+'","sec_name":"'+sectionP+'","promotion_code":"'+promo+'","user_id":"'+localStorage.username+'"}',
                        contentType: "application/json; charset=utf-8",
                        dataType: "json",
                        type: "POST",
                        cache: false,
                        success: function(result){
                        console.log(result);
                        promodetail(result.doc_no);

                        },
                        error: function (error){
                        alertify.alert(error);
                        }
                        });
}

function editHead(){
    promotion_list();
    $.mobile.changePage('#newpromotionRequest',{transition: 'slidefade',reverse: true});
}

function cancelItemPro(itemcode,unitcode){

	alertify.confirm( "คุณต้องการลบรายการนี้ใช่หรือไม่ ??", function (e) {
    if (e) {
        console.log('{"access_token":"'+localStorage.token+'","doc_no":"'+localStorage.docnoPromo+'","item_code":"'+itemcode+'","unit_code":"'+unitcode+'"}');
        $.ajax({
                        url: localStorage.api_url_server+"NPExtentionWS/promotion/v1/cancelitem",
                        data: '{"access_token":"'+localStorage.token+'","doc_no":"'+localStorage.docnoPromo+'","item_code":"'+itemcode+'","unit_code":"'+unitcode+'"}',
                        contentType: "application/json; charset=utf-8",
                        dataType: "json",
                        type: "POST",
                        cache: false,
                        success: function(result){
                        console.log(result);
                        alertify.success('ยกเลิกสินค้าเรียบร้อยแล้ว');
                        promodetail(localStorage.docnoPromo);

                        },
                        error: function (error){
                        alertify.alert(error);
                        }
                        });
    } else {
        //after clicking Cancel
    }
	},'popup1');

}

//========================================================= cancel list reorder =================================================================
$(document).on('taphold', '.todo-ccpro', function() {
       // console.log("DEBUG - Go popup");
      var cp_code = $(this).attr('data-cancelprocode');
      var cp_list = $(this).attr('data-cancelprolist');
      var $popUp = $("<div/>").popup({
        dismissible: true,

        //theme: "a",
        transition: "pop",
        arrow: "b",
        positionTo: '#'+cp_list
        }).on("popupafterclose", function () {
    //remove the popup when closing
    $(this).remove();
    }).css({
   'padding': '15%',
   'color': '#fff',
   'background': 'red'
   });
    console.log(cp_code);
    console.log('#'+cp_list);
    $("<a>", {
    text: "Cancel",
    href: "#",
    onclick: 'cancelPro('+"'"+cp_code+"'"+');'
    }).appendTo($popUp);

    $popUp.popup('open').enhanceWithin();

    });

function cancelPro(ccdcNo){
	alertify.confirm( "คุณต้องการยกเลิกเอกสารนี้ใช่หรือไม่ ??", function (e) {
    if (e) {
        console.log('{"access_token":"'+localStorage.token+'","search":"'+ccdcNo+'"}');
        $.ajax({
                        url: localStorage.api_url_server+"NPExtentionWS/promotion/v1/cancel",
                        data: '{"access_token":"'+localStorage.token+'","search":"'+ccdcNo+'"}}',
                        contentType: "application/json; charset=utf-8",
                        dataType: "json",
                        type: "POST",
                        cache: false,
                        success: function(result){
                        console.log(result);
                        alertify.success('ยกเลิกเอกสารเรียบร้อยแล้ว');
                        listpromotion();

                        },
                        error: function (error){
                        alertify.alert(error);
                        }
                        });
    } else {
        //after clicking Cancel
    }
	},'popup1');
}

function focus_itempromo(){
    $("#itempromotionRequest").bind('pageshow', function() {
        $('#itemcode_promotion').focus();
    });

}