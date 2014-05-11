import os
import urllib

import requests
from tinydb import TinyDB
from tinydb.storages import JSONStorage
from tinydb.middlewares import CachingMiddleware
import tornado.web

from mopidy import http


class LuxRouter(http.Router):
    name = 'lux'

    def setup_routes(self):
        db = TinyDB(
            self.config['lux']['db_file'],
            storage=CachingMiddleware(JSONStorage)
        )
        args = dict(
            _config=self.config,
            _db=db
        )
        return [
            (r"/%s/playlist" % self.name, Playlists, args),
            (r"/%s/loved" % self.name, Loved, args),
            (r"/%s/discover" % self.name, EchoNestsDiscover, args),
            (r"/%s/cover" % self.name, CoverArt, args),
            (r"/%s/(.*)" % self.name, http.StaticFileHandler, {
                'path': os.path.join(os.path.dirname(__file__), 'static'),
                'default_filename': 'index.html'
            }),
        ]


class DefaultHandler(tornado.web.RequestHandler):
    def initialize(self, _config, _db):
        self.config = _config
        self.db = _db

    def getlfm(self, **kwargs):
        kwargs['api_key'] = '73f90c5b2e50475a38a8442bfa45cd9f'
        kwargs['format'] = 'json'
        params = urllib.urlencode(kwargs)
        uri = 'http://ws.audioscrobbler.com/2.0/?%s' % params
        return requests.get(uri)


class Playlists(DefaultHandler):
    """
    Permanent storage for playlists
    """
    pass


class Loved(DefaultHandler):
    """
    Permanent storage for loved songs
    """
    pass


class CoverArt(DefaultHandler):
    """
    Discover cover art based on artist
    """

    def get_lfm_image(self, imgs):
        img = imgs[len(imgs) - 1].get('#text')
        return img

    def get(self):
        artist = self.get_argument("artist", None, True)
        track = self.get_argument("track", None, True)
        album = self.get_argument("album", None, True)

        if album and artist:
            _album = self.getlfm(
                method='album.getinfo',
                artist=artist.encode('utf-8'),
                album=album.encode('utf-8'),
                autocorrect=1
            )
            self.redirect(self.get_lfm_image(
                _album.json().get('album').get('image')
            ))
        elif artist and track:
            _track = self.getlfm(
                method='track.getInfo',
                artist=artist.encode('utf-8'),
                track=track.encode('utf-8'),
                autocorrect=1
            )
            self.redirect(self.get_lfm_image(
                _track.json().get('track').get('image')
            ))
        elif artist:
            _artist = self.getlfm(
                method='artist.getinfo',
                artist=artist.encode('utf-8'),
                autocorrect=1)
            self.redirect(self.get_lfm_image(
                _artist.json().get('artist').get('image')
            ))
        else:
            self.write('default')


class EchoNestsDiscover(DefaultHandler):
    """
    Discover tracks based on mood or similarity
    """
    pass
