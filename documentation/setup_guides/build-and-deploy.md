# Building the project

The project has a github release workflow which will run on every new tag pushed to remote that follows the structure of `v*.*.*`.
This will build the project and create a new release which can be plugged into a remote production server to update or deploy a docker image. (not yet implemented)

## Manual building

Manual building requires the person to have node and npm installed on their device, once that is done they can build the application with the following steps:
1. Navigate to the client project: `cd ./src/client` and run the following commands:
   1. `npm install` - to install all the packages
   2. `npm run build` - to build the project from react tsx to base html/js/css
2. Navigate to the server project `cd ./src/server` or coming from client directory `cd ../server` and run the following commands:
   1. `npm install` - to install all the packages
   2. `npm run build` - to bundle the project into one file for deployment
3. The built project will be located in `./src/build/` to run the built project make sure there is a `.env` that follows the structure of the template in `./src/server/`
4. Then in the built server directory (`./src/build/server/`) run: `node server.js` which will deploy the application
5. The application will be available (if build was successful) on a localhost address specified in the console