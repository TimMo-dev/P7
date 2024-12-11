from flask import Flask, request, jsonify

app = Flask(__name__)

@app.route('/test/code', methods=['POST'])
def test_code():
    print(request.json)
    try:
        # Get expected and user outputs from the request JSON
        expected_output = request.json.get('expected_output')
        user_output = request.json.get('user_output')
        
        if expected_output is None or user_output is None:
            return jsonify({'error': 'Missing expected_output or user_output in the request'}), 400
        
        # Compare the outputs
        passed_tests = []
        failed_tests = []
        
        for i, (expected, user) in enumerate(zip(expected_output, user_output), 1):
            if expected == user:
                passed_tests.append(f'Test {i}')
            else:
                failed_tests.append(f'Test {i}')

        return jsonify({
            'passed_tests': passed_tests,
            'failed_tests': failed_tests
        }), 200

    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
