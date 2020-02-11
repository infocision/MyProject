
/*
Created By      : Manju / Ganesan
Created Date    : 02-04-2018
For             : Admin Dashboard
*/
var startdate = "";
var enddate ="";
var table1 = "";
var DRdata1 = "";
var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
var lstNorms = "";
var ReportConfig = {
    showColumnChooser: true,
    allowPaging: true,
    gridLines: 'Both',
    allowPdfExport: false,
    allowExcelExport: true,
    allowGrouping: true,
    allowSorting: true,
    allowFiltering: true,
    allowResizing: true,
    allowCellMerging: true,
    allowScrolling: true,
    toolbar: ['ExcelExport', 'Search', 'ColumnChooser'],
    aggregates: [],
};
var AdminDashboard = {
    UserCode: "",
    RegionCode: "",
    lstResponse: [],
    JA_Wise: 0,
    defaults: {
        "Current_Date": "",
        "Previous_Date": "",
        "Next_Date": "",
        "Day_After_Tomorrow": "",
        "Current_Month": "",
        "Next_Month": "",
        "Previous_Month": "",
        "Current_Year": "",
        "Previous_Year": "",
        "Next_Year": "",
        "Child_User_Count": 0,
        "TOUR_PLANNER": "NO",
        "team_data_json": [],
        "self_data_json": [],
        "team_Category_data_json": [],
        "self_Category_data_json": [],
        "OpenPositionByDivision": "",
        "TopDivisionCode": "",
        "CategoryCoverageDetails": "",
        "bindManagerDoctorVisit": "",
        "PSwithTargetDivisionCode": "",
        "IsPS": true,
        "GetMonthNumber": [],
        "isCurrent": true,
        "DcrComplianceMonthType": "",
        "DcrComplianceDDL": "",
        "Months": "",
        "visitSummaryPageNo": 1,
        "Current": "",
        "TpUL": "",
        "status": "",
        "DcrLockStatus": "Current Month",
        "TPUnavalibleLockStatus": "Current Month",
        "TPApprovalLockStatus": "Current Month",
        "TPPendingLockStatus": "Current Month",
        "SSPendingLockStatus": "Current Month",
        "SSApprovalLockStatus": "Current Month",
        "isCoverage": "",
        "JoinerAttritionDetails": "",
        "TimeInvestment": "",
        "TimeInvestmentMonth": "",
        "TPFilter": "",
        "paginationLock": 0,
        "paginationTpLock": 0,
        "paginationTpAppLock": 0,
        "paginationTpPenLock": 0,
        "paginationSSPenLock": 0,
        "paginationSSAppLock": 0,
        "paginationJoiners": 0,
        "paginationOpenPosition": 0,
        "JoinerMonth": "",
        "JoinerYear": "",
        "JA_WiseOption": "",
        "OpenDivision": "",
        "DoctorName": "",
        "DMGRegionName": "",
        "Exactdivision":"",
        rowId: "",
        days: ""
    },
    initialize: function (num) {
        debugger;
        //Drop Down Menu Click Event Show 
        if ($('#hdnSpecWiseCovgRgnCount').val() !== "") {
            $('#DrCoverageRgnCount').val($('#hdnSpecWiseCovgRgnCount').val());
        }
        $(".toggle-menu").click(function () {
            $(this).next(".dropdown-content").toggle();
        });
        //$("#dvMoreInfoModal").overlay({
        //    onBeforeLoad: function () {
        //    },
        //    onLoad: function () {
        //    }
        //});


        //$("#dvMoreInfoModal2").overlay({
        //    onBeforeLoad: function () {
        //    },
        //    onLoad: function () {
        //    }
        //});
        if (num == 2) {
            AdminDashboard.getOpenPositionCount();
            AdminDashboard.getJoinerAttrition();
            // AdminDashboard.getDivisionsNew();
            AdminDashboard.IntiMethodsWithData();
        }
        else if (num == 3) {
            AdminDashboard.getDcrLockCount();
            AdminDashboard.getTPUnavalibleLockCount();
            AdminDashboard.getTPApprovalLockCount();
            AdminDashboard.getTpPendingLockCount();
            AdminDashboard.getSSPendingLockCount();
            AdminDashboard.getSSApprovalLockCount();
            AdminDashboard.getDivisionCompliance();
            AdminDashboard.IntiMethodsWithData();
            // assign dropdown values for DCR & TP Deviation
            AdminDashboard.defaults.DeviationLag = $("#ddlDcrDeviation").val();
            AdminDashboard.defaults.DCRMonth = $("#ddlMonth").val();
        }
        else if (num == 4) {
            AdminDashboard.getMarketingCampaignCount();
        }
        else {
            AdminDashboard.fngetprivilegevalue();
            AdminDashboard.GetMonthName();
            AdminDashboard.GetMonthNamePrev();
            AdminDashboard.getDivisions();
            //AdminDashboard.getAdminDashboardLiveCounts();

        }
    },

    blockUI: function (dvId) {
        $(".dropdown-content").hide();
        $('#' + dvId).block({
            message: '<img src="../../Content/images/loader1.gif" width="40px" height="40px"  />',
            css: {
                padding: 0,
                margin: 0,
                width: '30%',
                top: '40%',
                left: '35%',
                textAlign: 'center',
                color: '#000',
                //border: '3px solid #aaa',
                border: 'none',
                backgroundColor: 'rgba(0,0,0,0)',
                //opacity: 0.6,
                cursor: 'wait'
            },

            // minimal style set used when themes are used 
            themedCSS: {
                width: '30%',
                top: '40%',
                left: '35%'
            },

            // styles for the overlay 
            overlayCSS: {
                backgroundColor: '#000',
                opacity: 0.6,
                cursor: 'wait'
            },

            // style to replace wait cursor before unblocking to correct issue 
            // of lingering wait cursor 
            cursorReset: 'default',
        })
    },
    UnblockUI: function (dvId) {
        $('#' + dvId).unblock();
        $(".dropdown-content").hide();
    },
    IntiMethodsWithData: function () {


        $("#btnCategoryCurrent").click(function () {
            $(this).removeClass("btn-inactivecategory").addClass("btn-activecategory");
            $("#btnCategoryPrevious").removeClass("btn-activecategory").addClass("btn-inactivecategory");
            AdminDashboard.defaults.isCurrent = true;
            AdminDashboard.getNewCategoryCoverage();
            //AdminDashboard.getDashboardCategoryCountDataForSingleUser();
        });

        $("#btnCategoryPrevious").click(function () {
            $(this).removeClass("btn-inactivecategory").addClass("btn-activecategory");
            $("#btnCategoryCurrent").removeClass("btn-activecategory").addClass("btn-inactivecategory");
            AdminDashboard.defaults.isCurrent = false;
            AdminDashboard.getNewCategoryCoverage();
            //AdminDashboard.getDashboardCategoryCountDataForSingleUser();
        });

        $("#ddlCategoryCoverageDivision").change(function () {

            AdminDashboard.getNewCategoryCoverage();
        });
        $("#ddlCategoryCoverageDivisiondv").change(function () {

            AdminDashboard.getCategoryCoverageDetails();
        });

        $("#ddlDcrComplianceDivsion").change(function () {
            AdminDashboard.getDCRCompliance();
        });

        // Primary Secondary Top Ten Sales

        $("#ddlTopSalesDivision").change(function () {
            AdminDashboard.getTopTenProduct();
        });


        $("#btnRefreshTopTen").click(function () {
            //AdminDashboard.defaults.IsPS = false;
            AdminDashboard.getTopTenProduct();
        });

        $("#ddlDcr").change(function () {
            debugger;
            var DCR = $('#ddlDcr').val();
            if (DCR == "Previous") {
                AdminDashboard.defaults.DcrComplianceMonthType = "PREVIOUS";
                AdminDashboard.getDCRCompliance();
            }
            else {
                AdminDashboard.defaults.DcrComplianceMonthType = "CURRENT";
                AdminDashboard.getDCRCompliance();
            }
        });

        // Dcr Compliance
        $("#btnCompliancePre").change(function () {
            debugger;
            AdminDashboard.defaults.DcrComplianceMonthType = "PREVIOUS";
            $('.dropdown-content').slideUp();
            AdminDashboard.getDCRCompliance();
        });

        $("#btnComplianceCur").change(function () {
            debugger;
            AdminDashboard.defaults.DcrComplianceMonthType = "CURRENT";
            $('.dropdown-content').slideUp();
            AdminDashboard.getDCRCompliance();
        });

        //----------- DCR TP Unavalible and Approval Count Event

        $(".fnDcrTPCnt").click(function () {
            debugger;
            var whichFunction = $(this).attr("data-identify");
            $('.dropdown-content').slideUp();
            AdminDashboard.fnDcrTPCount(whichFunction);
        });
        $('.DCRLocks').change(function () {
            debugger;
            var whichFunction = $('.DCRLocks').val();
            AdminDashboard.fnDcrTPCount(whichFunction);

        });
        $('.TpLocks').change(function () {
            debugger;
            var whichFunction = $('.TpLocks').val();
            AdminDashboard.fnDcrTPCount(whichFunction);

        });
        $('.ApprovalLocks').change(function () {
            debugger;
            var whichFunction = $('.ApprovalLocks').val();
            AdminDashboard.fnDcrTPCount(whichFunction);

        });
        $('.ApprovalNonTp').change(function () {
            debugger;
            var whichFunction = $('.ApprovalNonTp').val();
            AdminDashboard.fnDcrTPCount(whichFunction);

        });
        $('.SSNonEntered').change(function () {
            debugger;
            var whichFunction = $('.SSNonEntered').val();
            AdminDashboard.fnDcrTPCount(whichFunction);

        });
        $('.SSApproval').change(function () {
            debugger;
            var whichFunction = $('.SSApproval').val();
            AdminDashboard.fnDcrTPCount(whichFunction);

        });
        //-----------
        $("#currentMonth").click(function () {
            $(this).removeClass("btn-inactivecategory").addClass("btn-activecategory");
            $("#previousMonth").removeClass("btn-activecategory").addClass("btn-inactivecategory");
            $("#tillMonth").removeClass("btn-activecategory").addClass("btn-inactivecategory");
            AdminDashboard.defaults.isCoverage = "FM";
            AdminDashboard.getCategoryCoverageDetails();
        });

        $("#previousMonth").click(function () {
            $(this).removeClass("btn-inactivecategory").addClass("btn-activecategory");
            $("#currentMonth").removeClass("btn-activecategory").addClass("btn-inactivecategory");
            $("#tillMonth").removeClass("btn-activecategory").addClass("btn-inactivecategory");
            AdminDashboard.defaults.isCoverage = "PM";
            AdminDashboard.getCategoryCoverageDetails();
        });

        $("#tillMonth").click(function () {
            $(this).removeClass("btn-inactivecategory").addClass("btn-activecategory");
            $("#previousMonth").removeClass("btn-activecategory").addClass("btn-inactivecategory");
            $("#currentMonth").removeClass("btn-activecategory").addClass("btn-inactivecategory");
            //AdminDashboard.defaults.isCurrent = false;
            AdminDashboard.defaults.isCoverage = "TM";
            AdminDashboard.getCategoryCoverageDetails();
        });
        $("#ddlJoinerAttrition").change(function () {
            AdminDashboard.getJoinerAttritionV2();
        });
        $("#ddlDivisioncallAverage").change(function () {

            AdminDashboard.defaults.CallAvg = $("#CallAverageddlName").val();
            if (AdminDashboard.defaults.CallAvg == "Call Average") {
                AdminDashboard.getCallAverage();
            }
            else {
                AdminDashboard.getProductiveCall();
            }
        });

        $("#CallAverageddlName").change(function () {

            AdminDashboard.defaults.CallAvg = $("#CallAverageddlName").val();
            if (AdminDashboard.defaults.CallAvg == "Call Average") {
                AdminDashboard.getCallAverage();
            }
            else {
                AdminDashboard.getProductiveCall();
            }
        });

        $("#CallMonthddl").change(function () {

            AdminDashboard.defaults.CallAvg = $("#CallAverageddlName").val();
            if (AdminDashboard.defaults.CallAvg == "Call Average") {
                AdminDashboard.getCallAverage();
            }
            else {
                AdminDashboard.getProductiveCall();
            }
        });
        $("#ddlDivisionTime").change(function () {
            AdminDashboard.getTimeInvestmentDetails();
        });

        $("#ddlMonthofInvestment").change(function () {

            AdminDashboard.getTimeInvestmentDetails();
        });
        $("#ddlDcrDeviation").change(function () {

            AdminDashboard.defaults.DeviationLag = $("#ddlDcrDeviation").val();
            if (AdminDashboard.defaults.DeviationLag == "DCR Time Lag") {
                AdminDashboard.getDCRTimeLag();
            }
            else {
                AdminDashboard.getTPTimeLag();
            }
        });



        $("#ddldivisionDeviation").change(function () {
            AdminDashboard.defaults.DCRTPVale = $("#ddldivisionDeviation").find(':selected').data('division_code');
            if (AdminDashboard.defaults.DeviationLag == "DCR Time Lag") {
                AdminDashboard.getDCRTimeLag();
            }
            else {
                AdminDashboard.getTPTimeLag();
            }
        });

        $("#ddlMonth").change(function () {

            AdminDashboard.defaults.DCRMonth = $("#ddlMonth").val();
            if (AdminDashboard.defaults.DeviationLag == "DCR Time Lag") {
                AdminDashboard.getDCRTimeLag();
            }
            else {
                AdminDashboard.getTPTimeLag();
            }
        });
        $("#selectedmonth").change(function () {

            AdminDashboard.getDrCoverageChart();
        });

        $("#ddlDrCoverage").change(function () {
            AdminDashboard.getDrCoverageChart();
        });
        $("#selectedmonths").change(function () {

            AdminDashboard.getDrComplianceChart();
        });

        $("#ddlDrCompliance").change(function () {
            AdminDashboard.getDrComplianceChart();
        });
        $("#ddlDivisionSpe").change(function () {
            AdminDashboard.fngetSpecialityName();
        });
        $("#DrSpecialitymonth").change(function () {
            AdminDashboard.getDrSpecialityhWiseCoverage();
        });
        //$("#speciality").change(function () {
        //    AdminDashboard.getDrSpecialityhWiseCoverage();
        //});
        $("#DrMissedmonths").change(function () {
            var IsChecked = $('input[name="Drcumulative"]:checked').length > 0;
            if (IsChecked == false) {
                AdminDashboard.getDrMissedMonthWise();
            }
            else {
                AdminDashboard.getDrMissed();
            }
        });
        $("#ddlDrMissed").change(function () {
            var IsChecked = $('input[name="Drcumulative"]:checked').length > 0;
            if (IsChecked == false) {
                AdminDashboard.getDrMissedMonthWise();
            }
            else {
                AdminDashboard.getDrMissed();
            }

        });

        $('#cumulative').click(function () {
            var IsChecked = $('input[name="Drcumulative"]:checked').length > 0;
            if (IsChecked == false) {
                AdminDashboard.getDrMissedMonthWise();
            }
            else {
                AdminDashboard.getDrMissed();
            }
        });
        $("#ddlDivisionCallAvg").change(function () {
            AdminDashboard.GetUserTypeName();
        });
        $("#CallAvgmonth").change(function () {
            AdminDashboard.getCallAverageChart();
        });
        //$("#UserTypeName").change(function () {
        //    AdminDashboard.getCallAverageChart();
        //});
        $("#chooseopen").click(function () {
            $("#Choosefilteropen").modal('show');
        });
        $("#openclose").click(function () {
            $('#Choosefilteropen').modal('toggle');
            AdminDashboard.getOpenPositionCount();
            $('#chooseopen').html('<i class="fa fa-check-square-o" style="font-size: 14px;"></i> Selected filter');
        });
        $("#coveragechoose").click(function () {
            $("#overylay").modal('show');
        });
        $("#submitoverlay").click(function () {
            $('#overylay').modal('toggle');
            AdminDashboard.getDrCoverageChart();
            $('#coveragechoose').html('<i class="fa fa-check-square-o" style="font-size: 14px;"></i> Selected filter');
        });
        $("#compliancechoose").click(function () {
            $("#overylay1").modal('show');
        });
        $("#submitoverlay1").click(function () {
            $('#overylay1').modal('toggle');
            AdminDashboard.getDrComplianceChart();
            $('#compliancechoose').html('<i class="fa fa-check-square-o" style="font-size: 14px;"></i> Selected filter');
        });
        $("#DrCoveragechoose").click(function () {
            $("#overylay2").modal('show');
        });
        $("#submitoverlay2").click(function () {
            $('#overylay2').modal('toggle');
            AdminDashboard.getNewCategoryCoverage();
            $('#DrCoveragechoose').html('<i class="fa fa-check-square-o" style="font-size: 14px;"></i> Selected filter');
        });
        $("#DrCoveragemonthchoose").click(function () {
            $("#overylay3").modal('show');
        });
        $("#submitoverlay3").click(function () {
            $('#overylay3').modal('toggle');
            var IsChecked = $('input[name="Drcumulative"]:checked').length > 0;
            if (IsChecked == false) {
                AdminDashboard.getDrMissedMonthWise();
            }
            else {
                AdminDashboard.getDrMissed();
            }
            $('#DrCoveragemonthchoose').html('<i class="fa fa-check-square-o" style="font-size: 14px;"></i> Selected filter');
        });
        $("#specialityfilter").click(function () {
            $("#overylay4").modal('show');
        });
        $("#submitoverlay4").click(function () {
            $('#overylay4').modal('toggle');
            AdminDashboard.getDrSpecialityhWiseCoverage();
            $('#specialityfilter').html('<i class="fa fa-check-square-o" style="font-size: 14px;"></i> Selected filter');
        });
        $("#callaverageFilter").click(function () {
            $("#overylay5").modal('show');
        });
        $("#submitoverlay5").click(function () {
            $('#overylay5').modal('toggle');
            AdminDashboard.getCallAverageChart();
            $('#callaverageFilter').html('<i class="fa fa-check-square-o" style="font-size: 14px;"></i> Selected filter');
        });
        $(".information").click(function () {
            debugger;
            $("#popinformation").modal('show');

            AdminDashboard.getInformation($(this).attr('id'));
        });
        $("#submitinformation").click(function () {
            $('#popinformation').modal('toggle');
        });
        $('#DrCallUser').click(function () {
            $('#fieldDaysCount').css("display", "none");
            AdminDashboard.GetUserTypeName();
        });
        $('#DrCallRegion').click(function () {
            $('#fieldDaysCount').css("display", "block");
            AdminDashboard.GetRegionTypeName();
        });

    },
    fnprevious: function () {
        debugger;
        if (AdminDashboard.defaults.paginationLock == 0) {
            $('#Previous').hide();
            AdminDashboard.defaults.paginationLock = 0
        }
        else {
            AdminDashboard.defaults.paginationLock = AdminDashboard.defaults.paginationLock - 300;
        }
        AdminDashboard.getDcrLockCountPopUp();

    },
    //syncfusion grid
    fnSyncfusionGrid: function (id, data) {
        debugger;
        AdminDashboard.lstResponse = data;
        $("#loader").hide();
        $("#" + id).html('');
        ej.grids.Grid.Inject(ej.grids.Resize);
        var grid = new ej.grids.Grid({
            dataSource: data,
            showColumnChooser: ReportConfig.showColumnChooser,
            //allowGrouping:ReportConfig.allowGrouping,
            //groupSettings: { disablePageWiseAggregates: true },
            allowPaging: true,
            expandAll: true,
            gridLines: ReportConfig.gridLines,
            pageSettings: { pageSize: 10, pageSizes: [5, 10], pageCount: 5 },
            height: "99%",
            allowExcelExport: ReportConfig.allowExcelExport,
            allowSorting: ReportConfig.allowSorting,
            allowFiltering: ReportConfig.allowFiltering,
            filterSettings: { type: 'CheckBox' },
            allowResizing: ReportConfig.allowResizing,
            allowScrolling: ReportConfig.allowScrolling,
            allowTextWrap: ReportConfig.allowTextWrap,
            toolbar: ReportConfig.toolbar,
            scrollSettings: { width: '100%', height: 300, allowVirtualScrolling: true },
            columns: AdminDashboard.GetColumns(id, data),
             dataBound: function(){
                grid.autoFitColumns()
            },
        });
        grid.appendTo("#" + id);
        $('.e-sortfilterdiv.e-icons.e-descending.e-icon-descending').css("padding-top", "10px");
        $('.e-sortfilterdiv.e-icons.e-ascending.e-icon-ascending').css("padding-top", "10px");
        $('.e-filtermenudiv.e-icons.e-icon-filter').css("margin-right", "10px");
        $('.e-filtermenudiv.e-icons.e-icon-filter').css("padding-top", "10px");
        $("#" + id).show();
        if (id === "dvInfoContentopen") {
            grid.frozenColumns = 0;
            grid.allowGrouping = true;
            grid.groupSettings = { disablePageWiseAggregates: true };
            grid.toolbar = ["Search", "ExcelExport", "ColumnChooser"];
        }
        else if (id === "dvtpunavailabilitylock" || id === "dvtplock" || id === "dvInfoJoiner" || id === "dvDcrLock" || id === "dvtpPendinglock" || id === "dvSSPendinglock"
        || id === "SSApprovallock") {
            grid.frozenColumns = 1;
            if (grid.toolbar.indexOf("Search") > -1) {
                grid.toolbar.splice(grid.toolbar.indexOf("Search"), 1);
            }
            //var ctnt = "<input class='form-control' id='myInput' type='text' onkeyup='AdminDashboard.fnKeyUp(this);' placeholder='Search..' style='height:16px !important;margin-top:5px;'>";
            //$('.e-input-group.e-search').html(ctnt);
            //$('.e-input-group.e-search').show();
            //$('.e-input-group.e-search').css("border-color", "transparent");
        }
        else if (id === "parent") {
            grid.frozenColumns = 1;
            if (grid.toolbar.indexOf("Search") > -1) {
                grid.toolbar.splice(grid.toolbar.indexOf("Search"), 1);
            }
        }
        else {
            grid.frozenColumns = 1;
            grid.toolbar = ["Search", "ExcelExport", "ColumnChooser"];
        }
        $(".e-grid.e-altrow").css("background-color", "#ddd");
        grid.toolbarClick = function (args) {
            if (args.item.id === id + "_excelexport") {
                debugger;
                if (id === "parent") {
                    fName = $('#hdnRptName').val();
                }
                else {
                    fName = $('.modal-title').text();
                }
                let excelExportProperties = {
                    dataSource: data,
                    fileName: fName + ".xlsx",
                    theme:
                    {
                        header: { fontName: 'Segoe UI', fontColor: '#666666', textAlign: 'center' },
                        record: { fontName: 'Segoe UI', fontColor: '#666666' },
                        caption: { fontName: 'Segoe UI', fontColor: '#666666' }
                    },
                    includeHiddenColumn: true
                };
                grid.excelExport(excelExportProperties);
            }
            else if (args.item.id === id + "_search") {
            }
        };
    },
    fnKeyUp: function (obj) {
        var value = $(obj).val().toLowerCase();
        $(".e-table .e-frozencontent tr,.e-table .e-movablecontent tr").filter(function () {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });
    },
    GetColumns: function (id, data) {
        debugger;
        var columns = [];
        if (id == 'parent') {
            //columns.push({ field: 'ddcrcid', headerText: 'S.No', minWidth: '160', textAlign: 'Center' });
            columns.push({ field: 'user_name', headerText: 'User Name', minWidth: '160', textAlign: 'Left' });
            columns.push({ field: 'user_type_name', headerText: 'Designation', minWidth: '160', textAlign: 'Left' });
            columns.push({ field: 'division_values', headerText: 'Division Name', minWidth: '160', textAlign: 'Left' });
            columns.push({ field: 'region_name', headerText: 'Region Name', minWidth: '160', textAlign: 'Left' });
            columns.push({ field: 'hidoctor_startdate', headerText: 'Hidoctor StartDate', minWidth: '160', textAlign: 'Center' });
            columns.push({ field: 'start_date', headerText: 'Start Date', minWidth: '160', textAlign: 'Center' });
            columns.push({ field: 'End_date', headerText: 'End Date', minWidth: '160', textAlign: 'Center' });
            columns.push({ field: 'resignation_date', headerText: 'Resignation Date', minWidth: '160', textAlign: 'Center' });
            columns.push({ field: 'user_status', headerText: 'User Status', minWidth: '160', textAlign: 'Center' });
            columns.push({ field: 'total_count', headerText: 'Total Count', minWidth: '160', textAlign: 'Center' });
            columns.push({ field: 'weekends', headerText: 'Week End', minWidth: '160', textAlign: 'Center' });
            columns.push({ field: 'holiday', headerText: 'Holiday', minWidth: '160', textAlign: 'Center' });
            columns.push({ field: 'applicable_count', headerText: 'Applicable Count', minWidth: '160', textAlign: 'Center' });
            columns.push({ field: 'working_count', headerText: 'Working Count', minWidth: '160', textAlign: 'Center' });
            columns.push({ field: 'dcr_compliance', headerText: 'Dcr Compliance', minWidth: '160', textAlign: 'Center' });
        }
        else if (id == 'dvInfoContentopen') {
            //columns.push({ headerText: 'S.No', minWidth: '160', textAlign: 'Center',isIdentity:true });
            columns.push({ field: 'Region_Name', headerText: 'Region Name', minWidth: '160', textAlign: 'Left' });
            columns.push({ field: 'Region_Type_Name', headerText: 'Region Type Name', minWidth: '160', textAlign: 'Left' });
            columns.push({ field: 'Division_Name', headerText: 'Division Name', minWidth: '160', textAlign: 'Left' });
            columns.push({ field: 'Vacancy_Type', headerText: 'Region Status', minWidth: '160', textAlign: 'Left' });
            columns.push({ field: 'Vacant_From_Date', headerText: 'Vacancy From Period', minWidth: '160', textAlign: 'Center' });
        }
        else if (id == 'dvDcrLock') {
            //columns.push({ headerText: 'S.No', minWidth: '160', textAlign: 'Center' });
            columns.push({ field: 'User_Name', headerText: 'User Name', minWidth: '160', textAlign: 'Left' });
            columns.push({ field: 'Employee_Name', headerText: 'Employee Name', minWidth: '160', textAlign: 'Left' });
            columns.push({ field: 'Employee_Number', headerText: 'Employee Number', minWidth: '160', textAlign: 'Left' });
            columns.push({ field: 'Region_Name', headerText: 'Region Name', minWidth: '160', textAlign: 'Left' });
            columns.push({ field: 'User_Type_Name', headerText: 'Designation', minWidth: '160', textAlign: 'Left' });
            columns.push({ field: 'Division_Name', headerText: 'Division Name', minWidth: '160', textAlign: 'Left' });
            columns.push({ field: 'Locked_Date', headerText: 'Locked Date', minWidth: '160', textAlign: 'Center' });
            columns.push({ field: 'DCR_Actual_Date', headerText: 'DCR Date Locked', minWidth: '160', textAlign: 'Center' });
            columns.push({ field: 'Lock', headerText: 'Lock Type', minWidth: '160', textAlign: 'Left' });
            columns.push({ field: 'Mode', headerText: 'Mode', minWidth: '160', textAlign: 'Left' });
        }
        else if (id == 'dvtpunavailabilitylock' || id == 'dvtplock') {
            //columns.push({ headerText: 'S.No', minWidth: '160', textAlign: 'Center'});
            columns.push({ field: 'User_Name', headerText: 'User Name', minWidth: '160', textAlign: 'Left' });
            columns.push({ field: 'Employee_Name', headerText: 'Employee Name', minWidth: '160', textAlign: 'Left' });
            columns.push({ field: 'Employee_Number', headerText: 'Employee Number', minWidth: '160', textAlign: 'Center' });
            columns.push({ field: 'Region_Name', headerText: 'Region Name', minWidth: '160', textAlign: 'Left' });
            columns.push({ field: 'User_Type_Name', headerText: 'Designation', minWidth: '160', textAlign: 'Left' });
            columns.push({ field: 'Division_Name', headerText: 'Division Name', minWidth: '160', textAlign: 'Left' });
            columns.push({ field: 'Locked_Date', headerText: 'Locked Date', minWidth: '160', textAlign: 'Center' });
            columns.push({ field: 'Period', headerText: 'Period', minWidth: '160', textAlign: 'Center' });
        }
        else if (id == 'dvtpPendinglock') {
            //columns.push({ headerText: 'S.No', minWidth: '160', textAlign: 'Center',isIdentity:true });
            columns.push({ field: 'User_Name', headerText: 'User Name', minWidth: '160', textAlign: 'Left' });
            columns.push({ field: 'Employee_Name', headerText: 'Employee Name (Employee Number)', minWidth: '160', textAlign: 'Left' });
            columns.push({ field: 'Employee_Number', headerText: 'Employee Number', minWidth: '160', textAlign: 'Center' });
            columns.push({ field: 'Region_Name', headerText: 'Region Name', minWidth: '160', textAlign: 'Left' });
            columns.push({ field: 'User_Type_Name', headerText: 'Designation', minWidth: '160', textAlign: 'Left' });
            columns.push({ field: 'Division_Name', headerText: 'Division Name', minWidth: '160', textAlign: 'Left' });
            columns.push({ field: 'Tp_User_Name', headerText: 'Subordinate User Name', minWidth: '160', textAlign: 'Left' });
            columns.push({ field: 'Locked_Date', headerText: 'Locked Date', minWidth: '160', textAlign: 'Center' });
            columns.push({ field: 'Period', headerText: 'Period', minWidth: '160', textAlign: 'Center' });
        }
        else if (id == 'dvSSPendinglock') {

            //columns.push({ headerText: 'S.No', minWidth: '160', textAlign: 'Center',isIdentity:true });
            columns.push({ field: 'User_Name', headerText: 'User Name', minWidth: '160', textAlign: 'Left' });
            columns.push({ field: 'Employee_Name', headerText: 'Employee Name (Employee Number)', minWidth: '160', textAlign: 'Left' });
            columns.push({ field: 'Employee_Number', headerText: 'Employee Number', minWidth: '160', textAlign: 'Center' });
            columns.push({ field: 'Region_Name', headerText: 'Region Name', minWidth: '160', textAlign: 'Left' });
            columns.push({ field: 'User_Type_Name', headerText: 'Designation', minWidth: '160', textAlign: 'Left' });
            columns.push({ field: 'Division_Name', headerText: 'Division Name', minWidth: '160', textAlign: 'Left' });
            columns.push({ field: 'Locked_Date', headerText: 'Locked Date', minWidth: '160', textAlign: 'Center' });
            columns.push({ field: 'Period', headerText: 'Period', minWidth: '160', textAlign: 'Center' });
        }
        else if (id == 'SSApprovallock') {

            //columns.push({ headerText: 'S.No', minWidth: '160', textAlign: 'Center',IsIdentity:true });
            columns.push({ field: 'User_Name', headerText: 'User Name', minWidth: '160', textAlign: 'Left' });
            columns.push({ field: 'Employee_Name', headerText: 'Employee Name (Employee Number)', minWidth: '160', textAlign: 'Left' });
            columns.push({ field: 'Employee_Number', headerText: 'Employee Number', minWidth: '160', textAlign: 'Center' });
            columns.push({ field: 'Region_Name', headerText: 'Region Name', minWidth: '160', textAlign: 'Left' });
            columns.push({ field: 'User_Type_Name', headerText: 'Designation', minWidth: '160', textAlign: 'Left' });
            columns.push({ field: 'Division_Name', headerText: 'Division Name', minWidth: '160', textAlign: 'Left' });
            columns.push({ field: 'Tp_User_Name', headerText: 'Subordinate User Name', minWidth: '160', textAlign: 'Left' });
            columns.push({ field: 'Sub_RegionName', headerText: 'Subordinate Region Name', minWidth: '160', textAlign: 'Left' });
            columns.push({ field: 'Locked_Date', headerText: 'Locked Date', minWidth: '160', textAlign: 'Center' });
            columns.push({ field: 'Period', headerText: 'Period', minWidth: '160', textAlign: 'Center' });
        }
        if (id == 'dvInfoJoiner') {
            debugger;
            if (AdminDashboard.JA_Wise == 1) {
                columns.push({ field: 'Employee_Number', headerText: 'Employee Number', minWidth: '160', textAlign: 'Center' });
                columns.push({ field: 'Employee_Name', headerText: 'Employee Name', minWidth: '200', textAlign: 'Left' });
                columns.push({ field: 'User_Name', headerText: 'User Name', minWidth: '160', textAlign: 'Left' });
                columns.push({ field: 'User_Type_Name', headerText: 'Designation', minWidth: '160', textAlign: 'Left' });
                columns.push({ field: 'Region_Name', headerText: 'Region Name', minWidth: '160', textAlign: 'Left' });
                columns.push({ field: 'Division_Values', headerText: 'Division Name', minWidth: '160', textAlign: 'Left' });
                columns.push({ field: 'Date_Of_Joining', headerText: 'Date of Joining', minWidth: '160', textAlign: 'Center' });
                columns.push({ field: 'Mobile', headerText: 'Mobile Number', minWidth: '160', textAlign: 'Center' });
                columns.push({ field: 'Last_DCR_Entered', headerText: 'Last DCR Date', minWidth: '160', textAlign: 'Center' });
                columns.push({ field: 'Activity_Name', headerText: 'DCR Type', minWidth: '160', textAlign: 'Center' });
                columns.push({ field: 'Activity_Status', headerText: 'DCR Status', minWidth: '160', textAlign: 'Center' });
                columns.push({ field: 'DCR_Entered_Date', headerText: 'DCR Entered Date', minWidth: '160', textAlign: 'Center' });
            }
            if (AdminDashboard.JA_Wise == 2) {
                columns.push({ field: 'Employee_Number', headerText: 'Employee Number', minWidth: '160', textAlign: 'Center' });
                columns.push({ field: 'Employee_Name', headerText: 'Employee Name', minWidth: '200', textAlign: 'Left' });
                columns.push({ field: 'User_Name', headerText: 'User Name', minWidth: '160', textAlign: 'Left' });
                columns.push({ field: 'User_Type_Name', headerText: 'Designation', minWidth: '160', textAlign: 'Left' });
                columns.push({ field: 'Region_Name', headerText: 'Region Name', minWidth: '160', textAlign: 'Left' });
                columns.push({ field: 'Division_Values', headerText: 'Division Name', minWidth: '160', textAlign: 'Left' });
                columns.push({ field: 'Date_Of_Joining', headerText: 'Date of Joining', minWidth: '160', textAlign: 'Center' });
                columns.push({ field: 'Resignation_Date', headerText: 'Date of Resignation', minWidth: '160', textAlign: 'Center' });
                columns.push({ field: 'Days_Worked', headerText: 'Total Number of Days Worked', minWidth: '160', textAlign: 'Center' });
                columns.push({ field: 'Mobile', headerText: 'Mobile Number', minWidth: '160', textAlign: 'Center' });
                columns.push({ field: 'Last_DCR_Entered', headerText: 'Last DCR Date', minWidth: '160', textAlign: 'Center' });
                columns.push({ field: 'Activity_Name', headerText: 'DCR Type', minWidth: '160', textAlign: 'Center' });
                columns.push({ field: 'Activity_Status', headerText: 'DCR Status', minWidth: '160', textAlign: 'Center' });
                columns.push({ field: 'DCR_Entered_Date', headerText: 'DCR Entered Date', minWidth: '160', textAlign: 'Center' });
            }
        }
        //var label = Object.keys(jsondata)[i].toString();
        //label = label.replace(/_/g, ' ');
        //if (label.indexOf(' ') > -1) {
        //    columns.push({ field: Object.keys(jsondata)[i], headerText: AdminDashboard.toCamelCase(label), minWidth: '160', textAlign: 'Center' });
        //}
        //else {
        //    if (label == "ddcrcid") {
        //        columns.push({ field: Object.keys(jsondata)[i], headerText: "SNo", minWidth: '160', textAlign: 'Center' });
        //    }
        //    else {
        //    columns.push({ field: Object.keys(jsondata)[i], headerText: label.substr(0,1).toUpperCase()+label.substr(1), minWidth: '160', textAlign: 'Center' });}
        //}
        return columns;
    },
    toCamelCase: function (string) {
        return string.replace(/(?:^|\s)\w/g, function (match) {
            return match.toUpperCase();
        });
    },
    fnNext: function () {
        debugger;
        AdminDashboard.defaults.paginationLock = AdminDashboard.defaults.paginationLock + 300;
        AdminDashboard.getDcrLockCountPopUp();
    },
    fnpreviousTp: function () {
        debugger;
        if (AdminDashboard.defaults.paginationTpLock == 0) {
            $('#Previous').hide();
            AdminDashboard.defaults.paginationTpLock = 0
        }
        else {
            AdminDashboard.defaults.paginationTpLock = AdminDashboard.defaults.paginationTpLock - 300;
        }
        AdminDashboard.getTPUnavalibleLockCountPopUp();

    },
    fnNextTp: function () {
        debugger;
        AdminDashboard.defaults.paginationTpLock = AdminDashboard.defaults.paginationTpLock + 300;
        AdminDashboard.getTPUnavalibleLockCountPopUp();
    },
    fnpreviousTpApp: function () {
        debugger;
        if (AdminDashboard.defaults.paginationTpAppLock == 0) {
            $('#Previous').hide();
            AdminDashboard.defaults.paginationTpAppLock = 0
        }
        else {
            AdminDashboard.defaults.paginationTpAppLock = AdminDashboard.defaults.paginationTpAppLock - 300;
        }
        AdminDashboard.getTPApprovalLockCountPopUp();

    },
    fnNextTpApp: function () {
        debugger;
        AdminDashboard.defaults.paginationTpAppLock = AdminDashboard.defaults.paginationTpAppLock + 300;
        AdminDashboard.getTPApprovalLockCountPopUp();
    },
    fnpreviousTpPen: function () {
        debugger;
        if (AdminDashboard.defaults.paginationTpPenLock == 0) {
            $('#Previous').hide();
            AdminDashboard.defaults.paginationTpPenLock = 0
        }
        else {
            AdminDashboard.defaults.paginationTpPenLock = AdminDashboard.defaults.paginationTpPenLock - 300;
        }
        AdminDashboard.getTPPendingLockCountPopUp();

    },
    fnNextTpPen: function () {
        debugger;
        AdminDashboard.defaults.paginationTpPenLock = AdminDashboard.defaults.paginationTpPenLock + 300;
        AdminDashboard.getTPPendingLockCountPopUp();
    },
    fnpreviousSSPen: function () {
        debugger;
        if (AdminDashboard.defaults.paginationSSPenLock == 0) {
            $('#Previous').hide();
            AdminDashboard.defaults.paginationSSPenLock = 0
        }
        else {
            AdminDashboard.defaults.paginationSSPenLock = AdminDashboard.defaults.paginationSSPenLock - 300;
        }
        AdminDashboard.getSSPendingLockCountPopUp();

    },
    fnNextSSPen: function () {
        debugger;
        AdminDashboard.defaults.paginationSSPenLock = AdminDashboard.defaults.paginationSSPenLock + 300;
        AdminDashboard.getSSPendingLockCountPopUp();
    },

    fnpreviousSSApp: function () {
        debugger;
        if (AdminDashboard.defaults.paginationSSAppLock == 0) {
            $('#Previous').hide();
            AdminDashboard.defaults.paginationSSAppLock = 0
        }
        else {
            AdminDashboard.defaults.paginationSSAppLock = AdminDashboard.defaults.paginationSSAppLock - 300;
        }
        AdminDashboard.getSSApprovalLockCountPopUp();

    },
    fnNextSSApp: function () {
        debugger;
        AdminDashboard.defaults.paginationSSAppLock = AdminDashboard.defaults.paginationSSAppLock + 300;
        AdminDashboard.getSSApprovalLockCountPopUp();
    },

    fnpreviousJoiner: function () {
        debugger;
        if (AdminDashboard.defaults.paginationJoiners == 0) {
            $('#Previous').hide();
            AdminDashboard.defaults.paginationJoiners = 0
        }
        else {
            AdminDashboard.defaults.paginationJoiners = AdminDashboard.defaults.paginationJoiners - 300;
        }
        AdminDashboard.GetJoinerAttritionPopUp();

    },
    fnNextJoiner: function () {
        debugger;
        AdminDashboard.defaults.paginationJoiners = AdminDashboard.defaults.paginationJoiners + 300;
        AdminDashboard.GetJoinerAttritionPopUp();
    },
    fnpreviousOpen: function () {
        debugger;
        if (AdminDashboard.defaults.paginationOpenPosition == 0) {
            $('#Previous').hide();
            AdminDashboard.defaults.paginationOpenPosition = 0
        }
        else {
            AdminDashboard.defaults.paginationOpenPosition = AdminDashboard.defaults.paginationOpenPosition - 300;
        }
        AdminDashboard.getOpenPositionPopUp();

    },
    fnNextOpen: function () {
        debugger;
        AdminDashboard.defaults.paginationOpenPosition = AdminDashboard.defaults.paginationOpenPosition + 300;
        AdminDashboard.getOpenPositionPopUp();
    },

    GetMonthNumber: function (strMonth) {
        var str;
        switch (strMonth) {
            case 'Jan':
                str = "1";
                break;
            case 'Feb':
                str = "2";
                break;
            case 'Mar':
                str = "3";
                break;
            case 'Apr':
                str = "4";
                break;
            case 'May':
                str = "5";
                break;
            case 'Jun':
                str = "6";
                break;
            case 'Jul':
                str = "7";
                break;
            case 'Aug':
                str = "8";
                break;
            case 'Sep':
                str = "9";
                break;
            case 'Oct':
                str = "10";
                break;
            case 'Nov':
                str = "11";
                break;
            case 'Dec':
                str = "12";
                break;
        }

        return str;
    },
    GetMonthName: function () {
        var Month = Month_category;
        debugger;
        var str;
        switch (Month) {
            case 1:
                str = "Jan";
                break;
            case 2:
                str = "Feb";
                break;
            case 3:
                str = "Mar";
                break;
            case 4:
                str = "Apr";
                break;
            case 5:
                str = "May";
                break;
            case 6:
                str = "Jun";
                break;
            case 7:
                str = "Jul";
                break;
            case 8:
                str = "Aug";
                break;
            case 9:
                str = "Sep";
                break;
            case 10:
                str = "Oct";
                break;
            case 11:
                str = "Nov";
                break;
            case 12:
                str = "Dec";
                break;
        }


        var year = Year_category.toString();
        year = year[2] + year[3];
        FM = str + "'" + year;
    },
    GetMonthNamePrev: function () {
        debugger;
        var Month = Month_category;
        debugger;
        var str;
        var year;
        if (Month_category == 1) {
            Month = 12;
            year = (Year_category - 1);
        }
        else {
            Month = (Month_category - 1);
            year = Year_category
        }
        switch (Month) {
            case 1:
                str = "Jan";
                break;
            case 2:
                str = "Feb";
                break;
            case 3:
                str = "Mar";
                break;
            case 4:
                str = "Apr";
                break;
            case 5:
                str = "May";
                break;
            case 6:
                str = "Jun";
                break;
            case 7:
                str = "Jul";
                break;
            case 8:
                str = "Aug";
                break;
            case 9:
                str = "Sep";
                break;
            case 10:
                str = "Oct";
                break;
            case 11:
                str = "Nov";
                break;
            case 12:
                str = "Dec";
                break;
        }
        year = year.toString();
        year = year[2] + year[3];
        PM = str + "'" + year;

    },
    getDivisions: function () {
        debugger;
        var action = CompanyCode + "/" + RegionCode;
        HDWebApiAjax.requestInvoke("GetDivisionsRegion", action, null, "GET", this.fngetDivisionsSuccessCallBack, this.fngetDivisionsErrorCallBack);
    },
    fngetDivisionsSuccessCallBack: function (jsonData) {
        debugger;
        var listItems;
        if (1 < jsonData.length) {
            listItems += "<option selected='selected' data-division_Code = 'All'>--All--</option>";
            for (var i = 0; i < jsonData.length; i++) {
                listItems += "<option data-division_Code ='" + jsonData[i].Division_Code + "'>" + jsonData[i].Division_Name + "</option>";
            }
        }
        else {

            for (var i = 0; i < jsonData.length; i++) {
                if (i == 0) {
                    listItems += "<option selected='selected' data-division_Code ='" + jsonData[i].Division_Code + "'>" + jsonData[i].Division_Name + "</option>";
                } else {
                    listItems += "<option data-division_Code ='" + jsonData[i].Division_Code + "'>" + jsonData[i].Division_Name + "</option>";
                }
            }

        }


        $("#ddlPSwithTargetDivision").html(listItems);
        $("#ddlTopSalesDivision").html(listItems);
        $("#ddlCategoryCoverageDivision").html(listItems);
        $("#ddlCategoryCoverageDivisiondv").html(listItems);
        $("#ddlDrCoverage").html(listItems);
        $("#ddlDrCompliance").html(listItems);
        $('#ddlDrMissed').html(listItems);
        $('#ddlDivisionSpe').html(listItems);
        $('#ddlDivisionCallAvg').html(listItems);

        AdminDashboard.fngetSpecialityName();
        AdminDashboard.getDrCoverageChart();
        AdminDashboard.getDrComplianceChart();
        AdminDashboard.getDrMissedMonthWise();
        AdminDashboard.getNewCategoryCoverage();
        AdminDashboard.defaults.IsPS = false;
        AdminDashboard.defaults.FM = "FM";
        AdminDashboard.IntiMethodsWithData();
        // AdminDashboard.getCategoryCoverageDetails();
        //AdminDashboard.defaults.TimeInvestmentMonth = "CURRENT";
        AdminDashboard.GetUserTypeName();
    },
    fngetDivisionsErrorCallBack: function (jsonData) {
    },

    getDivisionsNew: function () {
        var action = CompanyCode + "/" + UserCode;
        HDWebApiAjax.requestInvoke("GetDivisions", action, null, "GET", this.fnDivisionsNewSuccessCallBack, this.fnDivisionsNewErrorCallBack);
    },
    fnDivisionsNewSuccessCallBack: function (jsonData) {
        debugger;
        var listItems;
        if (1 < jsonData.length) {
            listItems += "<option selected='selected' data-division_Code = 'All'>-- All --</option>";
            for (var i = 0; i < jsonData.length; i++) {
                listItems += "<option data-division_Code ='" + jsonData[i].Division_Code + "'>" + jsonData[i].Division_Name + "</option>";
            }
        }
        else {

            for (var i = 0; i < jsonData.length; i++) {
                if (i == 0) {
                    listItems += "<option selected='selected' data-division_Code ='" + jsonData[i].Division_Code + "'>" + jsonData[i].Division_Name + "</option>";
                } else {
                    listItems += "<option data-division_Code ='" + jsonData[i].Division_Code + "'>" + jsonData[i].Division_Name + "</option>";
                }
            }

        }

        $("#ddlJoinerAttrition").html(listItems);
        AdminDashboard.getJoinerAttritionV2();

    },
    fnDivisionsNewErrorCallBack: function (jsonData) {
    },
    ///////////////////////////////////////////getDivisionCompliance

    getDivisionCompliance: function () {
        var action = CompanyCode + "/" + UserCode;
        HDWebApiAjax.requestInvoke("GetDivisions", action, null, "GET", this.fnDivisionsComplianceSuccessCallBack, this.fnDivisionsComplianceErrorCallBack);
    },
    fnDivisionsComplianceSuccessCallBack: function (jsonData) {
        var listItems;
        if (1 < jsonData.length) {
            listItems += "<option selected='selected' data-division_Code = 'All'>-- All --</option>";
            for (var i = 0; i < jsonData.length; i++) {
                listItems += "<option data-division_Code ='" + jsonData[i].Division_Code + "'>" + jsonData[i].Division_Name + "</option>";
            }
        }
        else {

            for (var i = 0; i < jsonData.length; i++) {
                if (i == 0) {
                    listItems += "<option selected='selected' data-division_Code ='" + jsonData[i].Division_Code + "'>" + jsonData[i].Division_Name + "</option>";
                } else {
                    listItems += "<option data-division_Code ='" + jsonData[i].Division_Code + "'>" + jsonData[i].Division_Name + "</option>";
                }
            }

        }
        $("#ddldivisionDeviation").html(listItems);
        $("#ddlDivisionTime").html(listItems);
        $("#ddlDivisioncallAverage").html(listItems);
        //  $("#ddlJoinerAttrition").html(listItems);
        AdminDashboard.defaults.DcrComplianceMonthType = "CURRENT";
        AdminDashboard.getDCRCompliance();
        AdminDashboard.defaults.DCRMonth = "CURRENT";
        AdminDashboard.defaults.DCRTPVale = $("#ddldivisionDeviation").find(':selected').data('division_code');
        if (AdminDashboard.defaults.DeviationLag = "DCR Time Lag") {
            AdminDashboard.getDCRTimeLag();
        }
        else {
            AdminDashboard.getTPTimeLag();
        }
        AdminDashboard.getTimeInvestmentDetails();
        AdminDashboard.getCallAverage();
    },
    fnDivisionsComplianceErrorCallBack: function (error) {
        var json = error.responseJSON;
        var strace = json.StackTrace.trim().split('at ')[1];
        var strace1 = strace.substring(strace, strace.indexOf('('));
        var srcFile = strace1.split('.');
        var obj = new Object();
        obj.ExceptionName = json.ExceptionType.substring(json.ExceptionType.lastIndexOf('.') + 1, json.ExceptionType.length);
        obj.ReportName = "Division Compliance";
        obj.ExceptionMessage = json.ExceptionMessage;
        obj.ExceptionSource = srcFile[srcFile.length - 2] + "\/" + srcFile[srcFile.length - 1];
        $.ajax({
            url: '../../Home/DoRecordExceptionLog',
            data: obj,
            method: 'POST',
            success: function (response) { debugger; console.log(response); },
            error: function (err) { console.log(err); }
        });
        //window.opener.parent.location.href = "../../Home/ErrorPage";
        //window.close();
    },

    getOpenPositionCount: function (status) {
        debugger;
        var _objData = new Object();
        _objData.CompanyCode = CompanyCode;
        _objData.RegionCode = RegionCode;
        var option = '';
        if ($('input[id="exclude"]:checked').length > 0) {
            option = 1;
        }
        else {
            option = 0;
        }
        _objData.Mode = option;
        var action = _objData;
        var params = [];
        var p = {};
        p.name = "objData";
        p.value = _objData
        params.push(p);
        HDWebApiAjax.requestInvoke("GetOpenPositionCount", "", params, "POST", this.fnOpenPositionSuccessCallBack, this.fnOpenPositionErrorCallBack, null, "JSON");
    },
    fnOpenPositionSuccessCallBack: function (jsonData) {


        if (jsonData.length == 1) {
            if (jsonData[0].Vacancy_Count == -1) {
                $('.dropdownopen').hide();
                $("#dvPieChart").text("Not Applicable");
                $('#dvPieChart').css('text-align', 'center');
                $('#dvPieChart').css('margin-top', '35%');
                $('#dvPieChart').css('font-size', '23px');
            }
            else if (jsonData[0].Vacancy_Count == 0) {
                $('.dropdownopen').hide();
                $("#dvPieChart").text("No Open Position");
                $('#dvPieChart').css('text-align', 'center');
                $('#dvPieChart').css('margin-top', '35%');
                $('#dvPieChart').css('font-size', '23px');
            }
            else {
                $('.dropdownopen').hide();
                AdminDashboard.defaults.paginationOpenPosition = 0;
                AdminDashboard.defaults.OpenDivision = jsonData[0].Division_Code;
                $('#headerdivision').html("<input type='text' style='height:10px;width:15px;background-color: #ff8100;' readonly />  " + jsonData[0].Division_Name);
                $("#dvPieChart").html("<h2 id='heading' Style='font-size:48px;margin-top: 1.25em;text-align: center;cursor: pointer;text-decoration: underline;' onclick='AdminDashboard.getOpenPositionPopUp()'>" + jsonData[0].Vacancy_Count + "</h2><br><h3 id='spanheding' Style='text-align: center;margin-top: 0.25em;font-size: 15px;'>Open Position</h3>");
            }
        }
        else {
            var OpenPosition = jsonData;

            var data = new google.visualization.DataTable();

            data.addColumn('string', 'Division Code');
            data.addColumn('string', 'Division Name');
            data.addColumn('number', 'Division Count');



            for (var i = 0; i < OpenPosition.length; i++) {
                data.addRow([OpenPosition[i].Division_Code, OpenPosition[i].Division_Name, OpenPosition[i].Vacancy_Count]);
            }

            var options = {
                chartArea: { left: 0, top: 20, width: '100%', height: '100%' },
                width: 250, height: 240,
                fontSize: 12,
                fontName: "Arial",
                is3D: false,
                legend: "none",
                pieSliceText: 'lable'
            };

            if (data.getNumberOfRows() == 0) {
                $("#dvPieChart").html("");
                $("#dvPieChart").append("<div class='circle_division'>No Open Position</div>")
                //   return false;
            } else {
                $("#dvPieChart").html("");
                dataview = new google.visualization.DataView(data);
                dataview.hideColumns([0]);

                var chart = new google.visualization.PieChart(document.getElementById('dvPieChart'));

                function fnSelectHandler() {
                    var selectedItem = chart.getSelection()[0];
                    if (selectedItem) {
                        if (selectedItem.row != null) {
                            AdminDashboard.defaults.OpenDivision = '';
                            AdminDashboard.defaults.paginationOpenPosition = 0;
                            AdminDashboard.defaults.OpenDivision = data.getValue(selectedItem.row, 0);
                            AdminDashboard.getOpenPositionPopUp();
                        }
                    }
                }

                google.visualization.events.addListener(chart, 'select', fnSelectHandler);

                chart.draw(dataview, options);
            }
        }

    },
    fnOpenPositionErrorCallBack: function (error) {
        var json = error.responseJSON;
        var strace = json.StackTrace.trim().split('at ')[1];
        var strace1 = strace.substring(strace, strace.indexOf('('));
        var srcFile = strace1.split('.');
        var obj = new Object();
        obj.ExceptionName = json.ExceptionType.substring(json.ExceptionType.lastIndexOf('.') + 1, json.ExceptionType.length);
        obj.ReportName = "Position Count";
        obj.ExceptionMessage = json.ExceptionMessage;
        obj.ExceptionSource = srcFile[srcFile.length - 2] + "\/" + srcFile[srcFile.length - 1];
        $.ajax({
            url: '../../Home/DoRecordExceptionLog',
            data: obj,
            method: 'POST',
            success: function (response) {
                debugger; console.log(response);
            },
            error: function (err) { console.log(err); }
        });
        //window.opener.parent.location.href = "../../Home/ErrorPage";
        //window.close();
    },


    getOpenPositionPopUp: function (regiontypename) {
        debugger;
        var _objData = new Object();
        _objData.DivisionCode = AdminDashboard.defaults.OpenDivision;
        _objData.CompanyCode = CompanyCode;
        _objData.RegionCode = RegionCode;
        _objData.RegionTypeName = regiontypename;
        var option = '';
        if ($('input[id="exclude"]:checked').length > 0) {
            option = 1;
        }
        else {
            option = 0;
        }
        _objData.Mode = option;
        _objData.PageNo = AdminDashboard.defaults.paginationOpenPosition;
        var action = _objData;
        var params = [];
        var p = {};
        p.name = "objData";
        p.value = _objData
        params.push(p);
        HDWebApiAjax.requestInvoke("GetOpenPositionPopUp", "", params, "POST", this.fnOpenPopUpSuccessCallBack, this.fnOpenPopUpErrorCallBack, null, "JSON");
    },
    fnOpenPopUpSuccessCallBack: function (jsonData) {
        debugger;
        $("#dvInfoContent").html("");
        var strTable = "";

        $("#dvMoreInfoHeader").html("Open Position By Division");
        $("#overylay .modal-body").html('<div style="height:550px;overflow-y:scroll;"><div id="pichartheader" align="center" class="parentDiv";></div><div id="pichartdata" align="center";></div><div id="dvInfoContentopen" class="parentDiv"> </div>');
        if (jsonData.length == 1) {

            AdminDashboard.defaults.paginationOpenPosition = 0;
            AdminDashboard.defaults.OpenDivision = jsonData[0].Division_Code;
            $('#pichartheader').html("<input type='text' style='height:10px;width:15px;background-color: #ff8100;' readonly />  " + jsonData[0].Region_Type_Name);
            $("#pichartdata").html("<h2 id='heading' Style='font-size:48px;margin-top: 1.25em;text-align: center;cursor: pointer;text-decoration: underline;' onclick=AdminDashboard.getOpenPositionPopUpGrid('" + encodeURIComponent(jsonData[0].Region_Type_Name) + "')>" + jsonData[0].Vacancy_Count + "</h2><br><h3 id='spanheding' Style='text-align: center;margin-top: 0.25em;font-size: 15px;'>Open Position</h3>");


        }
        else {           

           

            var data = new google.visualization.DataTable();
            data.addColumn('string', 'Division Name');
            data.addColumn('string', 'Division Code');
            data.addColumn('string', 'Region Type Name');
            data.addColumn('number', 'Vacancy Count');

            for (var i = 0; i < jsonData.length; i++) {
                data.addRow([jsonData[i].Division_Name, jsonData[i].Division_Code, jsonData[i].Region_Type_Name, jsonData[i].Vacancy_Count]);
            }

            $("#pichartdata").html("");
            if (data.getNumberOfRows() == 0) {

                $("#pichartdata").append("<div class='circle_division'>No Open Position</div>")
                //   return false;
            } else {




                var options = {
                    chartArea: { left: 0, top: 0, width: '100%', height: '100%' },
                    width: 250, height: 240,
                    fontSize: 12,
                    fontName: "Arial",
                    legend: {
                        position: 'right',
                        alignment: 'center',
                    },
                    is3D: false,
                    pieSliceText: 'lable'
                };
                var dataview1 = new google.visualization.DataView(data);
                dataview1.hideColumns([0]);
                dataview1.hideColumns([1]);

                var chart = new google.visualization.PieChart(document.getElementById('pichartdata'));

                function fnSelectHandler() {
                    debugger;
                    var selectedItem = chart.getSelection()[0];
                    if (selectedItem) {
                        if (selectedItem.row != null) {

                            AdminDashboard.defaults.OpenDivision = '';
                            AdminDashboard.defaults.paginationOpenPosition = 0;
                            AdminDashboard.defaults.OpenDivision = data.getValue(selectedItem.row, 1);
                            var regiontype = data.getValue(selectedItem.row, 2)
                            AdminDashboard.getOpenPositionPopUpGrid(encodeURIComponent(regiontype));

                        }
                    }
                }

                google.visualization.events.addListener(chart, 'select', fnSelectHandler);
                chart.draw(dataview1, options);
            }
        }

        
        $('#overylay').modal('show');

    },
    fnOpenPopUpErrorCallBack: function (error) {
        var json = error.responseJSON;
        var strace = json.StackTrace.trim().split('at ')[1];
        var strace1 = strace.substring(strace, strace.indexOf('('));
        var srcFile = strace1.split('.');
        var obj = new Object();
        obj.ExceptionName = json.ExceptionType.substring(json.ExceptionType.lastIndexOf('.') + 1, json.ExceptionType.length);
        obj.ReportName = "Open Position By Division(Misc)";
        obj.ExceptionMessage = json.ExceptionMessage;
        obj.ExceptionSource = srcFile[srcFile.length - 2] + "\/" + srcFile[srcFile.length - 1];
        $.ajax({
            url: '../../Home/DoRecordExceptionLog',
            data: obj,
            method: 'POST',
            success: function () { },
            error: function () { }
        });
        //window.location.href = "../../Home/ErrorPage";
        //window.close();
    },
    fnOpenPositionExpand: function () {
        debugger;
        var _objData = new Object();
        _objData.CompanyCode = CompanyCode;
        _objData.RegionCode = RegionCode;
        var action = _objData;
        var params = [];
        var p = {};
        p.name = "objData";
        p.value = _objData
        params.push(p);
        HDWebApiAjax.requestInvoke("GetOpenPositionCount", "", params, "POST", this.fnOpenExpandSuccessCallBack, this.fnOpenExpandErrorCallBack, null, "JSON");
        //$('#expandoverylay').overlay().load();
        $('#expandoverylay').modal('show');
    },
    fnOpenExpandSuccessCallBack: function (jsonData) {
        debugger;
        $('head').append("google.load('visualization', '1', { packages: ['charteditor', 'controls', 'corechart'] })");
        var total = 0;
        var OpenPosition = jsonData;

        for (var i = 0; i < OpenPosition.length; i++) {
            var value = OpenPosition[i].Vacancy_Count;
            total = total + value;
        }

        var data = new google.visualization.DataTable();

        data.addColumn('string', 'Division Code');
        data.addColumn('string', 'Division Name');
        data.addColumn('number', 'Division Count');



        for (var i = 0; i < OpenPosition.length; i++) {
            debugger;
            var percentage = (OpenPosition[i].Vacancy_Count / total) * 100
            percentage = percentage.toFixed(1);
            data.addRow([OpenPosition[i].Division_Code, OpenPosition[i].Division_Name + '(' + percentage + '%)', OpenPosition[i].Vacancy_Count]);
        }

        var options = {
            chartArea: { left: 0, top: 20, width: '100%', height: '100%' },
            width: 500, height: 350,
            fontSize: 14,
            fontName: "Arial",
            is3D: false,
            legend: {
                position: 'right',
                alignment: 'center',
            },
            tooltip: { isHtml: true },
        };

        if (data.getNumberOfRows() == 0) {
            $("#expandoverylay").html("");
            $("#expandoverylay").append("<div class='circle_division'>No Open Position</div>")
            //   return false;
        } else {
            $("dvexpand").html("");
            dataview = new google.visualization.DataView(data);
            dataview.hideColumns([0]);

            var chart = new google.visualization.PieChart(document.getElementById('dvexpand'));

            chart.draw(dataview, options);
        }
    },
    fnOpenExpandErrorCallBack: function (jsonData) {

    },
     getOpenPositionPopUpGrid: function (regiontypename) {
        debugger;
        var _objData = new Object();
        var regiontype = decodeURIComponent(regiontypename);
        _objData.DivisionCode = AdminDashboard.defaults.OpenDivision;
        _objData.CompanyCode = CompanyCode;
        _objData.RegionCode = RegionCode;
        _objData.RegionTypeName = regiontype;
        var option = '';
        if ($('input[id="exclude"]:checked').length > 0) {
            option = 1;
        }
        else {
            option = 0;
        }
        _objData.Mode = option;
        _objData.PageNo = AdminDashboard.defaults.paginationOpenPosition;
        var action = _objData;
        var params = [];
        var p = {};
        p.name = "objData";
        p.value = _objData
        params.push(p);
        HDWebApiAjax.requestInvoke("GetOpenPositionPopUp", "", params, "POST", this.fnOpenPopUpGridSuccessCallBack, this.fnOpenPopUpGridErrorCallBack, null, "JSON");
    },
     fnOpenPopUpGridSuccessCallBack: function (jsonData) {
         debugger;
         $("#dvInfoContent").html("");
         var strTable = "";
         $("#dvMoreInfoHeader").html("Open Position By Division");     
         AdminDashboard.fnSyncfusionGrid('dvInfoContentopen', jsonData);
         $('#overylay').modal('show');

     },
     fnOpenPopUpGridErrorCallBack: function (error) {
         var json = error.responseJSON;
         var strace = json.StackTrace.trim().split('at ')[1];
         var strace1 = strace.substring(strace, strace.indexOf('('));
         var srcFile = strace1.split('.');
         var obj = new Object();
         obj.ExceptionName = json.ExceptionType.substring(json.ExceptionType.lastIndexOf('.') + 1, json.ExceptionType.length);
         obj.ReportName = "Open Position By Division(Misc)";
         obj.ExceptionMessage = json.ExceptionMessage;
         obj.ExceptionSource = srcFile[srcFile.length - 2] + "\/" + srcFile[srcFile.length - 1];
         $.ajax({
             url: '../../Home/DoRecordExceptionLog',
             data: obj,
             method: 'POST',
             success: function () { },
             error: function () { }
         });
         //window.location.href = "../../Home/ErrorPage";
         //window.close();
     },
    getJoinerAttrition: function () {
        var _objData = new Object();
        _objData.CompanyCode = CompanyCode;
        _objData.UserCode = UserCode;
        var action = _objData;
        var params = [];
        var p = {};
        p.name = "objData";
        p.value = _objData
        params.push(p);
        HDWebApiAjax.requestInvoke("GetJoinerAttrition", "", params, "POST", this.fnJoinerAttritionSuccessCallBack, this.fnJoinerAttritionErrorCallBack, null, "JSON");
    },
  
    fnJoinerAttritionSuccessCallBack: function (jsonData) {
        if (jsonData[0].Joiners && jsonData[0].Attrition == -1) {
            $("#dvJoinerAttrition").text("Not Applicable");
            $('#dvJoinerAttrition').css('text-align', 'center');
            $('#dvJoinerAttrition').css('margin-top', '35%');
            $('#dvJoinerAttrition').css('font-size', '23px');
        }
        else {
            var JoinAttri = jsonData;

            var data = new google.visualization.DataTable();

            data.addColumn('string', 'Month');
            data.addColumn('number', JoinAttri[0].Month_Name);
            data.addColumn('number', JoinAttri[1].Month_Name);
            data.addColumn('number', JoinAttri[2].Month_Name);

            data.addRow(['Joiner', JoinAttri[0].Joiners, JoinAttri[1].Joiners, JoinAttri[2].Joiners]);
            data.addRow(['Attrition', JoinAttri[0].Attrition, JoinAttri[1].Attrition, JoinAttri[2].Attrition]);

            var options = {
               
                chartArea: { left: 45, top: 20, width: '100%', height: '100%' },
                width: 300, height: 230,
                vAxis: { title: '' }, isStacked: true,
                hAxis: { title: 'Joiner Vs Attrition' },
                fontSize: 11,
                fontName: "Arial",
                legend: "top",
                bars: "vertical"
            }

            var chart = new google.visualization.ColumnChart(document.getElementById('dvJoinerAttrition'));

            function selectHandler() {
                var selectedItem = chart.getSelection()[0];
                if (selectedItem) {
                    if (selectedItem.row != null) {
                        var getColumnName = data.getColumnLabel(selectedItem.column);
                        AdminDashboard.defaults.paginationJoiners = 0;
                        AdminDashboard.defaults.JoinerMonth = '';
                        AdminDashboard.defaults.JoinerYear = '';
                        AdminDashboard.defaults.JA_WiseOption = '';
                        AdminDashboard.defaults.JoinerMonth = AdminDashboard.GetMonthNumber(getColumnName.split("-")[0]),
                         AdminDashboard.defaults.JoinerYear = getColumnName.split("-")[1],
                         AdminDashboard.defaults.JA_WiseOption = data.getValue(selectedItem.row, 0);
                        AdminDashboard.GetJoinerAttritionPopUp();
                    }
                }
            }


            google.visualization.events.addListener(chart, 'select', selectHandler);
            chart.draw(data, options);
        }

    },
    fnJoinerAttritionErrorCallBack: function (error) {
        var json = error.responseJSON;
        var strace = json.StackTrace.trim().split('at ')[1];
        var strace1 = strace.substring(strace, strace.indexOf('('));
        var srcFile = strace1.split('.');
        var obj = new Object();
        obj.ExceptionName = json.ExceptionType.substring(json.ExceptionType.lastIndexOf('.') + 1, json.ExceptionType.length);
        obj.ReportName = "Joiner Vs Attrition(Misc)";
        obj.ExceptionMessage = json.ExceptionMessage;
        obj.ExceptionSource = srcFile[srcFile.length - 2] + "\/" + srcFile[srcFile.length - 1];
        $.ajax({
            url: '../../Home/DoRecordExceptionLog',
            data: obj,
            method: 'POST',
            success: function () { },
            error: function () { }
        });
        //window.location.href = "../../Home/ErrorPage";
        //window.close();
    },

    GetJoinerAttritionPopUp: function () {
        debugger;
        var _objData = new Object();
        _objData.Month = AdminDashboard.defaults.JoinerMonth;
        _objData.Year = AdminDashboard.defaults.JoinerYear;
        var option = AdminDashboard.defaults.JA_WiseOption;
        _objData.PageNo = AdminDashboard.defaults.paginationJoiners;
        AdminDashboard.JA_Wise = '';
        if (option == 'Joiner') {
            AdminDashboard.JA_Wise = 1;
        }
        else {
            AdminDashboard.JA_Wise = 2;
        }
        _objData.JA_Wise = AdminDashboard.JA_Wise;
        _objData.CompanyCode = CompanyCode;
        _objData.UserCode = UserCode;
        var action = _objData;
        var params = [];
        var p = {};
        p.name = "objData";
        p.value = _objData
        params.push(p);
        HDWebApiAjax.requestInvoke("GetJoinerAttritionPopUp", "", params, "POST", this.fnJAPopUpSuccessCallBack, this.fnJAPopUpErrorCallBack, null, "JSON");
    },
    fnJAPopUpSuccessCallBack: function (jsonData) {
        debugger;
        $("#dvInfoContent").html("");
        $("#dvMoreInfoHeader").html("Joiner Vs Attrition");
        AdminDashboard.fnSyncfusionGrid('dvInfoJoiner', jsonData);
        $('#joineroverylay').modal('show');
        //var strTable = "";
        //var sno = AdminDashboard.defaults.paginationJoiners;
        //if (JA_Wise == 1) {
        //    $('.clsModalTitle').html('Joiner Details');
        //    strTable += "<table cellspacing='0' cellpadding='0' class='table table-striped details' id='tblJoinerVsAttrition_' title='JoinerAttritions'><thead id='tblheader'><tr>";
        //    strTable += "<th style='background-color: rgb(51, 122, 183); top: 3545.45px;color: white;'>S.No</th>";
        //    strTable += "<th style='background-color: rgb(51, 122, 183); top: 3545.45px;color: white;'>Employee Number</th>";
        //    strTable += "<th style='background-color: rgb(51, 122, 183); top: 3545.45px;color: white;'>Employee Name</th>";
        //    strTable += "<th style='background-color: rgb(51, 122, 183); top: 3545.45px;color: white;'>User Name</th>";
        //    strTable += "<th style='background-color: rgb(51, 122, 183); top: 3545.45px;color: white;'>Designation</th>";
        //    strTable += "<th style='background-color: rgb(51, 122, 183); top: 3545.45px;color: white;'>Region Name</th>";
        //    strTable += "<th style='background-color: rgb(51, 122, 183); top: 3545.45px;color: white;'>Division Name</th>";
        //    strTable += "<th style='background-color: rgb(51, 122, 183); top: 3545.45px;color: white;width:10%;'>Date of Joining</th>";
        //    strTable += "<th style='background-color: rgb(51, 122, 183); top: 3545.45px;color: white;'>Mobile Number</th></tr></thead><tbody id='tblbody'>";
        //    for (var i = 0; i < jsonData.length; i++) {
        //        sno = sno + 1;
        //        var txtMobile = jsonData[i].Mobile == null ? "NA" : jsonData[i].Mobile;
        //        var Division = jsonData[i].Division_Values == null ? "" : jsonData[i].Division_Values;
        //        strTable += "<tr><td>" + sno + "</td><td>" + jsonData[i].Employee_Number + "</td><td>" + jsonData[i].Employee_Name + "</td><td>" + jsonData[i].User_Name + "</td><td>" + jsonData[i].User_Type_Name + "</td><td>" + jsonData[i].Region_Name + "</td><td>" + Division + "</td><td>" + jsonData[i].Date_Of_Joining + "</td><td>" + txtMobile + "</td></tr>";
        //        sno = sno++;
        //    }
        //    strTable += "</tbody></table>"

        //}
        //else {
        //    //  data: _objData,
        //    $('.clsModalTitle').html('Attrion Details');
        //    strTable += "<table cellspacing='0' cellpadding='0' class='table table-striped details' id='tblJoinerVsAttrition_' title='JoinerAttritions'><thead id='tblheader'><tr>";
        //    strTable += "<th style='background-color: rgb(51, 122, 183); top: 3545.45px;color: white;'>S.No</th>";
        //    strTable += "<th style='background-color: rgb(51, 122, 183); top: 3545.45px;color: white;'>Employee Number</th>";
        //    strTable += "<th style='background-color: rgb(51, 122, 183); top: 3545.45px;color: white;'>Employee Name</th>";
        //    strTable += "<th style='background-color: rgb(51, 122, 183); top: 3545.45px;color: white;'>User Name</th>";
        //    strTable += "<th style='background-color: rgb(51, 122, 183); top: 3545.45px;color: white;'>Designation</th>";
        //    strTable += "<th style='background-color: rgb(51, 122, 183); top: 3545.45px;color: white;'>Region Name</th>";
        //    strTable += "<th style='background-color: rgb(51, 122, 183); top: 3545.45px;color: white;'>Division Name</th>";
        //    // strTable += "<th style='background-color: rgb(51, 122, 183); top: 3545.45px;color: white;'>Resigned User Name</th>";
        //    strTable += "<th style='background-color: rgb(51, 122, 183); top: 3545.45px;color: white;'>Date of Joining</th>";
        //    strTable += "<th style='background-color: rgb(51, 122, 183); top: 3545.45px;color: white;'> Date of Resignation</th>";
        //    strTable += "<th style='background-color: rgb(51, 122, 183); top: 3545.45px;color: white;'>Total Number of Days Worked</th>";
        //    strTable += "<th style='background-color: rgb(51, 122, 183); top: 3545.45px;color: white;'>Mobile Number</th></tr></thead><tbody>";
        //    for (var i = 0; i < jsonData.length; i++) {
        //        sno = i + 1;
        //        var txtMobile = jsonData[i].Mobile == null ? "NA" : jsonData[i].Mobile;
        //        var Division = jsonData[i].Division_Values == null ? "" : jsonData[i].Division_Values;
        //        strTable += "<tr><td>" + sno + "</td><td>" + jsonData[i].Employee_Number + "</td><td>" + jsonData[i].Employee_Name + "</td><td>" + jsonData[i].User_Name + "</td><td>" + jsonData[i].User_Type_Name + "</td><td>" + jsonData[i].Region_Name + "</td><td>" + Division + "</td><td>" + jsonData[i].Date_Of_Joining + "</td><td>" + jsonData[i].Resignation_Date + "</td><td>" + jsonData[i].Days_Worked + "</td><td>" + txtMobile + "</td></tr>";
        //    }
        //    strTable += "</tbody></table>"
        //}
        //if (jsonData.length > 300) {
        //    var str = '';
        //    str = " <ul class='pager'><li><a id='Previous' onclick='AdminDashboard.fnpreviousJoiner();'>Previous</a></li><li><a id='next' onclick='AdminDashboard.fnNextJoiner();'>Next</a></li></ul>";
        //    $('#next').show();
        //    $('#paginationJoiner').html(str);
        //}
        //else {
        //    $('#next').hide();
        //}
        //$("#dvMoreInfoHeader").html("Joiner Vs Attrition");
        //$("#dvInfoJoiner").html(strTable);
        //$("#tblJoinerVsAttrition_").tableHeadFixer({ "left": 1 });
        ////$('#joineroverylay').overlay().load();
        //$('#joineroverylay').modal('show');
        //JA_Wise = "";

    },
    fnJAPopUpErrorCallBack: function (error) {
        var json = error.responseJSON;
        var strace = json.StackTrace.trim().split('at ')[1];
        var strace1 = strace.substring(strace, strace.indexOf('('));
        var srcFile = strace1.split('.');
        var obj = new Object();
        obj.ExceptionName = json.ExceptionType.substring(json.ExceptionType.lastIndexOf('.') + 1, json.ExceptionType.length);
        obj.ReportName = "Joiner Vs Attrition(Misc)";
        obj.ExceptionMessage = json.ExceptionMessage;
        obj.ExceptionSource = srcFile[srcFile.length - 2] + "\/" + srcFile[srcFile.length - 1];
        $.ajax({
            url: '../../Home/DoRecordExceptionLog',
            data: obj,
            method: 'Joiner VS Attrition(Misc)',
            success: function () { },
            error: function () { }
        });
        //window.location.href = "../../Home/ErrorPage";
        //window.close();
    },


    fnDcrTPCount: function (whichFunction) {
        debugger;
        switch (whichFunction) {
            case "CurMonthDcrLock":
                AdminDashboard.defaults.DcrLockStatus = "Current Month";
                AdminDashboard.getDcrLockCount();
                break;
            case "PreMonthDcrLock":
                AdminDashboard.defaults.DcrLockStatus = "Previous Month";
                AdminDashboard.getDcrLockCount();
                break;
            case "OverAllMonthDcrLock":
                AdminDashboard.defaults.DcrLockStatus = "Overall Past";
                AdminDashboard.getDcrLockCount();
                break;
            case "CurMonthTPUnavalibleLock":
                AdminDashboard.defaults.TPUnavalibleLockStatus = "Current Month";
                AdminDashboard.getTPUnavalibleLockCount();
                break;
            case "PreMonthTPUnavalibleLock":
                AdminDashboard.defaults.TPUnavalibleLockStatus = "Previous Month";
                AdminDashboard.getTPUnavalibleLockCount();
                break;
            case "OverAllMonthTPUnavalibleLock":
                AdminDashboard.defaults.TPUnavalibleLockStatus = "Overall Past";
                AdminDashboard.getTPUnavalibleLockCount();
                break;
            case "CurMonthTPApprovalLock":
                AdminDashboard.defaults.TPApprovalLockStatus = "Current Month";
                AdminDashboard.getTPApprovalLockCount();
                break;
            case "PreMonthTPApprovalLock":
                AdminDashboard.defaults.TPApprovalLockStatus = "Previous Month";
                AdminDashboard.getTPApprovalLockCount();
                break;
            case "OverAllMonthTPApprovalLock":
                AdminDashboard.defaults.TPApprovalLockStatus = "Overall Past";
                AdminDashboard.getTPApprovalLockCount();
                break;
            case "CurMonthTPNonApprovalLock":
                AdminDashboard.defaults.TPPendingLockStatus = "Current Month";
                AdminDashboard.getTpPendingLockCount();
                break;
            case "PreMonthTPNonApprovalLock":
                AdminDashboard.defaults.TPPendingLockStatus = "Previous Month";
                AdminDashboard.getTpPendingLockCount();
                break;
            case "OverAllMonthNonTPApprovalLock":
                AdminDashboard.defaults.TPPendingLockStatus = "Overall Past";
                AdminDashboard.getTpPendingLockCount();
                break;

            case "CurMonthSSPendingLock":
                AdminDashboard.defaults.SSPendingLockStatus = "Current Month";
                AdminDashboard.getSSPendingLockCount();
                break;
            case "PreMonthSSPendingLock":
                AdminDashboard.defaults.SSPendingLockStatus = "Previous Month";
                AdminDashboard.getSSPendingLockCount();
                break;
            case "OverAllMonthSSPendingLock":
                AdminDashboard.defaults.SSPendingLockStatus = "Overall Past";
                AdminDashboard.getSSPendingLockCount();
                break;

            case "CurMonthSSLock":
                AdminDashboard.defaults.SSApprovalLockStatus = "Current Month";
                AdminDashboard.getSSApprovalLockCount();
                break;
            case "PreMonthSSLock":
                AdminDashboard.defaults.SSApprovalLockStatus = "Previous Month";
                AdminDashboard.getSSApprovalLockCount();
                break;
            case "OverAllMonthSSLock":
                AdminDashboard.defaults.SSApprovalLockStatus = "Overall Past";
                AdminDashboard.getSSApprovalLockCount();
                break;
        }
    },
    getDcrLockCount: function () {
        debugger;
        var _objData = new Object();
        _objData.Lock_Type = "LOCK_LEAVE,IDLE_DCR";
        _objData.DcrTpLockStatus = AdminDashboard.defaults.DcrLockStatus;
        _objData.CompanyCode = CompanyCode;
        _objData.UserCode = UserCode;
        var action = _objData;
        var params = [];
        var p = {};
        p.name = "objData";
        p.value = _objData
        params.push(p);
        HDWebApiAjax.requestInvoke("GetDcrTPLockCounts", "", params, "POST", this.fnDcrLockSuccessCallBack, this.fnDcrLockErrorCallBack, null, "JSON");
    },
    fnDcrLockSuccessCallBack: function (jsonData) {
        debugger;
        if (jsonData != undefined && jsonData != null) {
            if (jsonData.LockedUserCount > 0) {

                $("#spnLockUser").text(jsonData.LockedUserCount);
                $("#spnLockDcr").text("(" + jsonData.LockedCount + ")");
                $("#spnDCRLockStatus").text(AdminDashboard.defaults.DcrLockStatus);

                $("#spnLockUser").off("click").click(function () {
                    AdminDashboard.getDcrLockCountPopUp();
                    AdminDashboard.defaults.paginationLock = 0;
                });

                $('#spnLockUser').css('cursor', 'pointer');
                $('#spnLockUser').css('text-decoration', 'underline');
            }
            else {
                $('#spnLockUser').css('cursor', 'default');
                $('#spnLockUser').css('text-decoration', 'blink');
                $("#spnLockUser").text('0');
                $("#spnLockDcr").text("(0)");
                $("#spnDCRLockStatus").text(AdminDashboard.defaults.DcrLockStatus);
            }
        }

    },
    fnDcrLockErrorCallBack: function (error) {

    },

    getTPUnavalibleLockCount: function () {
        debugger;
        var _objData = new Object();
        _objData.Lock_Type = "TP_UNAVAILABILITY";
        _objData.DcrTpLockStatus = AdminDashboard.defaults.TPUnavalibleLockStatus;
        _objData.CompanyCode = CompanyCode;
        _objData.UserCode = UserCode;
        var action = _objData;
        var params = [];
        var p = {};
        p.name = "objData";
        p.value = _objData
        params.push(p);
        HDWebApiAjax.requestInvoke("GetDcrTPLockCounts", "", params, "POST", this.fnTpLockSuccessCallBack, this.fnTpLockErrorCallBack, null, "JSON");
    },
    fnTpLockSuccessCallBack: function (jsonData) {
        debugger;
        if (jsonData != undefined && jsonData != null) {
            if (jsonData.LockedUserCount > 0) {

                $("#spnLockUserTP").text(jsonData.LockedUserCount);
                $("#spnLockTP").text("(" + jsonData.LockedCount + ")");
                $("#spnTPUnavalibleStatus").text(AdminDashboard.defaults.TPUnavalibleLockStatus);

                $("#spnLockUserTP").off("click").click(function () {
                    AdminDashboard.getTPUnavalibleLockCountPopUp();
                    AdminDashboard.defaults.paginationTpLock = 0;
                });

                $('#spnLockUserTP').css('cursor', 'pointer');
                $('#spnLockUserTP').css('text-decoration', 'underline');
            }
            else {
                $('#spnLockUserTP').css('cursor', 'default');
                $('#spnLockUserTP').css('text-decoration', 'blink');
                $("#spnLockUserTP").text('0');
                $("#spnLockTP").text("(0)");
                $("#spnTPUnavalibleStatus").text(AdminDashboard.defaults.TPUnavalibleLockStatus);
            }
        }
    },
    fnTpLockErrorCallBack: function (jsonData) {

    },
    getTPApprovalLockCount: function () {
        debugger;
        var _objData = new Object();
        _objData.Lock_Type = "TP_Approval_Lock";
        _objData.DcrTpLockStatus = AdminDashboard.defaults.TPApprovalLockStatus;
        _objData.CompanyCode = CompanyCode;
        _objData.UserCode = UserCode;
        var action = _objData;
        var params = [];
        var p = {};
        p.name = "objData";
        p.value = _objData
        params.push(p);
        HDWebApiAjax.requestInvoke("GetDcrTPLockCounts", "", params, "POST", this.fnTpAppLockSuccessCallBack, this.fnTpAppLockErrorCallBack, null, "JSON");
    },
    fnTpAppLockSuccessCallBack: function (jsonData) {
        if (jsonData != undefined && jsonData != null) {
            if (jsonData.LockedUserCount > 0) {

                $("#spnLockUserApproveTP").text(jsonData.LockedUserCount);
                $("#spnLockApproveTP").text("(" + jsonData.LockedCount + ")");
                $("#spnTPApprovalStatus").text(AdminDashboard.defaults.TPApprovalLockStatus);

                $("#spnLockUserApproveTP").off("click").click(function () {
                    AdminDashboard.getTPApprovalLockCountPopUp();
                    AdminDashboard.defaults.paginationTpAppLock = 0;
                });

                $('#spnLockUserApproveTP').css('cursor', 'pointer');
                $('#spnLockUserApproveTP').css('text-decoration', 'underline');
            }
            else {
                $('#spnLockUserApproveTP').css('cursor', 'default');
                $('#spnLockUserApproveTP').css('text-decoration', 'blink');
                $("#spnLockUserApproveTP").text('0');
                $("#spnLockApproveTP").text("(0)");
                $("#spnTPApprovalStatus").text(AdminDashboard.defaults.TPApprovalLockStatus);
            }
        }
    },
    fnTpAppLockErrorCallBack: function (jsonData) {

    },
    ///////////////////////////////////////////////////////////////////////////////////////////////////////
    getTpPendingLockCount: function () {
        debugger;
        var _objData = new Object();
        _objData.DcrTpLockStatus = AdminDashboard.defaults.TPPendingLockStatus;
        _objData.CompanyCode = CompanyCode;
        _objData.UserCode = UserCode;
        var action = _objData;
        var params = [];
        var p = {};
        p.name = "objData";
        p.value = _objData
        params.push(p);
        HDWebApiAjax.requestInvoke("GetTpPendingLockCounts", "", params, "POST", this.fnTpPendingLockSuccessCallBack, this.fnTpPendingLockErrorCallBack, null, "JSON");
    },
    fnTpPendingLockSuccessCallBack: function (jsonData) {
        debugger;
        if (jsonData != undefined && jsonData != null) {
            if (jsonData.User[0].User > 0) {

                $("#spnTpEnterUser").text(jsonData.User[0].User);
                $("#spnTpEnterDcr").text("(" + jsonData.Lock[0].Lock + ")");
                $("#spnTpPendingLockStatus").text(AdminDashboard.defaults.TPPendingLockStatus);

                $("#spnTpEnterUser").off("click").click(function () {
                    AdminDashboard.getTPPendingLockCountPopUp();
                    AdminDashboard.defaults.paginationTpPenLock = 0;
                });

                $('#spnTpEnterUser').css('cursor', 'pointer');
                $('#spnTpEnterUser').css('text-decoration', 'underline');
            }
            else {
                $('#spnTpEnterUser').css('cursor', 'default');
                $('#spnTpEnterUser').css('text-decoration', 'blink');
                $("#spnTpEnterUser").text('0');
                $("#spnTpEnterDcr").text("(0)");
                $("#spnTpPendingLockStatus").text(AdminDashboard.defaults.TPPendingLockStatus);
            }
        }

    },
    fnTpPendingLockErrorCallBack: function (jsonData) {

    },
    getSSPendingLockCount: function () {
        debugger;
        var _objData = new Object();
        _objData.DcrTpLockStatus = AdminDashboard.defaults.SSPendingLockStatus;
        _objData.CompanyCode = CompanyCode;
        _objData.UserCode = UserCode;
        var action = _objData;
        var params = [];
        var p = {};
        p.name = "objData";
        p.value = _objData
        params.push(p);
        HDWebApiAjax.requestInvoke("GetSSPendingLockCounts", "", params, "POST", this.fnSSPendingLockSuccessCallBack, this.fnSSPendingLockErrorCallBack, null, "JSON");
    },
    fnSSPendingLockSuccessCallBack: function (jsonData) {
        debugger;
        if (jsonData != undefined && jsonData != null) {
            if (jsonData.Lock[0].Lock > 0) {

                $("#spnPending").text(jsonData.User[0].User);
                $("#spnPendingTp").text("(" + jsonData.Lock[0].Lock + ")");
                $("#spnSSStatus").text(AdminDashboard.defaults.SSPendingLockStatus);

                $("#spnPending").off("click").click(function () {
                    AdminDashboard.getSSPendingLockCountPopUp();
                    AdminDashboard.defaults.paginationSSPenLock = 0;
                });

                $('#spnPending').css('cursor', 'pointer');
                $('#spnPending').css('text-decoration', 'underline');
            }
            else {
                $('#spnPending').css('cursor', 'default');
                $('#spnPending').css('text-decoration', 'blink');
                $("#spnPending").text('0');
                $("#spnPendingTp").text("(0)");
                $("#spnSSStatus").text(AdminDashboard.defaults.SSPendingLockStatus);
            }
        }

    },
    fnSSPendingLockErrorCallBack: function (jsonData) {

    },
    getSSApprovalLockCount: function () {
        debugger;
        var _objData = new Object();
        _objData.DcrTpLockStatus = AdminDashboard.defaults.SSApprovalLockStatus;
        _objData.CompanyCode = CompanyCode;
        _objData.UserCode = UserCode;
        var action = _objData;
        var params = [];
        var p = {};
        p.name = "objData";
        p.value = _objData
        params.push(p);
        HDWebApiAjax.requestInvoke("GetSSApprovalLockCounts", "", params, "POST", this.fnSSApprovalLockSuccessCallBack, this.fnSSApprovalLockErrorCallBack, null, "JSON");
    },
    fnSSApprovalLockSuccessCallBack: function (jsonData) {
        debugger;
        if (jsonData != undefined && jsonData != null) {
            if (jsonData.User[0].User > 0) {

                $("#spnApproveSS").text(jsonData.User[0].User);
                $("#spnLockApproveSS").text("(" + jsonData.Lock[0].Lock + ")");
                $("#spnSSApprovalStatus").text(AdminDashboard.defaults.SSApprovalLockStatus);

                $("#spnApproveSS").off("click").click(function () {
                    AdminDashboard.getSSApprovalLockCountPopUp();
                    AdminDashboard.defaults.paginationSSAppLock = 0;
                });

                $('#spnApproveSS').css('cursor', 'pointer');
                $('#spnApproveSS').css('text-decoration', 'underline');
            }
            else {
                $('#spnApproveSS').css('cursor', 'default');
                $('#spnApproveSS').css('text-decoration', 'blink');
                $("#spnApproveSS").text('0');
                $("#spnLockApproveSS").text("(0)");
                $("#spnSSApprovalStatus").text(AdminDashboard.defaults.SSApprovalLockStatus);
            }
        }

    },
    fnSSApprovalLockErrorCallBack: function (jsonData) {

    },

    getDcrLockCountPopUp: function () {
        debugger;
        $('#pagnation').hide();
        $('#Dcrpopup').modal('show');
        $('#dvDcrLock').html('<img src="../../Content/images/loader11.gif" style=" margin-left: 47%;"/>');
        //  $('#spnLockUser').html('<img style="width:50px;" src="../Content/images/loader11.gif" />');
        var _objData = new Object();
        _objData.Lock_Type = "LOCK_LEAVE,IDLE_DCR";
        _objData.DcrTpLockStatus = AdminDashboard.defaults.DcrLockStatus;
        _objData.CompanyCode = CompanyCode;
        _objData.UserCode = UserCode;
        _objData.PageNo = AdminDashboard.defaults.paginationLock;
        var action = _objData;
        var params = [];
        var p = {};
        p.name = "objData";
        p.value = _objData
        params.push(p);
        HDWebApiAjax.requestInvoke("GetDcrTPLockPopUpDetails", "", params, "POST", this.fnDCRPopUpSuccessCallBack, this.fnDCRPopUpLockErrorCallBack, null, "JSON");
    },
    fnDCRPopUpSuccessCallBack: function (jsonData) {
        $("#dvInfoContent").html("");
        AdminDashboard.fnSyncfusionGrid('dvDcrLock', jsonData);

        //var strTable = "";
        //var lock = '';
        //var mode = '';
        //var sno = AdminDashboard.defaults.paginationLock;
        //var divisionName = '';
        //strTable += "<table class='table table-striped' id='tblDCRLock'><thead><tr><th>S.No</th><th>User Name</th><th>Employee Name (Employee Number)</th><th>Region Name</th><th>Designation</th><th>Division Name</th><th>Locked Date</th><th style='width: 10%;'>DCR Date Locked</th><th>Lock Type</th><th>Mode</th></tr></thead><tbody>";
        //for (var i = 0; i < jsonData.length; i++) {
        //    sno = sno + 1;
        //    if (jsonData[i].Lock_Type == 'IDLE_DCR') {
        //        lock = 'Calendar Lock'
        //    }
        //    else {
        //        lock = 'DCR Day Lock';
        //    }
        //    if (jsonData[i].Ref_Key1 == 'MANUAL_LOCK') {
        //        mode = 'Manual';
        //    }
        //    else {
        //        mode = 'Automatic';
        //    }
        //    divisionName = jsonData[i].Division_Name == null ? "-" : jsonData[i].Division_Name;
        //    strTable += "<tr><td>" + sno + "</td><td>" + jsonData[i].User_Name + "</td><td>" + jsonData[i].Employee_Name + ' (' + jsonData[i].Employee_Number + ')' + "</td><td>" + jsonData[i].Region_Name + "</td><td>" + jsonData[i].User_Type_Name + "</td><td>" + divisionName + "</td><td style='width:10%;'>"
        //        + jsonData[i].Locked_Date + "</td><td>" + jsonData[i].DCR_Actual_Date + "</td><td>" + lock + "</td><td>" + mode + "</td></tr>";
        //    sno = sno++;
        //}
        //strTable += "</tbody></table>"
        //$("#dvMoreInfoHeader").html("DCR Lock Details");
        //$("#dvDcrLock").html('');
        //$("#dvDcrLock").html(strTable);
        //var value = $('#spnLockDcr').html().replace('(', '').replace(')', '');
        //if (value > 300 && jsonData.length >= 300) {
        //    var str = '';
        //    str = " <ul class='pager'><li><a id='Previous' onclick='AdminDashboard.fnprevious();'>Previous</a></li><li><a id='next' onclick='AdminDashboard.fnNext();'>Next</a></li></ul>";
        //    $('#pagnation').html(str);
        //    $('#next').show();
        //    $('#Previous').show();
        //}
        //else {
        //    $('#next').hide();
        //}
        //$('#pagnation').show();
        //$("#tblDCRLock").tableHeadFixer({ "left": 1 });
    },
    fnDCRPopUpLockErrorCallBack: function (error) {
        var json = error.responseJSON;
        var strace = json.StackTrace.trim().split('at ')[1];
        var strace1 = strace.substring(strace, strace.indexOf('('));
        var srcFle = strace1.split('.');
        var obj = new Object();
        obj.ExceptionName = json.ExceptionType.substring(json.ExceptionType.lastIndexOf('.') + 1, json.ExceptionType.length);
        obj.ReportName = "DCR Non Entry Lock";
        obj.ExceptionMessage = json.ExceptionMessage;
        obj.ExceptionSource = srcFile[srcFile.length - 2] + "\/" + srcFile[srcFile.length - 1];
        $.ajax({
            url: '../../Home/DoRecordExceptionLog',
            data: obj,
            method: 'POST',
            success: function () { },
            error: function () { }
        });
        //window.location.href = "../../Home/ErrorPage";
        //window.close();
    },

    getTPUnavalibleLockCountPopUp: function () {
        debugger
        $('#pagnationdvtpunavailabilitylock').hide();
        $('#tpunavailability').modal('show');
        $('#dvtpunavailabilitylock').html('<img src="../../Content/images/loader11.gif" style=" margin-left: 47%;"/>');
        var _objData = new Object();
        _objData.Lock_Type = "TP_UNAVAILABILITY";
        _objData.DcrTpLockStatus = AdminDashboard.defaults.TPUnavalibleLockStatus;
        _objData.CompanyCode = CompanyCode;
        _objData.UserCode = UserCode;
        _objData.PageNo = AdminDashboard.defaults.paginationTpLock;
        var action = _objData;
        var params = [];
        var p = {};
        p.name = "objData";
        p.value = _objData
        params.push(p);
        HDWebApiAjax.requestInvoke("GetDcrTPLockPopUpDetails", "", params, "POST", this.fnTPUNPopUpSuccessCallBack, this.fnTPUNPopUpLockErrorCallBack, null, "JSON");
    },
    fnTPUNPopUpSuccessCallBack: function (jsonData) {
        debugger;
        var sno = AdminDashboard.defaults.paginationTpLock
        $("#dvInfoContent").html("");
        AdminDashboard.fnSyncfusionGrid('dvtpunavailabilitylock', jsonData);

        //var strTable = "";
        //var divisionName = "";
        //strTable += "<table class='table table-striped'  id='tblTPUnavalible'><thead><tr><th>S.No</th><th>User Name</th><th>Employee Name (Employee Number)</th><th>Region Name</th><th>Designation</th><th>Division Name</th></th><th  style='width:10%';>Locked Date</th><th>Period</th></tr></thead><tbody>";
        //for (var i = 0; i < jsonData.length; i++) {
        //    sno = sno + 1;
        //    divisionName = jsonData[i].Division_Name == null ? "-" : jsonData[i].Division_Name;
        //    strTable += "<tr><td>" + sno + "</td><td>" + jsonData[i].User_Name + "</td><td>" + jsonData[i].Employee_Name + ' (' + jsonData[i].Employee_Number + ')' + "</td><td>" + jsonData[i].Region_Name + "</td><td>" + jsonData[i].User_Type_Name + "</td><td>" + divisionName + "</td><td>"
        //        + jsonData[i].Locked_Date + "</td><td>" + jsonData[i].Period + "</td></tr>";
        //    sno = sno++
        //}
        //strTable += "</tbody></table>"
        //$("#dvMoreInfoHeader").html("TP Unavailable Lock Details");
        //$("#dvtpunavailabilitylock").html('');
        //$("#dvtpunavailabilitylock").html(strTable);
        //$("#tblTPUnavalible").tableHeadFixer({ "left": 1 });
        //var value = $('#spnLockTP').html().replace('(', '').replace(')', '');
        //if (value > 300 && jsonData.length >= 300) {
        //    var str = '';
        //    str = " <ul class='pager'><li><a id='Previous' onclick='AdminDashboard.fnpreviousTp();'>Previous</a></li><li><a id='next' onclick='AdminDashboard.fnNextTp();'>Next</a></li></ul>";
        //    $('#pagnationdvtpunavailabilitylock').html(str);
        //    $('#next').show();
        //    $('#Previous').show();
        //}
        //else {
        //    $('#next').hide();
        //}
        //$('#pagnationdvtpunavailabilitylock').show();
    },

    fnTPUNPopUpLockErrorCallBack: function (error) {
        var json = error.responseJSON;
        var strace = json.StackTrace.trim().split('at ')[1];
        var strace1 = strace.substring(strace, strace.indexOf('('));
        var srcFile = strace1.split('.');
        var obj = new Object();
        obj.ExceptionName = json.ExceptionType.substring(json.ExceptionType.lastIndexOf('.') + 1, json.ExceptionType.length);
        obj.ReportName = "TP Non Entry Lock";
        obj.ExceptionMessage = json.ExceptionMessage;
        obj.ExceptionSource = srcFile[srcFile.length - 2] + "\/" + srcFile[srcFile.length - 1];
        $.ajax({
            url: '../../Home/DoRecordExceptionLog',
            data: obj,
            method: 'POST',
            success: function () { },
            error: function () { }
        });
        //window.location.href = "../../Home/ErrorPage";
        //window.close();
    },
    getTPApprovalLockCountPopUp: function () {
        $('#pagnationdvtplock').hide();
        $('#tppopup').modal('show');
        $('#dvtplock').html('<img src="../../Content/images/loader11.gif" style=" margin-left: 47%;"/>');
        debugger;
        var _objData = new Object();
        _objData.Lock_Type = "TP_Approval_Lock";
        _objData.DcrTpLockStatus = AdminDashboard.defaults.TPApprovalLockStatus;
        _objData.CompanyCode = CompanyCode;
        _objData.UserCode = UserCode;
        _objData.PageNo = AdminDashboard.defaults.paginationTpAppLock;
        var action = _objData;
        var params = [];
        var p = {};
        p.name = "objData";
        p.value = _objData
        params.push(p);
        HDWebApiAjax.requestInvoke("GetDcrTPLockPopUpDetails", "", params, "POST", this.fnTPAppPopUpSuccessCallBack, this.fnTPAppPopUpLockErrorCallBack, null, "JSON");
    },

    fnTPAppPopUpSuccessCallBack: function (jsonData) {
        debugger;
        $("#dvInfoContent").html("");
        AdminDashboard.fnSyncfusionGrid('dvtplock', jsonData);

        //var strTable = "";
        //var sno = AdminDashboard.defaults.paginationTpAppLock;
        //var divisionName = "";
        //strTable += "<table class='table table-striped'  id='tblTPApproval'><thead><tr><th>S.No</th><th>User Name</th><th>Employee Name (Employee Number)</th><th>Region Name</th><th>Designation</th><th>Division Name</th></th><th>Locked Date</th><th>Period</th></tr></thead><tbody>";
        //for (var i = 0; i < jsonData.length; i++) {
        //    sno = sno + 1;
        //    divisionName = jsonData[i].Division_Name == null ? "-" : jsonData[i].Division_Name;
        //    strTable += "<tr><td>" + sno + "</td><td>" + jsonData[i].User_Name + "</td><td>" + jsonData[i].Employee_Name + ' (' + jsonData[i].Employee_Number + ')' + "</td><td>" + jsonData[i].Region_Name + "</td><td>" + jsonData[i].User_Type_Name + "</td><td>" + divisionName + "</td><td style='width:10%;'>"
        //        + jsonData[i].Locked_Date + "</td><td>" + jsonData[i].Period + "</td></tr>";
        //    sno = sno++;
        //}
        //strTable += "</tbody></table>"
        //$("#dvMoreInfoHeader").html("TP Approval Lock Details");
        //$("#dvtplock").html('');
        //$("#dvtplock").html(strTable);
        //$("#tblTPApproval").tableHeadFixer({ "left": 1 });
        //var value = $('#spnLockApproveTP').html().replace('(', '').replace(')', '');
        //if (value > 300 && jsonData.length >= 300) {
        //    var str = '';
        //    str = " <ul class='pager'><li><a id='Previous' onclick='AdminDashboard.fnpreviousTpApp();'>Previous</a></li><li><a id='next' onclick='AdminDashboard.fnNextTpApp();'>Next</a></li></ul>";
        //    $('#pagnationdvtplock').html(str);
        //    $('#next').show();
        //    $('#Previous').show();
        //}
        //else {
        //    $('#next').hide();
        //}
        //$('#pagnationdvtplock').show();
    },
    fnTPAppPopUpLockErrorCallBack: function (error) {
        var json = error.responseJSON;
        var strace = json.StackTrace.trim().split('at ')[1];
        var strace1 = strace.substring(strace, strace.indexOf('('));
        var srcFile = strace1.split('.');
        var obj = new Object();
        obj.ExceptionName = json.ExceptionType.substring(json.ExceptionType.lastIndexOf('.') + 1, json.ExceptionType.length);
        obj.ReportName = "TP Not Approved Lock(Compliance)";
        obj.ExceptionMessage = json.ExceptionMessage;
        obj.ExceptionSource = srcFile[srcFile.length - 2] + "\/" + srcFile[srcFile.length - 1];
        $.ajax({
            url: '../../Home/DoRecordExceptionLog',
            data: obj,
            method: 'POST',
            success: function () { },
            error: function () { }
        });
        //window.location.href = "../../Home/ErrorPage";
        //window.close();
    },
    ////////////////////// TP Pending Approval Lock
    getTPPendingLockCountPopUp: function () {
        $('#pagnationdvtpPendinglock').hide();
        $('#tpPending').modal('show');
        $('#dvtpPendinglock').html('<img src="../../Content/images/loader11.gif" style=" margin-left: 47%;"/>');
        debugger;
        var _objData = new Object();
        _objData.DcrTpLockStatus = AdminDashboard.defaults.TPPendingLockStatus;
        _objData.CompanyCode = CompanyCode;
        _objData.UserCode = UserCode;
        _objData.PageNo = AdminDashboard.defaults.paginationTpPenLock;
        var action = _objData;
        var params = [];
        var p = {};
        p.name = "objData";
        p.value = _objData
        params.push(p);
        HDWebApiAjax.requestInvoke("GetTpPendingPopUpDetails", "", params, "POST", this.fnTPPopUpSuccessCallBack, this.fnTPPopUpLockErrorCallBack, null, "JSON");
    },

    fnTPPopUpSuccessCallBack: function (jsonData) {
        debugger;
        $("#dvInfoContent").html("");
        AdminDashboard.fnSyncfusionGrid('dvtpPendinglock', jsonData);

        //var strTable = "";
        //var sno = AdminDashboard.defaults.paginationTpPenLock;
        //var divisionName = "";
        //strTable += "<table class='table table-striped'  id='tblTPApproval'><thead><tr><th>S.No</th><th>User Name</th><th>Employee Name (Employee Number)</th><th>Region Name</th><th>Designation</th><th>Division Name</th><th>Subordinate User Name</th></th><th>Locked Date</th><th>Period</th></tr></thead><tbody>";
        //for (var i = 0; i < jsonData.length; i++) {
        //    sno = sno + 1;
        //    divisionName = jsonData[i].Division_Name == null ? "-" : jsonData[i].Division_Name;
        //    strTable += "<tr><td>" + sno + "</td><td>" + jsonData[i].User_Name + "</td><td>" + jsonData[i].Employee_Name + ' (' + jsonData[i].Employee_Number + ')' + "</td><td>" + jsonData[i].Region_Name + "</td><td>" + jsonData[i].User_Type_Name + "</td><td>" + divisionName + "</td><td>" + jsonData[i].Tp_User_Name + "</td><td style='width:10%;'>"
        //        + jsonData[i].Locked_Date + "</td><td>" + jsonData[i].Period + "</td></tr>";
        //    sno = sno++;
        //}
        //strTable += "</tbody></table>"
        //$("#dvtpPendinglock").html('');
        //$("#dvtpPendinglock").html(strTable);
        //$("#tblTPApproval").tableHeadFixer({ "left": 1 });
        //var value = $('#spnTpEnterDcr').html().replace('(', '').replace(')', '');
        //if (value > 300 && jsonData.length >= 300) {
        //    var str = '';
        //    str = " <ul class='pager'><li><a id='Previous' onclick='AdminDashboard.fnpreviousTpPen();'>Previous</a></li><li><a id='next' onclick='AdminDashboard.fnNextTpPen();'>Next</a></li></ul>";
        //    $('#pagnationdvtpPendinglock').html(str);
        //    $('#next').show();
        //    $('#Previous').show();
        //}
        //else {
        //    $('#next').hide();
        //}
        //$('#pagnationdvtpPendinglock').show();
    },
    fnTPPopUpLockErrorCallBack: function (error) {
        var json = error.responseJSON;
        var strace = json.StackTrace.trim().split('at ')[1];
        var strace1 = strace.substring(strace, strace.indexOf('('));
        var srcFile = strace1.split('.');
        var obj = new Object();
        obj.ExceptionName = json.ExceptionType.substring(json.ExceptionType.lastIndexOf('.') + 1, json.ExceptionType.length);
        obj.ReportName = "TP Pending Approval Lock";
        obj.ExceptionMessage = json.ExceptionMessage;
        obj.ExceptionSource = srcFile[srcFile.length - 2] + "\/" + srcFile[srcFile.length - 1];
        $.ajax({
            url: '../../Home/DoRecordExceptionLog',
            data: obj,
            method: 'POST',
            success: function () { },
            error: function () { }
        });
        //window.location.href = "../../Home/ErrorPage";
        //window.close();

    },

    ///////////////////////////////////SS Pending Entered Lock
    getSSPendingLockCountPopUp: function () {
        $('#pagnationdvSSPendinglock').hide();
        $('#SSPending').modal('show');
        $('#dvSSPendinglock').html('<img src="../../Content/images/loader11.gif" style=" margin-left: 47%;"/>');
        debugger;
        var _objData = new Object();
        _objData.DcrTpLockStatus = AdminDashboard.defaults.SSPendingLockStatus;
        _objData.CompanyCode = CompanyCode;
        _objData.UserCode = UserCode;
        _objData.PageNo = AdminDashboard.defaults.paginationSSPenLock;
        var action = _objData;
        var params = [];
        var p = {};
        p.name = "objData";
        p.value = _objData
        params.push(p);
        HDWebApiAjax.requestInvoke("GetSSPendingPopUpDetails", "", params, "POST", this.fnSSPopUpSuccessCallBack, this.fnSSPopUpLockErrorCallBack, null, "JSON");
    },

    fnSSPopUpSuccessCallBack: function (jsonData) {
        debugger;
        var strTable = "";
        $("#dvSSPendinglock").html('');
        AdminDashboard.fnSyncfusionGrid('dvSSPendinglock', jsonData);
        //var sno = AdminDashboard.defaults.paginationSSPenLock;
        //var divisionName = '';
        //strTable += "<table class='table table-striped'  id='tblSSApproval'><thead><tr><th>S.No</th><th>User Name</th><th>Employee Name (Employee Number)</th><th>Region Name</th><th>Designation</th><th>Division Name</th></th><th>Locked Date</th><th>Period</th></tr></thead><tbody>";
        //for (var i = 0; i < jsonData.length; i++) {
        //    sno = sno + 1;
        //    divisionName = jsonData[i].Division_Name == null ? "-" : jsonData[i].Division_Name;
        //    strTable += "<tr><td>" + sno + "</td><td>" + jsonData[i].User_Name + "</td><td>" + jsonData[i].Employee_Name + ' (' + jsonData[i].Employee_Number + ')' + "</td><td>" + jsonData[i].Region_Name + "</td><td>" + jsonData[i].User_Type_Name + "</td><td>" + divisionName + "</td><td style='width:10%'>"
        //        + jsonData[i].Locked_Date + "</td><td>" + jsonData[i].Period + "</td></tr>";
        //    sno = sno++;
        //}
        //strTable += "</tbody></table>"
        //$("#dvSSPendinglock").html(strTable);
        //$("#tblSSApproval").tableHeadFixer({ "left": 1 });
        //var value = $('#spnPendingTp').html().replace('(', '').replace(')', '');
        //if (value > 300 && jsonData.length >= 300) {
        //    var str = '';
        //    str = " <ul class='pager'><li><a id='Previous' onclick='AdminDashboard.fnpreviousSSPen();'>Previous</a></li><li><a id='next' onclick='AdminDashboard.fnNextSSPen();'>Next</a></li></ul>";
        //    $('#pagnationdvSSPendinglock').html(str);
        //    $('#next').show();
        //    $('#Previous').show();
        //}
        //else {
        //    $('#next').hide();
        //}
        //$('#pagnationdvSSPendinglock').show();
    },
    fnSSPopUpLockErrorCallBack: function (error) {
        var json = error.responseJSON;
        var strace = json.StackTrace.trim().split('at ')[1];
        var strace1 = strace.substring(strace, strace.indexOf('('));
        var srcFile = strace1.split('.');
        var obj = new Object();
        obj.ExceptionName = json.ExceptionType.substring(json.ExceptionType.lastIndexOf('.') + 1, json.ExceptionType.length);
        obj.ReportName = "SS Pending Entered Lock(Compliance)";
        obj.ExceptionMessage = json.ExceptionMessage;
        obj.ExceptionSource = srcFile[srcFile.length - 2] + "\/" + srcFile[srcFile.length - 1];
        $.ajax({
            url: '../../Home/DoRecordExceptionLog',
            data: obj,
            method: 'POST',
            success: function () { },
            error: function () { }
        });
        //window.location.href = "../../Home/ErrorPage";
        //window.close();
    },
    ////////////////// SS Non Approval Lock
    getSSApprovalLockCountPopUp: function () {
        $('#pagnationSSApprovallock').hide();
        $('#SSApproval').modal('show');
        $('#SSApprovallock').html('<img src="../../Content/images/loader11.gif" style=" margin-left: 47%;"/>');
        debugger;
        var _objData = new Object();
        _objData.DcrTpLockStatus = AdminDashboard.defaults.SSApprovalLockStatus;
        _objData.CompanyCode = CompanyCode;
        _objData.UserCode = UserCode;
        _objData.PageNo = AdminDashboard.defaults.paginationSSAppLock;
        var action = _objData;
        var params = [];
        var p = {};
        p.name = "objData";
        p.value = _objData
        params.push(p);
        HDWebApiAjax.requestInvoke("GetSSApprovalPopUpDetails", "", params, "POST", this.fnSSApprovalPopUpSuccessCallBack, this.fnSSApprovalPopUpLockErrorCallBack, null, "JSON");
    },

    fnSSApprovalPopUpSuccessCallBack: function (jsonData) {
        debugger;
        AdminDashboard.fnSyncfusionGrid('SSApprovallock', jsonData);
        //var strTable = "";
        //var sno = AdminDashboard.defaults.paginationSSAppLock;
        //var divisionName = '';
        //strTable += "<table class='table table-striped'  id='tblSSApproval'><thead><tr><th>S.No</th><th>User Name</th><th>Employee Name (Employee Number)</th><th>Region Name</th><th>Designation</th><th>Division Name</th><th>Subordinate User Name</th><th>Subordinate Region Name</th></th><th>Locked Date</th><th>Period</th></tr></thead><tbody>";
        //for (var i = 0; i < jsonData.length; i++) {
        //    sno = sno + 1;
        //    divisionName = jsonData[i].Division_Name == null ? "-" : jsonData[i].Division_Name;
        //    strTable += "<tr><td>" + sno + "</td><td>" + jsonData[i].User_Name + "</td><td>" + jsonData[i].Employee_Name + ' (' + jsonData[i].Employee_Number + ')' + "</td><td>" + jsonData[i].Region_Name + "</td><td>" + jsonData[i].User_Type_Name + "</td><td>" + divisionName + "</td><td>" + jsonData[i].Tp_User_Name + "</td><td>" + jsonData[i].Sub_RegionName + "</td><td style='width:10%'>"
        //        + jsonData[i].Locked_Date + "</td><td>" + jsonData[i].Period + "</td></tr>";
        //    sno = sno++;
        //}
        //strTable += "</tbody></table>"
        //$("#SSApprovallock").html('');
        //$("#SSApprovallock").html(strTable);
        //$("#tblSSApproval").tableHeadFixer({ "left": 1 });
        //var value = $('#spnLockApproveSS').html().replace('(', '').replace(')', '');
        //if (value > 300 && jsonData.length >= 300) {
        //    var str = '';
        //    str = " <ul class='pager'><li><a id='Previous' onclick='AdminDashboard.fnpreviousSSApp();'>Previous</a></li><li><a id='next' onclick='AdminDashboard.fnNextSSApp();'>Next</a></li></ul>";
        //    $('#pagnationSSApprovallock').html(str);
        //    $('#next').show();
        //    $('#Previous').show();
        //}
        //else {
        //    $('#next').hide();
        //}
        //$('#pagnationSSApprovallock').show();
    },
    fnSSApprovalPopUpLockErrorCallBack: function (error) {
        var json = error.responseJSON;
        var strace = json.StackTrace.trim().split('at ')[1];
        var strace1 = strace.substring(strace, strace.indexOf('('));
        var srcFile = strace1.split('.');
        var obj = new Object();
        obj.ExceptionName = json.ExceptionType.substring(json.ExceptionType.lastIndexOf('.') + 1, json.ExceptionType.length);
        obj.ReportName = "SS Pending Approval Lock(Compliance)";
        obj.ExceptionMessage = json.ExceptionMessage;
        obj.ExceptionSource = srcFile[srcFile.length - 2] + "\/" + srcFile[srcFile.length - 1];
        $.ajax({
            url: '../../Home/DoRecordExceptionLog',
            data: obj,
            method: 'POST',
            success: function () { },
            error: function () { }
        });
        //window.location.href = "../../Home/ErrorPage";
        //window.close();
    },
    getMarketingCampaignCount: function () {
        var _objData = new Object();
        _objData.CompanyCode = CompanyCode;
        _objData.UserCode = UserCode;
        _objData.RegionCode = RegionCode;
        var action = _objData;
        var params = [];
        var p = {};
        p.name = "objData";
        p.value = _objData
        params.push(p);
        HDWebApiAjax.requestInvoke("GetMarketingCampaignCount", "", params, "POST", this.fnMCCountSuccessCallBack, this.fnMCCountErrorCallBack, null, "JSON");
    },

    fnMCCountSuccessCallBack: function (jsonData) {
        debugger;
        if (jsonData != undefined && jsonData != null) {
            if (jsonData.ActiveRuningMcCount > 0) {

                $("#spnAcctiveRunMc").text(jsonData.ActiveRuningMcCount);
               

                $("#spnAcctiveRunMc").click(function () {
                    AdminDashboard.getMarketingCampaignCountPopUpNew();
                });

                $('#spnAcctiveRunMc').css('cursor', 'pointer');
                $('#spnAcctiveRunMc').css('text-decoration', 'underline');
            }
            else {
                $('#spnAcctiveRunMc').css('cursor', 'default');
                $('#spnAcctiveRunMc').css('text-decoration', 'blink');
            }
        }
    },
    fnMCCountErrorCallBack: function (error) {
        var json = error.responseJSON;
        var strace = json.StackTrace.trim().split('at ')[1];
        var strace1 = strace.substring(strace, strace.indexOf('('));
        var srcFile = strace1.split('.');
        var obj = new Object();
        obj.ExceptionName = json.ExceptionType.substring(json.ExceptionType.lastIndexOf('.') + 1, json.ExceptionType.length);
        obj.ReportName = "Marketing Campaign Count";
        obj.ExceptionMessage = json.ExceptionMessage;
        obj.ExceptionSource = srcFile[srcFile.length - 2] + "\/" + srcFile[srcFile.length - 1];
        $.ajax({
            url: '../../Home/DoRecordExceptionLog',
            data: obj,
            method: 'POST',
            success: function () { },
            error: function () { }
        });
        //window.location.href = "../../Home/ErrorPage";
        //window.close();
    },

    getMarketingCampaignCountPopUpNew: function () {
        $('#main').load('../../Dashboard/MarketingCampaign/' + 'admin');
    },
    getMarketingCampaignCountPopUp: function () {
        var _objData = new Object();
        _objData.CompanyCode = CompanyCode;
        _objData.RegionCode = RegionCode;
        var action = _objData;
        var params = [];
        var p = {};
        p.name = "objData";
        p.value = _objData
        params.push(p);
        HDWebApiAjax.requestInvoke("GetMarketingCampaignCountPopUp", "", params, "POST", this.fnMCPoPUpSuccessCallBack, this.fnMCPoPUpErrorCallBack, null, "JSON");
    },
    fnMCPoPUpSuccessCallBack: function (jsonData) {
        debugger;
        $("#tblMarketingCampRegionDetail").hide();
        $("#tblMarketingCampDoctorDetail").hide();
        $("#mcregdetails").hide();
        $("#mcdocdetails").hide();
        $('#titleReg').hide();
        $('#titleDoc').hide();
        var strTable = "";
        var sno = '';        
        strTable += "<table class='table table-striped details' id='tblMarketingCampaigninfo'><thead><tr>";
        strTable += "<th style='background-color: rgb(51, 122, 183); top: 3545.45px;color: white;'>S.No</th>";
        strTable += "<th style='background-color: rgb(51, 122, 183); top: 3545.45px;color: white;'>Campaign Name</th><th style='background-color: rgb(51, 122, 183); top: 3545.45px;color: white;'>Start Date</th><th style='background-color: rgb(51, 122, 183); top: 3545.45px;color: white;'>End Date</th>";
        strTable += "</th><th style='background-color: rgb(51, 122, 183); top: 3545.45px;color: white;'>Doctor Count</th><th style='background-color: rgb(51, 122, 183); top: 3545.45px;color: white;'>Region Count</th><th style='background-color: rgb(51, 122, 183); top: 3545.45px;color: white;'>Proposed Count</th>";
        strTable += "<th style='background-color: rgb(51, 122, 183); top: 3545.45px;color: white;'>Mapped Doctor Count</th><th style='background-color: rgb(51, 122, 183); top: 3545.45px;color: white;'>Mapped Percentage</th></tr></thead><tbody>";
        for (var i = 0; i < jsonData.length; i++) {
            var sno = i + 1;
            strTable += '<tr>';
            strTable += '<td>' + sno + '</td>';
            strTable += '<td style="text-decoration: underline;color:blue;cursor: pointer;" onclick=AdminDashboard.GetMarketingCampaignRegionPopUP(\'' + jsonData[i].Campaign_Code + '\',\'' + jsonData[i].MC_Start_Date + '\',\'' + jsonData[i].MC_End_Date + '\',\'' + jsonData[i].Campaign_Name.replace(/ /g, '_') + '\')>' + jsonData[i].Campaign_Name + '</td>';
            strTable += '<td>' + jsonData[i].MC_Start_Date + '</td>';
            strTable += '<td>' + jsonData[i].MC_End_Date + '</td>';
            strTable += '<td>' + jsonData[i].Customer_Count + '</td>';
            strTable += '<td>'+ jsonData[i].Region_Count + '</td>';
            strTable += '<td>' + jsonData[i].Proposed_Count + '</td>';
            strTable += '<td>' + jsonData[i].Actual_Met_Count + '</td>';
            strTable += '<td>' + jsonData[i].Coverage_percentage + '%</td>';
            strTable += '</tr>';
        }
        strTable += "</tbody></table>"
        $("#tblMarketingCampDetail").html(strTable);
        $("#tblMarketingCampaigninfo").tableHeadFixer({ "left": 1 });

    },
    fnMCPoPUpErrorCallBack: function (error) {
        var json = error.responseJSON;
        var strace = json.StackTrace.trim().split('at ')[1];
        var strace1 = strace.substring(strace, strace.indexOf('('));
        var srcFile = strace1.split('.');
        var obj = new Object();
        obj.ExceptionName = json.ExceptionType.substring(json.ExceptionType.lastIndexOf('.') + 1, json.ExceptionType.length);
        obj.ReportName = "Marketing Campaign Count Popup";
        obj.ExceptionMessage = json.ExceptionMessage;
        obj.ExceptionSource = srcFile[srcFile.length - 2] + "\/" + srcFile[srcFile.length - 1];
        $.ajax({
            url: '../../Home/DoRecordExceptionLog',
            data: obj,
            method: 'POST',
            success: function () { },
            error: function () { }
        });
        //window.location.href = "../../Home/ErrorPage";
        //window.close();
    },
    GetMarketingCampaignRegionPopUP: function (Campaign_Code, StartDate, EndDate, Campaign_Name) {
        startdate = StartDate;
        enddate = EndDate;
        camp_name = Campaign_Name.replace(/_/g,' ');
        var _objData = new Object();
        _objData.Campaign_Code = Campaign_Code;
        var Camp_Name = Campaign_Name.replace(/_/g, ' ');
        _objData.CompanyCode = CompanyCode;
        _objData.RegionCode = RegionCode;
        var action = _objData;
        var params = [];
        var p = {};
        p.name = "objData";
        p.value = _objData
        params.push(p);
        HDWebApiAjax.requestInvoke("GetMarketingCampaignRegionPopUP", "", params, "POST", this.fnMCRegionSuccessCallBack, this.fnMCRegionErrorCallBack, null, "JSON");
        $('#titleReg').html('Marketing Campaign Region Based Details for "' + Camp_Name + '" during the period '+StartDate+ ' and ' + EndDate+'' );
    },

    fnMCRegionSuccessCallBack: function (jsonData) {
        debugger;
        $("#tblMarketingCampRegionDetail").show();
        $("#tblMarketingCampDoctorDetail").hide();
        $("#mcregdetails").show();
        $("#mcdocdetails").hide();
        $('#titleReg').show();
        $('#titleDoc').hide();
        var Cam_Name = camp_name;
        camp_name = "";
        var strTable = "";
        strTable += "<table class='table table-striped details' id='tblMarketingCampaignMap'><thead><tr>"
        strTable += "<th style='background-color: rgb(51, 122, 183); top: 3545.45px;color: white;'>S.No</th><th style='background-color: rgb(51, 122, 183); top: 3545.45px;color: white;'>Region Name</th>"
        strTable += "<th style='background-color: rgb(51, 122, 183); top: 3545.45px;color: white;'> Driven By</th><th style='background-color: rgb(51, 122, 183); top: 3545.45px;color: white;'>Doctors Mapped</th>"
        strTable += " <th style='background-color: rgb(51, 122, 183); top: 3545.45px;color: white;'>Doctors Met</th><th style='background-color: rgb(51, 122, 183); top: 3545.45px;color: white;'>Visit Count</th>"
        strTable += "<th style='background-color: rgb(51, 122, 183); top: 3545.45px;color: white;'>Coverage Percentage</th></tr></thead><tbody>";
        var lnkcreatedby = '';
        for (var i = 0; i < jsonData.length; i++) {
            var l = i + 1;
            var Created_By = jsonData[i].Employee_Name;
            if (Created_By == null || Created_By == "") {
                Created_By = '-';
                lnkcreatedby = '';
            }
            else {
                Created_By = jsonData[i].Employee_Name + "(" + jsonData[i].User_Type_Name + ")";
                lnkcreatedby = jsonData[i].Created_by;
            }
            if (jsonData[i].Doctor_Count == 0) {
                strTable += "<tr><td>" + l + "</td><td>" + jsonData[i].Region_Name + "</td>";
            }
            else {
                strTable += '<tr><td>' + l + '</td><td style="text-decoration: underline;color:blue;cursor: pointer;" onclick=AdminDashboard.GetMarketingCampaignDoctorPopUP(\'' + jsonData[i].Campaign_Code + '\',\'' + jsonData[i].Region_Code + '\',\'' + jsonData[i].Region_Name.replace(/ /g,'_') + '\',\'' + jsonData[i].Created_by.replace(/ /g,'_') + '\',\'' + Cam_Name.replace(/ /g,'_') + '\')>' + jsonData[i].Region_Name + '</td>';
            }
            strTable += "<td>" + Created_By + "</td><td>" + jsonData[i].Doctor_Count + "</td><td>" + jsonData[i].Actual_Met_Count + "</td><td>" + jsonData[i].Visit_Count + "</td><td>" + jsonData[i].Coverage_percentage + "%</td></tr>";
        }
        strTable += "</tbody></table>"
        $("#tblMarketingCampRegionDetail").html(strTable);
        $("#tblMarketingCampaignMap").tableHeadFixer({ "left": 1 });
        $('html,body').animate({
            scrollTop: $("#tblMarketingCampRegionDetail").offset().top
        },
'slow');
        //$('#tblMarketingCampaignMap').DataTable(
        //       {
        //           "paging": false,
        //           "ordering": false,
        //           //"info": false
        //           "bRetrieve": true,
        //           "bDestroy": true,
        //           "bPaginate": false,
        //       });
        //$(".TableTools_clipboard, .TableTools_csv, .TableTools_print,.dataTables_info").hide();
        AdminDashboard.UnblockUI("tblMarketingCampaign");


    },
    fnMCRegionErrorCallBack: function (jsonData) {

    },

    GetMarketingCampaignDoctorPopUP: function (Campaign_Code, Region_Code, Region_Name,  Created_By, Campaign_Name) {
        debugger;
        var _objData = new Object();
        _objData.Campaign_Code = Campaign_Code;
        _objData.RegionCode = Region_Code;
        var Reg_Name = Region_Name.replace(/_/g, ' ');
        var cam_Name = Campaign_Name.replace(/_/g,' ');
        _objData.Created_By = Created_By.replace(/_/g, ' ');
        _objData.CompanyCode = CompanyCode;
        var action = _objData;
        var params = [];
        var p = {};
        p.name = "objData";
        p.value = _objData
        params.push(p);
        HDWebApiAjax.requestInvoke("GetMarketingCampaignDetailsForDoctor", "", params, "POST", this.fnMCDoctorSuccessCallBack, this.fnMCDoctorErrorCallBack, null, "JSON");
        $('#titleDoc').html('Marketing Campaign Doctor Based Details for "' + cam_Name + '" & " ' + Reg_Name + '" during the period ' + startdate + ' and ' + enddate + '');
    },
    fnMCDoctorSuccessCallBack: function (jsonData) {
        $("#tblMarketingCampDoctorDetail").show();
        $('#titleDoc').show();
        $("#mcdocdetails").show();
        var strTable = "";
        var sno = '';
        strTable += "<table class='table table-striped details' id='tblMarketingCampaignUserMapped'><thead><tr>"
        strTable += "<th style='background-color: rgb(51, 122, 183); top: 3545.45px;color: white;'>S.No</th>";
        strTable += "<th style='background-color: rgb(51, 122, 183); top: 3545.45px;color: white;'>Doctor Name</th><th style='background-color: rgb(51, 122, 183); top: 3545.45px;color: white;'>Category Name</th>";
        strTable += "<th style='background-color: rgb(51, 122, 183); top: 3545.45px;color: white;'>Speciality Name</th><th style='background-color: rgb(51, 122, 183); top: 3545.45px;color: white;'>MDL Number</th>";
        strTable += "<th style='background-color: rgb(51, 122, 183); top: 3545.45px;color: white;'>Status</th><th style='background-color: rgb(51, 122, 183); top: 3545.45px;color: white;'>Visit Type</th>";
        strTable += "<th style='background-color: rgb(51, 122, 183); top: 3545.45px;color: white;'>Visit Count</th></tr></thead><tbody>";
        for (var i = 0; i < jsonData.length; i++) {
            sno = i + 1;
            strTable += "<tr><td>" + sno + "</td><td>" + jsonData[i].Customer_Name + "</td><td>" + jsonData[i].Category_Name + "</td><td>" + jsonData[i].Speciality_Name + "</td><td>" + jsonData[i].MDL_Number + "</td><td>" + jsonData[i].Customer_Status + "</td><td>" + jsonData[i].Visit_Mode + "</td><td>" + jsonData[i].Actual_Met_Count + "</td></tr>";
        }
        strTable += "</tbody></table>"
        $("#tblMarketingCampDoctorDetail").html(strTable);
        $("#tblMarketingCampaignUserMapped").tableHeadFixer({ "left": 1 });
        $('html,body').animate({
            scrollTop: $("#tblMarketingCampDoctorDetail").offset().top
        },
'slow');
        //$('#tblMarketingCampaignUserMapped').DataTable(
        //             {
        //                 "paging": false,
        //                 "ordering": false,
        //                 //"info": false
        //                 "bRetrieve": true,
        //                 "bDestroy": true,
        //                 "bPaginate": false,
        //             });
        //$(".TableTools_clipboard, .TableTools_csv, .TableTools_print,.dataTables_info").hide();
    },
    fnMCDoctorErrorCallBack: function (jsonData) {

    },
    getDCRCompliance: function () {
        debugger;
        $('#spnDCRCompliance').html('<img style="width:50px;" src="../../Content/images/loader11.gif" />');
        var _objData = new Object();
        _objData.MonthType = AdminDashboard.defaults.DcrComplianceMonthType;
        _objData.CompanyCode = CompanyCode;
        _objData.UserCode = UserCode;
        var action = _objData;
        var params = [];
        var p = {};
        p.name = "objData";
        p.value = _objData
        params.push(p);
        HDWebApiAjax.requestInvoke("GetDCRCompliance", "", params, "POST", this.fnDCRComplainceSuccessCallBack, this.fnDCRComplainceErrorCallBack, null, "JSON");
    },
    fnDCRComplainceSuccessCallBack: function (jsonData) {
        if (AdminDashboard.defaults.DcrComplianceMonthType == "CURRENT") {
            $(".spnCurPreTxt").text("Current Month");
        }
        else {
            $(".spnCurPreTxt").text("Previous Month");
        }

        var monthstatus = AdminDashboard.defaults.DcrComplianceMonthType;

        if (jsonData != undefined && jsonData != null) {
            $("#spnDCRCompliance").show();
            $("#spnDCRCompliancecount").hide();
            $('.spnCurPreTxt').css('color', 'blue');
            $('.spnCurPreTxt').css('text-decoration', 'underline');
            $('.spnCurPreTxt').css('margin-left', '-20px');
            $('#CPheader').css('padding-top', '2px');
            $('#CPheader').css('margin-left', '20px');
            var data = google.visualization.arrayToDataTable([
                ['Label', 'Value'],
                 ['', jsonData[0].count],
            ]);
            var options = {
                width: 1100, height: 200,
                greenFrom: 75, greenTo: 100,
                yellowFrom: 50, yellowTo: 75,
                redFrom: 0, redTo: 50,
                minorTicks: 4,
                fontSize: 20,
                fontName: "Arial"
            };
            $('#spnDCRCompliance').html('');
            new google.visualization.Gauge(document.getElementById('spnDCRCompliance')).draw(data, options);

            $("#dcrlink").off("click").click(function () {
                AdminDashboard.getDCRComplianceDetailPopUp(monthstatus);
            });
        }

    },
    fnDCRComplainceErrorCallBack: function (error) {
        var json = error.responseJSON;
        var strace = json.StackTrace.trim().split('at ')[1];
        var strace1 = strace.substring(strace, strace.indexOf('('));
        var srcFile = strace1.split('.');
        var obj = new Object();
        obj.ExceptionName = json.ExceptionType.substring(json.ExceptionType.lastIndexOf('.') + 1, json.ExceptionType.length);
        obj.ReportName = "DCR Entry Available(Compliance)";
        obj.ExceptionMessage = json.ExceptionMessage;
        obj.ExceptionSource = srcFile[srcFile.length - 2] + "\/" + srcFile[srcFile.length - 1];
        $.ajax({
            url: '../../Home/DoRecordExceptionLog',
            data: obj,
            method: 'POST',
            success: function () { },
            error: function () { }
        });
        //window.location.href = "../../Home/ErrorPage";
        //window.close();
    },

    getDCRComplianceDetailPopUp: function (monthstatus) {
        debugger;
        var id = monthstatus + '~' + '';
        $('#main').load('../../Dashboard/DashboardDrilldown/' + id);

    },
    getDCRCompliancePopUpNew: function () {
        debugger;
        $('#loader').html('<img class="loader" src="../../Content/images/loader11.gif" />');
        var _objData = new Object();
        _objData.Division_Name = $('#ddlDcrComplianceDivsion').val();
        _objData.User_Type = $('#ddlUserType').val();
        _objData.MonthType = $('#ddlMode').val();
        if (_objData.Division_Name == '-- All --') {
            _objData.Division_Name = 'All';
        }
        var user_type = "";
        if (_objData.User_Type == 1) {
            user_type = 'Field';
        }
        else if (_objData.User_Type == 2) {
            user_type = 'Non Field';
        }
        else {
            user_type = 'All';
        }
        _objData.CompanyCode = CompanyCode;
        _objData.UserCode = UserCode;
        var action = _objData;
        var params = [];
        var p = {};
        p.name = "objData";
        p.value = _objData
        params.push(p);
        HDWebApiAjax.requestInvoke("GetDCRCompliancePopUp", "", params, "POST", this.fnDCRComplaincePopUpSuccessCallBack, this.fnDCRComplaincePopUpErrorCallBack, null, "JSON");
        $('#heading').show();
        $("#heading").html("<h2 style='font-size: 16px;'>DCR Entry Available Details For Division Name - " + _objData.Division_Name + ", User Type - " + user_type + ", Month - " + _objData.MonthType + "  </h2>");
    },
    fnDCRComplaincePopUpSuccessCallBack: function (jsonData) {
        debugger;
        if (jsonData.length >= 0) {

            AdminDashboard.fnSyncfusionGrid('parent', jsonData);
            //var strTable = "";
            //strTable += "<table  cellspacing='0' cellpadding='0' class='table table-striped' id='tblDCRDetail'><thead><tr>";
            //strTable += "<th style='background-color: rgb(51, 122, 183); position: relative; z-index: 1; top: 0px; left: 0px; color: white;'>S.No</th>";
            //strTable += "<th style='background-color: rgb(51, 122, 183); position: relative; z-index: 1; top: 0px; left: 0px;color: white;'>User Name</th>";
            //strTable += "<th style='background-color: rgb(51, 122, 183); position: relative; z-index: 1; top: 0px; left: 0px;color: white;'>Designation</th>";
            //strTable += "<th style='background-color: rgb(51, 122, 183); position: relative; z-index: 1; top: 0px; left: 0px;color: white;'>Region Name</th><th style='background-color: rgb(51, 122, 183); position: relative; z-index: 1; top: 0px; left: 0px;color: white;'>Division Name</th>";
            //strTable += "<th style='background-color: rgb(51, 122, 183); position: relative; z-index: 1; top: 0px; left: 0px;color: white;'>Hidoctor Start Date</th><th style='background-color: rgb(51, 122, 183); position: relative; z-index: 1; top: 0px; left: 0px;color: white;'>Start Date</th>";
            //strTable += "<th style='background-color: rgb(51, 122, 183); position: relative; z-index: 1; top: 0px; left: 0px;color: white;'>End Date</th><th style='background-color: rgb(51, 122, 183); position: relative; z-index: 1; top: 0px; left: 0px;color: white;'>Resignation Date</th>";
            //strTable += "<th style='background-color: rgb(51, 122, 183); position: relative; z-index: 1; top: 0px; left: 0px;color: white;'>User Status</th><th style='background-color: rgb(51, 122, 183); position: relative; z-index: 1; top: 0px; left: 0px;color: white;'>Total Count</th>";
            //strTable += "<th style='background-color: rgb(51, 122, 183); position: relative; z-index: 1; top: 0px; left: 0px;color: white;'>Week End</th><th style='background-color: rgb(51, 122, 183); position: relative; z-index: 1; top: 0px; left: 0px;color: white;'>Holiday</th>";
            //strTable += "<th style='background-color: rgb(51, 122, 183); position: relative; z-index: 1; top: 0px; left: 0px;color: white;'>Applicable Count</th><th style='background-color: rgb(51, 122, 183); position: relative; z-index: 1; top: 0px; left: 0px;color: white;'>Working Count</th>";
            //strTable += "<th style='background-color: rgb(51, 122, 183); position: relative; z-index: 1; top: 0px; left: 0px;color: white;'>Dcr Compliance</th></tr></thead><tbody>";
            //for (var i = 0; i < jsonData.length; i++) {
            //    var j = i + 1
            //    var resignationDate = jsonData[i].resignation_date == null ? "NA" : jsonData[i].resignation_date;
            //    var divisionName = jsonData[i].division_values == null ? "NA" : jsonData[i].division_values;
            //    strTable += "<tr><td>" + j + "</td><td>" + jsonData[i].user_name + "</td><td>" + jsonData[i].user_type_name + "</td><td>" + jsonData[i].region_name + "</td><td>" + divisionName + "</td><td>" + jsonData[i].hidoctor_startdate + "</td>";
            //    strTable += "<td>" + jsonData[0].start_date + "</td><td>" + jsonData[0].End_date + "</td>";
            //    strTable += "<td>" + resignationDate + "</td><td>" + jsonData[i].user_status + "</td><td>" + jsonData[i].total_count + "</td><td>" + jsonData[i].weekends + "</td><td>" + jsonData[i].holiday + "</td>";
            //    strTable += "<td>" + jsonData[i].applicable_count + "</td><td>" + jsonData[i].working_count + "</td><td>" + jsonData[i].dcr_compliance + "</td></tr>";
            //}
            //strTable += "</tbody></table>"
            //$("#loader").html('');
            //$("#parent").html(strTable);

            //$("#parent").show();
            //$("#tblDCRDetail").tableHeadFixer({ "left": 1 });
        }
        //var table = $('#tblDCRDetail').dataTable({
        //    "sPaginationType": "full_numbers", "bDestroy": true, "sDom": 'T<"clear">lfrtip'
        //});
        //$(".TableTools_clipboard, .TableTools_csv, .TableTools_print").hide();

    },
    fnDCRComplaincePopUpErrorCallBack: function (error) {
        var json = error.responseJSON;
        var strace = json.StackTrace.trim().split('at ')[1];
        var strace1 = strace.substring(strace, strace.indexOf('('));
        var srcFile = strace1.split('.');
        var obj = new Object();
        obj.ExceptionName = json.ExceptionType.substring(json.ExceptionType.lastIndexOf('.') + 1, json.ExceptionType.length);
        obj.ReportName = "DCR Compliance";
        obj.ExceptionMessage = json.ExceptionMessage;
        obj.ExceptionSource = srcFile[srcFile.length - 2] + "\/" + srcFile[srcFile.length - 1];
        $.ajax({
            url: '../../Home/DoRecordExceptionLog',
            data: obj,
            method: 'POST',
            success: function () { },
            error: function () { }
        });
        //window.location.href = "../../Home/ErrorPage";
        //window.close();
    },

    getNewCategoryCoverage: function () {
        debugger;
        //$('#NormsCoverageRgnCount').val('');
        var days = '';
        //$('#cls-all-coverage').hide();
        //$('#loading4').show();
        $('#categorydrop').fadeOut();
        var month = Month_category;
        var year = Year_category
        var _objData = new Object();
        _objData.IsCurrent = AdminDashboard.defaults.isCurrent == true ? 'Current' : 'Previous';
        if (_objData.IsCurrent == 'Previous') {
            if (month == 1) {
                month = 12;
                year = year - 1;
            }
            else {
                month = month - 1;
            }
        }

        _objData.Month = month;
        _objData.Year = year;

        AdminDashboard.defaults.CategoryCoverageDetails = $("#ddlCategoryCoverageDivision").find(':selected').val();
        //var _objData = new Object();
        _objData.Division_Name = AdminDashboard.defaults.CategoryCoverageDetails;

        if (_objData.Division_Name == '--All--') {
            _objData.Division_Name = '';
        }
        _objData.CompanyCode = CompanyCode;
        _objData.RegionCode = RegionCode;
        var mode1 = 0;

        if ($("#DrCoverageVaccexc").prop('checked') == true) {
            mode1 = 1;
            $('input[name=UnApprovedDochid]').val('Selected');
        }
        if ($('#NormsCoverageRgnCount').val() == "" || $('#NormsCoverageRgnCount').val() == undefined || $('#NormsCoverageRgnCount').val() == null) {
            days = '0';
        }
        else {
            days = $('#NormsCoverageRgnCount').val();
        }
        var EDivision = 0;
        if ($("#DRCoveragediv").prop('checked') == true) {
            EDivision = 1;
        }
        _objData.mode1 = mode1;
        _objData.Days = days;
        _objData.EDivision = EDivision;
        var action = _objData;
        var params = [];
        var p = {};
        p.name = "objData";
        p.value = _objData;
        params.push(p);
        HDWebApiAjax.requestInvoke("GetNewCategoryCoverage", "", params, "POST", this.fnNewCCSuccessCallBack, this.fnNewCCErrorCallBack, null, "JSON");
    },
    fnNewCCSuccessCallBack: function (jsonData) {
        debugger;
        var missedDoctors = jsonData[0].Missed;
        var metasperstandard = jsonData[0].Exact_Norms;
        var lessthanStdVisits = jsonData[0].Less_Norms;
        var morethanStdVisits = jsonData[0].More_Norms;
        var totalDoctors = jsonData[0].Total;
        var progressmissed = (missedDoctors / totalDoctors) * 100;
        var progressstandard = (metasperstandard / totalDoctors) * 100;
        var progressless = (lessthanStdVisits / totalDoctors) * 100;
        var progressmore = (morethanStdVisits / totalDoctors) * 100;
        var myArray = [missedDoctors, metasperstandard, lessthanStdVisits, morethanStdVisits];
        var maxValueInArray = Math.max.apply(Math, myArray);
        var index = myArray.indexOf(maxValueInArray);
        if (missedDoctors == 0 && metasperstandard == 0 && lessthanStdVisits == 0 && morethanStdVisits == 0) {
            index = -1;
        }
        var className = 'max-category';
        var content = '';
        content += "<p class='lengend'>";
        content += "<span>More than Std. Norm (Doctor Count)</span>";
        if (morethanStdVisits > 0) {
            content += "<span class='doc-count doc-more-met'><b class='cls-link'>" + morethanStdVisits + "</b>/" + totalDoctors + " Doctors <b>(" + progressmore.toFixed(2) + "%)</b></span>";
        }
        else {
            content += "<span class='doc-count'><b class=''>" + morethanStdVisits + "</b>/" + totalDoctors + " Doctors <b>(0%)</b></span>";
        }
        content += " </p>";
        if (index == 3) {
            content += "<div class='progress more-met-main " + className + "'>";
        }
        else {
            content += "<div class='progress more-met-main'>";
        }
        if (AdminDashboard.defaults.isCurrent) {
            content += "<div class='progress-bar progress-more-met' role='progressbar' aria-valuenow='40' aria-valuemin='0' aria-valuemax='100' style='width: " + progressmore + "%'>";
        } else {
            content += "<div class='progress-bar progress-more-met' role='progressbar' aria-valuenow='40' aria-valuemin='0' aria-valuemax='100' style='width: " + progressmore + "%'>";
        }

        content += "</div>";
        content += "</div>";
        content += "<p class='lengend'>";
        content += "<span>Met as per Std. Norm (Doctor Count)</span>";
        if (metasperstandard > 0) {
            content += "<span class='doc-count doc-met-per-std'><b class='cls-link'>" + metasperstandard + "</b>/" + totalDoctors + " Doctors <b>(" + progressstandard.toFixed(2) + "%)</b></span>";
        }
        else {
            content += "<span class='doc-count'><b class=''>" + metasperstandard + "</b>/" + totalDoctors + " Doctors <b>(0%)</b></span>";
        }
        content += "</p>";
        if (index == 1) {
            content += "<div class='progress met-main " + className + "'>";
        }
        else {
            content += "<div class='progress met-main'>";
        }
        if (AdminDashboard.defaults.isCurrent) {
            content += "<div class='progress-bar progress-met' role='progressbar' aria-valuenow='40' aria-valuemin='0' aria-valuemax='100' style='width: " + progressstandard + "%'>";
        } else {
            content += "<div class='progress-bar progress-met' role='progressbar' aria-valuenow='40' aria-valuemin='0' aria-valuemax='100' style='width: " + progressstandard + "%'>";
        }

        content += "</div>";
        content += "</div>";
        content += "<p class='lengend'>";
        content += "<span>Less than Std. Norm (Doctor Count)</span>";
        if (lessthanStdVisits > 0) {
            content += "<span class='doc-count doc-less-met'><b class='cls-link'>" + lessthanStdVisits + "</b>/" + totalDoctors + " Doctors <b>(" + progressless.toFixed(2) + "%)</b> </span>";
        }
        else {
            content += "<span class='doc-count'><b class=''>" + lessthanStdVisits + "</b>/" + totalDoctors + " Doctors <b>(0%)</b></span>";
        }
        content += " </p>";
        if (index == 2) {
            content += "<div class='progress less-met-main " + className + "'>";
        }
        else {
            content += "<div class='progress less-met-main'>";
        }
        if (AdminDashboard.defaults.isCurrent) {
            content += "<div class='progress-bar progress-less-met' role='progressbar' aria-valuenow='40' aria-valuemin='0' aria-valuemax='100' style='width: " + progressless + "%'>";
        } else {
            content += "<div class='progress-bar progress-less-met' role='progressbar' aria-valuenow='40' aria-valuemin='0' aria-valuemax='100' style='width: " + progressless + "%'>";
        }

        content += "</div>";
        content += "</div>";
        content += "<p class='lengend'>";
        content += "<span>Completely missed count</span>";
        if (missedDoctors > 0) {
            content += "<span class='doc-count doc-missed'><b class='cls-link'>" + missedDoctors + "</b>/" + totalDoctors + " Doctors <b>(" + progressmissed.toFixed(2) + "%)</b></span>";
        }
        else {
            content += "<span class='doc-count'><b>" + missedDoctors + "</b>/" + totalDoctors + " Doctors <b>(0%)</b></span>";
        }
        content += "</p>";
        if (index == 0) {
            content += "<div class='progress missed-main " + className + "'>";
        }
        else {
            content += "<div class='progress missed-main'>";
        }
        if (AdminDashboard.defaults.isCurrent) {
            content += "<div class='progress-bar progress-missed' role='progressbar' aria-valuenow='40' aria-valuemin='0' aria-valuemax='100' style='width: " + progressmissed + "%'>";
        }
        else {
            content += "<div class='progress-bar progress-missed' role='progressbar' aria-valuenow='40' aria-valuemin='0' aria-valuemax='100' style='width: " + progressmissed + "%'>";
        }

        content += " </div>";
        content += " </div>";
        //$('#loading4').hide();
        //$('#cls-all-coverage').show();
        $('.cls-all-coverage').html(content);
        var Division_Name = $('#ddlCategoryCoverageDivision').val();
        var days = '';
        if (Division_Name == '--All--') {
            Division_Name = '';
        }
        var execregion = 0;

        if ($("#DrCoverageVaccexc").prop('checked') == true) {
            execregion = 1;
        }
        if ($('#NormsCoverageRgnCount').val() == "" || $('#NormsCoverageRgnCount').val() == undefined || $('#NormsCoverageRgnCount').val() == null) {
            days = '0.0';
        }
        else {
            days = $('#NormsCoverageRgnCount').val();
        }
        $('.doc-missed').unbind('click').bind('click', function () {
            AdminDashboard.redirectToDoctorVisitReport('1', Division_Name, '', execregion, days);
        });
        $('.doc-met-per-std').unbind('click').bind('click', function () {
            AdminDashboard.redirectToDoctorVisitReport('2', Division_Name, '', execregion, days);
        });
        $('.doc-less-met').unbind('click').bind('click', function () {
            AdminDashboard.redirectToDoctorVisitReport('3', Division_Name, '', execregion, days);
        });
        $('.doc-more-met').unbind('click').bind('click', function () {
            AdminDashboard.redirectToDoctorVisitReport('4', Division_Name, '', execregion, days);
        });
    },
    fnNewCCErrorCallBack: function (error) {
        var json = error.responseJSON;
        var strace = json.StackTrace.trim().split('at ')[1];
        var strace1 = strace.substring(strace, strace.indexOf('('));
        var srcFile = strace1.split('.');
        var obj = new Object();
        obj.ExceptionName = json.ExceptionType.substring(json.ExceptionType.lastIndexOf('.') + 1, json.ExceptionType.length);
        obj.ReportName = "Norms Coverage";
        obj.ExceptionMessage = json.ExceptionMessage;
        obj.ExceptionSource = srcFile[srcFile.length - 2] + "\/" + srcFile[srcFile.length - 1];
        $.ajax({
            url: '../../Home/DoRecordExceptionLog',
            data: obj,
            method: 'POST',
            success: function () { },
            error: function () { }
        });
        //window.location.href = "../../Home/ErrorPage";
        //window.close();
    },

    redirectToDoctorVisitReport: function (mode, Division_Name, regionCode, execregion, days) {
        debugger;
        var IsCurrent = AdminDashboard.defaults.isCurrent == true ? 'Current' : 'Previous';
        Division_Name = encodeURIComponent(Division_Name);
        var IsSync = 0;
        var day1;
        if (days.indexOf('.') > -1) {
            day1 = days.split('.')[1];
        }
        else {
            day1 = 0;
        }
        var EDivision = 0;
        if ($("#DRCoveragediv").prop('checked') == true) {
            EDivision = 1;
        }
        $('#main').load('../../Dashboard/AdminDashboardDoctorVisit/' + mode + '~' + Division_Name + '~' + regionCode + '~' + execregion + "~" + IsCurrent + "~" + IsSync + "~" + days.split('.')[0] + "~" + day1 + "~" + EDivision);
    },
    getNewCategoryCoverageSummary: function (curMonth, curYear, mode, Division_Name, execregion, days, EDivision) {
        debugger;
        $('#parent').html('<div style="width:50px;text-aligment:center;"><img  src="../../Content/images/loader11.gif" /><span id="spnintimate">Loading...</span></div>');
        var _objData = new Object();
        var month = curMonth;
        var year = curYear
        _objData.Month = month;
        _objData.Year = year;
        _objData.Division_Name = Division_Name;
        _objData.Option_Type = mode;
        _objData.CompanyCode = CompanyCode;
        _objData.RegionCode = RegionCode;
        _objData.execregion = execregion;
        _objData.IsFirstTime = 1;
        _objData.Days = days;
        _objData.EDivision = EDivision;
        AdminDashboard.defaults.Exactdivision = EDivision;
        var action = _objData;
        var params = [];
        var p = {};
        p.name = "objData";
        p.value = _objData;
        params.push(p);
        HDWebApiAjax.requestInvoke("GetNewCategoryCoverageSummery", "", params, "POST", this.fnNewCCSummerySuccessCallBack, this.fnNewCCSummeryErrorCallBack, null, "JSON");
    },

    fnNewCCSummerySuccessCallBack: function (jsonData) {
        debugger;
        var content = "";
        var plusIcon = "";
        content += '<div class="divHead">';
        content += '<table class="table table-bordered maintable" id="headertable" style="width: 0%; margin-bottom: 0px;border: 0px solid #ddd;">';
        content += '<thead>';
        content += '<tr>';
        content += '<th class="rptIcon" style="border:0px;padding:8px;"></th>';
        // content += '<th class="NewmonthlyRPT_Coverage">S.No</th>';
        content += '<th class="colNorms">Region Name</th>';
        content += '<th class="colNorms">Employee Name</th>';
        content += '<th class="colNorms">Employee Number</th>';
        content += '<th class="colNorms">Designation</th>';
        content += '<th class="colNorms">Total Doctors</th>';
        content += '<th class="colNorms">Doctor Missed</th>';
        content += '<th class="colNorms">Met Exactly</th>';
        content += '<th class="colNorms">Less than met</th>';
        content += '<th class="colNorms">More than met</th>';
        content += '</tr>';
        content += '</thead>';
        content += '</table>';
        content += ' </div>';
        content += '<div class="table-body" style="font-size:12px;margin-bottom:20px;">';
        content += '<table class="table table-bordered maintable" id="bodytable" style="width: 0%; margin-bottom: 0px;border: 0px solid #ddd;">';
        content += '<tbody style="height:420px;">';


        if (jsonData != false && jsonData != '' && jsonData != null && jsonData != undefined) {

            for (var i = 0; i < jsonData.length; i++) {

                if (AdminDashboard.defaults.rowId != jsonData[i].Region_Code) {
                    plusIcon = '<i class="fa fa-plus" aria-hidden="true"></i>';
                }
                if (jsonData[i].Region_Type_Name != "Territory") {
                    content += '<tr style="text-align:center;" onclick="AdminDashboard.show_hide_row(\'' + jsonData[i].Region_Code + '\')" id="active' + jsonData[i].Region_Code + '">';
                    content += '<td class="rptIcon"><span style="font-size:14px;height:420px;">' + plusIcon + '</span></td>';
                    content += "<td style ='overflow-wrap:break-word;' class='colNorms'>" + jsonData[i].Region_Name + "</td>";
                }
                else {
                    content += '<tr style="text-align:center;">';
                    content += '<td class="rptIcon"><span style="font-size:14px;height:420px;"></span></td>';
                    content += "<td class='colNorms' style='text-decoration:underline;cursor: pointer;overflow-wrap:break-word;' onclick='AdminDashboard.getRegionCategoryWiseVisit(\"" + curMonth + "\", \"" + curYear + "\", \"" + jsonData[i].Region_Code + "\", \"" + encodeURIComponent(jsonData[i].Region_Name) + "\", \"" + execregion + "\",1)' >" + jsonData[i].Region_Name + "</td>";
                }
                content += "<td class='colNorms' style='overflow-wrap:break-word;'>" + jsonData[i].Employee_Name + "</td>";
                content += "<td class='colNorms'>" + jsonData[i].Employee_Number + "</td>";
                content += "<td class='colNorms'>" + jsonData[i].Designation + "</td>";
                content += "<td class='colNorms'>" + jsonData[i].Total + "</td>";

                if (jsonData[i].Region_Type_Name == "Territory" && jsonData[i].Missed > 0) {
                    content += "<td class='colNorms progress-missed' style='text-decoration:underline;cursor: pointer;' onclick = 'AdminDashboard.getNewRepCategoryWiseVisit(\"" + curMonth + "\", \"" + curYear + "\", \"" + Division_Name + "\", \"" + jsonData[i].Region_Code + "\", \"" + encodeURIComponent(jsonData[i].Region_Name) + "\", \"" + execregion + "\", 1)'>" + jsonData[i].Missed + "</td>";
                }
                else {
                    content += "<td class='colNorms progress-missed'>" + jsonData[i].Missed + "</td>";
                }

                if (jsonData[i].Region_Type_Name == "Territory" && jsonData[i].Exact_Norms > 0) {
                    content += "<td class='colNorms progress-met' style='text-decoration:underline;cursor: pointer;' onclick = 'AdminDashboard.getNewRepCategoryWiseVisit(\"" + curMonth + "\", \"" + curYear + "\", \"" + Division_Name + "\", \"" + jsonData[i].Region_Code + "\", \"" + encodeURIComponent(jsonData[i].Region_Name) + "\", \"" + execregion + "\", 2)'>" + jsonData[i].Exact_Norms + "</td>";
                }
                else {
                    content += "<td class='colNorms progress-met'>" + jsonData[i].Exact_Norms + "</td>";
                }
                if (jsonData[i].Region_Type_Name == "Territory" && jsonData[i].Less_Norms > 0) {
                    content += "<td class='colNorms progress-less-met' style='text-decoration:underline;cursor: pointer;' onclick = 'AdminDashboard.getNewRepCategoryWiseVisit(\"" + curMonth + "\", \"" + curYear + "\", \"" + Division_Name + "\", \"" + jsonData[i].Region_Code + "\", \"" + encodeURIComponent(jsonData[i].Region_Name) + "\", \"" + execregion + "\", 3)'>" + jsonData[i].Less_Norms + "</td>";

                }
                else {
                    content += "<td class='colNorms progress-less-met'>" + jsonData[i].Less_Norms + "</td>";
                }
                if (jsonData[i].Region_Type_Name == "Territory" && jsonData[i].More_Norms > 0) {
                    content += "<td class='colNorms progress-more-met' style='text-decoration:underline;cursor: pointer;' onclick = 'AdminDashboard.getNewRepCategoryWiseVisit(\"" + curMonth + "\", \"" + curYear + "\", \"" + Division_Name + "\", \"" + jsonData[i].Region_Code + "\", \"" + encodeURIComponent(jsonData[i].Region_Name) + "\", \"" + execregion + "\", 4)'>" + jsonData[i].More_Norms + "</td>";
                }
                else {
                    content += "<td class='colNorms progress-more-met'>" + jsonData[i].More_Norms + "</td>";
                }
                content += '</tr>';
                var contentId = "content" + jsonData[i].Region_Code;
                content += '<tr class="expend_Collapse_Content" id="' + jsonData[i].Region_Code + '">';
                //content += '<td colspan="15" style="padding:0px;">';
                //content += '<table class="tblcollapse">';
                //content += '<tbody id="' + contentId + '">';
                //content += ' </tbody>';
                //content += '</table>';
                //content += '</td>';
                content += '<tr>';
            }
            content += '</tbody>';
            content += '</table>';
            content += '</div>';
            $('#parent').html('');
            $('#parent').html(content);
        }
        AdminDashboard.fnFixedcolumn(1, 'rptIcon', 'colNorms', 9);

    },
    fnNewCCSummeryErrorCallBack: function (error) {
        var json = error.responseJSON;
        var strace = json.StackTrace.trim().split('at ')[1];
        var strace1 = strace.substring(strace, strace.indexOf('('));
        var srcFile = strace1.split('.');
        var obj = new Object();
        obj.ExceptionName = json.ExceptionType.substring(json.ExceptionType.lastIndexOf('.') + 1, json.ExceptionType.length);
        obj.ReportName = "Norms Coverage";
        obj.ExceptionMessage = json.ExceptionMessage;
        obj.ExceptionSource = srcFile[srcFile.length - 2] + "\/" + srcFile[srcFile.length - 1];
        $.ajax({
            url: '../../Home/DoRecordExceptionLog',
            data: obj,
            method: 'POST',
            success: function () { },
            error: function () { }
        });
        //window.location.href = "../../Home/ErrorPage";
        //window.close();
    },
    fnFixedcolumn: function (FreezeColumnCount, freeColClass, ColClass, ColumnCount) {


        $('.maintable thead').css("width", $(".table-body").width());
        $('.maintable tbody').css("width", $(".table-body").width());
        $('.tblcollapse tbody').css("width", "fit-content");
        $(".colDoctorDrill").css("min-width", (($(".table-body").width() - 50) / 4));
        $(".colDoctorDrill").css("max-width", (($(".table-body").width() - 50) / 4));
        $(".col21Spec").css("min-width", (($(".table-body").width() - 40) / 6));
        $(".col21Spec").css("max-width", (($(".table-body").width() - 40) / 6));
        $(".colNormsDrill").css("min-width", (($(".table-body").width() - 40) / 7));
        $(".colNormsDrill").css("max-width", (($(".table-body").width() - 40) / 7));
        AdminDashboard.fnSetDynamicWidth(freeColClass, ColClass, ColumnCount);

        var fixcol = 0;
        while (FreezeColumnCount > fixcol) {
            fixcol++;
            //header coumn.
            $('.maintable thead th:nth-child(' + fixcol + ')').css("position", "relative");
            $('.maintable thead th:nth-child(' + fixcol + ')').css("background-color", "#337ab7");
            $('.maintable tbody th:nth-child(' + fixcol + ')').css("border", "none");

            //row column.
            $('.maintable tbody tr td:nth-child(' + fixcol + ')').css("border", "none");
            $('.maintable tbody tr td:nth-child(' + fixcol + ')').css("position", "relative");
            $('.maintable tbody tr td:nth-child(' + fixcol + ')').css("height", "40px");
            $('.maintable tbody tr td:nth-child(' + fixcol + ')').css("background-color", "#ebf2fa");
            $('.maintable tbody tr td:nth-child(' + fixcol + ')').css("overflow-wrap", "break-word");

            $('tbody').on('scroll', function (e) {
                $('thead').css("left", -$("tbody").scrollLeft());
                for (var i = 1; i <= fixcol; i++) {
                    $('thead th:nth-child(' + i + ')').css("left", $("tbody").scrollLeft());
                    $('tbody td:nth-child(' + i + ')').css("left", $("tbody").scrollLeft());

                    $('thead .second_header_row th:nth-child(' + i + ')').css("position", "initial");
                }
            });

        }
        $(window).resize(function () {
            if ($(".table-body").width() < 1336) {
                $('.maintable thead').css("width", $(".table-body").width());
                $('.maintable tbody').css("width", $(".table-body").width());
                $('.tblcollapse tbody').css("width", "fit-content");
                $(".colDoctorDrill").css("min-width", (($(".table-body").width() - 50) / 5));
                $(".colDoctorDrill").css("max-width", (($(".table-body").width() - 50) / 5));
                $(".col21Spec").css("min-width", (($(".table-body").width() - 40) / 6));
                $(".col21Spec").css("max-width", (($(".table-body").width() - 40) / 6));
                $(".colNormsDrill").css("min-width", (($(".table-body").width() - 40) / 7));
                $(".colNormsDrill").css("max-width", (($(".table-body").width() - 40) / 7));
                AdminDashboard.fnSetDynamicWidth(freeColClass, ColClass, ColumnCount);
            }
            else {
                $('.maintable thead').css("width", $(".table-body").width());
                $('.maintable tbody').css("width", $(".table-body").width());
                $('.tblcollapse tbody').css("width", "fit-content");
                $(".colDoctorDrill").css("min-width", (($(".table-body").width() - 50) / 5));
                $(".colDoctorDrill").css("max-width", (($(".table-body").width() - 50) / 5));
                $(".col21Spec").css("min-width", (($(".table-body").width() - 40) / 6));
                $(".col21Spec").css("max-width", (($(".table-body").width() - 40) / 6));
                $(".colNormsDrill").css("min-width", (($(".table-body").width() - 40) / 7));
                $(".colNormsDrill").css("max-width", (($(".table-body").width() - 40) / 7));
                AdminDashboard.fnSetDynamicWidth(freeColClass, ColClass, ColumnCount);
            }
        });
    },
    fnSetDynamicWidth: function (freeColClass, ColClass, ColumnCount) {
        debugger;

        var freezeColWidth = $("." + freeColClass).css("min-width");
        freezeColWidth = freezeColWidth.substring(0, freezeColWidth.length - 2);
        freezeColWidth = parseInt(freezeColWidth);

        $("." + ColClass).css("min-width", (($(".table-body").width() - freezeColWidth) / ColumnCount));
        $("." + ColClass).css("max-width", (($(".table-body").width() - freezeColWidth) / ColumnCount));
    },
    show_hide_row: function (rowWiseId, ReportgeneratedId, param) {

        $('#child').html('');
        $('#dvTitleForRep').html('');
        $('#dvdoctorVisitDetails').html('');
        var currentState = $("#" + rowWiseId).css("display");
        AdminDashboard.defaults.rowId = rowWiseId;

        if (currentState == "block") {
            $("#" + rowWiseId).slideUp();
            $("#active" + rowWiseId + " td span").html("<i class='fa fa-plus' aria-hidden='true'></i>");
        }
        else {
            AdminDashboard.GetChildData(ReportgeneratedId);
            $("#" + rowWiseId).slideDown();
            $("#" + rowWiseId).css("display", "block");
            $("#active" + rowWiseId + " td span").html('<i class="fa fa-minus" aria-hidden="true"></i>');
        }
    },
    GetChildData: function (rptGeneratedId) {
        debugger;
        var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        var _objData = new Object();
        var params = [];
        var p = {};
        p.name = "objData";
        if (rptGeneratedId == 1) {
            _objData.CompanyCode = CompanyCode;
            _objData.RegionCode = AdminDashboard.defaults.rowId;
            var getMonth = $("#hdnSelectMonth").val();
            _objData.Month = months.indexOf(getMonth) + 1;
            _objData.Year = $("#hdnSelectYear").val();
            _objData.DocSpec = $("#hdnSelectSpeiciality").val();
            _objData.Division_Name = $("#hdnSelectDivision").val();
            _objData.excDoctor = $("#hdnExcDoctor").val();
            _objData.execregion = $("#hdnExcRegion").val();
            _objData.IsFirstTime = 0;
            _objData.Days = $('#hdnDays').val();
            var EDivision = AdminDashboard.defaults.Exactdivision;
            _objData.EDivision = EDivision;
            p.value = _objData;

            params.push(p);
            HDWebApiAjax.requestInvoke("getSpecialityDashboard", "", params, "POST", AdminDashboard.fnChildSpecialitySuccessCallback, AdminDashboard.fnChildSpecialityFailureCallback, null, "JSON");

        }
        else if (rptGeneratedId == 2) {
            debugger;
            _objData.CompanyCode = CompanyCode;
            _objData.RegionCode = AdminDashboard.defaults.rowId;
            var getMonth = $("#hdnSelectMonth").val();
            _objData.Month = months.indexOf(getMonth) + 1; 
            _objData.Year = $("#hdnSelectYear").val();
            _objData.Division_Name = $("#hdnSelectDivision").val();
            _objData.ExcDoctor = $("#hdnExcDoctor").val();
            _objData.execregion = $("#hdnExcRegion").val();
            _objData.IsFirstTime = 0;
            _objData.Days = $('#hdnDays').val();
            var EDivision = AdminDashboard.defaults.Exactdivision;            
            _objData.EDivision = EDivision;
            p.value = _objData;
            params.push(p);
            HDWebApiAjax.requestInvoke("getDoctorsMissedDashboard", "", params, "POST", this.fnChildDrMissedSuccessCallback, this.fnChildDrMissedFaliureCallback, null, "JSON");

        }
        else if (rptGeneratedId == 3) {
            debugger;
            _objData.CompanyCode = CompanyCode;
            _objData.Code = AdminDashboard.defaults.rowId;
            var getMonth = $("#hdnSelectMonth").val();
            if ($("#hdnMode").val() == 1) {
                _objData.Type = $("input[name='Region']:checked").val();
                _objData.Days = $('#hdnDays').val();
            }
            else if ($("#hdnMode").val() == 2) {
                _objData.Type = $("input[name='User']:checked").val();
            }
            _objData.Month = months.indexOf(getMonth) + 1;
            _objData.Year = $("#hdnSelectYear").val();
            _objData.Division_Name = $("#hdnSelectDivision").val();
            _objData.mode = $("#hdnMode").val();
            _objData.IsFirstTime = 0;
            p.value = _objData;
            params.push(p);
            HDWebApiAjax.requestInvoke("getCallAverageDashboard", "", params, "POST", this.fnChildCallAverageSuccessCallback, this.fnChildCallAverageFailureCallback, null, "JSON");

        }
        else if (rptGeneratedId == 4) {
            debugger;
            _objData.CompanyCode = CompanyCode;
            _objData.RegionCode = AdminDashboard.defaults.rowId;
            var getMonth = $("#hdnSelectMonth").val();
            _objData.Month = months.indexOf(getMonth) + 1;
            _objData.Division_Name = $("#hdnSelectDivision").val();
            _objData.ExcDoctor = $("#hdnExcDoctor").val();
            _objData.execregion = $("#hdnExcRegion").val();
            _objData.IsFirstTime = 0;
            _objData.Days = $('#hdnDays').val();
            var EDivision = AdminDashboard.defaults.Exactdivision;
            _objData.EDivision = EDivision;
            p.value = _objData;
            params.push(p);

            HDWebApiAjax.requestInvoke("getDoctorsMissedDashboardCumulativeCountDrill", "", params, "POST", this.fnChildDrMissedCumulativeCountCallback, this.fnChildDrMissedCumulativeFailureCallback, null, "JSON");

        }
        else {
            _objData.Month = curMonth;
            _objData.Year = curYear;
            _objData.Division_Name = Division_Name;
            _objData.Option_Type = mode;
            _objData.CompanyCode = CompanyCode;
            _objData.RegionCode = AdminDashboard.defaults.rowId;
            _objData.execregion = execregion;
            _objData.IsFirstTime = 0;
            _objData.Days = $('#hdnDays').val();
            var EDivision = AdminDashboard.defaults.Exactdivision;
            _objData.EDivision = EDivision;
            var action = _objData;
            p.name = "objData";
            p.value = _objData
            params.push(p);
            HDWebApiAjax.requestInvoke("GetNewCategoryCoverageSummery", "", params, "POST", this.fnNewCCChildSummerySuccessCallBack, this.fnNewCCChildSummeryErrorCallBack, null, "JSON");
        }
    },
    fnChildDrMissedCumulativeFailureCallback: function (error) {
        var json = error.responseJSON;
        var strace = json.StackTrace.trim().split('at ')[1];
        var strace1 = strace.substring(strace, strace.indexOf('('));
        var srcFile = strace1.split('.');
        var obj = new Object();
        obj.ExceptionName = json.ExceptionType.substring(json.ExceptionType.lastIndexOf('.') + 1, json.ExceptionType.length);
        obj.ReportName = "Doctor Missed Cumulative Coverage";
        obj.ExceptionMessage = json.ExceptionMessage;
        obj.ExceptionSource = srcFile[srcFile.length - 2] + "\/" + srcFile[srcFile.length - 1];
        $.ajax({
            url: '../../Home/DoRecordExceptionLog',
            data: obj,
            method: 'POST',
            success: function () { },
            error: function () { }
        });
        //window.location.href = "../../Home/ErrorPage";
        //window.close();
    },
    fnChildDrMissedFaliureCallback: function (error) {
        var json = error.responseJSON;
        var strace = json.StackTrace.trim().split('at ')[1];
        var strace1 = strace.substring(strace, strace.indexOf('('));
        var srcFile = strace1.split('.');
        var obj = new Object();
        obj.ExceptionName = json.ExceptionType.substring(json.ExceptionType.lastIndexOf('.') + 1, json.ExceptionType.length);
        obj.ReportName = "Doctor Missed Coverage";
        obj.ExceptionMessage = json.ExceptionMessage;
        obj.ExceptionSource = srcFile[srcFile.length - 2] + "\/" + srcFile[srcFile.length - 1];
        $.ajax({
            url: '../../Home/DoRecordExceptionLog',
            data: obj,
            method: 'POST',
            success: function () { },
            error: function () { }
        });
        //window.location.href = "../../Home/ErrorPage";
        //window.close();
    },
    fnChildSpecialityFailureCallback: function (error) {
        var json = error.responseJSON;
        var strace = json.StackTrace.trim().split('at ')[1];
        var strace1 = strace.substring(strace, strace.indexOf('('));
        var srcFile = strace1.split('.');
        var obj = new Object();
        obj.ExceptionName = json.ExceptionType.substring(json.ExceptionType.lastIndexOf('.') + 1, json.ExceptionType.length);
        obj.ReportName = "Speciality-Wise Coverage";
        obj.ExceptionMessage = json.ExceptionMessage;
        obj.ExceptionSource = srcFile[srcFile.length - 2] + "\/" + srcFile[srcFile.length - 1];
        $.ajax({
            url: '../../Home/DoRecordExceptionLog',
            data: obj,
            method: 'POST',
            success: function () { },
            error: function () { }
        });
        //window.location.href = "../../Home/ErrorPage";
        //window.close();
    },
    fnNewCCChildSummerySuccessCallBack: function (jsonData) {
        debugger;
        var content = "";
        var plusIcon = "";
        if (jsonData != false && jsonData != '' && jsonData != null && jsonData != undefined) {

            for (var i = 0; i < jsonData.length; i++) {
                if (AdminDashboard.defaults.rowId != jsonData[i].Region_Code) {
                    plusIcon = '<i class="fa fa-plus" aria-hidden="true"></i>';
                }


                if (jsonData[i].Region_Type_Name != "Territory") {
                    if (plusIcon == '') {
                        content += '<tr style="text-align:center;" id="active' + jsonData[i].Region_Code + '">';
                        content += '<td class="rptIcon"><span style="font-size:14px;height:420px;">' + plusIcon + '</span></td>';
                        content += "<td class='colNorms' style='text-decoration:underline;cursor: pointer;overflow-wrap:break-word;' onclick='AdminDashboard.getRegionCategoryWiseVisit(\"" + curMonth + "\", \"" + curYear + "\", \"" + jsonData[i].Region_Code + "\", \"" + encodeURIComponent(jsonData[i].Region_Name) + "\", \"" + execregion + "\",1)' >" + jsonData[i].Region_Name + "</td>";
                    }
                    else {
                        content += '<tr style="text-align:center;" onclick="AdminDashboard.show_hide_row(\'' + jsonData[i].Region_Code + '\')" id="active' + jsonData[i].Region_Code + '">';
                        content += '<td class="rptIcon"><span style="font-size:14px;height:420px;">' + plusIcon + '</span></td>';
                        content += "<td class='colNorms' style='overflow-wrap:break-word;'>" + jsonData[i].Region_Name + "</td>";

                    }

                }
                else {
                    content += '<tr style="text-align:center;">';
                    content += '<td class="rptIcon"><span style="font-size:14px;height:420px;"></span></td>';
                    //content += "<td class='colNorms' style='text-decoration:underline;cursor: pointer;' onclick='AdminDashboard.getRegionCategoryWiseVisit(\"" + curMonth + "\", \"" + curYear + "\", \"" + jsonData[i].Region_Code + "\", \"" + encodeURIComponent(jsonData[i].Region_Name) + "\", \"" + execregion + "\",1)' >" + jsonData[i].Region_Name + "</td>";
                    if (jsonData[i].Total == 0) {
                        content += "<td class='colNorms' style='text-decoration:underline;pointer-events:none;overflow-wrap:break-word;'>" + jsonData[i].Region_Name + "</td>";
                    }
                    else {
                        content += "<td class='colNorms' style='text-decoration:underline;cursor: pointer;overflow-wrap:break-word;' onclick='AdminDashboard.getRegionCategoryWiseVisit(\"" + curMonth + "\", \"" + curYear + "\", \"" + jsonData[i].Region_Code + "\", \"" + encodeURIComponent(jsonData[i].Region_Name) + "\", \"" + execregion + "\",1)' >" + jsonData[i].Region_Name + "</td>";
                    }
                }

                //                content += '<td class="rptIcon"><span style="font-size:14px;height:420px;"><i class="fa fa-plus" aria-hidden="true"></i></span></td>';
                // content += "<td class='NewmonthlyRPT_Coverage'>" + (i + 1) + "</td>";

                content += "<td class='colNorms' style='overflow-wrap:break-word;'>" + jsonData[i].Employee_Name + "</td>";
                content += "<td class='colNorms'>" + jsonData[i].Employee_Number + "</td>";
                content += "<td class='colNorms'>" + jsonData[i].Designation + "</td>";
                content += "<td class='colNorms'>" + jsonData[i].Total + "</td>";

                if (jsonData[i].Region_Type_Name == "Territory" && jsonData[i].Missed > 0) {
                    content += "<td class='colNorms progress-missed' style='text-decoration:underline;cursor: pointer;' onclick = 'AdminDashboard.getNewRepCategoryWiseVisit(\"" + curMonth + "\", \"" + curYear + "\", \"" + Division_Name + "\", \"" + jsonData[i].Region_Code + "\", \"" + encodeURIComponent(jsonData[i].Region_Name) + "\", \"" + execregion + "\", 1)'>" + jsonData[i].Missed + "</td>";
                }
                else {
                    if (plusIcon == '' && jsonData[i].Missed > 0) {
                        content += "<td class='colNorms progress-missed' style='text-decoration:underline;cursor: pointer;' onclick = 'AdminDashboard.getNewRepCategoryWiseVisit(\"" + curMonth + "\", \"" + curYear + "\", \"" + Division_Name + "\", \"" + jsonData[i].Region_Code + "\", \"" + encodeURIComponent(jsonData[i].Region_Name) + "\", \"" + execregion + "\", 1)'>" + jsonData[i].Missed + "</td>";
                    }
                    else {
                        content += "<td class='colNorms progress-missed'>" + jsonData[i].Missed + "</td>";
                    }

                }

                if (jsonData[i].Region_Type_Name == "Territory" && jsonData[i].Exact_Norms > 0) {
                    content += "<td class='colNorms progress-met' style='text-decoration:underline;cursor: pointer;' onclick = 'AdminDashboard.getNewRepCategoryWiseVisit(\"" + curMonth + "\", \"" + curYear + "\", \"" + Division_Name + "\", \"" + jsonData[i].Region_Code + "\", \"" + encodeURIComponent(jsonData[i].Region_Name) + "\", \"" + execregion + "\", 2)'>" + jsonData[i].Exact_Norms + "</td>";
                }
                else {
                    if (plusIcon == '' && jsonData[i].Exact_Norms > 0) {
                        content += "<td class='colNorms progress-met' style='text-decoration:underline;cursor: pointer;' onclick = 'AdminDashboard.getNewRepCategoryWiseVisit(\"" + curMonth + "\", \"" + curYear + "\", \"" + Division_Name + "\", \"" + jsonData[i].Region_Code + "\", \"" + encodeURIComponent(jsonData[i].Region_Name) + "\", \"" + execregion + "\", 2)'>" + jsonData[i].Exact_Norms + "</td>";
                    }
                    else {
                        content += "<td class='colNorms progress-met'>" + jsonData[i].Exact_Norms + "</td>";
                    }

                }
                if (jsonData[i].Region_Type_Name == "Territory" && jsonData[i].Less_Norms > 0) {
                    content += "<td class='colNorms progress-less-met' style='text-decoration:underline;cursor: pointer;' onclick = 'AdminDashboard.getNewRepCategoryWiseVisit(\"" + curMonth + "\", \"" + curYear + "\", \"" + Division_Name + "\", \"" + jsonData[i].Region_Code + "\", \"" + encodeURIComponent(jsonData[i].Region_Name) + "\", \"" + execregion + "\", 3)'>" + jsonData[i].Less_Norms + "</td>";

                }
                else {
                    if (plusIcon == '' && jsonData[i].Less_Norms > 0) {
                        content += "<td class='colNorms progress-less-met' style='text-decoration:underline;cursor: pointer;' onclick = 'AdminDashboard.getNewRepCategoryWiseVisit(\"" + curMonth + "\", \"" + curYear + "\", \"" + Division_Name + "\", \"" + jsonData[i].Region_Code + "\", \"" + encodeURIComponent(jsonData[i].Region_Name) + "\", \"" + execregion + "\", 3)'>" + jsonData[i].Less_Norms + "</td>";
                    }
                    else {
                        content += "<td class='colNorms progress-less-met'>" + jsonData[i].Less_Norms + "</td>";
                    }
                }
                if (jsonData[i].Region_Type_Name == "Territory" && jsonData[i].More_Norms > 0) {
                    content += "<td class='colNorms progress-more-met' style='text-decoration:underline;cursor: pointer;' onclick = 'AdminDashboard.getNewRepCategoryWiseVisit(\"" + curMonth + "\", \"" + curYear + "\", \"" + Division_Name + "\", \"" + jsonData[i].Region_Code + "\", \"" + encodeURIComponent(jsonData[i].Region_Name) + "\", \"" + execregion + "\", 4)'>" + jsonData[i].More_Norms + "</td>";
                }
                else {
                    if (plusIcon == '' && jsonData[i].More_Norms > 0) {
                        content += "<td class='colNorms progress-more-met' style='text-decoration:underline;cursor: pointer;' onclick = 'AdminDashboard.getNewRepCategoryWiseVisit(\"" + curMonth + "\", \"" + curYear + "\", \"" + Division_Name + "\", \"" + jsonData[i].Region_Code + "\", \"" + encodeURIComponent(jsonData[i].Region_Name) + "\", \"" + execregion + "\", 4)'>" + jsonData[i].More_Norms + "</td>";
                    }
                    else {
                        content += "<td class='colNorms progress-more-met'>" + jsonData[i].More_Norms + "</td>";
                    }
                }

                content += '</tr>';
                var contentId = "content" + jsonData[i].Region_Code;
                content += '<tr class="expend_Collapse_Content" id="' + jsonData[i].Region_Code + '">';
                content += '<tr>';
            }
        }

        $("#" + AdminDashboard.defaults.rowId).html(content);
        AdminDashboard.fnFixedcolumn(1, 'rptIcon', 'colNorms', 9);
    },
    fnNewCCChildSummeryErrorCallBack: function (error) {
        var json = error.responseJSON;
        var strace = json.StackTrace.trim().split('at ')[1];
        var strace1 = strace.substring(strace, strace.indexOf('('));
        var srcFile = strace1.split('.');
        var obj = new Object();
        obj.ExceptionName = json.ExceptionType.substring(json.ExceptionType.lastIndexOf('.') + 1, json.ExceptionType.length);
        obj.ReportName = "Norms Coverage";
        obj.ExceptionMessage = json.ExceptionMessage;
        obj.ExceptionSource = srcFile[srcFile.length - 2] + "\/" + srcFile[srcFile.length - 1];
        $.ajax({
            url: '../../Home/DoRecordExceptionLog',
            data: obj,
            method: 'POST',
            success: function () { },
            error: function () { }
        });
        //window.location.href = "../../Home/ErrorPage";
        //window.close();
    },
    fnChildSpecialitySuccessCallback: function (response) {
        debugger;
        var content = "";
        if (response && response.length > 0) {

            debugger;
            var TotalDoctors = response.length;

            if (response != null) {
                for (var i = 0; i < response.length; i++) {

                    if (AdminDashboard.defaults.rowId != response[i].Region_Code) {
                        plusIcon = '<i class="fa fa-plus" aria-hidden="true"></i>';
                    }
                    if (response[i].Region_Type_Name != "Territory") {
                        if (plusIcon != "") {
                            content += '<tr style="text-align:center;" onclick="AdminDashboard.show_hide_row(\'' + response[i].Region_Code + '\',\'' + 1 + '\')" id="active' + response[i].Region_Code + '">';
                            content += '<td class="rptIcon" style="height: 40px;"><span style="font-size:14px;height:420px;width:30px;">' + plusIcon + '</span></td>';
                            content += "<td class='col21'>" + response[i].Region_Name + "</td>";
                        }
                        else {
                            content += '<tr style="text-align:center;" id="active' + response[i].Region_Code + '">';
                            content += '<td class="rptIcon" style="height: 40px;"><span style="font-size:14px;height:420px;width:30px;">' + plusIcon + '</span></td>';
                            if (response[i].Doctors_Met == 0) {
                                content += '<td class="col21">' + response[i].Region_Name + '</td>';
                            }
                            else {
                                content += '<td class="col21" style="text-decoration:underline;cursor: pointer;" onclick="AdminDashboard.getSpecialityWiseCoverageLeaf(\'' + $("#hdnSelectMonth").val() + '\',\'' + $("#hdnSelectYear").val() + '\',\'' + response[i].Region_Code + '\',\'' + encodeURIComponent(response[i].Region_Name) + '\',\'' + $("#hdnSelectSpeiciality").val() + '\',\'' + $("#hdnExcRegion").val() + '\');">' + response[i].Region_Name + '</td>';
                            }

                        }

                    }
                    else {
                        content += '<tr style="text-align:center;">';
                        content += '<td class="rptIcon" style="height: 40px;"><span style="font-size:14px;height:420px;width:30px;"></span></td>';
                        if (response[i].Doctors_Met == 0) {
                            content += '<td class="col21">' + response[i].Region_Name + '</td>';
                        }
                        else {
                            content += '<td class="col21" style="text-decoration:underline;cursor: pointer;" onclick="AdminDashboard.getSpecialityWiseCoverageLeaf(\'' + $("#hdnSelectMonth").val() + '\',\'' + $("#hdnSelectYear").val() + '\',\'' + response[i].Region_Code + '\',\'' + encodeURIComponent(response[i].Region_Name) + '\',\'' + $("#hdnSelectSpeiciality").val() + '\',\'' + $("#hdnExcRegion").val() + '\');">' + response[i].Region_Name + '</td>';
                        }

                    }
                    content += '<td class="col21">' + response[i].Total_Doctors + '</td>';
                    if (response[i].Total_Doctors != 0) {
                        if (response[i].Doctors_Met > 0) {

                            content += '<td class="col21" style="cursor:pointer;overflow:auto;text-decoration:none;" onclick="AdminDashboard.getRegionSpecialityWiseVisit(\'' + $('#hdnSelectMonth').val() + '\',\'' + $('#hdnSelectYear').val() + '\',\'' + response[i].Region_Code + '\',\'' + encodeURIComponent(response[i].Region_Name) + '\',\'' + $('#hdnExcRegion').val() + '\',\'' + $('#hdnSelectSpeiciality').val() + '\';); ">' + response[i].Doctors_Met + '</td>';
                            content += '<td class="col21">' + ((response[i].Doctors_Met / response[i].Total_Doctors) * 100).toFixed(2) + '</td>';
                        }
                        else {
                            content += '<td class="col21">' + response[i].Doctors_Met + '</td>';
                            content += '<td class="col21">' + ((response[i].Doctors_Met / response[i].Total_Doctors) * 100).toFixed(2) + '</td>';
                        }
                    }
                    else {
                        content += '<td class="col21">' + response[i].Doctors_Met + '</td>';

                        content += '<td class="col21">0</td>';
                    }

                    content += '</tr>';
                    var contentId = "content" + response[i].Region_Code;
                    content += '<tr class="expend_Collapse_Content" id="' + response[i].Region_Code + '">';
                    content += '<td colspan="15" style="padding:0px;">';
                    content += '<table class="tblcollapse">';
                    content += '<tbody id="' + contentId + '">';
                    content += ' </tbody>';
                    content += '</table>';
                    content += '</td>';
                    content += '</tr>';
                    //content += "</tbody></table>";  
                }
            }
            $("#" + AdminDashboard.defaults.rowId).html(content);
            AdminDashboard.fnFixedcolumn(1, 'rptIcon', 'col21', 4);
        }
    },
    fnChildDrMissedSuccessCallback: function (response) {
        debugger;
        var content = "";
        var plusIcon = "";
        if (response != null && response.length > 0) {


            var arrRegionCode = response.map(a => a.Region_Code);
            lstRegionCode = arrRegionCode.reduce(function (item, e1) {
                var matches = item.filter(function (e2)
                { return e1 == e2 });
                if (matches.length == 0) {
                    item.push(e1);
                }
                return item;
            }, []);


            for (var i = 0; i < lstRegionCode.length; i++) {
                debugger;
                var lst = $.grep(response, function (v) {
                    return v.Region_Code == lstRegionCode[i];
                })

                if (AdminDashboard.defaults.rowId != lst[0].Region_Code) {
                    plusIcon = '<i class="fa fa-plus" aria-hidden="true"></i>';
                }
                if (lst[0].Region_Type_Name != "Territory") {
                    if (plusIcon != "") {
                        content += '<tr style="text-align:center;" onclick="AdminDashboard.show_hide_row(\'' + lst[0].Region_Code + '\',\'' + 2 + '\')" id="active' + lst[0].Region_Code + '">';
                        content += '<td class="rptIcon" style="height:40px;"><span style="font-size:14px;height:420px;">' + plusIcon + '</span></td>';
                        content += '<td class="col31" style="cursor:pointer;text-transform:underline;">' + lst[0].Region_Name + '</td>';
                    }
                    else {
                        content += '<tr style="text-align:center;" id="active' + lst[0].Region_Code + '">';
                        content += '<td class="rptIcon" style="height:40px;"><span style="font-size:14px;height:420px;">' + plusIcon + '</span></td>';
                        content += '<td class="col31" style="cursor:pointer;text-transform:underline;text-decoration:underline;" onclick="AdminDashboard.getDoctorsMissedCategoryWise(\'' + $("#hdnSelectMonth").val() + '\',\'' + $("#hdnSelectYear").val() + '\',\'' + lst[0].Region_Code + '\',\'' + lst[0].Region_Name.replace(/ /g, '_') + '\',\'' + $("#hdnExcRegion").val() + '\',\'' + $("#hdnExcDoctor").val() + '\');">' + lst[0].Region_Name + '</td>';
                    }

                }
                else {
                    content += '<tr style="text-align:center;">';
                    content += '<td class="rptIcon" style="height:40px;"><span style="font-size:14px;height:420px;"></span></td>';
                    content += '<td class="col31" style="text-decoration:underline;cursor: pointer;" onclick="AdminDashboard.getDoctorsMissedCategoryWise(\'' + $("#hdnSelectMonth").val() + '\',\'' + $("#hdnSelectYear").val() + '\',\'' + lst[0].Region_Code + '\',\'' + lst[0].Region_Name.replace(/ /g, '_') + '\',\'' + $("#hdnExcRegion").val() + '\',\'' + $("#hdnExcDoctor").val() + '\');">' + lst[0].Region_Name + '</td>';

                }
                if (lst[0].Region_Type_Name == "Territory" && lst[0].Total_Doctors > 0) {
                    content += '<td class="col31">' + lst[0].Total_Doctors + '</td>';
                }
                else {
                    content += '<td class="col31">' + lst[0].Total_Doctors + '</td>';
                }
                if (lst[0].Region_Type_Name == "Territory" && lst[0].Doctors_Missed > 0) {
                    content += '<td class="col31">' + lst[0].Doctors_Missed + '</td>';
                }
                else {
                    content += '<td class="col31">' + lst[0].Doctors_Missed + '</td>';
                }
                var arrColor = [];
                if ($('#hdnSF').val() == 0) {
                    arrColor = ["cls-met-less-1", "cls-met-std-1", "cls-missed-color-1"];
                }
                else {
                    arrColor = ["cls-met-less-syn", "cls-met-std-syn", "cls-missed-color-syn"];
                }
                //var arrColor = ["cls-met-less-1", "cls-met-std-1", "cls-missed-color-1"];
                for (var ab = 0; ab < lstNorms.length; ab++) {

                    var lstNorm = $.grep(lst, function (v) {
                        return v.Norms == lstNorms[ab];
                    })

                    if (lstNorm != null && lstNorm.length > 0) {
                        if (lstNorm[0].Count > 0) {
                            /// onclick="AdminDashboard.getDoctorsMissedCategoryWise(\'' + $("#hdnSelectMonth").val() + '\',\'' + $("#hdnSelectYear").val() + '\',\'' + lst[0].Region_Code + '\',\'' + encodeURIComponent(lst[0].Region_Name) + '\',\'' + $("#hdnExcRegion").val() + '\',\'' + $("#hdnExcDoctor").val() + '\');"
                            content += '<td class="col31 ' + arrColor[ab] + '">' + lstNorm[0].Count + '</td>';
                        }
                        else {
                            content += '<td></td>';
                        }
                    }
                    else {
                        content += '<td class="col31 ' + arrColor[ab] + '"> 0</td>';
                    }

                }
                content += '</tr>';

                var contentId = "content" + lst[0].Region_Code;
                content += '<tr class="expend_Collapse_Content" id="' + lst[0].Region_Code + '">';
                //content += '<td colspan="15" style="padding:0px;">';
                //content += '<table class="tblcollapse">';
                //content += '<tbody id="' + contentId + '">';
                //content += ' </tbody>';
                //content += '</table>';
                //content += '</td>';
                content += '</tr>';
            }
            $("#" + AdminDashboard.defaults.rowId).html(content);

            AdminDashboard.fnFixedcolumn(1, 'rptIcon', 'col31', (lstNorms.length + 3));

        }

    },
    fnChildCallAverageSuccessCallback: function (response) {
        debugger;
        var content = "";
        var mode = $("#hdnMode").val();
        if (response && response.length > 0) {
            debugger;

            if (response != null) {
                for (var i = 0; i < response.length; i++) {

                    if (AdminDashboard.defaults.rowId != response[i].Region_Code) {
                        plusIcon = '<i class="fa fa-plus" aria-hidden="true"></i>';
                    }
                    if (mode == 1) {
                        if (response[i].Region_Type_Name != "Territory") {
                            content += '<tr style="text-align:center;" onclick="AdminDashboard.show_hide_row(\'' + response[i].Region_Code + '\',\'' + 3 + '\')" id="active' + response[i].Region_Code + '">';
                            content += '<td class="rptIcon" style="height: 40px;"><span style="font-size:14px;height:420px;width:30px;">' + plusIcon + '</span></td>';
                            content += "<td class='col3'>" + response[i].Region_Name + "</td>";
                        }
                        else {
                            content += '<tr style="text-align:center;">';
                            content += '<td class="rptIcon" style="height: 40px;"><span style="font-size:14px;height:420px;width:30px;"></span></td>';
                            content += '<td class="col3" style="text-decoration:underline;cursor: pointer;" onclick="AdminDashboard.getDoctorsCallAverageWise(\'' + $("#hdnSelectMonth").val() + '\',\'' + $("#hdnSelectYear").val() + '\',\'' + response[i].Region_Code + '\',\'' + encodeURIComponent(response[i].Region_Name) + '\',\'' + $("#hdnExcRegion").val() + '\',\'' + $("#hdnExcDoctor").val() + '\',\'' + mode + '\');">' + response[i].Region_Name + '</td>';

                        }
                    }
                    else if (mode == 2) {
                        if (response[i].Region_Type_Name != "Territory") {
                            content += '<tr style="text-align:center;" onclick="AdminDashboard.show_hide_row(\'' + response[i].User_Code + '\',\'' + 3 + '\')" id="active' + response[i].User_Code + '">';
                            content += '<td class="rptIcon" style="height: 40px;"><span style="font-size:14px;height:420px;width:30px;">' + plusIcon + '</span></td>';
                            content += "<td class='col3'>" + response[i].User_Name + "</td>";
                        }
                        else {
                            content += '<tr style="text-align:center;">';
                            content += '<td class="rptIcon" style="height: 40px;"><span style="font-size:14px;height:420px;width:30px;"></span></td>';
                            content += '<td class="col3" style="text-decoration:underline;cursor: pointer;" onclick="AdminDashboard.getDoctorsCallAverageWise(\'' + $("#hdnSelectMonth").val() + '\',\'' + $("#hdnSelectYear").val() + '\',\'' + response[i].User_Code + '\',\'' + encodeURIComponent(response[i].User_Name) + '\',\'' + $("#hdnExcRegion").val() + '\',\'' + $("#hdnExcDoctor").val() + '\',\'' + mode + '\);">' + response[i].Region_Name + '</td>';
                        }
                    }

                    if (response[i].Total_Calls_Made > 0) {

                        content += '<td class="col3" style="cursor:pointer;overflow:auto;text-decoration:none;">' + response[i].Total_Calls_Made + '</td>';
                    }
                    else {
                        content += '<td class="col3">' + response[i].Total_Calls_Made + '</td>';
                    }
                    if (response[i].Call_Avg > 0.0) {
                        content += '<td class="col3 cls-missed-color" style="cursor:pointer;overflow:auto;text-decoration:none;" onclick="AdminDashboard.getDoctorsCallAverageWise(\'' + $('#hdnSelectMonth').val() + '\',\'' + $('#hdnSelectYear').val() + '\',\'' + response[i].Region_Code + '\',\'' + encodeURIComponent(response[i].Region_Name) + '\',\'' + $('#hdnExcRegion').val() + '\',\'' + $("#hdnExcDoctor").val() + '\'); ">' + response[i].Call_Avg + '</td>';
                    }
                    else {
                        content += '<td class="col3 cls-missed-color">' + response[i].Call_Avg + '</td>';
                    }

                    //content += '<td class="col2">' + ((response[i].Doctors_Missed / response[i].Total_Doctors) * 100).toFixed(2) + '</td>';
                    content += '</tr>';
                    if ($("#hdnMode").val() == 1) {
                        var contentId = "content" + response[i].Region_Code;
                        content += '<tr class="expend_Collapse_Content" id="' + response[i].Region_Code + '">';
                    }
                    else if ($("#hdnMode").val() == 2) {
                        var contentId = "content" + response[i].User_Code;
                        content += '<tr class="expend_Collapse_Content" id="' + response[i].User_Code + '">';
                    }
                    content += '<td colspan="15" style="padding:0px;">';
                    content += '<table class="tblcollapse">';
                    content += '<tbody id="' + contentId + '">';
                    content += ' </tbody>';
                    content += '</table>';
                    content += '</td>';
                    content += '</tr>';
                    //content += "</tbody></table>";  
                }
            }
            $("#" + AdminDashboard.defaults.rowId).html(content);
        }
    },

    fnChildDrMissedCumulativeCountCallback: function (response) {
        debugger;
        var content = "";
        if (response != null && response.length > 0) {

            //var arrNorms = response.map(a=>a.Norms);
            //lstNorms = arrNorms.reduce(function (item, e1) {
            //    var matches = item.filter(function (e2)
            //    { return e1 == e2 });
            //    if (matches.length == 0) {
            //        item.push(e1);
            //    }
            //    return item;
            //}, []);

            var arrRegionCode = response.map(a => a.Region_Code);
            lstRegionCode = arrRegionCode.reduce(function (item, e1) {
                var matches = item.filter(function (e2)
                { return e1 == e2 });
                if (matches.length == 0) {
                    item.push(e1);
                }
                return item;
            }, []);
            for (var i = 0; i < lstRegionCode.length; i++) {
                debugger;
                var lst = $.grep(response, function (v) {
                    return v.Region_Code == lstRegionCode[i];
                })

                if (AdminDashboard.defaults.rowId != lst[0].Region_Code) {
                    plusIcon = '<i class="fa fa-plus" aria-hidden="true"></i>';
                }
                if (lst[0].Region_Type_Name != "Territory") {
                    if (plusIcon != "") {
                        content += '<tr style="text-align:center;" onclick="AdminDashboard.show_hide_row(\'' + lst[0].Region_Code + '\',\'' + 4 + '\')" id="active' + lst[0].Region_Code + '">';
                        content += '<td class="rptIcon" style="height:40px;"><span style="font-size:14px;height:420px;">' + plusIcon + '</span></td>';
                        content += '<td class="drMissedoverAllCol" style="cursor:pointer;text-transform:underline;">' + lst[0].Region_Name + '</td>';
                    }
                    else {
                        content += '<tr style="text-align:center;" id="active' + lst[0].Region_Code + '">';
                        content += '<td class="rptIcon" style="height:40px;"><span style="font-size:14px;height:420px;">' + plusIcon + '</span></td>';
                        content += '<td class="drMissedoverAllCol" style="cursor:pointer;text-transform:underline;text-decoration:underline;" onclick="AdminDashboard.getDoctorsMissedCumulativeCategoryWise(\'' + $("#hdnSelectMonth").val() + '\',\'' + $("#hdnSelectYear").val() + '\',\'' + lst[0].Region_Code + '\',\'' + lst[0].Region_Name.replace(/ /g, '_') + '\',\'' + $("#hdnExcRegion").val() + '\',\'' + $("#hdnExcDoctor").val() + '\');">' + lst[0].Region_Name + '</td>';
                    }

                }
                else {
                    content += '<tr style="text-align:center;">';
                    content += '<td class="rptIcon" style="height:40px;"><span style="font-size:14px;height:420px;"></span></td>';
                    // 
                    content += '<td class="drMissedoverAllCol" style="cursor:pointer;text-transform:underline;text-decoration:underline;" onclick="AdminDashboard.getDoctorsMissedCumulativeCategoryWise(\'' + $("#hdnSelectMonth").val() + '\',\'' + $("#hdnSelectYear").val() + '\',\'' + lst[0].Region_Code + '\',\'' + lst[0].Region_Name.replace(/ /g, '_') + '\',\'' + $("#hdnExcRegion").val() + '\',\'' + $("#hdnExcDoctor").val() + '\');">' + lst[0].Region_Name + '</td>';

                }
                var arrColor = [];
                if ($('#hdnSF').val() == 0) {
                    arrColor = ["cls-met-less-1", "cls-met-std-1", "cls-missed-color-1"];
                }
                else {
                    arrColor = ["cls-met-less-syn", "cls-met-std-syn", "cls-missed-color-syn"];
                }
                //var arrColor = ["cls-met-less-1", "cls-met-std-1", "cls-missed-color-1"];
                for (var ab = 0; ab < lstNorms.length; ab++) {

                    var lstNorm = $.grep(lst, function (v) {
                        return v.Norms == lstNorms[ab];
                    })
                    if (lstNorm != null & lstNorm.length > 0) {
                        if (lstNorm[0].Visit > 0) {
                            //onclick="AdminDashboard.getDoctorsMissedCategoryWise(\'' + $("#hdnSelectMonth").val() + '\',\'' + $("#hdnSelectYear").val() + '\',\'' + lst[0].Region_Code + '\',\'' + encodeURIComponent(lst[0].Region_Name) + '\',\'' + $("#hdnExcRegion").val() + '\',\'' + $("#hdnExcDoctor").val() + '\');"
                            content += '<td class="drMissedoverAllCol ' + arrColor[ab] + '" >' + lstNorm[0].Visit + '</td>';
                        }
                        else {
                            content += '<td class="drMissedoverAllCol ' + arrColor[ab] + '"></td>';
                        }
                    }
                    else {
                        content += '<td class="drMissedoverAllCol ' + arrColor[ab] + '"> 0 </td>';
                    }

                }
                content += '</tr>';

                var contentId = "content" + lst[0].Region_Code;
                content += '<tr class="expend_Collapse_Content" id="' + lst[0].Region_Code + '">';
                content += '<td colspan="15" style="padding:0px;">';
                content += '<table class="tblcollapse">';
                content += '<tbody id="' + contentId + '">';
                content += ' </tbody>';
                content += '</table>';
                content += '</td>';
                content += '</tr>';
            }
            $("#" + AdminDashboard.defaults.rowId).html(content);
            $('.maintable thead').css("width", $(".table-body").width());
            $('.maintable tbody').css("width", $(".table-body").width());
            AdminDashboard.fnFixedcolumn(1, 'rptIcon', 'drMissedoverAllCol', (lstNorms.length + 1));
        }

    },
    getDoctorsCallAverageWise: function (curMonth, curYear, Code, TypeName, ExcRegion, ExcDoctor, mode) {
        var param = new Object();
        var params = [];
        var paramValues = new Object();
        paramValues.Month = curMonth;
        paramValues.Year = curYear;
        paramValues.Code = Code;
        paramValues.TypeName = TypeName;
        paramValues.Division_Name = $("#hdnSelectDivision").val();
        paramValues.Days = AdminDashboard.defaults.days;
        param.name = "_objData";
        param.value = paramValues;
        params.push(param);

        HDWebApiAjax.requestInvoke("getCallAverageDashboardDrillDown", "", params, "POST", AdminDashboard.fnGetDoctorsCallAverageSuccess, AdminDashboard.fnGetDoctorsCallAverageFailure, null, "JSON");

    },
    fnGetDoctorsCallAverageSuccess: function (response) {
        var content = '';
        content += "<table class='table table-bordered' id='tblDrMissedMonthWiseVisit'><thead><tr>";
        content += '<th style="background-color: rgb(51, 122, 183); position: relative; z-index: 1; top: 0px; left: 0px;">S.No</th>';
        content += '<th style="background-color: rgb(51, 122, 183); position: relative; z-index: 1; top: 0px; left: 0px;">Doctor Name</th><th>MDL No</th>';
        content += '<th style="background-color: rgb(51, 122, 183); position: relative; z-index: 1; top: 0px; left: 0px;">Category</th>';
        content += '<th style="background-color: rgb(51, 122, 183); position: relative; z-index: 1; top: 0px; left: 0px;">Speciality</th>';
        //content += '<th style="background-color: rgb(51, 122, 183); position: relative; z-index: 1; top: 0px; left: 0px;">Speciality</th>';
        content += '</tr> </thead><tbody>';
        var i = 0;
        if (response != false && response != '' && response != null && response != undefined) {
            $.each(response, function (index, value) {

                i = i + 1;
                var curClassName = '';
                var preClassName = '';
                var curValue = 0;
                var preValue = 0;
                var stdVisitCount = 0;

                content += "<tr><td>" + i + "</td>";
                content += "<td>" + value.Doctor_Name + "</td>";
                content += "<td>" + value.MDL_Number + "</td>";
                content += "<td>" + value.Category_Name + "</td>";
                content += "<td>" + value.Speciality_Name + "</td>";
                //content += "<td>" + value.Call_Avg + "</td>";
            });
        }
        content += " </tbody></table>";
        $('#child').html(content);
        // AdminDashboard.UnblockUI("dvManagerVisit");
        $('html,body').animate({
            scrollTop: $("#dvTitleForRep").offset().top
        },
        'slow');
        $("#cboCategory").unbind('change').bind('change', function () {
            firstTimeLoad = false;
            AdminDashboard.getUserDashboardCategoryWiseVisits(Month, Year, DivisionName, mode);
        });
        $("#cboSpeciality").unbind('change').bind('change', function () {
            firstTimeLoad = false;
            AdminDashboard.getUserDashboardCategoryWiseVisits(Month, Year, DivisionName, mode);
        });
    },
    fnGetDoctorsCallAverageFailure: function (error) {
        var json = error.responseJSON;
        var strace = json.StackTrace.trim().split('at ')[1];
        var strace1 = strace.substring(strace, strace.indexOf('('));
        var srcFile = strace1.split('.');
        var obj = new Object();
        obj.ExceptionName = json.ExceptionType.substring(json.ExceptionType.lastIndexOf('.') + 1, json.ExceptionType.length);
        obj.ReportName = "Call Average";
        obj.ExceptionMessage = json.ExceptionMessage;
        obj.ExceptionSource = srcFile[srcFile.length - 2] + "\/" + srcFile[srcFile.length - 1];
        $.ajax({
            url: '../../Home/DoRecordExceptionLog',
            data: obj,
            method: 'POST',
            success: function () { },
            error: function () { }
        });
        //window.location.href = "../../Home/ErrorPage";
        //window.close();
    },

    getSpecialityWiseCoverageLeaf: function (curMonth, curYear, RegionCode, RegionName, SpecName, ExcRegion) {
        debugger;
        var param = {};
        var params = [];
        var _objData1 = new Object();
        _objData1.CompanyCode = CompanyCode;
        _objData1.RegionCode = RegionCode;
        _objData1.Month = months.indexOf(curMonth) + 1;
        _objData1.Year = curYear
        _objData1.DocSpec = SpecName;
        _objData1.execRegion = ExcRegion;
        _objData1.Days = $('#hdnDays').val();
        var RegName = decodeURIComponent(RegionName);

        param.name = "_objData";
        param.value = _objData1;
        params.push(param);
        HDWebApiAjax.requestInvoke("GetNewSpecialityWiseSummaryDrill", "", params, "POST", this.fnSpecialityWiseCoverageLeafCallback, this.fnSpecialityWiseCoverageFailureCallback, null, "JSON");
        $("#dvTitleForRep").html("Region-Wise Doctor Met Details for the Month of " + curMonth + " - " + curYear + " for " + RegName);
    },
    fnSpecialityWiseCoverageLeafCallback: function (response) {
        var content = '';

        content += '<div class="divHead">';
        //content += '<div class="text-left"><button type="button" class="btn btn-default" onclick="AdminDashboard.fnExportToExcel();">Export To Excel</button></div>';
        content += '<table class="table table-bordered maintable" id="headertable" style="width: 0px; margin-bottom: 0px;border: 0px solid #ddd;">';
        content += '<thead>';
        content += '<tr>';
        content += '<th class="Symbolcol21">S.No</th>';
        content += '<th class="col21Spec">Doctor Name</th>';
        content += '<th class="col21Spec">MDL No</th>';
        content += '<th class="col21Spec">Category</th>';
        content += '<th class="col21Spec">Speciality</th>';
        content += '<th class="col21Spec">Actual Visit Count</th>';
        content += '<th class="col21Spec">Norms Visit Count</th>';
        content += '</tr>';
        content += '</thead>';
        content += '</table>';
        content += ' </div>';
        content += '<div class="table-body" style="font-size:12px;margin-bottom:20px;">';
        content += '<table class="table table-bordered maintable" id="bodytable" style="width:0px; margin-bottom: 0px;border: 0px solid #ddd;">';
        content += '<tbody style="height:420px;">';
        var i = 0;
        if (response != false && response != '' && response != null && response != undefined) {
            $.each(response, function (index, value) {
                debugger;
                i = i + 1;
                var curClassName = '';
                var preClassName = '';
                var curValue = 0;
                var preValue = 0;
                var stdVisitCount = 0;

                content += "<tr style='height: 40px;'><td class='Symbolcol21' style='min-width:42px;'>" + i + "</td>";
                content += "<td  class='col21Spec'>" + value.Doctor_Name + "</td>";
                content += "<td class='col21Spec'>" + value.MDL_Number + "</td>";
                content += "<td class='col21Spec'>" + value.Category_Name + "</td>";
                content += "<td class='col21Spec'>" + value.Speciality_Name + "</td>";
                content += "<td class='col21Spec'>" + value.Actual_Visit + "</td>";
                content += "<td class='col21Spec'>" + value.Total_Visit + "</td>";

            });
        }
        content += " </tbody></table>";
        $('#child').html(content);
        $('html,body').animate({
            scrollTop: $("#child").offset().top
        },
   'slow');
        AdminDashboard.fnFixedcolumn(1);


        $("#cboCategory").unbind('change').bind('change', function () {
            firstTimeLoad = false;
            AdminDashboard.getUserDashboardCategoryWiseVisits(Month, Year, DivisionName, mode);
        });
        $("#cboSpeciality").unbind('change').bind('change', function () {
            firstTimeLoad = false;
            AdminDashboard.getUserDashboardCategoryWiseVisits(Month, Year, DivisionName, mode);
        });
    },
    fnSpecialityWiseCoverageFailureCallback: function (error) {
        var json = error.responseJSON;
        var strace = json.StackTrace.trim().split('at ')[1];
        var strace1 = strace.substring(strace, strace.indexOf('('));
        var srcFile = strace1.split('.');
        var obj = new Object();
        obj.ExceptionName = json.ExceptionType.substring(json.ExceptionType.lastIndexOf('.') + 1, json.ExceptionType.length);
        obj.ReportName = "Speciality-Wise Coverage";
        obj.ExceptionMessage = json.ExceptionMessage;
        obj.ExceptionSource = srcFile[srcFile.length - 2] + "\/" + srcFile[srcFile.length - 1];
        $.ajax({
            url: '../../Home/DoRecordExceptionLog',
            data: obj,
            method: 'POST',
            success: function () { },
            error: function () { }
        });
        //window.location.href = "../../Home/ErrorPage";
        //window.close();
    },
    getRegionCategoryWiseVisit: function (Month, Year, Region_Code, Region_Name, execregion, mode) {
        debugger;
        $('#child').html('<div style="width:50px;margin-top: 80px; text-aligment:center;"><img  src="../../Content/images/loader11.gif" /><span id="spnintimate">Loading...</span></div>');
        var _objData = new Object();
        _objData.Month = Month;
        _objData.Year = Year;
        _objData.RegionCode = Region_Code;
        var RegionName = decodeURIComponent(Region_Name);
        _objData.CompanyCode = CompanyCode;
        _objData.execregion = execregion;
        _objData.Days = $('#hdnDays').val();
        var action = _objData;
        var params = [];
        var p = {};
        p.name = "objData";
        p.value = _objData
        params.push(p);
        HDWebApiAjax.requestInvoke("GetRegionCategoryCoverageSummery", "", params, "POST", this.fnNewCCRegionSuccessCallBack, this.fnNewCCRegionErrorCallBack, null, "JSON");
        $('#dvTitleForRep').html('Region wise doctor details of ' + monthArray[parseInt(Month) - 1] + "-" + Year + ' (' + RegionName + ')');
    },
    fnNewCCRegionSuccessCallBack: function (jsonData) {
        debugger;
        var content = '';
        content += '<div class="divHead">';
        content += '<table class="table table-bordered maintable" id="headertable" style="width: 0px; margin-bottom: 0px;border: 0px solid #ddd;">';
        content += '<thead>';
        content += '<tr>';
        content += "<th class='Symbolcol21' >S.No</th>";
        content += "<th class='colNormsDrill'>Category Name</th>";
        content += "<th class='colNormsDrill'>Speciality Name</th>";
        content += "<th class='colNormsDrill'>Total Doctors</th>";
        content += "<th class='colNormsDrill'>Doctor Missed</th>";
        content += "<th class='colNormsDrill'>Met Exactly</th>";
        content += "<th class='colNormsDrill'>Less than met</th>";
        content += "<th class='colNormsDrill'>More than met</th>";
        content += '</tr>';
        content += '</thead>';
        content += '</table>';
        content += ' </div>';
        content += '<div class="table-body" style="font-size:12px;margin-bottom:20px;">';
        content += '<table class="table table-bordered maintable" id="bodytable" style="width:0px; margin-bottom: 0px;border: 0px solid #ddd;">';
        content += '<tbody style="height:420px;">';
        var i = 0;
        if (jsonData != false && jsonData != '' && jsonData != null && jsonData != undefined) {

            $.each(jsonData, function (index, value) {
                i = i + 1;
                content += " <tr>";
                content += "<td class='Symbolcol21'>" + i + "</td>";
                content += "<td class='colNormsDrill'>" + value.Category_Name + "</td>";
                content += "<td class='colNormsDrill' >" + value.Speciality_Name + "</td>";
                content += "<td class='colNormsDrill'>" + value.Total + "</td>";
                content += "<td class='colNormsDrill progress-missed'>" + value.Missed + "</td>";
                content += "<td class='colNormsDrill progress-met'>" + value.Exact_Norms + "</td>";
                content += "<td class='colNormsDrill progress-less-met'>" + value.Less_Norms + "</td>";
                content += "<td class='colNormsDrill progress-more-met'>" + value.More_Norms + "</td>";
                content += "</tr>";
            });
        }
        content += " </tbody></table>";
        $('#child').html(content);
        $('html,body').animate({
            scrollTop: $("#child").offset().top
        },
'slow');
        AdminDashboard.fnFixedcolumn(1);



        //content += "<table  id='tblCategoryWiseDoctorVisit'><thead><tr>";
        //content += "<th class='Symbolcol21' >S.No</th>";
        //content += "<th class='colNormsDrill'>Category Name</th>";
        //content += "<th class='colNormsDrill'>Speciality Name</th>";
        //content += "<th class='colNormsDrill'>Total Doctors</th>";
        //content += "<th class='colNormsDrill'>Doctor Missed</th>";
        //content += "<th class='colNormsDrill'>Met Exactly</th>";
        //content += "<th class='colNormsDrill'>Less than met</th>";
        //content += "<th class='colNormsDrill'>More than met</th>";
        //content+="</tr></thead><tbody>";
        //var i = 0;
        //if (jsonData != false && jsonData != '' && jsonData != null && jsonData != undefined) {

        //    $.each(jsonData, function (index, value) {
        //        i = i + 1;
        //        content += " <tr>";
        //        content += "<td>" + i + "</td>";
        //        content += "<td class='colNormsDrill'>" + value.Category_Name + "</td>";
        //        content += "<td class='colNormsDrill' >" + value.Speciality_Name + "</td>";
        //        content += "<td class='colNormsDrill'>" + value.Total + "</td>";
        //        content += "<td class='colNormsDrill cls-missed-color'>" + value.Missed + "</td>";
        //        content += "<td class='colNormsDrill cls-met-std'>" + value.Exact_Norms + "</td>";
        //        content += "<td class='colNormsDrill cls-met-less'>" + value.Less_Norms + "</td>";
        //        content += "<td class='colNormsDrill cls-met-more'>" + value.More_Norms + "</td>";
        //        content += "</tr>";
        //    });
        //}
        //content += "</tbody>";
        //content += "</table>";
        //$('#child').html('');
        //$('#child').html(content);



    },
    fnNewCCRegionErrorCallBack: function (error) {
        var json = error.responseJSON;
        var strace = json.StackTrace.trim().split('at ')[1];
        var strace1 = strace.substring(strace, strace.indexOf('('));
        var srcFile = strace1.split('.');
        var obj = new Object();
        obj.ExceptionName = json.ExceptionType.substring(json.ExceptionType.lastIndexOf('.') + 1, json.ExceptionType.length);
        obj.ReportName = "Norms Coverage";
        obj.ExceptionMessage = json.ExceptionMessage;
        obj.ExceptionSource = srcFile[srcFile.length - 2] + "\/" + srcFile[srcFile.length - 1];
        $.ajax({
            url: '../../Home/DoRecordExceptionLog',
            data: obj,
            method: 'POST',
            success: function () { },
            error: function () { }
        });
        //window.location.href = "../../Home/ErrorPage";
        //window.close();
    },

    getNewRepCategoryWiseVisit: function (Month, Year, Division_Name, Region_Code, Region_Name, execregion, mode) {
        debugger;
        // AdminDashboard.blockUI("dvManagerVisit");
        firstTimeLoad = true;
        $('#cboCategory').val('');
        $('#cboSpeciality').val('');
        AdminDashboard.getNewUserDashboardCategoryWiseVisits(Month, Year, Division_Name, Region_Code, Region_Name, mode, execregion, AdminDashboard.defaults.days);

    },
    getRegionSpecialityWiseVisit: function (Month, Year, Region_Code, Region_Name, ExcRegion, SpecialityName) {
        debugger;
        var _objData = {};
        _objData.Month = Month;
        _objData.Year = Year;
        _objData.RegionCode = Region_Code;
        _objData.CompanyCode = CompanyCode;
        _objData.SpecialityName = SpecialityName;
        _objData.execregion = ExcRegion;
        var action = _objData;
        var params = [];
        var p = {};
        p.name = "objData";
        p.value = _objData
        params.push(p);
        HDWebApiAjax.requestInvoke("GetSpecialityWiseSummary_Drill", "", params, "POST", this.bindNewCategoryWiseDoctorVisit, this.bindNewCategoryWiseDoctornErrorCallBack, null, "JSON");

    },

    getNewUserDashboardCategoryWiseVisits: function (Month, Year, Division_Name, Region_Code, Region_Name, mode, execregion, days) {
        debugger;
        categoryMonth = Month;
        categoryYear = Year;
        categoryDivision = Division_Name;
        categoryRegion_Name = Region_Name;
        category_Mode = mode;
        var _objData = new Object();
        _objData.Month = Month;
        _objData.Year = Year;
        _objData.RegionCode = Region_Code;
        _objData.CompanyCode = CompanyCode;
        _objData.Option_Type = mode;
        _objData.execregion = days;
        _objData.Days = execregion;
        var action = _objData;
        var params = [];
        var p = {};
        p.name = "objData";
        p.value = _objData
        params.push(p);
        HDWebApiAjax.requestInvoke("GetNewCategoryCoverageSummery_Drill", "", params, "POST", this.bindNewCategoryWiseDoctorVisit, this.bindNewCategoryWiseDoctornErrorCallBack, null, "JSON");

        //AdminDashboard.bindNewCategoryWiseDoctorVisit(jsonResult, mode, Month, Year, Region_Name, Division_Name)
        //$('#dvInfoContent').html(content);
        //$('.clsModalTitle').html('Pending DCR');
        //ShowModalPopup("dvMoreInfoModal");
    },
    bindNewCategoryWiseDoctorVisit: function (jsonResult) {
        debugger;
        var mode = category_Mode;
        var Year = categoryYear;
        var Division_Name = categoryDivision;
        var RegionName = decodeURIComponent(categoryRegion_Name);
        var Month = categoryMonth;
        categoryMonth = "";
        categoryYear = "";
        categoryDivision = "";
        categoryRegion_Name = "";
        category_Mode = "";
        $('#child').html('');
        if (mode == 1) {
            $('#dvTitleForRep').html('Doctor missed details of  ' + monthArray[parseInt(Month) - 1] + "-" + Year + ' (' + RegionName + ')');
        }
        else if (mode == 2) {
            $('#dvTitleForRep').html('Doctor met exactly details of ' + monthArray[parseInt(Month) - 1] + "-" + Year + ' (' + RegionName + ')');
        }
        else if (mode == 3) {
            $('#dvTitleForRep').html('Doctor Less than met details of ' + monthArray[parseInt(Month) - 1] + "-" + Year + ' (' + RegionName + ')');
        }
        else {
            $('#dvTitleForRep').html('Doctor more than met details of ' + monthArray[parseInt(Month) - 1] + "-" + Year + ' (' + RegionName + ')');
        }
        var content = '';
        var disCatAr = new Array();
        var disSpeAr = new Array();
        content += "<table class='data display ' id='tblCategoryWiseDoctorVisit'><thead><tr>";
        content += '<th style="background-color: rgb(51, 122, 183); position: relative; z-index: 1; top: 0px; left: 0px;">S.No</th><th>Doctor Name</th>';
        content += '<th style="background-color: rgb(51, 122, 183); position: relative; z-index: 1; top: 0px; left: 0px;">Speciality</th><th>MDL No</th><th>Status</th>';
        content += '<th style="background-color: rgb(51, 122, 183); position: relative; z-index: 1; top: 0px; left: 0px;">Category</th>';
        content += '<th style="background-color: rgb(51, 122, 183); position: relative; z-index: 1; top: 0px; left: 0px;">Standard Visit</th>';
        content += '<th style="background-color: rgb(51, 122, 183); position: relative; z-index: 1; top: 0px; left: 0px;"># Current Month Visits</th>';
        content += '<th style="background-color: rgb(51, 122, 183); position: relative; z-index: 1; top: 0px; left: 0px;"># Previous Month Visits</th>';
        content += '</tr> </thead><tbody>';
        var i = 0;
        if (jsonResult != false && jsonResult != '' && jsonResult != null && jsonResult != undefined) {
            $.each(jsonResult, function (index, value) {

                i = i + 1;
                var curClassName = '';
                var preClassName = '';
                var curValue = 0;
                var preValue = 0;
                var stdVisitCount = 0;
                if (firstTimeLoad) {
                    if ($.inArray(value.Category_Name, disCatAr) == -1) {
                        disCatAr.push(value.Category_Name);
                    }
                    if ($.inArray(value.Speciality_Name, disSpeAr) == -1) {
                        disSpeAr.push(value.Speciality_Name);
                    }
                }

                content += "<tr><td>" + i + "</td>";
                content += "<td>" + value.Doctor_Name + "</td>";
                content += "<td>" + value.Speciality_Name + "</td>";
                content += "<td>" + value.Doctor_MDL + "</td>";
                content += "<td>" + value.Customer_Status + "</td>";
                content += "<td>" + value.Category_Name + "</td>";
                content += "<td>" + value.Norms_Visit_Count + "</td>";
                stdVisitCount = value.Norms_Visit_Count;

                curValue = value.Actual_Visit_Count;
                preValue = value.Last_Actual_Visit_Count;
                if (mode == "1") {
                    //curValue = value.Cur_Month_Category_Missed_Doctors;
                    //preValue = value.Pre_Month_Category_Missed_Doctors;
                    curClassName = 'cls-missed-color';
                    //content += "<td class='cls-missed-color'>" + value.Cur_Month_Category_Missed_Doctors + "</td>";
                    // content += "<td>" + value.Pre_Month_Category_Missed_Doctors + "</td>";
                }
                else if (mode == "2") {
                    //curValue = value.Cur_Month_Category_VC_Followed;
                    //preValue = value.Pre_Month_Category_VC_Followed;
                    curClassName = 'cls-met-std';
                    //content += "<td class='cls-met-std'>" + value.Cur_Month_Category_VC_Followed + "</td>";
                    //content += "<td>" + value.Pre_Month_Category_VC_Followed + "</td>";
                }
                else if (mode == "3") {
                    //curValue = value.Cur_Month_Category_VC_Missed;
                    //preValue = value.Pre_Month_Category_VC_Missed;
                    curClassName = 'cls-met-less';
                    //content += "<td class='cls-met-less'>" + value.Cur_Month_Category_VC_Missed + "</td>";
                    //content += "<td>" + value.Pre_Month_Category_VC_Missed + "</td>";
                }
                else {
                    //curValue = value.Cur_Month_Category_VC_Exceeded;
                    //preValue = value.Pre_Month_Category_VC_Exceeded;
                    curClassName = 'cls-met-more';
                    //content += "<td class='cls-met-more'>" + value.Cur_Month_Category_VC_Exceeded + "</td>";
                    //content += "<td>" + value.Pre_Month_Category_VC_Exceeded + "</td>";
                }

                content += "<td style='text-align:center;' class=" + curClassName + ">" + curValue + "</td>";
                if (preValue == 0) {
                    preClassName = 'cls-missed-color';
                }
                else if (preValue == stdVisitCount) {
                    preClassName = 'cls-met-std';
                }
                else if (preValue < stdVisitCount) {
                    preClassName = 'cls-met-less';
                }
                else {
                    preClassName = 'cls-met-more';
                }
                content += "<td style='text-align:center;' class=" + preClassName + ">" + preValue + "</td></tr>";
            });
        }
        content += " </tbody></table>";
        $('#child').html(content);
        $("#tblCategoryWiseDoctorVisit").tableHeadFixer({ "left": 1 });
        // AdminDashboard.UnblockUI("dvManagerVisit");
        $('html,body').animate({
            scrollTop: $("#dvTitleForRep").offset().top
        },
      'slow');

        if (firstTimeLoad) {
            $("#cboCategory option").remove();
            $("#cboCategory").append("<option >-Select Category-</option>")
            $.each(disCatAr, function (index, value) {
                $("#cboCategory").append("<option>" + value + "</option>")
            });
            $("#cboSpeciality option").remove();
            $("#cboSpeciality").append("<option value=''>-Select Speciality-</option>")
            $.each(disSpeAr, function (index, value) {
                $("#cboSpeciality").append("<option>" + value + "</option>")
            });

        }
        $("#cboCategory").unbind('change').bind('change', function () {
            firstTimeLoad = false;
            AdminDashboard.getUserDashboardCategoryWiseVisits(Month, Year, DivisionName, mode);
        });
        $("#cboSpeciality").unbind('change').bind('change', function () {
            firstTimeLoad = false;
            AdminDashboard.getUserDashboardCategoryWiseVisits(Month, Year, DivisionName, mode);
        });
    },
    bindNewCategoryWiseDoctornErrorCallBack: function (error) {
        var json = error.responseJSON;
        var strace = json.StackTrace.trim().split('at ')[1];
        var strace1 = strace.substring(strace, strace.indexOf('('));
        var srcFile = strace1.split('.');
        var obj = new Object();
        obj.ExceptionName = json.ExceptionType.substring(json.ExceptionType.lastIndexOf('.') + 1, json.ExceptionType.length);
        obj.ReportName = "Norms Coverage Leaf(Activity)";
        obj.ExceptionMessage = json.ExceptionMessage;
        obj.ExceptionSource = srcFile[srcFile.length - 2] + "\/" + srcFile[srcFile.length - 1];
        $.ajax({
            url: '../../Home/DoRecordExceptionLog',
            data: obj,
            method: 'POST',
            success: function () { },
            error: function () { }
        });
        //window.location.href = "../../Home/ErrorPage";
        //window.close();
    },
    getDivisionsForDcrCompliance: function () {
        var action = CompanyCode + "/" + UserCode;
        HDWebApiAjax.requestInvoke("GetDivisions", action, null, "GET", this.fnDCRDivisionsSuccessCallBack, this.fnDCRDivisionsErrorCallBack);
    },
    fnDCRDivisionsSuccessCallBack: function (jsonData) {
        var listItems;
        if (1 < jsonData.length) {
            listItems += "<option selected='selected' data-division_Code = 'All'>-- All --</option>";
            for (var i = 0; i < jsonData.length; i++) {
                listItems += "<option data-division_Code ='" + jsonData[i].Division_Code + "'>" + jsonData[i].Division_Name + "</option>";
            }
        }
        else {

            for (var i = 0; i < jsonData.length; i++) {
                if (i == 0) {
                    listItems += "<option selected='selected' data-division_Code ='" + jsonData[i].Division_Code + "'>" + jsonData[i].Division_Name + "</option>";
                } else {
                    listItems += "<option data-division_Code ='" + jsonData[i].Division_Code + "'>" + jsonData[i].Division_Name + "</option>";
                }
            }

        }
        $("#ddlDcrComplianceDivsion").html(listItems);
        AdminDashboard.fngetDCRComplianceDetail();
    },
    fnDCRDivisionsErrorCallBack: function (jsonData) {

    },

    fngetDCRComplianceDetail: function () {
        var _objData = new Object();
        _objData.Division_Name = $('#ddlDcrComplianceDivsion').val();
        _objData.User_Type = $('#ddlUserType').val();
        _objData.MonthType = $('#ddlMode').val();
        if (_objData.Division_Name == '-- All --') {
            _objData.Division_Name = 'All';
        }
        _objData.CompanyCode = CompanyCode;
        _objData.UserCode = UserCode;
        var action = _objData;
        var params = [];
        var p = {};
        p.name = "objData";
        p.value = _objData
        params.push(p);
        HDWebApiAjax.requestInvoke("GetDCRComplianceNew", "", params, "POST", this.fnNewDCRSuccessCallBack, this.fnNewDCRErrorCallBack, null, "JSON");
    },
    fnNewDCRSuccessCallBack: function (jsonData) {
        debugger;
        $('#dcrcount').show();
        var monthstatus = AdminDashboard.defaults.DcrComplianceMonthType;
        $('#complaincetitle').html('(Click here for more details)');
        if (jsonData != undefined && jsonData != null) {

            if (jsonData[0].DcrCount > 0.0) {

                $("#ComplaniceCount").text(jsonData[0].DcrCount);

                $("#ComplaniceCount").off("click").click(function () {
                    AdminDashboard.getDCRCompliancePopUpNew(monthstatus);
                });

                $('#ComplaniceCount').css('cursor', 'pointer');
                $('#ComplaniceCount').css('text-decoration', 'underline');
            }
            else {
                $("#ComplaniceCount").text(0);
                $("#ComplaniceCount").off("click");
                $('#ComplaniceCount').css('cursor', 'default');
                $('#ComplaniceCount').css('text-decoration', 'blink');
            }

        }
        $('#parent').hide();
        $('#heading').hide();

    },
    fnNewDCRErrorCallBack: function (error) {
        var json = error.responseJSON;
        var strace = json.StackTrace.trim().split('at ')[1];
        var strace1 = strace.substring(strace, strace.indexOf('('));
        var srcFile = strace1.split('.');
        var obj = new Object();
        obj.ExceptionName = json.ExceptionType.substring(json.ExceptionType.lastIndexOf('.') + 1, json.ExceptionType.length);
        obj.ReportName = "DCR Compliance Detail";
        obj.ExceptionMessage = json.ExceptionMessage;
        obj.ExceptionSource = srcFile[srcFile.length - 2] + "\/" + srcFile[srcFile.length - 1];
        $.ajax({
            url: '../../Home/DoRecordExceptionLog',
            data: obj,
            method: 'POST',
            success: function () { },
            error: function () { }
        });
        //window.location.href = "../../Home/ErrorPage";
        //window.close();
    },


    ////////////////////////////////////////////////////////////////////// Category Coverage New //////////////////////////////////////////////////////////////////////////

    getCategoryCoverageDetails: function () {
        debugger;
        $('#dvCategoryCoveragedv').html('<img style="width:50px;margin-left: 39%;margin-top: 17%;" src="../../Content/images/loader11.gif" />');
        AdminDashboard.defaults.CategoryCoverageDetails = $("#ddlCategoryCoverageDivisiondv").find(':selected').data('division_code');
        var _objData = new Object();
        _objData.DivisionCode = AdminDashboard.defaults.CategoryCoverageDetails;
        if (AdminDashboard.defaults.isCoverage == "") {
            _objData.CoverageInput = AdminDashboard.defaults.FM;
        }
        else {
            _objData.CoverageInput = AdminDashboard.defaults.isCoverage;
        }
        _objData.CompanyCode = CompanyCode;
        _objData.RegionCode = RegionCode;
        var action = _objData;
        var params = [];
        var p = {};
        p.name = "objData";
        p.value = _objData
        params.push(p);
        HDWebApiAjax.requestInvoke("GetDrCoverage", "", params, "POST", this.fnDrCoverageSuccessCallBack, this.fnDrCoverageErrorCallBack, null, "JSON");
    },
    fnDrCoverageSuccessCallBack: function (JsonResult) {
        debugger;
        var CategoryData = JsonResult;
        var sum = 0, sum2 = 0;

        //style='border: 1px solid black; cellspacing='0' cellpadding='0' id='dvJoinerAttrition' width='100%' border-collapse: collapse;

        for (i = 0; i < 12; i++) {
            sum += parseInt(CategoryData.Current[i].Total);
            sum2 += parseInt(CategoryData.Previous[i].Total);
        }

        var str = '<table class="table table-striped"; cellspacing="0" cellpadding="0" id="dvCategoryCoveragedv" width="100%;" style="border: 0.1px solid lightgrey;text-align: center; border-collapse: collapse;"><thead><tr cellspacing="0" style="background-color:darkslategray;color:white"><th style = "border: 0.1px solid lightgrey;text-align: center;" colspan="1"> No of Time Met</th><th style = "border: 0.1px solid lightgrey;text-align: center;"colspan="2">No of ' + doctor_caption + ' Met</th></tr>';
        str += '<tr><th style="border: 0.1px solid lightgrey;"></th><th style="border: 0.1px solid lightgrey;text-align: center;">' + FM + '</th><th style="border: 0.1px solid lightgrey;text-align: center;">' + PM + '</th></tr></thead><tbody>';
        for (var i = 0; i < 11; i++) {

            str += '<tr><td style = "border: 0.1px solid lightgrey;text-align: center;">' + CategoryData.Current[i].count + '</td><td style = "border: 0.1px solid lightgrey;text-align: center">' + CategoryData.Current[i].Total + '</td><td>' + CategoryData.Previous[i].Total + '</td></tr>';
        }
        str += '<tr><td style = "border: 0.1px solid lightgrey;text-align: center;"> More than 10 </td><td style = "border: 0.1px solid lightgrey;text-align: center">' + CategoryData.Current[i].Total + '</td><td>' + CategoryData.Previous[i].Total + '</td></tr>';
        str += '<tr><td style = "border: 0.1px solid lightgrey;text-align: center;">' + doctor_caption + 'S Total</td><td style="text-align: center;font-weight: bold; ">' + sum + '</td><td style="text-align: center;font-weight: bold; ">' + sum2 + '</td></tr>';



        str += '</tbody></table>';
        $('#dvCategoryCoveragedv').html('');
        $('#dvCategoryCoveragedv').html(str);


    },
    fnDrCoverageErrorCallBack: function (JsonResult) {

    },

    // Joiner and Attrition 

    getJoinerAttritionV2: function () {
        debugger;
        AdminDashboard.defaults.JoinerAttritionDetails = $("#ddlJoinerAttrition").find(':selected').data('division_code');
        var _objData = new Object();
        _objData.DivisionCode = AdminDashboard.defaults.JoinerAttritionDetails;
        _objData.CompanyCode = CompanyCode;
        _objData.UserCode = UserCode;
        var action = _objData;
        var params = [];
        var p = {};
        p.name = "objData";
        p.value = _objData
        params.push(p);
        HDWebApiAjax.requestInvoke("GetJoinerAttritionV2", "", params, "POST", this.fnJA2SuccessCallBack, this.fnJA2ErrorCallBack, null, "JSON");
    },
    fnJA2SuccessCallBack: function (JsonData) {
        debugger;
        var JoinAttri = "";

        JoinAttri += "<table class='table table-striped'; cellspacing='0' cellpadding='0' id='dvJoinerAttrition' width='100%' border-collapse: collapse;>";
        JoinAttri += "<thead>";
        //JoinAttri += "<tr><td>" + JsonData.month1[0].Month + "</td></tr>";
        JoinAttri += "<tr style='background-color:darkslategray;color:white;'><td style='border: 0.1px solid lightgrey;padding: 10px 28px;'colspan='1';>Month</td><td style='border: 0.1px solid lightgrey; padding: 10px 28px;'colspan='2';>" + JsonData.month1[0].Month + "</td><td style='border: 0.1px solid lightgrey; padding: 10px 28px;'colspan='2';>" + JsonData.month2[0].Month + "</td> <td style='border:0.1px solid lightgrey; padding: 10px 28px;'colspan='2';>" + JsonData.month3[0].Month + "</td></tr>";
        JoinAttri += "<tr><th style='border: 0.1px solid lightgrey;' id='ddlJoinerAttrition';>Division Name</th>";
        JoinAttri += "<th style='border: 0.1px solid lightgrey;'>Joiner</th>";
        JoinAttri += "<th style='border: 0.1px solid lightgrey;'>Attrition</th>";
        JoinAttri += "<th style='border: 0.1px solid lightgrey;'>Joiner</th>";
        JoinAttri += "<th style='border: 0.1px solid lightgrey;'>Attrition</th>";
        JoinAttri += "<th style='border: 0.1px solid lightgrey;'>Joiner</th>";
        JoinAttri += "<th style='border: 0.1px solid lightgrey;'>Attrition</th>";
        JoinAttri += "</tr>";
        JoinAttri += "</thead>";
        JoinAttri += "<tbody>";
        for (var i = 0; i < JsonData.month1.length; i++) {
            JoinAttri += "<tr>";
            JoinAttri += "<td style='border: 0.1px solid lightgrey; padding: 10px 19px;'>" + JsonData.month1[i].DivisionName + "</td><td style='border: 0.1px solid lightgrey; padding: 10px 19px;'>" + JsonData.month1[i].Joiners + "</td> <td style='border: 0.1px solid lightgrey; padding: 10px 19px;'>" + JsonData.month1[i].Attrition + "</td> <td style='border: 0.1px solid lightgrey; padding: 10px 19px;'>" + JsonData.month2[i].Joiners + "</td><td style='border: 0.1px solid lightgrey; padding: 10px 19px;'>" + JsonData.month2[i].Attrition + "</td> <td style='border: 0.1px solid lightgrey; padding: 10px 19px;'>" + JsonData.month3[i].Joiners + "</td><td style='border: 0.1px solid lightgrey; padding: 10px 19px;'>" + JsonData.month3[i].Attrition + "</td>"
            JoinAttri += "</tr>";
        }

        JoinAttri += "</tbody>";
        $('#dvJoinerAttritionv2').html(JoinAttri + "</table>");
    },
    fnJA2ErrorCallBack: function (error) {
        var json = error.responseJSON;
        var strace = json.StackTrace.trim().split('at ')[1];
        var strace1 = strace.substring(strace, strace.indexOf('('));
        var srcFile = strace1.split('.');
        var obj = new Object();
        obj.ExceptionName = json.ExceptionType.substring(json.ExceptionType.lastIndexOf('.') + 1, json.ExceptionType.length);
        obj.ReportName = "Joiner Vs Attrition";
        obj.ExceptionMessage = json.ExceptionMessage;
        obj.ExceptionSource = srcFile[srcFile.length - 2] + "\/" + srcFile[srcFile.length - 1];
        $.ajax({
            url: '../../Home/DoRecordExceptionLog',
            data: obj,
            method: 'POST',
            success: function () { },
            error: function () { }
        });
        //window.location.href = "../../Home/ErrorPage";
        //window.close();
    },
    ////////////////////////////////////////////////////////////////Call Average and Productive Call Average ////////////////////////
    getCallAverage: function () {
        debugger;
        $('#tblCallaverage').hide();
        $('#loading2').show();
        AdminDashboard.defaults.CallAverages = $("#ddlDivisioncallAverage").find(':selected').data('division_code');
        AdminDashboard.defaults.CallFlag = $("#CallMonthddl").val();
        //var _objData = new Object();
        var Division_Code = AdminDashboard.defaults.CallAverages;
        var flag = AdminDashboard.defaults.CallFlag;
        //var Division_Code = "1000";
        //var flag = "PM";
        var action = CompanyCode + "/" + UserCode + "/" + Division_Code + "/" + flag;
        HDWebApiAjax.requestInvoke("GetCallAVerage", action, null, "GET", this.fnCallAverageSuccessCallBack, this.fnCallAverageErrorCallBack);
    },
    fnCallAverageSuccessCallBack: function (response) {
        debugger;
        var Call_Avg = new Array();
        var table;
        //Call_Avg = table.Tables[0].Rows;
        //if(Call_Avg.length > 0) {
        if (response != null && response.Data != null && response.Data.Tables != null && response.Data.Tables.length > 0) {

            Call_Avg = response.Data.Tables[0].Rows;

            if (Call_Avg.length > 0) {

                // Header Column Name 
                var call_objects = Call_Avg[0];
                var tempValue = Object.keys(call_objects);
                var value = AdminDashboard.fnMove(tempValue, 0, 2);
                var table = "";
                var dynamic = "";
                // table += "<table id='tblCallaverage' class='table table-striped'>";style='width:100%'; background:'#5E87B0 !important;'
                table += "<table class='table-striped table' cellspacing='0' cellpadding='0' id='tblCallaverage' width='100%' border-collapse: collapse;>";
                table += "<thead>";
                table += "<tr>";
                for (var j = 0; j < value.length; j++) {
                    if (value[j] != "Average_Number") {
                        dynamic += "<th style='border: 0.1px solid lightgrey;height:40%; text-align: center;'>" + (value[j] == "User_Type_Name" ? "Call Average" : value[j]) + "</th>";
                        //dynamic += "<th style='border: 0.1px solid lightgrey; text-align: center; width:100%;'>" + value[j] + "</th>";

                    }
                }
                table += dynamic + "</tr>";
                table += "</thead>";
                table += "<tbody>";
                for (var call_avg_count = 0; call_avg_count < Call_Avg.length; call_avg_count++) {

                    table += "<tr>";
                    for (var i = 0; i < value.length ; i++) {
                        if (value[i] == "User_Type_Name") {

                            table += "<td style='border: 0.1px solid lightgrey; padding: 10px 19px; text-align: left;'>" + (Call_Avg[call_avg_count][value[i]] == null ? "0" : Call_Avg[call_avg_count][value[i]]) + "(" + (Call_Avg[call_avg_count]["Average_Number"] == "null" ? "0" : Call_Avg[call_avg_count]["Average_Number"]) + ")" + "</td>";
                        } else {
                            if (value[i] != "Average_Number")
                                table += "<td style='border: 0.1px solid lightgrey; padding: 10px 19px; text-align: left;'>" + (Call_Avg[call_avg_count][value[i]] == null ? "0" : Call_Avg[call_avg_count][value[i]]) + "</td>";
                        }
                    }
                    table += "</tr>";
                }
                table += "</tbody>";
                $('#tblCallaverage').html(table + "</table>");
            }
            else {
                $('#tblCallaverage').html("<div class='table' style='font-size: medium;text-align: center;color: darkorange;padding: 70px;'>No Data Found </div>");
            }
        }
        else {
            // $('#tblCallaverage').html("No Data found");
            $('#tblCallaverage').html("<div class='table' style='font-size: medium;text-align: center;color: darkorange;padding: 70px;'>No Data Found </div>");

        }
        $('#loading2').hide();
        $('#tblCallaverage').show();

    },
    fnCallAverageErrorCallBack: function (response) {
        $('#loading2').hide();
        $('#tblCallaverage').show();
    },
    fnMove: function (obj, val1, val2) {
        var b = obj[val1];
        obj[val1] = obj[val2];
        obj[val2] = b;
        return obj;
    },
    ///////////////////////////////////////////////////Productive Call average //////////////////////////////////////////////////////////

    getProductiveCall: function () {
        $('#tblCallaverage').hide();
        $('#loading2').show();
        AdminDashboard.defaults.ProductiveCallAverages = $("#ddlDivisioncallAverage").find(':selected').data('division_code');
        AdminDashboard.defaults.CallFlag = $("#CallMonthddl").val();
        //var _objData = new Object();
        var Division_Code = AdminDashboard.defaults.ProductiveCallAverages;
        var flag = AdminDashboard.defaults.CallFlag;
        ////var _objData = new Object();
        //var Division_Code = "1000";
        //var flag = "PM";
        var action = CompanyCode + "/" + UserCode + "/" + Division_Code + "/" + flag;
        HDWebApiAjax.requestInvoke("GetProductiveCallAverage", action, null, "GET", this.fnProductiveSuccessCallBack, this.fnProductiveErrorCallBack);
    },
    fnProductiveSuccessCallBack: function (response) {
        debugger;
        var Call_Avg = new Array();
        var table;

        if (response != null && response.Data != null && response.Data.Tables != null && response.Data.Tables.length > 0) {

            Call_Avg = table.Data.Tables[0].Rows;

            //Call_Avg = table.Tables[0].Rows;
            if (Call_Avg.length > 0) {

                // Header Column Name 
                var call_objects = Call_Avg[0];
                var tempValue = Object.keys(call_objects);
                var value = AdminDashboard.fnMove(tempValue, 0, 2);
                var table = "";
                var dynamic = "";
                table += "<table class='table table-striped'; cellspacing='0' cellpadding='0' id='tblCallaverage' width='100%' border-collapse: collapse;>";
                table += "<thead>";
                table += "<tr>";
                for (var j = 0; j < value.length; j++) {
                    if (value[j] != "Average_Number") {
                        dynamic += "<th style='border: 0.1px solid lightgrey; text-align: center;'>" + (value[j] == "User_Type_Name" ? "Call Average" : value[j]) + "</th>";
                    }
                }
                table += dynamic + "</tr>";
                table += "</thead>";
                table += "<tbody>";
                for (var call_avg_count = 0; call_avg_count < Call_Avg.length; call_avg_count++) {

                    table += "<tr>";
                    for (var i = 0; i < value.length ; i++) {
                        if (value[i] == "User_Type_Name") {
                            table += "<td style='border: 0.1px solid lightgrey; padding: 10px 19px; text-align: center;'>" + (Call_Avg[call_avg_count][value[i]] == null ? "0" : Call_Avg[call_avg_count][value[i]]) + "(" + (Call_Avg[call_avg_count]["Average_Number"] == "null" ? "0" : Call_Avg[call_avg_count]["Average_Number"]) + ")" + "</td>";
                        } else {
                            if (value[i] != "Average_Number")
                                table += "<td style='border: 0.1px solid lightgrey; padding: 10px 19px; text-align: center;'>" + (Call_Avg[call_avg_count][value[i]] == null ? "0" : Call_Avg[call_avg_count][value[i]]) + "</td>";
                        }
                    }
                    table += "</tr>";
                }
                table += "</tbody>";
                $('#tblCallaverage').html(table + "</table>");
            }
            else {
                $('#tblCallaverage').html("<div class='table' style='font-size: medium;text-align: center;color: darkorange;padding: 70px;'>No Data Found </div>");
            }

        }
        else {
            //$('#tblCallaverage').html("");
            $('#tblCallaverage').html("<div class='table' style='font-size: medium;text-align: center;color: darkorange;padding: 70px;'>No Data Found </div>");
        }
        $('#loading2').hide();
        $('#tblCallaverage').show();
    },
    fnProductiveErrorCallBack: function (response) {

    },

    ////////////////////////////////////////////////////////////DCR Time Lag///////////////////////////////////////////////////////////////
    getDCRTimeLag: function () {

        $('#tblDCRTPDeviation').html('<img style="width:50px;margin-top: 70px;" src="../../Content/images/loader11.gif" />');
        var _objData = new Object();
        _objData.DivisionCode = AdminDashboard.defaults.DCRTPVale;
        _objData.Flag = AdminDashboard.defaults.DCRMonth;
        $(".TPFilters").hide();
        _objData.CompanyCode = CompanyCode;
        _objData.UserCode = UserCode;
        var action = _objData;
        var params = [];
        var p = {};
        p.name = "objData";
        p.value = _objData
        params.push(p);
        HDWebApiAjax.requestInvoke("GetDCRTimeLag", "", params, "POST", this.fnTimelagSuccessCallBack, this.fnTimelagErrorCallBack, null, "JSON");
    },
    fnTimelagSuccessCallBack: function (JsonData) {
        debugger;
        var PST = JsonData;
        if (PST.length == 0) {
            $('#tblDCRTPDeviation').html("<div><label style='margin-top: 70px;font-size: 18px;'>No Data Found</label></div>");
        }
        else {
            var count = PST[0].Zero + PST[0].One + PST[0].Two + PST[0].Three + PST[0].GreThree
            var PecGreThree = PST[0].GreThree == 0 ? 0 + "%" : ((PST[0].GreThree / count) * 100).toFixed(2) + "%";
            var PecThree = PST[0].Three == 0 ? 0 + "%" : ((PST[0].Three / count) * 100).toFixed(2) + "%";
            var PecTwo = PST[0].Two == 0 ? 0 + "%" : ((PST[0].Two / count) * 100).toFixed(2) + "%";
            var PecOne = PST[0].One == 0 ? 0 + "%" : ((PST[0].One / count) * 100).toFixed(2) + "%";
            var PecZero = PST[0].Zero == 0 ? 0 + "%" : ((PST[0].Zero / count) * 100).toFixed(2) + "%";

            var DCR = google.visualization.arrayToDataTable([
              ['Day', 'DCR', { role: 'annotation' }],
              ['Three+', PST[0].GreThree, PecGreThree],
              ['Three Day', PST[0].Three, PecThree],
              ['Two Day', PST[0].Two, PecTwo],
              ['One Day', PST[0].One, PecOne],
               ['Same Day', PST[0].Zero, PecZero]
            ]);
            var options = {
                legend: { position: 'top' },
                hAxis: {
                    title: 'DCR Count',
                },
                vAxis: {
                    title: 'Days Taken'
                },
                series: {
                    0: { color: "#FF9800" },
                },
                width: 520, height: 220,
            };
            $('#tblDCRTPDeviation').html('');
            $('#TotalCountDev').html('');
            $('#TotalCountDev').html(count);
            var table = new google.visualization.BarChart(document.getElementById("tblDCRTPDeviation"));
            table.draw(DCR, options, { showRowNumber: true });
            function fnTimelagHandler() {
                var selectedItem = table.getSelection()[0];
                if (selectedItem) {
                    if (selectedItem.row != null) {
                        debugger
                        //AdminDashboard.defaults.OpenDivision = '';
                        //AdminDashboard.defaults.OpenDivision = data.getValue(selectedItem.row, 0);
                        AdminDashboard.redirectToTimeLagReport();
                    }
                }
            } google.visualization.events.addListener(table, 'select', fnTimelagHandler)
            table.draw(DCR, options);
        }

    },
    fnTimelagErrorCallBack: function (JsonData) {

    },
    redirectToTimeLagReport: function () {
        debugger
        var IsCurrent = AdminDashboard.defaults.DCRMonth;
        //var Catagory = encodeURIComponent(AdminDashboard.defaults.OpenDivision);
        Division_Name = $('#ddldivisionDeviation option:selected').val();
        if (Division_Name == '-- All --') {
            Division_Name = 'All';
        }
        else {
            Division_Name = Division_Name.replace(/ /g, '_');
        }


        var IsSync = 0;
        $('#main').load('../../Dashboard/Timelagonclick/' + Division_Name + "~" + IsCurrent + "~" + IsSync);
        //$('#ulMenu').hide();
    },
    /////////////////////////////////////////////////////////Time Investment///////////////////////////////////////////////////////


    getTimeInvestmentDetails: function () {
        $('#tblDCRActivity').html('<img style="width:50px;margin-top: 70px;" src="../../Content/images/loader11.gif" />');
        $('#tblTimeInvestment').hide();
        $('#loading3').show();
        AdminDashboard.defaults.TimeInvestment = $("#ddlDivisionTime").find(':selected').data('division_code');
        AdminDashboard.defaults.TimeInvestmentMonth = $("#ddlMonthofInvestment").val();
        var _objData = new Object();
        _objData.DivisionCode = AdminDashboard.defaults.TimeInvestment;
        _objData.Flag = AdminDashboard.defaults.TimeInvestmentMonth;
        _objData.CompanyCode = CompanyCode;
        _objData.UserCode = UserCode;
        var action = _objData;
        var params = [];
        var p = {};
        p.name = "objData";
        p.value = _objData
        params.push(p);
        HDWebApiAjax.requestInvoke("GetTimeInvestment", "", params, "POST", this.fnTimeInvSuccessCallBack, this.fnTimeInvErrorCallBack, null, "JSON");
    },
    fnTimeInvSuccessCallBack: function (JsonData) {
        debugger;
        var PST = JsonData;
        if (PST[0].FieldWork == 0 && PST[0].Attendance == 0 && PST[0].Leave == 0 && PST[0].NON_Compliance == 0) {
            $('#tblDCRActivity').html("<div><label style='margin-top: 70px;font-size: 18px;'>No Data Found</label></div>");
        }
        else {
            var data = google.visualization.arrayToDataTable([
              ['DCR', 'Time Inversed'],
              ['Field Work', PST[0].FieldWork],
              ['Attendance', PST[0].Attendance],
              ['Leave', PST[0].Leave],
              ['LWP', PST[0].LOP],
              ['Non Entered DCR', PST[0].NON_Compliance],
            ]);

            var options = {
                width: 510, height: 220,
                is3D: true,

                colors: ['#3366cc', '#1E90FF', '#f4be41', '#f4eb41', '#f85f73']
            };
            $('#TotalCount').html('');
            $('#TotalCount').html(PST[0].TotalDays);
            var chart = new google.visualization.PieChart(document.getElementById('tblDCRActivity'));

            function fnTimeInvestHandler() {
                var selectedItem = chart.getSelection()[0];
                if (selectedItem) {
                    if (selectedItem.row != null) {
                        debugger
                        AdminDashboard.defaults.OpenDivision = '';
                        AdminDashboard.defaults.OpenDivision = data.getValue(selectedItem.row, 0);
                        AdminDashboard.redirectToTimeInvestReport();
                    }
                }
            }

            function fnTimelagHandler() {
                var selectedItem = table.getSelection()[0];
                if (selectedItem) {
                    if (selectedItem.row != null) {
                        debugger
                        //AdminDashboard.defaults.OpenDivision = '';
                        //AdminDashboard.defaults.OpenDivision = data.getValue(selectedItem.row, 0);
                        AdminDashboard.redirectToTimeLagReport();
                    }
                }
            }
            google.visualization.events.addListener(chart, 'select', fnTimeInvestHandler)
            chart.draw(data, options);
        }
    },

    redirectToTimeInvestReport: function () {
        debugger
        var IsCurrent = AdminDashboard.defaults.TimeInvestmentMonth;
        //var Catagory = encodeURIComponent(AdminDashboard.defaults.OpenDivision);
        Division_Name = $('#ddlDivisionTime').val();
        if (Division_Name == '-- All --') {
            Division_Name = 'All';
        }
        else {
            Division_Name = Division_Name.replace(/ /g, '_');
        }

        var IsSync = 0;
        $('#main').load('../../Dashboard/TimeInvestmentonclick/' + Division_Name + "~" + IsCurrent + "~" + IsSync);
        //$('#ulMenu').hide();
    }, fnTimeInvErrorCallBack: function (error) {
        $('#loading3').hide();
        $('#tblDCRActivity').show();
        //var json = error.responseJSON;
        //var strace = json.StackTrace.trim().split('at ')[1];
        //var strace1 = strace.substring(strace, strace.indexOf('('));
        //var obj = new Object();
        //obj.ExceptionName = json.ExceptionType.substring(json.ExceptionType.lastIndexOf('.') + 1, json.ExceptionType.length);
        //obj.ReportName = "Time Investment(Compliance)";
        //obj.ExceptionMessage = json.ExceptionMessage;
        //obj.ExceptionSource = strace1[strace1.length - 2] + "\/" + strace1[strace1.length - 1];
        //$.ajax({
        //    url: '../../Home/DoRecordExceptionLog',
        //    data: obj,
        //    method: 'POST',
        //    success: function () { },
        //    error: function () { }
        //});
        //window.opener.parent.location.href = "../../Home/ErrorPage";
        //window.close();

    },
    ////////////////////////////////////////////////////////////TP Time Lag ////////////////////////////////////////////////////////////////

    getTPTimeLag: function () {
        $('#tblDCRTPDeviation').html('<img style="width:50px;margin-top: 70px;" src="../../Content/images/loader11.gif" />');
        AdminDashboard.defaults.TPFilter = $("#TPactivityfilter").val();
        var _objData = new Object();
        _objData.DivisionCode = AdminDashboard.defaults.DCRTPVale;
        _objData.Flag = AdminDashboard.defaults.DCRMonth;
        var test = AdminDashboard.defaults.DeviationLag;
        if (test == "TP Deviation") {
            //  _objData.Deviation = AdminDashboard.defaults.DeviationLag;

            _objData.Deviation = AdminDashboard.defaults.TPFilter
        }
        else {
            _objData.Deviation = AdminDashboard.defaults.DeviationLag;
        }
        _objData.CompanyCode = CompanyCode;
        _objData.UserCode = UserCode;
        var action = _objData;
        var params = [];
        var p = {};
        p.name = "objData";
        p.value = _objData
        params.push(p);
        HDWebApiAjax.requestInvoke("GetTPTimeLag", "", params, "POST", this.fnTpTimelagSuccessCallBack, this.fnTpTimelagErrorCallBack, null, "JSON");
        $(".TPFilters").show();
    },
    fnTpTimelagSuccessCallBack: function (JsonData) {
        var TPLagDetails = "";

        TPLagDetails += "<table class='table table-striped'; cellspacing='0' cellpadding='0' id='tblDCRTPDeviation' width='100%' border-collapse: collapse;>";
        TPLagDetails += "<thead>";
        TPLagDetails += "<tr><th style='border: 0.1px solid lightgrey; text-align: center;'>No. of Deviation Per Person</th>";
        TPLagDetails += "<th style='border: 0.1px solid lightgrey; text-align: center;'>0</th>";
        TPLagDetails += "<th style='border: 0.1px solid lightgrey; text-align: center;'>1</th>";
        TPLagDetails += "<th style='border: 0.1px solid lightgrey; text-align: center;'>2</th>";
        TPLagDetails += "<th style='border: 0.1px solid lightgrey; text-align: center;'>3</th>";
        TPLagDetails += "<th style='border: 0.1px solid lightgrey; text-align: center;'>4</th>";
        TPLagDetails += "<th style='border: 0.1px solid lightgrey; text-align: center;'> >4 </th>";
        TPLagDetails += "</tr>";
        TPLagDetails += "</thead>";
        TPLagDetails += "<tbody>";

        for (var i = 0; i < JsonData.length; i++) {
            TPLagDetails += "<tr>";
            TPLagDetails += "<td style='border: 0.1px solid lightgrey; padding: 10px 19px; text-align: center;'>" + JsonData[i].User_Type_Name + "</td><td style='border: 0.1px solid lightgrey; padding: 10px 19px; text-align: center;'>" + JsonData[i].Zero + "</td>"
            TPLagDetails += "<td style='border: 0.1px solid lightgrey; padding: 10px 19px; text-align: center;'>" + JsonData[i].One + "</td> <td style='border: 0.1px solid lightgrey; padding: 10px 19px; text-align: center;'>" + JsonData[i].Two + "</td>"
            TPLagDetails += "<td style='border: 0.1px solid lightgrey; padding: 10px 19px; text-align: center;'>" + JsonData[i].Three + "</td> <td style='border: 0.1px solid lightgrey; padding: 10px 19px; text-align: center;'>" + JsonData[i].Four + "</td>"
            TPLagDetails += "<td style='border: 0.1px solid lightgrey; padding: 10px 19px; text-align: center;'>" + JsonData[i].GreaterthanFour + "</td>";
            TPLagDetails += "</tr>";
        }

        TPLagDetails += "</tbody>";
        $('#tblDCRTPDeviation').html('');
        $('#tblDCRTPDeviation').html(TPLagDetails + "</table>");

    },
    fnTpTimelagErrorCallBack: function (JsonData) {

    },

    fnchooseproductField: function () {
        debugger;
        $("#myModal").modal('show');
        //$('#overylay').overlay().load();
        AdminDashboard.fngetproductname();
    },
    ///////////////////////////////// Dr Coverage Value//////////////////////////////////
    getDrCoverageChart: function () {
        debugger;
        $('#dvDrCoverageBarChat').html('<img style="width:50px;margin-top: 25%;" src="../../Content/images/loader11.gif" />');
        Division_Name = $('#ddlDrCoverage').val();
        if (Division_Name == "--All--") {
            Division_Name = "All";
        }
        var SelectMonth = $('#selectedmonth').val();
        var mode1 = 0, mode2 = 0;
        var days = '';
        if ($("#coverageexc").prop('checked') == true) {
            mode1 = 1;
            $('input[name=UnApprovedDocterhid]').val('Selected');
        }
        else {
            $('input[name=UnApprovedDocterhid]').val(' Not Selected');
        }
        if ($("#coverageVaccexc").prop('checked') == true) {
            mode2 = 1;
            $('input[name=UnApprovedVaccDocterhid]').val('Selected');
        }
        else {
            $('input[name=UnApprovedVaccDocterhid]').val(' Not Selected');
        }
        if ($('#DrCoverageRgnCount').val() === "" || $('#DrCoverageRgnCount').val() == undefined || $('#DrCoverageRgnCount').val() == null) {
            AdminDashboard.defaults.days = '0.0';
        }
        else {
            AdminDashboard.defaults.days = $('#DrCoverageRgnCount').val();
        }
        var day1;
        if (days.indexOf('.') > -1) {
            day1 = days.split('.')[1];
        }
        else {
            day1 = 0;
        }
        var EDivision = 0;
        if ($("#Coveragediv").prop('checked') == true) {
            EDivision = 1;
        }
        var action = CompanyCode + "/" + RegionCode + "/" + SelectMonth + "/" + Division_Name + "/" + mode1 + "/" + mode2 + "/" + AdminDashboard.defaults.days + "/" + EDivision;
        //var action = CompanyCode + "/" + RegionCode + "/" + SelectMonth + "/" + Division_Name + "/" + mode1 + "/" + mode2;
        HDWebApiAjax.requestInvoke("GetDrCoverageValue", action, null, "GET", this.getDrCoverageChartSuccessCallBack, this.getDrCoverageChartErrorCallBack);
    },
    getDrCoverageChartSuccessCallBack: function (response) {
        debugger;

        var DRdata = new google.visualization.DataTable();
        var Coverage = new Array();
        if (response != null && response.Data != null && response.Data.Tables != null && response.Data.Tables.length > 0) {
            Coverage = response.Data.Tables[0].Rows;
            if (Coverage.length > 0) {

                // Header Column Name 
                var call_objects = Coverage[0];
                var value = Object.keys(call_objects);
                DRdata.addColumn('string', 'Month');
                for (var j = 0; j < value.length; j++) {

                    if (value[j] != "Month") {
                        DRdata.addColumn('number', value[j]);
                    }
                }
            }


            if (value.length == 1) {
                for (var k = 0; k < Coverage.length; k++) {
                    DRdata.addRow([Coverage[k][value[0]]]);
                }
            }
            else if (value.length == 2) {
                for (var k = 0; k < Coverage.length; k++) {
                    DRdata.addRow([Coverage[k][value[0]], Coverage[k][value[1]]]);
                }
            }
            else if (value.length == 3) {
                for (var k = 0; k < Coverage.length; k++) {
                    DRdata.addRow([Coverage[k][value[0]], Coverage[k][value[1]], Coverage[k][value[2]]]);
                }
            }
            else if (value.length == 4) {
                for (var k = 0; k < Coverage.length; k++) {
                    DRdata.addRow([Coverage[k][value[0]], Coverage[k][value[1]], Coverage[k][value[2]], Coverage[k][value[3]]]);
                }
            }
            else {
                for (var k = 0; k < Coverage.length; k++) {
                    DRdata.addRow([Coverage[k][value[0]], Coverage[k][value[1]], Coverage[k][value[2]], Coverage[k][value[3]], Coverage[k][value[4]]]);
                }
            }




            var options = {
                chartArea: { left: 90, top: 20, width: '90%', height: '80%' },
                vAxis: {
                    title: 'Coverage %', viewWindow: { min: 0 }, isStacked: true,
                },
                hAxis: { gridlines: { color: 'none' }, slantedText: true, title: 'Month', },
                legend: "top",
                seriesType: 'bars',
                series: {
                    0: { color: "#3b36ed" },
                    1: { color: "#FF7F50" },
                    2: { color: "#06b9b9" },
                    3: { color: "rgb(161, 110, 229)" }
                },
                width: 500, height: 335,
            };
            $('#dvDrCoverageBarChat').html('');

            var table = new google.visualization.ComboChart(document.getElementById("dvDrCoverageBarChat"));
            table.draw(DRdata, options, { showRowNumber: true });

            google.visualization.events.addListener(table, 'select', function () {
                debugger;
                table1 = table;
                DRdata1 = DRdata;
                var unapprovedDoctor = "", vacant = "", days = '';
                if ($("#coverageexc").prop('checked') == true) {
                    unapprovedDoctor = 'Selected';
                }
                else {
                    unapprovedDoctor = 'NotSelected';
                }
                if ($("#coverageVaccexc").prop('checked') == true) {
                    vacant = 'Selected';
                }
                else {
                    vacant = 'NotSelected';
                }
                if ($('#DrCoverageRgnCount').val() == "") {
                    days = '0.0';
                }
                else {
                    days = $('#DrCoverageRgnCount').val();
                }
                var EDivision = 0;
                if ($("#Coveragediv").prop('checked') == true) {
                    EDivision = 1;
                }
                AdminDashboard.selectHandler(unapprovedDoctor, vacant, "Coverage", days, EDivision);
            });
            table.draw(DRdata, options);



        }
        else {
            $('#dvDrCoverageBarChat').html('<h2 style="text-align: center;margin-top: 32%;">No Record Found</h2>');
        }
    },
    selectHandler: function (unapproved, vacant, mode, days, EDivision) {
        debugger;
        var SelectedItem = table1.getSelection()[0];
        var unapprovedvacant;
        var unapprovedDoctor;
        var Division_Name;
        if (SelectedItem) {
            if (SelectedItem.row != null) {
                var getMonth = DRdata1.getValue(SelectedItem.row, 0);
                var EUD = null, EVT = null;

                if (unapproved == "Selected") {
                    unapprovedDoctor = 1;
                }
                else {
                    unapprovedDoctor = 0;
                }
                if (vacant == 'Selected') {
                    unapprovedvacant = 1;
                }
                else {
                    unapprovedvacant = 0;
                }
                var Division_Name = $('#ddlDrCompliance').val();
                if (Division_Name == "--All--") {
                    Division_Name = "All";
                }
              
                var day1;
                if (days.indexOf('.') > -1) {
                    day1 = days.split('.')[1];
                }
                else {
                    day1 = 0;
                }
                var Month = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];

                var startDate = "20" + getMonth.split("'")[1] + "-" + (Month.indexOf(getMonth.split("'")[0].toUpperCase()) + 1) + "-" + "01";
                var endDate = "20" + getMonth.split("'")[1] + "-" + (Month.indexOf(getMonth.split("'")[0].toUpperCase()) + 1) + "-" + AdminDashboard.fnDaysInMonth((Month.indexOf(getMonth.split("'")[0].toUpperCase()) + 1), "20" + getMonth.split("'")[1]);
                dcrStatus = "2,";

                var paramValues = CompanyCode + "~" + RegionCode + "~" + startDate + "~" + endDate + "~" + encodeURIComponent(Division_Name) + "~" + unapprovedvacant + "~" + unapprovedDoctor + "~" + mode + "~" + days.split('.')[0] + "~" + day1 + "~" + 0 + "~" + EDivision;

                $("#main").load("../../DashBoard/ActivityDashboardSyn/" + paramValues);
            }
        }
    },
    fnDaysInMonth: function (month, year) {
        return new Date(year, month, 0).getDate();
    },
    onfailureCallback: function (response) {
        fnBootBoxAlert();
    },
    getDrCoverageChartErrorCallBack: function (error) {
        debugger;
        $('#dvDrCoverageBarChat').html('');
        var json = error.responseJSON;
        var strace = json.StackTrace.trim().split('at ')[1];
        var strace1 = strace.substring(strace, strace.indexOf('('));
        var srcFile = strace1.split('.');
        var obj = new Object();
        obj.ExceptionName = json.ExceptionType.substring(json.ExceptionType.lastIndexOf('.') + 1, json.ExceptionType.length);
        obj.ReportName = "Doctor Coverage(Activity)";
        obj.ExceptionMessage = json.ExceptionMessage;
        obj.ExceptionSource = srcFile[srcFile.length - 2] + "\/" + srcFile[srcFile.length - 1];
        $.ajax({
            url: '../../Home/DoRecordExceptionLog',
            data: obj,
            method: 'POST',
            success: function () { },
            error: function () { }
        });
        //window.location.href = "../../Home/ErrorPage";
        //window.close();
    },

    ////////////////////////////////Dr Compliance///////////////
    getDrComplianceChart: function () {
        debugger;
        var days = '';
        $('#dvDrCompliaceBarChat').html('<img style="width:50px;margin-top: 25%;"  src="../../Content/images/loader11.gif" />');
        var Division_Name = $('#ddlDrCompliance').val();
        if (Division_Name == "--All--") {
            Division_Name = "All";
        }
        var SelectMonth = $('#selectedmonths').val();
        var mode1 = 0, mode2 = 0;
        if ($("#complianceeexc").prop('checked') == true) {
            mode1 = 1;
            $('input[name=UnApprovehid]').val('Selected');
        }
        else {
            $('input[name=UnApprovehid]').val('Not Selected');
        }
        if ($("#compliancVaccexc").prop('checked') == true) {
            mode2 = 1;
            $('input[name=Vaccancyhid]').val('Selected');
        }
        else {
            $('input[name=Vaccancyhid]').val('Not Selected');
        }
        if ($('#DrCompCoverageRgnCount').val() == "" || $('#DrCompCoverageRgnCount').val() == undefined || $('#DrCompCoverageRgnCount').val() == null) {
            days = "0.0";
        }
        else {
            days = $('#DrCompCoverageRgnCount').val();
        }
        var EDivision = 0;
        if ($("#Comeragediv").prop('checked') == true) {
            EDivision = 1;
        }
        AdminDashboard.defaults.days = days;
        //var action = CompanyCode + "/" + RegionCode + "/" + SelectMonth + "/" + Division_Name + "/" + mode1 + "/" + mode2;
        var action = CompanyCode + "/" + RegionCode + "/" + SelectMonth + "/" + Division_Name + "/" + mode1 + "/" + mode2 + "/" + days + "/" + EDivision;
        HDWebApiAjax.requestInvoke("GetDrComplianceValue", action, null, "GET", this.getDrComplianceSuccessCallBack, this.getDrComplianceErrorCallBack);
    },
    getDrComplianceSuccessCallBack: function (response) {
        debugger;

        var DRdata = new google.visualization.DataTable();
        var Compliance = new Array();
        if (response != null && response.Data != null && response.Data.Tables != null && response.Data.Tables.length > 0) {
            Compliance = response.Data.Tables[0].Rows;
            if (Compliance.length > 0) {

                // Header Column Name 
                var call_objects = Compliance[0];
                var value = Object.keys(call_objects);
                DRdata.addColumn('string', 'Month');
                for (var j = 0; j < value.length; j++) {

                    if (value[j] != "Month") {
                        DRdata.addColumn('number', value[j]);
                    }
                }
            }


            if (value.length == 1) {
                for (var k = 0; k < Compliance.length; k++) {
                    DRdata.addRow([Compliance[k][value[0]]]);
                }
            }
            else if (value.length == 2) {
                for (var k = 0; k < Compliance.length; k++) {
                    DRdata.addRow([Compliance[k][value[0]], Compliance[k][value[1]]]);
                }
            }
            else if (value.length == 3) {
                for (var k = 0; k < Compliance.length; k++) {
                    DRdata.addRow([Compliance[k][value[0]], Compliance[k][value[1]], Compliance[k][value[2]]]);
                }
            }
            else if (value.length == 4) {
                for (var k = 0; k < Compliance.length; k++) {
                    DRdata.addRow([Compliance[k][value[0]], Compliance[k][value[1]], Compliance[k][value[2]], Compliance[k][value[3]]]);
                }
            }
            else {
                for (var k = 0; k < Compliance.length; k++) {
                    DRdata.addRow([Compliance[k][value[0]], Compliance[k][value[1]], Compliance[k][value[2]], Compliance[k][value[3]], Compliance[k][value[4]]]);
                }
            }

            var options = {
                chartArea: { left: 90, top: 20, width: '90%', height: '80%' },
                vAxis: {
                    title: 'Compliance %', viewWindow: { min: 0 }, isStacked: true,
                },
                hAxis: { gridlines: { color: 'none' }, slantedText: true, title: 'Month', },
                legend: "top",
                seriesType: 'bars',
                series: {
                    0: { color: "#3b36ed" },
                    1: { color: "#FF7F50" },
                    2: { color: "#06b9b9" },
                    3: { color: "rgb(161, 110, 229)" }
                },
                width: 500, height: 335,
            };
            $('#dvDrCompliaceBarChat').html('');
            var table = new google.visualization.ComboChart(document.getElementById("dvDrCompliaceBarChat"));
            table.draw(DRdata, options, { showRowNumber: true });

            google.visualization.events.addListener(table, 'select', function () {
                debugger;
                table1 = table;
                DRdata1 = DRdata;
                var unapprovedDoctor = "", vacant = "", days = '';
                if ($("#complianceeexc").prop('checked') == true) {
                    unapprovedDoctor = 'Selected';
                }
                else {
                    unapprovedDoctor = 'NotSelected';
                }
                if ($("#compliancVaccexc").prop('checked') == true) {
                    vacant = 'Selected';
                }
                else {
                    vacant = 'NotSelected';
                }
                if ($('#DrCompCoverageRgnCount').val() === "" || $('#DrCompCoverageRgnCount').val() == undefined || $('#DrCompCoverageRgnCount').val() == null) {
                    days = '0.0';
                }
                else {
                    days = $('#DrCompCoverageRgnCount').val();
                }
                var EDivision = 0;
                if ($("#Comeragediv").prop('checked') == true) {
                    EDivision = 1;
                }
                AdminDashboard.selectHandler(unapprovedDoctor, vacant, "Compliance", days, EDivision);
                //AdminDashboatd.selectHandler1(unapprovedDoctor, vacant, );
            });
            table.draw(DRdata, options);
        }
        else {
            $('#dvDrCompliaceBarChat').html('<h2 style="text-align: center;margin-top: 32%;">No Record Found</h2>');
        }
    },
    getDrComplianceErrorCallBack: function (error) {
        $('#dvDrCompliaceBarChat').html('');
        var json = error.responseJSON;
        var strace = json.StackTrace.trim().split('at ')[1];
        var strace1 = strace.substring(strace, strace.indexOf('('));
        var srcFile = strace1.split('.');
        var obj = new Object();
        obj.ExceptionName = json.ExceptionType.substring(json.ExceptionType.lastIndexOf('.') + 1, json.ExceptionType.length);
        obj.ReportName = "Doctor Compliance Coverage Report(Activity)";
        obj.ExceptionMessage = json.ExceptionMessage;
        obj.ExceptionSource = srcFile[srcFile.length - 2] + "\/" + srcFile[srcFile.length - 1];
        $.ajax({
            url: '../../Home/DoRecordExceptionLog',
            data: obj,
            method: 'POST',
            success: function () {
            },
            error: function () { }
        });
        //window.location.href = "../../Home/ErrorPage";
        //window.close();
    },
    //////////////////////////////////Dr missed Count///////////////////////////////////////
    getDrMissed: function () {
        debugger;
        var Numdays = '';
        $('#titleopen').hide();
        $('#dvDrMissedChat').html('<img style="width:50px;margin-top: 15%;" src="../../Content/images/loader11.gif" />');
        var Division_Name = $('#ddlDrMissed').val();
        if (Division_Name == "--All--") {
            Division_Name = "All";
        }
        var SelectMonth = $('#DrMissedmonths').val();
        var mode1 = 0, mode2 = 0;
        if ($("#DrMonthexc").prop('checked') == true) {
            mode1 = 1;
            $('input[name=UnMonthhid]').val('Selected');
        }
        else {
            $('input[name=UnMonthhid]').val('Not Selected');
        }
        if ($("#DrMonthVaccexc").prop('checked') == true) {
            mode2 = 1;
            $('input[name=UMonthVacchid]').val('Selected');
        }
        else {
            $('input[name=UnMonthhid]').val('Not Selected');
        }
        if ($('#DrMissedRgnCount').val() == '' || $('#DrMissedRgnCount').val() == undefined || $('#DrMissedRgnCount').val() == null) {
            Numdays = '0.0';
        }
        else {
            //days = $('#DrMissedRgnCount').val();
            Numdays = '0.0';
        }
        var EDivision = 0;
        if ($("#Drdiv").prop('checked') == true) {
            AdminDashboard.defaults.Exactdivision = 1;
            EDivision = 1;
        }
        //AdminDashboard.defaults.days = days;
        //var action = CompanyCode + "/" + RegionCode + "/" + SelectMonth + "/" + Division_Name + "/" + mode1 + "/" + mode2;
        var action = CompanyCode + "/" + RegionCode + "/" + SelectMonth + "/" + Division_Name + "/" + mode1 + "/" + mode2 + "/" + Numdays + "/" + EDivision;
        HDWebApiAjax.requestInvoke("GetDrMissedCount", action, null, "GET", this.fngetDrMissedSuccessCallBack, this.fngetDrMissedErrorCallBack);
    },
    fngetDrMissedSuccessCallBack: function (response) {
        debugger;
        if (response.length == 1) {
            $('#dvDrMissedChat').html('');
            $('#titleopen').show();
            $('#titleopen').html("<input type='text' style='height:13px;width:24px;background-color: blue;' readonly />  " + response[0].Norms);
            $("#dvDrMissedChat").html("<h2 id='heading' Style='font-size:34px;margin-top: 1.25em;text-align: center;cursor: pointer;text-decoration: underline;' onclick='AdminDashboard.CumulativeClick()'>" + response[0].Visit + "</h2><br><h3 id='spanheding' Style='text-align: center;margin-top: -2.75em;font-size: 15px;'>Doctor Missed</h3>");
        }
        else {
            $('#titleopen').hide();
            var DRdata = new google.visualization.DataTable();

            DRdata.addColumn('string', 'Category');
            DRdata.addColumn('number', 'Count');



            for (var i = 0; i < response.length; i++) {
                DRdata.addRow([response[i].Norms, response[i].Visit]);
            }

            var options = {
                chartArea: { left: 0, top: 20, width: '100%', height: '100%' },
                width: 500, height: 230,
                fontSize: 14,
                fontName: "Arial",
                is3D: false,
                legend: {
                    position: 'right',
                    alignment: 'center',
                },
                tooltip: { isHtml: true },
                pieSliceText: 'lable',
                colors: ['#3b36ed', '#FF7F50', '#06b9b9', 'rgb(161, 110, 229)']
            };

            if (DRdata.getNumberOfRows() == 0) {
                $("#dvDrMissedChat").html("");
                $("#dvDrMissedChat").append("<div class='circle_division'>No Missed Doctor</div>")
                //   return false;
            } else {
                $("dvDrMissedChat").html("");
                dataview = new google.visualization.DataView(DRdata);
                // dataview.hideColumns([0]);

                var chart = new google.visualization.PieChart(document.getElementById('dvDrMissedChat'));

                chart.draw(dataview, options);

                google.visualization.events.addListener(chart, 'select', function () {
                    debugger;
                    chart1 = chart;
                    DRdata1 = DRdata;
                    var unapprovedDoctor = "", vacant = "";
                    if ($("#DrMonthexc").prop('checked') == true) {
                        unapprovedDoctor = 'Selected';
                    }
                    else {
                        unapprovedDoctor = 'NotSelected';
                    }
                    if ($("#DrMonthVaccexc").prop('checked') == true) {
                        vacant = 'Selected';
                    }
                    else {
                        vacant = 'NotSelected';
                    }
                    if ($('#DrMissedRgnCount').val() == '' || $('#DrMissedRgnCount').val() == undefined || $('#DrMissedRgnCount').val() == null) {
                        days = '0';
                    }
                    else {
                        days = $('#DrMissedRgnCount').val();
                    }
                    var id = 2; //dr-missed-count
                    var EDivision = 0;
                    if ($("#Drdiv").prop('checked') == true) {
                        EDivision = 1;
                    }
                    AdminDashboard.selectHandler1(unapprovedDoctor, vacant, id, days, EDivision);
                });
            }
        }
    },
    fngetDrMissedErrorCallBack: function (error) {
        var json = error.responseJSON;
        var strace = json.StackTrace.trim().split('at ')[1];
        var strace1 = strace.substring(strace, strace.indexOf('('));
        var srcFile = strace1.split('.');
        var obj = new Object();
        obj.ExceptionName = json.ExceptionType.substring(json.ExceptionType.lastIndexOf('.') + 1, json.ExceptionType.length);
        obj.ReportName = "Doctor Missed Report(Activity)";
        obj.ExceptionMessage = json.ExceptionMessage;
        obj.ExceptionSource = srcFile[srcFile.length - 2] + "\/" + srcFile[srcFile.length - 1];
        $.ajax({
            url: '../../Home/DoRecordExceptionLog',
            data: obj,
            method: 'POST',
            success: function () { },
            error: function () { }
        });
        //window.location.href = "../../Home/ErrorPage";
        //window.close();
        //$('#dvDrMissedChat').html('');
    },
    ////////////////////////////// Dr Missed Month wise////////////////////
    getDrMissedMonthWise: function () {
        debugger;
        $('#titleopen').hide();
        $('#dvDrMissedChat').html('');
        $('#dvDrMissedChat').html('<img style="width:50px;margin-top: 15%;" src="../../Content/images/loader11.gif" />');
        var Division_Name = $('#ddlDrMissed').val();
        if (Division_Name == "--All--") {
            Division_Name = "All";
        }
        var SelectMonth = $('#DrMissedmonths').val();
        var mode1 = 0, mode2 = 0;
        var days = '';
        if ($("#DrMonthexc").prop('checked') == true) {
            mode1 = 1;
            $('input[name=UnMonthhid]').val('Selected');
        }
        if ($("#DrMonthVaccexc").prop('checked') == true) {
            mode2 = 1;
            $('input[name=UMonthVacchid]').val('Selected');
        }
        if ($('#DrMissedRgnCount').val() == "" || $('#DrMissedRgnCount').val() == undefined || $('#DrMissedRgnCount').val() == null) {
            days = '0.0';
        }
        else {
            days = $('#DrMissedRgnCount').val();
        }
        var EDivision = 0;
        if ($("#Drdiv").prop('checked') == true) {
            EDivision = 1;
        }
        AdminDashboard.defaults.days = days;
        //var action = CompanyCode + "/" + RegionCode + "/" + SelectMonth + "/" + Division_Name + "/" + mode1 + "/" + mode2;
        var action = CompanyCode + "/" + RegionCode + "/" + SelectMonth + "/" + Division_Name + "/" + mode1 + "/" + mode2 + "/" + days + "/" + EDivision;
        HDWebApiAjax.requestInvoke("GetDrMissedMonthWise", action, null, "GET", this.getDrMissedMonthWiseSuccessCallBack, this.getDrMissedMonthWiseErrorCallBack);
    },
    getDrMissedMonthWiseSuccessCallBack: function (response) {
        debugger;

        var DRdata = new google.visualization.DataTable();
        var Compliance = new Array();
        if (response != null && response.Data != null && response.Data.Tables != null && response.Data.Tables.length > 0) {
            Compliance = response.Data.Tables[0].Rows;
            if (Compliance.length > 0) {

                // Header Column Name 
                var call_objects = Compliance[0];
                var value = Object.keys(call_objects);
                DRdata.addColumn('string', 'Month');
                for (var j = 0; j < value.length; j++) {

                    if (value[j] != "Month") {
                        DRdata.addColumn('number', value[j]);
                    }
                }
            }


            if (value.length == 1) {
                for (var k = 0; k < Compliance.length; k++) {
                    DRdata.addRow([Compliance[k][value[0]]]);
                }
            }
            else if (value.length == 2) {
                for (var k = 0; k < Compliance.length; k++) {
                    DRdata.addRow([Compliance[k][value[0]], Compliance[k][value[1]]]);
                }
            }
            else if (value.length == 3) {
                for (var k = 0; k < Compliance.length; k++) {
                    DRdata.addRow([Compliance[k][value[0]], Compliance[k][value[1]], Compliance[k][value[2]]]);
                }
            }
            else {
                for (var k = 0; k < Compliance.length; k++) {
                    DRdata.addRow([Compliance[k][value[0]], Compliance[k][value[1]], Compliance[k][value[2]], Compliance[k][value[3]]]);
                }
            }


            var options = {
                //title: txtTitle,
                width: 500, height: 220,
                vAxis: { title: doctor_caption + "'s" }, isStacked: true,
                hAxis: { title: "Month" },
                legend: "right",
                bars: "vertical",
                colors: ['#3b36ed','#FF7F50','#06b9b9', 'rgb(161, 110, 229)']
            }
            $('#dvDrMissedChat').html('');

            var table = new google.visualization.ColumnChart(document.getElementById("dvDrMissedChat"));
            table.draw(DRdata, options, { showRowNumber: true });

            google.visualization.events.addListener(table, 'select', function () {
                debugger;
                table1 = table;
                DRdata1 = DRdata;
                var unapprovedDoctor = "", vacant = "";
                if ($("#DrMonthexc").prop('checked') == true) {
                    unapprovedDoctor = 'Selected';
                }
                else {
                    unapprovedDoctor = 'NotSelected';
                }
                if ($("#DrMonthVaccexc").prop('checked') == true) {
                    vacant = 'Selected';
                }
                else {
                    vacant = 'NotSelected';
                }
                if ($('#DrMissedRgnCount').val() === "" || $('#DrMissedRgnCount').val() == undefined || $('#DrMissedRgnCount').val() == null) {
                    days = '0';
                }
                else {
                    days = $('#DrMissedRgnCount').val();
                }
                var id = 1; //dr-missed-month-wise
                var EDivision = 0;
                if ($("#Drdiv").prop('checked') == true) {
                    EDivision = 1;
                }
                AdminDashboard.selectHandler1(unapprovedDoctor, vacant, id, days, EDivision);
            });
            table.draw(DRdata, options);
        }
        else {
            $('#dvDrMissedChat').html('<h2 style="text-align: center;margin-top: 25%;">No Record Found</h2>');
        }

    },
    selectHandler1: function (unapproved, vacant, id, days, EDivision) {
        debugger;
        var SelectedItem;
        
        if (id == 1) {
            SelectedItem = table1.getSelection()[0];
        }
        else if (id == 2) {
            SelectedItem = chart1.getSelection()[0];
        }
        if (SelectedItem) {

            if (SelectedItem.row != null) {


                var months = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
                var getMonth = DRdata1.getValue(SelectedItem.row, 0);
                var execDoctor = 0;
                var excRegion = 0;
                var EUD = null, EVT = null;
                var isFirstTime = 1;

                if (unapproved == "Selected") {
                    EUD = "EUD";
                }
                if (vacant == 'Selected') {
                    EVT = "EVT";
                }
                var Division_Name = $("#ddlDrMissed").val().replace(/ /g, '_');

                if (Division_Name == "--All--") {
                    Division_Name = "All";
                }
                if ($("#DrMonthexc").prop("checked") == true) {
                    execDoctor = 1;
                }
                if ($("#DrMonthVaccexc").prop("checked") == true) {
                    excRegion = 1;
                }
                //var SelectDate = getMonth.split("'")[0].toUpperCase();
                //var SelectedMonth = months.indexOf(SelectDate) + 1;
                //var DocSpec = $('input[name=spec]:checked').val();
                //var mode1 = 0, mode2 = 0;
                //if ($("#DrSpechexc").prop('checked') == true) {
                //    mode1 = 1;
                //    $('input[name=RegDoctorspechid]').val('Selected');
                //}

                var Year = '20' + getMonth.split("'")[1];

                //var day1;
                //if (days.indexOf('.') > -1) {
                //    day1 = days.split('.')[1];
                //}
                //else {
                //    day1 = 0;
                //}

                //var obj = {
                //    Company_Code : CompanyCode ,
                //    Region_Code: RegionCode,                   
                //    Division_Name: Division_Name,
                //    Exec_Region: excRegion,
                //    Exec_Doctor: execDoctor,
                //    IsFirstTime : isFirstTime,                    
                //    IsSync : 0
                //}

                if (id == 1) {
                    //obj.DashboardType = 'drMissed';
                    //obj.Year = Year;

                    var SelectDate = getMonth.split("'")[0].toUpperCase();
                    var SelectedMonth = months.indexOf(SelectDate) + 1;

                    //obj.SelectedMonth = SelectedMonth;
                    //obj.Days = days;
                    var paramValues = "drMissed~" + CompanyCode + "~" + RegionCode + "~" + Year + "~" + SelectedMonth + "~" + Division_Name + "~" + excRegion + "~" + isFirstTime + "~" + execDoctor + "~" + days.replace(/\./g, '^') + "~" + 0 + "~" + EDivision;

                    // var paramValues = "drMissed~" + CompanyCode + "~" + RegionCode + "~" + Year + "~" + SelectedMonth + "~" + Division_Name + "~" + excRegion + "~" + isFirstTime + "~" + execDoctor + "~" + days.split('.')[0] + "~" + day1+"~"+0;
                }
                else if (id == 2) {
                    SelectedMonth = $("#DrMissedmonths").val();
                    var overalldays = '0.00';

                    //obj.DashboardType = 'drMissedOverAllcount';
                    //obj.SelectedMonth = SelectedMonth;
                    //obj.Days = 0;

                    var paramValues = "drMissedOverAllcount~" + CompanyCode + "~" + RegionCode + "~" + SelectedMonth + "~" + Division_Name + "~" + excRegion + "~" + isFirstTime + "~" + execDoctor + "~" + overalldays.replace(/\./g, '^') + "~" + 0 + "~" + EDivision;
                }


                $("#main").load("../../Dashboard/DoctorActivityCoverage/" + paramValues);
            }
        }
    },
    getDrMissedMonthWiseErrorCallBack: function (error) {
        var json = error.responseJSON;
        var strace = json.StackTrace.trim().split('at ')[1];
        var strace1 = strace.substring(strace, strace.indexOf('('));
        var srcFile = strace1.split('.');
        var obj = new Object();
        obj.ExceptionName = json.ExceptionType.substring(json.ExceptionType.lastIndexOf('.') + 1, json.ExceptionType.length);
        obj.ReportName = "Doctor Missed Month Wise(Activity)";
        obj.ExceptionMessage = json.ExceptionMessage;
        obj.ExceptionSource = srcFile[srcFile.length - 2] + "\/" + srcFile[srcFile.length - 1];
        $.ajax({
            url: '../../Home/DoRecordExceptionLog',
            data: obj,
            method: 'POST',
            success: function () { },
            error: function () { }
        });
        //window.location.href = "../../Home/ErrorPage";
        //window.close();
        // alert(jsonData);
    },
    CumulativeClick: function () {
        var days = '';
        SelectedMonth = $("#DrMissedmonths").val();
        var Division_Name = $("#ddlDrMissed").val().replace(/ /g, '_');
        if (Division_Name == "--All--") {
            Division_Name = "All";
        }
        var execDoctor = 0;
        var excRegion = 0;
        if ($("#DrMonthexc").prop("checked") == true) {
            execDoctor = 1;
        }
        if ($("#DrMonthVaccexc").prop("checked") == true) {
            excRegion = 1;
        }
        if ($('#DrMissedRgnCount').val() === "" || $('#DrMissedRgnCount').val() == undefined || $('#DrMissedRgnCount').val() == null) {
            days = '0.0';
        }
        else {
            days = $('#DrMissedRgnCount').val();
        }
        var EDivision = 0;
        if ($("#Drdiv").prop('checked') == true) {
            EDivision = 1;
        }
        var isFirstTime = 1;
        var paramValues = "drMissedOverAllcount~" + CompanyCode + "~" + RegionCode + "~" + SelectedMonth + "~" + Division_Name + "~" + excRegion + "~" + isFirstTime + "~" + execDoctor + "~" + days + "~" + EDivision;
        $("#main").load("../../Dashboard/DoctorActivityCoverage/" + paramValues);
    },
    ////////////////////////////// Speciality wise Coverage////////////////////
    getDrSpecialityhWiseCoverage: function () {
        debugger;
        var days = '';
        $('#tblSpecialityCoverage').html('<img class="loader" src="../../Content/images/loader11.gif" />');
        var Division_Name = $('#ddlDivisionSpe').val();
        if (Division_Name == "--All--") {
            Division_Name = "All";
        }
        var SelectMonth = $('#DrSpecialitymonth').val();
        var DocSpec = $('input[name=spec]:checked').val();
        var mode1 = 0, mode2 = 0;
        if ($("#DrSpechexc").prop('checked') == true) {
            mode1 = 1;
            $('input[name=RegDoctorspechid]').val('Selected');
        }
        if ($("#DrSpecVaccexc").prop('checked') == true) {
            mode2 = 1;
            $('input[name=ExcDoctorspechid]').val('Selected');
        }
        if ($('#SpecWiseCovgRgnCount').val() == '') {
            days = '0.0';
        }
        else {
            days = $('#SpecWiseCovgRgnCount').val();
        }
        var EDivision = 0;
        if ($("#Specdiv").prop('checked') == true) {
            EDivision = 1;
        }
        AdminDashboard.defaults.days = days;
        //var action = CompanyCode + "/" + RegionCode + "/" + SelectMonth + "/" + Division_Name + "/" + DocSpec + "/" + mode1 + "/" + mode2;
        var action = CompanyCode + "/" + RegionCode + "/" + SelectMonth + "/" + Division_Name + "/" + DocSpec + "/" + mode1 + "/" + mode2 + "/" + days + "/" + EDivision;
        HDWebApiAjax.requestInvoke("GetDrSpecialityWise", action, null, "GET", this.GetDrSpecialityWiseSuccessCallBack, this.GetDrSpecialityWiseErrorCallBack);
    },
    GetDrSpecialityWiseSuccessCallBack: function (response) {
        debugger;
        var DRdata = new google.visualization.DataTable();
        var Spec = new Array();
        if (response != null && response.Data != null && response.Data.Tables != null && response.Data.Tables.length > 0) {
            Spec = response.Data.Tables[0].Rows;
            if (Spec.length > 0) {

                // Header Column Name 
                var call_objects = Spec[0];
                var value = Object.keys(call_objects);
                DRdata.addColumn('string', 'Month');
                for (var j = 0; j < value.length; j++) {

                    if (value[j] != "Month") {
                        DRdata.addColumn('number', value[j]);
                    }
                }
            }


            if (value.length == 2) {
                for (var k = 0; k < Spec.length; k++) {
                    DRdata.addRow([Spec[k][value[0]], Spec[k][value[1]]]);
                }
            }

            var options = {
                vAxis: {
                    title: "Coverage %",
                },
                hAxis: {
                    title: 'Month'
                },
                curveType: 'function',
                width: 510, height: 250,
                legend: { position: 'top' },
                tooltip: { isHtml: true },
            };
            $('#tblSpecialityCoverage').html('');
            var table = new google.visualization.LineChart(document.getElementById("tblSpecialityCoverage"));
            table.draw(DRdata, options);
            google.visualization.events.addListener(table, 'select', function () {
                debugger;
                var selectedItem = table.getSelection()[0];
                if (selectedItem) {
                    var GetSelectedMonth = DRdata.getValue(selectedItem.row, 0);
                    $("#hdnSelectMonth").val(GetSelectedMonth);
                }
                AdminDashboard.getSpecialityWiseDrillDown(GetSelectedMonth);
            });
        }
        else {
            $('#tblSpecialityCoverage').html('<h2 style="text-align: center;margin-top: 25%;">No Record Found</h2>');
        }
    },
    getSpecialityWiseDrillDown: function (GetSelectedMonth) {
        debugger;
        var days = "";
        var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        var Division_Name = $('#ddlDivisionSpe').val().replace(/ /g, '_');
        if (Division_Name == "--All--") {
            Division_Name = "All";
        }
        var SelectDate = GetSelectedMonth.split("'");
        var excRegion = 0, exeDoctor = 0;
        var DocSpec = $('input[name=spec]:checked').val();

        if ($("#DrSpechexc").prop('checked') == true) {
            exeDoctor = 1;
            $('input[name=RegDoctorspechid]').val('Selected');
        }
        if ($("#DrSpecVaccexc").prop('checked') == true) {
            excRegion = 1;
            $('input[name=ExcDoctorspechid]').val('Selected');
        }
        if ($('#SpecWiseCovgRgnCount').val() == "" || $('#SpecWiseCovgRgnCount').val() == undefined || $('#SpecWiseCovgRgnCount').val() == null) {
            days = '0.0';
        }
        else {
            days = $('#SpecWiseCovgRgnCount').val();
        }
        var EDivision = 0;
        if ($("#Specdiv").prop('checked') == true) {
            EDivision = 1;
        }
        var month = $.grep(months, function (value, index) {
            return value === SelectDate[0];
        });
        var Month = months.indexOf(month[0]) + 1;
        var Year = '20' + SelectDate[1];

        var isFirstTime = 1;
        var day1;
        AdminDashboard.defaults.days = days;
        if (days.indexOf('.') > -1) {
            day1 = days.split('.')[1];
        }
        else {
            day1 = 0;
        }
        var paramValues = "specialitywise~" + CompanyCode + "~" + RegionCode + "~" + Year + "~" + Month + "~" + Division_Name + "~" + excRegion + "~" + exeDoctor + "~" + isFirstTime + "~" + days.replace(/\./g, '^') + "~" + encodeURIComponent(DocSpec) + "~" + EDivision;

        $("#main").load("../../DashBoard/DoctorActivityCoverage/" + paramValues);
    },
    fnSuccessCallback: function (response) {
        debugger;

        var content = "";

        var DoctorsMetCount = 0;


        if (response.length > 0) {
            debugger;
            $("#excelbtn").css("display", "block");
            if ($("#rptName").val() == "specialitywise") {
                debugger;
                content += '<div class="divHead">';
                content += '<table class="table table-bordered maintable" id="headertable" style="width: 0px; margin-bottom: 0px;border: 0px solid #ddd;">';
                content += '<thead>';
                content += '<tr>';
                //content += '<th><span onclick="'+AdminDashboard.fnExpandDoctors();+'"><i id="toggler" class="fa fa-plus"></i></span></th>';
                content += '<th class="rptIcon" style="border:0px;padding:8px;"></th>';
                // content += '<th class="NewmonthlyRPT_Coverage">S.No</th>';
                content += '<th class="col21">Region Name</th>';
                content += '<th class="col21">Total Doctors</th>';
                content += '<th class="col21">Doctors Met</th>';
                content += '<th class="col21">Total Met %</th>';
                content += '</tr>';
                content += '</thead>';
                content += '</table>';
                content += ' </div>';
                content += '<div class="table-body" style="font-size:12px;margin-bottom:20px;">';
                content += '<table class="table table-bordered maintable" id="bodytable" style="width:0px; margin-bottom: 0px;border: 0px solid #ddd;">';
                content += '<tbody style="height:420px;">';
                if (response != null) {
                    for (var i = 0; i < response.length; i++) {
                        debugger;
                        if (AdminDashboard.defaults.rowId != response[i].Region_Code) {
                            plusIcon = '<i class="fa fa-plus" aria-hidden="true"></i>';
                        }
                        if (response[i].Region_Type_Name != "Territory") {
                            content += '<tr style="text-align:center;" onclick="AdminDashboard.show_hide_row(\'' + response[i].Region_Code + '\',\'' + 1 + '\')" id="active' + response[i].Region_Code + '">';
                            content += '<td class="rptIcon" style="height:40px;"><span style="font-size:14px;height:420px;">' + plusIcon + '</span></td>';
                            content += "<td class='col21'>" + response[i].Region_Name + "</td>";
                        }
                        else {
                            content += '<tr style="text-align:center;">';
                            content += '<td class="rptIcon" style="height:40px;"><span style="font-size:14px;height:420px;"></span></td>';
                            content += '<td class="col21" style="text-decoration:underline;cursor: pointer;">' + response[i].Region_Name + '</td>';

                        }
                        if (response[i].Total_Doctors > 0) {
                            content += '<td class="col21">' + response[i].Total_Doctors + '</td>';
                        }
                        else {
                            content += '<td class="col21">' + response[i].Total_Doctors + '</td>';
                        }
                        if (response[i].Doctors_Met > 0) {
                            content += '<td class="col21" style="cursor:pointer;text-decoration:none;" onclick="AdminDashboard.show_hide_row(\'' + response[i].Region_Code + '\',\'' + 1 + '\')">' + response[i].Doctors_Met + '</td>';
                        }
                        else {
                            content += '<td class="col21">' + response[i].Doctors_Met + '</td>';
                        }
                        if (response[i].Total_Doctors == 0) {
                            content += '<td class="col21">0</td>';
                        }
                        else {
                            content += '<td class="col21">' + ((response[i].Doctors_Met / response[i].Total_Doctors) * 100).toFixed(2) + '</td>';
                        }

                        content += '</tr>';

                        var contentId = "content" + response[i].Region_Code;
                        content += '<tr class="expend_Collapse_Content" id="' + response[i].Region_Code + '">';
                        //content += '<td colspan="15" style="padding:0px;">';
                        //content += '<table class="tblcollapse">';
                        //content += '<tbody id="' + contentId + '">';
                        //content += ' </tbody>';
                        //content += '</table>';
                        //content += '</td>';
                        content += '</tr>';
                    }
                    content += "</tbody></table>";
                    $("#rptDoctorActivityWise").html('');
                    $("#rptDoctorActivityWise").html(content);
                }
                AdminDashboard.fnFixedcolumn(1, 'rptIcon', 'col21', 4);
            }
            else if ($("#rptName").val() == "drMissed") {
                debugger;

                if (response != null && response.length > 0) {
                    var contentlegent = "";
                    var arrNorms = response.map(a=>a.Norms);
                    //var arrNorms = $.map(response, function (v) {
                    //    return v.Norms;
                    //});
                    lstNorms = arrNorms.reduce(function (item, e1) {
                        var matches = item.filter(function (e2)
                        { return e1 == e2 });
                        if (matches.length == 0) {
                            item.push(e1);
                        }
                        return item;
                    }, []);
                    var arrColor = [];
                    if ($('#hdnSF').val() == 0) {
                        arrColor = ["cls-met-less-1", "cls-met-std-1", "cls-missed-color-1"];
                    }
                    else {
                        arrColor = ["cls-met-less-syn", "cls-met-std-syn", "cls-missed-color-syn"];
                    }

                    if (screen.width >= 600) {
                        contentlegent += '<tr>';
                        for (var j = 0; j < lstNorms.length; j++) {
                            if (lstNorms[j] != null) {
                                contentlegent += '<td>';
                                contentlegent += '<span class="cls-color-indication ' + arrColor[j] + '"></span>';
                                contentlegent += '</td>';
                                contentlegent += '<td><span style="padding:10px;">' + lstNorms[j] + '</span></td>';
                            }
                        }
                        contentlegent += '</tr>';
                    }
                    else {

                        for (var j = 0; j < lstNorms.length; j++) {
                            if (lstNorms[j] != null) {

                                contentlegent += '<tr>';
                                contentlegent += '<td>';
                                contentlegent += '<span class="cls-color-indicationmobile ' + arrColor[j] + '"></span>';
                                contentlegent += '</td>';
                                contentlegent += '<td><span style="padding:10px;">' + lstNorms[j] + '</span></td>';
                                contentlegent += '</tr>';
                            }
                        }

                    }
                    $("#tblLegend1").html(contentlegent);
                    content += '<div class="divHead">';
                    content += '<table class="table table-bordered maintable" id="headertable" style="width: 0px; margin-bottom: 0px;border: 0px solid #ddd;">';
                    content += '<thead>';
                    content += '<tr>';
                    content += '<th class="rptIcon" style="border:0px;padding:8px;"></th>';
                    content += '<th class="col31">Region Name</th>';
                    content += '<th class="col31">Total Doctors</th>';
                    content += '<th class="col31">Doctors Missed</th>';


                    for (var j = 0; j < lstNorms.length; j++) {
                        content += '<th class="col31">' + lstNorms[j] + '</th>';
                    }

                    content += '</tr>';
                    content += '</thead>';
                    content += '</table>';
                    content += ' </div>';
                    content += '<div class="table-body" style="font-size:12px;margin-bottom:20px;">';
                    content += '<table class="table table-bordered maintable" id="bodytable" style="width:0px; margin-bottom: 0px;border: 0px solid #ddd;">';
                    content += '<tbody style="height:420px;" id="doctor_missed_body">';


                    var arrRegionCode = response.map(a => a.Region_Code);
                    lstRegionCode = arrRegionCode.reduce(function (item, e1) {
                        var matches = item.filter(function (e2)
                        { return e1 == e2 });
                        if (matches.length == 0) {
                            item.push(e1);
                        }
                        return item;
                    }, []);


                    for (var i = 0; i < lstRegionCode.length; i++) {
                        debugger;
                        var lst = $.grep(response, function (v) {
                            return v.Region_Code == lstRegionCode[i];
                        })

                        if (AdminDashboard.defaults.rowId != response[i].Region_Code) {
                            plusIcon = '<i class="fa fa-plus" aria-hidden="true"></i>';
                        }
                        if (response[i].Region_Type_Name != "Territory") {
                            content += '<tr style="text-align:center;" onclick="AdminDashboard.show_hide_row(\'' + response[i].Region_Code + '\',\'' + 2 + '\')" id="active' + response[i].Region_Code + '">';
                            content += '<td class="rptIcon" style="height:40px;"><span style="font-size:14px;height:420px;">' + plusIcon + '</span></td>';
                            content += '<td class="col31" style="cursor:pointer;text-transform:underline;">' + response[i].Region_Name + '</td>';
                        }
                        else {
                            content += '<tr style="text-align:center;">';
                            content += '<td class="rptIcon" style="height:40px;"><span style="font-size:14px;height:420px;"></span></td>';
                            content += '<td class="col31" style="text-decoration:underline;cursor: pointer;" onclick="AdminDashboard.getDoctorsMissedCategoryWise(\'' + $("#hdnSelectMonth").val() + '\',\'' + $("#hdnSelectYear").val() + '\',\'' + response[i].Region_Code + '\',\'' + response[i].Region_Name.replace(/ /g, '_') + '\',\'' + $("#hdnExcRegion").val() + '\',\'' + $("#hdnExcDoctor").val() + '\');">' + response[i].Region_Name + '</td>';

                        }
                        if (response[i].Region_Type_Name == "Territory" && response[i].Total_Doctors > 0) {
                            content += '<td class="col31">' + response[i].Total_Doctors + '</td>';
                        }
                        else {
                            content += '<td class="col31">' + response[i].Total_Doctors + '</td>';
                        }
                        if (response[i].Region_Type_Name == "Territory" && response[i].Doctors_Missed > 0) {
                            content += '<td class="col31">' + response[i].Doctors_Missed + '</td>';
                        }
                        else {
                            content += '<td class="col31">' + response[i].Doctors_Missed + '</td>';
                        }

                        for (var ab = 0; ab < lstNorms.length; ab++) {

                            var lstNorm = $.grep(lst, function (v) {
                                return v.Norms == lstNorms[ab];
                            })

                            if (lstNorm != null && lstNorm.length > 0) {
                                if (lstNorm[0].Count > 0) {
                                    /// onclick="AdminDashboard.getDoctorsMissedCategoryWise(\'' + $("#hdnSelectMonth").val() + '\',\'' + $("#hdnSelectYear").val() + '\',\'' + lst[0].Region_Code + '\',\'' + encodeURIComponent(lst[0].Region_Name) + '\',\'' + $("#hdnExcRegion").val() + '\',\'' + $("#hdnExcDoctor").val() + '\');"
                                    content += '<td class="col31 ' + arrColor[ab] + '">' + lstNorm[0].Count + '</td>';
                                }
                                else {
                                    content += '<td></td>';
                                }
                            }
                            else {
                                content += '<td class="col31 ' + arrColor[ab] + '"> 0</td>';
                            }

                        }
                        content += '</tr>';

                        var contentId = "content" + lst[0].Region_Code;
                        content += '<tr class="expend_Collapse_Content" id="' + lst[0].Region_Code + '">';
                        //content += '<td colspan="15" style="padding:0px;">';
                        //content += '<table class="tblcollapse">';
                        //content += '<tbody id="' + contentId + '">';
                        //content += ' </tbody>';
                        //content += '</table>';
                        //content += '</td>';
                        content += '</tr>';
                    }
                    content += "</tbody></table>";
                    $("#rptDoctorActivityWise").html('');
                    $("#rptDoctorActivityWise").html(content);
                    AdminDashboard.fnFixedcolumn(1, 'rptIcon', 'col31', (lstNorms.length + 3));

                }
            }
            else if ($("#rptName").val() == "callaverage") {
                debugger;
                var mode = $("#hdnMode").val();
                var contentId = "";
                content += '<div class="divHead">';
                content += '<table class="table table-bordered maintable" id="headertable" style="width: 0px; margin-bottom: 0px;border: 0px solid #ddd;">';
                content += '<thead>';
                content += '<tr>';
                //content += '<th><span onclick="'+AdminDashboard.fnExpandDoctors();+'"><i id="toggler" class="fa fa-plus"></i></span></th>';
                content += '<th class="rptIcon" style="border:0px;padding:8px;"></th>';
                // content += '<th class="NewmonthlyRPT_Coverage">S.No</th>';
                if (mode == 1) {
                    content += '<th class="col41">Region Name</th>';
                }
                else if (mode == 2) {
                    content += '<th class="col41">User Name</th>';
                }
                content += '<th class="col41">Total Days</th>';
                content += '<th class="col41">Field Days</th>';
                content += '<th class="col41">Call Average</th>';
                content += '</tr>';
                content += '</thead>';
                content += '</table>';
                content += ' </div>';
                content += '<div class="table-body" style="font-size:12px;margin-bottom:20px;">';
                content += '<table class="table table-bordered maintable" id="bodytable" style="width:0px; margin-bottom: 0px;border: 0px solid #ddd;">';
                content += '<tbody style="height:420px;">';
                if (response != null) {

                    if (mode == 1) {
                        for (var i = 0; i < response.length; i++) {
                            debugger;
                            if (AdminDashboard.defaults.rowId != response[i].Region_Code) {
                                plusIcon = '<i class="fa fa-plus" aria-hidden="true"></i>';
                            }
                            if (response[i].Region_Type_Name != "Territory") {
                                content += '<tr style="text-align:center;" onclick="AdminDashboard.show_hide_row(\'' + response[i].Region_Code + '\',\'' + 3 + '\',\'' + mode + '\')" id="active' + response[i].Region_Code + '">';
                                content += '<td class="rptIcon" style="height:40px;"><span style="font-size:14px;height:420px;">' + plusIcon + '</span></td>';
                                content += '<td class="col41" style="cursor:pointer;text-transform:underline;">' + response[i].Region_Name + '</td>';
                            }
                            else {
                                content += '<tr style="text-align:center;">';
                                content += '<td class="rptIcon" style="height:40px;"><span style="font-size:14px;height:420px;"></span></td>';
                                content += '<td class="col41" style="text-decoration:underline;cursor: pointer;" >' + response[i].Region_Name + '</td>';

                            }
                            if (response[i].Region_Type_Name == "Territory" && response[i].Total_Days > 0) {
                                content += '<td class="col41">' + response[i].Total_Days + '</td>';
                            }
                            else {
                                content += '<td class="col41">' + response[i].Total_Days + '</td>';
                            }
                            if (response[i].Region_Type_Name == "Territory" && response[i].Field_Days > 0) {
                                content += '<td class="col41">' + response[i].Field_Days + '</td>';
                            }
                            else {
                                content += '<td class="col41">' + response[i].Field_Days + '</td>';
                            }
                            if (response[i].Region_Type_Name == "Territory" && response[i].Call_Avg > 0.0) {
                                content += '<td class="col41">' + response[i].Call_Avg + '</td>';
                            }
                            else {
                                content += '<td class="col41">' + response[i].Call_Avg + '</td>';
                            }

                            contentId = "content" + response[i].Region_Code;
                            content += '<tr class="expend_Collapse_Content" id="' + response[i].Region_Code + '">';
                        }
                        content += '</tr>';

                        content += '<td colspan="15" style="padding:0px;">';
                        content += '<table class="tblcollapse">';
                        content += '<tbody id="' + contentId + '">';
                        content += ' </tbody>';
                        content += '</table>';
                        content += '</td>';
                        content += '</tr>';
                    }

                    else if (mode == 2) {

                        for (var i = 0; i < response.length; i++) {
                            debugger;
                            if (AdminDashboard.defaults.rowId != response[i].User_Code) {
                                plusIcon = '<i class="fa fa-plus" aria-hidden="true"></i>';
                            }
                            if (response[i].User_Type_Name != "MR" || response[i].User_Type_Name != "MSR") {
                                content += '<tr style="text-align:center;" onclick="AdminDashboard.show_hide_row(\'' + response[i].User_Code + '\',\'' + 3 + '\',\'' + mode + '\')" id="active' + response[i].User_Code + '">';
                                content += '<td class="rptIcon" style="height:40px;"><span style="font-size:14px;height:420px;">' + plusIcon + '</span></td>';
                                content += '<td class="col51" style="cursor:pointer;text-transform:underline;">' + response[i].User_Name + '</td>';
                            }
                            else {
                                content += '<tr style="text-align:center;">';
                                content += '<td class="rptIcon" style="height:40px;"><span style="font-size:14px;height:420px;"></span></td>';
                                content += '<td class="col51" style="text-decoration:underline;cursor: pointer;" >' + response[i].User_Name + '</td>';

                            }

                            if (response[i].User_Type_Name == "MR" || response[i].User_Type_Name == "MSR" && response[i].Total_Days > 0) {
                                content += '<td class="col51" onclick="AdminDashboard.getDoctorCallAverageWise(\'' + $("#hdnSelectMonth").val() + '\',\'' + $("#hdnSelectYear").val() + '\',\'' + response[i].User_Code + '\',\'' + encodeURIComponent(response[i].User_Name) + '\',\'' + $("#hdnSelectDivision").val() + '\',\'' + mode + '\');">' + response[i].Total_Days + '</td>';
                            }
                            else {
                                content += '<td class="col51">' + response[i].Total_Days + '</td>';
                            }
                            if (response[i].User_Type_Name == "MR" || response[i].User_Type_Name == "MSR" && response[i].Field_Days > 0) {
                                content += '<td class="col51" onclick="AdminDashboard.getDoctorCallAverageWise(\'' + $("#hdnSelectMonth").val() + '\',\'' + $("#hdnSelectYear").val() + '\',\'' + response[i].User_Code + '\',\'' + encodeURIComponent(response[i].User_Name) + '\',\'' + $("#hdnSelectDivision").val() + '\',\'' + mode + '\');">' + response[i].Field_Days + '</td>';
                            }
                            else {
                                content += '<td class="col51">' + response[i].Field_Days + '</td>';
                            }
                            if (response[i].User_Type_Name == "MR" || response[i].User_Type_Name == "MSR" && response[i].Call_Avg > 0.0) {
                                content += '<td class="col51" onclick="AdminDashboard.getDoctorCallAverageWise(\'' + $("#hdnSelectMonth").val() + '\',\'' + $("#hdnSelectYear").val() + '\',\'' + response[i].User_Code + '\',\'' + encodeURIComponent(response[i].User_Name) + '\',\'' + $("#hdnSelectDivision").val() + '\',\'' + mode + '\');">' + response[i].Call_Avg + '</td>';
                            }
                            else {
                                content += '<td class="col51">' + response[i].Call_Avg + '</td>';
                            }

                            contentId = "content" + response[i].User_Code;
                            content += '<tr class="expend_Collapse_Content" id="' + response[i].User_Code + '">';
                        }
                        //if (response[i].Region_Type_Name != "Territory") {
                        //    content += '<tr style="text-align:center;" onclick="AdminDashboard.show_hide_row(\'' + response[i].Region_Code + '\',\'' + 2 + '\')" id="active' + response[i].Region_Code + '">';
                        //    content += '<td class="rptIcon" style="height:40px;"><span style="font-size:14px;height:420px;">' + plusIcon + '</span></td>';
                        //    content += '<td class="col3" style="cursor:pointer;text-transform:underline;">' + response[i].Region_Name + '</td>';
                        //}
                        //else {
                        //    content += '<tr style="text-align:center;">';
                        //    content += '<td class="rptIcon" style="height:40px;"><span style="font-size:14px;height:420px;"></span></td>';
                        //    content += '<td class="col3" style="text-decoration:underline;cursor: pointer;" onclick="AdminDashboard.getDoctorCallAverageWise(\'' + $("#hdnSelectMonth").val() + '\',\'' + $("#hdnSelectYear").val() + '\',\'' + response[i].Region_Code + '\',\'' + encodeURIComponent(response[i].Region_Name) + '\',\'' + $("#hdnSelectDivision").val() + '\',\'' + $("#hdnExcDoctor").val() + '\');">' + response[i].Region_Name + '</td>';

                        //}
                        //content += '<td class="col2">' + ((response[i].Doctors_Missed / response[i].Total_Doctors) * 100).toFixed(2) + '</td>';
                        content += '</tr>';

                        content += '<td colspan="15" style="padding:0px;">';
                        content += '<table class="tblcollapse">';
                        content += '<tbody id="' + contentId + '">';
                        content += ' </tbody>';
                        content += '</table>';
                        content += '</td>';
                        content += '</tr>';
                    }
                }
                content += "</tbody></table>";
                $("#rptDoctorActivityWise").html('');
                $("#rptDoctorActivityWise").html(content);
                $('.maintable thead').css("width", $(".maintable tbody tr").width());
                $('.maintable tbody').css("width", $(".maintable tbody tr").width());
                AdminDashboard.fnFixedcolumn(1);
            }
            else if ($("#rptName").val() == "drMissedOverAllcount") {
                debugger;
                if (response != null && response.length > 0) {
                    var contentlegent = "";
                    var arrNorms = response.map(a=>a.Norms);
                    //var arrNorms = $.map(response, function (v) {
                    //    return v.Norms;
                    //});
                    lstNorms = arrNorms.reduce(function (item, e1) {
                        var matches = item.filter(function (e2)
                        { return e1 == e2 });
                        if (matches.length == 0) {
                            item.push(e1);
                        }
                        return item;
                    }, []);
                    var arrColor = [];
                    if ($('#hdnSF').val() == 0) {
                        arrColor = ["cls-met-less-1", "cls-met-std-1", "cls-missed-color-1"];
                    }
                    else {
                        arrColor = ["cls-met-less-syn", "cls-met-std-syn", "cls-missed-color-syn"];
                    }

                    if (screen.width >= 600) {
                        contentlegent += '<tr>';
                        for (var j = 0; j < lstNorms.length; j++) {
                            if (lstNorms[j] != null) {
                                contentlegent += '<td>';
                                contentlegent += '<span class="cls-color-indication ' + arrColor[j] + '"></span>';
                                contentlegent += '</td>';
                                contentlegent += '<td><span style="padding:10px;">' + lstNorms[j] + '</span></td>';
                            }
                        }
                        contentlegent += '</tr>';
                    }
                    else {

                        for (var j = 0; j < lstNorms.length; j++) {
                            if (lstNorms[j] != null) {

                                contentlegent += '<tr>';
                                contentlegent += '<td>';
                                contentlegent += '<span class="cls-color-indicationmobile ' + arrColor[j] + '"></span>';
                                contentlegent += '</td>';
                                contentlegent += '<td><span style="padding:10px;">' + lstNorms[j] + '</span></td>';
                                contentlegent += '</tr>';
                            }
                        }

                    }
                    $("#tblLegend1").html(contentlegent);

                    content += '<div class="divHead">';
                    content += '<table class="table table-bordered maintable" id="headertable" style="width: 0px; margin-bottom: 0px;border: 0px solid #ddd;">';
                    content += '<thead>';
                    content += '<tr>';
                    content += '<th class="rptIcon" style="border:0px;padding:8px;"></th>';
                    content += '<th class="drMissedoverAllCol">Region Name</th>';

                    for (var j = 0; j < lstNorms.length; j++) {
                        content += '<th class="drMissedoverAllCol">' + lstNorms[j] + '</th>';
                    }

                    content += '</tr>';
                    content += '</thead>';
                    content += '</table>';
                    content += ' </div>';
                    content += '<div class="table-body" style="font-size:12px;margin-bottom:20px;">';
                    content += '<table class="table table-bordered maintable" id="bodytable" style="width:0px; margin-bottom: 0px;border: 0px solid #ddd;">';
                    content += '<tbody style="height:420px;" id="doctor_missed_body">';


                    var arrRegionCode = response.map(a => a.Region_Code);
                    lstRegionCode = arrRegionCode.reduce(function (item, e1) {
                        var matches = item.filter(function (e2)
                        { return e1 == e2 });
                        if (matches.length == 0) {
                            item.push(e1);
                        }
                        return item;
                    }, []);


                    for (var i = 0; i < lstRegionCode.length; i++) {
                        debugger;
                        var lst = $.grep(response, function (v) {
                            return v.Region_Code == lstRegionCode[i];
                        })
                        if (AdminDashboard.defaults.rowId != lst[0].Region_Code) {
                            plusIcon = '<i class="fa fa-plus" aria-hidden="true"></i>';
                        }
                        if (lst[0].Region_Type_Name != "Territory") {
                            if (plusIcon != "") {
                                content += '<tr style="text-align:center;" onclick="AdminDashboard.show_hide_row(\'' + lst[0].Region_Code + '\',\'' + 4 + '\')" id="active' + lst[0].Region_Code + '">';
                                content += '<td class="rptIcon" style="height:40px;"><span style="font-size:14px;height:420px;">' + plusIcon + '</span></td>';
                                content += '<td class="drMissedoverAllCol" style="cursor:pointer;text-transform:underline;">' + lst[0].Region_Name + '</td>';
                            }
                            else {
                                content += '<tr style="text-align:center;" id="active' + lst[0].Region_Code + '">';
                                content += '<td class="rptIcon" style="height:40px;"><span style="font-size:14px;height:420px;">' + plusIcon + '</span></td>';
                                content += '<td class="drMissedoverAllCol" style="cursor:pointer;text-transform:underline;text-decoration:underline;" onclick="AdminDashboard.getDoctorsMissedCumulativeCategoryWise(\'' + $("#hdnSelectMonth").val() + '\',\'' + $("#hdnSelectYear").val() + '\',\'' + lst[0].Region_Code + '\',\'' + lst[0].Region_Name.replace(/ /g, '_') + '\',\'' + $("#hdnExcRegion").val() + '\',\'' + $("#hdnExcDoctor").val() + '\');">' + lst[0].Region_Name + '</td>';
                            }

                        }
                        else {
                            content += '<tr style="text-align:center;">';
                            content += '<td class="rptIcon" style="height:40px;"><span style="font-size:14px;height:420px;"></span></td>';
                            // 
                            content += '<td class="drMissedoverAllCol" style="cursor:pointer;text-transform:underline;text-decoration:underline;" onclick="AdminDashboard.getDoctorsMissedCumulativeCategoryWise(\'' + $("#hdnSelectMonth").val() + '\',\'' + $("#hdnSelectYear").val() + '\',\'' + lst[0].Region_Code + '\',\'' + lst[0].Region_Name.replace(/ /g, '_') + '\',\'' + $("#hdnExcRegion").val() + '\',\'' + $("#hdnExcDoctor").val() + '\');">' + lst[0].Region_Name + '</td>';

                        }


                        for (var ab = 0; ab < lstNorms.length; ab++) {

                            var lstNorm = $.grep(lst, function (v) {
                                return v.Norms == lstNorms[ab];
                            })

                            if (lstNorm != null && lstNorm.length > 0) {
                                if (lstNorm[0].Visit > 0) {
                                    /// onclick="AdminDashboard.getDoctorsMissedCategoryWise(\'' + $("#hdnSelectMonth").val() + '\',\'' + $("#hdnSelectYear").val() + '\',\'' + lst[0].Region_Code + '\',\'' + encodeURIComponent(lst[0].Region_Name) + '\',\'' + $("#hdnExcRegion").val() + '\',\'' + $("#hdnExcDoctor").val() + '\');"
                                    content += '<td class="drMissedoverAllCol ' + arrColor[ab] + '">' + lstNorm[0].Visit + '</td>';
                                }
                                else {
                                    content += '<td></td>';
                                }
                            }
                            else {
                                content += '<td class="drMissedoverAllCol ' + arrColor[ab] + '"> 0</td>';
                            }

                        }
                        content += '</tr>';

                        var contentId = "content" + lst[0].Region_Code;
                        content += '<tr class="expend_Collapse_Content" id="' + lst[0].Region_Code + '">';
                        content += '<td colspan="15" style="padding:0px;">';
                        content += '<table class="tblcollapse">';
                        content += '<tbody id="' + contentId + '">';
                        content += ' </tbody>';
                        content += '</table>';
                        content += '</td>';
                        content += '</tr>';
                    }
                    content += "</tbody></table>";
                    $("#rptDoctorActivityWise").html('');
                    $("#rptDoctorActivityWise").html(content);
                    AdminDashboard.fnFixedcolumn(1, 'rptIcon', 'drMissedoverAllCol', (lstNorms.length + 1));
                }

            }
            else {
                $("#rptDoctorActivityWise").html('');
            }
        }
    },
    getDoctorCallAverageWise: function () { },
    getDoctorsMissedCumulativeCategoryWise: function (curMonth, curYear, RegionCode, RegionName, execRegion, ExcDoctor) {
        debugger;
        $("#tblDoctorInfo").html();
        var _objData = {};
        var param = {}, params = [];
        _objData.CompanyCode = CompanyCode;
        _objData.RegionCode = RegionCode;
        _objData.Month = months.indexOf(curMonth) + 1;
        _objData.Division_Values = $("#hdnSelectDivision").val();
        _objData.ExcDoctor = ExcDoctor;
        _objData.execRegion = execRegion;
        _objData.Days = $('#hdnDays').val();
        param.name = "_objData";
        param.value = _objData;
        params.push(param);
        HDWebApiAjax.requestInvoke("getDoctorsMissedCumulativeCategoryWiseDrill_Down", "", params, "POST", this.fnDoctorsMissedSuccesCallback, this.fnDoctorsMissedFailureCallback, null, "JSON");
        $('#dvTitleForRep').html('Region-Wise Cumulative Doctor Missed Details ' + " For " + RegionName.replace(/[#_]/g, ' '));
    },
    getDoctorsMissedCategoryWise: function (curMonth, curYear, RegionCode, RegionName, execRegion, ExcDoctor) {
        debugger;
        $('#dvdoctorVisitDetails').html('');
        $("#tblDoctorInfo").html();
        AdminDashboard.defaults.DMGRegionName = RegionName;
        var _objData = {};
        var param = {}, params = [];
        _objData.CompanyCode = CompanyCode;
        _objData.RegionCode = RegionCode;
        _objData.Month = months.indexOf(curMonth) + 1;
        _objData.Year = curYear;
        _objData.Division_Values = $("#hdnSelectDivision").val();
        _objData.Days = $('#hdnDays').val();
        _objData.mode1 = execRegion,
        _objData.mode2 = ExcDoctor,
        param.name = "_objData";
        param.value = _objData;
        params.push(param);

        HDWebApiAjax.requestInvoke("getDoctorsMissedDashboardDrill", "", params, "POST", this.fnDoctorsMissedSuccesCallback, this.fnDoctorsMissedFailureCallback, null, "JSON");
        $('#dvTitleForRep').html('Region-Wise Doctor Missed Details of  ' + curMonth + "-" + curYear + " For " + RegionName.replace(/[#_]/g, ' '));
    },
    fnDoctorsMissedFailureCallback: function (error) {
        var json = error.responseJSON;
        var strace = json.StackTrace.trim().split('at ')[1];
        var strace1 = strace.substring(strace, strace.indexOf('('));
        var srcFile = strace1.split('.');
        var obj = new Object();
        obj.ExceptionName = json.ExceptionType.substring(json.ExceptionType.lastIndexOf('.') + 1, json.ExceptionType.length);
        obj.ReportName = "Doctor Missed (Activity)";
        obj.ExceptionMessage = json.ExceptionMessage;
        obj.ExceptionSource = srcFile[srcFile.length - 2] + "\/" + srcFile[srcFile.length - 1];
        $.ajax({
            url: '../../Home/DoRecordExceptionLog',
            data: obj,
            method: 'POST',
            success: function () { },
            error: function () { }
        });
        //window.location.href = "../../Home/ErrorPage";
        //window.close();
    },

    fnDoctorsMissedSuccesCallback: function (response) {
        debugger;
        var content = '';

        content += '<div class="divHead">';
        content += '<table class="table table-bordered maintable" id="headertable" style="width: 0px; margin-bottom: 0px;border: 0px solid #ddd;">';
        content += '<thead>';
        content += '<tr>';
        content += '<th class="misedCol1">S.No</th>';
        content += '<th class="colDoctorDrill">Doctor Name</th>';
        content += '<th class="colDoctorDrill">MDL No</th>';
        content += '<th class="colDoctorDrill">Status</th>';
        content += '<th class="colDoctorDrill">Category</th>';
        content += '<th class="colDoctorDrill">Speciality</th>';
        content += '</tr>';
        content += '</thead>';
        content += '</table>';
        content += ' </div>';
        content += '<div class="table-body" style="font-size:12px;margin-bottom:20px;">';
        content += '<table class="table table-bordered maintable" id="bodytable" style="width:0px; margin-bottom: 0px;border: 0px solid #ddd;">';
        content += '<tbody style="height:420px;">';
        var i = 0;
        if (response != false && response != '' && response != null && response != undefined) {
            $.each(response, function (index, value) {
                i = i + 1;
                var curClassName = '';
                var preClassName = '';
                var curValue = 0;
                var preValue = 0;
                var stdVisitCount = 0;

                content += "<tr style='height: 40px;'><td class='misedCol1'>" + i + "</td>";
                content += '<td class="colDoctorDrill" onclick="AdminDashboard.fnGetDoctorVisitDetails(\'' + value.Doctor_Code + '\',\'' + value.Region_Code + '\',\'' + value.Doctor_Name + '\')"><a style="cursor:pointer;">' + value.Doctor_Name + '</a></td>';
                content += "<td class='colDoctorDrill'>" + value.MDL_Number + "</td>";
                content += "<td class='colDoctorDrill'>" + value.Customer_Status + "</td>";
                content += "<td class='colDoctorDrill'>" + value.Category_Name + "</td>";
                content += "<td class='colDoctorDrill'>" + value.Speciality_Name + "</td>";
            });
        }
        content += " </tbody></table>";
        $('#child').html(content);

        AdminDashboard.fnFixedcolumn(1, 'misedCol1', 'colDoctorDrill', 5);

        $('html,body').animate({
            scrollTop: $("#child").offset().top
        }, 'slow');

        $("#cboCategory").unbind('change').bind('change', function () {
            firstTimeLoad = false;
            AdminDashboard.getUserDashboardCategoryWiseVisits(Month, Year, DivisionName, mode);
        });

        $("#cboSpeciality").unbind('change').bind('change', function () {
            firstTimeLoad = false;
            AdminDashboard.getUserDashboardCategoryWiseVisits(Month, Year, DivisionName, mode);
        });
    },
    fnBindDoctorsSpecialityWiseFailure: function (err) {
    },
    HideModalPopup: function (id) {
        $("#" + id).modal("hide");
        $("#" + id).html('');
    },
    GetDrSpecialityWiseErrorCallBack: function (error) {
        var json = error.responseJSON;
        var strace = json.StackTrace.trim().split('at ')[1];
        var strace1 = strace.substring(strace, strace.indexOf('('));
        var srcFile = strace1.split('.');
        var obj = new Object();
        obj.ExceptionName = json.ExceptionType.substring(json.ExceptionType.lastIndexOf('.') + 1, json.ExceptionType.length);
        obj.ReportName = "Doctor Speciality Wise(Activity)";
        obj.ExceptionMessage = json.ExceptionMessage;
        obj.ExceptionSource = srcFile[srcFile.length - 2] + "\/" + srcFile[srcFile.length - 1];
        $.ajax({
            url: '../../Home/DoRecordExceptionLog',
            data: obj,
            method: 'POST',
            success: function () { },
            error: function () { }
        });
        //window.location.href = "../../Home/ErrorPage";
        //window.close();
    },
    //////////////////////////Privilege vale/////////////////////////////////////////////
    fngetprivilegevalue: function () {
        debugger;
        var action = CompanyCode + "/" + UserTypeCode;
        HDWebApiAjax.requestInvoke("GetPrivilegeValue", action, null, "GET", this.fnprivilegevalueSuccessCallBack, this.fnprivilegevalueErrorCallBack);

    },
    fnprivilegevalueSuccessCallBack: function (result) {
        debugger;
        if (result.doctor != null && result.doctor.length > 0) {
            doctor_caption = result.doctor[0].Doctor;
        }
        else {
            doctor_caption = "Doctor";
        }
        if (result.stockist != null && result.stockist.length > 0) {
            stockist_caption = result.stockist[0].Stockist;
        }
        else {
            stockist_caption = "Stockist";
        }

        $("#CovDoctor").html("");
        $("#ComDoctor").html("");
        $("#missedDoc").html("")
        $("#CovDoctor").html(doctor_caption + " Coverage (Met)");
        $("#ComDoctor").html(doctor_caption + " Compliance Coverage (Visit Norms)");
        $("#missedDoc").html(doctor_caption + " Missed")

    },
    fnprivilegevalueErrorCallBack: function () {
        fnBootBoxAlert();
    },
    /////////////////////////////////////Speciality Name
    fngetSpecialityName: function () {
        debugger;
        var Division_Name = $('#ddlDivisionSpe').val();
        if (Division_Name == "--All--") {
            Division_Name = "All";
        }
        var SelectMonth = $('#DrSpecialitymonth').val();
        var action = CompanyCode + "/" + Division_Name + "/" + SelectMonth;
        HDWebApiAjax.requestInvoke("GetSpecialityName", action, null, "GET", this.GetSpecialityNameeSuccessCallBack, this.GetSpecialityNameErrorCallBack);

    },
    GetSpecialityNameeSuccessCallBack: function (jsonData) {
        if (jsonData.length > 0) {
            var st = "<table>";
            st += "<input type='text' class='form-control'  id='search' onkeyup='AdminDashboard.myFunction();' placeholder='Search for names..' title='Type in a name'>";
            for (var i = 0; i < jsonData.length; i++) {
                if (i == 0) {
                    st += "<tr><td><input type='radio' class='radiospec'  value='" + jsonData[i].Speciality_Name + "' id='Spec_" + i + "' name='spec' checked /> <lable>" + jsonData[i].Speciality_Name + "</lable><br></tr></td>";
                }
                else {
                    st += "<tr><td><input type='radio' class='radiospec'  value='" + jsonData[i].Speciality_Name + "'  id='Spec_" + i + "' name='spec' /> <lable>" + jsonData[i].Speciality_Name + "</lable><br></tr></td>";
                }
            }
            st += "</table>";

            //var listItems = "";
            //if (jsonData.length > 0) {
            //    for (var i = 0; i < jsonData.length; i++) {
            //        if (i == 0) {
            //            listItems += "<option selected='selected' >" + jsonData[i].Speciality_Name + "</option>";
            //        } else {
            //            listItems += "<option>" + jsonData[i].Speciality_Name + "</option>";
            //        }
            //    }
            $("#speciality").html('');
            $("#speciality").html(st);
            AdminDashboard.getDrSpecialityhWiseCoverage();
        }
        else {
            $("#speciality").html('');
            $('#tblSpecialityCoverage').html('<h2 style="text-align: center;margin-top: 25%;">No Record Found</h2>');
        }
    },
    GetSpecialityNameErrorCallBack: function (response) {

    },
    ////////////////////////UnderUserType
    GetUserTypeName: function () {
        debugger;
        var Division_Name = $('#ddlDivisionCallAvg').val();
        if (Division_Name == "--All--") {
            Division_Name = "All";
        }
        var action = CompanyCode + "/" + UserCode + "/" + Division_Name;
        HDWebApiAjax.requestInvoke("GetUserTypeName", action, null, "GET", this.GetUserTypeNameSuccessCallBack, this.GetUserTypeNameeErrorCallBack);

    },
    checkboxRefkey: function () {
        debugger;
        var IsChecked = $('input[id="selectAllRefkey"]:checked').length > 0;
        if (IsChecked == false) {
            $(".Checkbox").prop('checked', false);
        }
        else {
            $(".Checkbox").prop('checked', true);
        }
    },
    GetUserTypeNameSuccessCallBack: function (jsonData) {
        debugger;
        if (jsonData.length > 0) {
            var st = "<table id='namedisplay'>";
            st += "<input type='text' class='form-control'  id='search' onkeyup='AdminDashboard.myFunction();' placeholder='Search for names..' title='Type in a name'>";
            //  st += "<tr><td><input type='Checkbox' id='selectAllRefkey' class='AllRefCheckbox'  onclick='AdminDashboard.checkboxRefkey();'/><lable> Select All</lable><br></tr></td>";
            for (var i = 0; i < jsonData.length; i++) {
                if (i == 0) {

                    st += "<tr><td><input type='Checkbox' class='Checkbox'  value='" + jsonData[i].User_Type_Name + "' id='name_" + i + "' name='User' checked /> <lable>" + jsonData[i].User_Type_Name + "</lable><br></tr></td>";
                }
                else {
                    st += "<tr><td><input type='Checkbox' class='Checkbox'  value='" + jsonData[i].User_Type_Name + "' id='name_" + i + "' name='User' /> <lable>" + jsonData[i].User_Type_Name + "</lable><br></tr></td>";
                }
            }
            st += "</table>";
            $("#example-getting-started").html('');
            $("#example-getting-started").html(st);
        }
        else {
            $("#example-getting-started").html('');
            $('#DrCallAverage').html('<h2 style="text-align: center;margin-top: 25%;">No Record Found</h2>');
        }
        AdminDashboard.getCallAverageChart();
    },
    GetUserTypeNameeErrorCallBack: function (response) {

    },
    //////////////////////Under Region
    GetRegionTypeName: function () {
        debugger;
        $('#designation').html('Region Type');
        var Division_Name = $('#ddlDivisionCallAvg').val();
        if (Division_Name == "--All--") {
            Division_Name = "All";
        }
        var action = CompanyCode + "/" + RegionCode + "/" + Division_Name;
        HDWebApiAjax.requestInvoke("GetRegionTypeName", action, null, "GET", this.GetRegionTypeNameSuccessCallBack, this.GetRegionTypeNameErrorCallBack);

    },
    GetRegionTypeNameSuccessCallBack: function (jsonData) {
        debugger;
        if (jsonData.length > 0) {
            var st = "<table>";
            st += "<input type='text' class='form-control'  id='search' onkeyup='AdminDashboard.myFunction();' placeholder='Search for names..' title='Type in a name'>";
            for (var i = 0; i < jsonData.length; i++) {
                if (i == 0) {
                    st += "<tr><td><input type='Checkbox' class='Checkbox'  value='" + jsonData[i].Region_Type_Name + "' id='name_" + i + "' name='Region' checked /> <lable>" + jsonData[i].Region_Type_Name + "</lable><br></tr></td>";
                }
                else {
                    st += "<tr><td><input type='Checkbox' class='Checkbox'  value='" + jsonData[i].Region_Type_Name + "' id='name_" + i + "' name='Region' /> <lable>" + jsonData[i].Region_Type_Name + "</lable><br></tr></td>";
                }
            }
            st += "</table>";
            $("#example-getting-started").html('');
            $("#example-getting-started").html(st);
        }
        else {
            $("#example-getting-started").html('');
            $('#DrCallAverage').html('<h2 style="text-align: center;margin-top: 25%;">No Record Found</h2>');
        }

    },
    GetRegionTypeNameErrorCallBack: function (response) {

    },
    ////////////////////////////// Call Average////////////////////
    getCallAverageChart: function () {
        debugger;
        var days = '';
        $('#DrCallAverage').html('<img style="width:50px;margin-top: 15%;margin-left: 44%;" src="../../Content/images/loader11.gif" />');
        var Division_Name = $('#ddlDivisionCallAvg').val();
        if (Division_Name == "--All--") {
            Division_Name = "All";
        }
        var SelectMonth = $('#CallAvgmonth').val();
        var User_Type_Name = $('.Checkbox:checked').map(function () { return this.value; }).get().join(',');
        User_Type_Name += ',';
        var mode1 = 0;
        if ($("#DrCallUser").prop('checked') == true) {
            mode1 = 1;
            $('input[name=UserBasedhid]').val('Selected');
        }
        else {
            $('input[name=RegBasehid]').val('Selected');
        }
        var EDivision = 0;
        if ($("#CallAvgdiv").prop('checked') == true) {
            EDivision = 1;
        }
        var _objData = new Object();
        _objData.CompanyCode = CompanyCode;
        _objData.UserCode = UserCode;
        _objData.SelectMonth = SelectMonth;
        _objData.Division_Name = Division_Name;
        _objData.UserType = User_Type_Name;
        _objData.mode1 = mode1;
        _objData.RegionCode = RegionCode;
        _objData.EDivision = EDivision;
        var action = _objData;
        var params = [];
        var p = {};
        p.name = "objData";
        p.value = _objData
        params.push(p);
        //var action = CompanyCode + "/" + UserCode + "/" + SelectMonth + "/" + Division_Name + "/" + User_Type_Name + "/" + mode1 + "/" + RegionCode;
        //var action = CompanyCode + "/" + UserCode + "/" + SelectMonth + "/" + Division_Name + "/"
        //    + User_Type_Name + "/" + mode1 + "/" + RegionCode;
        HDWebApiAjax.requestInvoke("GetActivityCallAverage", "", params, "POST", this.getCallAverageChartSuccessCallBack, this.getCallAverageChartErrorCallBack, null, "JSON");
        //  HDWebApiAjax.requestInvoke("GetActivityCallAverage", action, null, "POST", this.getCallAverageChartSuccessCallBack, this.getCallAverageChartErrorCallBack);
    },
    getCallAverageChartSuccessCallBack: function (response) {
        debugger;
        var DRdata = new google.visualization.DataTable();
        var Call = new Array();

        if (response != null && response.Data != null && response.Data.Tables != null && response.Data.Tables.length > 0) {
            Call = response.Data.Tables[0].Rows;
            if (Call.length > 0) {

                // Header Column Name 
                var call_objects = Call[0];
                var value = Object.keys(call_objects);
                DRdata.addColumn('string', 'Month');
                for (var j = 0; j < value.length; j++) {

                    if (value[j] != "Month") {
                        DRdata.addColumn('number', value[j]);
                    }
                }
            }

            if (value.length == 1) {
                for (var k = 0; k < Call.length; k++) {
                    DRdata.addRow([Call[k][value[0]]]);
                }
            }
            else if (value.length == 2) {
                for (var k = 0; k < Call.length; k++) {
                    DRdata.addRow([Call[k][value[0]], Call[k][value[1]]]);
                }
            }
            else if (value.length == 3) {
                for (var k = 0; k < Call.length; k++) {
                    DRdata.addRow([Call[k][value[0]], Call[k][value[1]], Call[k][value[2]]]);
                }
            }
            else if (value.length == 4) {
                for (var k = 0; k < Call.length; k++) {
                    DRdata.addRow([Call[k][value[0]], Call[k][value[1]], Call[k][value[2]], Call[k][value[3]]]);
                }
            }
            else if (value.length == 5) {
                for (var k = 0; k < Call.length; k++) {
                    DRdata.addRow([Call[k][value[0]], Call[k][value[1]], Call[k][value[2]], Call[k][value[3]], Call[k][value[4]]]);
                }
            }
            else if (value.length == 6) {
                for (var k = 0; k < Call.length; k++) {
                    DRdata.addRow([Call[k][value[0]], Call[k][value[1]], Call[k][value[2]], Call[k][value[3]], Call[k][value[4]], Call[k][value[5]]]);
                }
            }
            var options = {
                hAxis: {
                    title: 'Month'
                },
                vAxis: {
                    title: 'Call Average'
                },
                legend: { position: 'top' },
                width: 510, height: 250,
                tooltip: { isHtml: true },
            };
            $('#DrCallAverage').html('');
            var table = new google.visualization.LineChart(document.getElementById("DrCallAverage"));
            table.draw(DRdata, options);
            google.visualization.events.addListener(table, 'select', function () {
                debugger;
                var selectedMonth = "";
                var contentString = "";
                var selectedItem = table.getSelection()[0];
                if (selectedItem) {
                    selectedMonth = DRdata.getValue(selectedItem.row, 0);
                    var PercentageForSelectedMonth = DRdata.getValue(0, selectedItem.column);
                    var User_Type_Name = $('.Checkbox:checked').map(function () { return this.value; }).get().join(',');
                    var SelectMonth = selectedMonth.split("'")[0];
                }
                AdminDashboard.fnDrCallAverage(selectedMonth);

            });
        }
        else {
            $('#DrCallAverage').html('<h2 style="text-align: center;margin-top: 25%;">No Record Found</h2>');

        }
    },
    fnDrCallAverage: function (selectItem) {
        debugger;
        var mode = 0;
        var Region_Type_Name = "";
        var User_Type_Name = "";
        var Division_Name = $('#ddlDivisionCallAvg').val().replace(/ /g, '_');
        if (Division_Name == "--All--") {
            Division_Name = "All";
        }

        var CallAvgReg = "";
        $.each($("input[name='Region']:checked"), function () {
            CallAvgReg += $(this).val() + ',';
        });
        //CallAvgReg = CallAvgReg.slice(0, -1);

        var CallAvgUser = "";
        $.each($("input[name='User']:checked"), function () {
            CallAvgUser += $(this).val() + ',';
        });
        //CallAvgUser = CallAvgUser.slice(0, -1);

        var selectedMonth = selectItem;
        var Month = months.indexOf(selectedMonth.split("'")[0].trim()) + 1;
        var Year = '20' + selectedMonth.split("'")[1];
        var paramValues = "";
        var isFirstTime = 1;
        var IsSync = 0;
        var days = '';
        if (CallAvgReg == '') {
            CallAvgReg = 'NotSelected';
        }
        else {
            CallAvgUser = 'NotSelected';
        }
        var EDivision = 0;
        if ($("#CallAvgdiv").prop('checked') == true) {
            EDivision = 1;
        }
        paramValues = "callaverage~" + CompanyCode + "~" + Year + "~" + Month + "~" + Division_Name + "~" + encodeURIComponent(CallAvgReg) + "~" + encodeURIComponent(CallAvgUser) + "~" + IsSync + "~" + EDivision;
        $('#main').load('../../Dashboard/CallAverageonclick/' + paramValues);

    },
    fnGetCallAverageSummary: function (model) {
        debugger;
        var param = {};
        var params = [];
        param.name = '_objData';
        param.value = model;
        params.push(param);
        $("#hdnMode").val(model.Option_Type);
        HDWebApiAjax.requestInvoke("getCallAverageDashboard", "", params, "POST", AdminDashboard.fnSuccessCallback, AdminDashboard.fnFailureCallback, null, "JSON");
        if (model.Option_Type == 1) {
            $(".spn-title").html('Region-Wise Call Average Details for the month of ' + months[model.Month - 1] + " - " + model.Year);
        }
        else if (model.Option_Type == 2) {
            $(".spn-title").html('User-Wise Call Average Details for the month of ' + months[model.Month - 1] + " - " + model.Year);
        }

    },
    fnFailureCallback: function (error) {
        var json = error.responseJSON;
        var strace = json.StackTrace.trim().split('at ')[1];
        var strace1 = strace.substring(strace, strace.indexOf('('));
        var srcFile = strace1.split('.');
        var obj = new Object();
        obj.ExceptionName = json.ExceptionType.substring(json.ExceptionType.lastIndexOf('.') + 1, json.ExceptionType.length);
        obj.ReportName = $("#rptName").val();
        obj.ExceptionMessage = json.ExceptionMessage;
        obj.ExceptionSource = srcFile[srcFile.length - 2] + "\/" + srcFile[srcFile.length - 1];
        $.ajax({
            url: '../../Home/DoRecordExceptionLog',
            data: obj,
            method: 'POST',
            success: function () { },
            error: function () { }
        });
        //window.location.href = "../../Home/ErrorPage";
        //window.close();
    },
    getCallAverageChartErrorCallBack: function (error) {
        var json = error.responseJSON;
        var strace = json.StackTrace.trim().split('at ')[1];
        var strace1 = strace.substring(strace, strace.indexOf('('));
        var srcFile = strace1.split('.');
        var obj = new Object();
        obj.ExceptionName = json.ExceptionType.substring(json.ExceptionType.lastIndexOf('.') + 1, json.ExceptionType.length);
        obj.ReportName = "Call Average";
        obj.ExceptionMessage = json.ExceptionMessage;
        obj.ExceptionSource = srcFile[srcFile.length - 2] + "\/" + srcFile[srcFile.length - 1];
        $.ajax({
            url: '../../Home/DoRecordExceptionLog',
            data: obj,
            method: 'POST',
            success: function () { },
            error: function () { }
        });
        //window.location.href = "../../Home/ErrorPage";
        //window.close();
    },
    getInformation: function (InfoId) {
        debugger;
        $('#selected1').html('');
        $('#selected2').html('');
        $('#Infotex').html('');
        var str;
        var select1; var select2;
        if (InfoId == 'CoverageInfo') {
            $('#selected3').hide();
            if ($('#coverageexchid').val() == 'Selected') {
                $('#selected1').html('<label>Exclude Unapproved Doctors :  </label> Selected');
            }
            else {
                $('#selected1').html('<label>Exclude Unapproved Doctors : </label> Not Selected ');
            }
            if ($('#coverageVaccexchid').val() == 'Selected') {
                $('#selected2').html('<label>Exclude Vacant Territories : </label> Selected');
            }
            else {
                $('#selected2').html('<label>Exclude Vacant Territories :  </label> Not Selected');
            }
            str = '<hr>';
            str += '<h2>Doctor Coverage (Met)</h2>';
            str += '<ul style="margin-left: 8%;"><li> Shows the count of all the Doctors Uniquely met across each month </li>';
            str += '<li> Display the details by Norms Count & Overall </li>';
            str += '<li> Calculation Logic = (Unique Doctors Met / Total Doctors Applicable in the Month) * 100 </li></ul> <br>';
            str += '<div><h2>Note:</h2></div>';
            str += '<div><ul style="margin-left: 8%;"><li>Considering all the Regions (Territory, Area HQ, City, Region etc.,) which has Doctor List in the respective Month</li>';
            str += '<li>Norms Visit Count More than 3 are clubbed under 3 Norms Visit Count</li>';
            str += '<li>Calculations are Upto 2 Decimals</li>';
            str += '<li>Exclude Unapproved Doctors - Doctors Un-approved during the Month is not considred in the Total Doctors Count (Denominator)</li>';
            str += '<li>Exclude Vacant Territories - Regions (Territories, Area HQ, Region etc.,) which are Vacant by end of each Month will be Excluded.</li></ul></div>';
        }
        else if (InfoId == 'ComplianceInfo') {
            $('#selected3').hide();
            if ($('#complianceeexchid').val() == 'Selected') {
                $('#selected1').html('<label>Exclude Unapproved Doctors :  </label> Selected');
            }
            else {
                $('#selected1').html('<label>Exclude Unapproved Doctors :  </label> Not Selected');
            }
            if ($('#compliancVaccexchid').val() == 'Selected') {
                $('#selected2').html('<label>Exclude Vacant Territories : </label> Selected ');
            }
            else {
                $('#selected2').html('<label>Exclude Vacant Territories :  </label> Not Selected');
            }

            str = '<hr>';
            str += '<h2>Doctor Compliance Coverage (Visit Norms) <br></h2>';
            str += '<ul style="margin-left: 8%;"><li>Shows the count of all the Doctors met atleast as per the Norms Visit across each month</li>';
            str += '<li> Display the details by Norms Count & Overall </li>';
            str += '<li>  Calculation Logic = (Unique Doctors Met atleadt as per Norms Visit / Total Doctors Applicable in the Month) * 100</li> </ul><br>';
            str += '<div><h3>Note:<h3></div>';
            str += '<div><ul style="margin-left: 8%;"><li>Considering all the Regions (Territory, Area HQ, City, Region etc.,) which has Doctor List in the respective Month</li>';
            str += '<li> Norms Visit Count More than 3 are clubbed under 3 Norms Visit Count</li>';
            str += '<li> Calculations are Upto 2 Decimals</li>';
            str += '<li> Exclude Unapproved Doctors - Doctors Un-approved during the Month is not considred in the Total Doctors Count (Denominator)</li>';
            str += '<li> Exclude Vacant Territories - Regions (Territories, Area HQ, Region etc.,) which are Vacant by end of each Month will be Excluded.</li> </ul></div>';
        }
        else if (InfoId == 'NormsInfo') {
            $('#selected3').hide();
            if ($('#DrCoverageVaccexchid').val() == 'Selected') {
                $('#selected2' + admindashboard).html('<label>Exclude Vacant Territories : </label> Selected ');
            }
            else {
                $('#selected2').html('<label>Exclude Vacant Territories :  </label> Not Selected');
            }
            str = '<hr>';
            str += '<h2>Norms Coverage<br></h2>';
            str += '<ul style="margin-left: 8%;"><li>Shows the count of all the Doctors in 4 Pattern (Exceeding the Norms Visit Count, As per the Norms Visit Count, Below the Norms Visit Count, Completely Missed)</li>';
            str += '<li>% Calculation Logic = (Doctors Applicable in each Pattern / Total Doctors Applicable in the Month) * 100 </li>';
            str += '<li>Drill down feature to see the details Region (Territory, Area HQ, City, Region etc.,) which has Doctor List & further Doctor Wise</li> </ul><br>';
            str += '<div><h3>Note:<h3></div>';
            str += '<div><ul style="margin-left: 8%;"><li>Considering all the Regions (Territory, Area HQ, City, Region etc.,) which has Doctor List in the respective Month</li>';
            str += '<li>Calculations are Upto 2 Decimals</li>';
            str += '<li>Exclude Vacant Territories - Regions (Territories, Area HQ, Region etc.,) which are Vacant by end of each Month will be Excluded.</li>';
            str += '<li>Exclude Unapproved Doctors Filter is not Applicable here..</li> </ul></div>';
        }
        else if (InfoId == 'MissedInfo') {
            $('#selected3').hide();
            if ($('#DrMonthexchid').val() == 'Selected') {
                $('#selected1').html('<label>Exclude Unapproved Doctors :  </label> Selected');
            }
            else {
                $('#selected1').html('<label>Exclude Unapproved Doctors :  </label> Not Selected');
            }
            if ($('#DrMonthVacchid').val() == 'Selected') {
                $('#selected2').html('<label>Exclude Vacant Territories : </label> Selected ');
            }
            else {
                $('#selected2').html('<label>Exclude Vacant Territories :  </label> Not Selected');
            }
        }
        else if (InfoId == 'SpecInfo') {
            var DocSpec = $('input[name=spec]:checked').val();
            if ($('#DrSpechexchid').val() == 'Selected') {
                $('#selected1').html('<label>Exclude Unapproved Doctors :  </label> Selected');
            }
            else {
                $('#selected1').html('<label>Exclude Unapproved Doctors :  </label> Not Selected');
            }
            if ($('#DrSpecVaccexchid').val() == 'Selected') {
                $('#selected2').html('<label>Exclude Vacant Territories : </label> Selected ');
            }
            else {
                $('#selected2').html('<label>Exclude Vacant Territories :  </label> Not Selected');
            }
            $('#selected3').html('<label>Speciality :  </label>' + DocSpec);
        }
        else if (InfoId == 'callAvgInfo') {
            var User_Type_Name = $('.Checkbox:checked').map(function () { return this.value; }).get().join(',');
            if ($("input[name='Drcallaverage']:checked").val() == 'RegionWise') {
                $('#selected1').html('<label>User Based :  </label> Not Selected');
                $('#selected2').html('<label>Region Based :  </label> Selected');
                $('#selected3').html('<label>Region Type Name :  </label>' + User_Type_Name);
            }
            else {
                $('#selected1').html('<label>User Based :  </label> Selected');
                $('#selected2').html('<label>Region Based :  </label>Not Selected');
                $('#selected3').html('<label>User Type Name :  </label>' + User_Type_Name);
            }
        }
        else if (InfoId == 'OpenInfo') {
            if ($('input[id="exclude"]:checked').length > 0) {
                $('#selected1').html('<label> Exclude Notional Region :  </label>Selected');
            }
            else {
                $('#selected1').html('<label> Exclude Notional Region :  </label> Not Selected');
            }
        }
        else {
            $('#selected3').hide();
            $('#infoFilter').hide();
            str = "<h3>Coming Soon</h3>";
        }
        $('#Infotex').html(str);
    },
    myFunction: function () {
        debugger;
        var input, filter, table, tr, td, i;
        input = document.getElementById("search");
        filter = input.value.toUpperCase();
        table = document.getElementById('namedisplay');
        tr = table.getElementsByTagName("tr");
        for (i = 0; i < tr.length; i++) {
            td = tr[i].getElementsByTagName("lable")[0];
            if (td) {
                if (td.innerHTML.toUpperCase().indexOf(filter) > -1) {
                    tr[i].style.display = "";
                } else {
                    tr[i].style.display = "none";
                }
            }
        }
    },
    fnExportToExcel: function () {
        debugger;
        if (!$("#child").is(":empty")) {
            var a = document.createElement('a');
            var data_type = 'data:application/vnd.ms-excel';
            var
            table_div = "<center>" + encodeURIComponent($('.spn-title').html()) + "</center>" + "<br/ >" + ($('#hdnRptName').val() !== "Norms" ? encodeURIComponent($('#rptDoctorActivityWise').html()) : encodeURIComponent($('#parent').html())) + "<br /><center>" + encodeURIComponent($('#dvTitleForRep').html()) + "</center><br />" + encodeURIComponent($('#child').html());
            a.href = data_type + ', ' + table_div;
            document.body.appendChild(a);
            a.download = ReportName.trim().toUpperCase() + '_' + (new Date().getDate() + '-' + (new Date().getMonth() + 1) + '-' + new Date().getFullYear()) + "_Territory" + '.xls';
            a.click();
        }
        else {
            var a = document.createElement('a');
            var Htmldiv = document.createElement('div');
            var data_type = 'data:application/vnd.ms-excel';
            table_div = "<center>" + encodeURIComponent($('.spn-title').html()) + "</center>" + "<br/ >" + "<br/ >" + ($('#hdnRptName').val() !== "Norms" ? encodeURIComponent($('#rptDoctorActivityWise').html()) : encodeURIComponent($('#parent').html()));
            a.href = data_type + ', ' + table_div;
            document.body.appendChild(a);
            a.download = ReportName.trim().toUpperCase() + '_' + (new Date().getDate() + '-' + (new Date().getMonth() + 1) + '-' + new Date().getFullYear()) + '.xls';
            a.click();
        }
    },
    fnGetDoctorVisitDetails: function (doctorCode, regionCode, doctorName) {
        debugger;
        var Month = "", MonthYear = "";
        $('#dvdoctorVisitDetails').html('<img style="width:50px;" src="../../Content/images/loader11.gif" />');
        AdminDashboard.defaults.DoctorName = doctorName;
        Month = ("0" + (months.indexOf($("#hdnSelectMonth").val()) + 1)).slice(-2)
        if ($("#hdnSelectYear").val() == "")
        {
            var date = new Date();
            var a = new Date(date.getFullYear(), (date.getMonth() + 1) - (parseInt(Month)));
            var b = a.getFullYear();
            var c = a.getMonth() + 1;
             MonthYear = b + '-' + c + '-01';
        }
        else
        {
            MonthYear = $("#hdnSelectYear").val() + '-' + Month + '-01';
        }

        var action = CompanyCode + "/" + regionCode + "/" + doctorCode + "/" + MonthYear;
        HDWebApiAjax.requestInvoke("GetDoctorVisitDetails", action, null, "GET", this.DoctorVisitDetailsSuccessCallBack, this.DoctorVisitDetailsErrorCallBack);

    },
    DoctorVisitDetailsSuccessCallBack: function (response) {
        debugger;
        var lst = response.Data.Tables[0].Rows;
        if (lst != null && lst.length > 0) {

            var columnarr = Object.keys(response.Data.Tables[0].Rows[0]);

            var content = '';
            content += '<div class="col-sm-12" style="font-size: 16px;font-weight: 600;margin-bottom: 10px;">';
            content += '<span> Last 6 Months Doctor Visits Details For Region : ' + AdminDashboard.defaults.DMGRegionName + ' Doctor : ' + AdminDashboard.defaults.DoctorName + ' </span>';
            content += '</div>';

            content += '<table class="table table-bordered">';
            content += '<thead>';
            content += '<tr>';
            for (var i = 0; i < columnarr.length; i++) {
                content += '<th>' + columnarr[i].replace(/_/g, ' ') + '</th>';
            }
            content += '</tr>';
            content += '</thead>';
            content += '<tbody>';
            for (var i = 0; i < lst.length; i++) {
                content += '<tr>';
                for (var j = 0; j < columnarr.length; j++) {
                    if (lst[i][columnarr[j]] == null) {
                        content += "<td>-</td>";
                    }
                    else {
                        content += "<td>" + lst[i][columnarr[j]] + "</td>";
                    }
                }
                content += '</tr>';
            }

            content += '</tbody>';
            content += '</table>';

        }
        else {
            content += 'No Record Found.'
        }
        $('#dvdoctorVisitDetails').html('');
        $('#dvdoctorVisitDetails').html(content);
        $('html,body').animate({
            scrollTop: $("#dvdoctorVisitDetails").offset().top
        })
    },
    DoctorVisitDetailsErrorCallBack: function () {

    }
}

function LoadDashBoard(id) {
    if (id == 1) {
        $("#dashboard1").load('/DashBoard/AdminTargetDashBoard_Mobile');
    }
    else if (id == 2) {
        $("#dashboard1").load('/DashBoardV2/CategoryCoverageMobileDashBoard');
    }

    else if (id == 3) {
        $("#dashboard1").load('/DashBoardV2/ProductDashBoardV2_Mobile');
    }

    else if (id == 4) {
        $("#dashboard1").load('/DashBoardV2/JoinAttritionDashBoardMobile');
    }
    else if (id == 5) {
        $("#dashboard1").load('/DashBoardV2/DashBoardV2MoblieMasterPage');
    }

}
function getAllMonth(sdate, edate) {
    var s = new Date(sdate).getMonth() + 1;
    var e = new Date(edate).getMonth() + 1;
    var a = [];
    var Month = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
    if (new Date(sdate).getFullYear() == new Date(edate).getFullYear()) {
        while (s <= e) {
            a.push(Month[s - 1] + '-' + new Date(sdate).getFullYear());
            s++;
        }
    }
    else if (new Date(edate).getFullYear() > new Date(sdate).getFullYear()) {
        var endDate = new Date(new Date(sdate).getFullYear() + "-" + "DEC" + "-" + NextGenSelfAndTeamWorkAnalysisReport.getDaysInMonth(new Date(sdate).getFullYear(), 12));
        endDate = new Date(endDate).getMonth() + 1;
        while (s <= endDate) {
            a.push(Month[s - 1] + '-' + new Date(sdate).getFullYear());
            s++;
        }
        var startDate = "01-01-" + (new Date(edate).getFullYear());
        startDate = new Date(startDate).getMonth() + 1;
        endDate = new Date(edate).getMonth() + 1;
        while (startDate <= endDate) {
            a.push(Month[startDate - 1] + '-' + new Date(edate).getFullYear());
            startDate++;
        }
    }
    return a;
}
function fnexcelexportcampaign(title,divid)
{
    debugger;
    let file = new Blob([ $('#' + divid).html()], { type: "application/vnd.ms-excel" });
    let url = URL.createObjectURL(file);
    let a = $("<a />", {
            
        href: url,
        download: "Campaign.xls"
    }).appendTo("body").get(0).click();
}


