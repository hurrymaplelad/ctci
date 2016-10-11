#!/bin/bash

# Read from the file file.txt and print its transposed content to stdout.
rowCount=`head -n 1 file.txt | wc -w`
# for field of first row
for col in `seq $rowCount`; do
  echo `cut -d ' ' -f $col file.txt`
done
