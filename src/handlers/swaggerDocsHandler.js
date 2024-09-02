const fs = require('fs');
const path = require('path');
const { SwaggerUIBundle, SwaggerUIStandalonePreset } = require('swagger-ui-dist');

// Ruta del archivo Swagger YAML
const swaggerYamlPath = path.join(__dirname, '../swagger/swagger.yaml');

module.exports.swaggerDocs = async (event) => {
  // Lee el archivo swagger.yaml
  const swaggerYaml = fs.readFileSync(swaggerYamlPath, 'utf8');

  const swaggerHtml = `
    <!DOCTYPE html>
    <html>
      <head>
        <title>Swagger UI</title>
        <link rel="stylesheet" type="text/css" href="https://unpkg.com/swagger-ui-dist/swagger-ui.css" />
        <style>
          html { box-sizing: border-box; overflow: -moz-scrollbars-vertical; overflow-y: scroll; }
          body { margin:0; padding:0; }
        </style>
        <script src="https://unpkg.com/swagger-ui-dist/swagger-ui-bundle.js"></script>
        <script src="https://unpkg.com/swagger-ui-dist/swagger-ui-standalone-preset.js"></script>
        <script>
          window.onload = function() {
            SwaggerUIBundle({
              url: '/swagger.yaml',
              dom_id: '#swagger-ui',
              presets: [SwaggerUIBundle.presets.apis, SwaggerUIStandalonePreset],
              layout: "StandaloneLayout"
            });
          }
        </script>
      </head>
      <body>
        <div id="swagger-ui"></div>
      </body>
    </html>
  `;

  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'text/html',
    },
    body: swaggerHtml,
  };
};
