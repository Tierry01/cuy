package com.secel;

import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.Map;
import java.util.Set;

import org.alfresco.service.cmr.security.AuthorityService;
import org.alfresco.service.cmr.security.AuthorityType;
import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.extensions.webscripts.DeclarativeWebScript;
import org.springframework.extensions.webscripts.Status;
import org.springframework.extensions.webscripts.WebScriptRequest;

public class AttributeRolesToUser extends DeclarativeWebScript {

	private AuthorityService authorityService;

	@Override
    protected Map<String, Object> executeImpl(WebScriptRequest req,
            Status status) {

		Map<String, Object> model = new HashMap<String, Object>();

		Map<String, String> authorities = new LinkedHashMap<String, String>();

		String siteId = null;

		JSONArray roles = null;

		Map<String, String> params = req.getServiceMatch().getTemplateVars();

		String authority = params.get("authority");

		try {

		  JSONObject jsonParams = (JSONObject) req.parseContent();

		  siteId = jsonParams.getString("siteId");

		  roles = jsonParams.getJSONArray("roles");

		} catch(Exception E) {
        	status.setCode(400);
            status.setMessage("Une Erreur est survenue! Veuillez reéssayer s'il vous plait ");
            status.setRedirect(true);
            return model;
		}

		if (authority == null || "".equals(authority) || siteId == null || "".equals(siteId) || roles == null) {
        	status.setCode(400);
            status.setMessage("missing parameters");
            status.setRedirect(true);
            return model;
        }

		for (int i = 0 ; i < roles.length(); i++) {
			String role;
			try {
			  role = roles.getString(i);
			}
			catch(Exception E) {
	        	status.setCode(400);
	            status.setMessage("BAD REQUEST!");
	            status.setRedirect(true);
	            return model;
				}
			try {
			  authorityService.addAuthority("GROUP_site_"+siteId+"_"+role, authority);
			} catch(Exception E) {
	        	status.setCode(400);
	            status.setMessage("Une Erreur est survenue lors de l'ajout! Veuillez reéssayer s'il vous plait ");
	            status.setRedirect(true);
	            return model;
			}
		}


		var siteIdWrapper = new Object(){ String value = ""; };
		siteIdWrapper.value = siteId;

		Set<String> authorityRoles =  authorityService.getContainingAuthorities(AuthorityType.GROUP, authority, false);

		authorityRoles.removeIf(m -> ("GROUP_site_"+siteIdWrapper.value).equals(m) || !m.startsWith("GROUP_site_"+siteIdWrapper.value));

		// Remove Site basic roles (SiteManager, SiteCollaborator, SiteContributor ...)

		authorityRoles.removeIf(m -> (m.startsWith("GROUP_site_"+siteIdWrapper.value+"_Site")));

  	    for(String role: authorityRoles) {
  	    	 authorities.put("_"+role, role.substring(("GROUP_site_"+siteIdWrapper.value+"_").length()));
  	     }


      model.put("authorities", authorities);
      return model;
	}

	public AuthorityService getAuthorityService() {
		return authorityService;
	}

	public void setAuthorityService(AuthorityService authorityService) {
		this.authorityService = authorityService;
	}
}
