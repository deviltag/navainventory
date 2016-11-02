document.addEventListener("keydown", function(event) {
        console.log(event.keyCode);
        var page="";
        page = $.mobile.activePage.attr('id');
        console.log(page);

            if(page=="countstock"){
                switch (event.keyCode){
                    case 0 :
                            console.log("plusitem");
                            $.mobile.changePage("#shelves",{transition: 'slidefade'});
                            break;
                    case 13 :
                            savedata();
                            console.log("update IS");
                            break;
                }
            }else if(page=="countitem"){

                switch(event.keyCode){
                    case 13 :
                            console.log("insert IS item");
                            savestock();
                            break;
                    case 0 :
                            $("#scanitem").click();
                            break;
                }
            }else if(page=="stock"){
                switch(event.keyCode){
                    case 0 :
                            $("#scanwh").click();
                            break;
                }
            }else if(page=="shelves"){
                switch(event.keyCode){
                    case 0 :
                            $("#scansh").click();
                            break;
                }
            }

});

    document.addEventListener("backbutton", function(pr){
        var page="";
        page = $.mobile.activePage.attr('id');
        console.log(page);
                    if(page=="countstock"){
                         c_s();
                    }
    }, false);

