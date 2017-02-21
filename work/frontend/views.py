# -*- coding: utf-8 -*-
"""
    work.frontend.views
    ~~~~~~~~~~~~~~~~~~~

    The application frontpage.

    :copyright: (c) 2016 by Vital Kudzelka <vital.kudzelka@gmail.com>
    :license: MIT
"""
from flask import (
    abort,
    Blueprint,
    render_template,
    request,
    url_for,
)
from jinja2.exceptions import TemplateNotFound

from work.models.menu import Menu


frontend = Blueprint('frontend', __name__, static_folder='../static')
frontend.context_processor(lambda: {'site_nav': site_nav()})


def site_nav():
    return Menu((
        [url_for('frontend.index'), u'Кто я'],
        [url_for('frontend.made'), u'Работы'],
        [url_for('frontend.contact'), u'Контакты'],
    ), [request.endpoint, request.view_args])


@frontend.route('/')
def index():
    return render_template('frontend/index.html')


@frontend.route('/is/')
def main():
    return render_template('frontend/index.html')


@frontend.route('/made/')
def made():
    return render_template('frontend/made.html')


@frontend.route('/is/available/')
def contact():
    return render_template('frontend/contact.html')


@frontend.route('/made/<string:slug>/')
def work(slug):
    try:
        return render_template('frontend/%s.html' % slug)
    except TemplateNotFound:
        abort(404)
