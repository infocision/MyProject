from django.shortcuts import render,HttpResponse
import pandas as pd
import pymysql
import matplotlib.pyplot as plt
from sqlalchemy import *

curr_usr = {}

cnx = pymysql.connect('localhost', 'root', 'root', 'nutri_db')
table1 = pd.read_sql('select * from shield_month_apr', cnx)
table2 = pd.read_sql('select * from shield_month_may', cnx)
table3 = pd.read_sql('select * from shield_month_jun', cnx)
table4 = pd.read_sql('select * from shield_month_jul', cnx)
table5 = pd.read_sql('select * from shield_month_aug', cnx)
table6 = pd.read_sql('select * from shield_month_sep', cnx)
table7 = pd.read_sql('select * from shield_month_oct', cnx)

frames = [table1, table2, table3, table4, table5, table6, table7]
result = pd.concat(frames,sort=True)

def product_view(request):
    return render(request, 'login.html')

def sign_in_view(request):
    return render(request, 'sign_in.html')


def index(request):
    usr = [request.POST['user_name']]
    curr_usr['usr_nm']=usr
    pwd = request.POST['password']
    cnx = pymysql.connect('localhost', 'root', 'root', 'nutri_db')
    data1 = pd.read_sql('select * from organogram_geo_master', cnx)


    if True in list(data1['1st Reporting User Name','2nd Reporting User Name'].isin(usr)) and pwd == 'pass@123':
        return render(request, 'index.html', {"usr":usr})
    elif True in list(data1['2nd Reporting User Name','2nd Reporting User Name'].isin(usr)) and pwd == 'pass@123':
        return render(request, 'index.html', {"usr":usr})
    else:
        return HttpResponse("Invalid credential please enter correct username and password")

def dashboard(request):
    usr = [request.POST['user_name']]
    curr_usr['usr_nm'] = usr
    pwd = request.POST['password']
    cnx = pymysql.connect('localhost', 'root', 'root', 'nutri_db')
    data1 = pd.read_sql('select * from organogram_geo_master', cnx)

    if True in list(data1['1st Reporting User Name'].isin(usr)) and pwd == 'pass@123':
        return render(request, 'dashboard.html', {"usr": usr})
    elif True in list(data1['2nd Reporting User Name'].isin(usr)) and pwd == 'pass@123':
        return render(request, 'dashboard.html', {"usr": usr})
    else:
        return HttpResponse("Invalid credential please enter correct username and password")

def primary_sales(request):
    result = pd.concat(frames, sort=True)
    result = result[result['DIVISION'] == 'EVACARE']# only for evacare
    prods = result['PRODUCT NAMAE']
    prods.dropna(inplace=True)
    prods = prods.unique()

    return render(request, 'dashboard.html', {"prods":prods})

