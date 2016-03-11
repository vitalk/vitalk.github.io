#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""
    work.models.meta
    ~~~~~~~~~~~~~~~~

    Application ORM extension, custom types and schema utils.

    :copyright: (c) 2016 by Vital Kudzelka <vital.kudzelka@gmail.com>
    :license: MIT
"""
from .customtypes import (
    GUID,
)
from .schema import (
    ReferenceCol,
    SurrogatePK,
)
