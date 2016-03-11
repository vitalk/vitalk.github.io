#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""
    work.models.meta.schema
    ~~~~~~~~~~~~~~~~~~~~~~~

    ORM schema utils.

    :copyright: (c) 2016 by Vital Kudzelka <vital.kudzelka@gmail.com>
    :license: MIT
"""
from sqlalchemy import (
    Column,
    ForeignKey,
    Integer,
)

from work.compat import basestring


class SurrogatePK(object):
    """A mixin that adds a surrogate integer 'primary key' column named ``id``
    to any declarative-mapped class.
    """
    __table_args__ = {'extend_existing': True}

    id = Column(Integer, primary_key=True)

    @classmethod
    def get_by_id(cls, id):
        if any(
            (isinstance(id, basestring) and id.isdigit(),
             isinstance(id, (int, float))),
        ):
            return cls.query.get(int(id))
        return None


def ReferenceCol(tablename, nullable=False, pk_name='id', **kwargs):
    """Column that adds primary key foreign key reference.

    Usage::
        category_id = ReferenceCol('category')
        category = relationship('Category', backref='categories')

    """
    return Column(
        ForeignKey("{0}.{1}".format(tablename, pk_name)),
        nullable=nullable, **kwargs)
