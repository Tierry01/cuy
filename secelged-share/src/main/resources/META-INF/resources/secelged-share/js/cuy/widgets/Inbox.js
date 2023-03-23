define(["dojo/_base/declare",
        "dijit/_WidgetBase",
        "alfresco/core/Core",
        "dijit/_TemplatedMixin",
        "dojo/json",
        "dojo/dom",
        "dojo/dom-style",
        "dojo/text!./templates/Inbox.html"
    ],
    function (declare, _Widget, Core, _Templated, JSON, dom, domStyle, template) {
        return declare([_Widget, Core, _Templated], {
            userRoles: [],
            templateString: template,
            cssRequirements: [{
                    cssFile: "./css/all.css"
                },
                {
                    cssFile: "./css/style.css"
                },
                {
                    cssFile: "./css/bootstrap.min.css"
                },
                {
                    cssFile: "./css/jquery.dataTables.min.css"
                }
            ],
            buildRendering: function cuy_widgets_HomeWidget__buildRendering() {
                this.inherited(arguments);
            },

            postCreate: function cuy_widgets_HomeWidget__postCreate() {
                console.log('USER GROUPS ===', this.userRoles);
                var gec = dom.byId("GEC");
                var gec2 = dom.byId("GEC2");
                var ged = dom.byId("GED");
                var ged2 = dom.byId("GED2");
                var sae = dom.byId("SAE");
                var sae2 = dom.byId("SAE2");
                var admin = dom.byId("ADMIN");
                var admin2 = dom.byId("ADMIN2");
                var stat = dom.byId("STAT");
                var param = dom.byId("PARAM");


                if (!this.userRoles.includes("GEC")) {
                    domStyle.set(gec, "display", "none");
                    domStyle.set(gec2, "display", "none");
                }

                if (!this.userRoles.includes("GED")) {
                    domStyle.set(ged, "display", "none");
                    domStyle.set(ged2, "display", "none");
                }

                if (!this.userRoles.includes("SAE")) {
                    domStyle.set(sae, "display", "none");
                    domStyle.set(sae2, "display", "none");
                }

                if (!this.userRoles.includes("ADMIN")) {
                    domStyle.set(admin, "display", "none");
                    domStyle.set(admin2, "display", "none");
                    domStyle.set(stat, "display", "none");
                    domStyle.set(param, "display", "none");
                }

                $(".js-follow-bar").on("click", function () {
                    $(".js-follow-bar").addClass("onon");
                    $(".js-follow-bar input").focus();
                })
                $(".js-follow").on("click", function () {
                    $(".js-follow").addClass("onok");
                    $(".first").focus();
                })
                $(".block-header .admin-button span").on("click", function () {
                    $(".sm").toggleClass("on");
                })
                $(".js-button-menu").on("click", function () {
                    $("aside").toggleClass("show");
                })
                $(".js-close").on("click", function (e) {
                    e.stopPropagation();
                    $(".js-follow").removeClass("onok");
                })
                $(".js-follow-bar input").focusout(function () {
                    if ($(".js-follow-bar input").val() == '') {
                        $(".js-follow-bar").removeClass("onon");
                    }
                })
                $(document).ready(function () {
                    $.noConflict();
                    $('#dtBasicExample').DataTable();
                    $('.dataTables_length').addClass('bs-select');
                });
            }
        });
    });