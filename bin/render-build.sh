#!/usr/bin/env bash
# exit on error
set -o errexit

# set RAILS_SERVE_STATIC_FILES=1

bundle install
# to create tables
# bundle exec rails db:migrate
# to reset tables
bundle exec rails db:reset
