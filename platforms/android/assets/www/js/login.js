function cnklogin(){
  //alert(document.getElementById("username").value+","+document.getElementById("passwd").value);
  if(document.getElementById("username").value== "" || document.getElementById("username").value == null){
    document.getElementById("username").focus;
    $('#username').focus();
  }else if(document.getElementById("passwd").value == "" || document.getElementById("passwd").value == null){
    alertify.error("กรุณากรอกข้อมูล Password !!");
    $('#passwd').focus();
  }else{
    login(document.getElementById("username").value,document.getElementById("passwd").value,$('select[name="company"] :selected').attr('value'));
   //alert($('select[name="company"] :selected').attr('value'));
  }
}


function cnkloginscan(){
  //alert(localStorage.username+""+document.getElementById("passwds").value)
  if(document.getElementById("passwds").value == "" || document.getElementById("passwds").value == null){
    alertify.error("กรุณากรอกข้อมูล Password !!");
    $('#passwds').focus();
    return false;
  }else{
    login(localStorage.username,document.getElementById("passwds").value,$('select[name="company"] :selected').attr('value'));
   // alert($('select[name="company"] :selected').attr('value'));
  }
}


function login(username,pass,cpn){
                            loading();
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
                                            console.log(result.data.Permission);
                                            localStorage.username=result.data.user_name;
                                            localStorage.url_menu_tree_user = result.related;
                                            localStorage.setItem("permission", JSON.stringify(result.data.Permission));
                                            console.log(JSON.stringify(result.data.user_name));

                                            style_page(cpn);

                                            perdata();
                                            tree();

                                            document.getElementById("username").value = "";
                                            document.getElementById("passwd").value = "";
                                            document.getElementById("passwds").value = "";
                                            alertify.success("login สำเร็จ");
                                           // localStorage.company = 2;

                                            $.mobile.changePage("#pagetwo",{transition: 'slidefade'});
                                            }else{
                                            alertify.error("Username หรือ Password ไม่ถูกต้อง !!");
                                            document.getElementById("passwd").value = "";
                                            document.getElementById("passwds").value = "";
                                            $('#username').focus();
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
                                           return false;
                                            }

     });

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
          document.getElementById("passwds").value = "";
          style_page();
          $.mobile.changePage("#pageone",{transition: 'slidefade',reverse: true});

          }else{
              return false;
          }
    });

}


function fakelogin(){
localStorage.username = "tom";
$.mobile.changePage("#pagetwo",{transition: 'slidefade'});
}
function login_url(){
localStorage.api_url_login = "v1/login";
}