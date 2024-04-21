# Tangible Player

**Node.js and Electron.js**

## Installation

### Prerequisites

### CI using Github Actions

https://samuelmeuli.com/blog/2019-12-28-notarizing-your-electron-app/
https://www.electronjs.org/docs/latest/tutorial/code-signing
https://sevic.dev/notes/electron-forge-publish-github/

```
npx electron-forge publish

Error: Please set GITHUB_TOKEN in your environment to access these features
```

## Tangible Engine

## Configuration

### Housekeeping

### Mocha

#### Unit Testing

##### Fixtures

Fixed data for testing that matches the dynamic data used at run-time.

- Sample Data from the UI
- Sample Data from MQTT
- Sample Data from Tangible Engine

## Dev Notes

Installed:

- Mocha/Chai/Sinon
- ESLint

### To Do

- On Screen
  - Interactions
  - Feedback
- State Changes
  - Postion
  - Rotation
  - Active/Inactive
- Move World/Group/Item
- Click and Drag
- Layers and Overlays
- Hit Test, Overlap and Distance
- Layout or scene
- Add component library:
  - MUI: https://mui.com/
  - https://headlessui.com/
  - https://ant.design/
- Add React: https://www.electronforge.io/guides/framework-integration/react
  - `npm install --save-dev @babel/core @babel/preset-react babel-loader`
  - `npm install --save react react-dom`
  - `npm install -g eslint-plugin-react`
- Build React Only
- Build Electron Only
- Unit Tests
  - Mqtt Connection
  - HTML/CSS for drawing a puck and rotation indicator
  - JSON to
  - Load JSON
- Draw item on screen based on JSON
- Respond to movement of mouse
- Connect to MQTT Broker
- Subscribe to channel
- Publish messages
- Display messages
- Send and receive midi
- Translate MIDI <> MQTT
- Create browser window
- Load Preload script
  - Create a main listener
    - handle a call from Renderer
- Connect to MQTT Broker
- Data Module output for each Puck
  - Text module with automatic population of parameters and attributes
  - triggered by adding puck
  - display module position module from upper left
    - allow for a list of multiple modules
    - tile across the screen.
- Tangible engine link interface
  - Data Adapter for Tangible Engine ouput
  - translator for tangible engine
- SVG module
- Video module
- Audio module
- Image module
- Button state module: Hover, press, release, click
- Behavior modules
- Read Data Module
- Write Data module
- Screen Management Module
- System Management Module
- Message Managmennt:
- Send a command, data, event, message
  - to/from Main
  - to/from Renderer
  - Data to/from React
  - Data to/from MIDI
  - to/from MQTT
  - to/from USB
  - to/from touchscreen
  - to/from Keyboard
