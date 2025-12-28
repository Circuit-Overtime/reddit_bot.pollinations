import requests
from datetime import datetime
import time

def check_latest_post():
    """Fetch and check the latest post from r/pollinations_ai"""
    
    url = "https://www.reddit.com/r/pollinations_ai/.json"
    
    # Complete headers to mimic real browser request
    headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36",
        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8",
        "Accept-Language": "en-US,en;q=0.9",
        "Accept-Encoding": "gzip, deflate, br",
        "Referer": "https://www.reddit.com/",
        "Connection": "keep-alive",
        "Cache-Control": "max-age=0",
        "Upgrade-Insecure-Requests": "1"
    }
    
    try:
        # Create a session to maintain cookies
        session = requests.Session()
        response = session.get(url, headers=headers, timeout=10)
        response.raise_for_status()
        
        data = response.json()
        
        # Get the posts from the data structure
        posts = data.get("data", {}).get("children", [])
        
        if not posts:
            print("No posts found")
            return None
        
        # Get the latest post
        latest_post = posts[0]
        post_data = latest_post.get("data", {})
        
        # Extract the created_utc timestamp
        created_utc = post_data.get("created_utc")
        
        if not created_utc:
            print("No created_utc found in post data")
            return None
        
        # Convert UTC timestamp to readable date
        created_date = datetime.utcfromtimestamp(created_utc)
        
        # Display results
        post_title = post_data.get("title", "N/A")
        post_author = post_data.get("author", "N/A")
        
        print(f"Latest Post Information:")
        print(f"  Title: {post_title}")
        print(f"  Author: {post_author}")
        print(f"  Created (UTC Timestamp): {created_utc}")
        print(f"  Created (Date): {created_date.strftime('%Y-%m-%d %H:%M:%S')}")
        print(f"  URL: https://reddit.com{post_data.get('permalink', '')}")
        
        return {
            "title": post_title,
            "author": post_author,
            "created_utc": created_utc,
            "created_date": created_date,
            "created_date_str": created_date.strftime('%Y-%m-%d %H:%M:%S')
        }
        
    except requests.exceptions.RequestException as e:
        print(f"Error fetching data: {e}")
        return None
    except Exception as e:
        print(f"Error processing data: {e}")
        return None

if __name__ == "__main__":
    check_latest_post()
