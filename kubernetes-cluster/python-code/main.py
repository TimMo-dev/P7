from flask import Flask, request, jsonify
import subprocess
import ast

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

    print("Generated Code:\n", compileCode)

    try:
        result = subprocess.run(['python', '-c', compileCode], capture_output=True, text=True)

        output_list = []
        for line in result.stdout.split('\n'):
            line = line.strip()
            if line:
                try:
                    # Try to parse the line as a Python literal
                    output_list.append(ast.literal_eval(line))
                except (ValueError, SyntaxError):
                    output_list.append(line)

        error_string = result.stderr.strip()

        return jsonify({'output': output_list, 'error': error_string})
    except subprocess.CalledProcessError as e:
        # Handle subprocess errors
        output_list = []
        for line in e.stdout.split('\n'):
            line = line.strip()
            if line:
                try:
                    output_list.append(ast.literal_eval(line))
                except (ValueError, SyntaxError):
                    output_list.append(line)

        error_string = e.stderr.strip()
        return jsonify({'output': output_list, 'error': error_string}), 400
    except Exception as ex:
        # Handle other exceptions
        return jsonify({'output': [], 'error': str(ex)}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8080)
