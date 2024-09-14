# Real-Time Collaborative Editing

## Manual Testing

### Get Started

1. From the repo root in **one** terminal, run:

   ```sh
   npm run start:rtc-server
   ```

   This runs up the collaboration server (this is normally run on a remote server).

2. From the repo root in a **second** terminal, run:

   ```sh
   npm start
   ```

   This runs up the dev environment.

> [!NOTE]
> You can switch from collaborative editing back to normal editing by setting `projectId` to an empty string or undefined in `platform-scripture-editor.web-view.tsx`.
