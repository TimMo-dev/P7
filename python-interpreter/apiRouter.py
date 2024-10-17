import json
import requests

def read_file(file_path):
    with open(file_path, 'r') as file:
        return file.read()

def run_compile_request(code):
    url = 'http://localhost:5000/compile'
    headers = {'Content-Type': 'application/json'}
    payload = json.dumps({'code': code})
    response = requests.post(url, headers=headers, data=payload)
    
    # Try to parse the JSON response
    try:
        return response.json()
    except json.JSONDecodeError:
        return {'output': '', 'error': 'Invalid JSON response from server'}

if __name__ == '__main__':
    file_path = './exampleCode.py'  # Replace with the path to the Python file you want to convert
    code = read_file(file_path)
    result = run_compile_request(code)
    print('Output:', result.get('output'))
    print('Error:', result.get('error'))