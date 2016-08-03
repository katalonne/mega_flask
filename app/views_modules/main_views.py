from flask import Blueprint,render_template,request
import os
import random
import re

main = Blueprint('main',__name__)

@main.route('/')
@main.route('/index')
def index():
    print('request geaders ; ' + request.headers.get('User-Agent'))
    user_agent = request.headers.get('User-Agent')
    iPhone = bool(re.search(r"iPhone", user_agent))
    Android = bool(re.search(r"Android", user_agent))
    iPad = bool(re.search(r"iPad", user_agent))
    Windows_Phone = bool(re.search(r"Windows Phone", user_agent))
    mobile = iPhone or Android or iPad or Windows_Phone
    print(mobile)
    random_nr = random.randint(1,12)
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
                            os=os,
                            mobile=mobile,
                            random_nr=random_nr)