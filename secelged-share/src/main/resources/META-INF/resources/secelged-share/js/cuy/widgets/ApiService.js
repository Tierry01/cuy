define(["dojo/_base/declare",
        "alfresco/services/BaseService",
        "alfresco/core/CoreXhr",
        "service/constants/Default",
        "alfresco/core/PathUtils",
        "alfresco/enums/urlTypes",
        "dojo/_base/lang",
        "dojo/_base/array",
        "alfresco/util/hashUtils"],
    function(declare, BaseService, CoreXhr, AlfConstants, PathUtils, urlTypes, lang, array, hashUtils) {

        return declare([BaseService, CoreXhr, PathUtils], {

            constructor: function alfresco_services_BaseService__constructor(args) {
                this.alfSubscribe("EXPORT_SEARCH_RESULTS_SERVICE", lang.hitch(this, this.onAction));
            },
            onAction: function facetedsearch_DocumentService_onAction(payload) {

               //  hashUtils.getHash() - IT CONTAINS YOUR SEARCH PARAMETERS
               // query - scope - searchTerm
                console.log(hashUtils.getHash());

                this.serviceXhr({
                    url: AlfConstants.PROXY_URI + "/api/YOUR_WEBSCRIPT_AND_SEARCH_PARAMS",
                    method: "GET",
                    successCallback: this.onSuccess,
                    callbackScope: this
                });

            },
            onSuccess: function facetedsearch_DocumentService_onSuccess(response, originalRequestConfig) {

                //Alfresco.util.PopupManager.displayMessage({ title: this.message("export.search.result"), text: this.message("export.search.result.ok")});
            },
            onFailure: function facetedsearch_DocumentService_onFailure(response, originalRequestConfig) {

                //Alfresco.util.PopupManager.displayMessage({ title: this.message("export.search.result"), text: this.message("export.search.result.no")});
            }
        })
    }
);