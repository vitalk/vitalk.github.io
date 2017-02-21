#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""
    work.extensions
    ~~~~~~~~~~~~~~~

    Extensions module. Each extension is initialized in the app factory
    located in app.py.

    :copyright: (c) 2016 by Vital Kudzelka <vital.kudzelka@gmail.com>
    :license: MIT
"""
from flask_cache import Cache
from flask_frozen import Freezer

cache = Cache()
freezer = Freezer()
