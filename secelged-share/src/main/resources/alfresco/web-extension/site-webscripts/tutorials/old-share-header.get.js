
// Find the admin menu - it'll only be present if the current user is Admin...
var adminMenu = widgetUtils.findObject(model.jsonModel, "id", "HEADER_ADMIN_CONSOLE");
if (adminMenu != null)
{
   // Change the widget to a menu bar popup
   adminMenu.name = "alfresco/header/AlfMenuBarPopup";
       
   // Remove the targetUrl attribute - this isn't strictly necessary but is "cleaner"
   delete adminMenu.config.targetUrl;
       
   // Add a new "widgets" array to the configuration...
   adminMenu.config.widgets = [
      {   
         name: "alfresco/menus/AlfMenuGroup",
         config: {
            label: "Users and Groups", 
            widgets: [
               {
                  name: "alfresco/header/AlfMenuItem",
                  config:
                  {
                     label: "Groups",
                     targetUrl: "console/admin-console/groups"
                  }
               },
               {
                  name: "alfresco/header/AlfMenuItem",
                  config:
                  {
                     label: "Users",
                     targetUrl: "console/admin-console/users"
                  }
               },
               {
                  name: "alfresco/header/AlfMenuItem",
                  config:
                  {
                     label: "Gestionnaire de sites",
                     targetUrl: "console/admin-console/manage-sites"
                  }
               }
            ]
         }
      }
   ];
}

var headerGec = widgetUtils.findObject(model.jsonModel, "id", "HEADER_MY_FILES");
if (headerGec != null) {
    headerGec.config.label = "GEC";
    headerGec.config.targetUrl = "#";
    headerGec.config.targetUrlType ="FULL_PATH";
}
var headerGed = widgetUtils.findObject(model.jsonModel, "id", "HEADER_SHARED_FILES");
if (headerGed != null) {
    headerGed.config.label = "GED";
    headerGed.config.targetUrl = " /share/page/myfiles";
    headerGed.config.targetUrlType ="FULL_PATH";
}
var headerSae = widgetUtils.findObject(model.jsonModel, "id", "HEADER_SITES_MENU");
if (headerSae != null) {
    // Change the widget to a menu bar popup
    headerSae.name = "alfresco/header/AlfMenuBarPopup";
    delete headerSae.config.targetUrl;
    headerSae.config.showRecentSites = false;
       
    // Remove the targetUrl attribute - this isn't strictly necessary but is "cleaner"
    
/*    headerSae.config.label = "SAE";
    headerSae.config.widgets.push({
      name: "alfresco/header/AlfMenuItem",
      config:
      {
         label: "Site des Archives",
         targetUrl: " /share/page/site/rm/documentlibrary",
         targetUrlType: "FULL_PATH"
      }
    });

    headerSae.config.widgets.push({
      name: "alfresco/header/AlfMenuItem",
      config:
      {
         label: "Consultation d'archives",
         targetUrl: " /#/consultation/archive",
         targetUrlType: "FULL_PATH"
      }
   });
*/  
  var createSiteLabel = "create-site.label";
  headerSae.config.widgets = [
      {
         name: "alfresco/menus/AlfMenuGroup",
         config: {
            label: "", 
            widgets: [
               {
                  name: "alfresco/header/AlfMenuItem",
                  config:
                  {
                     label: "Site des Archives",
                     targetUrl: " /share/page/site/rm/documentlibrary",
                     targetUrlType: "FULL_PATH"
                  }
               },
               {
                  name: "alfresco/header/AlfMenuItem",
                  config:
                  {
                     label: "Consultation d'archives",
                     targetUrl: " /#/consultation/archive",
                     targetUrlType: "FULL_PATH"
                  }
               },
                {
                  name: "alfresco/header/AlfMenuItem",
                  config: {
                     id: "HEADER_SITES_MENU_CREATE_SITE",
                     label: "Créer un site",
                     publishTopic: "ALF_CREATE_SITE"
                  }
               }
            ]
         }
      }
    ];
}
// widgetUtils.deleteObjectFromArray(model.jsonModel, "id", "HEADER_MY_FILES");
widgetUtils.deleteObjectFromArray(model.jsonModel.widgets, "id", "HEADER_PEOPLE");
widgetUtils.deleteObjectFromArray(model.jsonModel.widgets, "id", "HEADER_TASKS");
widgetUtils.deleteObjectFromArray(model.jsonModel, "id", "HEADER_REPOSITORY");
// widgetUtils.deleteObjectFromArray(model.jsonModel, "id", "HEADER_SHARED_FILES");
widgetUtils.deleteObjectFromArray(model.jsonModel, "id", "HEADER_SITE_DASHBOARD");

var headerHome = widgetUtils.findObject(model.jsonModel, "id", "HEADER_HOME");
if (headerHome != null) {

   headerHome.config.label = "Accueil";
   headerHome.config.targetUrl = " /share/page/myfiles";
   headerHome.config.targetUrlType ="FULL_PATH";
} 

// widgetUtils.findObject(model.jsonModel.widgets, "id", "HEADER_USER_MENU_POPUP");

/* var headerUserMenu = widgetUtils.findObject(model.jsonModel, "id", "HEADER_USER_MENU");
if (headerUserMenu != null)
{
   // Change the widget to a menu bar popup
  // headerUserMenu = "alfresco/header/AlfMenuBarPopup";
       
   // Remove the targetUrl attribute - this isn't strictly necessary but is "cleaner"
   delete headerUserMenu.config.targetUrl;
       
   // Add a new "widgets" array to the configuration...
   headerUserMenu.config.widgets = [
      {   
         name: "alfresco/menus/AlfMenuGroup",
         config: {
            label: "", 
            widgets: [
               {
                  name: "alfresco/header/AlfMenuItem",
                  config:
                  {
                     label: "Paramètres",
                     targetUrl: " /#/parametres",
                     targetUrlType: "FULL_PATH"
                  }
               },
               {
                  name: "alfresco/header/AlfMenuItem",
                  config:
                  {
                     label: "Deconnexion",
                     targetUrl: " /",
                     targetUrlType: "FULL_PATH"
                  }
               }
            ]
         }
      }
   ];
} */
