#!/bin/bash

# To execute this script, first set execute permissions:
# chmod +x your-script-name
# chmod 755 your-script-name
# Then upload the file with those execute permissions already set
# Then download using:
# curl URL | sh
echo "----------------------"
echo "     BFF Installer    "
echo "----------------------"
run_it() {

echo
echo "Looking for Grunt ..."
echo

# Install grunt-cli
if npm list -g "grunt-cli" | grep -q "empty"; then
  echo "Installing Grunt ..."
  npm install grunt-cli -g
fi

echo

# Install BFF

echo
echo "Installing BFF ..."
echo

git clone https://bitbucket.org/slalom-consulting/bff.git

cd bff
npm install

clear

echo
echo "Done."
echo
echo "Type:"
echo "cd bff"
echo
echo "then type:"
echo "grunt"

}
run_it
