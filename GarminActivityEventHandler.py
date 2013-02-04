import logging
from watchdog.events import FileSystemEventHandler

__author__ = 'bryce'

class GarminActivityEventHandler(FileSystemEventHandler):
  """Grabs the new FIT files added and processes them"""

  def on_moved(self, event):
    super(GarminActivityEventHandler, self).on_moved(event)

    what = 'directory' if event.is_directory else 'file'
    logging.info("Moved %s: from %s to %s", what, event.src_path, event.dest_path)

  def on_created(self, event):
    super(GarminActivityEventHandler, self).on_created(event)

    what = 'directory' if event.is_directory else 'file'
    logging.info("Created %s: %s", what, event.src_path)

  def on_deleted(self, event):
    super(GarminActivityEventHandler, self).on_deleted(event)

    what = 'directory' if event.is_directory else 'file'
    logging.info("Deleted %s: %s", what, event.src_path)

  def on_modified(self, event):
    super(GarminActivityEventHandler, self).on_modified(event)

    what = 'directory' if event.is_directory else 'file'
    logging.info("Modified %s: %s", what, event.src_path)

