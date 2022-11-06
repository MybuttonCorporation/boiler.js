# Boiler 1.4.6 release notes
Release notes for v1.4.6

## Boiler libraries can now use other libraries as dependencies.
+---> Furnace now supports dependencies.
+----> The process is completed by setting an array of dependencies, which will be sent to the 
       client when installing a library. They will then be installed to `.boiler/lib/furnace-libs`.
+-----> Projects are now initialized when the `lib` or `lib pub` command is run automatically.
+------> Furnace will now follow `furnaceconf.json` to recieve project configuration.
+-------> Furnace no longer accepts command-line arguments for the `name` and `version` parameters.
          They are now recieved from `furnaceconf.json`.