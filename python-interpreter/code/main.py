from flask import Flask, request, jsonify
import subprocess
import logging

app = Flask(__name__)

# Set up logging
logging.basicConfig(level=logging.INFO)

@app.route('/compile', methods=['POST'])
def run_code():
    # Log the incoming request
    logging.info('Received a request to /compile')

    code = request.json.get('code')
    logging.info(f'Code received: {code}')

    try:
        result = subprocess.run(['python', '-c', code], capture_output=True, text=True, check=True)
        
        # Log the successful execution
        logging.info(f'Execution successful. Output: {result.stdout}')
        if result.stderr:
            logging.info(f'Execution stderr: {result.stderr}')
        
        return jsonify({'output': result.stdout, 'error': result.stderr})
    except subprocess.CalledProcessError as e:
        # Log the error from the subprocess
        logging.error(f'Error during execution: {e.stderr}')
        
        return jsonify({'output': e.stdout, 'error': e.stderr}), 400

if __name__ == '__main__':
    logging.info('Starting Flask server...')
    app.run(host='0.0.0.0', port=5000)
