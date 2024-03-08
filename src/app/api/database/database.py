from sqlalchemy import create_engine # esta libreria es para crear el motor de la base de datos
from sqlalchemy.ext.declarative import declarative_base # esta libreria es para crear la base de datos
from sqlalchemy.orm import sessionmaker # esta libreria es para crear la sesion de la base de datos

SQLALCHEMY_DATABASE_URL = "postgres://fl0user:7rqxBgy0MXjV@ep-cold-bar-a5lxhs2s.us-east-2.aws.neon.fl0.io:5432/dbchallenge?sslmode=require" # esta es la url de la base de datos

engine = create_engine(SQLALCHEMY_DATABASE_URL) # creamos el motor de la base de datos
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)  # creamos la sesion de la base de datos
Base = declarative_base() # creamos la base de datos