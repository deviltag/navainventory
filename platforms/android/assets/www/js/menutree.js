  $.ajax({
              url: localStorage.api_url_server_nava+"v1/menus",
              //data: '{"userID":"'+login.username.value+'","pwd":"'+login.pwd.value+'"}',
              //contentType: "application/json; charset=utf-8",
              //dataType: "json",
              type: "GET",
              cache: false,
              success: function(result){
                     var mytree =
                          result
                     ;
                     $('.tree').treeview({
                     color: "#428bca",
                     levels: 1,
                     expandIcon: 'glyphicon glyphicon-plus',
                     collapseIcon: 'glyphicon glyphicon-minus',
                     nodeIcon: 'glyphicon glyphicon-bookmark',
                     enableLinks: true,
                     data: mytree}
                     );
              }
     });