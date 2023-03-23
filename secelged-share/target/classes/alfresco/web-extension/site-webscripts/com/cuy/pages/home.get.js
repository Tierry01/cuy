
var roles = null;
var connector = remote.connect("alfresco");
var json = connector.get("/cuy/api/authorit/roles");
if (json.status == 200)
{
   roles = JSON.parse(json);
}

model.jsonModel = {
  services: [{
    name: "alfresco/services/LoggingService",
    config: {
      loggingPreferences: {
        enabled: true,
        all: true
      }
    }
  }],

  widgets: [
      {
         id: "DEMO_SIMPLE_MSG",
         name: "cuy/widgets/Home",
         config: {
          userRoles: roles
         }
     }
  ]
};