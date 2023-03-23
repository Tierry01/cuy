define(["dojo/_base/declare",
        "alfresco/core/Core",
        "dojo/_base/lang",
        "alfresco/core/CoreXhr",
        "service/constants/Default",
        "dojo/json"
    ],
    function(declare, Core, lang, CoreXhr, AlfConstants, JSON) {
        return declare([Core, CoreXhr], {
            constructor: function cuy_widgets_Init__constructor(args) {
                lang.mixin(this, args);
                var fetchRoles = lang.hitch(this, this.getRoles);
                fetchRoles();
              },
            getRoles: function cuy_widgets_Init__getRoles() {
                this.serviceXhr({
                    url: AlfConstants.PROXY_URI + "cuy/api/authorit/roles",
                    method: "GET",
                    successCallback: this.onSuccess,
                    callbackScope: this
                });
            },
            onSuccess: function cuy_widgets_Init__onSuccess(response, originalRequestConfig) {

                console.log('Here is my response', response);
                localStorage.setItem("user_roles", JSON.stringify(response));
                location.href="/share/page/dp/ws/home";
            }
        });
});
