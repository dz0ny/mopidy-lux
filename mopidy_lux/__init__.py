from __future__ import unicode_literals

import os

from mopidy import ext, config


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
        schema['db_file'] = config.Path()
        return schema

    def setup(self, registry):
        from .router import LuxRouter

        registry.add("http:routers", LuxRouter)

