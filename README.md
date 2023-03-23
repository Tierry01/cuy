# SECEL-CUY GED

This project is based on [alfresco SDK 4.1](https://github.com/Alfresco/alfresco-sdk/blob/master/docs/README.md).

## Deployment prerequisites

* [Java Development Kit (JDK) - Version 11](https://jdk.java.net/11/)
* [Maven - Version 3.3](https://maven.apache.org/download.cgi)
* [Docker - Latest stable version](https://docs.docker.com/install/) and [docker-ccompose](https://docs.docker.com/compose/install/).

## Building and running the project

Inside the project, you will find the run.bat and run.sh scripts. These are convenience scripts for you to quickly compile / test / run your project.

Open the terminal window from the project's root folder enter the following command:

* `cd cuy`
* `mvn package`
* `./run.sh build_start` for Mac OS X or Linux.
* `run.bat build_start` for Windows.

**NB: If this is the first time you are doing this, it will take a while for Maven to download all the required dependencies and for Docker to download all the required images.**

If the build is successful you can now access the alfresco homepage from your browser using the url http://127.0.0.1:8080/alfresco/

## Trying out the example extension code

The AIO project has some sample extension code that you can try out. There is a one Repository extension and one Share extension that you can test to make sure the extension JARs have been applied properly.

The Repository extension is a Web Script that can be called with the following URL: http://localhost:8080/alfresco/service/sample/helloworld.

The source code for the Web Script is located here: **alfresco/alfresco-platform/src/main/resources/alfresco/extension/templates/webscripts/alfresco/tutorials** and here: **alfresco/alfresco-platform/src/main/java/com/example/platformsample/HelloWorldWebScript.java.**

The Share extension is a custom Aikau page with a custom widget, you reach it with the following URL: http://localhost:8180/share/page/hdp/ws/simple-page.

The source code for the Page and Widget is located here: **alfresco/alfresco-share/src/main/resources/alfresco/web-extension/site-webscripts/com/example/pages** and here: **alfresco/alfresco-share/src/main/resources/META-INF/resources/alfresco-share/js/tutorials/widgets.**

## Stopping/Reloading the project

To stop the project enter the following command in the terminal window:

* `./run.sh stop` for Mac OS X or Linux.
* `run.bat stop` for Windows.

To reload the instance of the alfresco-plateform docker container, enter the following command in the terminal window:

* `./run.sh reload_acs` for Mac OS X or Linux.
* `run.bat reload_acs` for Windows.

To reload the instance of the alfresco-share docker container, enter the following command in the terminal window:

* `./run.sh reload_share` for Mac OS X or Linux.
* `run.bat reload_share` for Windows.


# Project structure

Below is a description of the files in the root of the project.

File | Description
--- | ---
`run` (`sh` and `bat`) | Utility script to work with the project (compile, run, test, show logs, etc.). For detailed information about it, check [run-script README](alfresco/README.md).
`pom.xml` | This XML file contains information about the project and configuration details used by Apache Maven to build the project. You can define all the configurations, parameters, and settings in this file for projects as well as for sub-projects.
`README.md` | File in Markdown format containing the documentation for the project.

## alfresco-platform

Below is a description of the content in the `alfresco-platform` (typically named `<artefactId-platform>`) sub-project. This sub-project 
contains the source code entirely dedicated to the customizing the Alfresco Content Services Repository.

Content | Description
--- | ---
`pom.xml` | This XML file contains information about the project and configuration details used by Apache Maven to build the project. You can define all the configurations, parameters, and settings in this file even if it depends on the parent pom in the root folder. For the majority of use cases, settings and configurations are directly inherited from the parent pom, and this file can work in its default version.
`src/main/assembly` | In this folder you can find everything that's needed to fully control creating the AMP artifact in the platform project. The main file to check is `amp.xml`.
`src/main/java/<groupId>...` | This folder contains the same content you can find in a regular Java project, i.e. the Java source code. Here you should put all the custom classes, interfaces, and Java source code in general.
`src/main/resources/alfresco/extension/templates/webscripts` | In this folder you can find the extensions to the REST API related to Web Scripts . Repository Web Scripts are defined in XML, JavaScript, and FreeMarker files. These are referred to as Data Web Scripts as they usually return JSON or XML. The default project contains a Hello World example.
`src/main/resources/alfresco/module/<artifactId>` | This folder contains all the configuration files and settings for the Alfresco platform module. Here you can find context files, the `alfresco-global.properties` file, Content Model examples, and Activiti workflow examples.
`src/main/resources/META-INF` | This folder hosts the content that will be placed in the `META-INF` folder of a standard Java web application.
`src/test/java/<groupId>...` | This folder contains the same content you can find in a regular Java project, i.e. the Java source code for tests. Here you should put all the custom classes, interfaces, and Java source code related to tests.

## alfresco-platform-docker

Below is a description of the content in the `alfresco-platform-docker` (typically named `<artefactId-platform-docker>`) sub-project. This 
sub-project contains the resources required to define a custom Docker image with the Alfresco Content Services Repository and the customization module 
`alfresco-platform` installed.

Content | Description
--- | ---
`pom.xml` | This XML file contains information about the project and configuration details used by Apache Maven to build the project. It adds the dependency to the `alfresco-platform` module and configures the `maven-dependency-plugin` to copy all the artifacts required in the Docker image into the folder `${project.build.directory}/extensions`.
`src/main/docker` | In this folder you can find everything that's needed to fully configure the custom ACS Docker image.
`src/main/docker/Dockerfile` | This is the file that define the custom ACS Docker image. The default configuration installs all the existing JARs and AMPs under `${project.build.directory}/extensions` folder and adds custom configuration and license files.
`src/main/docker/license` | This folder contains the licenses required for running an Enterprise project.

## alfresco-share

Below is a description of the content in the `alfresco-share` (typically named `<artefactId-share>`) sub-project. This sub-project 
contains the source code entirely dedicated to the customizing the Alfresco Share client.

Content | Description
--- | ---
`pom.xml` | This XML file contains information about the project and configuration details used by Apache Maven to build the project. You can define all the configurations, parameters, and settings in this file even if it depends on the parent pom in the root folder. For the majority of use cases, settings and configurations are directly inherited from the parent pom, and this file can work in its default version.
`src/main/assembly` | In this folder you can find everything that's needed to fully control creating the AMP artifact in the platform project. The main file to check is `amp.xml`.
`src/main/java/<groupId>...` | This folder contains the same content you can find in a regular Java project, i.e. the Java source code. Here you should put all the custom classes, interfaces, and Java source code in general.
`src/main/resources/alfresco/module/<artifactId>` | This folder contains all the configuration files and settings for the Alfresco Share module. Here you can find the property file for the module.
`src/main/resources/alfresco/web-extension` | In this folder you can find the extensions to the web client (Alfresco Share) and it's where you store Spring configurations that extend and override the system Share configuration. There are two important sub-directories here: `site-data` and `site-webscripts`.
`src/main/resources/alfresco/META-INF/resources` | This folder hosts the content that will be placed in the `META-INF` folder of a standard Java web application. It is best practice to use a further subdirectory based on the module name. This allows you to manage multiple modules, so that their web resources don't conflict with each other.
`src/main/resources/alfresco/META-INF/share-config-custom.xml` | This file is a relevant Alfresco Share file used to configure the sub-project with the correct settings, depending on your environment. For more details, see [Share configuration](http://docs.alfresco.com/5.2/concepts/dev-extensions-share-configuration.html).
`src/test/java/<groupId>...` | This folder contains the same content you can find in a regular Java project, i.e. the Java source code for tests. Here you should put all the custom classes, interfaces, and Java source code related to tests.

## alfresco-share-docker

Below is a description of the content in the `alfresco-share-docker` (typically named `<artefactId-share-docker>`) sub-project. This 
sub-project contains the resources required to define a custom Docker image with the Alfresco Share Client and the customization module 
`alfresco-share` installed.

Content | Description
--- | ---
`pom.xml` | This XML file contains information about the project and configuration details used by Apache Maven to build the project. It adds the dependency to the `alfresco-share` module and configures the `maven-dependency-plugin` to copy all the artifacts required in the Docker image into the folder `${project.build.directory}/extensions`.
`src/main/docker` | In this folder you can find everything that's needed to fully configure the custom Alfresco Share Docker image.
`src/main/docker/Dockerfile` | This is the file that define the custom Alfresco Share Docker image. The default configuration installs all the existing JARs and AMPs under `${project.build.directory}/extensions` folder and adds custom configuration files.

## alfresco-integration-tests

Below is a description of the content in the `alfresco-integration-tests` (typically named `<artefactId-integration-tests>`) sub-project. This sub-project contains all the source code and resources needed to run the integration tests.

Content | Description
--- | ---
`pom.xml` | This XML file contains information about the project and configuration details used by Apache Maven to build the project. You can define all the configurations, parameters, and settings in this file even if it depends on the parent pom in the root folder. For the majority of use cases, settings and configurations are directly inherited from the parent pom, and this file can work in its default version.
`src/main/java/<groupId>...` | This folder contains the same content you can find in a regular Java project, i.e. the Java source code. Here you should put all the custom classes, interfaces, and Java source code in general. The folder is empty by default.
`src/test/java/<groupId>...` | This folder contains the same content you can find in a regular Java project, i.e. the Java source code for tests. Here you should put all the custom classes, interfaces, and Java source code in general related to tests. By default you can find three different tests related to content modelling, custom components, and web scripts.


For more informations, refer to [SDK 4.1-AIO](https://github.com/Alfresco/alfresco-sdk/blob/master/docs/working-with-generated-projects/structure-aio.md)

