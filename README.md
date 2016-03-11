# Work

## Quickstart

1. Install application dependencies into virtual environment:

   ```sh
   make install
   ```

2. Set necessary environment variables:

   ```sh
   export SECRET_KEY='my-secret-key'
   ```

3. Install frontend dependencies via `npm` and `bower`:

   ```sh
   npm install
   bower install
   ```

4. Run local development server:

   ```sh
   make serve
   ```

## Features

1. Swap between application configurations

   ```sh
   # Set path to application config into environment variable
   export APP_CONFIG='production.cfg'

   # Serve application
   make serve
   ```

2. Compress static assets

   ```python
   # Create a bundle of assets
   scripts = Bundle(
       'scripts/api.js',
       'scripts/main.js',
       filters=('jsmin'),
       output='dist/main.%(version)s.js'
   )

   assets.register('scripts', scripts)
   ```

   ```jinja
   {% assets "scripts" %}
     <script src="{{ ASSET_URL }}"></script>
   {% endassets %}
   ```
