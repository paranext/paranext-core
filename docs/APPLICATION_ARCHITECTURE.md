# Platform.Bible Application Architecture

The purpose of this document is for AI agents to read and understand the structure of the application to help with completing automated tasks.

## Overview

Platform.Bible is an extensible Bible translation software built on Electron with TypeScript, React, and .NET components. The application follows a multi-process architecture designed for extensibility, security, and modularity.

## Core Architecture Principles

### 1. **Multi-Process Architecture**

The application consists of four main process types:

**Node.js Processes:**

- **Main Process** (`ProcessType.Main`) - Electron's main process, manages windows and native OS integration
- **Renderer Process** (`ProcessType.Renderer`) - UI process running React components
- **Extension Host Process** (`ProcessType.ExtensionHost`) - Isolated environment for running extensions

**C# Process:**

- **C# Data Provider Application** - Provides access to scripture project data using components from Paratext 9, enabling backwards compatibility and faster time to market through code reuse

### 2. **Extension-First Design**

Almost all functionality is provided through extensions to ensure maximum flexibility and modularity. Core features are implemented as bundled extensions in the `extensions/` directory.

### 3. **Platform API (PAPI)**

A comprehensive API layer that provides consistent interfaces for:

- Data providers and project data providers
- Network communication
- UI components and web views
- Settings and configuration
- Localization and theming

## Process Architecture

### Main Process (`src/main/`)

**Entry Point**: `src/main/main.ts`

**Responsibilities**:

- Application lifecycle management
- Window creation and management
- Protocol handling (URI schemes)
- Extension host process management
- Network service coordination
- .NET data provider integration

**Key Components**:

- `BrowserWindow` setup with security configurations
- Extension asset protocol service
- Network service initialization
- IPC communication setup

### Renderer Process (`src/renderer/`)

**Entry Point**: `src/renderer/index.tsx`

**Responsibilities**:

- React-based UI rendering
- Web view management and sandboxing
- Theme application
- User interaction handling
- Communication with extension host via network services

**Key Components**:

- React application (`App` component)
- Web view service host
- Dialog service
- Theme service
- Notification service

### Extension Host Process (`src/extension-host/`)

**Entry Point**: `src/extension-host/extension-host.ts`

**Responsibilities**:

- Extension loading and lifecycle management
- PAPI backend services
- Data provider registration
- Command handling
- Network object management

**Key Components**:

- Extension service
- PAPI backend service
- Data provider service
- Project data provider service

## Extension System

### Extension Structure

Extensions are located in the `extensions/` directory and follow a standardized structure:

```
extensions/src/{extension-name}/
├── src/
│   ├── main.ts              # Extension entry point
│   └── web-views/           # Web view components
├── assets/                  # Static assets
├── public/                  # Public files
└── package.json             # Extension metadata
```

### Extension Lifecycle

1. **Discovery**: Extensions are discovered from the `extensions/` directory
2. **Loading**: Extension main files are loaded in the extension host
3. **Activation**: Extensions register services, data providers, and commands
4. **Runtime**: Extensions interact through PAPI services
5. **Deactivation**: Cleanup when extensions are disabled or app closes

### Web Views

Extensions can provide UI components through web views:

- **HTML Web Views**: Static HTML content
- **React Web Views**: Dynamic React components
- **URL Web Views**: External content (with security restrictions)

Web views run in sandboxed iframes with strict Content Security Policy (CSP) restrictions.

## Data Layer

### Data Providers

Standardized way for extensions to expose data:

- **Engine Pattern**: Extensions implement `IDataProviderEngine`
- **Service Registration**: PAPI wraps engines in full data providers
- **Type Safety**: Strong TypeScript typing throughout
- **Subscriptions**: Real-time data updates via event system

### Project Data Providers (PDPs)

Specialized data providers for project-specific data:

- **Base PDPs**: Provide unique project IDs and core project data
- **Layering PDPs**: Extend base PDPs with additional functionality
- **Project Interfaces**: Standardized method sets (e.g., `platform.base`, `platformScripture.USX`)

### C# Integration

.NET components provide additional data services and enable backwards compatibility:

- **PapiClient**: WebSocket communication with main application
- **Project Data Providers**: C# implementations for Paratext integration
- **Paratext 9 Component Reuse**: Leverages existing Paratext 9 components for scripture project data access, providing backwards compatibility and accelerating development
- **Network Objects**: Shared data and service interfaces

## Network Layer

The Platform.Bible network layer provides robust inter-process communication and distributed object management across all application processes. The architecture enables seamless communication between Node.js processes (Main, Renderer, Extension Host) and the C# Data Provider process.

### Communication Architecture

#### WebSocket-Based Communication

All inter-process communication is built on WebSocket connections in a star topology with the Main process at the center:

- **Primary Protocol**: WebSockets provide full-duplex communication
- **Transport Layer**: Text messages only (JSON-RPC over WebSocket)
- **Star Topology**: All communication routes through the Main process hub
- **Connection Management**: Automatic reconnection and heartbeat monitoring

#### JSON-RPC Protocol

The network layer implements JSON-RPC 2.0 for standardized request/response patterns:

- **Request/Response**: Structured method calls with typed parameters and return values
- **Notifications**: One-way messages for events and updates
- **Batch Operations**: Multiple requests/responses in a single message
- **Error Handling**: Standardized error codes and messages

**JSON-RPC Message Structure**:

```typescript
interface JsonRpcRequest {
  jsonrpc: '2.0';
  method: string;
  params?: unknown;
  id?: string | number;
}

interface JsonRpcResponse {
  jsonrpc: '2.0';
  result?: unknown;
  error?: JsonRpcError;
  id: string | number | null;
}
```

#### Network Service Architecture

The network service (`NetworkService`) coordinates all communication:

- **RPC Client** (`RpcClient`): Manages outgoing requests and responses
- **RPC Server** (`RpcServer`): Handles incoming requests and method registration
- **WebSocket Listener**: Manages WebSocket connections and message routing
- **Message Router**: Routes messages between processes based on destination

### Network Objects

Network objects enable distributed object-oriented programming across process boundaries. Objects are registered in one process and can be accessed from any other process through strongly-typed proxies.

#### Network Object Types

**1. Data Providers**

- Provide access to application data with CRUD operations
- Support real-time subscriptions for data changes
- Implement standardized interfaces for consistent data access
- Examples: Scripture data, user settings, project metadata

**2. Project Data Providers (PDPs)**

- Specialized data providers for project-specific content
- Support layered architecture for extensibility
- Implement project interfaces (e.g., `platform.base`, `platformScripture.USX`)
- Enable multi-project scenarios with isolated data access

**3. Web View Providers**

- Factory objects that create web view definitions
- Support dynamic UI component generation
- Manage web view lifecycle and state
- Enable extension-provided user interfaces

**4. Service Objects**

- General-purpose distributed services
- Command handlers for user actions
- Utility services shared across processes
- Extension-specific functionality

#### Network Object Lifecycle

**Registration Phase**:

1. Object is created in source process (typically Extension Host)
2. Object is registered with the network service using `registerNetworkObject`
3. Network service assigns unique network object ID
4. Object metadata and interface are published to other processes

**Discovery and Proxy Creation**:

1. Client process requests network object by ID or type
2. Network service creates proxy object with matching interface
3. Proxy intercepts method calls and converts to RPC requests
4. Type safety maintained through TypeScript interfaces

**Method Invocation**:

1. Client calls method on proxy object
2. Proxy serializes method call as JSON-RPC request
3. Request routed to target process via WebSocket
4. Target process deserializes and invokes actual method
5. Result serialized and returned via JSON-RPC response
6. Proxy deserializes result and returns to client

**Cleanup and Disposal**:

1. Objects can be disposed when no longer needed
2. Network service removes object registration
3. Proxies become invalid and throw errors on access
4. Memory cleanup performed in both source and client processes

#### Network Object Implementation Pattern

**Server-Side Registration**:

```typescript
// Register a network object in Extension Host
const myDataProvider = new MyDataProvider();
const networkObjectId = await papi.networkObjectService.registerNetworkObject(
  'myExtension.myDataProvider',
  myDataProvider,
);
```

**Client-Side Access**:

```typescript
// Access network object from Renderer or other process
const dataProvider = await papi.networkObjectService.getNetworkObject<MyDataProviderInterface>(
  'myExtension.myDataProvider',
);
const data = await dataProvider.getData('selector');
```

### Inter-Process Communication Patterns

#### Main Process Hub

The Main process acts as the central communication hub:

- **WebSocket Server**: Hosts WebSocket server for all connections
- **Message Routing**: Routes messages between Renderer, Extension Host, and C# processes
- **Connection Management**: Manages process lifecycle and reconnections
- **Security Gateway**: Enforces authentication and authorization

#### Process Communication Matrix

| Source Process | Target Process | Communication Method | Use Cases                          |
| -------------- | -------------- | -------------------- | ---------------------------------- |
| Renderer       | Extension Host | WebSocket via Main   | Data access, UI commands           |
| Extension Host | Renderer       | WebSocket via Main   | UI updates, notifications          |
| Extension Host | C# Process     | WebSocket via Main   | Project data, Paratext integration |
| C# Process     | Extension Host | WebSocket via Main   | Data updates, events               |
| Main           | All Processes  | WebSocket broadcast  | System events, shutdown            |

#### Request/Response Flow

1. **Client Request**: Process initiates RPC call through proxy object
2. **Serialization**: Method call serialized to JSON-RPC request
3. **Routing**: Main process routes request to target process
4. **Deserialization**: Target process deserializes request
5. **Execution**: Actual method executed on target object
6. **Response**: Result serialized and sent back through same path
7. **Completion**: Client receives typed response

### C# Integration

The C# Data Provider process integrates seamlessly with the Node.js network layer:

#### PapiClient Architecture

The `PapiClient` class provides WebSocket communication from C#:

- **WebSocket Connection**: Direct connection to Main process
- **JSON-RPC Implementation**: C# implementation of JSON-RPC protocol
- **Network Object Support**: Register and access network objects from C#
- **Type Safety**: Strongly typed interfaces through C# generics

#### C# Network Objects

C# can both provide and consume network objects:

**Providing Objects**:

```csharp
// Register C# object as network object
var projectDataProvider = new ParatextProjectDataProvider();
await papiClient.RegisterNetworkObject("paratextProjectDataProvider", projectDataProvider);
```

**Consuming Objects**:

```csharp
// Access Node.js network object from C#
var settingsService = await papiClient.GetNetworkObject<ISettingsService>("settingsService");
var value = await settingsService.Get("myKey");
```

### Security and Authentication

#### Process Communication

The current implementation uses a simple trust model:

- **No Authentication**: Processes do not authenticate with each other
- **No Process IDs**: Processes are not assigned unique identifiers
- **Trust-Based**: All processes within the application are trusted
- **No Message Signing**: Messages are not cryptographically signed

#### Network Object Security

Network objects currently have minimal security restrictions:

- **Open Access**: All network objects are accessible to all processes
- **No Permissioning**: Generic access control is not implemented
- **Interface-Only Isolation**: Only exposed interface methods are accessible
- **Basic Input Validation**: Parameters validated at the TypeScript type level

### Performance Optimizations

#### Connection Pooling

- **Persistent Connections**: Long-lived WebSocket connections
- **Connection Reuse**: Multiple network objects share connections
- **Load Balancing**: Distribute objects across multiple connections
- **Failover Support**: Automatic failover to backup connections

#### Message Optimization

The current implementation uses a simple, direct approach:

- **JSON Encoding**: All data transferred as JSON text messages
- **Direct Transmission**: Individual requests sent immediately
- **No Compression**: Messages sent without compression
- **No Batching**: Each operation results in individual requests
- **No Caching**: Responses are not cached at the network layer

#### Subscription Management

- **Event Aggregation**: Multiple subscriptions merged for efficiency
- **Lazy Loading**: Subscriptions activated only when needed
- **Automatic Cleanup**: Unused subscriptions automatically removed
- **Throttling**: High-frequency events throttled to prevent flooding

### Error Handling and Resilience

#### Connection Recovery

- **Automatic Reconnection**: Failed connections automatically restored
- **Exponential Backoff**: Reconnection delays increase with failures
- **Circuit Breaker**: Temporary suspension of failing connections
- **Graceful Degradation**: Application continues with reduced functionality

#### Error Propagation

- **Typed Errors**: Strongly typed error objects with error codes
- **Error Translation**: Errors translated between processes and languages
- **Stack Trace Preservation**: Original stack traces maintained across boundaries
- **Recovery Actions**: Automatic recovery for transient errors

#### Monitoring and Diagnostics

- **Connection Metrics**: Real-time monitoring of connection health
- **Performance Metrics**: Latency and throughput measurements
- **Error Tracking**: Comprehensive error logging and tracking
- **Debug Tools**: Network traffic inspection and debugging tools

### Future Network Enhancements

The following features represent potential future improvements to the network layer:

#### Advanced Security Features

- **Process Authentication**: Token-based authentication between processes
- **Process Identity Management**: Unique process IDs and role-based access
- **Message Signing**: Cryptographic signing for critical operations
- **Network Object Permissions**: Granular access control for network objects

#### Performance Optimizations

- **Binary Message Support**: Large data transfer via binary WebSocket messages
- **Message Compression**: Bandwidth optimization through compression
- **Request Batching**: Multiple operations in single network requests
- **Response Caching**: Network-layer caching for frequently accessed data

#### Enhanced Communication

- **Direct Process Communication**: Bypass Main process for certain high-throughput scenarios
- **Message Prioritization**: Priority queues for different message types
- **Load Balancing**: Distribute network objects across multiple connections

## Security Model

### Process Isolation

- Extension host runs in separate process
- Web views sandboxed in iframes
- Strict CSP policies prevent code injection

### Content Security Policy

Comprehensive CSP configuration:

```
default-src 'none';
script-src-elem 'self' 'wasm-unsafe-eval' 'unsafe-inline';
style-src 'self' papi-extension: 'unsafe-inline';
frame-src 'self' papi-extension: https:;
connect-src 'self' https: ws: localhost:*;
```

### Extension Assets

Custom protocol (`papi-extension:`) for secure asset loading from extensions.

## Build System

### Webpack Configuration

Multi-stage build process:

1. **Web View Bundling**: TypeScript/React components compiled to JavaScript
2. **Main Bundling**: Extension main files and dependencies bundled
3. **Asset Processing**: Static assets copied to distribution

### TypeScript Configuration

- Strict type checking throughout
- Path mapping for clean imports (`@shared`, `@renderer`, `@main`, etc.)
- Declaration file generation for PAPI types

### Development vs Production

- **Development**: Hot reloading, source maps, dev tools
- **Production**: Minification, optimization, packaging

## Key Directories

```
paranext-core/
├── src/                     # Core application source
│   ├── main/               # Main process code
│   ├── renderer/           # Renderer process code
│   ├── extension-host/     # Extension host process code
│   └── shared/             # Shared utilities and types
├── extensions/             # Bundled extensions
├── c-sharp/               # .NET data provider components
├── lib/                   # Shared libraries
│   ├── papi-dts/          # PAPI type definitions
│   ├── platform-bible-react/ # React components
│   └── platform-bible-utils/ # Utility functions
├── assets/                # Application assets
└── release/               # Build output
```

## Extension Development Patterns

### Data Provider Pattern

```typescript
class MyDataProviderEngine implements IDataProviderEngine<MyDataTypes> {
  async getMyData(selector: string): Promise<string> {
    // Implementation
  }

  async setMyData(selector: string, data: string): Promise<boolean> {
    // Implementation
  }
}
```

### Project Data Provider Pattern

```typescript
class MyProjectDataProviderEngine extends BaseProjectDataProviderEngine<
  ['platform.base', 'myInterface']
> {
  // Implements project-specific data access
}
```

### Web View Provider Pattern

```typescript
const myWebViewProvider: IWebViewProvider = {
  webViewType: 'myExtension.myWebView',
  async getWebView(savedWebView): Promise<WebViewDefinition> {
    // Return web view configuration
  },
};
```

## Performance Considerations

### Lazy Loading

- Extensions loaded on-demand
- Web views created only when needed
- Data providers initialized when first accessed

### Caching

- Project metadata cached for quick access
- Extension assets cached after first load
- Network responses cached where appropriate

### Memory Management

- Proper cleanup on extension deactivation
- Web view disposal when no longer needed
- Unsubscription from data updates

## Development Guidelines

### Type Safety

- All APIs strongly typed
- Extension interfaces declared in `.d.ts` files
- Runtime type checking where necessary

### Error Handling

- Comprehensive error boundaries
- Graceful degradation for failed extensions
- Detailed logging throughout

### Testing

- Unit tests for core components
- Integration tests for extension system
- End-to-end tests for complete workflows

### Documentation

- JSDoc comments for all public APIs
- Architecture decision records for major changes
- Extension development guides

## Future Considerations

### Scalability

- Plugin marketplace support
- Remote extension loading
- Cloud-based data providers

### Security Enhancements

- Extension signing and verification
- Granular permission system
- Audit logging

### Performance Optimization

- Worker thread utilization
- Streaming data interfaces
- Progressive loading strategies

This architecture enables Platform.Bible to be a powerful, extensible platform while maintaining security, performance, and developer experience.
