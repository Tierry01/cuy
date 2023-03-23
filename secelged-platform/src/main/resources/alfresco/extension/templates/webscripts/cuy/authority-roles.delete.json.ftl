
<#assign authorityNames = authorities?keys /> 
[
<#list authorityNames as autorityName>		 	   
	"${authorities[autorityName]}" <#if autorityName_has_next>,</#if>
</#list>
]