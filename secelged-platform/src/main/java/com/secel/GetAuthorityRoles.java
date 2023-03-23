package com.secel;

import java.util.HashMap;
import java.util.LinkedHashMap;
//import java.util.List;
import java.util.Map;
import java.util.Set;

import org.alfresco.service.cmr.security.AuthenticationService;
import org.alfresco.service.cmr.security.AuthorityService;
import org.alfresco.service.cmr.security.AuthorityType;
//import org.alfresco.service.cmr.site.SiteMemberInfo;
import org.springframework.extensions.webscripts.DeclarativeWebScript;
import org.springframework.extensions.webscripts.Status;
import org.springframework.extensions.webscripts.WebScriptRequest;

//import com.siged.model.Constant;

public class GetAuthorityRoles extends DeclarativeWebScript {

	private AuthorityService authorityService;
	private AuthenticationService authenticationService;

	@Override
    protected Map<String, Object> executeImpl(WebScriptRequest req,
            Status status) {

		//Map<String, String> params = req.getServiceMatch().getTemplateVars();

		String authority = authenticationService.getCurrentUserName();

		Map<String, String> authorities = new LinkedHashMap<String, String>();

		Map<String, Object> model = new HashMap<String, Object>();

		Set<String> authorityRoles =  authorityService.getContainingAuthorities(AuthorityType.GROUP, authority, false);
	    boolean isAdmin = authorityRoles.contains("GROUP_ALFRESCO_ADMINISTRATORS");

		authorityRoles.removeIf(m -> (!m.startsWith("GROUP_site_cuy_")));

		// Remove Site basic roles (SiteManager, SiteCollaborator, SiteContributor ...)

		for(String role: authorityRoles) {
  	    	 authorities.put("_"+role, role.substring(("GROUP_site_cuy_").length()));
  	     }

		if(isAdmin)
		    authorities.put("_admin", "ADMIN");

      model.put("authorities", authorities);
      return model;
	}

	public AuthorityService getAuthorityService() {
		return authorityService;
	}

	public void setAuthorityService(AuthorityService authorityService) {
		this.authorityService = authorityService;
	}

	public AuthenticationService getAuthenticationService() {
		return authenticationService;
	}

	public void setAuthenticationService(AuthenticationService authenticationService) {
		this.authenticationService = authenticationService;
	}
}
