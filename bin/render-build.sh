#!/usr/bin/env bash
# exit on error
set -o errexit

bundle install
# to create tables
# bundle exec rails db:migrate
