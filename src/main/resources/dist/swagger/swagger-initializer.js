window.onload = function() {
  //<editor-fold desc="Changeable Configuration Block">

    const hostname = window.location.hostname;
    const isLocal = hostname === 'localhost'  || hostname === '127.0.0.1';
    const apiDocsUrl = isLocal ? "/api-docs" : "/attendance-service/api-docs"; // Replace "timetable-service" with your service name

  // the following lines will be replaced by docker/configurator, when it runs in a docker-container
  window.ui = SwaggerUIBundle({
    url: apiDocsUrl, // Dynamically set the URL based on environment
    dom_id: '#swagger-ui',
    deepLinking: true,
    presets: [
      SwaggerUIBundle.presets.apis,
      SwaggerUIStandalonePreset
    ],
    plugins: [
      SwaggerUIBundle.plugins.DownloadUrl
    ],
    layout: "StandaloneLayout",
    requestInterceptor: (req) => {
      if (!req.loadSpec) {
        var authorized = this.ui.authSelectors.authorized();
        var bearerToken = getEntry(authorized, 'Authorization');
        if (bearerToken) {
          var tokenValue = getEntry(bearerToken, 'value');
          if (tokenValue) {
            req.headers.Authorization = "Bearer " + tokenValue;
          }
        }
      }
      return req;
    }
  });

  function getEntry(complexObj, entryName) {
    if (complexObj && complexObj._root && complexObj._root.entries) {
      var objEntries = complexObj._root.entries;
      for (var t = 0; t < objEntries.length; t++) {
        var entryArray = objEntries[t];
        if (entryArray.length > 1) {
          var name = entryArray[0];
          if (name === entryName) {
            return entryArray[1];
          }
        }
      }
    }

    return null;
  }
  //</editor-fold>
};