#!/usr/bin/env bash
# .platform/hooks/postdeploy/00_get_certificate.sh
sudo certbot -n -d dawson-is403-assignment4.is404.net --nginx --agree-tos --email dawsonl1@byu.edu