#!/bin/bash

# bash script to fix local url still present in optimized CSS files after static site export

# get list of css files and create array. NOTE - this command only works with bash v4.4+
readarray -d '' files < <(find public -name *.css -print0)

# replace any urls still referencing local WordPress
for f in "${files[@]}"; do
  sed -i 's+$1+studiop.page+g' $f
  sed -i 's+wp-content+contents+g' $f
  sed -i 's+wp-includes+inc+g' $f
done

