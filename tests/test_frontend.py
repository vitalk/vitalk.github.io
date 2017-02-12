#!/usr/bin/env python
# -*- coding: utf-8 -*-
import pytest

from flask import url_for


class TestFrontend:

    def test_index(self, client):
        res = client.get(url_for('frontend.index'))
        assert res.status_code == 200

    def test_main(self, client):
        res = client.get(url_for('frontend.main'))
        assert res.status_code == 200

    def test_made(self, client):
        res = client.get(url_for('frontend.made'))
        assert res.status_code == 200

    def test_contact(self, client):
        res = client.get(url_for('frontend.contact'))
        assert res.status_code == 200


class TestWork:

    @pytest.mark.parametrize('work', [
        ('artsiom-kozlovskiy-site'),
        ('vashi-sushi-shop'),
        ('flask-styleguide'),
    ])
    def test_render(self, client, work):
        res = client.get(url_for('frontend.work', slug=work))
        assert res.status_code == 200

    def test_not_found(self, client):
        res = client.get(url_for('frontend.work', slug='not-found'))
        assert res.status_code == 404
