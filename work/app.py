#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""
    work.app
    ~~~~~~~~

    Web design and development by Vital Kudzelka

    :copyright: (c) 2016 by Vital Kudzelka <vital.kudzelka@gmail.com>
    :license: MIT
"""
from flask import Flask

from work.assets import assets
from work.extensions import (
    freezer,
    cache,
)


def create_app(config='dev.cfg', **options):
    app = Flask(__name__)

    configure_application(app, config, options)
    configure_extensions(app)
    configure_routing(app)
    configure_logging(app)
    configure_blueprints(app)
    configure_jinja_environment(app)
    configure_context_processors(app)
    configure_template_filters(app)
    configure_error_handlers(app)

    return app


def configure_application(app, config, options):
    """Configure application."""
    app.config.from_pyfile(config)
    app.config.from_envvar('APP_CONFIG', silent=True)
    app.config.update(options)
    return None


def configure_extensions(app):
    """Register extensions to application."""
    assets.init_app(app)
    cache.init_app(app)
    freezer.init_app(app)
    return None


def configure_routing(app):
    """Register routing functions and converters to application."""
    pass


def configure_logging(app):
    """Configure application loggers."""
    pass


def configure_blueprints(app):
    """Configure application blueprints."""
    from work.frontend import frontend
    app.register_blueprint(frontend)

    return None


def configure_template_filters(app):
    """Register tempate filters to application."""
    pass


def configure_context_processors(app):
    """Register contet processors to application."""
    pass


def configure_jinja_environment(app):
    """Configure jinja environment, e.g. setup global variables, register
    extensions, etc.
    """
    pass


def configure_error_handlers(app):
    """Register and configure custom error handlers for application."""
    pass
