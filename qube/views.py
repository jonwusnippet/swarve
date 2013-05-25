import sys
import tweepy
from django.shortcuts import render_to_response, render #responding to requests
from django.http import HttpResponseRedirect

from apiclient.discovery import build
from optparse import OptionParser

def home(request):
	# entries = posts.objects.all()[:10]  #imports first ten posts in database. syncdb cannot change existing fields.

	# Set DEVELOPER_KEY to the "API key" value from the "Access" tab of the
	# Google APIs Console http://code.google.com/apis/console#access
	# Please ensure that you have enabled the YouTube Data API for your project.
	DEVELOPER_KEY = "AIzaSyCjaTPgpDl3hzvkkI7x4ivsGIPmG73HP14"
	YOUTUBE_API_SERVICE_NAME = "youtube"
	YOUTUBE_API_VERSION = "v3"

	youtube = build(YOUTUBE_API_SERVICE_NAME, YOUTUBE_API_VERSION,
		developerKey=DEVELOPER_KEY)

	search_response = youtube.search().list(
		q="Anna Kendrick",
		part="id,snippet",
		# maxResults=options.maxResults
		maxResults = 25
		).execute()

	videos = []
	channels = []
	playlists = []

	for search_result in search_response.get("items", []):
		if search_result["id"]["kind"] == "youtube#video":
			videos.append("Title: %s\nLink: http://www.youtube.com/watch?v=%s\nImgURL: %s\n" % (search_result["snippet"]["title"],
				search_result["id"]["videoId"], search_result["snippet"]["thumbnails"]["default"]["url"]))
		elif search_result["id"]["kind"] == "youtube#channel":
			channels.append("%s (%s)" % (search_result["snippet"]["title"],
				search_result["id"]["channelId"]))
		elif search_result["id"]["kind"] == "youtube#playlist":
			playlists.append("%s (%s)" % (search_result["snippet"]["title"],
				search_result["id"]["playlistId"]))

	# print "Videos:\n", "\n".join(videos), "\n"
	# print "Channels:\n", "\n".join(channels), "\n"
	# print "Playlists:\n", "\n".join(playlists), "\n"


	#Use my app consumer key for Twitter
	CONSUMER_KEY = 'aN1oMcd85D4ZxLq6Ehjw'
	CONSUMER_SECRET = 'pGbkwV9ijIMqz1Vm5GCc6w9ouofCvrRVQRVQ6SAU'

	auth = tweepy.OAuthHandler(CONSUMER_KEY, CONSUMER_SECRET)

	ACCESS_KEY = '207236820-8AYlLxvcg3zMidC8TxPXKMM91p0OQtvATQ8mr6Yg'
	ACCESS_SECRET = 'NwCvdFlySWlsMLPkdjJF8yhTI82yiJAfav530p6POXc'
	
	auth.set_access_token(ACCESS_KEY, ACCESS_SECRET)
	
	#Create API instance
	api = tweepy.API(auth)

	searchResults = api.get_user("@kevjumba")
	tweet = api.user_timeline(searchResults.id)

	return render_to_response('index.html', {'search' : tweet, 'youtube' : search_response.get("items", [])}) #pass in our entries array to our html file.
