# Tangible Player
**Node.js and Electron.js**
## Installation
### Prerequisites

## Tangible Engine
```
[{…}]
0:
Id: 4
PatternId: 1
PointerIds: Array(3)xw
0: 1
1: 0
2: 2
length: 3
__proto__: Array(0)
Pos:
x: 2004.94812
y: 804.58844
__proto__: Object
R: -0.157022938
RMSNormalized: 3.91708827
X: 2004.94812
Y: 804.58844
__proto__: Object
```

```
(3) [{…}, {…}, {…}]
0: {Id: 82, PatternId: 3, R: 1.07342064, RMSNormalized: -0.112968467, PointerIds: Array(3), …}
1: {Id: 83, PatternId: 7, R: 2.8344698, RMSNormalized: -0.113064311, PointerIds: Array(3), …}
2: {Id: 85, PatternId: 1, R: 3.01122355, RMSNormalized: -0.155307963, PointerIds: Array(3), …}
length: 3
```

```
0:
Id: 82
PatternId: 3
PointerIds: Array(3)
0: 2
1: -1
2: 6
length: 3
__proto__: Array(0)
Pos:
x: 2088.90747
y: 855.5429
__proto__: Object
R: 1.07342064
RMSNormalized: -0.112968467
X: 2088.90747
Y: 855.5429
__proto__: Object
1:
Id: 83
PatternId: 7
PointerIds: Array(3)
0: -1
1: 4
2: 0
length: 3
__proto__: Array(0)
Pos:
x: 1912.33691
y: 898.359
__proto__: Object
R: 2.8344698
RMSNormalized: -0.113064311
X: 1912.33691
Y: 898.359
__proto__: Object
2:
Id: 85
PatternId: 1
PointerIds: Array(3)
0: 8
1: -1
2: -1
length: 3
__proto__: Array(0)
Pos:
x: 2344.21387
y: 670.734436
__proto__: Object
R: 3.01122355
RMSNormalized: -0.155307963
X: 2344.21387
Y: 670.734436
__proto__: Object
length: 3
__proto__: Array(0)

```



## MQTT Configuration
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



### Main
### Renderer 