import sys
import tweepy
import json

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

print str(tweet)

# return render_to_response('index.html', {'search' : tweet, 'youtube' : search_response.items}) #pass in our entries array to our html file.