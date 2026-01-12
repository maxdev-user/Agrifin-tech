--CREATE DATABASE gis;
--\connect gis;
-- Enable PostGIS (includes raster)
CREATE EXTENSION IF NOT EXISTS postgis;
-- Enable Topology
CREATE EXTENSION IF NOT EXISTS postgis_topology;
-- Enable PostGIS Advanced 3D 
-- and other geoprocessing algorithms
CREATE EXTENSION IF NOT EXISTS postgis_sfcgal;
-- fuzzy matching needed for Tiger
CREATE EXTENSION IF NOT EXISTS fuzzystrmatch;
-- rule based standardizer
CREATE EXTENSION IF NOT EXISTS address_standardizer;
-- example rule data set
CREATE EXTENSION IF NOT EXISTS address_standardizer_data_us;
-- Enable US Tiger Geocoder
CREATE EXTENSION IF NOT EXISTS postgis_tiger_geocoder;
-- routing functionality
CREATE EXTENSION IF NOT EXISTS pgrouting;
-- spatial foreign data wrappers
CREATE EXTENSION IF NOT EXISTS ogr_fdw;

-- LIDAR support
CREATE EXTENSION IF NOT EXISTS pointcloud;
-- LIDAR Point cloud patches to geometry type cases
CREATE EXTENSION IF NOT EXISTS pointcloud_postgis;

--- Uber h3 hexagon indexing scheme for PostGIS 3.3.2+ bundles
CREATE EXTENSION IF NOT EXISTS h3;
--- converts between h3 index representations 
-- and  postgis geometry/geography
CREATE EXTENSION IF NOT EXISTS h3_postgis;

SELECT postgis_full_version();