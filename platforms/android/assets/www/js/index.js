/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');
       // loading();
          var selected1 = "";
        // var selected2 = "";
            $.ajax({
                    url: "http://api.nopadol.com:8080/NPDataCenterWs/center/company",
                    data: '{}',
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    type: "POST",
                    cache: false,
                    success: function(result){
                        console.log(JSON.stringify(result.listData));
                             selected1 += `<select name="company1" class="bt-cmp" style="width:100%; height:50px;" data-role="none">`;
                            // selected2 += `<select name="company2" class="bt-cmp" style="width:100%; height:50px;" data-role="none">`;
                             $.each(result.listData, function(key, val) {
                                var n = val['code'].includes("nava");
                                if(n!=true){
                                    selected1 += `<option value="`+val['code']+`">`+val['name']+`</option>`;
                                }

                               // selected2 += `<option value="`+val['code']+`">`+val['name']+`</option>`;
                             });
                             selected1 += `</select>`;
                            // selected2 += `</select>`;
                             document.getElementById("cmp1").innerHTML = selected1;
                            // document.getElementById("cmp2").innerHTML = selected2;
                           //  $load.popup("close");
                    },
                    error: function (err){
                        console.log(JSON.stringify(err));
                        alertify.alert("การเชื่อมต่อฐานข้อมูลมีปัญหา กรุณาตรวจสอบการเชื่อมต่ออินเตอร์เน็ตของท่าน");
                      //  $load.popup("close");
                    }
            });

        console.log('Received Event: ' + id);
        style_page();
    }
};

function switch_url(){
    switch (localStorage.api_url_server){
        case "http://api.nopadol.com:8080/" :
            localStorage.api_url_server = "http://npfaham.webhop.info:8080/";
            break;
        case "http://npfaham.webhop.info:8080/" :
            localStorage.api_url_server = "http://api.nopadol.com:8080/";
            break;
    }
    var api =  document.getElementsByClassName('api_server');
        for(var i = 0; i < api.length; i++){
            api[i].innerHTML = localStorage.api_url_server;
        }
    console.log("Now!! api name "+localStorage.api_url_server);
}