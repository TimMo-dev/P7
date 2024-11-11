from flask import Flask, request, jsonify
import subprocess
import os

app = Flask(__name__)

@app.route('/compile', methods=['POST'])
def compile_code():
    data = request.get_json()
    code = data.get('code', '')
    
    with open('main.c', 'w') as f:
        f.write(code)

    result = subprocess.run(['gcc', '-o', 'main', 'main.c'], capture_output=True, text=True)

    if result.returncode != 0:
        return jsonify({'error': result.stderr}), 400

    run_result = subprocess.run(['./main'], capture_output=True, text=True)

    if run_result.returncode != 0:
        return jsonify({'error': run_result.stderr}), 400

    return jsonify({'message': 'Compilation and execution successful', 'output': run_result.stdout}), 200

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)