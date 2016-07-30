from main_views import main


import os, sys
sys.path.append(os.path.join(os.path.dirname(__file__), '..', 'app'))
from app import app

app.register_blueprint(main)

