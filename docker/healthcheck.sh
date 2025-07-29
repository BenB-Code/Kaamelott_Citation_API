#!/bin/bash
# docker/postgres/healthcheck.sh

pg_isready -U "$POSTGRES_USER" -d "$POSTGRES_DB" -q