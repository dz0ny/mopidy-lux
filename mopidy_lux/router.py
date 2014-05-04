import os

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
            config=self.config,
            db=db
        )
        return [
            (r"/%s/(.*)" % self.name, http.StaticFileHandler, {
                'path': os.path.join(os.path.dirname(__file__), 'static'),
                'default_filename': 'index.html'
            }),
            (r"/%s/playlist" % self.name, Playlists, args),
            (r"/%s/loved" % self.name, Loved, args),
            (r"/%s/discover" % self.name, EchoNestsDiscover, args),
        ]


class Playlists(tornado.web.RequestHandler):
    """
    Permanent storage for playlists
    """
    pass


class Loved(tornado.web.RequestHandler):
    """
    Permanent storage for loved songs
    """
    pass


class EchoNestsDiscover(tornado.web.RequestHandler):
    """
    Discover tracks based on mood or similarity
    """
    pass
