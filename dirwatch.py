import os
import time
import sys
import logging
from watchdog.observers import Observer
from GarminActivityEventHandler import GarminActivityEventHandler

__author__ = 'bryce'

DEFAULT_DIR = os.path.expanduser('~/Library/Application\ Support/Garmin/Devices/')

if __name__ == "__main__":
    logging.basicConfig(level=logging.INFO)
    dir = sys.argv[1] if len(sys.argv) > 1 else DEFAULT_DIR
    path = '%s/*'
    observer = Observer()
    observer.schedule(GarminActivityEventHandler(), dir, recursive=True)
    observer.start()

    try:
        while True:
            time.sleep(5)
    except KeyboardInterrupt:
        observer.stop()

    observer.join()
    
