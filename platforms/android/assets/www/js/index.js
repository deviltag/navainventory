
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

        console.log('Received Event: ' + id);

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
                    alertify.confirm("การเชื่อมต่อล้มเหลวเนื่องจากข้องผิดพลาดทางซิร์ฟเวอร์ กรุณาตรวจสัญญาณอินเทอร์เน็ตของท่าน", function (e) {
                        if (e) {
                            navigator.app.exitApp();
                        } else {
                            $.mobile.changePage("#pageone");
                        }
                    });
                }else if(states[networkState]== states[Connection.UNKNOWN]){
                    alertify.confirm("การเชื่อมต่อล้มเหลวเนื่องจากข้องผิดพลาดทางซิร์ฟเวอร์ กรุณาตรวจสัญญาณอินเทอร์เน็ตของท่าน", function (e) {
                        if (e) {
                            navigator.app.exitApp();
                        } else {
                            $.mobile.changePage("#pageone");
                        }
                    });
                }else{
                alertify.success(states[networkState]);
                }

        //window.addEventListener("native.onscanbarcode",function(e){
        //alert(e.scanResult);

        //document.getElementById("username").value=e.scanResult;


        //})
    }

};
