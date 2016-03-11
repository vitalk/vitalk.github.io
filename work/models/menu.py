#!/usr/bin/env python
# -*- coding: utf-8 -*-
from collections import namedtuple
from flask import url_for


class Menu(list):
    """Base class for menu list. Converts each tuple in iterable
    to :class:`MenuItem` namedtuple to easy attribute access and find
    the active one.

    :param iterable: Menu items as ``(href, text)`` tuple.
    :param endpoint: The endpoint as ``(name, values)`` tuple for active item.
    """

    def __init__(self, iterable, endpoint):
        items = [MenuItem(
            url, text, (url == url_for(endpoint[0], **endpoint[1])),
        ) for url, text in iterable]
        super(Menu, self).__init__(items)


MenuItem = namedtuple('MenuItem', 'href text is_active')
"""Base class for menu item."""


not_found = MenuItem('oops', 'Oops', False)
