from flask import Flask, jsonify
import requests
import os
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)

@app.route('/api/standings', methods=['GET'])
def get_standings():
    url = 'http://api.football-data.org/v4/competitions/PL/standings'
    headers = {'X-Auth-Token': os.getenv('FOOTBALL_DATA_API_KEY')}
    response = requests.get(url, headers=headers)
    data = response.json()
    standings = {
        'standings': data
    }
    return jsonify(standings)

if __name__ == '__main__':
    app.run(debug=True)
