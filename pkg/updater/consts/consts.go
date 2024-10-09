package consts

import (
	"os"
)

const WCA_EXPORT_PUBLIC = "https://www.worldcubeassociation.org/api/v0/export/public"
const DUMP_SQL_ZIP = "./wca_dump.sql.zip"
const DUMP_SQL_FINAL = "./wca_dump.sql"

var MYSQL_USER = os.Getenv("MYSQL_USER")
var MYSQL_PASSWORD = os.Getenv("MYSQL_PASSWORD")
var MYSQL_HOST = os.Getenv("MYSQL_HOST")
var MYSQL_PORT = os.Getenv("MYSQL_PORT")
var MYSQL_DEFAULT_DATABASE = os.Getenv("MYSQL_DEFAULT_DATABASE")
var MYSQL_DUMP_DATABASE = os.Getenv("MYSQL_DUMP_DATABASE")
