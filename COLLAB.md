# Real-Time Collaborative Editing

## Manual Testing

### Get Started

1. From the repo root in **one** terminal, run:

   ```sh
   npm run start:rtc-server
   ```

   This runs up the collaboration server (this is normally run on a remote server). Note that the server name/IP address is currently hard coded in the `yjs.client.ts` file. Update this in particular from `localhost` to the appropriate value:

   ```ts
   const YJS_SERVER_URL = 'ws://localhost:8888';
   ```

2. From the repo root in a **second** terminal, run:

   ```sh
   npm start
   ```

   This runs up the dev environment.

> [!NOTE]
> You can switch from collaborative editing back to normal editing by setting `projectId` to an empty string or undefined in `platform-scripture-editor.web-view.tsx`.

## Follow up

### Known issues

- Document doesn't change when scrref changes. You're stuck with whichever book/chapter you opened originally.
- Documents are per book, not per chapter.
  - Can you have a master YJS document with subdocuments (e.g., books containing chapters)?
- Presence/awareness is only within P.B, not flowing to the RTC server.
- All the YJS server code is copied from y-websocket and mostly in JS, not TS. It needs some love.
- All ports and hosts are hard coded.
- Identity is required to avoid editors appearing anonymous to each other within the application.
- y-websocket has a native dependency and was needed to be installed in release/app. This also required ws to be reinstalled there because the dependency from y-websocket was too old. Something about this setup breaks packaged builds (at least on Linux).
- Everything is in the extension host, and it probably should just live as a separate process on its own.
- Random crashes are happening because there is no exception handling anywhere in the new code and we aren't doing any cleanup when we close documents.

### To Do items

- [ ] Use events with the Y.Doc objects to interface with Data Providers. Currently all documents are empty when they open, and there is no way to export the data elsewhere.
- [ ] Add authentication to the RTC server so that people can only open projects if they have rights. This may require some protocol work so that the RTC server implementation can use whatever credentials it needs (e.g., PT registry).
- [ ] UX for different modes depending on user roles (i.e., editor vs commenter vs viewer)
- [ ] Consider how suggestions should work beyond normal comments
- [ ] Add more data streams besides scripture text and comments for things like settings, extension data, etc.
- [ ] Provide some way to view and work with history
- [ ] UX (not just UI) related to sending and/or receiving immediately vs. at selected times
- [ ] Integrating with Kevin Hahn's CRDT work
- [ ] RTC server to S/R server synchronization
- [ ] Local synchronization between PT9 project files and PT10 data
- [ ] Add notifications when something I was working on recently was changed by someone else
