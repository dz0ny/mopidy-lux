from __future__ import unicode_literals

import os

from mopidy import ext, config
import tornado.web

__version__ = '1.0.0'
__url__ = 'https://github.com/dz0ny/mopidy-lux'


class LuxExtension(ext.Extension):
    dist_name = 'Mopidy-Lux'
    ext_name = 'lux'
    version = __version__

    def get_default_config(self):
        conf_file = os.path.join(os.path.dirname(__file__), 'ext.conf')
        return config.read(conf_file)

    def get_config_schema(self):
        schema = super(LuxExtension, self).get_config_schema()
        return schema

    def validate_config(self, config):
        if not config.getboolean('lux', 'enabled'):
            return

    @property
    def routes(self):
        return [
            (r"/lux/(.*)", tornado.web.StaticFileHandler, {
                'path': os.path.join(os.path.dirname(__file__), 'static'),
                'default_filename': 'index.html'
            }),
            (r"/lux/playlist", Playlists),
            (r"/lux/loved", Loved),
            (r"/lux/discover", EchoNestsDiscover),
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

