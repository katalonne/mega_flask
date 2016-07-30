from flask import render_template, flash, redirect
# from app import app
from .forms import LoginForm
import os, sys







sys.path.append(os.path.join(os.path.dirname(__file__), '.', 'views_modules'))
from all_views import app



