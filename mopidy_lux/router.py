import os

from tinydb import TinyDB
from tinydb.storages import JSONStorage
from tinydb.middlewares import CachingMiddleware
import tornado.web


class LuxRouter(object):
    def __init__(self, _config):
        self.config = _config
        self._db = TinyDB(
            self.config['lux']['db_file'],
            storage=CachingMiddleware(JSONStorage)
        )

    def setup_routes(self):
        args = dict(
            config=self.config,
            db=self._db
        )
        return [
            (r"/lux/(.*)", tornado.web.StaticFileHandler, {
                'path': os.path.join(os.path.dirname(__file__), 'static'),
                'default_filename': 'index.html'
            }),
            (r"/lux/playlist", Playlists, args),
            (r"/lux/loved", Loved, args),
            (r"/lux/discover", EchoNestsDiscover, args),
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
