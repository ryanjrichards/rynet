from flask import Flask, jsonify
import requests
import os
from dotenv import load_dotenv
from flask_cors import CORS  # Import CORS

load_dotenv()

app = Flask(__name__)

CORS(app, resources={r"/api/*": {"origins": "*"}})

@app.route("/api/health")
def health():
    return jsonify({"status": "healthy"})

@app.route('/api/standings', methods=['GET'])
def get_standings():
    url = 'http://api.football-data.org/v4/competitions/PL/standings'
    headers = {'X-Auth-Token': os.getenv('FOOTBALL_DATA_API_KEY')}
    response = requests.get(url, headers=headers, timeout=5)
    data = response.json()
    standings = {
        'standings': data
    }
    return jsonify(standings)

if __name__ == '__main__':
    app.run(debug=True)
