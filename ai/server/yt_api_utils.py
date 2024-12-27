import googleapiclient.discovery
import pandas as pd
from dotenv import load_dotenv
import os
from googleapiclient.errors import HttpError
from typing import Optional

load_dotenv()
g_api_key = os.getenv("G_API_KEY")
api_service_name = "youtube"
api_version = "v3"
DEVELOPER_KEY = g_api_key
youtube = googleapiclient.discovery.build(
    api_service_name, api_version, developerKey=DEVELOPER_KEY)

def search_videos(query, max_results=25):
    search_response = youtube.search().list(
        q=query,
        type="video",
        part="snippet",
        maxResults=max_results,
        
    ).execute()

    videos = []
    for search_result in search_response.get("items", []):
        if search_result["id"]["kind"] == "youtube#video":
            videos.append({
                "title": search_result["snippet"]["title"],
                "video_id": search_result["id"]["videoId"],
                "description": search_result["snippet"]["description"],
                "thumbnail": search_result["snippet"]["thumbnails"]["default"]["url"]
            })

    return videos


def get_all_video_ids_from_playlists(playlist_ids):
    all_videos = []  # Initialize a single list to hold all video IDs

    for playlist_id in playlist_ids:
        next_page_token = None

        # Fetch videos from the current playlist
        while True:
            playlist_request = youtube.playlistItems().list(
                part='contentDetails',
                playlistId=playlist_id,
                maxResults=50,
                pageToken=next_page_token)
            playlist_response = playlist_request.execute()

            all_videos += [item['contentDetails']['videoId'] for item in playlist_response['items']]

            next_page_token = playlist_response.get('nextPageToken')

            if next_page_token is None:
                break

    return all_videos


def get_replies(parent_id):  # Added video_id as an argument
    replies = []
    next_page_token = None

    while True:
        reply_request = youtube.comments().list(
            part="snippet",
            parentId=parent_id,
            textFormat="plainText",
            maxResults=100,
            pageToken=next_page_token
        )
        reply_response = reply_request.execute()

        for item in reply_response['items']:
            comment = item['snippet']
            replies.append({
                'Timestamp': comment['publishedAt'],
                'Username': comment['authorDisplayName'],
                # 'VideoID': video_id,
                'Comment': comment['textDisplay'],
                # 'Date': comment['updatedAt'] if 'updatedAt' in comment else comment['publishedAt']
            })

        next_page_token = reply_response.get('nextPageToken')
        if not next_page_token:
            break

    return replies

# Function to get all comments (including replies) for a single video
def get_comments_for_video(video_id):
    all_comments = []
    next_page_token = None

    while True:
        comment_request = youtube.commentThreads().list(
            part="snippet",
            videoId=video_id,
            pageToken=next_page_token,
            textFormat="plainText",
            maxResults=100
        )
        comment_response = comment_request.execute()

        for item in comment_response['items']:
            top_comment = item['snippet']['topLevelComment']['snippet']
            all_comments.append({
                'Timestamp': top_comment['publishedAt'],
                'Username': top_comment['authorDisplayName'],
                # 'VideoID': video_id,  # Directly using video_id from function parameter
                'Comment': top_comment['textDisplay'],
                # 'Date': top_comment['updatedAt'] if 'updatedAt' in top_comment else top_comment['publishedAt']
            })

            # Fetch replies if there are any
            if item['snippet']['totalReplyCount'] > 0:
                all_comments.extend(get_replies(youtube, item['snippet']['topLevelComment']['id'], video_id))

        next_page_token = comment_response.get('nextPageToken')
        if not next_page_token:
            break

    return all_comments


def get_vids_of_channel(channel_id, max_results = 25):
    search_response = youtube.search().list(
          part="snippet",
          channelId=channel_id,
          type="video",
          maxResults=max_results, 
        #   order="date",
      ).execute()

    videos = []
    for search_result in search_response.get("items", []):
        if search_result["id"]["kind"] == "youtube#video":
            videos.append({
                "title": search_result["snippet"]["title"],
                "video_id": search_result["id"]["videoId"],
                "description": search_result["snippet"]["description"],
                "thumbnail": search_result["snippet"]["thumbnails"]["default"]["url"]
            })

    return videos


if __name__ == "__main__":
    video_id = '5lwiuEWD7ko'
    # comments = get_comments_for_video(video_id)
    # comments_df = pd.DataFrame(comments)
    # print(comments_df)
    # keyword = "python tutorials"
    # search_results = search_videos(keyword)

    # for result in search_results:
    #     print(f"Title: {result['title']}")
    #     print(f"Video ID: {result['video_id']}")
    #     print(f"Description: {result['description']}")
    #     print(f"Thumbnail: {result['thumbnail']}")
    #     print("---")
    
