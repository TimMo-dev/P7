from flask import Flask, request, jsonify
import subprocess

app = Flask(__name__)

@app.route('/compile', methods=['POST'])
def run_code():
    code = request.json.get('code')
    try:
        result = subprocess.run(['python', '-c', code], capture_output=True, text=True, check=True)
        return jsonify({'output': result.stdout, 'error': result.stderr})
    except subprocess.CalledProcessError as e:
        return jsonify({'output': e.stdout, 'error': e.stderr}), 400

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)