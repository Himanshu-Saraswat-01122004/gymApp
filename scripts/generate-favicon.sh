#!/bin/bash

# Convert SVG to PNG for different sizes
convert -background none public/favicon.svg -resize 16x16 public/favicon-16.png
convert -background none public/favicon.svg -resize 32x32 public/favicon-32.png
convert -background none public/favicon.svg -resize 48x48 public/favicon-48.png
convert -background none public/favicon.svg -resize 64x64 public/favicon-64.png
convert -background none public/favicon.svg -resize 128x128 public/favicon-128.png
convert -background none public/favicon.svg -resize 256x256 public/favicon-256.png

# Create favicon.ico with multiple sizes
convert public/favicon-16.png public/favicon-32.png public/favicon-48.png public/favicon-64.png public/favicon.ico

# Create apple-touch-icon
convert -background none public/favicon.svg -resize 180x180 public/apple-touch-icon.png
