from __future__ import unicode_literals

import re

from setuptools import setup, find_packages


def get_version(filename):
    content = open(filename).read()
    metadata = dict(re.findall("__([a-z]+)__ = '([^']+)'", content))
    return metadata['version']


setup(
    name='Mopidy-Lux',
    version=get_version('mopidy_lux/__init__.py'),
    url='https://github.com/dz0ny/mopidy-lux',
    license='MIT',
    author='dz0ny',
    author_email='dz0ny@ubuntu.si',
    description='Lux Web UI extension for Mopidy',
    long_description=open('README.rst').read(),
    packages=find_packages(exclude=['tests', 'tests.*', 'src', 'new_src']),
    zip_safe=False,
    include_package_data=True,
    install_requires=[
        'setuptools',
        'Mopidy >= 0.18',
        'requests >= 2.0.0',
    ],
    entry_points={
        b'mopidy.httpext': [
            'lux = mopidy_lux:LuxExtension',
        ],
    },
    classifiers=[
        'Environment :: No Input/Output (Daemon)',
        'Intended Audience :: End Users/Desktop',
        'License :: OSI Approved :: MIT License',
        'Operating System :: OS Independent',
        'Programming Language :: Python :: 2',
        'Topic :: Multimedia :: Sound/Audio :: Players',
    ],
)
