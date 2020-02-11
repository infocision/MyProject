//global variable
var userCode_g = "";
var strTree = "";
var menuContent = "";
function fnBindUserTree(id, filterNodeId) {
    debugger;
    $('#' + id).block({
        message: '<h3>Loading...</h3>',
        css: { border: '1px solid #ddd' }
    });
    //  $("#dvAjaxLoad").show();
    $.ajax({
        type: "POST",
        url: 'Master/GenerateUserTree',
        data: "A",
        success: function (jsData) {
            if (jsData != '') {
                $('#' + filterNodeId).hide();
                $("#" + id).show();
                strTree = jsData;
                $("#" + id).html(' ');
                $('#' + id).dynatree();
                $('#' + id).dynatree('destroy');
                $('#' + id).empty();
                $("#" + id).html(strTree);

                $("#" + id).dynatree({
                    checkbox: false,
                    onActivate: function (node) {
                        fnUserTreeNodeClick(node);
                    },
                    onClick: function (node, event) {
                        // Close menu on click
                        if ($(".contextMenu:visible").length > 0) {
                            $(".contextMenu").hide();
                        }
                    },
                    onCreate: function (node, span) {
                        bindUserContextMenu(span);
                    },
                    onKeydown: function (node, event) {
                        // Eat keyboard events, when a menu is open

                    },
                    onDeactivate: function (node) {
                    },
                    strings: {
                        loading: "Loading…",
                        loadError: "Load error!"
                    },
                    onDblClick: function (node, event) {
                        fnUserTreeNodeDblClick(node);
                    },
                    onPostInit: function (node, event) {
                        fnUserTreePostInit(node);
                    }
                });
                $("#dvAjaxLoad").hide();
                $('#' + id).unblock();
            }
        }
        //}
    });
    $('#' + id).unblock();
}

//******************************Start New Tree Generated*******************************************************************
// New Tree Created by adding Employee Name in first

function fnBindUserTreeNew(id, filterNodeId) {
    debugger;
    $('#' + id).block({
        message: '<h3>Loading...</h3>',
        css: { border: '1px solid #ddd' }
    });
    //  $("#dvAjaxLoad").show();
    $.ajax({
        type: "POST",
        url: 'Master/GenerateUserTreeNew',
        data: "A",
        success: function (jsData) {
            debugger;
            if (jsData != '') {
                $('#' + filterNodeId).hide();
                $("#" + id).show();
                strTree = jsData;
                $("#" + id).html(' ');
                $('#' + id).dynatree('destroy');
                $('#' + id).empty();
                $("#" + id).html(strTree);

                $("#" + id).dynatree({
                    checkbox: false,
                    onActivate: function (node) {
                        fnUserTreeNodeClick(node);
                    },
                    onClick: function (node, event) {
                        // Close menu on click
                        if ($(".contextMenu:visible").length > 0) {
                            $(".contextMenu").hide();
                        }
                    },
                    onCreate: function (node, span) {
                        bindUserContextMenu(span);
                    },
                    onKeydown: function (node, event) {
                        // Eat keyboard events, when a menu is open

                    },
                    onDeactivate: function (node) {
                    },
                    strings: {
                        loading: "Loading…",
                        loadError: "Load error!"
                    },
                    onDblClick: function (node, event) {
                        fnUserTreeNodeDblClick(node);
                    },
                    onPostInit: function (node, event) {
                        fnUserTreePostInit(node);
                    }
                });
                $("#dvAjaxLoad").hide();
                $('#' + id).unblock();
            }
        }
        //}
    });
    $('#' + id).unblock();
}


// All user free with check box
//function fnBindFullUserTreeWithCheckBox(id) {
//    debugger;
//    $.ajax({
//        type: "POST",
//        url: 'Master/GenerateFullUserTreeNew',
//        data: "A",
//        success: function (jsData) {
//            if (jsData != '') {
//                strTree = jsData;
//                $("#" + id).html(' ');
//                $('#' + id).dynatree('destroy');
//                $('#' + id).empty();
//                $("#" + id).html(strTree);
//                var clickStatus = new Boolean();

//                $("#" + id).dynatree({
//                    checkbox: true,
//                    onActivate: function (node) {
//                        fnUserTreeNodeClick(node);
//                    },
//                    onClick: function (node, event) {
//                        // Close menu on click
//                        if ($(".contextMenu:visible").length > 0) {
//                            $(".contextMenu").hide();
//                        }
//                    },
//                    onCreate: function (node, span) {
//                        bindUserContextMenu(span);
//                    },
//                    onSelect: function (select, node) {
//                        // Get a list of all selected nodes, and convert to a key array:
//                        fnUserTreeSelect(select, node);
//                        clickStatus = select;
//                    },
//                    onKeydown: function (node, event) {
//                        // Eat keyboard events, when a menu is open

//                    },
//                    onDeactivate: function (node) {
//                    },
//                    strings: {
//                        loading: "Loading…",
//                        loadError: "Load error!"
//                    },
//                    onDblClick: function (node, event) {
//                        try {
//                            inEventHandler = true;
//                            node.visit(function (childNode) {
//                                childNode.select(clickStatus);
//                            });
//                        } finally {
//                            inEventHandler = false;
//                        }

//                    },
//                    onPostInit: function (node, event) {
//                        fnUserTreePostInit(node);
//                    }
//                });
//                $("#dvAjaxLoad").hide();
//            }
//        }
//    });
//}

// **********************************************************End **********************************************************

// ---User Contextmenu helper --------------------------------------------------
function bindUserContextMenu(span) {
    // Add context menu to this node:
    $(span).contextMenu({ menu: "userConMenu" }, function (action, el, pos) {
        // The event was bound to the <span> tag, but the node object
        // is stored in the parent <li> tag
        var node = $.ui.dynatree.getNode(el);
        switch (action) {
            case "deleteuser":
                fnChangeUserStatus(action, node);
                break;
            case "adduser":
                fnAddChildUser(action, node);
                break;
            case "usermoveup":
                fnMoveUserTreeUp(action, node);
                break;
            case "usermovedown":
                fnMoveUserTreeDown(action, node);
                break;
            case "changeuser":
                fnChangeUserHierarchyPopUp(action, node);
                break;
            default:

        }
    });
};

function fnBindUserTreeWithCheckBox(id) {
    $.blockUI();
    // $("#dvAjaxLoad").show();
    $.ajax({
        type: "POST",
        url: 'Master/GenerateUserTree',
        data: "A",
        success: function (jsData) {
            if (jsData != '') {
                strTree = jsData;
                $("#" + id).html(' ');
                $('#' + id).dynatree('destroy');
                $('#' + id).empty();
                $("#" + id).html(strTree);
                var clickStatus = new Boolean();

                $("#" + id).dynatree({
                    checkbox: true,
                    onActivate: function (node) {
                        fnUserTreeNodeClick(node);
                    },
                    onClick: function (node, event) {
                        // Close menu on click
                        if ($(".contextMenu:visible").length > 0) {
                            $(".contextMenu").hide();
                        }
                    },
                    onCreate: function (node, span) {
                        bindUserContextMenu(span);
                    },
                    onSelect: function (select, node) {
                        // Get a list of all selected nodes, and convert to a key array:
                        fnUserTreeSelect(select, node);
                        clickStatus = select;
                        //if (!select) {
                        //    node.visit(function (node) {
                        //        node.select(false);
                        //    });
                        //}
                        //else {
                        //    node.visit(function (node) {
                        //        node.select(false);
                        //    });
                        //}
                    },
                    onKeydown: function (node, event) {
                        // Eat keyboard events, when a menu is open

                    },
                    onDeactivate: function (node) {
                    },
                    strings: {
                        loading: "Loading…",
                        loadError: "Load error!"
                    },
                    onDblClick: function (node, event) {
                        try {
                            inEventHandler = true;
                            node.visit(function (childNode) {
                                childNode.select(clickStatus);
                            });
                        } finally {
                            inEventHandler = false;
                        }
                    },
                    onPostInit: function (node, event) {
                        fnUserTreePostInit(node);
                    }
                });
                $("#dvAjaxLoad").hide();
            }
        }
    });
}
function fnBindUserTreeWithCheckBoxDoubleClick(id) {
    // $.blockUI();
    // $("#dvAjaxLoad").show();
    $.ajax({
        type: "POST",
        url: 'Master/GenerateUserTree',
        data: "A",
        success: function (jsData) {
            if (jsData != '') {
                strTree = jsData;
                $("#" + id).html(' ');
                $('#' + id).dynatree('destroy');
                $('#' + id).empty();
                $("#" + id).html(strTree);
                var clickStatus = new Boolean();

                $("#" + id).dynatree({
                    checkbox: true,
                    onActivate: function (node) {
                        fnUserTreeNodeClick(node);
                    },
                    onClick: function (node, event) {
                        // Close menu on click
                        if ($(".contextMenu:visible").length > 0) {
                            $(".contextMenu").hide();
                        }
                    },
                    onCreate: function (node, span) {
                        bindUserContextMenu(span);
                    },
                    onSelect: function (select, node) {
                        //// Get a list of all selected nodes, and convert to a key array:
                        fnUserTreeSelect(select, node);
                        clickStatus = select;
                        //if (!select) {
                        //    node.visit(function (node) {
                        //        node.select(false);
                        //    });
                        //}
                        //else {
                        //    node.visit(function (node) {
                        //        node.select(false);
                        //    });
                        //}
                    },
                    onKeydown: function (node, event) {
                        // Eat keyboard events, when a menu is open

                    },
                    onDeactivate: function (node) {
                    },
                    strings: {
                        loading: "Loading…",
                        loadError: "Load error!"
                    },
                    onDblClick: function (node, event) {
                        //fnUserTreeNodeDblClick(node);
                        //fnRegionTreeNodeClick(node);
                        //node.select(true);
                        try {
                            inEventHandler = true;
                            node.visit(function (childNode) {
                                childNode.select(clickStatus);
                            });
                        } finally {
                            inEventHandler = false;
                        }
                    },
                    onPostInit: function (node, event) {
                        fnUserTreePostInit(node);
                    }
                });
                $("#dvAjaxLoad").hide();
            }
        }
    });
}

//***************************** Last Submitted Report New Tree with Employee Name********************************************

function fnBindUserTreeWithCheckBoxDoubleClickNew(id) {
    // $.blockUI();
    // $("#dvAjaxLoad").show();
    $.ajax({
        type: "POST",
        url: 'Master/GenerateUserTreeNew',
        data: "A",
        success: function (jsData) {
            if (jsData != '') {
                strTree = jsData;
                $("#" + id).html(' ');
                $('#' + id).dynatree('destroy');
                $('#' + id).empty();
                $("#" + id).html(strTree);
                var clickStatus = new Boolean();

                $("#" + id).dynatree({
                    checkbox: true,
                    onActivate: function (node) {
                        fnUserTreeNodeClick(node);
                    },
                    onClick: function (node, event) {
                        // Close menu on click
                        if ($(".contextMenu:visible").length > 0) {
                            $(".contextMenu").hide();
                        }
                    },
                    onCreate: function (node, span) {
                        bindUserContextMenu(span);
                    },
                    onSelect: function (select, node) {
                        //// Get a list of all selected nodes, and convert to a key array:
                        fnUserTreeSelect(select, node);
                        clickStatus = select;
                    },
                    onKeydown: function (node, event) {

                    },
                    onDeactivate: function (node) {
                    },
                    strings: {
                        loading: "Loading…",
                        loadError: "Load error!"
                    },
                    onDblClick: function (node, event) {
                        try {
                            inEventHandler = true;
                            node.visit(function (childNode) {
                                childNode.select(clickStatus);
                            });
                        } finally {
                            inEventHandler = false;
                        }
                    },
                    onPostInit: function (node, event) {
                        fnUserTreePostInit(node);
                    }
                });
                $("#dvAjaxLoad").hide();
            }
        }
    });
}
// All user free with check box
function fnBindFullUserTreeWithCheckBox(id) {
    $.ajax({
        type: "POST",
        url: 'Master/GenerateFullUserTree',
        data: "A",
        success: function (jsData) {
            if (jsData != '') {
                strTree = jsData;
                $("#" + id).html(' ');
                $('#' + id).dynatree('destroy');
                $('#' + id).empty();
                $("#" + id).html(strTree);
                var clickStatus = new Boolean();

                $("#" + id).dynatree({
                    checkbox: true,
                    onActivate: function (node) {
                        fnUserTreeNodeClick(node);
                    },
                    onClick: function (node, event) {
                        // Close menu on click
                        if ($(".contextMenu:visible").length > 0) {
                            $(".contextMenu").hide();
                        }
                    },
                    onCreate: function (node, span) {
                        bindUserContextMenu(span);
                    },
                    onSelect: function (select, node) {
                        // Get a list of all selected nodes, and convert to a key array:
                        fnUserTreeSelect(select, node);
                        clickStatus = select;
                        //if (!select) {
                        //    node.visit(function (node) {
                        //        node.select(false);
                        //    });
                        //}
                        //else {
                        //    node.visit(function (node) {
                        //        node.select(false);
                        //    });
                        //}
                    },
                    onKeydown: function (node, event) {
                        // Eat keyboard events, when a menu is open

                    },
                    onDeactivate: function (node) {
                    },
                    strings: {
                        loading: "Loading…",
                        loadError: "Load error!"
                    },
                    onDblClick: function (node, event) {
                        // fnUserTreeNodeDblClick(node);
                        //node.select(true);
                        try {
                            inEventHandler = true;
                            node.visit(function (childNode) {
                                childNode.select(clickStatus);
                            });
                        } finally {
                            inEventHandler = false;
                        }

                    },
                    onPostInit: function (node, event) {
                        fnUserTreePostInit(node);
                    }
                });
                $("#dvAjaxLoad").hide();
            }
        }
    });
}

function fnBindUserTypeTree(id) {
    $.ajax({
        type: "POST",
        url: '../../Master/GetUserTypeMasterTreeDetails',
        data: "A",
        success: function (jsData) {
            jsData = eval('(' + jsData + ')');
            data = jsData;
            if (jsData.Tables[0].Rows.length > 0) {
                strTreeUserType = "<ul  id='home' item-expanded='true'  >";
                var stUserTypeCode = jsData.Tables[0].Rows[0].User_Type_Code
                var strUserTypeName = jsData.Tables[0].Rows[0].User_Type_Name;

                strTreeUserType += "<li id='" + stUserTypeCode + "'  class='expanded' >" + strUserTypeName;

                var parentJson = jsonPath(jsData, "$.Tables[1].Rows[?(@.Under_User_Type=='" + stUserTypeCode + "')]");
                if (parentJson != false && parentJson.length > 0) {
                    strTreeUserType += "<ul >";

                    for (var i = 0; i < parentJson.length; i++) {
                        var disJson = jsonPath(jsData, "$.Tables[1].Rows[?(@.Under_User_Type=='" + parentJson[i].User_Type_Code + "')]");

                        //if (disJson != false && disJson.length > 1) {
                        //    strTreeUserType += "<ul >";
                        //}
                        strTreeUserType += "<li id='" + parentJson[i].User_Type_Code + "'  class='expanded' >" + parentJson[i].User_Type_Name + "";

                        if (disJson != false && disJson.length > 0) {
                            strTreeUserType += "<ul >";
                            fnUserTypeSubMenu(jsData, parentJson[i].User_Type_Code);
                            strTreeUserType += "</ul>";
                        }
                        strTreeUserType += "</li>";

                        //if (disJson != false && disJson.length > 1) {
                        //    strTreeUserType += "</ul>";
                        //}
                    }
                    strTreeUserType += "</ul>";
                }

                strTreeUserType += "</li></ul>";

                $("#" + id).html(' ');
                $('#' + id).dynatree('destroy');
                $('#' + id).empty();
                $("#" + id).html(strTreeUserType);
                $("#" + id).dynatree({

                    checkbox: false,
                    onActivate: function (node) {
                        fnUserTypeTreeNodeClick(node);
                    },
                    onClick: function (node, event) {
                        // Close menu on click
                        if ($(".contextMenu:visible").length > 0) {
                            $(".contextMenu").hide();
                        }
                    },
                    onCreate: function (node, span) {
                        bindUserContextMenu(span);
                    },
                    onKeydown: function (node, event) {
                        // Eat keyboard events, when a menu is open

                    },
                    onDeactivate: function (node) {
                    },
                    strings: {
                        loading: "Loading…",
                        loadError: "Load error!"
                    },
                    onDblClick: function (node, event) {
                        fnUserTypeTreeNodeDblClick(node);
                    },
                    onPostInit: function (node, event) {
                        fnUserTypeTreePostInit(node);
                    }
                });
                $("#dvAjaxLoad").hide();
            }
        }
    });
}

function fnUserTypeSubMenu(jsonData, parentId) {
    var dJson = jsonPath(jsonData, "$.Tables[1].Rows[?(@.Under_User_Type=='" + parentId + "')]");
    if (dJson != false) {
        for (var j = 0; j < dJson.length; j++) {
            strTreeUserType += "<li id='" + dJson[j].User_Type_Code + "' class='expanded' >" + dJson[j].User_Type_Name;

            var dsJson = jsonPath(jsonData, "$.Tables[1].Rows[?(@.Under_User_Type=='" + dJson[j].User_Type_Code + "')]");
            if (dsJson != false && dsJson.length > 0) {
                strTreeUserType += "<ul >";
                fnUserTypemenu(jsonData, dJson[j].User_Type_Code);
                strTreeUserType += "</ul>";
            }
            strTreeUserType += "</li>";
        }
    }
}

function fnUserTypemenu(jsonData, parentId) {
    var dJson = jsonPath(jsonData, "$.Tables[1].Rows[?(@.Under_User_Type=='" + parentId + "')]");
    if (dJson != false) {
        for (var j = 0; j < dJson.length; j++) {
            strTreeUserType += "<li id='" + dJson[j].User_Type_Code + "' class='expanded' >" + dJson[j].User_Type_Name;

            var dsJson = jsonPath(jsonData, "$.Tables[1].Rows[?(@.Under_User_Type=='" + dJson[j].User_Type_Code + "')]");
            if (dsJson != false && dsJson.length > 0) {
                strTreeUserType += "<ul >";
                fnUserTypemenu(jsonData, dJson[j].User_Type_Code);
                strTreeUserType += "</ul>";
            }
            strTreeUserType += "</li>";
        }
    }
}



function fnBindUserTypeTreeWithCheckbox(id) {
    $.ajax({
        type: "POST",
        url: '../../Master/GetUserTypeMasterTreeDetails',
        data: "A",
        success: function (jsData) {
            jsData = eval('(' + jsData + ')');
            data = jsData;
            if (jsData.Tables[0].Rows.length > 0) {
                strTreeUserType = "<ul  id='home' item-expanded='true'  >";
                var stUserTypeCode = jsData.Tables[0].Rows[0].User_Type_Code
                var strUserTypeName = jsData.Tables[0].Rows[0].User_Type_Name;

                strTreeUserType += "<li id='" + stUserTypeCode + "'  class='expanded' >" + strUserTypeName;

                var parentJson = jsonPath(jsData, "$.Tables[1].Rows[?(@.Under_User_Type=='" + stUserTypeCode + "')]");
                if (parentJson != false && parentJson.length > 0) {
                    strTreeUserType += "<ul >";

                    for (var i = 0; i < parentJson.length; i++) {
                        var disJson = jsonPath(jsData, "$.Tables[1].Rows[?(@.Under_User_Type=='" + parentJson[i].User_Type_Code + "')]");

                        //if (disJson != false && disJson.length > 1) {
                        //    strTreeUserType += "<ul >";
                        //}
                        strTreeUserType += "<li id='" + parentJson[i].User_Type_Code + "'  class='expanded' >" + parentJson[i].User_Type_Name + "";

                        if (disJson != false && disJson.length > 0) {
                            strTreeUserType += "<ul >";
                            fnUserTypeSubMenu(jsData, parentJson[i].User_Type_Code);
                            strTreeUserType += "</ul>";
                        }
                        strTreeUserType += "</li>";

                        //if (disJson != false && disJson.length > 1) {
                        //    strTreeUserType += "</ul>";
                        //}
                    }
                    strTreeUserType += "</ul>";
                }

                strTreeUserType += "</li></ul>";

                $("#" + id).html(' ');
                $('#' + id).dynatree('destroy');
                $('#' + id).empty();
                $("#" + id).html(strTreeUserType);
                $("#" + id).dynatree({

                    checkbox: true,
                    onActivate: function (node) {
                        fnUserTypeTreeNodeClick(node);
                    },
                    onClick: function (node, event) {
                        // Close menu on click
                        if ($(".contextMenu:visible").length > 0) {
                            $(".contextMenu").hide();
                        }
                    },
                    onCreate: function (node, span) {
                        bindUserContextMenu(span);
                    },
                    onSelect: function (select, node) {
                        // Get a list of all selected nodes, and convert to a key array:
                        fnUserTypeTreeSelect(select, node);
                        if (!select) {
                            node.visit(function (node) {
                                node.select(false);
                            });
                        }
                        else {
                            node.visit(function (node) {
                                node.select(false);
                            });
                        }
                    },
                    onKeydown: function (node, event) {
                        // Eat keyboard events, when a menu is open

                    },
                    onDeactivate: function (node) {
                    },
                    strings: {
                        loading: "Loading…",
                        loadError: "Load error!"
                    },
                    onDblClick: function (node, event) {
                        fnUserTypeTreeNodeDblClick(node);
                    },
                    onPostInit: function (node, event) {
                        fnUserTypeTreePostInit(node);
                    }
                });
                $("#dvAjaxLoad").hide();
            }
        }
    });
}

function fnDisabledUserTree(id) {
    $.ajax({
        type: 'POST',
        url: 'Master/GetDisabledUsers',
        data: '',
        success: function (response) {
            $("#" + id).html(response);
        },
        error: function () {
            fnMsgAlert('info', 'Report', 'Error.');
        },
        complete: function () {
        }
    });

}

//function fnGetUserTreeByUser(userCode, treeId, filterId) {
//    if (userCode == "") {
//        userCode = curUserCode_g;
//    }
//    //if (userCode == curUserCode_g) {
//    //    $('#dvPreviousNode').hide();
//    //}
//    //else {
//    //    $('#dvPreviousNode').show();
//    //}
//    $.ajax({
//        type: "POST",
//        url: 'Master/UserTreeGenerationByUserCode',
//        data: "userCode=" + userCode + "&includeOneLevelParent=NO",
//        success: function (jsData) {
//            if (jsData != '') {
//                $('#' + filterId).hide();
//                $("#" + treeId).show();
//                strTree = jsData;
//                $("#" + treeId).html(' ');
//                $('#' + treeId).dynatree('destroy');
//                $('#' + treeId).empty();
//                $("#" + treeId).html(strTree);

//                $("#" + treeId).dynatree({
//                    checkbox: false,
//                    onActivate: function (node) {
//                        fnUserTreeNodeClick(node);
//                    },
//                    onClick: function (node, event) {
//                        // Close menu on click
//                        if ($(".contextMenu:visible").length > 0) {
//                            $(".contextMenu").hide();
//                        }
//                    },
//                    onCreate: function (node, span) {
//                        bindUserContextMenu(span);
//                    },
//                    onKeydown: function (node, event) {
//                        // Eat keyboard events, when a menu is open

//                    },
//                    onDeactivate: function (node) {
//                    },
//                    strings: {
//                        loading: "Loading…",
//                        loadError: "Load error!"
//                    },
//                    onDblClick: function (node, event) {
//                        fnUserTreeNodeDblClick(node);
//                    },
//                    onPostInit: function (node, event) {
//                        fnUserTreePostInit(node);
//                    }
//                });
//                $("#dvAjaxLoad").hide();
//                if ($("#" + treeId).dynatree("getTree").tnRoot.childList[0].data.key == curUserCode_g) {
//                    $('#dvPreviousNode').hide();
//                }
//                else {
//                    $('#dvPreviousNode').show();
//                }
//            }
//        }
//        //}
//    });
//}

function fnGetUserTreeByUserWithOnelevelParent(userCode, treeId, filterId) {
    debugger;
    // var userCode = $("#dvRegionTree").dynatree("getTree").tnRoot.childList[0].data.key;
    $('#' + treeId).block({
        message: '<h3>Loading...</h3>',
        css: { border: '1px solid #ddd' }
    });
    $.ajax({
        type: "POST",
        url: 'Master/UserTreeGenerationByUserCode',
        data: "userCode=" + userCode + "&includeOneLevelParent=YES",
        success: function (jsData) {
            if (jsData != '') {
                if (userCode == curUserCode_g) {
                    $('#dvPreviousNode').hide();
                }
                else {
                    $('#dvPreviousNode').show();
                }
                $('#' + filterId).hide();
                $("#" + treeId).show();
                var strTree = jsData;
                $("#" + treeId).html(' ');
                $('#' + treeId).dynatree('destroy');
                $('#' + treeId).empty();
                $("#" + treeId).html(strTree);

                $("#" + treeId).dynatree({
                    checkbox: false,
                    onActivate: function (node) {
                        fnUserTreeNodeClick(node);
                    },
                    onClick: function (node, event) {
                        // Close menu on click
                        //if ($(e.target).hasClass("parent")) {
                        //    alert("You clicked " + node + ",  url=" + node.url);
                        //}
                        if ($(".contextMenu:visible").length > 0) {
                            $(".contextMenu").hide();
                        }
                    },
                    onCreate: function (node, span) {
                        bindUserContextMenu(span);
                    },
                    onKeydown: function (node, event) {
                        // Eat keyboard events, when a menu is open

                    },
                    onDeactivate: function (node) {
                    },
                    strings: {
                        loading: "Loading…",
                        loadError: "Load error!"
                    },
                    onDblClick: function (node, event) {
                        fnUserTreeNodeDblClick(node);
                    },
                    onPostInit: function (node, event) {
                        fnUserTreePostInit(node);
                    }
                });
                $("#dvAjaxLoad").hide();
                //if ($("#" + treeId).dynatree("getTree").tnRoot.childList[0].data.key == curUserCode_g) {
                //    $('#dvPreviousNode').hide();
                //}
                //else {
                //    $('#dvPreviousNode').show();
                //}
                // $('.parent').click(fnClick(this));
                $("span.parent").live("click", function (e) {
                    // alert("Edit " + $.ui.dynatree.getNode(e.target));
                    fnShowChildNodes(e.target);
                });
                var first_levelusercode = $("#dvUserTree").dynatree("getRoot").getChildren()[0].data.key;
                if (first_levelusercode == curUserCode_g) {
                    $('#dvPreviousNode').hide();
                }
                else {
                    $('#dvPreviousNode').show();
                }
            }
        },
        error: function () {
            $('#' + treeId).unblock();
        },
        complete: function () {
            $('#' + treeId).unblock();
        }
        //}
    });
}

function fnGetUserTreeByUserWithOnelevelParentNew(userCode, treeId, filterId) {
    debugger;
    $('#' + treeId).block({
        message: '<h3>Loading...</h3>',
        css: { border: '1px solid #ddd' }
    });
    $.ajax({
        type: "POST",
        url: 'Master/UserTreeGenerationByUserCode_New',
        data: "userCode=" + userCode + "&includeOneLevelParent=YES",
        success: function (jsData) {
            debugger;
            if (jsData != '') {
                if (userCode == curUserCode_g) {
                    $('#dvPreviousNode').hide();
                }
                else {
                    $('#dvPreviousNode').show();
                }
                $('#' + filterId).hide();
                $("#" + treeId).show();
                var strTree = jsData;
                $("#" + treeId).html(' ');
                $('#' + treeId).dynatree('destroy');
                $('#' + treeId).empty();
                $("#" + treeId).html(strTree);

                $("#" + treeId).dynatree({
                    checkbox: false,
                    onActivate: function (node) {
                        fnUserTreeNodeClick(node);
                    },
                    onClick: function (node, event) {
                        // Close menu on click
                        //if ($(e.target).hasClass("parent")) {
                        //    alert("You clicked " + node + ",  url=" + node.url);
                        //}
                        if ($(".contextMenu:visible").length > 0) {
                            $(".contextMenu").hide();
                        }
                    },
                    onCreate: function (node, span) {
                        bindUserContextMenu(span);
                    },
                    onKeydown: function (node, event) {
                        // Eat keyboard events, when a menu is open

                    },
                    onDeactivate: function (node) {
                    },
                    strings: {
                        loading: "Loading…",
                        loadError: "Load error!"
                    },
                    onDblClick: function (node, event) {
                        fnUserTreeNodeDblClick(node);
                    },
                    onPostInit: function (node, event) {
                        fnUserTreePostInit(node);
                    }
                });
                $("#dvAjaxLoad").hide();
                $("span.parent").live("click", function (e) {
                    // alert("Edit " + $.ui.dynatree.getNode(e.target));
                    fnShowChildNodes(e.target);
                });
                var first_levelusercode = $("#dvUserTree").dynatree("getRoot").getChildren()[0].data.key;
                if (first_levelusercode == curUserCode_g) {
                    $('#dvPreviousNode').hide();
                }
                else {
                    $('#dvPreviousNode').show();
                }
            }
        },
        error: function () {
            $('#' + treeId).unblock();
        },
        complete: function () {
            $('#' + treeId).unblock();
        }
        //}
    });
}



function fnGetUsersByUserName(userName, treeId, filterId) {
    debugger;
    $.ajax({
        type: "POST",
        url: '../Tree/GetUsersByUserName',
        data: "userName=" + userName + "&treeId=" + treeId + "&filterId=" + filterId + "",
        success: function (result) {
            if (result != "") {
                $('#dvFilteredNode').html(result);
                $('#' + treeId).hide();
                $('#' + filterId).show();

            }
            else {
                fnGenerateUserTree("dvUserTree");
                $('#' + treeId).show();
                $('#' + filterId).hide();
            }
        },
        error: function () {
        },
        complete: function () {
        }
    });
}
function GetCheckUsersByUserName(userName, treeId, filterId) {
    debugger;
    $.ajax({
        type: "POST",
        url: '../Tree/GetCheckUsersByUserName',
        data: "userName=" + userName + "&treeId=" + treeId + "&filterId=" + filterId + "",
        success: function (result) {
            if (result != "") {
                $('#dvFilteredNode').html(result);
                $('#' + treeId).hide();
                $('#' + filterId).show();

            }
            else {
                fnGenerateUserTree("dvUserTree");
                $('#' + treeId).show();
                $('#' + filterId).hide();
            }
        },
        error: function () {
        },
        complete: function () {
        }
    });
}
function fnGetUsersByUserNameEmployeeName(userName, treeId, filterId) {
    debugger;
    $.ajax({
        type: "POST",
        url: 'Master/GetUsersByUserNameEmployeeName',
        data: "userName=" + userName + "&treeId=" + treeId + "&filterId=" + filterId + "",
        success: function (result) {
            debugger;
            if (result != "") {
                $('#dvFilteredNode').html(result);
                $('#' + treeId).hide();
                $('#' + filterId).show();

            }
            else {
                debugger;
                fnGenerateUserTree("dvUserTree");
                $('#' + treeId).show();
                $('#' + filterId).hide();
            }
        },
        error: function () {
        },
        complete: function () {
        }
    });
}
function fnGetUserTreeByUser(userCode, treeId, filterId) {
    debugger;
    //if (userCode == "") {
    //    userCode = currentUserCode_g;
    //}
    //if (userCode == curUserCode_g) {
    //    $('#dvPreviousNode').hide();
    //}
    //else {
    //    $('#dvPreviousNode').show();
    //}
    //$('#' + treeId).block({
    //    message: '<h3>Loading...</h3>',
    //    css: { border: '1px solid #ddd' }
    //});
    $.ajax({
        type: "POST",
        data: "UserCode=" + userCode,
        url: '../Tree/GetUserHierarchy',
        success: function (jsData) {
            if (jsData != '') {
                debugger;
                // console.log(jsData);
                $('#' + filterId).hide();
                $("#" + treeId).show();
                strTree = jsData;
                $("#" + treeId).html(' ');
                $('#' + treeId).dynatree();
                $('#' + treeId).dynatree('destroy');
                $('#' + treeId).empty();
                $("#" + treeId).html(strTree);

                $("#" + treeId).dynatree({
                    checkbox: false,
                    onActivate: function (node) {
                        fnUserTreeNodeClick(node);
                    },
                    onClick: function (node, event) {
                        // Close menu on click
                        //if ($(event.target).hasClass("parent")) {
                        //    alert("You clicked " + node + ",  url=" + node.url);
                        //}
                        if ($(".contextMenu:visible").length > 0) {
                            $(".contextMenu").hide();
                        }
                    },
                    //onLazyRead: function (node) {
                    //    // In real life we would call something like this:

                    //    // .. but here we use a local file instead:
                    //    //node.appendAjax({
                    //    //    url: "sample-data2.json",
                    //    //    // We don't want the next line in production code:
                    //    //    debugLazyDelay: 750
                    //    //});
                    //    fnAddNode(node);
                    //},
                    onCreate: function (node, span) {
                        //bindUserContextMenu(span);
                    },
                    onKeydown: function (node, event) {
                        // Eat keyboard events, when a menu is open

                    },
                    onDeactivate: function (node) {
                    },
                    strings: {
                        loading: "Loading…",
                        loadError: "Load error!"
                    },
                    onDblClick: function (node, event) {
                        fnUserTreeNodeDblClick(node);
                    },
                    onPostInit: function (node, event) {
                        fnUserTreePostInit(node);
                    }
                });
                $("#dvAjaxLoad").hide();
                $("span.childIcon").unbind("click");
                $("span.childIcon").live("click", function (e) {
                    //alert("Edit " + $.ui.dynatree.getNode(e.target));
                    fnShowChildNodes(e.target);
                });
            }
        },
        error: function () {
            $('#' + treeId).unblock();
        },
        complete: function () {
            $('#' + treeId).unblock();
        }
        //}
    });
}

function chkUserClick(node) {
    if ($(".contextMenu:visible").length > 0) {
        $(".contextMenu").hide();
    }
}

function fnGetUserTreeByUserCheckBox(userCode, treeId, filterId) {
    debugger;
    //if (userCode == "") {
    //    userCode = currentUserCode_g;
    //}
    //if (userCode == curUserCode_g) {
    //    $('#dvPreviousNode').hide();
    //}
    //else {
    //    $('#dvPreviousNode').show();
    //}
    //$('#' + treeId).block({
    //    message: '<h3>Loading...</h3>',
    //    css: { border: '1px solid #ddd' }
    //});
    $.ajax({
        type: "POST",
        data: "UserCode=" + userCode,
        url: '../Tree/GetUserHierarchy',
        success: function (jsData) {
            if (jsData != '') {
                debugger;
                // console.log(jsData);
                $('#' + filterId).hide();
                $("#" + treeId).show();
                strTree = jsData;
                $("#" + treeId).html(' ');
                $('#' + treeId).dynatree();
                $('#' + treeId).dynatree('destroy');
                $('#' + treeId).empty();
                $("#" + treeId).html(strTree);

                $("#" + treeId).dynatree({
                    checkbox: true,
                    onActivate: function (node) {
                        fnUserTreeNodeClick(node);
                    },
                    onClick: function (node, event) {
                        // Close menu on click
                        //if ($(event.target).hasClass("parent")) {
                        //    alert("You clicked " + node + ",  url=" + node.url);
                        //}
                        debugger;
                        chkUserClick(node);

                    },
                    onSelect: function (select, node) {
                        // Get a list of all selected nodes, and convert to a key array:
                        debugger;
                        fnUserTreeSelect(select, node);
                        if (!select) {
                            node.visit(function (node) {
                                node.select(false);
                            });
                        }
                        else {
                            node.visit(function (node) {
                                node.select(false);
                            });
                        }
                    },
                    onCreate: function (node, span) {
                        //bindUserContextMenu(span);
                    },
                    onKeydown: function (node, event) {
                        // Eat keyboard events, when a menu is open

                    },
                    onDeactivate: function (node) {
                    },
                    strings: {
                        loading: "Loading…",
                        loadError: "Load error!"
                    },
                    onDblClick: function (node, event) {
                        node.select(true);
                        try {
                            inEventHandler = true;
                            node.visit(function (childNode) {
                                childNode.select(true);
                            });
                        } finally {
                            inEventHandler = false;
                        }
                    },
                    onPostInit: function (node, event) {
                        fnUserTreePostInit(node);
                    }
                });
                $("#dvAjaxLoad").hide();
                $("span.childIcon").unbind("click");
                //$("span.childIcon").live("click", function (e) {
                //    //alert("Edit " + $.ui.dynatree.getNode(e.target));
                //    fnShowChildNodes(e.target);
                //});
            }
        },
        error: function () {
            $('#' + treeId).unblock();
        },
        complete: function () {
            //$('#' + treeId).unblock();
        }
        //}
    });
}
function fnGetUserTreeByUserResigned(companyCode, userCode, FromDate, treeId, filterId) {
    debugger;
    //if (userCode == "") {
    //    userCode = currentUserCode_g;
    //}
    //if (userCode == curUserCode_g) {
    //    $('#dvPreviousNode').hide();
    //}
    //else {
    //    $('#dvPreviousNode').show();
    //}
    //$('#' + treeId).block({
    //    message: '<h3>Loading...</h3>',
    //    css: { border: '1px solid #ddd' }
    //});
    $.ajax({
        type: "POST",
        url: '../Tree/GetUserResignedTree',
        data: "Company_Code=" + companyCode + "&User_Code=" + userCode + "&FromDate=" + FromDate,
        success: function (jsData) {
            if (jsData != '') {
                debugger;
                // console.log(jsData);
                $('#' + filterId).hide();
                $("#" + treeId).show();
                strTree = jsData;
                $("#" + treeId).html(' ');
                $('#' + treeId).dynatree();
                $('#' + treeId).dynatree('destroy');
                $('#' + treeId).empty();
                $("#" + treeId).html(strTree);

                $("#" + treeId).dynatree({
                    checkbox: false,
                    onActivate: function (node) {
                        fnUserTreeNodeClick(node);
                    },
                    onClick: function (node, event) {
                        // Close menu on click
                        //if ($(event.target).hasClass("parent")) {
                        //    alert("You clicked " + node + ",  url=" + node.url);
                        //}
                        debugger;
                        chkUserClick(node);

                    },
                    onSelect: function (select, node) {
                        // Get a list of all selected nodes, and convert to a key array:
                        debugger;
                        fnUserTreeSelect(select, node);
                        if (!select) {
                            node.visit(function (node) {
                                node.select(false);
                            });
                        }
                        else {
                            node.visit(function (node) {
                                node.select(false);
                            });
                        }
                    },
                    onCreate: function (node, span) {
                        //bindUserContextMenu(span);
                    },
                    onKeydown: function (node, event) {
                        // Eat keyboard events, when a menu is open

                    },
                    onDeactivate: function (node) {
                    },
                    strings: {
                        loading: "Loading…",
                        loadError: "Load error!"
                    },
                    //onDblClick: function (node, event) {
                    //    node.select(true);
                    //    try {
                    //        inEventHandler = true;
                    //        node.visit(function (childNode) {
                    //            childNode.select(true);
                    //        });
                    //    } finally {
                    //        inEventHandler = false;
                    //    }
                    //},
                    onPostInit: function (node, event) {
                        fnUserTreePostInit(node);
                    }
                });
                $("#dvAjaxLoad").hide();
                $("span.childIcon").unbind("click");
                $("span.childIcon").live("click", function (e) {
                    //alert("Edit " + $.ui.dynatree.getNode(e.target));
                    fnShowChildNodes(e.target);
                });
            }
            else {
                $("#" + treeId).html('No Data Found');
            }
        },
        error: function () {
            $('#' + treeId).unblock();
        },
        complete: function () {
            $('#' + treeId).unblock();
        }
        //}
    });
}
function fnGetUserTreeByUserNew(userCode, treeId, filterId) {
    debugger;
    if (userCode == "") {
        userCode = currentUserCode_g;
    }
    if (userCode == curUserCode_g) {
        $('#dvPreviousNode').hide();
    }
    else {
        $('#dvPreviousNode').show();
    }
    $('#' + treeId).block({
        message: '<h3>Loading...</h3>',
        css: { border: '1px solid #ddd' }
    });
    $.ajax({
        type: "POST",
        url: 'Master/UserTreeGenerationByUserCode_New',
        data: "userCode=" + userCode + "&includeOneLevelParent=NO",
        success: function (jsData) {
            if (jsData != '') {
                $('#' + filterId).hide();
                $("#" + treeId).show();
                strTree = jsData;
                $("#" + treeId).html(' ');
                $('#' + treeId).dynatree('destroy');
                $('#' + treeId).empty();
                $("#" + treeId).html(strTree);

                $("#" + treeId).dynatree({
                    checkbox: false,
                    onActivate: function (node) {
                        fnUserTreeNodeClick(node);
                    },
                    onClick: function (node, event) {
                        // Close menu on click
                        //if ($(event.target).hasClass("parent")) {
                        //    alert("You clicked " + node + ",  url=" + node.url);
                        //}
                        if ($(".contextMenu:visible").length > 0) {
                            $(".contextMenu").hide();
                        }
                    },
                    //onLazyRead: function (node) {
                    //    // In real life we would call something like this:

                    //    // .. but here we use a local file instead:
                    //    //node.appendAjax({
                    //    //    url: "sample-data2.json",
                    //    //    // We don't want the next line in production code:
                    //    //    debugLazyDelay: 750
                    //    //});
                    //    fnAddNode(node);
                    //},
                    onCreate: function (node, span) {
                        bindUserContextMenu(span);
                    },
                    onKeydown: function (node, event) {
                        // Eat keyboard events, when a menu is open

                    },
                    onDeactivate: function (node) {
                    },
                    strings: {
                        loading: "Loading…",
                        loadError: "Load error!"
                    },
                    onDblClick: function (node, event) {
                        fnUserTreeNodeDblClick(node);
                    },
                    onPostInit: function (node, event) {
                        fnUserTreePostInit(node);
                    }
                });
                $("#dvAjaxLoad").hide();
                $("span.childIcon").unbind("click");
                $("span.childIcon").live("click", function (e) {
                    //alert("Edit " + $.ui.dynatree.getNode(e.target));
                    fnShowChildNodes(e.target);
                });
            }
        },
        error: function () {
            $('#' + treeId).unblock();
        },
        complete: function () {
            $('#' + treeId).unblock();
        }
        //}
    });
}

function fnExpandCollapseUserTree(treeExpandLevel, mainDivId, treeNavId, obj, mainReptId, treeId) {
    //leftNav
    $('#' + treeNavId).show();

    if (treeExpandLevel == 0) {
        $('#' + mainDivId).show();
        $(obj).removeAttr('title');
        $('#' + mainDivId).removeClass('col-xs-5');
        $('#' + mainDivId).addClass('col-xs-3');
        $('#' + treeId).show();
        $('#' + mainReptId).removeClass('col-xs-7');
        $('#' + mainReptId).addClass('col-xs-9');
        $("#spnTreeToggle").html('Hide Tree');
        treeExpandLevel = treeExpandLevel + 1;
        $(obj).attr('title', 'Click here to expand tree');
        $(obj).html('<i class="fa fa-chevron-circle-right fa-lg"></i>');
    }
    else if (treeExpandLevel == 1) {
        $('#' + mainDivId).show();
        $(obj).removeAttr('title');
        $('#' + mainDivId).removeClass('col-xs-3');
        $('#' + mainDivId).addClass('col-xs-4');
        $('#' + treeId).show();
        $('#' + mainReptId).removeClass('col-xs-9');
        $('#' + mainReptId).addClass('col-xs-8');
        $("#spnTreeToggle").html('Hide Tree');
        treeExpandLevel = treeExpandLevel + 1;
        $(obj).attr('title', 'Click here to expand tree');
        $(obj).html('<i class="fa fa-chevron-circle-right fa-lg"></i>');
    }
    else if (treeExpandLevel == 2) {
        $('#' + mainDivId).show();
        $(obj).removeAttr('title');

        $('#' + mainDivId).removeClass('col-xs-4');
        $('#' + mainDivId).addClass('col-xs-5');
        $('#' + treeId).show();
        $('#' + mainReptId).removeClass('col-xs-8');
        $('#' + mainReptId).addClass('col-xs-7');
        $("#spnTreeToggle").html('Hide Tree');
        treeExpandLevel = treeExpandLevel + 1;
        $(obj).html('<i class="fa fa-chevron-circle-left fa-lg"></i>');
        $(obj).attr('title', 'Click here to collapse tree');

    }
    else {
        $('#' + mainDivId).removeClass('col-xs-5');
        $('#' + mainDivId).removeClass('col-xs-4');
        $('#' + mainDivId).removeClass('col-xs-3');

        $('#' + treeId).hide();


        $('#' + mainReptId).removeClass('col-xs-7');
        $('#' + mainReptId).removeClass('col-xs-8');
        $('#' + mainReptId).removeClass('col-xs-9');
        $('#' + mainReptId).addClass('col-xs-11');
        $("#spnTreeToggle").html('Show Tree');

        $(obj).removeAttr('title');
        //  $('#' + mainDivId).hide();
        // $('#' + treeNavId).hide();
        $(obj).removeAttr('title');
        treeExpandLevel = -1;
        $(obj).html('<i class="fa fa-chevron-circle-right fa-lg"></i>');
        $(obj).attr('title', 'Click here to expand tree');
    }
}

function fnLoaduserDynaTree(userCode, treeId, filterId) {
    $.ajax({
        type: "POST",
        url: 'Master/GetUsersJson',
        data: "userCode=" + userCode + "&includeOneLevelParent=NO",
        success: function (jsData) {
            if (jsData != '') {
                $("#" + treeId).dynatree({
                    title: "Lazy loading sample",
                    fx: { height: "toggle", duration: 200 },
                    autoFocus: false, // Set focus to first child, when expanding or lazy-loading.
                    // In real life we would call a URL on the server like this:
                    //          initAjax: {
                    //              url: "/getTopLevelNodesAsJson",
                    //              data: { mode: "funnyMode" }
                    //              },
                    // .. but here we use a local file instead:
                    initAjax: {
                        url: jsData
                    },

                    onActivate: function (node) {
                        $("#echoActive").text("" + node + " (" + node.getKeyPath() + ")");
                    },

                    onLazyRead: function (node) {
                        // In real life we would call something like this:
                        //              node.appendAjax({
                        //                  url: "/getChildrenAsJson",
                        //                data: {key: node.data.key,
                        //                       mode: "funnyMode"
                        //                         }
                        //              });
                        // .. but here we use a local file instead:
                        node.appendAjax({
                            url: "sample-data2.json",
                            // We don't want the next line in production code:
                            debugLazyDelay: 750
                        });
                    }
                });
            }
        }
    });
}


function fnShowFullTree(userCode, treeId, filterNodeId, checkBoxNeeded) {
    if (checkBoxNeeded == "YES") {
        fnBindUserTreeWithCheckBoxDoubleClick(treeId);
    }
    else {
        // fnGetUserTreeByUser(treeId);
        // fnGetUserTreeByUser(userCode, treeId, filterNodeId);
        fnBindUserTree(treeId, filterNodeId);
    }
}

function fnShowFullTreeNew(userCode, treeId, filterNodeId, checkBoxNeeded) {
    if (checkBoxNeeded == "YES") {
        fnBindUserTreeWithCheckBoxDoubleClickNew(treeId);
    }
    else {
        // fnGetUserTreeByUser(treeId);
        // fnGetUserTreeByUser(userCode, treeId, filterNodeId);
        fnBindUserTreeNew(treeId, filterNodeId);
    }
}

function fnShowFullTreeWithChecked(treeId, checkBoxNeeded) {
    if (checkBoxNeeded) {
        fnBindUserTreeWithCheckBoxDoubleClick(treeId);
    }
    else {
        fnBindUserTree(treeId);
    }
}

///////*********** checkbox tree *********************///////
function fnGetUserTreeByUserWithCheckBox(userCode, treeId, filterId) {
    debugger;
    if (userCode == "") {
        userCode = currentUserCode_g;
    }
    $('span').removeClass('childIcon');
    //if (userCode == curUserCode_g) {
    //    $('#dvPreviousNode').hide();
    //}
    //else {
    //    $('#dvPreviousNode').show();
    //}
    $('#' + treeId).block({
        message: '<h3>Loading...</h3>',
        css: { border: '1px solid #ddd' }
    });
    $.ajax({
        type: "POST",
        url: 'Master/UserTreeGenerationByUserCode',
        data: "userCode=" + userCode + "&includeOneLevelParent=NO",
        success: function (jsData) {
            if (jsData != '') {
                $('#' + filterId).hide();
                $("#" + treeId).show();
                $("#" + treeId).html(' ');
                $('#' + treeId).dynatree('destroy');
                $('#' + treeId).empty();
                $("#" + treeId).html(jsData);

                $("#" + treeId).dynatree({
                    checkbox: true,
                    onActivate: function (node) {
                        fnUserTreeNodeClick(node);
                    },
                    onClick: function (node, event) {
                        // Close menu on click
                        //if ($(event.target).hasClass("parent")) {
                        //    alert("You clicked " + node + ",  url=" + node.url);
                        //}
                        if ($(".contextMenu:visible").length > 0) {
                            $(".contextMenu").hide();
                        }
                    },
                    onCreate: function (node, span) {
                        bindUserContextMenu(span);
                    },
                    onKeydown: function (node, event) {
                        // Eat keyboard events, when a menu is open

                    },
                    onDeactivate: function (node) {
                    },
                    strings: {
                        loading: "Loading…",
                        loadError: "Load error!"
                    },
                    onSelect: function (select, node) {
                        // Get a list of all selected nodes, and convert to a key array:
                        fnUserTreeSelect(select, node);
                        if (!select) {
                            node.visit(function (node) {
                                node.select(true);
                            });
                        }
                        else {
                            node.visit(function (node) {
                                node.select(false);
                            });
                        }
                    },
                    onDblClick: function (node, event) {
                        node.select(true);
                        try {
                            inEventHandler = true;
                            node.visit(function (childNode) {
                                childNode.select(true);
                            });
                        } finally {
                            inEventHandler = false;
                        }
                        // fnAddNode(node);
                        fnUserTreeNodeDblClick(node);
                    },
                    onPostInit: function (node, event) {
                        fnUserTreePostInit(node);
                    }
                });
                $("#dvAjaxLoad").hide();
                $("span.childIcon").unbind("click");
                $("span.childIcon").bind("click", function (e) {
                    //alert("Edit " + $.ui.dynatree.getNode(e.target));
                    //fnShowChildNodes(e.target);
                    e.preventDefault();
                    fnAddNode(e);
                    return false;
                });
            }
        },
        error: function () {
            $('#' + treeId).unblock();
        },
        complete: function () {
            $('#' + treeId).unblock();
        }
        //}
    });
}

function fnAddNode(obj) {
    var node = $.ui.dynatree.getNode(obj.target);
    if (!node.hasChildren()) {
        var code = $.ui.dynatree.getNode(obj.target).data.key;
        $.ajax({
            type: "POST",
            url: 'Master/GetImmediateChildUsers',
            data: "userCode=" + code,
            success: function (jsData) {
                if (jsData != '') {
                    var jsonFormat = "[";
                    for (var i = 0; i < jsData.length; i++) {
                        var userDetails = jsData[i].User_Name + "," + jsData[i].User_Type_Name + '(' + jsData[i].Region_Name + ')';

                        if (jsData[i].Child_User_Count > 1) {
                            jsonFormat += "{title:" + '"' + "" + userDetails + "" + '",'
                                           + "key:" + '"' + "" + jsData[i].User_Code + "" + '",'
                                           + "addClass:" + '"' + "childIcon" + '"' + "}";
                        }
                        else {
                            jsonFormat += "{title:" + '"' + "" + userDetails + "" + '",' + "key:" + '"' + "" + jsData[i].User_Code + "" + '"' + "}";
                        }
                        if (i < jsData.length - 1) {
                            jsonFormat += ",";
                        }
                    }
                    jsonFormat += "];";
                    var treeJson = eval(jsonFormat);
                    if (treeJson != null) {
                        node.addChild(treeJson);
                    }
                    node.expand();
                    $("span.childIcon").unbind("click");
                    $("span.childIcon").bind("click", function (e) {
                        e.preventDefault();
                        fnAddNode(e);
                        return false;
                    });

                }

            }
        });
    }
    return false;
}
function fnBindAllUserTreeWithCheckBox(id, isChecked) {
    // $.blockUI();
    // $("#dvAjaxLoad").show();
    $.ajax({
        type: "POST",
        url: 'Master/GenerateUserTree',
        data: "A",
        success: function (jsData) {
            if (jsData != '') {
                strTree = jsData;
                $("#" + id).html(' ');
                $('#' + id).dynatree('destroy');
                $('#' + id).empty();
                $("#" + id).html(strTree);

                $("#" + id).dynatree({
                    checkbox: true,
                    onActivate: function (node) {
                        fnUserTreeNodeClick(node);
                    },
                    onClick: function (node, event) {
                        // Close menu on click
                        if ($(".contextMenu:visible").length > 0) {
                            $(".contextMenu").hide();
                        }
                    },
                    onCreate: function (node, span) {
                        bindUserContextMenu(span);
                    },
                    onSelect: function (select, node) {
                        // Get a list of all selected nodes, and convert to a key array:
                        fnUserTreeSelect(select, node);
                        if (!select) {
                            node.visit(function (node) {
                                node.select(false);
                            });
                        }
                        else {
                            node.visit(function (node) {
                                node.select(false);
                            });
                        }
                    },
                    onKeydown: function (node, event) {
                        // Eat keyboard events, when a menu is open

                    },
                    onDeactivate: function (node) {
                    },
                    strings: {
                        loading: "Loading…",
                        loadError: "Load error!"
                    },
                    onDblClick: function (node, event) {
                        fnUserTreeNodeDblClick(node);
                    },
                    onPostInit: function (node, event) {
                        fnUserTreePostInit(node, isChecked, id);
                    }
                });
                $("#dvAjaxLoad").hide();
            }
        },
        error: function () {
        },
        complete: function () {
        }
    });
}

function fnGetUsersByUserNameWithCheckBox(userName, treeId, filterId) {
    $.ajax({
        type: "POST",
        url: 'Master/GetUsersByUserNameWithCheckBox',
        data: "userName=" + userName + "&treeId=" + treeId + "&filterId=" + filterId + "",
        success: function (result) {
            if (result != "") {
                $('#dvFilteredNode').html(result);
                $('#' + treeId).hide();
                $('#' + filterId).show();

            }
            else {
                fnGetUserTreeByUserWithCheckBox("", "dvUserTree", filterId);
                $('#' + treeId).show();
                $('#' + filterId).hide();
            }
        },
        error: function () {
        },
        complete: function () {
        }
    });
}
///////*********** check box tree end ***************///////


//////***********Start - Tree Without Checkbox - New********//////
//Tree Position
function fnTreePosiition(id) {
    var tblContent = "";
    tblContent += "<div id='treeNav'>";
    tblContent += "<div id='dvNodeSearch'>";
    //tblContent += "<div class='input-group'>";
    //tblContent += "<input type='text' id='txtSearchNode' placeholder='Search' class='form-control'/>";
    //tblContent += "<span class='input-group-addon' onclick=fnSearchUsers('"+treetype+"');><i class='fa fa-search'></i></span></div>";
    //tblContent += "<span onclick='fnShowFullTreeClick();' id='dvFullTree' class='pull-right' style='margin-right: 4%;cursor:pointer;' title='Click here to show all users'><i class='fa fa-th-list fa-2'></i></span>";
    tblContent += "<span onclick='fnLoadInitialTree();' id='dvLoadTree' class='pull-right' style='display: none; margin-right: 4%;cursor:pointer;' title='Click here to show all users' ><i class='fa fa-th-list fa-2'></i></span>";
    tblContent += "<div class='clearfix'></div></div>";
    tblContent += "<div id='dvFilteredNode' class='dvFilteredNode' style='display: none;'></div>";
    tblContent += "<div id='dvMainTree'>";
    tblContent += "<div id='dvPreviousNode' class='dvPreviousNode' onclick='fnBindUsersWithOneLevelParent();'>";
    tblContent += "<i class='fa fa-arrow-up '></i></div>";
    tblContent += "<div id='dvUserTree' class='dvNewUserTree'><img src='../Content/images/load.gif'/>Loading tree</div>";
    tblContent += "<div class='clearfix'></div>";
    tblContent += "</div></div>";
    $('#' + id).html('');
    $('#' + id).html(tblContent);
}
function fnTreePositionSearch(id, treetype) {
    var tblContent = "";
    tblContent += "<div id='treeNav'>";
    tblContent += "<div id='dvNodeSearch'>";
    tblContent += "<div class='input-group' id='search'>";
    tblContent += "<input type='text' id='txtSearchNode' placeholder='Search' class='form-control' autocomplete='off'/>";
    tblContent += "<span class='input-group-addon' onclick=fnSearchUsers('" + treetype + "');><i class='fa fa-search'></i></span></div>";
    //tblContent += "<span onclick='fnShowFullTreeClick();' id='dvFullTree' class='pull-right' style='margin-right: 4%;cursor:pointer;' title='Click here to show all users'><i class='fa fa-th-list fa-2'></i></span>";
    tblContent += "<span onclick='fnLoadInitialTree();' id='dvLoadTree' class='pull-right' style='display: none; margin-right: 4%;cursor:pointer;' title='Click here to show all users' ><i class='fa fa-th-list fa-2'></i></span>";
    tblContent += "<div class='clearfix'></div></div>";
    tblContent += "<div id='dvFilteredNode' class='dvFilteredNode' style='display: none;'></div>";
    tblContent += "<div id='dvMainTree'>";
    tblContent += "<div id='dvPreviousNode' class='dvPreviousNode' onclick='fnBindUsersWithOneLevelParent();'>";
    tblContent += "<i class='fa fa-arrow-up '></i></div>";
    tblContent += "<div id='dvUserTree' class='dvNewUserTree'><img src='../Content/images/load.gif'/>Loading tree</div>";
    tblContent += "<div class='clearfix'></div>";
    tblContent += "</div></div>";
    $('#' + id).html(tblContent);
}
function fnTreePosiitionNew(id) {
    debugger;
    var tblContent = "";
    tblContent += "<div id='treeNav'>";
    tblContent += "<div id='dvNodeSearch'>";
    tblContent += "<div class='input-group col-xs-8'>";
    //tblContent += "<input type='text' id='txtSearchNode' placeholder='Search' class='form-control'/>";
    //tblContent += "<span class='input-group-addon' onclick='fnSearchUsersNew();'><i class='fa fa-search'></i></span></div>";
    //tblContent += "<span onclick='fnShowFullTreeClickNew();' id='dvFullTree' class='pull-right' style='margin-right: 4%;cursor:pointer;' title='Click here to show all users'><i class='fa fa-th-list fa-2'></i></span>";
    tblContent += "<span onclick='fnLoadInitialTreeNew();' id='dvLoadTree' class='pull-right' style='display: none; margin-right: 4%;cursor:pointer;' title='Click here to show all users' ><i class='fa fa-th-list fa-2'></i></span>";
    tblContent += "<div class='clearfix'></div></div>";
    tblContent += "<div id='dvFilteredNode' class='dvFilteredNode' style='display: none;'></div>";
    tblContent += "<div id='dvMainTree'>";
    tblContent += "<div id='dvPreviousNode' class='dvPreviousNode' onclick='fnBindUsersWithOneLevelParentNew();'>";
    tblContent += "<i class='fa fa-arrow-up '></i></div>";
    tblContent += "<div id='dvUserTree' class='dvNewUserTree'><img src='../Areas/HiDoctor_Activity/Content/images/Web/hd/load.gif'/>Loading tree</div>";
    tblContent += "<div class='clearfix'></div>";
    tblContent += "</div></div>";
    $('#' + id).html(tblContent);
}

function fnSearchUsers(treetype) {
    debugger;
    if (treetype == 'Normal') {
        if ($.trim($('#txtSearchNode').val()) == '') {
            fnGetUserTreeByUser(TreeUserCode, "dvUserTree", "dvFilteredNode");
        }
        else {
            fnGetUsersByUserName($('#txtSearchNode').val(), "dvUserTree", "dvFilteredNode");
        }
    }
    else {
        if ($.trim($('#txtSearchNode').val()) == '') {
            fnGetUserTreeByUserCheckBox(TreeUserCode, "dvUserTree", "dvFilteredNode");
        }
        else {
            GetCheckUsersByUserName($('#txtSearchNode').val(), "dvUserTree", "dvFilteredNode");
        }
    }
}

function fnBindUsersWithOneLevelParent() {
    var userCode = $("#dvUserTree").dynatree("getTree").tnRoot.childList[0].data.key;
    fnGetUserTreeByUserWithOnelevelParent(userCode, "dvUserTree", "dvFilteredNode");
}



function fnShowChildNodes(obj) {
    //  alert($.ui.dynatree.getNode(obj).data.key);
    fnGetUserTreeByUserWithOnelevelParent($.ui.dynatree.getNode(obj).data.key, "dvUserTree", "dvFilteredNode");
}

function fnSearchUsersNew() {
    debugger;
    if ($.trim($('#txtSearchNode').val()) == '') {
        fnGetUserTreeByUserNew(currentUserCode_g, "dvUserTree", "dvFilteredNode");
    }
    else {
        fnGetUsersByUserNameEmployeeName($('#txtSearchNode').val(), "dvUserTree", "dvFilteredNode");
    }
}


function fnBindUsersWithOneLevelParentNew() {
    debugger;
    var userCode = $("#dvUserTree").dynatree("getTree").tnRoot.childList[0].data.key;
    fnGetUserTreeByUserWithOnelevelParentNew(userCode, "dvUserTree", "dvFilteredNode");
}

function fnShowChildNodesNew(obj) {
    debugger;
    //  alert($.ui.dynatree.getNode(obj).data.key);
    fnGetUserTreeByUserWithOnelevelParentNew($.ui.dynatree.getNode(obj).data.key, "dvUserTree", "dvFilteredNode");
}

function fnShowFullTreeClick() {
    debugger;
    $('#dvPreviousNode').hide();
    $('#dvFullTree').hide();
    $('#dvLoadTree').show();
    $('#dvLoadTree').attr("title", "Click here to show users");
    fnShowFullTree(currentUserCode_g, "dvUserTree", "dvFilteredNode", "NO");
}
function fnLoadInitialTree() {
    debugger;
    $('#dvFullTree').show();
    $('#dvLoadTree').hide();
    $('#dvFullTree').attr("title", "Click here to show all users");
    fnGetUserTreeByUser(currentUserCode_g, "dvUserTree", "dvFilteredNode");
}

function fnShowFullTreeClickNew() {
    debugger;
    $('#dvPreviousNode').hide();
    $('#dvFullTree').hide();
    $('#dvLoadTree').show();
    $('#dvLoadTree').attr("title", "Click here to show users");
    fnShowFullTreeNew(currentUserCode_g, "dvUserTree", "dvFilteredNode", "NO");
}
function fnLoadInitialTreeNew() {
    debugger;
    $('#dvFullTree').show();
    $('#dvLoadTree').hide();
    $('#dvFullTree').attr("title", "Click here to show all users");
    fnGetUserTreeByUserNew(currentUserCode_g, "dvUserTree", "dvFilteredNode");
}
//////***********End - Tree Withour Checkbox - New********////////
/// ************* Power Tree ************* ///
var divpower = '';
var PowerTree = '';
var treeSection = '';
var TreeUserCode = '';
function fngetUserpowertree(User_Code, tree, treediv, filter) {
    debugger;
    divpower = treediv;
    treeSection = tree;
    var Type = "User";
    TreeUserCode = User_Code;
    $.ajax({
        type: "POST",
        //async: false,
        url: '../Tree/fngetpowertree',
        data: "UserCode=" + User_Code + "&Type=" + Type,
        success: function (json) {
            debugger;
            PowerTree = json;
            if (PowerTree == '') {
                fnTreePositionSearch(treeSection, 'Check');
                fnGetUserTreeByUserCheckBox(User_Code, treediv, filter);
            }
            else {
                fnUserTreeBootBox(PowerTree, User_Code, treeSection, treediv, filter);
            }
        },
        error: function () {

        }

    })
}
function fnUserTreeBootBox(PowerTree, User_Code, treename, treediv, filter) {
    debugger;
    var Content = '';
    Content += ' <div class="col-lg-6 panel panel-default"><div class="panel-body"><form class="form-inline" role="form">';
    Content += '<div class="col-lg-5"><label>OBO Type:</label>';
    Content += '<input type="radio" style="margin-left: 17px;" id="self" value="Self" name="PT" checked="checked" onclick=fnselfUser("' + User_Code + '")>';
    Content += ' <label>Self</label>';
    Content += ' <input type="radio" style="margin-left: 17px;" id="OBO" value="OBO User" name="PT" onclick=fnOBOUser()>';
    Content += '  <label>OBO</label></div>';
    Content += '  <div id="OBODropdown" class="col-lg-7"></div>';
    Content += '</form></div></div>';
    $('#powerdiv').html(Content);
    fnTreePositionSearch(treeSection, 'Check');
    fnGetUserTreeByUserCheckBox(User_Code, divpower, "dvFilteredNode");
}
function fnselfUser(User_Code) {
    debugger;
    $('#OBODropdown').hide();

    fnTreePositionSearch(treeSection, 'Check');
    fnGetUserTreeByUserCheckBox(User_Code, divpower, "dvFilteredNode");
}
function fnOBOUser() {
    debugger;
    $('#OBODropdown').show();
    var content = '<label>Select User Reference:</label>';
    content += '<select id="PDrop" style=" width: 130px !important;height: 34px !important;margin-left: 17px;" class="form-control" onchange="fngetpowertreeUser()">';
    content += '<option value="0">--Select--</option>';
    for (var i = 0; i < PowerTree.length; i++) {

        content += '<option value=' + PowerTree[i].Tree_Code + '>' + PowerTree[i].Tree_Name + '</option>';
    }
    content += '</select>';
    $('#OBODropdown').html(content);

}
function fngetpowertreeUser() {
    var Use = $('#PDrop').val();
    if (Use == '0')
    {
        fnTreePositionSearch(treeSection, 'Check');
        fnGetUserTreeByUserCheckBox(TreeUserCode, divpower, "dvFilteredNode");
    }
    else
    {
        fnTreePositionSearch(treeSection, 'Check');
        fnGetUserTreeByUserCheckBox(Use, divpower, "dvFilteredNode");
    }
  
}

/////////////With Out check Box
function fngetUserTreepowertree(User_Code, tree, treediv, filter) {
    debugger;
    divpower = treediv;
    treeSection = tree;
    var Type = "User";
    TreeUserCode = User_Code;
    $.ajax({
        type: "POST",
        //async: false,
        url: '../Tree/fngetpowertree',
        data: "UserCode=" + User_Code + "&Type=" + Type,
        success: function (json) {
            debugger;
            PowerTree = json;
            if (PowerTree == '') {
                fnTreePositionSearch(treeSection, 'Normal');
                fnGetUserTreeByUser(User_Code, treediv, "dvFilteredNode");
            }
            else {
                fnUserTreeBind(PowerTree, User_Code, treeSection, treediv, filter);
            }
        },
        error: function () {

        }

    })
}
function fnUserTreeBind(PowerTree, User_Code, treename, treediv, filter) {
    debugger;
    var Content = '';
    Content += ' <div class="col-lg-6 panel panel-default"><div class="panel-body"><form class="form-inline" role="form">';
    Content += '<div class="col-lg-5"><label>OBO Type:</label>';
    Content += '<input type="radio" style="margin-left: 17px;" id="self" value="Self" name="PT" checked="checked" onclick=fnselfUserTree("' + User_Code + '")>';
    Content += ' <label>Self</label>';
    Content += ' <input type="radio" style="margin-left: 17px;" id="OBO" value="OBO User" name="PT" onclick=fnOBOUserTree()>';
    Content += '  <label>OBO</label></div>';
    Content += '  <div id="OBODropdown" class="col-lg-7"></div>';
    Content += '</form></div></div>';
    $('#powerdiv').html(Content);
    fnTreePositionSearch(treeSection, 'Normal');
    fnGetUserTreeByUser(User_Code, divpower, "dvFilteredNode");
}
function fnselfUserTree(User_Code) {
    debugger;
    $('#OBODropdown').hide();

    fnTreePositionSearch(treeSection, 'Normal');
    fnGetUserTreeByUser(User_Code, divpower, "dvFilteredNode");
}
function fnOBOUserTree() {
    debugger;
    $('#OBODropdown').show();
    var content = '<label>Select User Reference:</label>';
    content += '<select id="PDrop" style=" width: 130px !important;height: 34px !important;margin-left: 17px; display: inline-block !important;" class="form-control" onchange="fngetpowerUserTree()">';
    content += '<option value="0">--Select--</option>';
    for (var i = 0; i < PowerTree.length; i++) {

        content += '<option value=' + PowerTree[i].Tree_Code + '>' + PowerTree[i].Tree_Name + '</option>';
    }
    content += '</select>';
    $('#OBODropdown').html(content);

}
function fngetpowerUserTree() {
    var Use = $('#PDrop').val();
    if (Use == '0')
    {
        fnTreePositionSearch(treeSection, 'Normal');
        fnGetUserTreeByUser(TreeUserCode, divpower, "dvFilteredNode");
    }
    else
    {
        fnTreePositionSearch(treeSection, 'Normal');
        fnGetUserTreeByUser(Use, divpower, "dvFilteredNode");
    }
   
}