import flask, csv


def create_app():
    app = flask.Flask(__name__)

    @app.route('/', methods=['GET', 'POST'])
    def index():
        return flask.render_template('index.html')

    @app.route('/data', methods=['GET', 'POST'])
    def data():
        
        with open('data.csv') as csvfile:
            reader = csv.reader(csvfile)
            data = list(reader)

        context = {
            'sensor_data': data
        }
        return flask.jsonify(context)
    

    return app


if __name__ == "__main__":
    app = create_app()
    # serve the application on port 8731
    app.run(host='0.0.0.0', port=8731)
