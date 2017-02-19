#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""
    work.cli.freezer
    ~~~~~~~~~~~~~~~~

    Freeze application.

    :copyright: (c) 2016 by Vital Kudzelka <vital.kudzelka@gmail.com>
    :license: MIT
"""
from . import command


class freeze(command):
    """Freeze application."""

    description = "freeze application"

    def run(self):
        from ..extensions import freezer
        self.create_app()
        freezer.freeze()
