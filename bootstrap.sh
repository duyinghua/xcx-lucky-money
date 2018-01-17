#!/bin/bash

npmcheck() {
	npm list -g --depth=0 $1 > /dev/null 2>&1 && {
	  echo "$1 === 已安装"
	} || {
		echo "安装 === $1"
	  npm install -g $1
	}
}

rm -rf dist
rm -rf node_modules

mkdir dist
cp wept.json dist/wept.json

npmcheck wepy-cli
npmcheck wept

npm install