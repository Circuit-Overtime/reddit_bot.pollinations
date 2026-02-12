# Automated Reddit Posting Bot Pipeline for Reddit

Automated Reddit bot for r/pollinations_ai subreddit that posts updates about pollinations.ai.

## Architecture

```mermaid
graph TD
    A["script_trigger.py<br/>Entry Point"] -->|Reddit Data| B["SSH to VPS<br/>Reddit Automation Server"]
    D["Reddit Data<br/>Title + Image URL"] -.-> A
    
    B --> C["CD to Project Dir<br/>/root/reddit_post_automation"]
    C --> E["Update link.ts<br/>Write TITLE & LINK"]
    
    E --> F["Run deploy.sh"]
    F --> G["Kill Old Processes"]
    G --> H["Start devvit playtest<br/>Pollinations_ai Subreddit"]
    
    H --> I["Trigger Update<br/>Modify og_main.ts"]
    I --> J["Wait 1 Minute <br/>Monitor Post"]
    J --> K["Cleanup & Exit<br/>Git Push"]
    K --> L["Logs Available<br/>deploy.log"]
```

> Created with 💖 by [Ayushman Bhattacharya](https://github.com/Circuit-Overtime)