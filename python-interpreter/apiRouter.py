import json
import requests
from flask import Flask, request, jsonify

app = Flask(__name__)

def run_compile_request(code):
    # Simulate running or compiling the received code
    # Replace with actual compile/run logic
    output = f"Executed code: {code}"
    error = None  # If there was an error, handle it here
    return {'output': output, 'error': error}

@app.route('/compile', methods=['POST'])
def compile_code():
    try:
        # Extract the 'code' from the JSON payload
        data = request.get_json()
        code = data.get('code')
        
        if code:
            result = run_compile_request(code)
            return jsonify(result)
        else:
            return jsonify({'error': 'No code provided'}), 400
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)