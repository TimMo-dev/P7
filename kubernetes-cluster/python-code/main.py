from flask import Flask, request, jsonify
import subprocess

app = Flask(__name__)

@app.route('/compile/python', methods=['POST'])
def run_code():
    userCode = request.json.get('code')
    helperValues = request.json.get('helper_values')

    compileCodeTemplate = """
def user_function(helper_value):
    if isinstance(helper_value, list):
        for i, value in enumerate(helper_value):
            globals()[f"helper_value_{{i}}"] = value
    else:
        globals()["helper_value_0"] = helper_value

    # Dynamically execute user code
    {userCode}

if __name__ == "__main__":
    helper_values = {helperValues}
    if not isinstance(helper_values, list):
        helper_values = [helper_values]
    for value in helper_values:
        user_function(value)

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
    app.run(host='0.0.0.0', port=8080)