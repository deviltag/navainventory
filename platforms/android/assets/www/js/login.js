function rslogin(result){

                                        var networkState = navigator.connection.type;
                                        var states = {};
                                        states[Connection.UNKNOWN] = 'Unknown connection';
                                        states[Connection.ETHERNET] = 'Ethernet connection';
                                        states[Connection.WIFI] = 'WiFi connection ready!!';
                                        states[Connection.CELL_2G] = 'Cell 2G connection ready!!';
                                        states[Connection.CELL_3G] = 'Cell 3G connection ready!!';
                                        states[Connection.CELL_4G] = 'Cell 4G connection ready!!';
                                        states[Connection.CELL] = 'Cell generic connection ready!!';
                                        states[Connection.NONE] = 'No network connection';

                                        if(states[networkState]== states[Connection.NONE]){
                                             alertify.set({ labels: {
                                                    ok     : "yes",
                                                    cancel : "no"
                                                } });
                                            alertify.confirm("การเชื่อมต่อล้มเหลวเนื่องจากข้องผิดพลาดทางซิร์ฟเวอร์ กรุณาตรวจสัญญาณอินเทอร์เน็ตของท่าน", function (e) {
                                                if (e) {
                                                    navigator.app.exitApp();
                                                } else {
                                                    $.mobile.changePage("#pageone");
                                                }
                                            });
                                        }else if(states[networkState]== states[Connection.UNKNOWN]){
                                             alertify.set({ labels: {
                                                    ok     : "yes",
                                                    cancel : "no"
                                                } });
                                            alertify.confirm("การเชื่อมต่อล้มเหลวเนื่องจากข้องผิดพลาดทางซิร์ฟเวอร์ กรุณาตรวจสัญญาณอินเทอร์เน็ตของท่าน", function (e) {
                                                if (e) {
                                                    navigator.app.exitApp();
                                                } else {
                                                    $.mobile.changePage("#pageone");
                                                }
                                            });
                                        }else{
                                            localStorage.username = result;
                                            document.getElementById("username").value = result;
                                          //  document.getElementById("username").readOnly = true;
                                            /*$.ajax({
                                                        url: localStorage.api_url_server+"NPDataCenterWs/center/company",
                                                        data: '{}',
                                                        contentType: "application/json; charset=utf-8",
                                                        dataType: "json",
                                                        type: "POST",
                                                        cache: false,
                                                        success: function(result){
                                                            console.log(JSON.stringify(result.listData));
                                                                 selected += `<select name="company" style=" width:100%; border:0; padding: 5%; background: #fff center; border-radius: 5px; margin-bottom:5%; margin-top:0%;">`;
                                                                 $.each(result.listData, function(key, val) {
                                                                    selected += `<option value="`+val['code']+`">`+val['name']+`</option>`;
                                                                 });
                                                                 selected += `</select>`;
                                                                 document.getElementById("cmp").innerHTML = selected;
                                                        },
                                                        error: function (err){
                                                            console.log(JSON.stringify(err));
                                                        }
                                                });*/
                                            pass_s_focus();
                                            $('#passwd').focus();
                                            $.mobile.changePage("#pageone");

                                        }
                                        localStorage.enter = null;
}

function cnklogin(){
  //alert(document.getElementById("username").value+","+document.getElementById("passwd").value);
  if(document.getElementById("username").value== "" || document.getElementById("username").value == null){
    localStorage.enter = null;
    document.getElementById("username").focus;
    $('#username').focus();
  }else if(document.getElementById("passwd").value == "" || document.getElementById("passwd").value == null){
    alertify.error("กรุณากรอกข้อมูล Password !!");
    localStorage.enter = null;
    localStorage.enter = "";
  }else{
    login(document.getElementById("username").value,document.getElementById("passwd").value,$('select[name="company1"] :selected').attr('value'));
   //alert($('select[name="company"] :selected').attr('value'));
  }
}


/*function cnkloginscan(){
  //alert(localStorage.username+""+document.getElementById("passwds").value)
  if(document.getElementById("passwds").value == "" || document.getElementById("passwds").value == null){
    alertify.error("กรุณากรอกข้อมูล Password !!");
    $('#passwds').focus();
    localStorage.enter = null;
    return false;
  }else{
    login(localStorage.username,document.getElementById("passwds").value,$('select[name="company2"] :selected').attr('value'));
    //alert($('select[name="company2"] :selected').attr('value'));
  }
}*/


function login(username,pass,cpn){
                            loading();
                            console.log(cpn);
                            var cpn_type="";
                            // np = nopadol, nava = nava
                            if(cpn=="np"){
                                cpn_type = 1;
                                localStorage.profit = "s01";
                                localStorage.branch = "S01";
                               // localStorage.api_url_server = "http://api.nopadol.com:8080/";
                                console.log("http://api.nopadol.com:8080/");
                            }else if(cpn=="nava"){
                                cpn_type = 2;
                                localStorage.profit = "nava";
                            }else if(cpn=="navatest"){
                                cpn_type = 2;
                                localStorage.profit = "navatest";
                            } else if(cpn=="s02"){
                                cpn_type = 1;
                                localStorage.profit = "s02";
                                localStorage.branch = "S02";
                              //  localStorage.api_url_server = "http://npfaham.webhop.info:8080/";
                               // console.log("http://npexpert.webhop.info:8088/");
                            }
                            console.log('{"companyCode":"'+cpn+'","appCode":"NpInventory","saleCode":"'+username+'","password":"'+pass+'"}');
                            $.ajax({
                                       // url: localStorage.api_url_server_nava+localStorage.api_url_login,
                                        url: localStorage.api_url_server+"NPDataCenterWs/center/login",
                                        data: '{"companyCode":"np","appCode":"NpInventory","saleCode":"'+username+'","password":"'+pass+'"}',
                                        contentType: "application/json; charset=utf-8",
                                        dataType: "json",
                                        type: "POST",
                                        cache: false,
                                        success: function(result){
                                        console.log(result);
                                           console.log(JSON.stringify(result.resp.isSuccess));
                                           if(result.resp.isSuccess==1){
                                            var obj = JSON.stringify(result);
                                            //console.log(result.data.MenuPermission);
                                            localStorage.username = result.saleCode;
                                            localStorage.token = result.accessToken;


                                            if(localStorage.username=="56163"){
                                                $("#page_setting").show();
                                            }else{
                                                $("#page_setting").hide();
                                            }
                                           // localStorage.url_menu_tree_user = result.related;
                                            //localStorage.setItem("MenuPermission", JSON.stringify(result.data.MenuPermission));
                                            console.log(JSON.stringify(result.accessToken));

                                            style_page(cpn_type);

                                            //perdata();
                                            tree();

                                            document.getElementById("username").value = "";
                                            document.getElementById("passwd").value = "";
                                          //  document.getElementById("passwds").value = "";
                                            alertify.success("login สำเร็จ");
                                           // localStorage.company = 2;
                                            localStorage.enter = "";
                                            $.mobile.changePage("#pagetwo",{transition: 'slidefade'});
                                            }else{
                                                alertify.error("Username หรือ Password ไม่ถูกต้อง !!");
                                                document.getElementById("passwd").value = "";
                                               // document.getElementById("passwds").value = "";
                                                $('#username').focus();
                                                localStorage.enter = "";
                                                closeload();
                                                return false;

                                            }
                                            },
                                           error: function (error) {
                                               document.getElementById("passwd").value = "";
                                              // document.getElementById("passwds").value = "";
                                              // alertify.error("Username หรือ Password ไม่ถูกต้อง !!");
                                              switch_url();
                                              login(username,pass,cpn);
                                               $('#username').focus();
                                               closeload();
                                               localStorage.enter = "";
                                               return false;
                                            }

                            });
                            /* login nava
                            $.ajax({
                                        url: localStorage.api_url_server_nava+localStorage.api_url_login,
                                       // url: "http://s01xp.dyndns.org/apiv2/MRDB_api.php/users/login",
                                        data: '{"name":"'+username+'","password":"'+pass+'"}',
                                        contentType: "application/json; charset=utf-8",
                                        dataType: "json",
                                        type: "POST",
                                        cache: false,
                                           success: function(result){
                                           //alert(result.links.related);
                                           if(result.status=="success"){
                                            var obj = JSON.stringify(result);
                                            console.log(result.data.MenuPermission);
                                            localStorage.username=result.data.user_name;
                                            localStorage.url_menu_tree_user = result.related;
                                            localStorage.setItem("MenuPermission", JSON.stringify(result.data.MenuPermission));
                                            console.log(JSON.stringify(result.data.user_name));

                                            style_page(cpn);

                                            perdata();
                                            tree();

                                            document.getElementById("username").value = "";
                                            document.getElementById("passwd").value = "";
                                            document.getElementById("passwds").value = "";
                                            alertify.success("login สำเร็จ");
                                           // localStorage.company = 2;
                                            localStorage.enter = "";
                                            $.mobile.changePage("#pagetwo",{transition: 'slidefade'});
                                            }else{
                                            alertify.error("Username หรือ Password ไม่ถูกต้อง !!");
                                            document.getElementById("passwd").value = "";
                                            document.getElementById("passwds").value = "";
                                            $('#username').focus();
                                            localStorage.enter = "";
                                            closeload();
                                            return false;

                                            }
                                            },
                                           error: function (error) {
                                           document.getElementById("passwd").value = "";
                                           document.getElementById("passwds").value = "";
                                           alertify.error("Username หรือ Password ไม่ถูกต้อง !!");
                                           $('#username').focus();
                                           closeload();
                                           localStorage.enter = "";
                                           return false;
                                            }

                            });*/

}
function logout(){
     alertify.set({ labels: {
            ok     : "yes",
            cancel : "no"
        } });
    alertify.confirm("ต้องการ LogOut หรือไม่ !", function (e) {
          if (e) {
          localStorage.removeItem('username');
          localStorage.removeItem('url_menu_tree_user');
          document.getElementById("username").value = "";
          document.getElementById("passwd").value = "";
         // document.getElementById("passwds").value = "";
          style_page();
          $.mobile.changePage("#pageone",{transition: 'slidefade',reverse: true});
          localStorage.enter = "";
          }else{
              localStorage.enter = "";
              return false;
          }
    });

}


function fakelogin(){
localStorage.username = "tom";
$.mobile.changePage("#pagetwo",{transition: 'slidefade'});
localStorage.enter = null;
}
function login_url(){
localStorage.api_url_login = "v1/login";
localStorage.enter = null;
}