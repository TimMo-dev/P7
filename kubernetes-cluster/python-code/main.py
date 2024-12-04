from flask import Flask, request, jsonify
import subprocess

app = Flask(__name__)

@app.route('/compile/python', methods=['POST'])
def run_code():
    userCode = request.json.get('code')
    helperValues = request.json.get('helper_values')

    compileCodeTemplate = """
import io
import sys

output = io.StringIO()
sys.stdout = output
sys.stderr = output

def user_function(helper_value):
    {userCode}

if __name__ == "__main__":
    for value in {helperValues}:
        user_function(value)
    sys.stdout = sys.__stdout__
    sys.stderr = sys.__stderr__
    output_list = output.getvalue().split('\\n')
    for line in output_list:
        print(line)
"""

    indentedUserCode = '\n    '.join(userCode.split('\n'))
    compileCode = compileCodeTemplate.format(userCode=indentedUserCode, helperValues=helperValues)
    
    print("Generated Code:\n", compileCode)  # Debug print to check the generated code

    try:
        result = subprocess.run(['python', '-c', compileCode], capture_output=True, text=True, check=True)
        output_list = [line for line in result.stdout.split('\n') if line.strip()]
        return jsonify({'output': output_list, 'error': result.stderr})
    except subprocess.CalledProcessError as e:
        output_list = [line for line in e.stdout.split('\n') if line.strip()]
        return jsonify({'output': output_list, 'error': e.stderr}), 400

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)