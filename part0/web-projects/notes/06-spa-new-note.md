```mermaid
    sequenceDiagram
        participant User
        participant Server

        User->>Server: Send POST Request to: https://studies.cs.helsinki.fi/exampleapp/new_note_spa
        Server->>User: SPA with updated HTML
```
