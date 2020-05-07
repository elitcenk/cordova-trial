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
    initialize: function () {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },

    // deviceready Event Handler
    // Bind any cordova events here. Common events are:
    // 'pause', 'resume', etc.
    onDeviceReady: function () {
        this.receivedEvent('deviceready');
    },

    // Update DOM on a Received Event
    receivedEvent: function (id) {
        setTimeout(function () {
            navigator.splashscreen.hide();
        }, 2000);
        console.log('Received Event: ' + id);
        // Update DOM on a Received Event

        // check network start
        var networkState = navigator.network.connection.type;
        var states = {};
        states[Connection.UNKNOWN] = 'Unknown connection';
        states[Connection.ETHERNET] = 'Ethernet connection';
        states[Connection.WIFI] = 'WiFi connection';
        states[Connection.CELL_2G] = 'Cell 2G connection';
        states[Connection.CELL_3G] = 'Cell 3G connection';
        states[Connection.CELL_4G] = 'Cell 4G connection';
        states[Connection.NONE] = 'No network connection';
        if (states[networkState] == states[Connection.NONE]) {
            navigator.notification.alert(
                'No Internet Connection! Please Turn on Wifi or Mobile Data to use this application',  // message
                null,         // callback
                'No Internet Connection',            // title
                'Ok'                  // buttonName
            );
            //alert('No Internet Connection! Please Turn on Wifi or Mobile Data to use this application');
        } else {
            var ref = window.open('https://thefeta.com', '_blank', 'location=no,zoom=no');
            ref.addEventListener('loadstart', inAppBrowserbLoadStart);
            ref.addEventListener('loadstop', inAppBrowserbLoadStop);
            ref.addEventListener('loaderror', inAppBrowserbLoadError);
            ref.addEventListener('exit', inAppBrowserbClose);

            function inAppBrowserbLoadStart(event) {
                ////////////////////////////////
                if (document.cookie.indexOf("visited=") >= 0) {
                    // They've been here before.
                } else {
                    // set a new cookie
                    var expiry = new Date();
                    expiry.setTime(expiry.getTime() + (10 * 60 * 1000)); // Ten minutes
                    document.cookie = "visited=yes; expires=" + expiry.toGMTString();
                    navigator.notification.activityStart("", "Loading....");
                }
            }

            function inAppBrowserbLoadStop(event) {
                navigator.splashscreen.hide();
                navigator.notification.activityStop();
            }

            function inAppBrowserbLoadError(event) {
                navigator.notification.activityStop();
            }

            function inAppBrowserbClose(event) {
                ref.removeEventListener('loadstart', inAppBrowserbLoadStart);
                ref.removeEventListener('loadstop', inAppBrowserbLoadStop);
                ref.removeEventListener('loaderror', inAppBrowserbLoadError);
                ref.removeEventListener('exit', inAppBrowserbClose);
                navigator.app.exitApp();
            }
        }
    }
};

app.initialize();
