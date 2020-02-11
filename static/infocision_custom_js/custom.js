<!--fairshare <script src="./Dashboard-milindmalshe_files/TopBannerWithMenu.js"></script> -->
<!-- fairshare 
<script type="text/javascript">
    var PuserCode= 'USC00001282';
    var PregionCode='REC00000728';
    var PuserTypeCode='UTC00000008';
    var regionCode="";
    var userTypeCode ="";
    var userCode="";
    var companyCode="";
    var Employee_Number="";
    $(document).ready(function () {
        debugger;
        var userName = "";
        var userTypeName = "";
        var SubDomain="";

        try{

            userName="venkat33333";
            userTypeName="ABM";
            SubDomain="shield.hidoctor.me";
            userCode="USC00001282";
            userTypeCode = "UTC00000008";
            regionCode="REC00000728";
            companyCode="COM00000002";
            Employee_Number="333333";
            var d = new Date();
            var TodayDate =d.getDate()+"."+(d.getMonth()+1) +"."+ d.getFullYear();
            var id =1; 
            $('#hdnUserCode').val(userCode);
            $('#dvLogin').html("Welcome "+ userName +"("+userTypeName+"),"+TodayDate);
            $("#imglogo").attr("src","/Content/companylogo/"+SubDomain+".jpg");

        }
        catch(err)
        {

        }
        $.ajax({
            type: "GET",
            url: '../../SQLReports/GetUserDashboardValue',
            data: "Company_Code="+ companyCode+ "&User_Type_Code="+userTypeCode,
            async:true,
            success: function (result) {
                debugger;
                id = result;
            },
            error :function(result)
            {
                id = 1;
            }
        });

        $("#Dashboardv2").unbind("click").bind("click",function navigateDashboard(){window.location.href="../../DashboardV2/DashboardMenuBar/" + id })
        //Report Menus
        fnBindNewReportMenu();
        fnAdHOCReports();
        fnBindExcelApiMenu();
        fntranscation();
        fnReviewReport();
        fngetToppowertree();
        $.ajax({
            type: "GET",
            url: '../../SQLReports/GetUserDetails',
            data: "UserCode="+$('#hdnUserCode').val(),
            async:true,
            success: function (result) {
                debugger;
                if(result!=null && result.length>0)
                {
                    if($('#hdnUserCode').val()== result[0].Under_User_Code)
                    {
                        $("#Settings").css("display","block");
                        fnBindSettings();
                    }
                }
            },
            error :function(result)
            {
                //alert('error');
            }
        });

    });

    function fnLogout()
    {
        $.ajax({
            type:'POST',
            url:'../Login/Logout',
            success: function (response) {
            }
        });
    }
    /// ************* Power Tree ************* ///
    var PTJson='';
    function fngetToppowertree() {
        debugger;
        $.ajax({
            async: false,
            type: "GET",
            url: '../../DashBoardV2/fngethierarchyvalue',
            data:'CompanyCode='+companyCode+'&User_Code='+userCode,
            success: function (json) {

                if (json.length == 0) {
                    $('#powertreelink').html('');
                }
                else
                {
                    PTJson=json;
                    $("#idpowertree").show();
                    $("#idpowertree").css('display','block');
                     // $('#idpowertree').html('<h2 style="text-align:right;color: blue;text-decoration: underline;cursor: pointer;font-size: 14px !important;" onclick="fnopen()">Click Here For OBO User</h2>');
                    fnTopTreeBootBox();
                }
            },
            error: function () {

            }

        })
    }
    function fnTopDpower() {
        var Regioncode,UserCode,UserTypeCode;
        if(Region.length==0)
        {
            Regioncode=regionCode;
        }
        else
        {
            Regioncode=$('#PRegionDrop').val()==''  ? regionCode:$("#PRegionDrop").val();
        }
        if(User.length==0)
        {
            UserCode=userCode;
            UserTypeCode=userTypeCode;
        }
        else
        {

            UserCode= $("#PUserDrop").val().split('_')[0]=='' ? userCode: $("#PUserDrop").val().split('_')[0];
            UserTypeCode= $("#PUserDrop").val().split('_')[1]=='' ? userCode: $("#PUserDrop").val().split('_')[1];
        }
        fnSetSessionTopValue(companyCode,UserCode,Regioncode,UserTypeCode);

    }
    var Region,User;
    function fnTopTreeBootBox() {
        debugger;
        Region= $.grep(PTJson, function (v) {
            return v.Type_Name == 'Region';
        })
        User=$.grep(PTJson, function (v) {
            return v.Type_Name == 'User';
        })
        debugger;
        var content = '';
        if(Region.length !=0)
        {
            content += '<div class="col-lg-6"><form>';
            content += '<h4>Region</h4>';
            content += '<select id="PRegionDrop" class="form-control")">';
            content += '<option value=' + regionCode + '>Self</option>';
            for (var i = 0; i < Region.length; i++) {

                content += '<option value=' + Region[i].Tree_Code + '>' + Region[i].Tree_Name + '</option>';
            }
            content += '</select>';
            content += '</form></div>';
        }
        if(User.length !=0)
        {
            content += '<div class="col-lg-6"><form>';
            content += '<h4>User</h4>';
            content += '<select id="PUserDrop" class="form-control")">';
            content += '<option value=' + userCode +'_' +userTypeCode+ '>Self</option>';
            for (var j = 0; j < User.length; j++) {

                content += '<option value=' + User[j].Tree_Code +'_' + User[j].User_Type_Code+ '>' + User[j].Tree_Name + '</option>';
            }
            content += '</select>';
            content += '</form></div>';
        }
        $('#TablePD').html(content);
        $('#PRegionDrop').val(PregionCode);
        $('#PUserDrop').val(PuserCode+'_'+PuserTypeCode);

    }
    function fnTopopen()
    {
        $("#DashboardPTree").modal({
            backdrop: 'static',
            keyboard: false
        });
    }
    function fnSetSessionTopValue(companyCode,userCode,regionCode,UserTypeCode)
    {
        $.ajax({
            type: "GET",
            async: false,
            url: '../../DashBoardV2/GetSetSessionValue',
            data:'CompanyCode='+companyCode+'&User_Code='+userCode+'&Region_Code='+regionCode+'&UserTypeCode='+UserTypeCode,
            success: function (json) {
                location.reload();
            },
            error:function()
            {

            }
        });
    }
    function fngrouplogin()
    {
        var id=Employee_Number;
        window.location.href = "../ManagerDashboard/" + id;
    }
</script> -->



<script type="text/javascript">
    var Month_category="";
    var Year_category="";
    var doctor_caption="Doctor";
    var FM="";
    var PM="";
    var CompanyCode="";
    var RegionCode="";
    var UserCode="";
    var categoryMonth="";
    var categoryYear="";
    var categoryDivision="";
    var categoryRegion_Name="";
    var category_Mode="";
    var camp_name   ="";
    var UserTypeCode="";
    var ChildCount=0;
    var ReportName = "";
    $(document).ready(function () {
        //$('.cls-notification').empty();
        AjaxGlobalHandler.Initiate();
        // $("#notifyhide").hide
        $("#dvAjaxLoad").hide();
        $('#page-header').hide();
        $('#main').css('margin',"0px !important");
        if($('#DrCallUser').prop('checked')) {
            $('#fieldDaysCount').css("display","none");
        }
        debugger;
        AdminDashboard.defaults.Current_Date="2020-01-14";
        AdminDashboard.defaults.Previous_Date="2020-01-13";
        AdminDashboard.defaults.Next_Date="2020-01-15";
        ReportName = $('#normsCvgelabel').text();
        var cur = "1-2020";
        var pre = "12-2019";
        var next ="2-2020";
        var IsBack=null;
        Month_category=1;
        Year_category=2020;
        AdminDashboard.defaults.Current_Month=cur.split('-')[0];
        AdminDashboard.defaults.Previous_Month=pre.split('-')[0];
        AdminDashboard.defaults.Next_Month=next.split('-')[0];
        AdminDashboard.defaults.Child_User_Count=null
        AdminDashboard.defaults.Current_Year=cur.split('-')[1];
        AdminDashboard.defaults.Previous_Year=pre.split('-')[1];
        AdminDashboard.defaults.Next_Year=next.split('-')[1];
        AdminDashboard.defaults.Day_After_Tomorrow = "2020-01-16";
        // doctor_caption=null;
        CompanyCode="COM00000002";
        RegionCode="REC00000728";
        UserCode="USC00001282";
        UserTypeCode="UTC00000008";
        ChildCount=3;
        $("#hdnCurRegionCode").val(RegionCode);
        $("#hdnCurUserCode").val(UserCode);
        $("#DrCaption").html(doctor_caption + " Coverage");
        setTimeout(function () { AdminDashboard.initialize(1); }, 50);
        if(IsBack !="YES" || IsBack == null){
            debugger;
            $("#notifyhides").show();
            $("#notifyhide").show();
        }
        else {
            $("#notifyhide").hide();
            $(".dash-title").html('');
            $(".cls-notification ").css('height','0px');
        }
        var trigger = $('.hamburger'),
           overlay = $('.overlay'),
          isClosed = true;
        overlay.show();
        trigger.removeClass('is-closed');
        trigger.addClass('is-open');
        $('#wrapper').toggleClass('toggled');
        $('#hdnSpecWiseCovgRgnCount').val($('#DrCoverageRgnCount').val());

    });
    //$('#CallAverageRgnCount').focus(function(){
    //    $('#CallAverageRgnCount').blur();
    //});
    //$('#NormsCoverageRgnCount').focus(function(){
    //    $('#NormsCoverageRgnCount').blur();
    //});
    //$('#SpecWiseCovgRgnCount').focus(function(){
    //    $('#SpecWiseCovgRgnCount').blur();
    //});
    //$('#DrCompCoverageRgnCount').focus(function(){
    //    $('#DrCompCoverageRgnCount').blur();
    //});
    //$('#DrCoverageRgnCount').focus(function(){
    //    $('#DrCoverageRgnCount').blur();
    //});
    //$('#DrMissedRgnCount').focus(function(){
    //    $('#DrMissedRgnCount').blur();
    //});
</script>

<link href="./Dashboard-milindmalshe_files/Dashboard.css" rel="stylesheet">
<script src="https://code.jquery.com/jquery-migrate-1.3.0.js"></script>
<script>
    debugger;
    var PuserCode= 'USC00001282';
    var PregionCode='REC00000728';
    var PuserTypeCode='UTC00000008';
    var Group_Login='';
    var companyCode="COM00000002";
    var regionCode="REC00000728";
    var userCode="USC00001282";
    var userTypeCode = "UTC00000008";
    var id=1;
    var showTracking = 0;
    var ShowEdetailing = [];

    if(!jQuery.browser.chrome){
        swal('Certain JavaScript Functionalities are not supported by other than chrome browser. Hence for better Experience use Google Chrome .','','info');
    }
    $(document).ready(function () {
        debugger;
        var dashresponse='';
        $("#idpowertree").css("display","block");    
        if(Group_Login==1)
        {
            $('#GroupBackButton').css('display','block');
        }
        $.ajax({
            async:false,
            url:'../../DashBoardV2/GetPrivilegeForCurrentUserType',
            method:'GET',
            success: function(response) {
                debugger;
                dashresponse=response;
                if(response.length>0){
                    $('#dashboardNew').html('');
                    for(var i=0;i<response.length;i++) {
                        if(response[i].Privilege_Code == "PRC000000") { //activity privilege
                            $('#menuLinkfour').show();
                        }
                        if(response[i].Privilege_Code == "PRC000001") { // sales privilege
                            $('#menuLinkOne').show();
                        }
                        if(response[i].Privilege_Code == "PRC000002") { // compliance privilege
                            $('#menuLinkfive').show();
                        }
                        if(response[i].Privilege_Code == "PRC000003") { //misc privilege
                            $('#menuLinktwo').show();
                        }
                        if(response[i].Privilege_Code == "PRC000005") { //edetailing privilege
                            $('#menuLinknine').show();
                        }
                        if(response[i].Privilege_Code == "PRC000006") { //campaign privilege
                            $('#menuLinkSix').show();
                        }
                        if(response[i].Privilege_Code == "PRC000004") { // Tracking
                            $('#menuLinkseven').show();
                        }
                        if(response[i].Privilege_Code == "PRC000007") { // Shield
                            $('#menuLinkTen').show();
                        }
                        if(response[i].Privilege_Code == "PRC000008") { // Wallace
                            $('#menuLinkeleven').show();
                            
                        }
                    }
                }
                else
                {
                    var cont ='<img src="/Content/images/Dash1.png" style="position: absolute;opacity: 0.5;height: 972px; width: 100%;"/>';
                    cont +='<h1 style="text-align: center;-ms-transform: rotate(20deg);color: black;margin-top: 24%;font-weight: 700;">Dashboard is not yet configured!!!</h1>'
                    $('#dashboardNew').html(cont); 
                    $('.hamburger').hide();
                 
                }
          
            },
            error: function() {}
        });
       
        if(dashresponse.length > 0)
        {
            debugger;
            if(id == 1)
            {
                $('#dashboardNew').load('../../Dashboard/AdminDashBoard');
            }
            else if(id == 2)
            {
                $('#dashboardNew').load('../../Dashboard/DashboardCampaign');
            }
            else if(id==3)
            {
                $('#dashboardNew').load('../../DashboardV2/DashBoardV2');
            }
            else if(id == 7){
                $('#dashboardNew').load('../../Dashboard/ShieldDashboard?IsSync=0');
            }
            else if (id==9){
            
                $('#dashboardNew').load('../../Dashboard/CrossFunctionalDashboard');
                var trigger = $('.hamburger');
                var  overlay = $('.overlay');
                $('#dashboardNew').html();
                overlay.hide();
                trigger.removeClass('is-open');
                trigger.addClass('is-closed');
                isClosed = false;
                $('#wrapper').toggleClass('toggled');
                removeLinkActive();
                $("#menuLinkeight").addClass('active');
            }
            else {
                $('#dashboardNew').load('../../DashboardV2/DashBoardCompliance');
            }
        
        }
        var trigger = $('.hamburger'),
           overlay = $('.overlay'),
          isClosed = true;
        trigger.click(function () {
            hamburger_cross();
        });

        function hamburger_cross() {

            if (isClosed == true) {
                debugger;
                overlay.hide();
                trigger.removeClass('is-open');
                trigger.addClass('is-closed');
                isClosed = false;
                $('.panel.box_height.cls-common-head label').css("font-size","14px");
                $('.panel.cls-cat-cov-main.cls-common-head label').css("font-size","14px");
                //$('#divGrid').css("width","592px");
            }
            else {
                debugger;
                overlay.show();
                trigger.removeClass('is-closed');
                trigger.addClass('is-open');
                isClosed = true;
                $('.panel.box_height.cls-common-head label').css("font-size","11px");
                $('.panel.cls-cat-cov-main.cls-common-head label').css("font-size","12px");
                //$('#divGrid').css("width","525px");
                $('#ddlDrMissed').css("width","126px");
                $('#misseddivision').css("margin-right", "0px");
            }
        }

        $('[data-toggle="offcanvas"]').click(function () {
            debugger;
            $('#wrapper').toggleClass('toggled');
        });
        $('#sales').click(function () {
            debugger;
            overlay.hide();
            trigger.removeClass('is-open');
            trigger.addClass('is-closed');
            isClosed = false;
            $('#wrapper').toggleClass('toggled');
            removeLinkActive();
            $("#menuLinkOne").addClass('active');
            $('#dashboardNew').load('../../DashboardV2/DashBoardV2');
        });
        $('#single').click(function () {
            debugger;
            $('#dashboardNew').html();
            overlay.hide();
            trigger.removeClass('is-open');
            trigger.addClass('is-closed');
            isClosed = false;
            $('#wrapper').toggleClass('toggled');
            removeLinkActive();
            $("#menuLinktwo").addClass('active');
            $('#dashboardNew').load('../../DashboardV2/Index');
        });
        //$('#group').click(function () {
        //    debugger;
        //    overlay.hide();
        //    trigger.removeClass('is-open');
        //    trigger.addClass('is-closed');
        //    isClosed = false;
        //    $('#wrapper').toggleClass('toggled');
        //    $('#dashboardNew').load('OzoneDashBoard');
        //});
        $('#admin').click(function () {
            debugger;
            overlay.hide();
            trigger.removeClass('is-open');
            trigger.addClass('is-closed');
            isClosed = false;
            $('#wrapper').toggleClass('toggled');
            removeLinkActive();
            $("#menuLinkfour").addClass('active');
            $('#dashboardNew').load('../../Dashboard/AdminDashBoard');
        });
        $('#compliance').click(function(){
            debugger;

            overlay.hide();
            trigger.removeClass('is-open');
            trigger.addClass('is-closed');
            isClosed = false;
            $('#wrapper').toggleClass('toggled');
            removeLinkActive();
            $("#menuLinkfive").addClass('active');
            $('#dashboardNew').load('../../DashboardV2/DashBoardCompliance');
        });
        //$('#info').click(function(){
        //    overlay.hide();
        //    trigger.removeClass('is-open');
        //    trigger.addClass('is-closed');
        //    isClosed = false;
        //    $('#wrapper').toggleClass('toggled');
        //    removeLinkActive();
        //    $('#dashboardNew').load('../../Dashboard/UserDashBoard');
        //});
        $('#Campaign').click(function(){
            overlay.hide();
            trigger.removeClass('is-open');
            trigger.addClass('is-closed');
            isClosed = false;
            $('#wrapper').toggleClass('toggled');
            removeLinkActive();
            $("#menuLinkSix").addClass('active');
            $('#dashboardNew').load('../../Dashboard/DashboardCampaign');
        });
        $('#edetailing').click(function(){
            overlay.hide();
            trigger.removeClass('is-open');
            trigger.addClass('is-closed');
            isClosed = false;
            $('#wrapper').toggleClass('toggled');
            removeLinkActive();
            $("#menuLinknine").addClass('active');
            $('#dashboardNew').load('../../Dashboard/DashboardEDetailing?IsSync=0');
        });
        $('#ShieldDashboard').click(function(){
            overlay.hide();
            trigger.removeClass('is-open');
            trigger.addClass('is-closed');
            isClosed = false;
            $('#wrapper').toggleClass('toggled');
            removeLinkActive();
            $("#menuLinkTen").addClass('active');
            $('#dashboardNew').load('../../Dashboard/ShieldDashboard?IsSync=0');
        });

        $('#Tracking').click(function () {
            debugger;
            $('#dashboardNew').html();
            overlay.hide();
            trigger.removeClass('is-open');
            trigger.addClass('is-closed');
            isClosed = false;
            $('#wrapper').toggleClass('toggled');
            removeLinkActive();
            $("#menuLinkseven").addClass('active');
            $('#dashboardNew').load('../../DashboardV2/TrackingNew');
        });
        $('#Synfusion').click(function()
        {
            $('#dashboardNew').html();
            overlay.hide();
            trigger.removeClass('is-open');
            trigger.addClass('is-closed');
            isClosed = false;
            $('#wrapper').toggleClass('toggled');
            removeLinkActive();
            $("#menuLinkeight").addClass('active');
            $('#dashboardNew').load('../../Dashboard/AdminDashboardSyn');
        });
        $('#WallaceDashboard').click(function()
        {
            $('#dashboardNew').html();
            overlay.hide();
            trigger.removeClass('is-open');
            trigger.addClass('is-closed');
            isClosed = false;
            $('#wrapper').toggleClass('toggled');
            removeLinkActive();
            $("#menuLinkeight").addClass('active');
            $('#dashboardNew').load('../../Dashboard/CrossFunctionalDashboard');
        });

    });

    function removeLinkActive()
    {
        $("#menuLinkOne").removeClass('active');
        $("#menuLinktwo").removeClass('active');
        $("#menuLinkthree").removeClass('active');
        $("#menuLinkfour").removeClass('active');
        $("#menuLinkfive").removeClass('active');
        $("#menuLinkSix").removeClass('active');
        $("#menuLinkseven").removeClass('active');
        $("#menuLinknine").removeClass('active');
        $("#menuLinkTen").removeClass('active');
        $("#menuLinkeleven").removeClass('active');
    }
    ///************* Power Tree ************* ///
    //var PTJson='';
    //function fngetUserpowertree() {
    //    debugger;
    //    $.ajax({
    //        async: false,
    //        type: "GET",
    //        url: '../../DashBoardV2/fngethierarchyvalue',
    //        data:'CompanyCode='+companyCode+'&User_Code='+userCode,
    //        success: function (json) {

    //            if (json.lenght != 0) {
    //                PTJson=json;
    //                $('#powertree').html('<h2 style="text-align:right;color: blue;text-decoration: underline;cursor: pointer;font-size: 14px !important;" onclick="fnopen()">Click Here For OBO User</h2>');
    //                fnUserTreeBootBox();
    //            }
    //        },
    //        error: function () {

    //        }

    //    })
    //}
    //function fnDpower() {
    //    var Regioncode,UserCode,UserTypeCode;
    //    if(Region.length==0)
    //    {
    //        Regioncode=regionCode;
    //    }
    //    else
    //    {
    //        Regioncode=$('#PRegionDrop').val()==''  ? regionCode:$("#PRegionDrop").val();
    //    }
    //    if(User.length==0)
    //    {
    //        UserCode=userCode;
    //        UserTypeCode=userTypeCode;
    //    }
    //    else
    //    {

    //        UserCode= $("#PUserDrop").val().split('_')[0]=='' ? userCode: $("#PUserDrop").val().split('_')[0];
    //        UserTypeCode= $("#PUserDrop").val().split('_')[1]=='' ? userCode: $("#PUserDrop").val().split('_')[1];
    //    }
    //    fnSetSessionValue(companyCode,UserCode,Regioncode,UserTypeCode);
    //    $('.overlay').hide();
    //    $('.hamburger').removeClass('is-open');
    //    $('.hamburger').addClass('is-closed');
    //    isClosed = false;
    //    $('#wrapper').toggleClass('toggled');
    //    removeLinkActive();
    //    $("#menuLinkfour").addClass('active');
    //    $('#dashboardNew').load('../../Dashboard/AdminDashBoard');

    //}
    //var Region,User;
    //function fnUserTreeBootBox() {
    //    debugger;
    //     Region= $.grep(PTJson, function (v) {
    //        return v.Type_Name == 'Region';
    //    })
    //      User=$.grep(PTJson, function (v) {
    //        return v.Type_Name == 'User';
    //    })
    //                    debugger;
    //                    var content = '';
    //                    if(Region.length !=0)
    //                    {
    //                        content += '<div class="col-lg-6"><form>';
    //                        content += '<h4>Region</h4>';
    //                        content += '<select id="PRegionDrop" style=" width: 130px;height: 34px;" class="form-control")">';
    //                        content += '<option value=' + regionCode + '>Self</option>';
    //                        for (var i = 0; i < Region.length; i++) {

    //                            content += '<option value=' + Region[i].Tree_Code + '>' + Region[i].Tree_Name + '</option>';
    //                        }
    //                        content += '</select>';
    //                        content += '</form></div>';
    //                    }
    //                    if(User.length !=0)
    //                    {
    //                        content += '<div class="col-lg-6"><form>';
    //                        content += '<h4>User</h4>';
    //                        content += '<select id="PUserDrop" style=" width: 130px;height: 34px;" class="form-control")">';
    //                        content += '<option value=' + userCode +'_' +userTypeCode+ '>Self</option>';
    //                        for (var j = 0; j < User.length; j++) {

    //                            content += '<option value=' + User[j].Tree_Code +'_' + User[j].User_Type_Code+ '>' + User[j].Tree_Name + '</option>';
    //                        }
    //                        content += '</select>';
    //                        content += '</form></div>';
    //                    }
    //                    $('#TablePD').html(content);
    //                    $('#PRegionDrop').val(PregionCode);
    //                    $('#PUserDrop').val(PuserCode+'_'+PuserTypeCode);
                       
    //}
    //function fnopen()
    //{
    //    $("#DashboardPTree").modal({
    //        backdrop: 'static',
    //        keyboard: false
    //    });
    //}
    //function fnSetSessionValue(companyCode,userCode,regionCode,UserTypeCode)
    //{
    //    $.ajax({
    //        type: "GET",
    //        async: false,
    //        url: '../../DashBoardV2/GetSetSessionValue',
    //        data:'CompanyCode='+companyCode+'&User_Code='+userCode+'&Region_Code='+regionCode+'&UserTypeCode='+UserTypeCode,
    //        success: function (json) {

    //        },
    //        error:function()
    //        {
                
    //        }
    //    });
    //}
</script>