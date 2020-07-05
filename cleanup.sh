#!/bin.bash

# cleans up the 404 page if needed
mv -f public/my404/index.html public/404.html \
&& rm -r public/my404 \ 
|| echo '404 correction not needed'