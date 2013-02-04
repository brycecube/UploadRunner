import os
import urllib

client_id = 'OVERRIDDEN IN external_confg_location'
client_secret = 'OVERRIDDEN IN external_confg_location'

external_config_location = '~/.uploadrunner/config.py'
execfile(os.path.expanduser(external_config_location))

flask_port = '5000'
flask_host = 'localhost'
flask_redirect_url = 'http://%s:%s/redir' % (flask_host, flask_port)
flask_start_url = 'http://%s:%s/start' % (flask_host, flask_port)

runkeeper_url='https://runkeeper.com'
api_runkeeper_url='http://api.runkeeper.com'

runkeeper_oauth_redirect_url = '%s/apps/authorize?client_id=%s&response_type=code&redirect_uri=%s' % (runkeeper_url, client_id, urllib.quote(flask_redirect_url))
runkeeper_oauth_token_url = '%s/apps/token' % runkeeper_url

runkeeper_user_url = '%s/user' % api_runkeeper_url

token_dir = os.path.expanduser('~/.uploadrunner/access_token')