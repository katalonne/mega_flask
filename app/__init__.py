from flask import Flask

app = Flask(__name__, template_folder='./static/html', static_url_path='/static')
app.config.from_object('config')

from app import views