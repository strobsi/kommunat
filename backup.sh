#!/bin/bash
_now=$(date +"%m_%d_%Y")
_file="/home/istrobelapps/backup/db_$_now.aof"
cp /home/istrobelapps/komunat/data/appendonly.aof $_file