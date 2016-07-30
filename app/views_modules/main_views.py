from flask import Blueprint,render_template
import os

main = Blueprint('main',__name__)

@main.route('/')
@main.route('/index')
def index():
    user = {'nickname': 'Katalonne'}  # fake user
    posts = [  # fake array of posts
        { 
            'author': {'nickname': 'John'}, 
            'body': 'Beautiful day in Portland!' 
        },
        { 
            'author': {'nickname': 'Susan'}, 
            'body': 'The Avengers movie was so cool!' 
        }
    ]
    return render_template('index/index.html',
                            title='Home',
                            user=user,
                            posts=posts,
                            os=os)