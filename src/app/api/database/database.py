from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
import os

## SQLALCHEMY_DATABASE_URL = "postgresql://fl0user:Jlep1h5PWZoM@ep-late-truth-a5wu5gad.us-east-2.aws.neon.fl0.io:5432/database?sslmode=require"
SQLALCHEMY_DATABASE_URL = os.environ.get('SQLALCHEMY_DATABASE_URL')

engine = create_engine(SQLALCHEMY_DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()