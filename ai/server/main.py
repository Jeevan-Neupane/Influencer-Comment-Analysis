from fastapi import FastAPI, HTTPException, Query
from googleapiclient.discovery import build
from pydantic import BaseModel
from typing import Optional
import re

from yt_api_utils import *
app = FastAPI()


class SearchQuery(BaseModel):
    query: str

@app.post("/search")
def search(query: SearchQuery):
    """Returns the search result from youtube"""
    keyword = query.query
    # search_results = search_videos(keyword)
    search_results = [{'title': 'Python Tutorial - Python Full Course for Beginners',
  'video_id': '_uQrJ0TkZlc',
  'description': 'Become a Python pro! This comprehensive tutorial takes you from beginner to hero, covering the basics, machine learning, and ...',
  'thumbnail': 'https://i.ytimg.com/vi/_uQrJ0TkZlc/default.jpg'},
 {'title': 'Python for Beginners - Learn Python in 1 Hour',
  'video_id': 'kqtD5dpn9C8',
  'description': 'Learn Python basics in 1 hour! ⚡ This beginner-friendly tutorial will get you coding fast. Want to dive deeper? - Check out my ...',
  'thumbnail': 'https://i.ytimg.com/vi/kqtD5dpn9C8/default.jpg'},
 {'title': 'Learn Python - Full Course for Beginners [Tutorial]',
  'video_id': 'rfscVS0vtbw',
  'description': "This course will give you a full introduction into all of the core concepts in python. Follow along with the videos and you'll be a ...",
  'thumbnail': 'https://i.ytimg.com/vi/rfscVS0vtbw/default.jpg'},
 {'title': 'Python Tutorial for Beginners - Learn Python in 5 Hours [FULL COURSE]',
  'video_id': 't8pPdKYpowI',
  'description': "Python Tutorial for Beginners | Full Python Course | Learn Python in 2023 The Ultimate IT Beginner's Course: ...",
  'thumbnail': 'https://i.ytimg.com/vi/t8pPdKYpowI/default.jpg'},
 {'title': '👩\u200d💻 Python for Beginners Tutorial',
  'video_id': 'b093aqAZiPU',
  'description': "In this step-by-step Python for beginner's tutorial, learn how you can get started programming in Python. In this video, I assume ...",
  'thumbnail': 'https://i.ytimg.com/vi/b093aqAZiPU/default.jpg'},
 {'title': 'Python for Beginners – Full Course [Programming Tutorial]',
  'video_id': 'eWRfhZUzrAc',
  'description': 'Learn the Python programming language in this full course for beginners! You will learn the fundamentals of Python and code two ...',
  'thumbnail': 'https://i.ytimg.com/vi/eWRfhZUzrAc/default.jpg'},
 {'title': 'you need to learn Python RIGHT NOW!! // EP 1',
  'video_id': 'mRMmlo_Uqcs',
  'description': 'What I use to learn (the BEST IT training): https://ntck.co/itprotv (30% off FOREVER) *affiliate link FREE Python Lab: ...',
  'thumbnail': 'https://i.ytimg.com/vi/mRMmlo_Uqcs/default.jpg'},
 {'title': 'Python Full Course for free 🐍',
  'video_id': 'XKHEtdqhLK8',
  'description': 'Python tutorial for beginners full course #python #tutorial #beginners ⭐️Time Stamps⭐️ #1 (00:00:00)\u200b Python tutorial for ...',
  'thumbnail': 'https://i.ytimg.com/vi/XKHEtdqhLK8/default.jpg'},
 {'title': 'Automate manual recruitment task with python',
  'video_id': 'zjEqjMRG5QI',
  'description': 'Like the video? Go to www.petepython.com for 30 email tips in 30 days!',
  'thumbnail': 'https://i.ytimg.com/vi/zjEqjMRG5QI/default.jpg'},
 {'title': 'Python Tutorial for Beginners (with mini-projects)',
  'video_id': 'qwAFL1597eM',
  'description': 'Learn Python programming in this complete course for beginners. This tutorial features mini-projects throughout so you can put ...',
  'thumbnail': 'https://i.ytimg.com/vi/qwAFL1597eM/default.jpg'},
 {'title': 'Learn Python in Less than 10 Minutes for Beginners (Fast &amp; Easy)',
  'video_id': 'fWjsdhR3z3c',
  'description': "In this crash course I'll be teaching you the basics of Python in less than 10 minutes. Python is super easy to learn compared to ...",
  'thumbnail': 'https://i.ytimg.com/vi/fWjsdhR3z3c/default.jpg'},
 {'title': 'Harvard CS50’s Introduction to Programming with Python – Full University Course',
  'video_id': 'nLRL_NcnK-4',
  'description': 'Learn Python programming from Harvard University. It dives more deeply into the design and implementation of web apps with ...',
  'thumbnail': 'https://i.ytimg.com/vi/nLRL_NcnK-4/default.jpg'},
 {'title': 'The complete guide to Python',
  'video_id': 'mDKM-JtUhhc',
  'description': 'The complete introduction to Python. This video will cover every part of it and also include lots of exercises so you can practice.',
  'thumbnail': 'https://i.ytimg.com/vi/mDKM-JtUhhc/default.jpg'},
 {'title': 'Python Tutorial for Absolute Beginners #1 - What Are Variables?',
  'video_id': 'Z1Yd7upQsXY',
  'description': 'Learn Python programming with this Python tutorial for beginners! Tips: 1. Here is the playlist of this series: https://goo.gl/eVauVX ...',
  'thumbnail': 'https://i.ytimg.com/vi/Z1Yd7upQsXY/default.jpg'},
 {'title': 'Python in 100 Seconds',
  'video_id': 'x7X9w_GIm1s',
  'description': "Python is arguably the world's most popular programming language. It is easy to learn, yet suitable in professional software like ...",
  'thumbnail': 'https://i.ytimg.com/vi/x7X9w_GIm1s/default.jpg'},
 {'title': 'Python 101: Learn the 5 Must-Know Concepts',
  'video_id': 'mMv6OSuitWw',
  'description': "See NordPass Business in action now with a 3-month free trial here http://nordpass.com/techwithtim with code techwithtim If you're ...",
  'thumbnail': 'https://i.ytimg.com/vi/mMv6OSuitWw/default.jpg'},
 {'title': 'How to create graphics using Python turtle 🐍🐢 #coding',
  'video_id': 'eaMDDseIL7E',
  'description': "This tutorial will create colorful graphics using the python turtle library. Let's have some fun by making some excellent graphics in ...",
  'thumbnail': 'https://i.ytimg.com/vi/eaMDDseIL7E/default.jpg'},
 {'title': 'Python Functions | Python Tutorial for Absolute Beginners #1',
  'video_id': 'u-OmVr_fT4s',
  'description': 'Learn all about Python functions, *args, **kwargs with this Python tutorial for beginners. Complete Python course for beginners: ...',
  'thumbnail': 'https://i.ytimg.com/vi/u-OmVr_fT4s/default.jpg'},
 {'title': '#1 Python Tutorial for Beginners | Introduction to Python',
  'video_id': 'hEgO047GxaQ',
  'description': 'Telusko Courses: Spring and Microservices Live Course : https://bit.ly/springmslive Coupon: TELUSKO25 (25% Discount) ...',
  'thumbnail': 'https://i.ytimg.com/vi/hEgO047GxaQ/default.jpg'},
 {'title': 'Amazing Rotating Python Graphics Design using Turtle 🐢 #python #pythonshorts #coding #viral #design',
  'video_id': 'P5An-rTtM_k',
  'description': 'Python Projects for Begineers Python Turtle Programming with Turtle Turtle Graphics Drawing with Python Turtle Python Turtle ...',
  'thumbnail': 'https://i.ytimg.com/vi/P5An-rTtM_k/default.jpg'},
 {'title': 'Python Tutorial for Beginners 5: Dictionaries - Working with Key-Value Pairs',
  'video_id': 'daefaLgNkw0',
  'description': 'In this Python Beginner Tutorial, we will begin learning about dictionaries. Dictionaries allow us to work with key-value pairs in ...',
  'thumbnail': 'https://i.ytimg.com/vi/daefaLgNkw0/default.jpg'},
 {'title': 'Python Basics | Python Tutorial For Beginners | Learn Python Programming from Scratch | Edureka',
  'video_id': 'woVJ4N5nl_s',
  'description': 'Edureka Python Certification Training (Use Code "YOUTUBE20"): ...',
  'thumbnail': 'https://i.ytimg.com/vi/woVJ4N5nl_s/default.jpg'},
 {'title': 'Python Full Course - 12 Hours | Python For Beginners - Full Course | Python Tutorial | Edureka',
  'video_id': 'WGJJIrtnfpk',
  'description': 'Edureka Python Course (Use Code "YOUTUBE20"): ...',
  'thumbnail': 'https://i.ytimg.com/vi/WGJJIrtnfpk/default.jpg'},
 {'title': 'Python Tutorial for Beginners - Full Course in 12 Hours (2022)',
  'video_id': 'B9nFMZIYQl0',
  'description': "FORK THIS REPL http://join.replit.com/cp-python Join my FREE JavaScript Course: https://www.cleverprogrammer.com It's ...",
  'thumbnail': 'https://i.ytimg.com/vi/B9nFMZIYQl0/default.jpg'},
 {'title': 'Python As Fast as Possible - Learn Python in ~75 Minutes',
  'video_id': 'VchuKL44s6E',
  'description': 'This python tutorial aims to teach you python as fast as possible. This python speed course will cover all the fundamentals of ...',
  'thumbnail': 'https://i.ytimg.com/vi/VchuKL44s6E/default.jpg'}]
    return search_results


class VideoID(BaseModel):
    video_id: str

@app.post("/process_video")
async def process_video_endpoint(video: VideoID):
    received_video_id = video.video_id
    

    # response_message = {"message": "hi"}
    
    return {"total":100000, "sentiments":{"sadness": 1000, "joy":10000, "love": 29000, "anger": 20000, "fear": 20000, "surprise": 20000}, "topics":['video', 'mr', 'beast', 'mrbeast', 'love', '10', 'minutes', 'good', 'jimmy', 'bro', 'videos', '59', 'yes', 'best', 'wow', 'mack', 'views', '00', 'hello', 'make', 'que', 'just', 'comment', 'nice', 'help', 'crazy', 'new', 'exactly', 'banger', 'lol', 'vid', 'great', 'want', 'money', 'time', 'el', 'amazing', 'long', 'bangladesh', 'cool', 'challenge', 'really', 'en', 'man', 'team', 'im', 'la', 'mins', 'plz', 'fell'],
            "celebrity_comments":{"@pewdiepie": "you never disappoint us. great vid.", "@mkbhd": "i just love the intro", "@evazubeck": "keep up the good work"},
            "clusters":{"yes": 2200, "loved it": 2500, "can't be any better": 3500, "at the end mack should have got one more chance": 40000, "sound recording could be better": 50000},
            "recommendations": ["Please try to improve sound quality.", "Consider giving mack a second chance."],
    }



class ChannelId(BaseModel):
    id: str
    
@app.post("/channel_video/link")
async def get_channel_videos_by_link(id:ChannelId):
    _id = id.id
    pattern = r'@([^\/]+)'
    match = re.search(pattern, _id)
    if match:
        id = match.group(1)
        print(id)
        return search_videos(id)
    else:
        raise HTTPException(status_code=404,detail="No match found")
    

@app.post("/channel_videos/id")
async def get_channel_videos_by_id(id:ChannelId):
    _id = id.id
    try:
        return get_vids_of_channel(_id)
    except:
        raise HTTPException(status_code=404,detail="No match found")
    
