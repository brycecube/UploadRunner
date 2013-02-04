import json
import logging
import os
import urllib
import urllib2
from flask.app import Flask
from flask import redirect, request
import config

__author__ = 'bryce'

logging.basicConfig(level=logging.DEBUG, format='%(asctime)s - %(message)s', datefmt='%Y-%m-%d %H:%M:%S')
app = Flask(__name__)

@app.route('/start')
def start():
    redirect_uri = config.runkeeper_oauth_redirect_url
    return redirect(redirect_uri)

@app.route('/redir')
def redir():
    error = request.args.get('error')
    if error is not None:
        if error is 'access_denied':
            return 'You have denied the access to your runkeeper application. Please <a href="%s">start over</a> again to try again.' % config.flask_start_url
        else:
            return 'An error occurred while trying to authorize UploadRunner. Please <a href="%s">start over</a> again to try again.' % config.flask_start_url

    auth_code = request.args.get('code')
    data = urllib.urlencode({
        'grant_type' : 'authorization_code',
        'code' : auth_code,
        'client_id' : config.client_id,
        'client_secret' : config.client_secret,
        'redirect_uri' : config.flask_redirect_url
    })
    headers = {
        'content-type' : 'application/x-www-form-urlencoded'
    }
    req = urllib2.Request(config.runkeeper_oauth_token_url, data=data, headers=headers)

    response = urllib2.urlopen(req)
    json_response = response.read()
    obj = json.loads(json_response)

    if 'access_token' in obj.keys():
        token = obj['access_token']
        user = get_user(token)
        save_token(user, token)
        return "Access has been granted, please close this window and continue your upload from UploadRunner"
    else:
        return 'An error occurred while saving your access to UploadRunner. Please <a href="%s">start over</a> again to try again.' % config.flask_start_url

def get_user(token):
    headers = {
        'Authorization' : 'Bearer %s' % token,
        'Accept' : 'application/vnd.com.runkeeper.User+json'
    }
    req = urllib2.Request(config.runkeeper_user_url, headers=headers)
    response = urllib2.urlopen(req)
    return json.loads(response.read())

def save_token(user, token):
    if not os.path.exists(config.token_dir):
        os.makedirs(config.token_dir)

    token_file = open('%s/%s' % (config.token_dir, user['userID']), 'w')
    token_file.write(token)
    token_file.close()

if __name__ == "__main__":
    app.run()
    
