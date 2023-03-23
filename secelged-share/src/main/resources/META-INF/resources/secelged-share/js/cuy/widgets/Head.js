define(["dojo/_base/declare",
        "dijit/_WidgetBase",
        "alfresco/core/Core",
        "dijit/_TemplatedMixin",
        "dojo/json",
        "dojo/dom",
        "dojo/dom-style",
        "dojo/text!./templates/head.html",
    ],
    function(declare, _Widget, Core, _Templated, JSON, dom, domStyle, template) {
        return declare([_Widget, Core, _Templated], {
            userRoles:[],
            templateString: template,
            i18nRequirements: [ {i18nFile: "./i18n/home.properties"} ],
            cssRequirements: [
                {cssFile:"./css/all.css"},
                {cssFile:"./css/style.css"}
            ],
            buildRendering: function cuy_widgets_HomeWidget__buildRendering() {
                this.inherited(arguments);
            }
        });
});
