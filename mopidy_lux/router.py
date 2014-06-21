import urllib

import requests
from tinydb import TinyDB
from tinydb.storages import JSONStorage
from tinydb.middlewares import CachingMiddleware
import tornado.web


def LuxRouter(config, core):
    db = TinyDB(
        config['lux']['db_file'],
        storage=CachingMiddleware(JSONStorage)
    )
    args = dict(
        _config=config,
        _db=db
    )

    return [
        (r"/lux/playlist", Playlists, args),
        (r"/lux/loved", Loved, args),
        (r"/lux/cover", CoverArt, args),
    ]


class DefaultHandler(tornado.web.RequestHandler):
    def initialize(self, _config, _db):
        self.config = _config
        self.db = _db

    def getlfm(self, **kwargs):
        kwargs['api_key'] = self.config['lux']['lastfm_key']
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
