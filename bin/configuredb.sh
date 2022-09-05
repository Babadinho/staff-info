#!/bin/bash

database="staff-info"

echo "Configuring database: $database"

# dropdb -U node_user staff-info
# createdb -U node_user staff-info

psql -U node_user staff-info < ./bin/sql/info.sql
# psql -U node_user staff-info < ./bin/sql/user.sql
# psql -U node_user staff-info < ./bin/sql/department.sql

echo "$database configured"