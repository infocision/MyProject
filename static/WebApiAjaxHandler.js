//var apiSn = "http://localhost:14829/";
//var apiSn="http://192.168.0.114:1414/";
//var apiSn = "http://124.153.111.201:1313
//var apiSn = "https://hdreportsdevapi.hidoctor.me/"
var apiSn = "https://hdreportsprodapi.hidoctor.me/";
//var apiSn = "http://hdreportsqaqpi.hidoctor.me:1313/";
var HDWebApiAjax = {
    requestInvoke: function (ctn, actn, parms, method, successcallback, failurecallback, successCallbackExtraparams, type) {
        var datapara = "";
        if (parms != null) {
            for (var j = 0; j < parms.length; j++) {
                var value = parms[j].value;
                if (parms[j].type == "JSON") {
                    value = JSON.stringify(value);
                }

                if (j == 0) {
                    datapara = parms[j].name + "=" + value;
                }
                else {
                    datapara += "&" + parms[j].name + "=" + value;
                }
            }
        }
        var aurl = apiSn + ctn + "/" + actn;

        var start_time = new Date().getTime();
        if (type == "JSON") {
            $.ajax({
                type: method,
                url: aurl,
                data: parms[0].value,
                dataType: 'json',
                //async: false,
                cache: false,
                success: function (response) {
                    var request_time = new Date().getTime() - start_time;
                    $("#servertimer").html(request_time);
                    successcallback(response, successCallbackExtraparams);
                },
                complete: function (e, t, n) {
                   
                    //$("#spnintimate").html("Binding");
                },
                error: function (e) {
                    failurecallback(e);
                }
            });
        }
        else {
            $.ajax({
                type: method,
                url: aurl,
                data: datapara,

                //async: false,
                cache: false,
                success: function (response) {
                    var request_time = new Date().getTime() - start_time;
                    $("#servertimer").html(request_time);
                    successcallback(response, successCallbackExtraparams);
                },
                complete: function (e, t, n) {                   

                },
                error: function (e) {
                    failurecallback(e);
                }
            });
        }
    }
}
