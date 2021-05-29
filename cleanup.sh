#!/bin/sh

# cleans up the 404 page if needed
mv -f public/my404/index.html public/404.html && rm -r public/my404 || echo '404 correction not needed'

# replace any urls still referencing local WordPress
for f in `find public -name "*.css"`; do
  sed -i 's+192.168.2.9:8081/WordPress+studiop.page+g' $f
  sed -i 's+10.0.1.6+studiop.page+g' $f
  sed -i 's+wp-content+contents+g' $f
  sed -i 's+wp-includes+inc+g' $f
done

# rename folder structure to hide wordpress origin
mv public/wp-content public/content
mv public/wp-includes public/inc