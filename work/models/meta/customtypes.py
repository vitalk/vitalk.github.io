#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""
    work.models.meta.customtypes
    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~

    ORM custom types.

    :copyright: (c) 2016 by Vital Kudzelka <vital.kudzelka@gmail.com>
    :license: MIT
"""
import uuid

from sqlalchemy.types import (
    CHAR,
    TypeDecorator,
)
from sqlalchemy.dialects.postgresql import UUID

from work.compat import text_type


class GUID(TypeDecorator):
    """Platform-independent GUID type.

    Uses Postgresql's UUID type, otherwise uses CHAR(32), storing as
    stringified hex values.

    .. seealso::

        http://docs.sqlalchemy.org/en/latest/core/types.html#backend-agnostic-guid-type

    """
    impl = CHAR

    def load_dialect_impl(self, dialect):
        if dialect.name == 'postgresql':
            return dialect.type_descriptor(UUID())
        else:
            return dialect.type_descriptor(CHAR(32))

    def process_bind_param(self, value, dialect):
        if value is None:
            return value
        elif dialect.name == 'postgresql':
            return text_type(value)
        else:
            if not isinstance(value, uuid.UUID):
                return "%.32x" % uuid.UUID(value)
            else:
                # hexstring
                return "%.32x" % value

    def process_result_value(self, value, dialect):
        if value is None:
            return value
        else:
            return uuid.UUID(value)
