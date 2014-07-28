from __future__ import unicode_literals
from mopidy_lux.router import LuxRouter

import os

from mopidy import ext, config


__version__ = '1.0.1'
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
        schema['db_file'] = config.Path()
        schema['lastfm_key'] = config.Secret()
        return schema

    def setup(self, registry):
        registry.add('http:app', {
            'name': self.ext_name,
            'factory': LuxRouter,
        })
        registry.add('http:static', {
            'name': self.ext_name,
            'path': os.path.join(os.path.dirname(__file__), 'static'),
        })
