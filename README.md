## Installing and Running ##
First, install the prerequisites

	$ sudo pip install flask
	$ sudo pip install watchdog

Next, run the server by

	$ python oauth\_flask.py
	
To go through the process of storing your access\_token, visit `http://localhost:5000/start` once the flask application is running (previous step).

## Config ##
`config.py` describes UploadRunner's configuration. It also loads an outside config file so some properties can be managed separately.
By default, the external configuration properties should have the client\_id and the client\_secret at `~/.uploadrunner/config.py`


