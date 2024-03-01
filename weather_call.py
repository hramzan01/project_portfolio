import requests

API_KEY = '84051cbbf33706ad5c1f9915cc5b9022'
lat = 51.534318
lon = -0.069981
part = 'daily'

URL = f'https://api.openweathermap.org/data/3.0/onecall?lat={lat}&lon={lon}&exclude={part}&appid=API_KEY'

response = requests.get(URL).json()
