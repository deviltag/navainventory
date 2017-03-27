
function style_page(company){
        if(company){
            company = company;
        }else{
            company = 3;
        }
        var page = "";
        if(page == ""){
                 page = $.mobile.activePage.attr('id');
        }
        if(company=="1"){
            console.log("company page one");
            localStorage.fontColor = "#24BEE5";
            var cls = document.getElementsByClassName('header');
            var fot = document.getElementsByClassName('ftext');
            for(var i = 0; i < cls.length; i++){
                    document.getElementsByClassName('header')[i].style.backgroundImage = "url('images/LOGO-NOPADOL-white.png')";
                    document.getElementsByClassName('header')[i].style.backgroundRepeat = "no-repeat";
                    document.getElementsByClassName('header')[i].style.borderBottom = "5px solid #fdb813";
                    document.getElementsByClassName('header')[i].style.backgroundColor = "#24BEE5";
            }

            var footer =  document.getElementsByClassName('footer');
            for(var i = 0; i < footer.length; i++){
                document.getElementsByClassName('footer')[i].style.backgroundColor = "#24BEE5";
                document.getElementsByClassName('footer')[i].style.position = "fixed";
                document.getElementsByClassName('footer')[i].style.color = "#fff";
            }

            var x = document.createElement("STYLE");
            var t = document.createTextNode("#footer-nav{background-color:#24BEE5; border:1px solid #24BEE5; color:#fff;}");
            x.appendChild(t);
            document.head.appendChild(x);

            var m = document.createElement("STYLE");
            var r = document.createTextNode(".tree{padding:0%; margin:0; color:#000;} .tree a{color:#000;}");
            m.appendChild(r);
            document.head.appendChild(m);

            var navr = document.createElement("STYLE");
            var navm = document.createTextNode("nav a:hover{border-left: solid 5px #24BEE5; font-weight: 900; padding-left: 15px; text-transform: uppercase; text-decoration:none; color:#24BEE5;}");
            navr.appendChild(navm);
            document.head.appendChild(navr);

            var s = document.createElement("STYLE");
            var a = document.createTextNode(".row b{color:#24BEE5}");
            s.appendChild(a);
            document.head.appendChild(s);

            var s = document.createElement("STYLE");
            var a = document.createTextNode(".row b{color:#24BEE5}");
            s.appendChild(a);
            document.head.appendChild(s);

            var b = document.createElement("STYLE");
            var c = document.createTextNode("#shelves1 h3,h4,h2{color:#24BEE5}");
            b.appendChild(c);
            document.head.appendChild(b);

            for(var i = 0; i < fot.length; i++){
                fot[i].innerHTML = "<i style='color:#fff;'>NOPADOL Inventory V0.2  BY IT nopadol</i>";
            }

        }else if(company=="2"){
            console.log("company page two");
            localStorage.fontColor = "#7ccb1c";
            var cls = document.getElementsByClassName('header');
            var fot = document.getElementsByClassName('ftext');
                 for(var i = 0; i < cls.length; i++){
                      document.getElementsByClassName('header')[i].style.backgroundImage = "url('images/navavending_logo.png')";
                      document.getElementsByClassName('header')[i].style.backgroundRepeat = "no-repeat";
                      document.getElementsByClassName('header')[i].style.borderBottom = "5px solid #7ccb1c";
                 }
                  var footer =  document.getElementsByClassName('footer');
                  for(var i = 0; i < footer.length; i++){
                      document.getElementsByClassName('footer')[i].style.backgroundColor = "#7ccb1c";
                      document.getElementsByClassName('footer')[i].style.position = "fixed";
                      document.getElementsByClassName('footer')[i].style.color = "#fff";
                  }
                  var main =  document.getElementsByClassName('col-xs-6');
                  for(var i = 0; i < main.length; i++){
                      //document.getElementsByClassName('main_menu')[i].style.backgroundColor = "#7ccb1c";
                      document.getElementsByClassName('col-xs-6')[i].style.color = "#7ccb1c";
                  }

                 for(var i = 0; i < fot.length; i++){
                      fot[i].innerHTML = "<i style='color:#fff;'>NAVA Inventory V0.2  BY IT nopadol</i>";
                 }

                    var x = document.createElement("STYLE");
                    var t = document.createTextNode("#footer-nav{background-color:#7ccb1c; border:1px solid #7ccb1c; color:#fff;}");
                    x.appendChild(t);
                    document.head.appendChild(x);

                    var s = document.createElement("STYLE");
                    var a = document.createTextNode(".row b{color:#7ccb1c}");
                    s.appendChild(a);
                    document.head.appendChild(s);

                    var m = document.createElement("STYLE");
                    var r = document.createTextNode(".tree{padding:0%; margin:0; color:#000;} .tree a{color:#000;}");
                    m.appendChild(r);
                    document.head.appendChild(m);

                    var navr = document.createElement("STYLE");
                    var navm = document.createTextNode("nav a:hover{border-left: solid 5px #7ccb1c; font-weight: 900; padding-left: 15px; text-transform: uppercase; text-decoration:none; color:#7ccb1c;}");
                    navr.appendChild(navm);
                    document.head.appendChild(navr);


                    var b = document.createElement("STYLE");
                    var c = document.createTextNode("#shelves1 h3,h4,h2{color:#7ccb1c}");
                    b.appendChild(c);
                    document.head.appendChild(b);

        }else{
                 var cls = document.getElementsByClassName('header');
                 for(var i = 0; i < cls.length; i++){
                       document.getElementsByClassName('header')[i].style.backgroundImage = "url('images/LOGO-NOPADOL-white.png')";
                       document.getElementsByClassName('header')[i].style.backgroundRepeat = "no-repeat";
                       document.getElementsByClassName('header')[i].style.borderBottom = "5px solid #fdb813";
                       document.getElementsByClassName('header')[i].style.backgroundColor = "#24BEE5";
                 }
                 var form = document.getElementsByClassName('feedback-input');
                 for(var i = 0; i < form.length; i++){
                      form[i].style.color = "#24BEE5";
                 }
                 var bt = document.getElementsByClassName('button-green');
                 for(var i = 0; i < bt.length; i++){
                      bt[i].style.backgroundColor = "#24BEE5";
                 }


        }
    }