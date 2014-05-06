from operator import attrgetter
import os

from tinydb import TinyDB
from tinydb.storages import JSONStorage
from tinydb.middlewares import CachingMiddleware
import tornado.web
import pyen

from mopidy import http


class LuxRouter(http.Router):
    name = 'lux'

    def setup_routes(self):
        db = TinyDB(
            self.config['lux']['db_file'],
            storage=CachingMiddleware(JSONStorage)
        )
        args = dict(
            config=self.config,
            db=db,
            echonest=pyen.Pyen(self.config['lux']['echonest_key'])
        )
        return [
            (r"/%s/playlist" % self.name, Playlists, args),
            (r"/%s/loved" % self.name, Loved, args),
            (r"/%s/discover" % self.name, EchoNestsDiscover, args),
            (r"/%s/cover" % self.name, EchoNestsArtistArt, args),
            (r"/%s/(.*)" % self.name, http.StaticFileHandler, {
                'path': os.path.join(os.path.dirname(__file__), 'static'),
                'default_filename': 'index.html'
            }),
        ]


class DefaultHandler(tornado.web.RequestHandler):

    def initialize(self, _config, _db, _echonest):
        self.config = _config
        self.db = _db
        self.echonest = _echonest

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


class EchoNestsArtistArt(DefaultHandler):
    """
    Discover cover art based on artist
    """
    def initialize(self, config, db, echonest):
        self.config = config
        self.db = db
        self.echonest = echonest
    def get(self):
        response = self.echonest.get(
            'artist/profile',
            name=self.get_argument("artist", None, True),
            bucket=['images']
        )
        #for img in sorted(response['artist']['images'], key=attrgetter(
        #        'width')):
        #    print(img['url'])
        self.write(response)
        #imgs = response['artist']['images']
        #self.redirect(imgs[len(imgs)-1]['url'], False)

class EchoNestsDiscover(DefaultHandler):
    """
    Discover tracks based on mood or similarity
    """
    pass
